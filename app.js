const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
  })
);

// Endpoint to trigger the POST request
app.get("/trigger-request", async (req, res) => {
  try {
    // Replace 'http://localhost:5000' with the actual URL of your Docker container
    const base_url = "http://localhost:5000";
    const endpoint = "/process_text";

    // Data to be sent in the POST request
    const data = {
      text: "can you provide a list of bridges that are overdue for inspection",
    };

    // Make the POST request using axios
    console.log(req.query);
    const response = await axios.post(base_url + endpoint, req.query);

    // Check the response
    if (response.status === 200) {
      const result = response.data;
      console.log(JSON.parse(result.e2e_result))
      res.json(JSON.parse(result.e2e_result));
    } else {
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to trigger the POST request
app.get("/get_excel_data", async (req, res) => {
  try {
    // Replace 'http://localhost:5000' with the actual URL of your Docker container
    const base_url = "http://localhost:5000";
    const endpoint = "/get_excel_data";

    // Data to be sent in the POST request
    const data = {
      text: "can you provide a list of bridges that are overdue for inspection",
    };

    // Make the POST request using axios
    const response = await axios.get(base_url + endpoint);

    // Check the responseit
    if (response.status === 200) {
      const result = response.data;
      console.log(result);
      res.json(result);
    } else {
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
