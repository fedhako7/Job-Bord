import React, { useState } from 'react'

function FieldComponent( {type, showPass, fieldRef, fieldPHolder, disabled}) {
  // Constants and Variables

  // Return
  return (
    <div>
      <input
        type={showPass ? 'text' : type}
        placeholder={fieldPHolder || type}
        ref={fieldRef}
        disabled={disabled}
        className={`flex h-8 min-w-64 pl-2 pb-1 items-center focus:ring-2 focus:ring-blue-400 outline-none ${disabled && 'bg-gray-200 cursor-not-allowed '} `}
      />

    </div>
  )
}

export default FieldComponent