import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ product }) {
    return (
        <article className='w-1/3 border border-transparent hover:border-zinc-900 bg-white'>
            <Link to={"/details/" + product.id}>
                <img className='block mx-auto pt-2 w-11/12 h-60 object-cover object-center' src={product.attributes.image} alt={product.attributes.name} />
                <p className='p-2 text-center'>{product.attributes.name}</p>

            </Link>
        </article>
    )
}
