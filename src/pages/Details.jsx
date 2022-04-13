import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { URL } from '../config';
import {get, put} from '../api';
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/UserContext';
import { Container } from 'postcss';

export default function Details() {
    const { id } = useParams();
    const { user, setUser } = useContext(userContext);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: URL
    });

    const [items, setItems] = useState([]);
    const [load, setLoad] = useState(true);

    const [cartItems, setCartItems] = useState([]);

    const product = items.filter(item => item.id == id)[0];

    useEffect(() => {
        instance.get("/api/products?populate=*&filters[user][id]=" + "5", {
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5NzA5NTgzLCJleHAiOjE2NTIzMDE1ODN9.cfHPiUg9zO9Pq8iQXWwchlRCfiAqhgO1PiNBCt4v6t8"
            }
        })
            .then((res) => {
                setItems(res.data.data);
                setLoad(false);

            })
            .catch((error) => { console.log(error) })
        
        //get cart
        get("/api/carts/6?populate=*")
            .then((res) => {
                setCartItems(res.data.data.attributes.products.data);
            })
            .catch((error) => { console.log(error) })

    }, []);

    if (!product && !load) {
        navigate("*");
    }

    const addCart = () => {
        let cart = [];
        cartItems.map((item)=>cart.push(item.id));
        cart.push(product.id)
        let send = {
            "data":{
                "products": cart
            }
        }

        put("/api/carts/6?populate=*", send )
        .then(function (res) {
            console.log(JSON.stringify(res.data));
          })
          .catch((error)=>{console.log(error);});

        // console.log(send)
    }

    return (
        <main className='my-24 mx-10 xl:mx-44'>
            {load ? <p>Loading...</p> :
                <article className='flex'>
                    <img className='w-1/2 mr-5 object-cover object-center' src={product.attributes.image}></img>
                    <div>
                        <p className='text-3xl mb-3'>{product.attributes.name}</p>
                        <p className='mb-3 sm:h-1/3 overflow-y-auto'>{product.attributes.description + " Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus reprehenderit id asperiores quaerat dolore assumenda, aperiam animi perferendis non architecto facere. Officia laborum explicabo at porro dolor placeat ex illum."}</p>
                        <p className='text-2xl border border-zinc-900 mb-3'>{"$ " + product.attributes.price + ".000 COP"}</p>
                        <button onClick={addCart} className='bg-zinc-900 text-white px-5 py-3 hover:bg-opacity-80'>Añadir al carrito</button>
                    </div>
                </article>}
        </main>
    )
}
