import { useEffect, useState } from 'react'
import './App.css'
import Nav from './Components/Nav'
import {FiSearch} from "react-icons/fi"
import {AiFillPlusCircle} from "react-icons/ai"
import { collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import Model from './Components/Model'
import Contact from './Components/Contact'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [contact, setContact] = useState([]);
  const [filteredContact,setFilteredContact]=useState();
  const [isOpen,setIsOpen]=useState(false);
  const [isUpdate,setUpdate]=useState(false);
  const [toRemove,setRemove]=useState(null);

  async function getContact(){
    try{
      const contactRef = collection(db,"contacts");
      onSnapshot(contactRef,(snapshot)=>{
          const contactList=snapshot.docs.map((doc)=>{
              return {
                id:doc.id,
                ...doc.data()
              }
          })
          setContact(contactList);
          setFilteredContact(contactList);
          console.log(contactList)
      })
      
    }
    
    catch(er){
      console.log(er);
    }
  }
  useEffect(()=>{
    getContact();
  },[])

    const changeHandler=()=>{
      setUpdate(false)  
      setIsOpen(!isOpen)
      console.log(isOpen)
    }
    const filterHandler=(e)=>{
      e.preventDefault();
      console.log(e.target.value)
      const filter=e.target.value;
      const fill= contact.filter((contact)=>(contact.name.toLowerCase().includes(filter.toLowerCase())));
      setFilteredContact(fill);

    }
  return (
    <>
    <div className="  w-[370px] mx-auto">
    <Nav />
    <div className=' flex justify-center item-center relative gap-1'>
      <input onChange={filterHandler} type='text' placeholder='Search..' className="flex-grow border-white border-2 bg-transparent h-[40px] rounded-md p-[2px] pl-9 text-white my-auto mx-2 " />
      <FiSearch  className='absolute left-2 top-2 ml-1 text-white text-3xl '/>
      <AiFillPlusCircle onClick={changeHandler} className=' text-white text-5xl transform hover:scale-110 transition-transform duration-500 cursor-pointer cursor-pointer'/>
    </div>
    <div className='w-[370px] gap-2 '>
      {
        filteredContact.length===0?
        ( <div className=' h-[400px] flex items-center justify-center gap-2'>
            <img src='/images/Hands Contact.png'></img>
        <p className='text-white font-bold text-3xl mb-5'>No User Found..</p>
        </div>)
        :
        (
          filteredContact?.map((con)=>(<Contact key={con.id} con={con} isUpdate={isUpdate} isOpen={isOpen} setIsOpen={setIsOpen} setUpdate={setUpdate} toRemove={toRemove} setRemove={setRemove}/>))
        )
        
      }
    </div>
      <Model isUpdate={isUpdate} setUpdate={setUpdate} isOpen={isOpen} setIsOpen={setIsOpen} contact={contact} toRemove={toRemove} setRemove={setRemove}/>
    </div>
    <ToastContainer/>
    </>
  )
} 

export default App
