import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import "./Model.css"
import { Formik } from 'formik'
import { Field  } from 'formik'
import { Form } from 'formik'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'

const Model = ({setIsOpen,isOpen,isUpdate,setUpdate,contact,toRemove,setRemove}) => {
  console.log(contact)
  async function addContact(newContact){
    try{
      const contactRef = collection(db,"contacts");
      await addDoc(contactRef,newContact);
      toast.success("Contact Updated Successfully")
    }
    catch(er){
      console.log("Error while adding",er)
    }
  }
  async function updateContact(value,id){
    const contactRef=doc(db,"contacts",id);
    await updateDoc(contactRef,value);
    setUpdate(false);
    toast.info("Contact Updated Successfully")
  }
    const closeHandler=()=>{
        setIsOpen(!isOpen)
    }
  return (
    <div className='form-cont flex justify-center items-center absolute top-[30%] ml-6 '>
      {
        isOpen&&
        (
          <Formik
            initialValues={
              isUpdate?{
                name:toRemove.name,email:toRemove.email,
              }:
              {
              name:"",email:"",
            }}
             onSubmit={(value)=>{console.log(value)
             {
              isUpdate?updateContact(value,toRemove.id):addContact(value)
             }
              
              setIsOpen(!isOpen)
             }}
          >
            <Form className='py-2 z-50 form-cont w-[320px] h-[240px] bg-white relative rounded '>
                <div className=' flex flex-col p-4 gap-3'>
                    <div className='flex flex-col'>
                        <label htmlFor='name'  className='text-xl font-semibold mb-1' >Name</label>
                        <Field type='text' name='name' placeholder='Enter Name' required className='border-2 border-black text-black flex flex-grow h-8 px-1'></Field>
                    </div>
                    
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='text-xl font-semibold mb-1'>Email</label>
                        <Field type='email' name='email'  placeholder='Enter Email' required className='border-2 border-black text-black flex flex-grow h-8 px-1'></Field>
                    </div>
                    
                </div>
                <div className='flex justify-end px-4 mt-2'>
                    <button  type='submit' className='bg-yellow-300 rounded-md p-1 font-semibold border-2 border-black transform hover:scale-110 transition-transform duration-500'> {isUpdate?"Update":"Add"}  Contact</button>
                </div>
                <AiOutlineClose onClick={closeHandler} className='absolute top-0 right-0 bg-red-500 p-1 text-2xl rounded transform hover:scale-90 transition-transform duration-500 cursor-pointer'/>
                
            </Form>
          </Formik>
            
        )
      }
      {
        isOpen&&(<div className='absolute mx-auto w-screen h-screen z-10 backdrop-blur'></div>)
      }
      
    </div>
  )
}

export default Model
