import React, { useState } from 'react'
let curr_id = 0;

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            curr_id++;
            return [...state, { body: action.body, isCompleted: false, id: curr_id }];
        case 'RMV_TASK':
            return state.filter((t) => t.id != action.id);
        case 'DO_TASK':
            return state.map(task => {
                if (task.id === action.id) {
                    return { ...task, isCompleted: true };
                } else {
                    return task;
                }
            });
        case 'UNDO_TASK':
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


export default function Tasks_useReducer_EX() {
    console.log("rerender app");

    const [tasks, dispatch] = React.useReducer(taskReducer, []);

    const [text, setText] = useState("");
    const [search, setSearch] = useState("");

    const filteredTasks = React.useMemo(() => {
        return tasks.filter(({ body }) => {
            console.log('Filter function is running ...');
            return body.toLowerCase().includes(search.toLowerCase());
        })
    }, [search, tasks])

    return (
        <div>
            <h1>Tasks_useReducer_EX</h1>
            <input type="text" placeholder='Add Task here...' value={text} onChange={(e) => setText(e.target.value)} />
            <button
                className='btn'
                type="button"
                onClick={() => dispatch({ type: 'ADD_TASK', body: text })}>
                Add
            </button>

            <button className='btn' type="button" onClick={() => setSearch(text)}>
                Search
            </button>

            <List tasks={filteredTasks} dispatcher={dispatch} />
        </div>
    )
}


const List = React.memo(({ tasks, dispatcher }) => {
    console.log("rerender list");
    console.log("tasks ", tasks)
    return (
        <div className='flex flex-col py-5'>
            {
                tasks.map((task) => (
                    <Task key={task.id} {...task} dispatcher={dispatcher} />
                ))
            }
        </div>
    )
})


const Task = React.memo(({ id, body, isCompleted, dispatcher }) => {
    console.log("rerender task", id);
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