const rewire = require('rewire');
const salaryHelper = rewire('../src/helpers/salary.helper');

const calculateNumberOfHoursWorked = salaryHelper.__get__('calculateNumberOfHoursWorked');
const hourToSeconds = salaryHelper.__get__('hourToSeconds');
const calculateMoneyPerDay = salaryHelper.__get__('calculateMoneyPerDay');

test('should return the substraction of two values in seconds in hours', () => {
    const result = calculateNumberOfHoursWorked([36000, 54000]);
    expect(result).toBe(5);
});
test('should convert an hour to seconds', () => {
    const result = hourToSeconds('20:00');
    expect(result).toBe(72000);
});
test('should return money per weekday', () => {
    const result = calculateMoneyPerDay([36000, 54000], 'WEEKDAYS');
    expect(result).toBe(75);
});
test('should return money per day in weekend', () => {
    const result = calculateMoneyPerDay([36000, 54000], 'WEEKEND');
    expect(result).toBe(100);
});
