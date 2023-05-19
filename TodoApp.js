import { useState } from "react"

function TodoApp(){
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])
  const [count, setCount] = useState(0)
  
  function handleSubmit(e){
    e.preventDefault()

    if(task.length > 0){
      setTodos((prevTodos) => {
        setCount((prevCount) => prevCount +1)
        return [...prevTodos, {name: task, checked: false, id: crypto.randomUUID()}]
      })
      setTask('')
    }
  } 

  function handleCheck(id){
    setTodos((prevTodos) => { 
      return prevTodos.map((todo) => {
        if(todo.id === id){
          return {...todo, checked: !todo.checked}
        }
        return todo
      })
    })
  }

  function handleDelete(id){
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id)
    })
    setCount((prevCount) => prevCount -1)
  }

  console.log(todos)
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
        <button>add</button>
        <span>{count} todos</span>
      </form>

      <ul>
        {todos.map((todo) =>
          (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.checked} onClick={() => handleCheck(todo.id)}/>
              <label>{todo.name}</label>
              <button onClick={() => handleDelete(todo.id)}>delete</button>
            </li>
          )
        )}
      </ul>
    </>
  )
}
export default TodoApp
