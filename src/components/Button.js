import React from 'react'

const Button = ({ title, isSuccess, type }) => {
    return (
        <div className=' flex flex-col p-5 flex-1 '>
            <button type={type} className='border-2 bg-green-500 hover:bg-green-600 p-2 rounded-md text-white font-semibold'>{title}</button>
        </div>
    )
}

export default Button