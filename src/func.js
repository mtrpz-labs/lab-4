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

  export function showCompletedTasks(data) {
    const completedTasks = data.filter((item) => item.isDone === true);
    console.log(completedTasks);
  }
  
  export function showUnfinishedTasks(data) {
    const unfinishedTasks = data.filter((item) => !item.isDone);
    const urgentTasks = unfinishedTasks.sort((a, b) =>
      moment(a.deadline, format).diff(moment(b.deadline, format))
    );
    console.log(urgentTasks);
    return urgentTasks;
  }
  
  export function getOverdueTasks(data) {
    const today = moment().format(format);
    const overdueTasks = data.filter((item) =>
      moment(item.deadline, format).isBefore(moment(today, format), "day")
    );
    console.log(overdueTasks);
    return overdueTasks;
  }