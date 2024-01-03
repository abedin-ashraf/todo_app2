import axios from 'axios';
import './style.css'

export function Todos({ todos }) {

    return <div>
        {todos.map(function (todo) {
            return <div id='div'>
                <h4>{todo.title}</h4>
                <h5>{todo.description}</h5>
                {todo.completed === false && (<button id='btn-complete' onClick={function () {
                    axios.put('http://localhost:3000/completed', {
                        title: todo.title
                    }, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then(async (res) => {
                            const json = await res.data;
                            alert('Todo Updated');
                        })
                        .catch((error) => {
                            console.error('Error updating todo:', error);
                        });


                }}>Mark as Completed</button>)}

                <button id='btn-delete' onClick={function () {
                    axios.post(`http://localhost:3000/delete`, {
                        title: todo.title
                    }, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then(async (res) => {
                            alert('Todo deleted');
                        })
                        .catch((error) => {
                            console.error("Error deleting todo: ", error);
                        })
                }}>Delete Todo</button>
            </div>
        })}
    </div>
}