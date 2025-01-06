// Select DOM elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const resultsContainer = document.getElementById('results');

// Drag-and-Drop and Upload
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragging');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragging');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragging');
    handleFileUpload(e.dataTransfer.files[0]);
});

uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));

function handleFileUpload(file) {
    if (!file) {
        alert('No file selected!');
        return;
    }
    console.log('Uploaded file:', file.name);
    simulateParsing(file);
}

// Mock Parsing (Simulates API Response)
function simulateParsing(file) {
    console.log('Simulating resume parsing...');
    const parsedData = {
        name: 'John Doe',
        skills: ['JavaScript', 'HTML', 'CSS', 'React'],
        experience: '3 years of experience in web development',
    };
    displayResults(parsedData);
}

// Display Parsed Data
function displayResults(parsedData) {
    resultsContainer.innerHTML = `
    <h3>Resume Analysis</h3>
    <p><strong>Name:</strong> ${parsedData.name}</p>
    <p><strong>Skills:</strong> ${parsedData.skills.join(', ')}</p>
    <p><strong>Experience:</strong> ${parsedData.experience}</p>
  `;
}

// Keyword Matching and Analysis
analyzeBtn.addEventListener('click', () => {
    const jobDescription = document.getElementById('job-desc').value;
    if (!jobDescription) {
        alert('Please paste a job description.');
        return;
    }

    const resumeSkills = ['JavaScript', 'HTML', 'CSS', 'React']; // Mock skills
    const matches = matchKeywords(resumeSkills, jobDescription);
    visualizeResults(matches);
});

function matchKeywords(resumeSkills, jobDescription) {
    const jobKeywords = jobDescription.toLowerCase().split(/\W+/);
    const matchedSkills = resumeSkills.filter(skill =>
        jobKeywords.includes(skill.toLowerCase())
    );

    return {
        matchedSkills,
        missingSkills: resumeSkills.filter(skill => !matchedSkills.includes(skill)),
    };
}

// Visualization
function visualizeResults(matches) {
    const matchedCount = matches.matchedSkills.length;
    const missingCount = matches.missingSkills.length;
    const total = matchedCount + missingCount;

    const matchPercentage = Math.round((matchedCount / total) * 100);

    resultsContainer.innerHTML += `
    <div id="progress-bar-container">
      <div id="progress-bar" style="width: ${matchPercentage}%;">${matchPercentage}% Match</div>
    </div>
    <p><strong>Matched Skills:</strong> ${matches.matchedSkills.join(', ')}</p>
    <p><strong>Missing Skills:</strong> ${matches.missingSkills.join(', ')}</p>
  `;
}
