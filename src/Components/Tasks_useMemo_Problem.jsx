import React, { useEffect, useState } from 'react'

export default function Tasks_useMemo_Problem() {

    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");

    const loadTasks = async () => {
        const res = await fetch('http://localhost:3000/tasks');
        const data = await res.json();
        setTasks(data);
    }
    const handelSearch = (e) => {
        e.preventDefault();
        setSearch(text);
    }
    const filteredTasks = tasks.filter(({ body }) => {
        console.log('Filter function is running ...');
        return body.toLowerCase().includes(search.toLowerCase());
    })

    useEffect(() => {
        loadTasks();
    }, []);
    return (
        <div>
            <h1>Tasks_useMemo_Problem</h1>
            <form onSubmit={handelSearch}>
                <input type="text" placeholder='Search here ...' value={text} onChange={(e) => setText(e.target.value)} />
            </form>

            <List tasks={filteredTasks} />
        </div>
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

function Task({ id, body, isCompleted }) {
    return (
        <div className='bg-yellow-500 border-2 rounded-md border-gray-900 text-gray-900 py-2 w-8/12 my-3 px-2 font-bold'>
            {
                body
            }
        </div>
    )
}
