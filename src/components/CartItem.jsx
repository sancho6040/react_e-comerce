import React from 'react'
import { BsXCircleFill } from "react-icons/bs";

export default function CartItem({product}) {
  return (
    <article className='bg-white flex h-16 items-center border-b border-transparent hover:border-zinc-900 hover:bg-zinc-100'>
        <img className='w-14 h-14 object-cover object-center ml-1' src={product.attributes.image} alt="" />
        <p className='ml-3'>{product.attributes.name}</p>
        <p className='ml-3'>{"$"+product.attributes.price+"K"}</p>
        <BsXCircleFill className='text-zinc-900 absolute right-2'/>
    </article>
  )
}
