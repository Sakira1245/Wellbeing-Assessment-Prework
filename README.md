# Wellbeing Assessment Prework

A client-side web application for employee wellness self-assessment across four dimensions: **Body**, **Mind**, **Heart**, and **Purpose**. Employees complete a short survey, view color-coded results, and download a professionally formatted PDF report — all without any backend or database.

---

## Features

- **Employee Intake Form** — collects name, employee ID, and department before the assessment begins
- **4 Assessment Screens** — Body, Mind, Heart, and Purpose, each with 5 mandatory questions rated 1–5
- **Mandatory Validation** — all 5 questions per screen must be answered before advancing; the Next button remains disabled until complete
- **Tab Navigation Blocking** — users cannot skip ahead to an incomplete tab
- **Red Asterisks** — required question indicators on every item
- **Color-Coded Results**
  - Body — Yellow
  - Mind — Green
  - Heart — Red
  - Purpose — Blue
- **Visual Progress Bars** — per-category score bars on the results screen
- **PDF Report Download** — generates a styled PDF matching the results screen layout, including employee info, scores, and color-coded score cards
- **Fully Client-Side** — no server, no database, no external API calls

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS 3.x via CDN |
| Logic | Vanilla JavaScript (ES6) |
| PDF Generation | jsPDF 2.5.1 via CDN |

---

## Project Structure

```
employee-assessment/
├── index.html            # All UI screens (intake, assessment, results)
├── script.js             # All app logic, PDF generation, state management
├── styles.css   

---

## Departments Supported

- IT
- Commercial
- Finance & Admin
- Operations
- Customer Support

---

## Assessment Categories

| Category | Color | Questions |
|---|---|---|
| Body | Yellow | Physical health, energy, sleep, exercise, nutrition |
| Mind | Green | Focus, stress, mental clarity, learning, work–life balance |
| Heart | Red | Emotional wellbeing, relationships, motivation, belonging |
| Purpose | Blue | Alignment with role, values, growth, contribution, meaning |

Each question is rated on a **1–5 scale** (1 = Strongly Disagree, 5 = Strongly Agree). The category score is the average of the 5 answers, displayed as a percentage.

---

## PDF Report

The downloaded PDF includes:

- Employee name, ID, and department
- Assessment date
- Color-coded score card for each category (Body, Mind, Heart, Purpose)
- Percentage score with a visual progress bar per category
- Overall wellness summary
