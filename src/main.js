import axios from "axios";

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