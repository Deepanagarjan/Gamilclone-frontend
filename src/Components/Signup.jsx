import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { fullname, email, password } = input;
    if (!fullname || !email || !password) {
      toast.error("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "https://gmailclone-backend-vwi4.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup" style={{width:'500px',height:'500px', border: '2px solid #ccc' , padding: '50px', display: 'flex',marginLeft:'300px'}}>
    <div className="flex items-center justify-center min-h-screen bg-[#F6F8FC]">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 bg-white p-8 w-full max-w-lg rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800" style={{fontSize:'52px'}}>
          Signup
        </h1>
        <div  id='ch' style={{display:'flex',marginTop:"20px", fontSize:'20px'}}>
        <div className="flex gap-4">
          <input
            onChange={changeHandler}
            value={input.fullname}
            name="fullname"
            type="text"
            placeholder="Full Name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          </div>
          <div  id='ch' style={{display:'flex', fontSize:'20px' ,position:'relative',marginTop:'60px',right:'225px'}}>
          <input
            onChange={changeHandler}
            value={input.email}
            name="email"
            type="email"
            placeholder="Email"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        </div>
        
        <div  id='ch' style={{display:'flex',marginTop:"20px", fontSize:'20px'}}>
        <input
          onChange={changeHandler}
          value={input.password}
          name="password"
          type="password"
          placeholder="Password"
          className="border border-gray-600 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        </div>
        <div  id='ch' style={{display:'flex',marginTop:"20px" , fontSize:'30px' , backgroundColor:'lightblue',width:'100px',borderRadius:'5px'}}>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Signup"}
        </button>
        </div>
        <div  id='ch' style={{display:'flex',marginTop:"20px"}}>
        <p className="text-center text-gray-600" style={{fontSize:'30px'}}>
          Already have an account?{" "}
          <div  id='ch' style={{display:'flex',marginTop:"20px" , fontSize:'30px' , backgroundColor:'lightblue',width:'100px',borderRadius:'5px'}}>
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Login
          </Link>
          </div>
        </p>
        </div>
      </form>
      </div>
    </div>
    
  );
};

export default Signup;