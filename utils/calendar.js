const dayNumberToName = {
    2 : "Monday",
    3 : "Tuesday",
    4 : "Wednesday",
    5 : "Thursday",
    6 : "Friday",
    7 : "Saturday",
    1 : "Sunday"
}

// Get the current date
const currentDate = new Date();

// Get the current month
const currentMonth = currentDate.getMonth()+1;

// Get the current year
const currentYear = currentDate.getFullYear();

// Get the last day of the current month
const lastDay = new Date(currentYear, currentMonth, 0).getDate();

// Get the current day
let currentDay = currentDate.getDate();

// Store the days with dates left in the current month
export const daysWithDatesLeft = [];

if(currentDay.toString().length < 2)
   currentDay = "0"+currentDay

export let date = `${currentYear}-${currentMonth}-${currentDay}`

// Iterate through the remaining days and store them in the array
for (let i = currentDay; i < lastDay; i++) {
    const tempDate = new Date(currentYear, currentMonth, i);
    daysWithDatesLeft.push({
        day: dayNumberToName[tempDate.getDay()],
        date: `${currentYear}-${currentMonth}-${i+1}`
    });
}

// Print the result
// console.log("Days with dates left in the current month:", daysWithDatesLeft);
