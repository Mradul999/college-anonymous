import React from 'react'

export default function Comments() {
  return (
    <div className='w-full mt-4'>
        <form className='w-full'>
            <textarea type="text" placeholder='Create your comment' className='w-full rounded-md p-2 focus:outline-none border-[2.5px] border-indigo-300 focus:border-green-600  bg-indigo-400 placeholder:text-white text-white' />
        </form>
        

      
    </div>
  )
}
