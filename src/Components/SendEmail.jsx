import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails, setOpen } from '../redux/appSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const SendEmail = () => {
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false); // Loading state
    const { open, emails } = useSelector(store => store.app);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Basic form validation
        if (!formData.to || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/v1/email/create", formData, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            
            dispatch(setEmails([...emails, res.data.email]));
            toast.success("Email sent successfully!");

            // Clear form after submission
            setFormData({
                to: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            console.log(error);
            const message = error?.response?.data?.message || "Failed to send the email.";
            toast.error(message);
        } finally {
            setLoading(false);
            dispatch(setOpen(false));
        }
    };
console.log(open)
    return (
        <div className={`${open ? 'block' : 'hidden'} bg-white max-w-3xl mx-auto shadow-xl shadow-slate-600 rounded-t-md`}>
            <div className='flex items-center justify-between px-4 py-3 bg-[#F2F6FC]'>
                <h1 className='text-lg font-semibold'>New Message</h1>
                <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <RxCross2 size="20px" />
                </div>
            </div>
            <form onSubmit={submitHandler} className='flex flex-col p-4 gap-3'>
                <input
                    onChange={changeHandler}
                    value={formData.to}
                    name="to"
                    type="email"
                    placeholder='To'
                    className='outline-none py-2 px-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    required
                />
                <input
                    onChange={changeHandler}
                    value={formData.subject}
                    name="subject"
                    type="text"
                    placeholder='Subject'
                    className='outline-none py-2 px-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                />
                <textarea
                    onChange={changeHandler}
                    value={formData.message}
                    name="message"
                    rows='10'
                    placeholder='Message'
                    className='outline-none py-2 px-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    required
                ></textarea>
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className={`bg-blue-700 text-white rounded-full px-6 py-2 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendEmail;
