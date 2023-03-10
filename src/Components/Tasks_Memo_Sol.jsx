import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';

export default function Tasks_Memo_Sol() {
    console.log("rerender app");

    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");

    const loadTasks = async () => {
        const res = await fetch('http://localhost:3000/tasks');
        const data = await res.json();
        setTasks(data);
    }

    const addTask = async () => {
        const res = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ body: text, isCompleted: false })
        })
        const data = await res.json();
        setTasks([...tasks, data]);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <h1>Tasks_Memo_Sol</h1>
            <input type="text" placeholder='Add Task here...' value={text} onChange={(e) => setText(e.target.value)} />
            <button className='btn' type="button" onClick={addTask}>
                Add Task
            </button>

            <List tasks={tasks} />
        </div>
    )
}


const List = React.memo(({ tasks }) => {
    console.log("rerender list");
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


function Task({ id, body, isCompleted }) {
    console.log("rerender task", id);
    return (
        <div className='bg-yellow-500 border-2 rounded-md border-gray-900 text-gray-900 py-2 w-8/12 my-3 px-2 font-bold'>
            {
                body
            }
        </div>
    )
}
