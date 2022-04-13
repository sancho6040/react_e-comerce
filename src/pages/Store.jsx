import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../config';
import {get, post} from '../api';
import Card from '../components/Card'
import { BsPlusCircle, BsXCircleFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { userContext } from '../context/UserContext';

export default function Store() {

    const { user, setUser } = useContext(userContext);

    const [open, setOpen] = useState(false);

    const [arr, setArr] = useState([]);
    const [meta, setMeta] = useState({});

    const addProduct = (e) => {
        e.preventDefault();
        const { name, image, description, price } = e.target
        const newProduct = {
            data: {
                name: name.value,
                price: price.value,
                description: description.value,
                image: image.value,
                popular: false
            }
        }

        post("/api/products", newProduct).then((res)=>{
            // setArr([...arr, res.data.data]);
            console.table(JSON.stringify(res.data.data))
        }).catch((error)=>console.log(error))

        // setArr([...arr, newProduct]);
        setOpen(false);
    }

    useEffect(() => {
        get("/api/products?populate=*&filters[user][id]=" + "5") //user.id
            .then((res) => {
                // console.table(JSON.stringify(res.data))
                // res.data.data.map((value) => {
                //     setArr([...arr, value]);
                // });
                setArr([...arr, res.data.data]);
                setMeta(res.data.meta.pagination);

            })
            .catch((error) => { console.log(error) })

    }, []);


    return (
        <main className=' min-h-screen my-24 mx-10 xl:mx-44'>
            {/* {console.log(arr)} */}
            <button onClick={() => { setOpen(true) }} className='bg-zinc-900 text-white px-5 py-2 mb-3 xl:ml-4 flex items-center gap-2'><p>Añadir</p><BsPlusCircle /></button>
            <section className='flex flex-wrap ' >
                {arr.map(array => array.map((item)=><Card key={item.id} product={item} />))}
            </section>
            <div className='flex items-center justify-center gap-3 mt-3'><BsChevronLeft/>{`${meta.page} / ${meta.total}`}<BsChevronRight/></div>

            {open &&
                <div>
                    <div className='fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-50' onClick={() => { setOpen(false) }}></div>
                    <div className='bg-white w-2/4 md:w-1/4 fixed left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2'>
                        <button className='absolute right-5 top-5' onClick={() => { setOpen(false) }}><BsXCircleFill className='w-8 h-8 text-zinc-900 hover:text-opacity-80' /></button>
                        <h2 className='p-5 text-shark text-3xl font-bold'> Crear producto</h2>
                        <form className='flex flex-col p-5' onSubmit={addProduct}>
                            <input className='p-4 outline-none border focus:border-zinc-900 my-2' required name="name" type="text" placeholder='nombre...' />
                            <input className='p-4 outline-none border focus:border-zinc-900 my-2' required name="image" type="text" placeholder='Portada...' />
                            <input className='p-4 outline-none border focus:border-zinc-900 my-2' name="description" type="text" placeholder='Descripcion...' />
                            <input className='p-4 outline-none border focus:border-zinc-900 my-2' name="price" type="number" placeholder='Precio...' />
                            <button className='bg-zinc-900 mt-5 py-4 text-xl font-bold text-white hover:bg-opacity-80'>Crear</button>
                        </form>
                    </div>
                </div>}

        </main>
    )
}
