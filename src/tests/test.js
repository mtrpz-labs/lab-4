import axios from "axios";
import moment from "moment";
import {
  addTask,
  updateTaskStatus,
  showCompletedTasks,
  showUnfinishedTasks,
  getOverdueTasks,
  deleteTask,
  editTask,
} from "../func.js";

jest.mock("axios");

describe("Task Functions", () => {
  const taskId = "123";

  const today = moment().format("DD.MM.YYYY");
  const data = [
    {
      id: "1",
      createdAt: "19.05.2023",
      title: "Task 1",
      description: "Description 1",
      deadline: "21.05.2023",
      isDone: true,
    },
    {
      id: "2",
      createdAt: "18.05.2023",
      title: "Task 2",
      description: "Description 2",
      deadline: "22.05.2023",
      isDone: false,
    },
    {
      id: "3",
      createdAt: "17.05.2023",
      title: "Task 3",
      description: "Description 3",
      deadline: "20.05.2023",
      isDone: false,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addTask sends a POST request with the new task data", async () => {
    const newItem = {
      createdAt: today,
      title: "New Task",
      description: "New Description",
      deadline: "23.05.2023",
      isDone: false,
    };

    axios.post.mockResolvedValueOnce();

    await addTask(
      newItem.title,
      newItem.description,
      newItem.createdAt,
      newItem.deadline
    );

    expect(axios.post).toHaveBeenCalledWith(
      "https://64648258043c103502bb3dc7.mockapi.io/tasks",
      newItem
    );
  });

  test("updateTaskStatus sends a PUT request to mark a task as done", async () => {
    axios.put.mockResolvedValueOnce();

    await updateTaskStatus(taskId);

    expect(axios.put).toHaveBeenCalledWith(
      `https://64648258043c103502bb3dc7.mockapi.io/tasks/${taskId}`,
      { isDone: true, completeDate: today }
    );
  });

  test("showCompletedTasks filters and logs completed tasks", () => {
    const consoleSpy = jest.spyOn(console, "log");

    showCompletedTasks(data);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          id: "1",
          createdAt: "19.05.2023",
          title: "Task 1",
          description: "Description 1",
          deadline: "21.05.2023",
          isDone: true,
        },
      ])
    );
  });

  test("showUnfinishedTasks filters, sorts, and logs unfinished tasks", () => {
    const consoleSpy = jest.spyOn(console, "log");

    showUnfinishedTasks(data);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          id: "3",
          createdAt: "17.05.2023",
          title: "Task 3",
          description: "Description 3",
          deadline: "20.05.2023",
          isDone: false,
        },
        {
          id: "2",
          createdAt: "18.05.2023",
          title: "Task 2",
          description: "Description 2",
          deadline: "22.05.2023",
          isDone: false,
        },
      ])
    );
  });

  test("getOverdueTasks filters and logs overdue tasks", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const today = moment().format("DD.MM.YYYY");
    getOverdueTasks(data);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          id: "3",
          createdAt: "17.05.2023",
          title: "Task 3",
          description: "Description 3",
          deadline: "20.05.2023",
          isDone: false,
        },
      ])
    );
  });

  test("deleteTask sends a DELETE request for the specified task", async () => {
    axios.delete.mockResolvedValueOnce();

    await deleteTask(taskId);

    expect(axios.delete).toHaveBeenCalledWith(
      `https://64648258043c103502bb3dc7.mockapi.io/tasks/${taskId}`
    );
  });

  test("editTask sends a PUT request to update the specified task", async () => {
    const updatedItem = {
      title: "Updated Task",
      description: "Updated Description",
      deadline: "24.05.2023",
    };

    axios.put.mockResolvedValueOnce();

    await editTask(
      taskId,
      updatedItem.title,
      updatedItem.description,
      updatedItem.deadline
    );

    expect(axios.put).toHaveBeenCalledWith(
      `https://64648258043c103502bb3dc7.mockapi.io/tasks/${taskId}`,
      updatedItem
    );
  });
});
