import React from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function PassVisibility( {showPass, setShowPass} ) {
  return (
    <div>
      <button
        onClick={() => { setShowPass(prev => !prev) }}
        type="button"
        className='-ml-8'>
        {showPass ?
          < VisibilityOutlinedIcon /> : < VisibilityOffOutlinedIcon />
        }
      </button>
    </div>
  )
}

export default PassVisibility