import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);
  const currDate = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    axios.get('http://localhost:3000/todos')
      .then(async (res) => {
        const json = await res.data;
        return setTodos(json.todos);
      })
      .catch((error) => {
        console.log(error);
      })
  });


  return (
    <div>
      <h2>{currDate}</h2>
      <Todos todos={todos}></Todos>
      <CreateTodo></CreateTodo>
    </div>

  )
}
export default App;
