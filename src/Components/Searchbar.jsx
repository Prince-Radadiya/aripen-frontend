import React from 'react'

const Searchbar = ({ser}) => {
    return (
        <>
            <div className='w-[70%] h-[80%] flex justify-between items-center bg-white rounded-md shadow-lg'>
                <input type="text" placeholder={ser} className='w-[80%] h-full px-4 text-gray-600 text-[1.1vw] focus:outline-none' />
                <button className='w-[15%] h-full bg-blue-600 text-white rounded-md border-l-0 rounded-l-none cursor-pointer tex-[1.2vw]'>Search</button>
            </div>
        </>
    )
}

export default Searchbar
