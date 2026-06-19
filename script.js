const firebaseConfig = {
  apiKey: "AIzaSyCzL1MuAdCET_YR1AACrMQFSP4t54qBGO8",
  authDomain: "axis-hr-portal.firebaseapp.com",
  projectId: "axis-hr-portal",
  storageBucket: "axis-hr-portal.firebasestorage.app",
  messagingSenderId: "1076360786018",
  appId: "1:1076360786018:web:f94342f5fd54c4732e613b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

/* ---------------- LOAD JOBS ---------------- */
const jobsDiv = document.getElementById("jobs");

if (jobsDiv) {
  db.collection("jobs").onSnapshot(snapshot => {
    jobsDiv.innerHTML = "";

    snapshot.forEach(doc => {
      let job = doc.data();

      jobsDiv.innerHTML += `
        <div class="card">
          <h3>${job.title}</h3>
          <p>${job.location}</p>
          <button onclick="apply('${job.title}')">Apply</button>
        </div>
      `;
    });
  });
}

/* ---------------- APPLY ---------------- */
function apply(title) {
  window.open(`https://wa.me/923119900744?text=I want to apply for ${title}`);
}

/* ---------------- LOGIN ---------------- */
function login() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => alert("Logged in"))
    .catch(err => alert(err.message));
}

/* ---------------- ADD JOB ---------------- */
function addJob() {
  let title = document.getElementById("title").value;
  let location = document.getElementById("location").value;

  db.collection("jobs").add({
    title,
    location
  });

  alert("Job added");
}
