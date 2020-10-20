const constants = require('../constants/Contants')
const WEEK_DAY_PATTERN = /^MO|^TU|^WE|^TH|^FR/;
const WEEK_END_PATTERN = /^SA|^SU/;

const salaryHelper = {}

let moneyPerDayEarned = 0;
let totalSalaryToPay;

salaryHelper.calculateSalary = (employees) => {
    employees.forEach(employee => {
        totalSalaryToPay = 0;
        const weekDays = employee.daysWorked.filter(day => new RegExp(WEEK_DAY_PATTERN, 'i').test(day));
        const weekEnd = employee.daysWorked.filter(day => new RegExp(WEEK_END_PATTERN, 'i').test(day));
        processEmployeeWork(weekDays, 'WEEKDAYS');
        processEmployeeWork(weekEnd, 'WEEKEND');
        console.log(`The amount to pay ${employee.name} is: ${totalSalaryToPay} USD`);
    });
}
function processEmployeeWork (days, weekTime) {
    let rangeOfTimeWorkedInSeconds;
    days.forEach(day => {
        rangeOfTimeWorkedInSeconds = []
        const rangeOfTimeWorkedInHours = day.replace(WEEK_DAY_PATTERN, '').replace(WEEK_END_PATTERN, '').split('-');
        rangeOfTimeWorkedInHours.forEach(hours => {
            const seconds = convertHoursToSeconds(hours);
            rangeOfTimeWorkedInSeconds.push(parseInt(seconds));
        });
        totalSalaryToPay = totalSalaryToPay + calculateMoneyPerDay(rangeOfTimeWorkedInSeconds, weekTime);
    });
}
function convertHoursToSeconds(hours) {
    const hoursSplitted = hours.split(':');
    const hour = hoursSplitted[0]
    const minutes = hoursSplitted[1]
    return (hour * 3600) + (minutes * 60);
}
function calculateMoneyPerDay (rangeOfTimeWorkedInSeconds, weekTime){
    const startTime =  rangeOfTimeWorkedInSeconds[0];
    const endTime = rangeOfTimeWorkedInSeconds[1];
    const numberOfHoursWorked = calculateNumberOfHoursWorked(startTime, endTime);

    const employeeWorkedInMorning = startTime >= constants.time.HOUR_ZERO_IN_SECONDS && endTime <= constants.time.HOUR_NINE_IN_SECONDS
    const employeeWorkedInAfternoon = startTime > constants.time.HOUR_NINE_IN_SECONDS && endTime <= constants.time.HOUR_EIGHTEEN_IN_SECONDS
    const employeeWorkedInNight = (startTime > constants.time.HOUR_EIGHTEEN_IN_SECONDS && endTime <= constants.time.HOUR_TWENTY_FOUR_IN_SECONDS) ||
                                  (startTime > constants.time.HOUR_EIGHTEEN_IN_SECONDS && endTime < constants.time.HOUR_ZERO_IN_SECONDS)

    if(employeeWorkedInMorning) {
        weekTime === 'WEEKDAYS' ? moneyPerDayEarned = constants.weekdaySalary.MORNING*numberOfHoursWorked :
                                  moneyPerDayEarned = constants.weekendSalary.MORNING*numberOfHoursWorked
    } else if (employeeWorkedInAfternoon) {
        weekTime === 'WEEKDAYS' ? moneyPerDayEarned = constants.weekdaySalary.AFTERNOON*numberOfHoursWorked :
                                  moneyPerDayEarned = constants.weekendSalary.AFTERNOON*numberOfHoursWorked
    } else if(employeeWorkedInNight) {
        weekTime === 'WEEKDAYS' ? moneyPerDayEarned = constants.weekdaySalary.NIGHT*numberOfHoursWorked :
                                  moneyPerDayEarned = constants.weekendSalary.NIGHT*numberOfHoursWorked;
    }
    return moneyPerDayEarned;
}
function calculateNumberOfHoursWorked (startTime, endTime) {
    return (endTime - startTime)/3600;
}
module.exports = salaryHelper
