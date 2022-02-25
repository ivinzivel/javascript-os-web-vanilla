function dragElement(windowId, headerId) {

    var windowElement = document.getElementById(windowId)

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(windowElement.id + headerId)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(windowElement.id + headerId).onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        windowElement.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
        windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

function windowHandler(windowId) {

    let windowElementClassList = document.getElementById(windowId).classList

    if(windowElementClassList.contains('opened')) {

        windowElementClassList.remove('opened')
        windowElementClassList.remove('maximized')

        setTimeout(() => windowElementClassList.add('hidded'), 600)

    } else {

        windowElementClassList.add('opened')
        windowElementClassList.remove('hidded')
        dragElement(windowId, `${windowId}Header`)
        document.getElementById(windowId).src = 'https://www.bing.com/?cc=br'

    }

}

function maximizeHandler(windowId) {

    let windowElementClassList = document.getElementById(windowId).classList

    windowElementClassList.contains('maximized') ? windowElementClassList.remove('maximized') : windowElementClassList.add('maximized')

}

function bootingScreen() {

    setTimeout( () =>  document.getElementById('bootSection').classList.add('booting-finish'), 5000 )

}

function setDate() {

    let currentDate = new Date()
    let currentHour = currentDate.getHours()
    let currentMinute = currentDate.getMinutes()
    let currentDay = currentDate.getDate()
    let currentMonth = currentDate.getMonth() + 1

    document.getElementById('currentHour').innerHTML = currentHour.toString().length  === 1 ? `0${currentHour}` : currentHour
    document.getElementById('currentMinute').innerHTML = currentMinute.toString().length  === 1 ? `0${currentMinute}` : currentMinute

    document.getElementById('currentDay').innerHTML = currentDay.toString().length  === 1 ? `0${currentDay}` : currentDay
    document.getElementById('currentMonth').innerHTML = currentMonth.toString().length  === 1 ? `0${currentMonth}` : currentMonth
    document.getElementById('currentYear').innerHTML = currentDate.getFullYear()

    setTimeout( () => setDate(), 1000 )

}

setDate()

bootingScreen()