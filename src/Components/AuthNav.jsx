import React from 'react';
import { Link } from 'react-router-dom';
import AuthNavIcon from '../assets/AuthNavIcon.png';
import { IoMenu } from "react-icons/io5";
import useIsMobile from '../hooks/useIsMobile';

const AuthNav = () => {

    const isMobile = useIsMobile();
    console.log(isMobile)


    return (

        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6">
            <div className="text-xl font-semibold text-[#2c2c2c] flex items-center gap-2">
                <img src={AuthNavIcon} alt="" />
            </div>
            <div className="space-x-4 flex items-center">
                <button className="text-sm text-[#1e1e2f] hover:underline">Log in</button>
                <button className="bg-[#0c0c36] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1c1c4f]">Join</button>
                <div className={`${isMobile ? 'block border p-2 rounded-full text-2xl bg-[#131313] text-white ' : 'hidden'}`}>
                    <IoMenu />
                </div>
            </div>
        </div>
    );
};

export default AuthNav;