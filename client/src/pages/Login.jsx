import React, { useContext } from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate=useNavigate();

    const {backendUrl,setIsLoggedin}=useContext(AppContext);
    console.log(backendUrl);
    const [state,setState]=useState("Sign Up");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const onSubmitHandler=async (e)=>{
        try {
            e.preventDefault();
            axios.defaults.withCredentials=true;
            if(state==='Sign Up')
            {
                const {data}= await axios.post(backendUrl+'/api/auth/register',{name,email,password});
                if(data.success)
                {
                    setIsLoggedin(true);
                    navigate('/');
                }
                else{
                    toast.error(data.message);

                }
            }
            else{
                const {data}= await axios.post(backendUrl+'/api/auth/login',{email,password});
                if(data.success)
                {
                    setIsLoggedin(true);
                    navigate('/');
                }
                else{
                    toast.error(data.message);

                }

            }
            
        } catch (error) {
            toast.error(error.message);
            
        }
    }


  return (
    <div className='flex items-center justify-center  min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <img onClick={()=>navigate('/')} src={assets.logo} className='absolute left-5 top-5 sm:left-20 w-28 sm:w-32 cursor-pointer ' alt="" />

            <div className='border bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
                
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state==="Sign Up" ? 'Create account' :"Login"}</h2>
                <p className='text-sm text-center mb-6'>{state==="Sign Up"? 'Create Your account': "Login to your account!"}</p>
                
                <form onSubmit={onSubmitHandler}>
                    {state==="Sign Up"&&
                    (
                    <div className='mb-4 flex items-center gap-3 w-full rounded-full bg-[#333A5c] px-5 py-2.5'>
                        <img src={assets.person_icon} alt="" />
                        <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-transparent  flex-1 ' type="text" placeholder='Full Name' required/>
                    </div>
                    )}

                    <div className='mb-4 flex items-center gap-3 w-full rounded-full bg-[#333A5c] px-5 py-2.5'>
                        <img src={assets.mail_icon} alt="" />
                        <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className='bg-transparent  flex-1 ' type="email" placeholder='Email id' required/>
                    </div>
                    <div className='mb-4 flex items-center gap-3 w-full rounded-full bg-[#333A5c] px-5 py-2.5'>
                        <img src={assets.lock_icon} alt="" />
                        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className='bg-transparent  flex-1 ' type="password" placeholder='Password' required/>
                    </div>
                    <p onClick={()=>navigate('/reset-password')} className='text-indigo-500 mb-4  cursor-pointer'>Forgot Password</p>
                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white'>{state}</button>
                </form>

                {state==="Sign Up"
                ? 
                (
                <p className='text-center text-gray-400 text-xs mt-4'>Already have an account?{" "}
                    <span className='cursor-pointer hover:underline' onClick={()=>setState("Login")}>Login here</span>
                </p>
                )
                :
                (
                 <p className='text-center text-gray-400 text-xs mt-4'>Don't have an account?{" "}
                    <span className='cursor-pointer hover:underline' onClick={()=>setState("Sign Up")}>Sign Up</span>
                </p>
                )
                }

                

               
            </div>


      
    </div>
  )
}

export default Login
