import React from 'react';
import { Link } from "react-router-dom";
const Login = () => {
  return (
  <section className='max-w-xs ' id='contact'>
  <div className='container mx-auto'>
    <div className='flex flex-col lg:flex-row '> 
      <form className='flex-1 place-self-center border rounded-lg flex flex-col gap-y-6 pb-24 p-6 mt-4 '>
        <input className='bg-transparent border-b py-3 outline-none 
        w-full placeholder:text-black focus:border-accent transition-all' type='text' placeholder='Username'/>
        <input className='bg-transparent border-b py-3 outline-none
         w-full placeholder:text-black focus:border-accent transition-all' type='text' placeholder='Password'/>
      
         <button className='btn btn-sm'>Login</button>
         <span className=' text-black'>
            New to Chatify? click here <a to="#">Create Account</a>
          </span>
      </form>
    </div>
  </div>
  </section>
  );
};

export default Login;