"use client"

import { Todo } from "@/components/Todo";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";

interface TodoType {
  title: any,
  description: string, 
  _id: any,
  isCompleted: boolean
}

export default function Home() {
  const inpClass = "px-3 py-2 border-2 w-full"
  const [formData, setFormData] = useState({
    title: "", description: ""
  })
  const [todoData, setTodos] = useState<TodoType[]>([])

  const fetchTodos = async () => {
    const todos = await axios('http://localhost:3000/api')
    setTodos(todos.data.todos)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const onChangeHandler = (e:any) => {
     const name = e.target.name 
     const value = e.target.value
     setFormData(form => ({...form, [name]:value}))
  }

  const deleteTodo = async (id:any) => {
    const response = await axios.delete('http://localhost:3000/api',{
      params: {mongoId: id}
    })
    toast.success(response.data.msg)
    fetchTodos()
  }

  const completeTodo = async (id:any) => {
    console.log("id:", id)
    const response = await axios.put('http://localhost:3000/api',{}, {
      params: {mongoId: id, check:"hello"}
    })
    toast.success(response.data.msg)
    fetchTodos()
  }

  const onSubmitHandler = async (e:any) => {
    e.preventDefault()
    try {

      const response = await axios.post('http://localhost:3000/api', formData)
      toast.success(response.data.msg)
      setFormData({        title: "", description: ""      })
      await fetchTodos()
    } catch (error) {
      toast.error("Error") 
    }
  }
  return (
    <>
    <ToastContainer theme="dark" />
    <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 mx-auto px-2">
      <input onChange={onChangeHandler} value={formData.title} type="text" name="title" placeholder="Enter Title" className={inpClass} />
      <textarea onChange={onChangeHandler} value={formData.description} name="description" placeholder="Enter Description"  className={inpClass}/>
      <button type="submit" className="bg-orange-600 py-3 px-11 text-white" >Add Todo</button>
    </form>
    <div className="relative overflow-x-auto mx-auto mt-24 max-w-[60%]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
              {todoData.map((item, index) => {
                return <Todo completeTodo={completeTodo} deleteTodo={deleteTodo} key={index} heading={item.title} todo_id={index} description={item.description} completed={item.isCompleted} mongoID={item._id} />
              })}
            </tbody>
        </table>
    </div>

    </>
  );
}
