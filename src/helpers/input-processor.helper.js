const Employee = require('../models/Employee')
const salaryHelper = require('./salary.helper')
const employees = [];
const inputProcessor = {};

inputProcessor.processInput = (daysWorkedByEmployeesData) => {
    const daysWorkedByEmployeesDataInArray = daysWorkedByEmployeesData.trim().replace('00:00', '24:00').split(/[\n\r]/g);
    daysWorkedByEmployeesDataInArray.filter(element => element !== '').forEach(value => {
        const daysWorkedByOneEmployee = value.split("=");
        const employeeName = daysWorkedByOneEmployee[0];
        const daysWorked = daysWorkedByOneEmployee[1].split(',');
        const employee = new Employee(employeeName, daysWorked);
        employees.push(employee);
    });
    salaryHelper.calculateSalary(employees);
}

module.exports = inputProcessor
