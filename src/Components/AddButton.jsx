import React from 'react'

const AddButton = ({ add, onClick }) => {
    return (
        <>
            <div className="add-emp-btn w-[10%] h-[80%] shadow-lg rounded-md   flex justify-center items-center "
             onClick={onClick}>
                <button
                
                className='w-full h-full rounded-md cursor-pointer text-[1vw]  font-semibold hover:bg-gray-200' >{add}</button>
            </div> 
        </>
    )
}

export default AddButton
