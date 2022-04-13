import axios from "axios"
import { useContext } from "react"
import { URL } from "../config"
import { userContext } from "../context/UserContext"

const instance = axios.create({
    baseURL: URL
})

// const [user] = useContext(userContext);

const get = async (url) => {
    return await instance.get(url, {
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5NzA5NTgzLCJleHAiOjE2NTIzMDE1ODN9.cfHPiUg9zO9Pq8iQXWwchlRCfiAqhgO1PiNBCt4v6t8"
            // "Authorization": "Bearer " + user.jwt
        }
    })
}

const post = async (url, data) => {
    return await instance.post(url, data, {
        headers:{
            "Authorization" : "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5NzA5NTgzLCJleHAiOjE2NTIzMDE1ODN9.cfHPiUg9zO9Pq8iQXWwchlRCfiAqhgO1PiNBCt4v6t8"
        },
    })
}

const put = async (url, data) =>{{
    return await instance.put(url, data, {
        headers:{
            "Authorization" : "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5NzA5NTgzLCJleHAiOjE2NTIzMDE1ODN9.cfHPiUg9zO9Pq8iQXWwchlRCfiAqhgO1PiNBCt4v6t8"
        },
    })
}}

export default instance
export { get, post, put }