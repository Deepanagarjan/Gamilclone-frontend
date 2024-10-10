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
    
    // Retrieve the token from localStorage or state
    const token = localStorage.getItem('token'); // Or use a state selector for token

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
            const res = await axios.post("https://gmailclone-backend-vwi4.onrender.com/api/v1/email/create", formData, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}` // Ensure token is passed correctly
                },
                withCredentials: true,
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
            dispatch(setOpen(false)); // Close the form after sending email
        }
    };

    return (
        <div className={`${open ? 'block' : 'hidden'} modal-container`}>
  <div className='modal-header'>
    <h1>New Message</h1>
    <div onClick={() => dispatch(setOpen(false))} className='close-btn'>
      <RxCross2 size="20px" />
    </div>
  </div>
  <form onSubmit={submitHandler} className='form-container'>
    <input
      onChange={changeHandler}
      value={formData.to}
      name="to"
      type="email"
      placeholder='To'
      className='input-field'
      required
    />
    <input
      onChange={changeHandler}
      value={formData.subject}
      name="subject"
      type="text"
      placeholder='Subject'
      className='input-field'
    />
    <textarea
      onChange={changeHandler}
      value={formData.message}
      name="message"
      rows='10'
      placeholder='Message'
      className='input-field'
      required
    ></textarea>
    <div className='flex justify-end'>
      <button
        type='submit'
        className={`submit-btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
