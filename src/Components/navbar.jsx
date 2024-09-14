import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText } from '../redux/appSlice';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import '../App.css'; // Import the CSS styles for the component

const Navbar = () => {
    const [text, setText] = useState("");
    const { user } = useSelector(store => store.app);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/v1/user/logout', {
                withCredentials: true,  // Ensure cookies are sent with the request
            });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setAuthUser(null));  // Reset user state
                navigate("/login");  // Redirect to login page
            } else {
                toast.error('Logout failed, please try again.');
            }
        } catch (error) {
            toast.error('Logout failed, please try again.');
            console.error('Logout Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    

    const debouncedSearch = debounce((searchValue) => {
        dispatch(setSearchText(searchValue));
    }, 300);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();  // Cleanup debounce on component unmount
        };
    }, []);

    useEffect(() => {
        debouncedSearch(text);
    }, [text]);

    return (
        <div className='navbar'>
            {/* Left Side: Hamburger Menu, Logo, and Title */}
            <div className='navbar-left'>
                <div className='icon-container'>
                    <RxHamburgerMenu size='24px' />
                </div>
                <img
                    className='gmail-logo'
                    src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
                    alt="Gmail Logo"
                />
                <h1 className='gmail-title'>Gmail</h1>
            </div>

            {/* Center: Search Bar */}
            <div className='navbar-center'>
                <div className='search-bar'>
                    <IoIosSearch size='24px' className='search-icon' />
                    <input
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Search mail'
                        className='search-input'
                    />
                </div>
            </div>

            {/* Right Side: Icons, Logout, and User Avatar */}
            <div className='navbar-right'>
                <div className='icon-container'>
                    <CiCircleQuestion size='24px' />
                </div>
                <div className='icon-container'>
                    <IoIosSettings size='24px' />
                </div>
                <div className='icon-container'>
                    <TbGridDots size='24px' />
                </div>
                <span onClick={logoutHandler} className='logout-button'>
                    {loading ? 'Logging out...' : 'Logout'}
                </span>
                {user && (
                    <Avatar
                        src={user.profilePhoto}
                        name={user.name}
                        size='40'
                        round={true}
                        className='avatar'
                    />
                )}
            </div>
        </div>
    );
};

export default Navbar;
