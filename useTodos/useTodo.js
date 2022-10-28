import { useReducer, useEffect } from "react"
import { todoReducer } from "./todoReducer"


// Recupera los datos del local storage para introducirlos en el inicialState
const init = () => JSON.parse(localStorage.getItem('todos')) || [];

export const useTodo = () => {

    const [todos, dispatch] = useReducer( todoReducer, [], init);

    //introduce los datos en el local storage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos]);

    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type:'Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: 'Toggle Todo',
            payload: id
        })
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }
}
