import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function FieldComponent({ type, value, placeholder, disabled, onChange, error }) {
  const [showPass, setShowPass] = useState(false)

  // Return
  return (
    <>
      <div className='flex'>
        <input
          type={showPass ? 'text' : type}
          placeholder={placeholder || type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`flex h-8 min-w-64 pl-2 pb-1 items-center focus:ring-2 focus:ring-blue-400 outline-none ${disabled && 'bg-gray-200 cursor-not-allowed '} `}
        />

        {type === 'Password' && (
          <button
            onClick={() => { setShowPass(prev => !prev) }}
            type="button"
            className='-ml-8'>
            {showPass ?
              < VisibilityIcon color='red' /> : < VisibilityOffIcon />
            }
          </button>
        )}
      </div>
      {error && <span className=" -mt-3 italic text-red-500 text-sm">{error}</span>}

    </>
  )
}

export default FieldComponent
