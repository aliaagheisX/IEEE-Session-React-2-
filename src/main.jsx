import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Posts from './routes/Posts';
import AddPosts from './routes/Posts/Add';
import Tasks from './routes/Tasks';
import Post from './routes/Posts/Post';
import Tasks_Memo_Problem from './Components/Tasks_Memo_Problem';
import Tasks_Memo_Sol from './Components/Tasks_Memo_Sol';
import Tasks_useMemo_Problem from './Components/Tasks_useMemo_Problem';
import Tasks_useMemo_Sol from './Components/Tasks_useMemo_Sol';
import Tasks_useCallback_Problem from './Components/Tasks_useCallback_Problem';
import Tasks_useCallback_Sol from './Components/Tasks_useCallback_Sol';
import Tasks_useReducer_EX from './Components/Tasks_useReducer_EX_MIDD';
import Tasks_useReducer_EX_MIDD from './Components/Tasks_useReducer_EX_MIDD';
import Tasks_useContext from './Components/Tasks_useContext';
import Tasks_Refs_EX from './Components/Tasks_Refs_EX';
import { HigherOrderComp } from './Components/Tasks_HOCs';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/tasks",
        element: <Tasks_Refs_EX />
      },
      {
        path: "/posts/add",
        element: <AddPosts />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
