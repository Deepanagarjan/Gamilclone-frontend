import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { setAuthUser } from '../redux/appSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://gmailclone-backend-vwi4.onrender.com/api/v1/user/login", input, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                // console.log(submitHandler)
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className='login' style={{width:'500px',height:'500px', border: '2px solid #ccc' , padding: '50px', display: 'flex',marginLeft:'300px'}}>
        <div className='flex items-center justify-center w-screen h-screen bg-[#F6F8FC]'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h1 className='text-4xl font-bold mb-8 text-center text-gray-600' style={{fontSize:'60px'}}>Login</h1>
                <form onSubmit={submitHandler} className='flex flex-col gap-4'> {/* Adjusted gap for more space */}
                <div  id='ch' style={{display:'flex',marginTop:"20px"}}>
                    <input 
                        onChange={changeHandler} 
                        value={input.email} 
                        name="email" 
                        type='email' 
                        placeholder='Email' 
                        className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required style={{fontSize:'30px'}}
                    />
                    </div>
                     <div  id='ch' style={{display:'flex',marginTop:"20px"}}>
                    <input 
                        onChange={changeHandler} 
                        value={input.password} 
                        name="password" 
                        type='password' 
                        placeholder='Password' 
                        className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required style={{fontSize:'30px'}}
                    />
                    </div>
                    <button type="submit" className='bg-blue-500 text-white rounded-lg px-4 py-3 hover:bg-blue-600 transition'  style={{fontSize:'25px',backgroundColor:'lightblue',borderRadius:'5px', marginTop:'20px'}}>
                        Login
                    </button>
                </form>
                <div  id='ch' style={{display:'flex',marginTop:"20px"}}>
                <p className='mt-4 text-center text-gray-600'  style={{fontSize:'30px'}}>
                    Do not have an account? 
                    {/* <GoogleButton onClick={signInWithGoogle} /> */}
                    <Link to={"/signup"} className='text-blue-500 hover:underline' style={{backgroundColor:'lightblue'}}>Signup</Link>
                </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;