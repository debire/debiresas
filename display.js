//List
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');

    if (!dataContainer) {
        console.error("Data container element not found.");
        return;
    }

    let html = "<ul>";
    feeds.forEach(feed => {
        const timestamp = feed.created_at;
        const soilMoisture = feed.field1; // Soil Moisture
        const temperature = feed.field2; // Temperature
        const humidity = feed.field3;   // Humidity

        // Check if the fields exist before adding them to the html.
        let soilMoistureDisplay = soilMoisture !== undefined && soilMoisture !== null ? soilMoisture : "N/A";
        let temperatureDisplay = temperature !== undefined && temperature !== null ? temperature : "N/A";
        let humidityDisplay = humidity !== undefined && humidity !== null ? humidity : "N/A";

        html += `<li>Timestamp: ${timestamp}, Soil Moisture: ${soilMoistureDisplay}, Temperature: ${temperatureDisplay}, Humidity: ${humidityDisplay}</li>`;
    });
    html += "</ul>";
    dataContainer.innerHTML = html;
}

//last updated
function updateLastUpdated() {
    const now = new Date();
    const formattedTime = now.toLocaleString(); // Format the time

    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = formattedTime;
    }
}
//time format for last updated
const formattedTime = now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});
//table
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');

    if (!dataContainer) {
        console.error("Data container element not found.");
        return;
    }

    let html = "<table>";
    html += "<thead><tr><th>Timestamp</th><th>Soil Moisture</th><th>Temperature</th><th>Humidity</th></tr></thead>";
    html += "<tbody>";

    feeds.forEach(feed => {
        const timestamp = feed.created_at;
        const soilMoisture = feed.field1;
        const temperature = feed.field2;
        const humidity = feed.field3;

        let soilMoistureDisplay = soilMoisture !== undefined && soilMoisture !== null ? soilMoisture : "N/A";
        let temperatureDisplay = temperature !== undefined && temperature !== null ? temperature : "N/A";
        let humidityDisplay = humidity !== undefined && humidity !== null ? humidity : "N/A";

        html += `<tr><td>${timestamp}</td><td>${soilMoistureDisplay}</td><td>${temperatureDisplay}</td><td>${humidityDisplay}</td></tr>`;
    });

    html += "</tbody></table>";
    dataContainer.innerHTML = html;
}

//table in ascending order
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');

    if (!dataContainer) {
        console.error("Data container element not found.");
        return;
    }

    const reversedFeeds = feeds.slice().reverse();

    let html = "<table>";
    html += "<thead><tr><th>Timestamp</th><th>Soil Moisture</th><th>Temperature</th><th>Humidity</th></tr></thead>";
    html += "<tbody>";

    reversedFeeds.forEach(feed => {
        const timestampString = feed.created_at; // Get the timestamp string
        const timestampDate = new Date(timestampString); // Parse it into a Date object

        // Format the date and time
        const formattedTimestamp = formatDate(timestampDate);

        const soilMoisture = feed.field1;
        const temperature = feed.field2;
        const humidity = feed.field3;

        let soilMoistureDisplay = soilMoisture !== undefined && soilMoisture !== null ? soilMoisture : "N/A";
        let temperatureDisplay = temperature !== undefined && temperature !== null ? temperature : "N/A";
        let humidityDisplay = humidity !== undefined && humidity !== null ? humidity : "N/A";

        html += `<tr><td>${formattedTimestamp}</td><td>${soilMoistureDisplay}</td><td>${temperatureDisplay}</td><td>${humidityDisplay}</td></tr>`;
    });

    html += "</tbody></table>";
    dataContainer.innerHTML = html;
}

//cards
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');

    if (!dataContainer) {
        console.error("Data container element not found.");
        return;
    }

    let html = "<div style='display: flex; flex-wrap: wrap;'>"; // Flexbox for layout

    feeds.forEach(feed => {
        const timestamp = feed.created_at;
        const soilMoisture = feed.field1;
        const temperature = feed.field2;
        const humidity = feed.field3;

        let soilMoistureDisplay = soilMoisture !== undefined && soilMoisture !== null ? soilMoisture : "N/A";
        let temperatureDisplay = temperature !== undefined && temperature !== null ? temperature : "N/A";
        let humidityDisplay = humidity !== undefined && humidity !== null ? humidity : "N/A";

        html += `
            <div style='box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;; padding: 10px; border-radius:10px; margin: 10px; width: 300px;'>
                <p><strong>Timestamp:</strong> ${timestamp}</p>
                <p><strong>Soil Moisture:</strong> ${soilMoistureDisplay}</p>
                <p><strong>Temperature:</strong> ${temperatureDisplay}</p>
                <p><strong>Humidity:</strong> ${humidityDisplay}</p>
            </div>
        `;
    });

    html += "</div>";
    dataContainer.innerHTML = html;
}

//graph
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = "<canvas id='myChart'></canvas>"; // Place a canvas

    const timestamps = feeds.map(feed => feed.created_at);
    const soilMoistureData = feeds.map(feed => feed.field1);
    const temperatureData = feeds.map(feed => feed.field2);
    const humidityData = feeds.map(feed => feed.field3);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Soil Moisture',
                data: soilMoistureData,
                borderColor: 'blue',
                fill: false
            }, {
                label: 'Temperature',
                data: temperatureData,
                borderColor: 'red',
                fill: false
            }, {
                label: 'Humidity',
                data: humidityData,
                borderColor: 'green',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
//in html
//<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

//better graph
//in html head
//<script src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>
//better graph code
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = `
        <div style="display: flex; flex-wrap: wrap;">
            <div style="width: 50%; padding: 10px;"><canvas id="soilMoistureChart"></canvas></div>
            <div style="width: 50%; padding: 10px;"><canvas id="temperatureChart"></canvas></div>
            <div style="width: 50%; padding: 10px;"><canvas id="humidityChart"></canvas></div>
        </div>
    `;

    const timestamps = feeds.map(feed => new Date(feed.created_at)); // Convert to Date objects
    const soilMoistureData = feeds.map(feed => feed.field1);
    const temperatureData = feeds.map(feed => feed.field2);
    const humidityData = feeds.map(feed => feed.field3);

    createChart('soilMoistureChart', timestamps, soilMoistureData, 'Soil Moisture', 'blue');
    createChart('temperatureChart', timestamps, temperatureData, 'Temperature', 'red');
    createChart('humidityChart', timestamps, humidityData, 'Humidity', 'green');
}

function createChart(canvasId, labels, data, label, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                fill: false,
                tension: 0.4, // Add tension for smoother curves
                pointRadius: 3, // Make points slightly larger
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time', // Use time scale for x-axis
                    time: {
                        unit: 'minute', // Adjust unit as needed (minute, hour, day, etc.)
                        displayFormats: {
                            minute: 'MMM D, HH:mm' // Customize time format
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: label
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: label + ' Over Time'
                }
            },
            responsive: true, // Make charts responsive
            maintainAspectRatio: false, // Allow charts to stretch
        }
    });
}
//in html head
//<script src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>
//another gragh
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '<canvas id="combinedChart"></canvas>';

    const timestamps = feeds.map(feed => new Date(feed.created_at));
    const soilMoistureData = feeds.map(feed => feed.field1);
    const temperatureData = feeds.map(feed => feed.field2);
    const humidityData = feeds.map(feed => feed.field3);

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
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'MMM D, HH:mm'
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
                        drawOnChartArea: false, // Prevent grid lines from overlapping
                    },
                    ticks: {
                        color: 'red'
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
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

//full code
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
                updateLastUpdated();
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
    dataContainer.innerHTML = '<canvas id="combinedChart"></canvas>';

    const timestamps = feeds.map(feed => new Date(feed.created_at));
    const soilMoistureData = feeds.map(feed => feed.field1);
    const temperatureData = feeds.map(feed => feed.field2);
    const humidityData = feeds.map(feed => feed.field3);

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
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'MMM D, HH:mm'
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
            responsive: true,
            maintainAspectRatio: false
        }
    });
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
const channelID = "YOUR_CHANNEL_ID";
const readAPIKey = "YOUR_READ_API_KEY";
const numberOfResults = 20;

fetchThingSpeakData(channelID, readAPIKey, numberOfResults);

setInterval(() => {
    fetchThingSpeakData(channelID, readAPIKey, numberOfResults);
}, 5000);

//table with recommendations
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');

    if (!dataContainer) {
        console.error("Data container element not found.");
        return;
    }

    const reversedFeeds = feeds.slice().reverse();

    let html = "<table>";
    html += "<thead><tr><th>Timestamp</th><th>Soil Moisture</th><th>Temperature</th><th>Humidity</th><th>Recommendation</th></tr></thead>";
    html += "<tbody>";

    reversedFeeds.forEach(feed => {
        const timestampString = feed.created_at;
        const timestampDate = new Date(timestampString);
        const formattedTimestamp = formatDate(timestampDate);

        const soilMoisture = feed.field1;
        const temperature = feed.field2;
        const humidity = feed.field3;
        const recommendation = feed.field4;

        let soilMoistureDisplay = soilMoisture !== undefined && soilMoisture !== null ? soilMoisture : "N/A";
        let temperatureDisplay = temperature !== undefined && temperature !== null ? temperature : "N/A";
        let humidityDisplay = humidity !== undefined && humidity !== null ? humidity : "N/A";
        let recommendationDisplay = recommendation !== undefined && recommendation !== null ? "No Recommendation" : recommendation;

        html += `<tr><td>${formattedTimestamp}</td><td>${soilMoistureDisplay}</td><td>${temperatureDisplay}</td><td>${humidityDisplay}</td><td>${recommendationDisplay}</td></tr>`;
    });

    html += "</tbody></table>";
    dataContainer.innerHTML = html;
}

//chart with recommendations
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '<canvas id="combinedChart"></canvas>';

    const timestamps = feeds.map(feed => new Date(feed.created_at));
    const soilMoistureData = feeds.map(feed => feed.field1);
    const temperatureData = feeds.map(feed => feed.field2);
    const humidityData = feeds.map(feed => feed.field3);
    const recommendationData = feeds.map(feed => {
        const recommendation = feed.field4;
        if(recommendation === undefined || recommendation === null){
            return NaN; // Use NaN to represent missing data in the chart
        }
        //You may need to convert the recommendation to a numerical value.
        //If it's text, you'll have to assign numerical representations.
        //Example:
        if (recommendation === "Water") return 1;
        if (recommendation === "Fertilize") return 2;
        if (recommendation === "Monitor") return 3;
        return NaN; // Default for unknown recommendations
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
                    borderColor: 'purple',
                    fill: false,
                    yAxisID: 'y2',
                    pointStyle: 'triangle',
                    pointRadius: 5,
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'MMM D, HH:mm'
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
                        stepSize: 1, // Ensure integer ticks
                        callback: function(value, index, values) {
                            if (value === 1) return 'Water';
                            if (value === 2) return 'Fertilize';
                            if (value === 3) return 'Monitor';
                            return ''; // Handle other values
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sensor Data and Recommendations Over Time'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

//cards with recommendation
function displayData(feeds) {
    const dataContainer = document.getElementById('data-container');

    if (!dataContainer) {
        console.error("Data container element not found.");
        return;
    }

    let html = "<div style='display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start;'>";

    feeds.slice().reverse().forEach(feed => {
        const timestampString = feed.created_at;
        const timestampDate = new Date(timestampString);
        const formattedTimestamp = formatDate(timestampDate);

        const soilMoisture = feed.field1;
        const temperature = feed.field2;
        const humidity = feed.field3;
        const recommendation = feed.field4;

        let soilMoistureDisplay = soilMoisture !== undefined && soilMoisture !== null ? soilMoisture : "N/A";
        let temperatureDisplay = temperature !== undefined && temperature !== null ? temperature : "N/A";
        let humidityDisplay = humidity !== undefined && humidity !== null ? humidity : "N/A";
        let recommendationDisplay = recommendation !== undefined && recommendation !== null ? recommendation : "No Recommendation";

        html += `
            <div style='border: 1px solid #ddd; padding: 15px; margin: 10px; width: 250px;'>
                <p><strong>Timestamp:</strong> ${formattedTimestamp}</p>
                <p><strong>Soil Moisture:</strong> ${soilMoistureDisplay}</p>
                <p><strong>Temperature:</strong> ${temperatureDisplay}</p>
                <p><strong>Humidity:</strong> ${humidityDisplay}</p>
                <p><strong>Recommendation:</strong> ${recommendationDisplay}</p>
            </div>
        `;
    });

    html += "</div>";
    dataContainer.innerHTML = html;
}

//working chart
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
    dataContainer.innerHTML = '<div style="width: 800px; height: 400px;"><canvas id="combinedChart"></canvas></div>';

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
        if (recommendation === "Monitor for potential fungal growth.") return 2;
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
                    borderColor: 'purple',
                    fill: false,
                    yAxisID: 'y2',
                    pointStyle: 'triangle',
                    pointRadius: 5,
                }
            ]
        },
        options: {
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
                        callback: function(value, index, values) {
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
                    text: 'Sensor Data and Recommendations Over Time'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            responsive: true,
            maintainAspectRatio: false
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

// // Example usage (replace with your actual values):
// const channelID = 2832064; // Replace with your ThingSpeak Channel ID
// const readAPIKey = "HXBVYRHL660AQ23D"; // Replace with your ThingSpeak Read API Key
// const numberOfResults = 10; // Optional: Number of data points to retrieve

// Call the function to fetch and display data
fetchThingSpeakData(channelID, readAPIKey, numberOfResults);

// Optional: Refresh data periodically (e.g., every 5 seconds)
setInterval(() => {
    fetchThingSpeakData(channelID, readAPIKey, numberOfResults);
}, 20000); // 5000 milliseconds = 5 seconds