const jwt = require('jsonwebtoken');
const db = require('../../database/database');
const { StatusCodes } = require('http-status-codes');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.CLIENT_ID);

const googleAuthController = async (req, res) => {
  const { googleToken } = req.body;

  console.log('[Google Auth Controller] Received Data:', { googleToken });

  if (!googleToken) {
    console.log('[Google Auth Controller] Missing token');
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Google token is required' });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log('[Google Auth Controller] Verified Google Token Payload:', payload);

    const { given_name: fname, family_name: lname, email } = payload;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    let user = rows[0];

    if (!user) {
      const [result] = await db.query(
        'INSERT INTO users (fname, lname, email, role) VALUES (?, ?, ?, NULL)',
        [fname, lname, email]
      );
      user = { user_id: result.insertId, fname, lname, email, role: null };
      console.log('[Google Auth Controller] New User Created:', user);
    } else {
      console.log('[Google Auth Controller] Existing User Found:', user);
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    console.log('[Google Auth Controller] JWT Generated:', token);

    // Return more user data
    return res.status(StatusCodes.OK).json({
      token,
      user_id: user.user_id,
      role: user.role,
      fname: user.fname,
    });
  } catch (error) {
    console.error('[Google Auth Controller] Error:', error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error during authentication' });
  }
};


const setRoleController = async (req, res) => {
  const { role } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token

  if (!token || !role) {
    console.log('[Set Role Controller] Missing token or role');
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Token and role are required' });
  }
  // Validate role against allowed values
  const validRoles = ['Employer', 'Job Seeker'];
  if (!validRoles.includes(role)) {
    console.log('[Set Role Controller] Invalid role:', role);
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Role must be Employer or Job seeker' });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user_id = decoded.user_id;

    // Update user role
    await db.query('UPDATE users SET role = ? WHERE user_id = ?', [role, user_id]);
    console.log('[Set Role Controller] Role Updated:', { user_id, role });

    return res.status(StatusCodes.OK).json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('[Set Role Controller] Error:', error.message);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token or server error' });
  }
};

module.exports = { googleAuthController, setRoleController };
