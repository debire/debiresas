function fetchRecommendation() {
    const url = "https://api.thingspeak.com/channels/2832064/fields/4/last.json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let recommendation = data.field4 || "No data available";
            let recommendationElement = document.getElementById("recommendation");

            recommendationElement.innerText = recommendation;

            // Change color based on recommendation
            if (recommendation.includes("Irrigation Needed")) {
                recommendationElement.style.color = "red"; // Highlight warning
                alert("🚨 Attention: Your farm needs irrigation!");
            } else {
                recommendationElement.style.color = "green"; // Normal condition
            }
        })
        .catch(error => {
            console.error("Error fetching recommendation:", error);
            document.getElementById("recommendation").innerText = "Failed to load recommendation";
        });
}

// Auto-refresh every 30 seconds
setInterval(fetchRecommendation, 20000);