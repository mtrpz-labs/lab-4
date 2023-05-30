import moment from "moment";
import axios from "axios"

export const format = "DD.MM.YYYY";
const apiUrl = "https://64648258043c103502bb3dc7.mockapi.io/tasks";

export const today = moment().format(format);

export async function addTask(title, description, time, deadline) {
  try {
    const newItem = {
      createdAt: time,
      title: title,
      description: description,
      deadline: deadline,
      isDone: false,
    };
    const response = await axios.post(`${apiUrl}`, newItem);
    console.log(`Task with ID ${response.data.id} has been added.`);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

export async function updateTaskStatus(taskId) {
  try {
    const response = await axios.put(`${apiUrl}/${taskId}`, {
      isDone: true,
      completeDate: today,
    });
    console.log(`Task with ID ${taskId} is marked as done.`);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${taskId}:`, error);
    throw error;
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`${apiUrl}/${taskId}`);
    console.log(`Task with ID ${taskId} has been deleted.`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
    throw error;
  }
}

export async function editTask(taskId, title, description, deadline) {
  try {
    const updatedItem = {
      title: title,
      description: description,
      deadline: deadline,
    };
    const response = await axios.put(`${apiUrl}/${taskId}`, updatedItem);
    console.log(`Task with ID ${taskId} has been updated.`);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${taskId}:`, error);
    throw error;
  }
}

export function showCompletedTasks(data) {
  const completedTasks = data.filter((item) => item.isDone === true);
  console.log(completedTasks);
  return completedTasks;
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