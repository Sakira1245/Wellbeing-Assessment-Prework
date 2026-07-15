# Pre-Training Health & Mentality Assessment — HTML/PHP Version

A lightweight, no-build-step version of the Employee Health & Mentality Assessment tool built with plain HTML, Tailwind CSS (CDN), Vanilla JavaScript, and optional PHP + MySQL for backend storage. All core features run entirely client-side; the PHP layer is only needed if you want to prevent duplicate submissions.

---

## Features

- **Employee Intake Form** — collects name, employee ID, and department
- **4 Assessment Categories** — Body, Mind, Heart, and Purpose
- **5 Mandatory Questions per Category** — rated 1–5 (Never True → Always True)
- **Red Asterisks** — required field indicators on every question
- **Tab Navigation Blocking** — cannot switch tabs until all questions on the current tab are answered
- **Disabled Next Button** — grayed out with reduced opacity until all 5 questions are answered
- **Color-Coded Tabs & Progress Bar** — yellow (Body), green (Mind), red (Heart), blue (Purpose)
- **Real-Time Score Totals** — live running total shown below each category's questions
- **Results Screen** — color-coded score cards with animated progress bars per category
- **Overall Score** — total out of 100 with percentage
- **Score Interpretation** — Excellent / Good / Fair / Needs Attention based on total
- **PDF Report Download** — styled PDF matching the results screen layout, named `EmployeeName_Assessment_YYYY-MM-DD.pdf`
- **Start New Assessment** — resets all state and returns to the info screen
- **Optional PHP Backend** — saves scores to MySQL and enforces a 7-day retake lockout per employee ID

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS 3.x via CDN |
| Logic | Vanilla JavaScript (ES6) |
| PDF Generation | jsPDF 2.5.1 via CDN |
| Backend (optional) | PHP 7.4+ |
| Database (optional) | MySQL 5.7+ / MariaDB |

No npm, no Node.js, no build step required.

---

## File Structure

```
employee-assessment/
├── index.html            # All UI screens (intake, assessment, results)
├── script.js             # All app logic, PDF generation, state management
├── save_assessment.php   # (Optional) Save scores to MySQL, enforce retake lockout
└── database.sql          # (Optional) MySQL schema
```

> `styles.css` is not needed — all styling uses Tailwind CSS utility classes directly in the HTML.

---

## Assessment Categories & Questions

### Body (Yellow)
1. I enjoy a healthy, balanced diet and keep well hydrated
2. I exercise and am sufficiently active to stay healthy
3. I get good-quality sleep and take regular breaks
4. I do not rely on stimulants (e.g. caffeine) or sedatives (e.g. alcohol)
5. I have regular health check-ups

### Mind (Green)
1. I think clearly and take action when my focus drops
2. I monitor my stress levels and take helpful action if needed
3. I stimulate my mind outside of work and learn new things
4. I plan, prioritize and achieve tasks without multitasking
5. I manage my internal dialogue with balance and self-compassion

### Heart (Red)
1. I positively manage any emotions I feel
2. I have a supportive network of friends that makes me feel good
3. I have good relationships with my colleagues at work
4. I have good relationships and spend enough time with those closest to me
5. I create time for activities that make me happy

### Purpose (Blue)
1. I know my values and live them out in life and at work
2. I know my strengths and use them in life and at work
3. I regularly check that I'm doing things that matter
4. I am involved with meaningful organizations/movements/institutions
5. I regularly spend my time/energy/resources giving something back

**Rating Scale:** 1 = Never True · 2 = Rarely True · 3 = Sometimes True · 4 = Mostly True · 5 = Always True

Each category scores out of **25**. Total score is out of **100**.

---

## Score Interpretation

| Total Score | Rating |
|---|---|
| 85 – 100 | Excellent |
| 70 – 84 | Good |
| 50 – 69 | Fair |
| 0 – 49 | Needs Attention |

---

## Departments Supported

- IT
- Commercial
- Finance & Admin
- Operations
- Customer Support

---

## Installation

### Basic Version (No Database)

1. Copy these two files to any web server or open locally in a browser:
   - `index.html`
   - `script.js`

2. Open `index.html` in a browser.

> **Note:** An internet connection is required for Tailwind CSS and jsPDF to load from CDN.

No PHP or server-side setup needed for full assessment + PDF functionality.

---

### With PHP Backend (Optional — Retake Prevention)

Use this if you want to store scores in a database and block employees from retaking within 7 days.

**Step 1 — Set up the database**

```bash
mysql -u your_username -p < database.sql
```

Or import `database.sql` via phpMyAdmin.

**Step 2 — Configure database credentials**

Open `save_assessment.php` and update:

```php
$host     = 'localhost';
$dbname   = 'assessment_db';
$username = 'your_username';
$password = 'your_password';
```

**Step 3 — Wire up the PHP call in `script.js`**

In the `showResults()` function, add this snippet **before** `showScreen('resultsScreen')`:

```javascript
fetch('save_assessment.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        employeeName: employeeInfo.name,
        employeeId: employeeInfo.employeeId,
        department: employeeInfo.department,
        scores: scores
    })
})
.then(response => response.json())
.then(data => {
    if (!data.success) {
        alert(data.message);
    }
});
```

**Step 4 — Upload all four files to your PHP-enabled web server:**

```
index.html
script.js
save_assessment.php
database.sql
```

---

## Database Schema

```sql
CREATE TABLE assessments (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    employee_name  VARCHAR(255) NOT NULL,
    employee_id    VARCHAR(100) NOT NULL,
    department     VARCHAR(100) NOT NULL,
    body_score     INT NOT NULL,
    mind_score     INT NOT NULL,
    heart_score    INT NOT NULL,
    purpose_score  INT NOT NULL,
    total_score    INT NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_employee_id (employee_id),
    INDEX idx_created_at  (created_at)
);
```

---

## PDF Report

The downloaded PDF includes:

- Dark header with assessment title
- Employee name, ID, and department
- Color-coded score card for each category with progress bar
- Total score out of 100 with percentage
- Assessment date footer
- File is automatically named: `FirstName_LastName_Assessment_YYYY-MM-DD.pdf`

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Edge, Safari). No polyfills needed.

