const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzc2FqamFuQGdpdGFtLmluIiwiZXhwIjoxNzgwODE0Njg0LCJpYXQiOjE3ODA4MTM3ODQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4MTBjZTBlNy01NTA5LTRkOWEtYTg3ZS03NjhjYTI3MjgxNzAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzdW1hIGxhdGhhIiwic3ViIjoiYWY3YzZjZDMtNzk4YS00YmQyLThmODctYThiYjI4MjY1YTQ1In0sImVtYWlsIjoic3NhamphbkBnaXRhbS5pbiIsIm5hbWUiOiJzdW1hIGxhdGhhIiwicm9sbE5vIjoiMjAyMzAwNjk5OSIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6ImFmN2M2Y2QzLTc5OGEtNGJkMi04Zjg3LWE4YmIyODI2NWE0NSIsImNsaWVudFNlY3JldCI6IlhoeWpaZHpodXd2RXRFWUEifQ.JwRm7xkVsitfrG--BnfBKErZVQQ-qcGhfzWlrFSrSrI";

async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          stack,
          level,
          package: packageName,
          message
        })
      }
    );

    const data = await response.json();
    console.log("Log Success:", data);
  } catch (err) {
    console.error("Log Error:", err.message);
  }
}

module.exports = Log;