"use client";
import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import Link from "next/link";


const AddTask = () => {
  const [userTask, setUserTask] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    task: "",
  });

  const tasks = [
    {
      name: "My Task",
    },
    {
      name: "Work Task",
    },
    {
      name: "Personal Task",
    },
  ];

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    const header = { Authorization: `Bearer ${token}` };

    const body = {
      usertaskdata: [
        {
          title: userTask.title,
          date: userTask.date,
          time: userTask.time,
          description: userTask.description,
          task: userTask.task,
        },
      ],
    };

    try {
      const response = await axios.post(api + "/auth/userTask", body, {
        headers: header,
      });

      if (response.data.success === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error saving data");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-[#6b11cb00] to-[#2574fc92] text-white">
        <div className="backdrop-blur-md bg-white/10 shadow-2xl rounded-2xl p-8  flex flex-col items-center border border-white/20">
          <Toaster />
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Create a Task
          </h2>
          <div className="w-full mb-2">
            <TextField
              label="Title"
              variant="outlined"
              onChange={(e) =>
                setUserTask({ ...userTask, title: e.target.value })
              }
              name="title"
              fullWidth
              className="mb-4 bg-white/20 rounded-md text-white"
            />
          </div>

          <div className="w-full">
            <label className="font-semibold text-white block mb-2">
              Select Date & Time
            </label>

            <div className="flex items-center gap-4 bg-white/20 p-4 rounded-lg shadow-md">
              <div className="flex flex-col">
                <label className="text-sm text-white mb-1">Date</label>
                <Calendar
                  value={userTask.date}
                  onChange={(e) =>
                    setUserTask({ ...userTask, date: e.target.value })
                  }
                  className="w-40 p-2 rounded-md bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="calendar-timeonly"
                  className="text-sm text-white mb-1"
                >
                  Time
                </label>
                <Calendar
                  id="calendar-timeonly"
                  value={userTask.time}
                  onChange={(e) =>
                    setUserTask({ ...userTask, time: e.target.value })
                  }
                  timeOnly
                  className="w-30 p-2 rounded-md bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 w-full">
            <label className="font-semibold text-white block mb-2">
              Description
            </label>
            <InputTextarea
              rows={4}
              value={userTask.description}
              onChange={(e) =>
                setUserTask({ ...userTask, description: e.target.value })
              }
              className="w-full p-3 bg-white/20 rounded-md text-white border-none"
            />
          </div>
          <div className="mb-4 w-full">
            <Dropdown
              options={tasks}
              onChange={(e) => setUserTask({ ...userTask, task: e.value })}
              value={userTask.task}
              optionLabel="name"
              className="w-full p-2 rounded-md bg-white/20 text-white border-none"
              placeholder="Select Task"
            />
          </div>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            className="w-full py-3 rounded-lg text-lg font-semibold"
            style={{ backgroundColor: "#ff4081" }}
          >
            Save Task
          </Button>

          <Link href="/task">
            <p className="text-white mt-4">Back to Tasks</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddTask;
