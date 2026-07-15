const assessmentData = {
    body: {
        color: '#ffcc00',
        questions: [
            'I enjoy a healthy, balanced diet and keep well hydrated',
            'I exercise and am sufficiently active to stay healthy',
            'I get good-quality sleep and take regular breaks',
            'I do not rely on stimulants (e.g. caffeine) or sedatives (e.g. alcohol)',
            'I have regular health check-ups',
        ]
    },
    mind: {
        color: '#006443',
        questions: [
            'I think clearly and take action when my focus drops',
            'I monitor my stress levels and take helpful action if needed',
            'I stimulate my mind outside of work and learn new things',
            'I plan, prioritize and achieve tasks without multitasking',
            'I manage my internal dialogue with balance and self-compassion',
        ]
    },
    heart: {
        color: '#d40511',
        questions: [
            'I positively manage any emotions I feel',
            'I have a supportive network of friends that makes me feel good',
            'I have good relationships with my colleagues at work',
            'I have good relationships and spend enough time with those closest to me',
            'I create time for activities that make me happy',
        ]
    },
    purpose: {
        color: '#333333',
        questions: [
            'I know my values and live them out in life and at work',
            'I know my strengths and use them in life and at work',
            'I regularly check that I\'m doing things that matter',
            'I am involved with meaningful organizations/movements/institutions',
            'I regularly spend my time/energy/resources giving something back',
        ]
    }
};

// State
let employeeInfo = { name: '', employeeId: '', department: '' };
let currentTab = 'body';
let assessmentAnswers = {
    body: {},
    mind: {},
    heart: {},
    purpose: {}
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initializeEventListeners();
    renderQuestions();
});

function initializeEventListeners() {
    // Employee Form
    document.getElementById('employeeForm').addEventListener('submit', handleEmployeeSubmit);

    // Tab Navigation
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => handleTabClick(tab.dataset.tab));
    });

    // Navigation Buttons
    document.getElementById('prevBtn').addEventListener('click', handlePrevious);
    document.getElementById('nextBtn').addEventListener('click', handleNext);
    document.getElementById('resetBtn').addEventListener('click', handleReset);

    // Results Buttons
    document.getElementById('downloadPdfBtn').addEventListener('click', handleDownloadPDF);
    document.getElementById('startOverBtn').addEventListener('click', handleStartOver);
}

function handleEmployeeSubmit(e) {
    e.preventDefault();
    employeeInfo.name = document.getElementById('employeeName').value.trim();
    employeeInfo.employeeId = document.getElementById('employeeId').value.trim();
    employeeInfo.department = document.getElementById('employeeDepartment').value;

    showScreen('assessmentScreen');
}

function checkAllQuestionsAnswered() {
    const questions = assessmentData[currentTab].questions;
    for (let i = 0; i < questions.length; i++) {
        if (assessmentAnswers[currentTab][i] === undefined) {
            return false;
        }
    }
    return true;
}

function handleTabClick(tab) {
    if (tab === currentTab) {
        return; // Already on this tab
    }

    if (!checkAllQuestionsAnswered()) {
        alert('Please answer all questions in the current section before switching tabs.');
        return;
    }

    switchTab(tab);
}

function switchTab(tab) {
    currentTab = tab;

    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab-${tab}`).classList.add('active');

    // Update progress bar
    const tabs = ['body', 'mind', 'heart', 'purpose'];
    const progress = ((tabs.indexOf(tab) + 1) / tabs.length) * 100;
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = progress + '%';
    progressFill.style.backgroundColor = assessmentData[tab].color;

    // Update category labels
    document.getElementById('currentCategory').textContent = tab;
    document.getElementById('resetCategory').textContent = tab.charAt(0).toUpperCase() + tab.slice(1);

    // Re-render questions
    renderQuestions();
    updateTotal();
    updateNavigationButtons();
}

function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    const questions = assessmentData[currentTab].questions;
    questions.forEach((question, index) => {
        const row = document.createElement('div');
        row.className = 'question-row';

        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = `${index + 1}. ${question} <span style="color: #dc2626;">*</span>`;

        const options = document.createElement('div');
        options.className = 'question-options';

        for (let i = 5; i >= 1; i--) {
            const optionGroup = document.createElement('div');
            optionGroup.className = 'option-group';

            const label = document.createElement('div');
            label.className = 'option-label';
            label.textContent = i;

            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', `${i} - ${getScaleLabel(i)}`);

            if (assessmentAnswers[currentTab][index] === i) {
                btn.classList.add('selected');
            }

            btn.addEventListener('click', () => handleAnswerSelect(index, i));

            optionGroup.appendChild(label);
            optionGroup.appendChild(btn);
            options.appendChild(optionGroup);
        }

        row.appendChild(questionText);
        row.appendChild(options);
        container.appendChild(row);
    });
}

function getScaleLabel(value) {
    const labels = {
        5: 'Always True',
        4: 'Mostly True',
        3: 'Sometimes True',
        2: 'Rarely True',
        1: 'Never True'
    };
    return labels[value];
}

function handleAnswerSelect(questionIndex, value) {
    assessmentAnswers[currentTab][questionIndex] = value;
    renderQuestions();
    updateTotal();
    updateNavigationButtons();
}

function updateTotal() {
    const answers = Object.values(assessmentAnswers[currentTab]);
    const total = answers.reduce((sum, val) => sum + val, 0);
    document.getElementById('categoryTotal').textContent = total;
}

function handleReset() {
    assessmentAnswers[currentTab] = {};
    renderQuestions();
    updateTotal();
    updateNavigationButtons();
}

function handlePrevious() {
    const tabs = ['body', 'mind', 'heart', 'purpose'];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
        switchTab(tabs[currentIndex - 1]);
    }
}

function handleNext() {
    if (!checkAllQuestionsAnswered()) {
        alert('Please answer all questions before proceeding to the next section.');
        return;
    }

    const tabs = ['body', 'mind', 'heart', 'purpose'];
    const currentIndex = tabs.indexOf(currentTab);

    if (currentIndex < tabs.length - 1) {
        switchTab(tabs[currentIndex + 1]);
    } else {
        // Last tab - show results
        showResults();
    }
}

function updateNavigationButtons() {
    const tabs = ['body', 'mind', 'heart', 'purpose'];
    const currentIndex = tabs.indexOf(currentTab);
    const allAnswered = checkAllQuestionsAnswered();

    // Show/hide previous button
    document.getElementById('prevBtn').style.display = currentIndex === 0 ? 'none' : 'block';

    // Enable/disable next button based on whether all questions are answered
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = !allAnswered;
    nextBtn.style.opacity = allAnswered ? '1' : '0.5';
    nextBtn.style.cursor = allAnswered ? 'pointer' : 'not-allowed';
}

function showResults() {
    const scores = calculateScores();

    // Display employee info
    document.getElementById('displayName').textContent = employeeInfo.name;
    document.getElementById('displayId').textContent = employeeInfo.employeeId;
    document.getElementById('displayDepartment').textContent = employeeInfo.department;

    // Display scores
    displayScore('body', scores.body);
    displayScore('mind', scores.mind);
    displayScore('heart', scores.heart);
    displayScore('purpose', scores.purpose);

    const totalScore = scores.body + scores.mind + scores.heart + scores.purpose;
    const percentage = ((totalScore / 100) * 100).toFixed(1);
    document.getElementById('totalScore').textContent = `${totalScore} / 100 (${percentage}%)`;

    showScreen('resultsScreen');
}

function calculateScores() {
    return {
        body: Object.values(assessmentAnswers.body).reduce((sum, val) => sum + val, 0),
        mind: Object.values(assessmentAnswers.mind).reduce((sum, val) => sum + val, 0),
        heart: Object.values(assessmentAnswers.heart).reduce((sum, val) => sum + val, 0),
        purpose: Object.values(assessmentAnswers.purpose).reduce((sum, val) => sum + val, 0),
    };
}

function displayScore(category, score) {
    const percentage = (score / 25) * 100;
    document.getElementById(`${category}Score`).textContent = `${score} / 25 (${percentage.toFixed(0)}%)`;
    document.getElementById(`${category}Progress`).style.width = percentage + '%';
}

function handleDownloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const scores = calculateScores();
    const totalScore = scores.body + scores.mind + scores.heart + scores.purpose;
    const maxScore = 100;
    const totalPercentage = ((totalScore / maxScore) * 100).toFixed(1);

    // Background color for header
    doc.setFillColor(26, 26, 26);
    doc.rect(0, 0, 210, 45, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('Assessment Complete!', 105, 20, { align: 'center' });

    doc.setFontSize(11);
    doc.text('Thank you for completing the Wellbeing Assessment.', 105, 30, { align: 'center' });

    // Employee Information Box
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(15, 50, 180, 35, 3, 3, 'F');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Employee Information', 20, 60);

    doc.setFontSize(10);
    doc.setTextColor(102, 102, 102);
    doc.text('Name:', 20, 70);
    doc.text('Employee ID:', 80, 70);
    doc.text('Department:', 140, 70);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(employeeInfo.name, 20, 77);
    doc.text(employeeInfo.employeeId, 80, 77);
    doc.text(employeeInfo.department, 140, 77);

    // Results Section
    doc.setFontSize(14);
    doc.text('Your Results', 20, 95);

    let yPos = 105;

    // Body Score
    doc.setFillColor(254, 243, 199); // Light yellow
    doc.roundedRect(15, yPos, 180, 22, 2, 2, 'F');
    doc.setDrawColor(234, 179, 8); // Yellow border
    doc.setLineWidth(1);
    doc.line(15, yPos, 15, yPos + 22);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('Body Fuel Tank', 20, yPos + 7);

    const bodyPercentage = (scores.body / 25) * 100;
    doc.text(`${scores.body} / 25 (${bodyPercentage.toFixed(0)}%)`, 160, yPos + 7);

    // Progress bar for Body
    doc.setFillColor(209, 213, 219); // Gray background
    doc.roundedRect(20, yPos + 12, 170, 6, 3, 3, 'F');
    doc.setFillColor(234, 179, 8); // Yellow fill
    doc.roundedRect(20, yPos + 12, (170 * bodyPercentage) / 100, 6, 3, 3, 'F');

    yPos += 27;

    // Mind Score
    doc.setFillColor(220, 252, 231); // Light green
    doc.roundedRect(15, yPos, 180, 22, 2, 2, 'F');
    doc.setDrawColor(22, 163, 74); // Green border
    doc.line(15, yPos, 15, yPos + 22);

    doc.setTextColor(0, 0, 0);
    doc.text('Mind Fuel Tank', 20, yPos + 7);

    const mindPercentage = (scores.mind / 25) * 100;
    doc.text(`${scores.mind} / 25 (${mindPercentage.toFixed(0)}%)`, 160, yPos + 7);

    doc.setFillColor(209, 213, 219);
    doc.roundedRect(20, yPos + 12, 170, 6, 3, 3, 'F');
    doc.setFillColor(22, 163, 74);
    doc.roundedRect(20, yPos + 12, (170 * mindPercentage) / 100, 6, 3, 3, 'F');

    yPos += 27;

    // Heart Score
    doc.setFillColor(254, 226, 226); // Light red
    doc.roundedRect(15, yPos, 180, 22, 2, 2, 'F');
    doc.setDrawColor(220, 38, 38); // Red border
    doc.line(15, yPos, 15, yPos + 22);

    doc.setTextColor(0, 0, 0);
    doc.text('Heart Fuel Tank', 20, yPos + 7);

    const heartPercentage = (scores.heart / 25) * 100;
    doc.text(`${scores.heart} / 25 (${heartPercentage.toFixed(0)}%)`, 160, yPos + 7);

    doc.setFillColor(209, 213, 219);
    doc.roundedRect(20, yPos + 12, 170, 6, 3, 3, 'F');
    doc.setFillColor(220, 38, 38);
    doc.roundedRect(20, yPos + 12, (170 * heartPercentage) / 100, 6, 3, 3, 'F');

    yPos += 27;

    // Purpose Score
    doc.setFillColor(219, 234, 254); // Light blue
    doc.roundedRect(15, yPos, 180, 22, 2, 2, 'F');
    doc.setDrawColor(59, 130, 246); // Blue border
    doc.line(15, yPos, 15, yPos + 22);

    doc.setTextColor(0, 0, 0);
    doc.text('Purpose Fuel Tank', 20, yPos + 7);

    const purposePercentage = (scores.purpose / 25) * 100;
    doc.text(`${scores.purpose} / 25 (${purposePercentage.toFixed(0)}%)`, 160, yPos + 7);

    doc.setFillColor(209, 213, 219);
    doc.roundedRect(20, yPos + 12, 170, 6, 3, 3, 'F');
    doc.setFillColor(59, 130, 246);
    doc.roundedRect(20, yPos + 12, (170 * purposePercentage) / 100, 6, 3, 3, 'F');

    yPos += 32;

    // Total Score Box
    doc.setFillColor(26, 26, 26);
    doc.roundedRect(15, yPos, 180, 18, 2, 2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('Total Overall Score', 20, yPos + 7);
    doc.text(`${totalScore} / ${maxScore} (${totalPercentage}%)`, 160, yPos + 7);

    yPos += 25;

    // Interpretation
    // doc.setTextColor(0, 0, 0);
    // doc.setFontSize(12);
    // doc.text('Score Interpretation:', 20, yPos);
    // yPos += 8;

    // let interpretation = '';
    // let interpretationColor = [0, 0, 0];

    // if (totalScore >= 85) {
    //     interpretation = 'Excellent: You demonstrate strong health and mentality across all areas.';
    //     interpretationColor = [22, 163, 74]; // Green
    // } else if (totalScore >= 70) {
    //     interpretation = 'Good: You are doing well, with some areas for potential improvement.';
    //     interpretationColor = [59, 130, 246]; // Blue
    // } else if (totalScore >= 50) {
    //     interpretation = 'Fair: Consider focusing on areas where you scored lower.';
    //     interpretationColor = [234, 179, 8]; // Yellow
    // } else {
    //     interpretation = 'Needs Attention: We recommend prioritizing your health and well-being.';
    //     interpretationColor = [220, 38, 38]; // Red
    // }

    // doc.setTextColor(...interpretationColor);
    // doc.setFontSize(10);
    // const splitText = doc.splitTextToSize(interpretation, 170);
    // doc.text(splitText, 20, yPos);

    
    // Footer
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(9);
    doc.text(`Assessment Date: ${new Date().toLocaleDateString()}`, 105, 275, { align: 'center' });
    doc.text('This assessment is for pre-training evaluation purposes only.', 105, 282, { align: 'center' });

    // Save
    doc.save(`${employeeInfo.name.replace(/\s+/g, '_')}_Assessment_${new Date().toISOString().split('T')[0]}.pdf`);
}

function handleStartOver() {
    employeeInfo = { name: '', employeeId: '', department: '' };
    currentTab = 'body';
    assessmentAnswers = {
        body: {},
        mind: {},
        heart: {},
        purpose: {}
    };

    document.getElementById('employeeName').value = '';
    document.getElementById('employeeId').value = '';
    document.getElementById('employeeDepartment').value = '';

    showScreen('employeeInfoScreen');
    switchTab('body');
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}