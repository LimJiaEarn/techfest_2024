import React from 'react';

const Button = ({styles, text}) => {
    return (
            <button type="button" className={`py-4 px-6 font-bold text-[1.2rem] outline-none ${styles} rounded-[10px]`}>
                {text}
            </button>
        )
}

export default Button;