import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'




const Login = () => {

        const history = useHistory()

        const [login, setLogin] = useState({

            credentials: {

                username:'',
                password:''

            },
            isLoading: false

        })


    const userLogin = (e) => {

        e.preventDefault()

        setLogin({...login, isLoading:true})

        

        axiosWithAuth()
            .post('/api/login', { ...login.credentials })
                .then(res => {

                    localStorage.setItem('token', res.data.payload)
                    setLogin({...login, isLoading:false})
                    history.push('/friendslist')

                }) 
                .catch(err => {

                    console.log(err)

                })
        


    }

    const handleChange = (e) => {


        setLogin({

            ...login,
            credentials: {
                ...login.credentials,
                [e.target.name]: e.target.value
            }
            
        })


    }

    return (

        <form onSubmit={userLogin}>
            <input onChange={handleChange} placeholder='...username' type='text' name='username' value={login.credentials.username} />
            <input onChange={handleChange} placeholder='...password' type='text' name='password' value={login.credentials.password} />
            <button type='submit'>Submit</button>
            {login.isLoading && <div>Logging In...</div>}

        </form>

    )


}
export default Login