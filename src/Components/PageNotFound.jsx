
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import pageNotFound from '../assets/PageNotFound.json';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 -mt-10">
            <div className="xl:max-w-7xl w-full">
                <Lottie animationData={pageNotFound} loop={true} />
            </div>

            <NavLink to="/" className="btn btn-primary xl:-mt-30 md:-mt-20 z-1 cursor-pointer">
                Go Home
            </NavLink>
        </div>
    );
};

export default PageNotFound;