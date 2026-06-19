const jobsContainer = document.getElementById("jobs");

const jobs = [
  { title: "HR Officer", location: "Islamabad" },
  { title: "Admin Manager", location: "Lahore" }
];

jobs.forEach(job => {
  jobsContainer.innerHTML += `
    <div class="card">
      <h3>${job.title}</h3>
      <p>${job.location}</p>
      <button onclick="apply('${job.title}')">Apply</button>
    </div>
  `;
});

function apply(title) {
  window.open("https://wa.me/923001234567?text=I want to apply for " + title);
}
