import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import { AddFoodRecpie } from './pages/AddFoodRecpie'

const getAllRecpies =async()=>{
  let allRecpies=[]
  await axios.get('http://localhost:5000/recpie').then(res=>{
    allRecpies=res.data
  })
  return allRecpies
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
     {path:"/",element:<Home/>,loader:getAllRecpies},
     {path:"/myRecpie",element:<Home/>},
      {path:"/favRecpie",element:<Home/>},
      {path:"/addRecpie",element:<AddFoodRecpie/>},
  ]}
 

])

export default function App(){
  return (
    <>
    <RouterProvider router ={router}></RouterProvider>


    </>
  )
}