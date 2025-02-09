"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../envfile/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';


const Task = () => {
  const [taskdata, setTaskdata] = useState([]);
  
  const fetchTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
    const header = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(api + "/auth/getalltask", { headers: header });

      const retrivedData = response.data.gettaskdata.flatMap((task) => task.usertaskdata);
      setTaskdata(retrivedData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handledelete = (index) => {
    setTaskdata((prevUserdata) => prevUserdata.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6b11cb00] to-[#2574fc92] p-10 text-white">
    <div className="w-32">
      <Link href="/task/addtask">
        <div className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">Add Task <AddIcon/> </div>
      </Link>
    </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl text-white font-bold text-center mb-8">Your Tasks</h1>
        {taskdata.length === 0 ? (
          <p className="text-center text-lg">No tasks available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {taskdata.map((task, index) => (
              <div key={index} className="bg-white text-black p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <h2 className="text-2xl font-semibold text-blue-600">{task.title}</h2>
                <p className="text-gray-600 mt-1">{task.date} at {task.time}</p>
                <p className="text-gray-800  mt-2">{task.description}</p>
                <p className="mt-2 text-gray-500 font-semibold">{task.task.name}</p>
                <div className="flex justify-end gap-4 mt-4">
                <button
                        className="bg-indigo-500 hover:bg-fuchsia-500  p-1 rounded-lg"
                        onClick={() => handleedit(index)}
                      >
                        <EditIcon />
                      </button>
                <button
                        className="bg-red-500 p-1 rounded-lg"
                        onClick={() => handledelete(index)}
                      >
                        <DeleteIcon />
                      </button>
                      </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
