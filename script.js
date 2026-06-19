const firebaseConfig = {
    apiKey: "AIzaSyCzL1MuAdCET_YR1AACrMQFSP4t54qBGO8",
    authDomain: "axis-hr-portal.firebaseapp.com",
    projectId: "axis-hr-portal",
    storageBucket: "axis-hr-portal.firebasestorage.app",
    messagingSenderId: "1076360786018",
    appId: "1:1076360786018:web:d39ec1e18527d8842e613b"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const jobsContainer = document.getElementById("jobs");

function loadJobs() {
  db.collection("jobs").onSnapshot(snapshot => {
    jobsContainer.innerHTML = "";

    snapshot.forEach(doc => {
      let job = doc.data();

      jobsContainer.innerHTML += `
        <div class="card">
          <h3>${job.title}</h3>
          <p>${job.location}</p>
          <button onclick="applyJob('${job.title}')">Apply Now</button>
        </div>
      `;
    });
  });
}

function applyJob(title) {
  const phone = "923001234567";
  window.open(`https://wa.me/${phone}?text=I want to apply for ${title}`);
}

loadJobs();
