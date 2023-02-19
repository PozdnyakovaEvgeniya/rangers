let dropboxs = document.querySelectorAll('.dropbox');


for (let dropbox of dropboxs){
  let button = dropbox.querySelector('.dropbox-button');
  let list = dropbox.querySelector('.dropbox-list');

  button.addEventListener('click', function() {    
    list.classList.toggle('dropbox-list-active');
    button.classList.toggle('button-active');
    dropbox.classList.remove('up');
  
    let wrapper = document.querySelector('.wrapper');
    let dropboxWrapper = dropbox.querySelector('.dropbox-wrapper');

    let dropboxBottom = window.pageYOffset + list.getBoundingClientRect().bottom;
    let windowBottom = window.pageYOffset + document.documentElement.clientHeight;
    let wrapperBottom = window.pageYOffset + wrapper.getBoundingClientRect().bottom;

    if (dropboxBottom > windowBottom || dropboxBottom > wrapperBottom) {
      dropbox.classList.add('up');
    }


    document.addEventListener('click', function(event) {
      if (event.target.closest('span') !== dropboxWrapper) {
        list.classList.remove('dropbox-list-active');
        button.classList.remove('button-active');
        dropbox.classList.remove('up');
      }
    });

    document.addEventListener('keydown', function(event) {
      if(event.key === 'Tab' || event.key === 'Escape') {
        list.classList.remove('dropbox-list-active');
        button.classList.remove('button-active');
        dropbox.classList.remove('up');
      }
    });
  });
}


let selects = document.querySelectorAll('.select');

for (let select of selects) {
  let selectButton = select.querySelector('button');
  let selectList = select.querySelector('.select-list');

  selectButton.addEventListener('click', function() {
    selectList.classList.toggle('select-list-active');
    select.classList.remove('up');
  
    let wrapper = document.querySelector('.wrapper');

    let selectBottom = window.pageYOffset + selectList.getBoundingClientRect().bottom;
    let windowBottom = window.pageYOffset + document.documentElement.clientHeight;
    let wrapperBottom = window.pageYOffset + wrapper.getBoundingClientRect().bottom;

    if (selectBottom > windowBottom || selectBottom > wrapperBottom) {
      select.classList.add('up');
    }
  });

  selectListItems = select.querySelectorAll('.select-list-item');
  let selectName = select.querySelector('.select-name');

  for (let selectListItem of selectListItems) {
    selectListItem.addEventListener('click', function() {
      selectName.innerHTML = this.innerHTML;
      selectList.classList.remove('select-list-active');
      select.classList.remove('up');
    });
  }

  let selectSearch = select.querySelector('.select-search');
  let date = select.querySelector('.date');

  document.addEventListener('click', function(event) {
    if (event.target.closest('div') !== selectList && event.target.closest('div') !== select && event.target.closest('div') !== selectName && event.target.closest('div') !== selectSearch && event.target.closest('div') !== date) {
      selectList.classList.remove('select-list-active');
      select.classList.remove('up');
    }
  });

  document.addEventListener('keydown', function(event) {
    if(event.key === 'Tab' || event.key === 'Escape') {
      selectList.classList.remove('select-list-active');
      select.classList.remove('up');
    }
  });
}

let now = new Date(3016, 00, 21);
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

let months = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];

let selectDate = document.querySelector('.select-date');

selectDate.innerHTML = date + " " + months[month][0] + months[month][1] + months[month][2] + " " + year + " ";

let selectDateVar = now;

let button = document.querySelector('.calendar button');

button.addEventListener('click', function() {
  getCalendar(selectDateVar.getFullYear(), selectDateVar.getMonth()); 
});

let previous = document.querySelector('.previous');
let next = document.querySelector('.next');

previous.addEventListener('click', function() {
	year = getPrevYear(year, month);
	month = getPrevMonth(month);
	getCalendar(year, month);
});

next.addEventListener('click', function() {
	year =  getNextYear(year, month);
	month = getNextMonth(month);
	getCalendar(year, month);
});

let monthYear = document.querySelector('.month-year');

monthYear.addEventListener('click', function edit() {
  let input = document.createElement('input');
  input.placeholder = 'Введите дату ММ.ГГГГ';
  let date = this.innerHTML;
  this.innerHTML = '';
  this.appendChild(input);
  input.focus();

  input.addEventListener('keypress', function(event) {
  if (event.code == "Enter") {
    let newDate = input.value;

    let newMonth = Number(newDate[0] + newDate[1]) - 1;
    let newYear = Number(newDate[3] + newDate[4] + newDate[5] + newDate[6]);
    console.log(newMonth);
    console.log(newYear);

    if (newMonth >= 0 && newMonth <= 11 && newYear >= 0 && newYear <= 9999) {
      getCalendar(newYear, newMonth);
    } else {
      monthYear.innerHTML = date;
    }

    monthYear.addEventListener('click', edit);
  }
  });

  this.removeEventListener('click', edit);
});

function getCalendar(year, month) {
  let calendar = document.querySelector('.calendar ul');
  calendar.innerHTML = "";
  
  monthYear.innerHTML = months[month] + " " + year;

  let daysOfMonth = range(1, getLastDate(month, year));
  let daysOfLastMonth = range((getLastDate(month, year) - getFirstWeekDay(month, year) + 2), getLastDate(month, year));
  let daysOfNextMonth = range(1, 7 - getLastWeekDay(month, year));

  for (let day of daysOfLastMonth) {
    let li = document.createElement('li');
    li.innerHTML = day;

    calendar.appendChild(li);
  }

  for (let day of daysOfMonth) {
    let li = document.createElement('li');
    li.innerHTML = day;
    li.classList.add('select-list-item');

    if (day == date && month == now.getMonth() && year == now.getFullYear()) {
      let div = document.createElement('div');
      div.innerHTML = '.';

      li.appendChild(div);
      li.classList.add("now");
    }

    if (day == selectDateVar.getDate() && month == selectDateVar.getMonth() && year == selectDateVar.getFullYear()) {
      li.classList.add("li-active");
    }

    li.addEventListener('click', function() {      
      let div = li.querySelector('div');

      if(div){
        li.removeChild(div);
      }

      selectDate.innerHTML = li.innerHTML + " " + months[month][0] + months[month][1] + months[month][2] + " " + year + " "; 
      selectDateVar = new Date(year, month, li.innerHTML);

      let lies = calendar.querySelectorAll('.select-list-item');
      for (let li of lies) {
        li.classList.remove('li-active');
      }

      li.classList.add('li-active');
    });

    calendar.appendChild(li);
  }

  for (let day of daysOfNextMonth) {
    let li = document.createElement('li');
    li.innerHTML = day;

    calendar.appendChild(li);
  }
}

function range(num1, num2){
  let arr = [];
  for (let i = num1; i <= num2; i++){
    arr.push(i);
  }
  return arr;
}

function getLastDate(month, year){
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

function getFirstWeekDay(month, year) {
  let date = new Date(year, month, 1);
  if (date.getDay() == 0) {
    return 7;
  } else {
    return date.getDay();
  }
}

function getLastWeekDay(month, year) {
  let date = new Date(year, month + 1, 0);
  if (date.getDay() == 0) {
    return 7;
  } else {
    return date.getDay();
  }
}

function getNextYear(year, month){
	if (month == 11){
		return ++year;
	}
	return year;
}

function getNextMonth(month){
	if (month == 11){
		month = 0;
	} else {
		month = month + 1;
	}
	return month;
}

function getPrevYear(year, month){
	if (month == 0){
		return --year;
	}
	return year;
}

function getPrevMonth(month){
	if (month == 0){
		month = 11;
	} else {
		month--;
	}
	return month;
}

