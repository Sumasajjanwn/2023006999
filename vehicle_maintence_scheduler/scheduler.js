const tasks = [
  { id: 1, duration: 5, impact: 9 },
  { id: 2, duration: 6, impact: 10 },
  { id: 3, duration: 1, impact: 5 }
];

const capacity = 10;

function knapsack(tasks, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (const task of tasks) {
    for (let w = capacity; w >= task.duration; w--) {
      dp[w] = Math.max(
        dp[w],
        dp[w - task.duration] + task.impact
      );
    }
  }

  return dp[capacity];
}

console.log("Tasks:", tasks);
console.log("Maximum Impact:", knapsack(tasks, capacity));