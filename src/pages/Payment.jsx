import React, { useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import { get, post, put } from "../api"
import FormPayment from '../components/FormPayment'
import CartItem from '../components/CartItem'
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'

const stripe = loadStripe("pk_test_51KTd1dCxJ8HWxsAUvHdkJU90wXuUHO4qa4bF5dq3A7kCPWLAiaPnQ4bDpvBqIVMHPdABDwVMODmDff6jl8ok59OJ00SeHORvaW")

export default function Payment() {

    const [clientSecret, setClientSecret] = useState("");

    const [cartItems, setCartItems] = useState([]);

    const [pago, setPago] = useState("no");

    const navigate = useNavigate();

    var total = 0;

    useEffect(() => {
        //----------------get cart items--------------
        get("/api/carts/6?populate=*")
            .then((res) => {
                setCartItems(res.data.data.attributes.products.data);
            })
            .catch((error) => { console.log(error) })
    }, [])

    const pay = () => {
        post("/api/orders", {
            amount: total
        })
            .then(({ data }) => {
                setClientSecret(data.clientSecret)
                console.log(JSON.stringify(data))
                setPago("pago");
                clearCar();
                // navigate("/");
            })
            .catch((error) => { console.log(error); setPago("error"); })
    }

    const clearCar = () => {
        let cart = {
            "data":{
                "products":[]
            }
        }
        put("/api/carts/6?populate=*", cart )
        .then(function (res) {
            console.log(JSON.stringify(res.data));
          })
          .catch((error)=>{console.log(error);});

    }


    return (
        <main className=' my-24 mx-10 xl:mx-44 flex flex-col'>
            <div className='border-b border-zinc-900'>
                {cartItems.map((item) => {
                    total += item.attributes.price;
                    return <CartItem key={item.id} product={item} />
                })
                }
            </div>
            <p className='text-center mt-5'>{`Total: $${total}.000 COP`}</p>
            {clientSecret &&
                <Elements stripe={stripe} options={{ clientSecret }}>
                    <FormPayment />
                </Elements>
            }
            <button onClick={pay} className='bg-zinc-900 mt-5 py-3 px-8 text-lg text-white hover:bg-opacity-80'>Pagar</button>
            {pago == "pago" && <div className='flex flex-col items-center text-green-600 my-5'>
                <BsCheckCircle className='text-7xl' />
                <p>¡Pago Realiado!</p>
            </div>}
            {pago == "error" && <div className='flex flex-col items-center text-red-600 my-5'>
                <BsXCircle className='text-7xl' />
                <p>¡Error en el pago!</p>
            </div>}
        </main>
    )
}
