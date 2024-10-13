import React,{useEffect, useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';



function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const[allTodos,setTodos] = useState([]);
  const[newTitle,setNewTitle] = useState("");
  const[newDescription,setNewDescription] = useState("");
  const [CompleteTodos,setIsCompleteTodos] = useState([]);



   const handleAddTodo = ()=>{
    let  newTodoItem = {
      title:newTitle,
      description:newDescription
    };

 
    let  updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
   };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);


  }

  const handleComplete= (index)=> {
    let now = new Date();
    let dd = now.getDate();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' +yyyy + 'at'+ h + ':' + m + ':' + s ;

    let filteredItem = {
         ...allTodos[index],
         completedOn:completedOn
      }

    let updatedCompletedArr = [...CompleteTodos];
    updatedCompletedArr.push(filteredItem);
    setIsCompleteTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
 
  };

   const handleDeleteCompletedTodo = (index) =>{
    let reducedTodo = [...CompleteTodos];
    reducedTodo.splice(index);

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setIsCompleteTodos(reducedTodo);
    
   };


   useEffect(()=>{
   let savedTodo =JSON.parse(localStorage.getItem('todolist'));
   let savedCompletedTodo =JSON.parse(localStorage.getItem('completedTodos'));
       if(savedTodo){
        setTodos(savedTodo);
       }
       
       if(savedCompletedTodo){

        setIsCompleteTodos(savedCompletedTodo);
       }

       
  },[])




  return (
    <div className="App">
   <h1> My Todos</h1>
   <div className ='todo-wrapper'>
   <div className='todo-input'>
    <div className='todo-input-item'>
      <lable> Title : </lable>
      <input type="text" value ={newTitle} onChange={(e)=>setNewTitle (e.target.value)}placeholder="Do what you want to do"/> 
    </div>

    <div className='todo-input-item'>
      <lable> Description : </lable>
      <input type="text"value ={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="write your note here!"/> 
    </div>

    <div className='todo-input-item'>
     <button type="button" onClick={handleAddTodo} className='primarybtn'> Add</button>
    </div>
   </div>

<div className='btn-area'>
    <button 
    className={`secondarybtn ${isCompleteScreen===false && 'active'}`}
     onClick={()=> setIsCompleteScreen(false)}>Todo </button>

    <button
     className={`secondarybtn ${isCompleteScreen===true && 'active'}`}
      onClick={()=> setIsCompleteScreen(true)}>Completed</button> 

</div>

<div className="todo-list">
  
    {isCompleteScreen===false && allTodos.map((item,index)=>{
      return(
    <div className="todo-list-item" key={index}>
    <div>
      <h3>{item.title}</h3>
      <p> {item.description}</p>
    </div>
    <div>
          <AiOutlineDelete className='check-icon-1'
           onClick={()=>handleDeleteTodo(index)} title="Delete?"/>


          <BsCheckLg className='check-icon-2' 
           onClick={()=>handleComplete(index)} title="Complete?"/>
      </div>

    </div>
      )
    
    })}


    {isCompleteScreen===true && CompleteTodos.map((item,index)=>{
      return(
    <div className="todo-list-item" key={index}>
    <div>
      <h3>{item.title}</h3>
      <p> {item.description}</p>
      <p><small>Completed on: {item.completedOn} </small></p>
    </div>


    <div>
          <AiOutlineDelete className='check-icon-1'
           onClick={()=>handleDeleteCompletedTodo(index)} 
           title="Delete?"/>

      </div>

    </div>
      );
    
    })}


   </div> 
  </div>
</div>
    
  );
}

export default App;
