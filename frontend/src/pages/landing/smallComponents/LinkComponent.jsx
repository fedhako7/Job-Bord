import React from 'react'

const LinkComponent = ({ link, name, Icon }) => {
  return (
    <div>
      {
        link === 'phone' ?
          <p className='cursor-copy'><> <Icon /> {name} </></p> :
          <a href={link} target="_blank" rel="noopener noreferrer" >
            <> <Icon /> {name} </>
          </a>
      }
    </div>
  )
}

export default LinkComponent
