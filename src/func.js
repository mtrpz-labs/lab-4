import moment from "moment";
import axios from "axios";

const format = "DD.MM.YYYY";
const today = moment().format(format);

export function addTask(title, description, time, deadline) {
  const newItem = {
    createdAt: time,
    title: title,
    description: description,
    deadline: deadline,
    isDone: false,
  };
  axios.post("https://64648258043c103502bb3dc7.mockapi.io/tasks", newItem);
}

export function updateTaskStatus(taskId) {
  axios.put(`https://64648258043c103502bb3dc7.mockapi.io/tasks/${taskId}`, {
    isDone: true,
    completeDate: today,
  });
  console.log(`Task with ID ${taskId} is marked as done.`);
}

export function deleteTask(taskId) {
    axios.delete(`https://64648258043c103502bb3dc7.mockapi.io/tasks/${taskId}`);
    console.log(`Task with ID ${taskId} has been deleted.`);
  }
  
  export function editTask(taskId, title, description, deadline) {
    const updatedItem = {
      title: title,
      description: description,
      deadline: deadline,
    };
  
    axios.put(
      `https://64648258043c103502bb3dc7.mockapi.io/tasks/${taskId}`,
      updatedItem
    );
    console.log(`Task with ID ${taskId} has been updated.`);
  }
  