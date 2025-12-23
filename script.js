async function predictPlacement() {
  // Get values from form
  let cgpa = parseFloat(document.getElementById("cgpa").value);
  let internship = document.getElementById("internship").value;
  let communication = parseInt(document.getElementById("communication").value);

  let skills = document.querySelectorAll(".skill:checked").length;

  // Call backend API
  try {
    const response = await fetch(
      "https://backend-0thr.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cgpa: cgpa,
          skills: skills,
          internship: internship,
          communication: communication
        })
      }
    );

    const data = await response.json();

    // Show result section
    document.getElementById("result").style.display = "block";

    // Update UI with backend response
    document.getElementById("percentage").innerText =
      data.placementScore + "%";

    document.getElementById("status").innerText =
      data.status;

    document.getElementById("roadmap").innerText =
      data.roadmap;

  } catch (error) {
    alert("Backend not responding. Please try again.");
    console.error(error);
  }
}
