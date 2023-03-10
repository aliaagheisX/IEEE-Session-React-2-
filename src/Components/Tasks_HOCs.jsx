import React, { useEffect, useState, createContext, useContext, useRef } from 'react'
import useReducerWithMiddleware from '../hooks/useReducerWithMiddleware'

const taskReducer = async (state, action) => {
    let res, data;
    switch (action.type) {
        case 'ADD_TASK':
            res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ body: action.body, isCompleted: false })
            })
            data = await res.json();
            return [...state, data];
        case 'RMV_TASK':
            res = await fetch(`http://localhost:3000/tasks/${action.id}`, {
                method: 'DELETE',
            })
            return state.filter((t) => t.id != action.id);
        case 'DO_TASK':
            res = await fetch(`http://localhost:3000/tasks/${action.id}`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ isCompleted: true })
            })

            return state.map(task => {
                if (task.id === action.id) {
                    return { ...task, isCompleted: true };
                } else {
                    return task;
                }
            });
        case 'UNDO_TASK':
            res = await fetch(`http://localhost:3000/tasks/${action.id}`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ isCompleted: false })
            })
            return state.map(task => {
                if (task.id === action.id) {
                    return { ...task, isCompleted: false };
                } else {
                    return task;
                }
            });
        default:
            return state;
    }
};

export const DispatchContext = createContext(null);


export function HigherOrderComp({ Component }) {
    const [error, setError] = useState(null);
    const [loading, setLoadeding] = useState(true);
    const [items, setItems] = useState([]);

    const loadData = async () => {
        try {
            res = await fetch('http://localhost:3000/tasks');
            if (!res.ok) throw data;
            data = await res.json();

            setItems(data);
            setLoadeding(false);
        } catch (err) {
            console.log("ERR: ", err)
            setError(err);
            setLoadeding(false);
        }

    }
    useEffect(() => {
        loadData();
    })

    if (loading) return <div>Loading....</div>
    if (error) return <div>Error..... {error}</div>
    return (<Component items={items} />)
}

export function Tasks_HOC_MAIN({ items }) {

    const [tasks, dispatch] = useReducerWithMiddleware(taskReducer, items);

    const [text, setText] = useState("");
    const [search, setSearch] = useState("");

    const ref = useRef();

    const filteredTasks = React.useMemo(() => {
        return tasks.filter(({ body }) => {
            return body.toLowerCase().includes(search.toLowerCase());
        })
    }, [search, tasks])

    const handelFocus = () => {
        ref.current.focus()
    }

    return (
        <DispatchContext.Provider value={dispatch}>
            <div>
                <h1>Tasks_HOC_MAIN</h1>
                <input ref={ref} type="text" placeholder='Add Task here...' value={text} onChange={(e) => setText(e.target.value)} />
                <button
                    className='btn'
                    type="button"
                    onClick={() => dispatch({ type: 'ADD_TASK', body: text })}>
                    Add
                </button>

                <button className='btn' type="button" onClick={() => setSearch(text)}>
                    Search
                </button>
                <button className='btn' type="button" onClick={handelFocus}>
                    Focus
                </button>

                <List tasks={filteredTasks} />
            </div>
        </DispatchContext.Provider>
    )
}


const List = React.memo(({ tasks }) => {
    return (
        <div className='flex flex-col py-5'>
            {
                tasks.map((task) => (
                    <Task key={task.id} {...task} />
                ))
            }
        </div>
    )
})


const Task = React.memo(({ id, body, isCompleted }) => {
    const dispatcher = useContext(DispatchContext);
    const removeTask = () => {
        dispatcher({ type: 'RMV_TASK', id: id });
    }
    const toggleTask = () => {
        if (isCompleted)
            dispatcher({ type: 'UNDO_TASK', id: id });
        else
            dispatcher({ type: 'DO_TASK', id: id });
    }
    return (
        <div className='flex gap-3 bg-yellow-500 border-2 rounded-md border-gray-900 text-gray-900 py-2 w-8/12 my-3 px-2 font-bold'>
            <div onClick={removeTask} className=' w-5 h-5 bg-red-900 cursor-pointer'></div>
            <div onClick={toggleTask} className=' w-5 h-5 bg-white cursor-pointer'></div>

            <span className={isCompleted ? 'line-through' : ''}>{body}</span>
        </div>
    )
})