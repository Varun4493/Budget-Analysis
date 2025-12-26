# Project: Budget Analysis System
A personal project developed to track expenses and analyze budget spending using web technologies.

## 1. Description
This application is a dashboard that helps users manage their project finances. It allows for the entry of income and expenses, calculates the remaining balance in real-time, and provides a visual breakdown of spending through a chart.

## 2. Main Features
* **Record Transactions:** Add items with a name, amount, and category.
* **Financial Summary:** View Total Income, Total Expense, and Net Balance at the top of the page.
* **Data Visualization:** An interactive doughnut chart shows the percentage of spending vs. income.
* **Search & Filter:** A search bar to quickly find past transactions in the history list.
* **Local Storage:** The app saves all data to the browser, so information is not lost when the page is closed.
* **Dark Mode:** A simple toggle to change the interface theme for better visibility.



## 3. Technology Used
* **HTML5:** For the basic structure of the dashboard.
* **CSS3:** For the design, layout, and dark mode transitions.
* **JavaScript:** For all math calculations, data handling, and DOM updates.
* **Chart.js:** A library used to generate the visual budget chart.



## 4. How the App Works
1. User enters the data into the input fields and clicks "Add Record."
2. The JavaScript code validates the input and adds it to an array.
3. The array is saved into `localStorage`.
4. The `updateUI()` function runs, which clears the old list and creates a new one, recalculates the totals, and refreshes the chart.

## 5. Setup Instructions
1. Save `index.html`, `style.css`, and `app.js` in the same folder.
2. Open `index.html` in any modern web browser.
