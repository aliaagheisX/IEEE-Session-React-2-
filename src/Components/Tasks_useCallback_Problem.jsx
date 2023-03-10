import React, { useEffect, useState } from 'react'

export default function Tasks_useCallback_Problem() {
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

    const removeTask = async (id) => {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
        })
        setTasks(tasks.filter((t) => t.id != id));
    }


    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <h1>Tasks_useCallback_Problem</h1>
            <input type="text" placeholder='Add Task here...' value={text} onChange={(e) => setText(e.target.value)} />
            <button className='btn' type="button" onClick={addTask}>
                Add Task
            </button>

            <List tasks={tasks} removeHandeler={removeTask} />
        </div>
    )
}


const List = React.memo(({ tasks, removeHandeler }) => {
    console.log("rerender list");
    return (
        <div className='flex flex-col py-5'>
            {
                tasks.map((task) => (
                    <Task key={task.id} {...task} removeHandeler={removeHandeler} />
                ))
            }
        </div>
    )
})


const Task = React.memo(({ id, body, isCompleted, removeHandeler }) => {
    console.log("rerender task", id);
    return (
        <div className='flex gap-3 bg-yellow-500 border-2 rounded-md border-gray-900 text-gray-900 py-2 w-8/12 my-3 px-2 font-bold'>
            <div onClick={() => removeHandeler(id)} className=' w-5 h-5 bg-red-900 cursor-pointer'></div>
            {
                body
            }
        </div>
    )
})