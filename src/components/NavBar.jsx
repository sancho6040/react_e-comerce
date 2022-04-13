import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { URL } from '../config';
import { Link } from 'react-router-dom'
import { BsCart2, BsPersonFill, BsFillBagFill } from 'react-icons/bs'
import CartItem from './CartItem';
import {get} from '../api'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    //----------------get cart items--------------
    // get("/api/carts/6?populate=*")
    //   .then((res) => {
    //     setCartItems(res.data.data.attributes.products.data);
    //   })
    //   .catch((error) => { console.log(error) })
    update();

  }, []);

  const update = () =>{
    get("/api/carts/6?populate=*")
      .then((res) => {
        setCartItems(res.data.data.attributes.products.data);
      })
      .catch((error) => { console.log(error) })
  }


  return (<>
    <nav className='flex fixed top-0 left-0 right-0 p-7 xl:px-44 justify-between text-xl items-baseline bg-transparent z-40'>
      <h1 className='border-2 border-transparent px-3 py-1 hover:border-zinc-900'><Link to="/">Mahjandas</Link></h1>
      <ul className='flex gap-5'>
        <li className='border-2 border-transparent px-3 py-1 hover:border-zinc-900'><Link to="/store"><BsFillBagFill /></Link></li>
        <li className='border-2 border-transparent px-3 py-1 hover:border-zinc-900'><button onClick={() => { setOpen(!open); update(); }}><BsCart2 /></button></li>
        <li className='border-2 border-transparent px-3 py-1 hover:border-zinc-900'><Link to="/login"><BsPersonFill /></Link></li>
      </ul>
    </nav>
    {open && <div className='bg-white border-2 border-zinc-900 h-2/5 w-2/5 overflow-y-auto absolute right-5 top-20 z-50'>
      {cartItems.map((item) => <CartItem key={item.id} product={item} />)}
      <Link to={"/payment"} className='py-3 w-60 my-1 mx-auto block bg-zinc-900 text-white text-center'>Pagar</Link>
    </div>}
  </>
  )
}