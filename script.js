let subjects = [];

function addSubject() {
    const subjectName = prompt("Enter subject name:");
    const totalTopics = prompt("Enter total number of topics:");
    let topics = [];

    for (let i = 0; i < totalTopics; i++) {
        let topicName = prompt(`Enter name of topic ${i + 1}:`);
        topics.push({ name: topicName, completed: false });
    }

    subjects.push({ subjectName, topics });
    renderSubjects();
    saveData();  // Save to local storage
}

function renderSubjects() {
    const subjectsDiv = document.getElementById('subjects');
    subjectsDiv.innerHTML = '';

    subjects.forEach((subject, subjectIndex) => {
        let subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');
        subjectDiv.innerHTML = `
            <h3>${subject.subjectName}</h3>
            <ul>
                ${subject.topics.map((topic, topicIndex) => `
                    <li class="topic">
                        <input type="checkbox" id="topic-${subjectIndex}-${topicIndex}" ${topic.completed ? 'checked' : ''} onclick="toggleCompletion(${subjectIndex}, ${topicIndex})">
                        <label for="topic-${subjectIndex}-${topicIndex}">${topic.name}</label>
                    </li>
                `).join('')}
            </ul>
        `;
        subjectsDiv.appendChild(subjectDiv);
    });
}

function toggleCompletion(subjectIndex, topicIndex) {
    subjects[subjectIndex].topics[topicIndex].completed = !subjects[subjectIndex].topics[topicIndex].completed;
    saveData();  // Save the updated data
}

function calculateProgress() {
    let totalTopics = 0;
    let completedTopics = 0;

    subjects.forEach(subject => {
        subject.topics.forEach(topic => {
            totalTopics++;
            if (topic.completed) completedTopics++;
        });
    });

    const progress = (completedTopics / totalTopics) * 100;
    document.getElementById('progress').innerText = `Total Progress: ${progress.toFixed(2)}%`;
}

function saveData() {
    localStorage.setItem('syllabusData', JSON.stringify(subjects));
}

function loadData() {
    const savedData = localStorage.getItem('syllabusData');
    if (savedData) {
        subjects = JSON.parse(savedData);
        renderSubjects();
    }
}

// Load saved data when the page is loaded
window.onload = loadData;
