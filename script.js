function maxProfit(timeUnit) {
    const earnings = { T: 1500, P: 1000, C: 3000 };
    const properties = ['T', 'P', 'C'];

    const dp = new Array(timeUnit + 1).fill(null).map(() => ({
        T: { count: 0, profit: 0 },
        P: { count: 0, profit: 0 },
        C: { count: 0, profit: 0 },
    }));

    for (let t = 1; t <= timeUnit; t++) {
        for (const property of properties) {
            const { T, P, C } = dp[t - 1];
            const propertyTime = getPropertyTime(property);

            if (propertyTime <= t) {
                const currentProfit = dp[t][property].profit;
                const previousProfit = dp[t - propertyTime].profit + earnings[property];

                if (previousProfit > currentProfit) {
                    dp[t][property].profit = previousProfit;
                    dp[t][property].count = dp[t - propertyTime][property].count + 1;
                } else {
                    dp[t][property].profit = currentProfit;
                    dp[t][property].count = dp[t - 1][property].count;
                }
            } else {
                dp[t][property].profit = dp[t - 1][property].profit;
                dp[t][property].count = dp[t - 1][property].count;
            }
        }
    }

    return properties.map(property => `${property}: ${dp[timeUnit][property].count}`).join(' ');
}

function getPropertyTime(property) {
    switch (property) {
        case 'T':
            return 5;
        case 'P':
            return 4;
        case 'C':
            return 10;
        default:
            return 0;
    }
}

// Test cases
console.log(maxProfit(7));
console.log(maxProfit(8)); // Output: T: 1 P: 0 C: 0
console.log(maxProfit(13));