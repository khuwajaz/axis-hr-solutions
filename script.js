const firebaseConfig = {
    apiKey: "AIzaSyCzL1MuAdCET_YR1AACrMQFSP4t54qBGO8",
    authDomain: "axis-hr-portal.firebaseapp.com",
    projectId: "axis-hr-portal",
    storageBucket: "axis-hr-portal.firebasestorage.app",
    messagingSenderId: "1076360786018",
    appId: "1:1076360786018:web:d39ec1e18527d8842e613b"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

/* ---------------- ADMIN LOGIN ---------------- */
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful");
      loadAdminJobs();
    })
    .catch(err => alert(err.message));
}

/* ---------------- ADD JOB ---------------- */
function addJob() {
  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;

  db.collection("jobs").add({
    title,
    location
  });

  alert("Job added!");
}

/* ---------------- LOAD PUBLIC JOBS ---------------- */
const jobsContainer = document.getElementById("jobs");

if (jobsContainer) {
  db.collection("jobs").onSnapshot(snapshot => {
    jobsContainer.innerHTML = "";

    snapshot.forEach(doc => {
      let job = doc.data();

      jobsContainer.innerHTML += `
        <div class="card">
          <h3>${job.title}</h3>
          <p>${job.location}</p>
          <button onclick="applyJob('${job.title}')">Apply</button>
        </div>
      `;
    });
  });
}

/* ---------------- APPLY BUTTON ---------------- */
function applyJob(title) {
  window.open(`https://wa.me/923001234567?text=I want to apply for ${title}`);
}

/* ---------------- ADMIN JOB LIST ---------------- */
function loadAdminJobs() {
  const adminJobs = document.getElementById("adminJobs");

  db.collection("jobs").onSnapshot(snapshot => {
    adminJobs.innerHTML = "";

    snapshot.forEach(doc => {
      adminJobs.innerHTML += `
        <div class="card">
          <p>${doc.data().title}</p>
        </div>
      `;
    });
  });
}
