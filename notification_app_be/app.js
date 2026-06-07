const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Campus Notification Running"
    });
});

app.listen(3000, () => {
    console.log("Server started");
});