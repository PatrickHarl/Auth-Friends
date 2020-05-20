import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Friend from './Friend'

const initialFriend = {

    name:'',
    age:'',
    email:''


}

const FriendsList = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [friendsList, setFriendsList] = useState([])
    const [newFriend, setNewFriend] = useState(initialFriend)
    const [friendToEdit, setFriendToEdit] = useState({})
    const [isEditing, setIsEditing] = useState(false)




    useEffect(() => {

        axiosWithAuth()
            .get('/api/friends')
                .then(res => {

                    setFriendsList(res.data)
                    setIsLoading(false)

                })
                .catch(err => {

                    console.log(err)

                })


    }, [friendsList])

    
    const updateFriend = (e) => {


        e.preventDefault()

        axiosWithAuth()
            .put(`/api/friends/${friendToEdit.id}`, friendToEdit)
                .then(res => {

                    setFriendsList(res.data)
                    setIsEditing(false)

                })
                .catch(err => {

                    console.log(err)

                })


    }

    const handleChange = (e) => {

    
        setNewFriend({...newFriend, [e.target.name]:e.target.value})


    }

    const handleChangeEdit = (e) => {

    
        setFriendToEdit({...friendToEdit, [e.target.name]:e.target.value})


    }


    const addFriend = (e) => {

        e.preventDefault()

        axiosWithAuth()
            .post('/api/friends', newFriend)
                .then(res => {

                    setFriendsList(res.data)
                    setNewFriend(initialFriend)

                })
                .catch(err => {

                    console.log(err)

                })


    }

return (

    <div>
        <div>Friends</div>
        {isLoading && <div>Loading...</div>}
        {friendsList.length > 0 && friendsList.map(friend => {

            return <Friend key={friend.id} friend={friend} setFriendToEdit={setFriendToEdit} setIsEditing={setIsEditing} setFriendsList={setFriendsList} />

        })}
        <div>Add a Friend</div>
        <form onSubmit={addFriend} >
            <input onChange={handleChange} type='text' name='name' value={newFriend.name} />
            <input onChange={handleChange} type='text' name='age' value={newFriend.age} />
            <input onChange={handleChange} type='text' name='email' value={newFriend.email} />
            <button>Submit</button>

            {isEditing && 
            <div>
                <input onChange={handleChangeEdit} type='text' name='name' value={friendToEdit.name} />
                <input onChange={handleChangeEdit} type='text' name='age' value={friendToEdit.age} />
                <input onChange={handleChangeEdit} type='text' name='email' value={friendToEdit.email} />
                <button onClick={updateFriend}>Update</button>
            </div>
            }   
        </form>

    </div>

)


}
export default FriendsList