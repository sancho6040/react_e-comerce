import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../context/UserContext';

export default function Home() {

  const {user, setUser} = useContext(userContext);

  return (
    <main>
      {/* {console.log(user)} */}
      <div className='relative'>
        <img className='w-full xl:h-96 object-cover' src="https://images.unsplash.com/photo-1513890333407-6f85205e8ef2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="croche" />
        <Link className='bg-zinc-900 text-white p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:text-2xl xl:p-6 hover:opacity-70  cursor-pointer' to={"/store"}>Comprar ahora</Link>
      </div>

      <div className=' my-16 text-center'>
        <h2 className='font-bold text-xl mb-5'>Lorem ipsum</h2>
        <p className='px-10 xl:px-44'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit eos aperiam delectus odio commodi ipsum quos aut maiores dolor fuga, quasi dolorum doloremque cupiditate consectetur neque deleniti officia vero explicabo nostrum quae sint impedit ipsa. Explicabo, provident modi nulla sit commodi incidunt sunt, dolorum mollitia, architecto eius numquam error veniam?</p>
      </div>

    </main>
  )
}
