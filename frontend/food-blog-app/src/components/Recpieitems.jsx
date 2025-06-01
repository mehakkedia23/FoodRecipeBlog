import React from 'react'
import { useLoaderData,Link } from 'react-router-dom'
import foodrcpimg2 from '../assets/foodrcpimg2.jpg'
import {BsStopwatchFill} from "react-icons/bs"
import {FaHeart} from "react-icons/fa6"
import {FaEdit} from "react-icons/fa"
import {MdDelete} from "react-icons/md"
import { useEffect,useState } from 'react'
import axios from 'axios'

export default function Recpieitems(){
    const recpies=useLoaderData()
    const [allRecpies,setAllRecpies]=useState()
    let path=window.location.pathname=="/myRecpie" ?true :false
    let favItems=JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecpie,setIsFavRecpie]=useState(false)
    console.log(allRecpies) 
    useEffect(()=>{
             setAllRecpies(recpies)
    },[recpies])

    const onDelete=async(id)=>{
        await axios.delete(`http://localhost:5000/recpie/${id}`)
        .then((res)=>console.log(res))

        setAllRecpies(recpies=>recpies.filter(recpie=>recpie._id!==id))
        let filterItem=favItems.filter(recpie=>recpie._id !==item._id)
          localStorage.setItem("fav",JSON.stringify(filterItem))
    }
    const favRecpie=(item)=>{
        let filterItem=favItems.filter(recpie=>recpie._id !==item._id)
             favItems =favItems.filter(recpie=>recpie._id===item._id).length===0 ? [...favItems,item] :filterItem  
             localStorage.setItem("fav",JSON.stringify(favItems))
             setIsFavRecpie(pre=>!pre) 
    }
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
                                    {(!path)?<FaHeart onClick={()=>favRecpie(item)} style={{color:(favItems.some(res=>res._id===item._id)) ? "red" : ""}} />:
                                   <div className='action'>
                                     <Link to={`/editRecpie/${item._id}`} className="editIcon"><FaEdit/></Link>
                                    <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon'/>
                                   </div>
                                   }


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