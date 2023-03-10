import React from 'react'
import { Link } from 'react-router-dom'

export default function Posts() {
    return (
        <div>
            <h1>Posts</h1>
            <Link to='1' className='px-5 py-4 text-3xl'>1</Link>
            <Link to='2' className='px-5 py-4 text-3xl'>2</Link>
        </div>
    )
}
