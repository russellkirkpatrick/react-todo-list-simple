import { useState } from "react"

export default function TodoInput(){
  const [item, setItem] = useState("")
  const [todos, setTodos] = useState([])
  

  function handleSubmit(e){
    e.preventDefault()
    setTodos((currentTodos) => {
      return [
        ...currentTodos, 
        {id: crypto.randomUUID(), title: item, checked: false}
      ]
    })
  
    setItem("")
  }

  function toggleCompleted(id, checked){
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if(todo.id === id){
          return {...todo, checked}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos((currentTodos) => {
      return currentTodos.filter(todo => id !== todo.id)
    })
  }

  console.log(todos)
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>todolist!</h1>
        <input onChange={(e) => setItem(e.target.value)} value={item}/>
        <button>add</button>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox"
                  checked={todo.checked} 
                  onChange={(e) => toggleCompleted(todo.id, e.target.checked)}
                />{todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </li>
          )
        })}
      </ul>
      </>
  )
  
}
