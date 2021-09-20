class Weather {
    constructor(city) {
      this.city = city;
    }
    async getWeather(city) {
      const response = await fetch(
        `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`
      );
      const responsedata = await response.json();
      return responsedata;
    }
}
// initalising the class
const weather = new Weather();

// DOM vars
const weatherButton = document.querySelector(".getWeatherbtn");
const table = document.querySelector("table");
const tbody = document.querySelector("#tableBody");
const cityList = document.querySelector(".cityList");
const items = cityList.getElementsByTagName("li");
const button = document.querySelector(".searchBtn");
const input = document.querySelector(".searchInput");

var searched = new Array(items.length).fill(false);
var counter = 0;

weatherButton.addEventListener("click", function () {
    let idx = searched.indexOf(false);
    if (idx != -1) {
        searched[idx] = true;
        items[idx].className = "addBorder";
        weather.getWeather(items[idx].textContent).then((data) => {
        const row = document.createElement("tr");
        var cls = `row${idx}`;
        row.className = cls;
        row.innerHTML = `
            <td>${items[idx].textContent}</td>
            <td>${data.description}</td>
            <td>${data.temp_in_celsius}</td>
            <td>${data.pressure_in_hPa}</td>
            <td>${data.date_and_time}</td>
            <td><a href=# class="delete">delete</a></td>
            `;
        tbody.appendChild(row);
        });
    }
});

tbody.addEventListener("click", function (e) {
    let cont = e.target.parentElement.parentElement.cells[0].textContent;
    for (var i = 0; i < 4; i++) {
        if (items[i].textContent == cont) {
        items[i].classList.remove("addBorder");
        searched[i] = false;
        }
    }
    e.target.parentElement.parentElement.remove();
});

button.addEventListener("click", function () {
var inputVal = document.querySelector(".searchInput").value;
if (inputVal != "") {
    inputVal = inputVal.toLowerCase();
    const table = document.querySelector(".table");
    for (let line = 1; line < table.rows.length; line++) {
    if (
        table.rows[line].cells[0].textContent.toLowerCase().indexOf(inputVal) !=
        -1
    ) {
        table.rows[line].style.visibility = "visible";
    } else {
        items[line - 1].classList.remove("addBorder");
        table.rows[line].style.display = "none";
    }
    }
}
});

input.addEventListener("keyup", function (e) {
const val = e.target.value;
if (val == "") {
    for (let line = 1; line < table.rows.length; line++) {
    table.rows[line].style.display = "table-row";
    items[line - 1].classList.add("addBorder");
    }
}
});