import React, { useContext } from 'react';
import axios from 'axios';
import { URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';

export default function SignUp() {

    const { user, setUser } = useContext(userContext);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: URL
    });

    const signUp = (e) => {
        e.preventDefault();


        const { email, username, password } = e.target;

        const data = {
            email: email.value,
            username: username.value,
            password: password.value,
        }

        instance.post("api/auth/local/register", data)
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

        //-------------create the cart---------------------
        // instance.post("/api/carts?populate=*", cart, {
        //         headers:{
        //             "Authorization" : "Bearer "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5NzA5NTgzLCJleHAiOjE2NTIzMDE1ODN9.cfHPiUg9zO9Pq8iQXWwchlRCfiAqhgO1PiNBCt4v6t8"
        //         },
        //     }).then((res)=>{
        //         // setArr([...arr, res.data.data]);
        //         console.table(JSON.stringify(res.data.data))
        //     }).catch((error)=>console.log(error))

        //guardar el id del carrito!!
    };

    return (
        <main className=' mt-24'>
            {console.log(user)}
            <div className='relative'>
                <img className='w-full h-60 object-cover object-top transition-all hover:object-center duration-1000' src="https://images.unsplash.com/photo-1534779182058-26272ba6a04f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                <p className='text-white text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Crear Cuenta</p>
            </div>
            <form onSubmit={signUp} className='flex flex-col gap-5 mx-10 xl:mx-80 my-10'>
                <input className='border-2 border-zinc-900' required name='email' type="email" placeholder='Email...' />
                <input className='border-2 border-zinc-900' required name='username' type="text" placeholder='Nombre...' />
                <input className='border-2 border-zinc-900' required name='password' type="password" placeholder='Password...' />
                <button className='bg-zinc-900 text-white p-5' type="submit">Crear cuenta</button>
                <Link to={"/login"} className='self-center hover:text-blue-400'>Iniciar Sesion</Link>
            </form>
        </main>
    )
}
