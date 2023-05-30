import { addTaskOption,
    updateTaskStatusOption,
    deleteTaskOption,
    editTaskOption,
    displayAllTasks,
    displayCompletedTasks,
    displayUnfinishedTasks,
    displayOverdueTasks } from "./middlewares/invoke.middlewares.js"

    import { fetchData } from "./services/dataFetching.service.js";

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
  
  main();
  