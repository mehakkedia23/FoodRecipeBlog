import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import { AddFoodRecpie } from './pages/AddFoodRecpie'
import EditRecpie from './pages/EditRecpie'

const getAllRecpies =async()=>{
  let allRecpies=[]
  await axios.get('http://localhost:5000/recpie').then(res=>{
    allRecpies=res.data
  })
  return allRecpies
}

const getMyRecpie = async () => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return []; // No user logged in, return empty array
  }

  const user = JSON.parse(userString);
  const allRecpies = await getAllRecpies();

  return allRecpies.filter(item => item.createdBy === user._id);
};
const getFavRecpie=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
     {path:"/",element:<Home/>,loader:getAllRecpies},
     {path:"/myRecpie",element:<Home/>,loader:getMyRecpie},
      {path:"/favRecpie",element:<Home/>,loader:getFavRecpie},
      {path:"/addRecpie",element:<AddFoodRecpie/>},
       {path:"/editRecpie/:id",element:<EditRecpie/>},

  ]}
 

])

export default function App(){
  return (
    <>
    <RouterProvider router ={router}></RouterProvider>


    </>
  )
}