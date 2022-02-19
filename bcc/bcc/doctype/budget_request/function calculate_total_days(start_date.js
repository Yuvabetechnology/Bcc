function calculate_total_days(start_date, end_date) {
    var start = new Date(start_date);
    var end = new Date(end_date);
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = end.getTime() - start.getTime();
    var days = millisBetween / millisecondsPerDay;
    var total_days = Math.floor(days);
    return total_days;
}

console.log(calculate_total_days('2018-01-01', '2018-01-31'));


function find_primery_number(number) {
    var primery_number = 0;
    for (var i = 1; i <= number; i++) {
        if (number % i == 0) {
            primery_number++;
        }
    }
    return primery_number;
}
console.log(find_primery_number(10));
