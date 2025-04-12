import React from 'react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const { user, userLogOut } = useAuth();
    const location = useLocation();
    // console.log(location);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            userLogOut();
            navigate('/sign-up');
            toast.success('Logged out successfully.');
        } catch {
            toast.error('Logout failed. Please try again.');
        }
    }

    return (
        <div className="dropdown dropdown-end border rounded-full">
            {
                user ? (
                    <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full" alt="" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow border">
                                <li>
                                    <Link to={'/profile'}>Profile</Link>
                                </li>

                                {
                                    location?.pathname !== '/meeting' && <>
                                        <li>
                                            <Link to={'/meeting'}>Dashboard</Link>
                                        </li>
                                    </>
                                }
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <Link to="/sign-in" className="btn">
                        Sign in
                    </Link>
                )
            }
        </div>
    );
};

export default UserMenu;