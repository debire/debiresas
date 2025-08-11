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

    if (!dataContainer) {
        console.error("Data container element not found.");
        return;
    }

    let html = "<div style='display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start;'>";

    feeds.slice().reverse().forEach(feed => {
        const timestampString = feed.created_at;
        const timestampDate = new Date(timestampString);
        const formattedTimestamp = formatDate(timestampDate);

        const soilMoisture = parseFloat(feed.field1);
        const temperature = parseFloat(feed.field2);
        const humidity = parseFloat(feed.field3);

        const recommendation = calculateRecommendation(soilMoisture, temperature, humidity);

        let soilMoistureDisplay = soilMoisture !== undefined && soilMoisture !== null ? soilMoisture : "N/A";
        let temperatureDisplay = temperature !== undefined && temperature !== null ? temperature : "N/A";
        let humidityDisplay = humidity !== undefined && humidity !== null ? humidity : "N/A";

        html += `
            <div style='box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;; padding: 10px; border-radius:10px; margin: 10px; width: 320px;'>
                <p><strong>Timestamp:</strong> ${formattedTimestamp}</p>
                <p><strong>Soil Moisture (%):</strong> ${soilMoistureDisplay}</p>
                <p><strong>Temperature (°C):</strong> ${temperatureDisplay}</p>
                <p><strong>Humidity (%):</strong> ${humidityDisplay}</p>
                <p><strong>Recommendation:</strong> ${recommendation}</p>
            </div>
        `;
    });

    html += "</div>";
    dataContainer.innerHTML = html;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function calculateRecommendation(soilMoisture, temperature, humidity) {
    if (soilMoisture < 30 && temperature > 25) {
        return "Water immediately.";
    } else if (humidity > 75) {
        return "Irrigate immediately.";
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
const numberOfResults = 8; // Optional: Number of data points to retrieve

// Call the function to fetch and display data
fetchThingSpeakData(channelID, readAPIKey, numberOfResults);

// Optional: Refresh data periodically (e.g., every 5 seconds)
setInterval(() => {
    fetchThingSpeakData(channelID, readAPIKey, numberOfResults);
}, 30000); // 5000 milliseconds = 5 seconds