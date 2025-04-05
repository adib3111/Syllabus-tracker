let subjects = [];

function addSubject() {
    const subjectName = prompt("Enter subject name:");
    const totalTopics = prompt("Enter total number of topics:");
    let topics = [];

    for (let i = 0; i < totalTopics; i++) {
        let completed = confirm(`Is topic ${i + 1} completed?`);
        topics.push(completed);
    }

    subjects.push({ subjectName, topics });

    renderSubjects();
}

function renderSubjects() {
    const subjectsDiv = document.getElementById('subjects');
    subjectsDiv.innerHTML = '';

    subjects.forEach((subject, index) => {
        let subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');
        subjectDiv.innerHTML = `
            <h3>${subject.subjectName}</h3>
            <ul>
                ${subject.topics.map((completed, i) => `
                    <li>Topic ${i + 1}: ${completed ? 'Completed' : 'Not Completed'}</li>
                `).join('')}
            </ul>
        `;
        subjectsDiv.appendChild(subjectDiv);
    });
}

function calculateProgress() {
    let totalTopics = 0;
    let completedTopics = 0;

    subjects.forEach(subject => {
        subject.topics.forEach(topic => {
            totalTopics++;
            if (topic) completedTopics++;
        });
    });

    const progress = (completedTopics / totalTopics) * 100;
    document.getElementById('progress').innerText = `Total Progress: ${progress.toFixed(2)}%`;
}
