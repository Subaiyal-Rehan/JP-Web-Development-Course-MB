import { useEffect, useRef, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [txt, settxt] = useState<any>("");
  const [txtList, setTxtList] = useState<any>([])
  const inputRef = useRef<any>(null)
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let storedTodosString = localStorage.getItem("todos")
    const todos = storedTodosString ? JSON.parse(storedTodosString) : [];
    setTxtList(todos);
  }, [])

  const saveToLocalStorage = (list: any) => {
    localStorage.setItem("todos", JSON.stringify(list))
  }

  const editTask = (i: any, j: any) => {
    let newValue = prompt("Enter Your Updated Todo", j.todo);
    txtList[i].todo = newValue;
    txtList[i].isCompleted = false;
    setTxtList([...txtList]);
  }

  return (
    <>
      <div className='mainContainer'>
        <div className='bg-overlay py-5'>
          <h1 className='text-center text-white display-3 mb-3'><img src="../public/Logo.avif" width="70" /> iTask - Your <span className='text-orange'>TODO</span> Manager</h1>
          <div className='container bg-white rounded-4 p-5'>
            <div className='AddTaskContainer'>
              <form onSubmit={(e) => {
                e.preventDefault(); if (txt.length < 1) { return }; settxt(txt); setTxtList((prevTxtList: any) => {
                  const newList: any = [...prevTxtList, { id: uuidv4(), todo: txt, isCompleted: false }];
                  saveToLocalStorage(newList);
                  return newList;
                }); inputRef.current.value = "";
              }} className='addForm d-flex rounded-pill'>
                <input placeholder='Enter Your Todo' className='addInput border-0' onChange={(e) => settxt(e.target.value)} ref={inputRef} type="text" />
                <button className='addBtn rounded-0 btn fs-3 px-2 px-sm-5 btn-orange'>Add</button>
              </form>
            </div>
            <hr />
            <div className="tasksContainer mt-3">
              <div className='ms-2 d-flex'>
                <input type="checkbox" onClick={()=>setShowFinished(!showFinished)} id='showFinishedInput' checked={showFinished} />
                <label htmlFor='showFinishedInput' className='fs-4  ms-2'>Show Finished</label>
              </div>
              <div className="d-flex justify-content-between">
                <h2>Your Todos</h2>
                <button onClick={() => {
                  if (confirm("Do you really want to delete all of your todos?")) {
                    saveToLocalStorage([]);
                    setTxtList([]);
                  } else { }
                }} className='btn btn-danger'>Delete All</button>
              </div>
              {txtList.length === 0 && <h3 className='ms-2 fs-4'>No Todos to display</h3>}
              {txtList.map((j: any, i: any) => {
                return (showFinished || !j.isCompleted) && (
                  <>
                    <div key={i} className='todoMainDiv d-flex justify-content-between align-items-center'>
                      <div className="text d-flex align-items-center">
                        <input className='checkInput ms-2 mb-2' checked={j.isCompleted} type="checkbox" onChange={() => { j.isCompleted = !j.isCompleted; saveToLocalStorage(txtList); setTxtList([...txtList]) }} id='checkboxInput' />
                        <p className={j.isCompleted ? "text-decoration-line-through text-muted opacity-75 ms-3 fs-2" : "ms-3 fs-2"}>{j.todo}</p>
                      </div>
                      <div className="buttons">
                        <button className='editBtn btn fs-4 py-1 mx-1 btn-orange' onClick={() => { editTask(i, j); saveToLocalStorage(txtList) }}><MdEdit /></button>
                        <button className='btn fs-4 py-1 mx-1 btn-orange' onClick={() => { txtList.splice(i, 1); saveToLocalStorage(txtList); setTxtList([...txtList]); }}><MdDelete /></button>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
