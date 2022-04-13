import axios from 'axios';
import { URL } from '../config';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {userContext} from '../context/UserContext'

export default function Login() {

  const {user, setUser} = useContext(userContext);

  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: URL
  });

  const login = (e) => {
    e.preventDefault();

    const {email, password} = e.target;

    const data = {
      identifier: email.value,
      password: password.value,
    }

    instance.post("api/auth/local", data)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setUser({
        jwt: response.data.jwt,
        username: response.data.user.username,
        email: response.data.user.email,
        id: response.data.user.id
      });
      navigate("/");
    })
    .catch(function (error) {
      console.log(error);
    });

  }


  return (
    <main className=' mt-24'>
      {console.log(user)}
      <div className='relative'>
        <img className='w-full h-60 object-cover object-bottom transition-all hover:object-center duration-1000' src="https://images.unsplash.com/photo-1494430539277-0c8da386e1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80" alt="" />
        <p className='text-white text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Iniciar Sesion</p>
      </div>
      <form onSubmit={login} className='flex flex-col gap-5 mx-10 xl:mx-80 my-10'>
        <input className='border-2 border-zinc-900' required name='email' type="email" placeholder='Email...' />
        <input className='border-2 border-zinc-900' required name='password' type="password" placeholder='Password...' />
        <button className='bg-zinc-900 text-white p-5' type="submit">Login</button>
        <Link to={"/signup"} className='self-center hover:text-blue-400'>Crear cuenta</Link>
      </form>
    </main>
  )
}
