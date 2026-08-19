import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ViewStory from './components/ViewStory.jsx';
import Reels from './components/Reels.jsx';
import Profile from './components/Profile.jsx';
import Home from './components/Home.jsx';
import NewPost from './components/NewPost.jsx';
import PrivatePost from './components/PrivatePost.jsx';
import {Provider} from 'react-redux'
import Store from './components/Store/Store.js';
import SavedPost from './components/SavedPost.jsx';
import EditProfile from './components/EditProfile.jsx';
import Message from './components/Message.jsx';
import Search from './components/Search.jsx';

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        
         index: true,
        element:<Home/>
      },
      {
        path:'/Reels',
        element:<Reels/>
      },
      {
        path:'/:username',
        element:<Profile/>
      },
      {
        path:'/EditProfile/:username',
        element:<EditProfile/>
      },
      {
        path:'/Message',
        element:<Message/>
      },
      {
        path:'/Search',
        element:<Search/>
      }
    ]
  },
  {
    path:'/ViewStory/:id',
    element:<ViewStory/>
  },
  {
    path:'/NewPost',
    element:<NewPost/>
  },
  {
    path:'/PrivatePost',
    element:<PrivatePost/>
  },
  {
    path:'/SavedPost',
    element:<SavedPost/>
  }
])
createRoot(document.getElementById('root')).render(
 <Provider store={Store}>

     
   <RouterProvider router={router}/>

 </Provider>

)
