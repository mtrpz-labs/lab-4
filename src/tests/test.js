import moment from "moment";
import axios from "axios";
import {
  addTask,
  updateTaskStatus,
  deleteTask,
  editTask,
  showCompletedTasks,
  showUnfinishedTasks,
  getOverdueTasks,
} from "../func";

// Mock axios for testing
jest.mock("axios");

describe("Task Management Functions", () => {
  const format = "DD.MM.YYYY";
  const apiUrl = "https://64648258043c103502bb3dc7.mockapi.io/tasks";
  const today = moment().format(format);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addTask sends a POST request and returns the response", async () => {
    const task = {
      title: "Task 1",
      description: "Description 1",
      createdAt: "01.01.2023",
      deadline: "05.01.2023",
      isDone: false,
    };
    const response = { data: { id: "1", ...task } };

    axios.post.mockResolvedValue(response);

    const result = await addTask(
      task.title,
      task.description,
      task.createdAt,
      task.deadline
    );

    expect(axios.post).toHaveBeenCalledWith(apiUrl, {
      createdAt: task.createdAt,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      isDone: false,
    });
    expect(result).toEqual(response.data);
  });

  test("updateTaskStatus sends a PUT request and returns the response", async () => {
    const taskId = "1";
    const response = {
      data: { id: taskId, isDone: true, completeDate: today },
    };

    axios.put.mockResolvedValue(response);

    const result = await updateTaskStatus(taskId);

    expect(axios.put).toHaveBeenCalledWith(`${apiUrl}/${taskId}`, {
      isDone: true,
      completeDate: today,
    });
    expect(result).toEqual(response.data);
  });

  test("deleteTask sends a DELETE request and returns the response", async () => {
    const taskId = "1";
    const response = { data: { id: taskId } };

    axios.delete.mockResolvedValue(response);

    const result = await deleteTask(taskId);

    expect(axios.delete).toHaveBeenCalledWith(`${apiUrl}/${taskId}`);
    expect(result).toEqual(response.data);
  });

  test("editTask sends a PUT request and returns the response", async () => {
    const taskId = "1";
    const updatedTask = {
      title: "Updated Task",
      description: "Updated Description",
      deadline: "10.01.2023",
    };
    const response = { data: { id: taskId, ...updatedTask } };

    axios.put.mockResolvedValue(response);

    const result = await editTask(
      taskId,
      updatedTask.title,
      updatedTask.description,
      updatedTask.deadline
    );

    expect(axios.put).toHaveBeenCalledWith(`${apiUrl}/${taskId}`, {
      title: updatedTask.title,
      description: updatedTask.description,
      deadline: updatedTask.deadline,
    });
    expect(result).toEqual(response.data);
  });

  test("showCompletedTasks returns completed tasks", () => {
    const tasks = [
      { id: "1", title: "Task 1", isDone: true },
      { id: "2", title: "Task 2", isDone: false },
    ];

    const completedTasks = showCompletedTasks(tasks);

    expect(completedTasks).toEqual([tasks[0]]);
  });

  test("showUnfinishedTasks returns unfinished tasks sorted by deadline", () => {
    const tasks = [
      { id: "1", title: "Task 1", isDone: true, deadline: "05.01.2023" },
      { id: "2", title: "Task 2", isDone: false, deadline: "10.01.2023" },
      { id: "3", title: "Task 3", isDone: false, deadline: "01.01.2023" },
    ];

    const unfinishedTasks = showUnfinishedTasks(tasks);

    expect(unfinishedTasks).toEqual([tasks[2], tasks[1]]);
  });

  test("getOverdueTasks returns overdue tasks", () => {
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
    const consoleSpy = jest.spyOn(console, "log");
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
});
