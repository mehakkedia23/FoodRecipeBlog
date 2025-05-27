import React from 'react'
import { useLoaderData } from 'react-router-dom'
import foodrcpimg2 from '../assets/foodrcpimg2.jpg'
import {BsStopwatchFill} from "react-icons/bs"
import {FaHeart} from "react-icons/fa6"

export default function Recpieitems(){
    const allRecpies=useLoaderData()
    console.log(allRecpies) 
    return(
       <>
         <div className='card-container'>
            {
                allRecpies?.map((item,index)=>{
                    return(
                        <div key={index} className='card'>
                            <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px"></img>
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons' >
                                    <div className='time'><BsStopwatchFill/></div>
                                    <FaHeart/>

                                </div>
                            </div>



                        </div>
                    )
                })
            }
         </div>
 
 
      </>
    )
}