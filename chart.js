function fetchThingSpeakData(channelID, readAPIKey, results = 10) {
    const apiUrl = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=${results}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.feeds && data.feeds.length > 0) {
                displayData(data.feeds);
                updateLastUpdated(); // Call the update function
            } else {
                console.log("No data received from ThingSpeak.");
                const dataContainer = document.getElementById('data-container');
                if (dataContainer) {
                    dataContainer.innerHTML = "<p>No data available.</p>";
                }
            }
        })
        .catch(error => {
            console.error("Error fetching ThingSpeak data:", error);
            console.error("Error Details:", error.message, error.stack);
            const dataContainer = document.getElementById('data-container');
            if (dataContainer) {
                dataContainer.innerHTML = "<p>Error fetching data. Please check the console.</p>";
            }
        });
}

function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '<div style="width: 900px; height: 400px;"><canvas id="combinedChart"></canvas></div>';

    const timestamps = feeds.map(feed => new Date(feed.created_at));
    const soilMoistureData = feeds.map(feed => parseFloat(feed.field1));
    const temperatureData = feeds.map(feed => parseFloat(feed.field2));
    const humidityData = feeds.map(feed => parseFloat(feed.field3));
    const recommendationData = feeds.map(feed => {
        const soilMoisture = parseFloat(feed.field1);
        const temperature = parseFloat(feed.field2);
        const humidity = parseFloat(feed.field3);
        const recommendation = calculateRecommendation(soilMoisture, temperature, humidity);

        if (recommendation === "Water immediately.") return 1;
        if (recommendation === "Irrigate immediately.") return 2;
        if (recommendation === "Conditions are optimal.") return 3;
        return NaN;
    });

    const ctx = document.getElementById('combinedChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [
                {
                    label: 'Soil Moisture',
                    data: soilMoistureData,
                    borderColor: 'blue',
                    fill: false,
                    yAxisID: 'y'
                },
                {
                    label: 'Temperature',
                    data: temperatureData,
                    borderColor: 'red',
                    fill: false,
                    yAxisID: 'y1'
                },
                {
                    label: 'Humidity',
                    data: humidityData,
                    borderColor: 'green',
                    fill: false,
                    yAxisID: 'y'
                },
                {
                    label: 'Recommendation',
                    data: recommendationData,
                    borderColor: 'orange',
                    fill: false,
                    yAxisID: 'y2',
                    pointStyle: 'rect',
                    pointRadius: 5,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'MMM d, HH:mm'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Soil Moisture/Humidity'
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temperature'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        color: 'red'
                    }
                },
                y2: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Recommendation'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        color: 'purple',
                        stepSize: 1,
                        callback: function (value, index, values) {
                            if (value === 1) return 'Water Immediately';
                            if (value === 2) return 'Monitor Soil';
                            if (value === 3) return 'Optimal Conditions';
                            return '';
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sensor Data Over Time'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
        }
    });
}

function calculateRecommendation(soilMoisture, temperature, humidity) {
    if (soilMoisture < 30 && temperature > 25) {
        return "Water immediately.";
    } else if (humidity > 80) {
        return "Monitor for potential fungal growth.";
    } else {
        return "Conditions are optimal.";
    }
}

function updateLastUpdated() {
    const now = new Date();
    const formattedTime = now.toLocaleString();

    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = formattedTime;
    }
}

// Example usage (replace with your actual values):
const channelID = 2832064; // Replace with your ThingSpeak Channel ID
const readAPIKey = "HXBVYRHL660AQ23D"; // Replace with your ThingSpeak Read API Key
const numberOfResults = 10; // Optional: Number of data points to retrieve

// Call the function to fetch and display data
fetchThingSpeakData(channelID, readAPIKey, numberOfResults);

// Optional: Refresh data periodically (e.g., every 5 seconds)
setInterval(() => {
    fetchThingSpeakData(channelID, readAPIKey, numberOfResults);
}, 30000); // 5000 milliseconds = 5 seconds