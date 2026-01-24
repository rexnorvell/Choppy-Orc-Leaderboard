// Constants
const PROJECT_ID = "iepfencdlffojzakpldr";
const API_KEY = "sb_publishable_sMYrdznP3isU_zxfZgr_SQ_Y8vk5l92";

// Add an event listener to the submit button
let submit_button = document.querySelector("#submit-form-button");
submit_button.addEventListener("click", function() {submit_form()});

// Get the status message div
let status_message_div = document.querySelector(".status-message");

// Submit the form data to the leaderboard
function submit_form() {
    
    // Initialization
    status_message_div.innerHTML = "";
    let resultDiv = document.createElement("div");
    let error = false;
    let warning = false;

    // If any fields are empty, warn the user
    if (document.querySelector(".username").value === "" ||
        document.querySelector(".time").value === "" || 
        document.querySelector(".screenshot").files.length === 0) {
        warning = true;
    }

    // If the time is out of range, warn the user
    let time_value = parseFloat(document.querySelector(".time").value);
    if (isNaN(time_value) || time_value < 0 ) {
        warning = true;
    }

    // If there was a warning, show warning message
    if (warning) {
        resultDiv.classList.add("submission-warning");
        resultDiv.textContent = "Fill out all fields correctly before submitting.";
    }
    else {

        // First, upload the screenshot
        const file = document.querySelector(".screenshot").files[0];
        const filename = `${crypto.randomUUID()}.${file.name.split(".").pop()}`;
        fetch(`https://${PROJECT_ID}.supabase.co/storage/v1/object/verification-screenshots/${filename}`, {
            method: "POST",
            headers: {
                "Content-Type": file.type,
                "apikey": API_KEY,
                "Authorization": `Bearer ${API_KEY}`
            },
            body: file
        });

        // Then, upload the leaderboard entry
        const today = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        let newEntry = {
            username: document.querySelector(".username").value,
            time: document.querySelector(".time").value,
            date: formattedDate,
            status: "Pending",
            screenshot_path: filename
        };
        fetch(`https://${PROJECT_ID}.supabase.co/rest/v1/leaderboard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": API_KEY,
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(newEntry)
        });

        // If there was an error submitting, show error message
        if (error) {
            resultDiv.classList.add("submission-error");
            resultDiv.textContent = "Failed to submit time.";
        }

        // If successful, show success message
        else {
            resultDiv.classList.add("submission-success");
            resultDiv.textContent = "Successfully submitted time for review.";
        }
    }
    status_message_div.appendChild(resultDiv);
}