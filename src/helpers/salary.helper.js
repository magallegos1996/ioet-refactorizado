const weekDaysPattern = /^MO|^TU|^WE|^TH|^FR/;
const weekEndPattern = /^SA|^SU/;
const pattern = /^MO|^TU|^WE|^TH|^FR|^SA|^SU/;

const salaryHelper = {}

let salaryWeekDays;
let moneyPerDayEarned = 0;
let totalSalaryToPay = 0;

salaryHelper.calculateSalary = (employees) => {
    employees.forEach(employee => {
        salaryWeekDays = 0;
        const weekDays = employee.daysWorked.filter(day => new RegExp(weekDaysPattern, 'i').test(day));
        const weekEnd = employee.daysWorked.filter(day => new RegExp(weekEndPattern, 'i').test(day));
        processEmployeeWork(weekDays, 'WEEKDAYS');
        processEmployeeWork(weekEnd, 'WEEKEND');
        totalSalaryToPay = salaryWeekDays
        console.log(`The amount to pay ${employee.name} is: ${totalSalaryToPay} USD`);
    });
}
function processEmployeeWork (days, weekTime) {
    let rangeOfTimeWorkedInSeconds;
    days.forEach(day => {
        rangeOfTimeWorkedInSeconds = []
        const rangeOfTimeWorkedInHours = day.replace(pattern, '').split('-');
        rangeOfTimeWorkedInHours.forEach(value => {
            const seconds = convertHoursToSeconds(value);
            rangeOfTimeWorkedInSeconds.push(parseInt(seconds));
        });
        salaryWeekDays = salaryWeekDays + calculateMoneyPerDay(rangeOfTimeWorkedInSeconds, weekTime);
    });
}
function convertHoursToSeconds(hour) {
    const arr = hour.split(':');
    return (+arr[0]) * 60 * 60 + (+arr[1]) * 60;
}
function calculateMoneyPerDay (rangeOfTimeWorkedInSeconds, weekTime){
    const numberOfHoursWorked = calculateNumberOfHoursWorked(rangeOfTimeWorkedInSeconds);

    if(rangeOfTimeWorkedInSeconds[0] >= 60 && rangeOfTimeWorkedInSeconds[1] <= 32400) {
        weekTime === 'WEEKDAYS' ? moneyPerDayEarned = 25*numberOfHoursWorked : moneyPerDayEarned = 30*numberOfHoursWorked
    } else if (rangeOfTimeWorkedInSeconds[0] > 32400 && rangeOfTimeWorkedInSeconds[1] <= 64800) {
        weekTime === 'WEEKDAYS' ? moneyPerDayEarned = 15*numberOfHoursWorked : moneyPerDayEarned = 20*numberOfHoursWorked
    } else if((rangeOfTimeWorkedInSeconds[0] > 64800 && rangeOfTimeWorkedInSeconds[1] <= 86400) ||
               (rangeOfTimeWorkedInSeconds[0] > 64800 && rangeOfTimeWorkedInSeconds[1] < 60)) {
        weekTime === 'WEEKDAYS' ? moneyPerDayEarned = 20*numberOfHoursWorked : moneyPerDayEarned = 25*numberOfHoursWorked;
    }
    return moneyPerDayEarned;
}
function calculateNumberOfHoursWorked (rangeOfTimeWorkedInSeconds) {
    return (rangeOfTimeWorkedInSeconds[1] - rangeOfTimeWorkedInSeconds[0])/3600;
}
module.exports = salaryHelper
