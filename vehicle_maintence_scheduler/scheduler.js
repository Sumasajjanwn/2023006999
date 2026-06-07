function maximizeImpact(tasks, capacity) {
    const n = tasks.length;

    const dp = Array(n + 1)
        .fill()
        .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const { duration, impact } = tasks[i - 1];

        for (let w = 0; w <= capacity; w++) {
            if (duration <= w) {
                dp[i][w] = Math.max(
                    impact + dp[i - 1][w - duration],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][capacity];
}

const tasks = [
    { duration: 5, impact: 9 },
    { duration: 6, impact: 10 },
    { duration: 1, impact: 5 }
];

console.log("Maximum Impact:", maximizeImpact(tasks, 10));