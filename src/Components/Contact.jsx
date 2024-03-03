import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'

import {HiOutlineUserCircle} from "react-icons/hi"
import {IoMdTrash} from "react-icons/io"
import {RiEditCircleLine} from "react-icons/ri"
import { db } from '../firebase'
import { toast } from 'react-toastify'

const Contact = ({con,setUpdate,isUpdate,setIsOpen,isOpen,toRemove,setRemove}) => {
  // console.log("con",con)

   const removeHandler=async(id)=>{
    console.log(id)
    try{
      const contactRef=doc(db,"contacts",id);
      await deleteDoc(contactRef);
      console.log(contactRef)
      toast.error("Contact Removed Successfully",)
    }
    catch(e){
      console.log("Delete nhi ho paa rha",e)
    } 
  }
    const editHandler=(id)=>{
      // console.log("id",id)
      setIsOpen(!isOpen)
      setUpdate(true)
      console.log(isOpen)
      setRemove(id);
  }

  return (
    <div className='flex bg-yellow-100 justify-between items-center m-w-[360px] text-xl gap-4 my-3 rounded-xl px-3' key={con.id}>
          <div className='flex justify-center items-center gap-3'>
            <HiOutlineUserCircle className='text-5xl text-orange-400'/>
            <div className="gap-0">
              <p className='font-semibold'>{con.name}</p>
              <p className='text-base'>{con.email}</p>
            </div>
          </div>
            <div className='text-3xl flex  text-orange gap-2'>
              <RiEditCircleLine onClick={()=>editHandler(con)}/>
              <IoMdTrash onClick={()=>removeHandler(con.id) } className="text-purple-800" />
            </div>
    </div>
  )
}

export default Contact
