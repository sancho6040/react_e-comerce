import React from 'react'
import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className='bg-zinc-800 p-10 xl:px-44 flex text-white'>
        <div className='basis-1/2'>
            <p>Siguenos en nuestras redes sociales.</p>
            <ul className='flex gap-3 mt-3'>
                <li><BsInstagram/></li>
                <li><BsFacebook/></li>
                <li><BsWhatsapp/></li>
            </ul>
        </div>
        <div className='basis-1/2 text-right'>
            <p>Bogotá, Colombia</p>
            <p>email@mail.com</p>
            <p>Diseñado por <a className='hover:text-blue-300' href='https://sancho6040.github.io/Portafolio_WebDesign/'>Sergio Sánchez</a></p>
        </div>
    </footer>
  )
}
