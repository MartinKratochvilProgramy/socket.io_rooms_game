import React, { useEffect } from 'react'

export default function Console({ consoleOutput }) {

    useEffect(() => {
        const textArea = document.getElementById("console-output"); 
        textArea.scrollTop = textArea.scrollHeight;
    }, [consoleOutput])

  return (
    <div 
      id='console-output'
      className='bg-beige rounded w-[280px] xs:w-[320px] p-2 text-sm xs:text-md overflow-auto  h-[160px] xs:h-[240px]'>
      {consoleOutput.map(message => {
          return(
              <div className='flex flex-row w-full text-start'>
                {message}
              </div>
          )
      })}
    </div>
  )
}
