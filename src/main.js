import moment from "moment";
import axios from "axios";
import readline from "readline";
import {
  addTask,
  updateTaskStatus,
  deleteTask,
  editTask,
  getOverdueTasks,
  showUnfinishedTasks,
  showCompletedTasks,
} from "./func.js";

const format = "DD.MM.YYYY";
const today = moment().format(format);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function fetchData() {
    try {
      const response = await axios.get(
        "https://64648258043c103502bb3dc7.mockapi.io/tasks"
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function main() {
    const data = await fetchData();
  
    const [option, ...args] = process.argv.slice(2);
  
    switch (option) {
      case "1":
        addTaskOption(args);
        break;
      case "2":
        updateTaskStatusOption(args);
        break;
      case "3":
        deleteTaskOption(args);
        break;
      case "4":
        editTaskOption(args);
        break;
      case "5":
        displayAllTasks(data);
        break;
      case "6":
        displayCompletedTasks(data);
        break;
      case "7":
        displayUnfinishedTasks(data);
        break;
      case "8":
        displayOverdueTasks(data);
        break;
      default:
        console.log(`Невідома опція: ${option}`);
    }
  }
  
  async function addTaskOption(args) {
    let title = args[0];
    let description = args[1];
    let deadline = args[2];
    addTask(title, description, today, deadline);
    console.log(
      `Task added:\n title: ${title}\n description: ${description}\n createdAt: ${today}\n deadline: ${deadline}`
    );
    rl.close();
  }
  
  async function updateTaskStatusOption(args) {
    let taskId = args[0];
    updateTaskStatus(taskId);
    rl.close();
  }
  
  async function deleteTaskOption(args) {
    let taskId = args[0];
    deleteTask(taskId);
    rl.close();
  }
  
  async function editTaskOption(args) {
    let taskId = args[0];
    let title = args[1];
    let description = args[2];
    let deadline = args[3];
    editTask(taskId, title, description, deadline);
    rl.close();
  }
  
  function displayAllTasks(data) {
    console.log(data);
    rl.close();
  }
  
  function displayCompletedTasks(data) {
    console.log("Completed Tasks:");
    showCompletedTasks(data);
    rl.close();
  }
  
  function displayUnfinishedTasks(data) {
    console.log("Unfinished Tasks:");
    showUnfinishedTasks(data);
  }
  
  function displayOverdueTasks(data) {
    console.log("Overdue Tasks:");
    getOverdueTasks(data);
  }
  
  main();
  