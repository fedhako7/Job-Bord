import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation()
  const from_register_page = location?.state?.from_register_page
  const navigate = useNavigate()

  useEffect(() => {
    if( !from_register_page ) navigate('not--found')
  }, [])

  return (
    from_register_page &&

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Verification</h1>
        <p className="text-gray-600 mb-4">
          A verification link has been sent to your email address. Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-gray-600">
          Didn’t receive the email?{" "}
          <a
            href="/resend-verification"
            className="text-blue-500 hover:underline font-medium"
          >
            Resend Verification Email
          </a>
        </p>
      </div>
    </div>
  );
};

export default Verify;
