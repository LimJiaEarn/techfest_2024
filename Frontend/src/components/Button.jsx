import React from 'react';
import { useUser } from '../App';
import {useNavigate} from 'react-router-dom';

const Button = ({styles, text}) => {

    const { userID, setCurrentPage } = useUser();

    const navigate = useNavigate();

    const linkToExplore = () => {
        setCurrentPage("Explore");
        navigate('/explore');
    }

    const linkToRegister = () => {
        setCurrentPage("Register");
        navigate('/registration');
    }

    return (
            <button type="button" className={`py-4 px-6 font-bold text-[1.2rem] outline-none ${styles} rounded-[10px]`}
                onClick={userID===null ? linkToRegister : linkToExplore}

                      
            >
                {text}
            </button>
        )
}

export default Button;