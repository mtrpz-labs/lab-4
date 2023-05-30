import {
    addTask,
    updateTaskStatus,
    deleteTask,
    editTask,
    getOverdueTasks,
    showUnfinishedTasks,
    showCompletedTasks,
    today
  } from "../services/func.service.js";

  import readline from "readline";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

export async function addTaskOption(args) {
    let title = args[0];
    let description = args[1];
    let deadline = args[2];
    addTask(title, description, today, deadline);
    console.log(
      `Task added:\n title: ${title}\n description: ${description}\n createdAt: ${today}\n deadline: ${deadline}`
    );
    rl.close();
  }
  
  export  async function updateTaskStatusOption(args) {
    let taskId = args[0];
    updateTaskStatus(taskId);
    rl.close();
  }
  
  export async function deleteTaskOption(args) {
    let taskId = args[0];
    deleteTask(taskId);
    rl.close();
  }
  
  export async function editTaskOption(args) {
    let taskId = args[0];
    let title = args[1];
    let description = args[2];
    let deadline = args[3];
    editTask(taskId, title, description, deadline);
    rl.close();
  }
  
  export function displayAllTasks(data) {
    console.log(data);
    rl.close();
  }
  
  export function displayCompletedTasks(data) {
    console.log("Completed Tasks:");
    showCompletedTasks(data);
    rl.close();
  }
  
  export function displayUnfinishedTasks(data) {
    console.log("Unfinished Tasks:");
    showUnfinishedTasks(data);
  }
  
export function displayOverdueTasks(data) {
    console.log("Overdue Tasks:");
    getOverdueTasks(data);
  }