import React from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Friend = (props) => {

    const deleteFriend = (e) => {


        e.preventDefault()

        axiosWithAuth()
            .delete(`/api/friends/${props.friend.id}`)
                .then(res => {

                    props.setFriendsList(res.data)

                })
                .catch(err => {

                    console.log(err)

                })



    }

    const setEdit = () => {


        props.setIsEditing(true)

        axiosWithAuth()
            .get(`/api/friends/${props.friend.id}`)
                .then(res => {

                    props.setFriendToEdit(res.data)

                })
                .catch(err=> {

                    console.log(err)

                })


    }

    return (

        <div>
            <div>Name: {props.friend.name}</div>
            <div>Age: {props.friend.age}</div>
            <div>Email: {props.friend.email}</div>
            <button onClick={setEdit}>Edit</button>
            <button onClick={deleteFriend}>Delete</button>
        </div>
    )


}

export default Friend