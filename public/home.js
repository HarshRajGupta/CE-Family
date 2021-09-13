let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
const d = new Date();
const curr_day = d.getDay();
const curr_hour = d.getHours();
const curr_min = currDate.getMinutes();
if (curr_day === 0) {
    document.getElementById("current-class").innerHTML = "No class";
}
else if (curr_day === 6) {
    document.getElementById("current-class").innerHTML = "No class";
}
else if (curr_day === 1) {
    if ((curr_hour === 10 && curr_min > 4) || (curr_hour === 11 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "Maths";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/dzfkh3p367?authuser=0&hs=179";
        };
    }
    else if ((curr_hour === 11 && curr_min > 9) || (curr_hour === 12 && curr_min < 10)) {
        document.getElementById("current-class").innerHTML = "SPE";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/ruk-szvx-ztv";
        };
    }
    else if ((curr_hour === 12 && curr_min > 14) || (curr_hour === 13 && curr_min < 15)) {
        document.getElementById("current-class").innerHTML = "Enjoy";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 13 && curr_min > 15) || (curr_hour === 14 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "BREAK TIME";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 14 && curr_min > 4) || (curr_hour === 16 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "Communication Skills";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 16 && curr_min > 9) || (curr_hour === 17 && curr_min < 10)) {
        document.getElementById("current-class").innerHTML = "DEC Lab";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else {
        document.getElementById("current-class").innerHTML = "ENJOY";
    }
}
else if (curr_day === 2) {
    if ((curr_hour === 10 && curr_min > 4) || (curr_hour === 11 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "SPE";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/ruk-szvx-ztv";
        };
    }
    else if ((curr_hour === 11 && curr_min > 9) || (curr_hour === 12 && curr_min < 10)) {
        document.getElementById("current-class").innerHTML = "DEC";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 12 && curr_min > 14) || (curr_hour === 13 && curr_min < 15)) {
        document.getElementById("current-class").innerHTML = "NT";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/aqzavu5ky2?authuser=0&hs=179";
        };
    }
    else if ((curr_hour === 13 && curr_min > 15) || (curr_hour === 14 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "BREAK TIME";
    }
    else if ((curr_hour === 14 && curr_min > 4) || (curr_hour === 16 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "C++ Lab";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/dngh46jg4x?authuser=0&hs=179";
        };
    }
    else {
        document.getElementById("current-class").innerHTML = "ENJOY";
    }
}
else if (curr_day === 3) {
    if ((curr_hour === 10 && curr_min > 4) || (curr_hour === 11 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "Maths";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/dzfkh3p367?authuser=0&hs=179";
        };
    }
    else if ((curr_hour === 11 && curr_min > 9) || (curr_hour === 12 && curr_min < 10)) {
        document.getElementById("current-class").innerHTML = "DEC";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 12 && curr_min > 14) || (curr_hour === 13 && curr_min < 15)) {
        document.getElementById("current-class").innerHTML = "NT";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/aqzavu5ky2?authuser=0&hs=179";
        };
    }
    else if ((curr_hour === 13 && curr_min > 15) || (curr_hour === 14 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "BREAK TIME";
    }
    else if ((curr_hour === 14 && curr_min > 4) || (curr_hour === 16 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "C++";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/dngh46jg4x?authuser=0&hs=179";
        };
    }
    else {
        document.getElementById("current-class").innerHTML = "ENJOY";
    }
}
else if (curr_day === 4) {
    if ((curr_hour === 10 && curr_min > 4) || (curr_hour === 11 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "DEC";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 11 && curr_min > 9) || (curr_hour === 12 && curr_min < 10)) {
        document.getElementById("current-class").innerHTML = "NT";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/aqzavu5ky2?authuser=0&hs=179";
        };
    }
    else if ((curr_hour === 12 && curr_min > 14) || (curr_hour === 13 && curr_min < 15)) {
        document.getElementById("current-class").innerHTML = "Maths";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/dzfkh3p367?authuser=0&hs=179";
        };
    }
    else {
        document.getElementById("current-class").innerHTML = "ENJOY";
    }
}
else if (curr_day === 5) {
    if ((curr_hour === 10 && curr_min > 4) || (curr_hour === 11 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "SPE";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/ruk-szvx-ztv";
        };
    }
    else if ((curr_hour === 11 && curr_min > 9) || (curr_hour === 12 && curr_min < 10)) {
        document.getElementById("current-class").innerHTML = "DEC Lab";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 12 && curr_min > 14) || (curr_hour === 13 && curr_min < 15)) {
        document.getElementById("current-class").innerHTML = "DEC Lab";
        document.getElementById("current-class").onclick = function () {
            location.href = "#";
        };
    }
    else if ((curr_hour === 13 && curr_min > 15) || (curr_hour === 14 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "BREAK TIME";
    }
    else if ((curr_hour === 14 && curr_min > 4) || (curr_hour === 16 && curr_min < 5)) {
        document.getElementById("current-class").innerHTML = "C++";
        document.getElementById("current-class").onclick = function () {
            location.href = "https://meet.google.com/lookup/dngh46jg4x?authuser=0&hs=179";
        };
    }
    else {
        document.getElementById("current-class").innerHTML = "ENJOY";
    }
}

else {
    document.getElementById("current-class").innerHTML = "ERROR...";
    document.getElementById("current-class").onclick = function () {
        location.href = "https://www.fabriziovanmarciano.com/button-styles/";
    };
}

