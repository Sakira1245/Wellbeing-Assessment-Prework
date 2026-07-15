# Pre-Training Health & Mentality Assessment Tool

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

## Project Structure

```
src/
├── app/
│   ├── App.tsx                  # Root component, step/tab state machine
│   └── components/
│       ├── EmployeeInfoForm.tsx  # Name, employee ID, department intake
│       ├── AssessmentScreen.tsx  # Tab navigation + question rendering
│       └── ResultsScreen.tsx     # Score display + PDF export
├── styles/
│   ├── fonts.css                # Google Fonts imports
│   ├── theme.css                # Tailwind design tokens
│   └── index.css                # Tailwind base + token mapping
```

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

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-org/health-mentality-assessment.git
cd health-mentality-assessment

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
```

Output is written to `dist/`. Serve it with any static file host (Nginx, Apache, GitHub Pages, Netlify, Vercel, etc.).

---

## PDF Report

The downloaded PDF includes:

- Employee name, ID, and department
- Assessment date
- Color-coded score card for each category (Body, Mind, Heart, Purpose)
- Percentage score with a visual progress bar per category
- Overall wellness summary

The PDF layout mirrors the on-screen results view for a consistent experience.

---

## Alternate Version

An HTML/CSS/JS/PHP version of the same tool is documented in [`HTML_PHP_VERSION.md`](./HTML_PHP_VERSION.md). It has feature parity with the React version and can be deployed on any PHP-capable server without a build step.

---

## License

MIT — free to use, modify, and distribute.
