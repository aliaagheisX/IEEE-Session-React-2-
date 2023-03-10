import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";

export default function Root() {
    return (
        <div>
            <Link to='/' className='py-10 text-5xl font-black block text-gray-900'>Code Share</Link>
            <NavLink to='/posts' className='px-2 mx-2 py-1 hover:bg-teal-800 text-xl bg-teal-900 text-yellow-50 rounded-sm'>posts</NavLink>
            <NavLink to='/tasks' className='px-2 mx-2 py-1 hover:bg-teal-800 text-xl bg-teal-900 text-yellow-50 rounded-sm'>tasks</NavLink>
            <NavLink to='/posts/add' className='px-2 mx-2 py-1 hover:bg-teal-800 text-xl bg-teal-900 text-yellow-50 rounded-sm'>add post</NavLink>
            <Outlet />
        </div>
    )
}
