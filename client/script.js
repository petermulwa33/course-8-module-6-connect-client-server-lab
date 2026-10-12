


const API_URL = "http://127.0.0.1:5000/events";

const eventList = document.querySelector("#event-list");
const eventForm = document.querySelector("form");
const titleInput = document.querySelector("#title");

// Fetch events from the Flask server
async function loadEvents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load events");
        }

        const events = await response.json();

        eventList.replaceChildren();
        events.forEach(renderEvent);
    } catch (error) {
        console.error("Error loading events:", error);
    }
}

// Display one event on the page
function renderEvent(event) {
    const li = document.createElement("li");
    li.textContent = event.title;
    eventList.appendChild(li);
}

// Submit a new event to Flask
eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();

    if (!title) {
        alert("Please enter an event title.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to add event");
        }

        renderEvent(data);
        eventForm.reset();
    } catch (error) {
        console.error("Error adding event:", error);
        alert(error.message);
    }
});

// Load existing events when the page opens
loadEvents();
