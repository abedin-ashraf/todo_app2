import { useState } from 'react';
import axios from 'axios';
import './style.css'


export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (<div>
        <input className='input-box' type="text" placeholder='title' onChange={(e) => { setTitle(e.target.value) }} /> <br />
        <input className='input-box' type="text" placeholder='description' onChange={(e) => { setDescription(e.target.value) }} /> <br /><br />
        <button onClick={() => {
            axios.post('http://localhost:3000/todo', {
                title: title,
                description: description
            }, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(async (res) => {
                    alert("Todo Created");
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        alert("There is already a Todo with the same title");
                    } else {
                        console.error("Error creating todo:", error);
                    }
                })
        }}>Add Todo</button>
    </div >)
}