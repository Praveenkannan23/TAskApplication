"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../envfile/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

const Task = () => {
  const [taskdata, setTaskdata] = useState([]);
  const [edit, setEdit] = useState(null)

  const fetchTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
    const header = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(api + "/auth/getalltask", {
        headers: header,
      });

      const retrivedData = response.data.gettaskdata.flatMap((task) =>
        task.usertaskdata.map((usertask) => ({
          ...usertask,
          recordId: task.recordId,
        }))
      );
      setTaskdata(retrivedData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  

  const handleedit = async (index) => {
    // const token = localStorage.getItem("token")

    // const header = {Authorization: `Bearer${token}`}
  }

  const handledelete = async (index) => {
    const token = localStorage.getItem("token");

    const header = { Authorization: `Bearer ${token}` };

    try {
      const Deletedata = await axios.delete(api + "/auth/deletetask", {
        headers: header,
        data: { recordId: taskdata[index].recordId },
      });
      setTaskdata((prevUserdata) => prevUserdata.filter((_, i) => i !== index));
      console.log;
      if (Deletedata.data.success === true) {
        toast.success(Deletedata.data.message);
      } else {
        toast.error(Deletedata.data.message);
      }
      console.log(Deletedata);
    } catch (error) {
      console.log("Error deleting data", error);
    }
  };


  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6b11cb00] to-[#2574fc92] p-10 text-white">
      <div className="w-32">
        <Link href="/task/addtask">
          <div className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
            Add Task <AddIcon />{" "}
          </div>
        </Link>
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl text-white font-bold text-center mb-8">
          Your Tasks
        </h1>
        {taskdata.length === 0 ? (
          <p className="text-center text-lg">No tasks available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {taskdata.map((task, index) => (
              <div
                key={index}
                className="bg-white text-black p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <p className="text-gray-500 font-semibold">Record ID: {task.recordId}</p>
                <h2 className="text-2xl flex  font-semibold text-blue-600">
                  {task.title}
                </h2>
                <p className="text-gray-600 text-xs mt-1">
                  {task.date}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                   {task.time}
                </p>
                <h1 className="text-blue-600 text-lg mt-2">
                  {task.description}
                </h1>
                <p className="mt-2 text-gray-500 font-semibold">
                  {task.task.name}
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    className="bg-indigo-500 hover:bg-fuchsia-500  p-1 rounded-lg"
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
