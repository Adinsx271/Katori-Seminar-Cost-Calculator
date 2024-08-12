Project: Training Cost Calculator
Overview
This project is a web-based application that calculates the total cost for a set of training sessions based on user selections. It allows users to select various training sessions and apply discounts, then dynamically calculates and displays the final cost with detailed descriptions of the calculations.

Features
Dynamic Training Selection: Users can select multiple training sessions from a list, and the application will calculate the costs accordingly.

Cost Optimization: The application identifies the most cost-effective combination of trainings, including flat rates for entire weekends or the entire seminar if applicable.

Detailed Cost Breakdown: The application provides a detailed breakdown of the costs, explaining the calculations step by step.

File Structure
index.html: The HTML structure for the webpage.

styles.css: Styling for the web page.

script.js: JavaScript code that handles user interaction, calculations, and dynamic updates.

JavaScript Functions
Main Variables
inputList: An array representing the user's selection of training sessions.
costArray: A 2D array that holds the cost of each training session.
Costs: A variable that stores the calculated total cost.
flag_discount: A boolean that tracks whether the discount is applied.

Event Listeners
Toggle Button Event: Handles the activation and deactivation of training sessions and triggers the cost recalculation.
Discount Button Event: Handles the activation and deactivation of the discount and recalculates the costs.

Core Functions
toggleButton(number): Toggles the selection state of a specific training session.

calculateCosts(): Main function that calculates the total cost based on the selected trainings, flat rate optimizations, and discount application. It generates a detailed description of the cost calculation.

calculateMaxCosts(): Determines the maximum possible costs for the entire seminar and the weekend sessions, which helps in flat rate calculations.

displayCosts(SeminarCosts, WECosts): Updates the webpage with the calculated costs.

convertListToMatrix(): Converts the inputList array into a matrix format for easier cost calculations.

arraySum(array): Utility function that sums up the elements of an array.

matrixSum(matrix): Utility function that sums up the elements of a matrix.

roundTo(num, precision): Rounds a number to a specified precision.

describeCostCalculation(description): Updates the webpage with a detailed description of how the cost was calculated.

Usage
Select Trainings: Click on the available training buttons to select or deselect sessions.
Apply Discount: If available, toggle the discount button to apply a 15% discount.
View Costs: The application will automatically calculate and display the total cost along with a detailed breakdown of how the cost was derived.

Dependencies
This project is purely client-side and requires no additional libraries or frameworks.
