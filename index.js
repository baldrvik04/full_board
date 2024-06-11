// fouls and points

homePoints = 0
guestPoints = 0
homeFoulCount = 0
guestFoulCount = 0
periodPoint = 0

function checkHighScore () {
  if (homePoints > guestPoints) {
    guestScore.style.border = 'none'
    homeScore.style.border = '5px dotted #CEA704'
  } else if (guestPoints > homePoints) {
    homeScore.style.border = 'none'
    guestScore.style.border = '5px dotted #CEA704'
  } else {
    homeScore.style.border = 'none'
    guestScore.style.border = 'none'
  }
}

function add1FoulHome () {
  homeFoulCount += 1
  homeFouls.textContent = homeFoulCount
}
function add1FoulGuest () {
  guestFoulCount += 1
  guestFouls.textContent = guestFoulCount
}

function add1Home () {
  homePoints += 1
  homeScore.textContent = homePoints
  checkHighScore()
}
function add2Home () {
  homePoints += 2
  homeScore.textContent = homePoints
  checkHighScore()
}
function add3Home () {
  homePoints += 3
  homeScore.textContent = homePoints
  checkHighScore()
}

function add1Guest () {
  guestPoints += 1
  guestScore.textContent = guestPoints
  checkHighScore()
}
function add2Guest () {
  guestPoints += 2
  guestScore.textContent = guestPoints
  checkHighScore()
}
function add3Guest () {
  guestPoints += 3
  guestScore.textContent = guestPoints
  checkHighScore()
}

// timer

const timesArr = ['minutes', 'seconds']
// input selectors
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')

// default inputs value
let def_minutes, def_seconds

// btn selectors
const btnStart = document.querySelector('.btn_start')
const btnPause = document.querySelector('.btn_pause_resume')
const btnStop = document.querySelector('.btn_stop')
const btnReset = document.querySelector('.btn_reset')

let interval
let isPause = false
const message = document.querySelector('.message')
let initialTimeInSeconds

function convertToCurrectValues (totalTimeSeconds) {
  const newSeconds = totalTimeSeconds % 60
  const newMinutes = Math.floor(totalTimeSeconds / 60)

  minutes.value = newMinutes
  seconds.value = newSeconds

  return true
}

// get current Total Time by seconds
function getCurrentTotalTime () {
  const minutes_value = parseInt(minutes.value)
  const seconds_value = parseInt(seconds.value)

  const totalTimeSeconds =
        minutes_value * 60 + seconds_value

  convertToCurrectValues(totalTimeSeconds)
  initialTimeInSeconds = totalTimeSeconds
  return totalTimeSeconds
}

// start timer
btnStart.addEventListener('click', (event) => {
  def_minutes = parseInt(minutes.value)
  def_seconds = parseInt(seconds.value)

  totalTimeSeconds = getCurrentTotalTime()
  if (totalTimeSeconds === 0) {
    message.textContent = 'Time is not valid'
    setTimeout(function () {
      message.textContent = ''
    }, 2000)

    return false
  }

  event.target.style.display = 'none'
  btnPause.style.display = 'block'
  btnPause.disabled = false
  btnStop.style.display = 'block'
  btnReset.style.display = 'block'

  isPause = false
  startTimer(totalTimeSeconds)
})

// set countdown timer
function startTimer (totalTimeSeconds) {
  interval = setInterval(() => {
    if (totalTimeSeconds > 0 && !isPause) {
      totalTimeSeconds--
      updateTimeInputs(totalTimeSeconds)
    } else if (totalTimeSeconds == 0) {
      clearInterval(interval)
      // btnPause.disabled = true;
      document.querySelectorAll('.btn').forEach((btn) => {
        btn.style.display = 'none'
      })

      message.textContent = 'Time is over'
      setTimeout(function () {
        message.textContent = ''
      }, 2000)
      periodPoint += 1
      periodCount.textContent = periodPoint
      btnStart.style.display = 'block'
      document.querySelectorAll('.time_input').forEach((input) => {
        input.disabled = false
      })
    }
  }, 1000)
}

// update inputs value
function updateTimeInputs (totalTimeSeconds) {
  const minutes_updated = Math.floor(Math.floor(totalTimeSeconds % 3600) / 60)
  const seconds_updated = Math.floor(Math.floor(totalTimeSeconds % 3600) % 60)

  timesArr.forEach((element) => {
    eval(element).disabled = true
    eval(element).value = eval(element + '_updated')
  })
}

// pause event handler
btnPause.addEventListener('click', (event) => {
  isPause = !isPause

  if (isPause) {
    event.target.textContent = 'Resume'
  } else {
    event.target.textContent = 'Pause'
  }
})

// stop event handler
btnStop.addEventListener('click', () => {
  btnStart.style.display = 'block'
  btnPause.style.display = 'none'
  btnPause.disabled = false
  btnStop.style.display = 'none'
  btnReset.style.display = 'none'

  isPause = true

  minutes.value = def_minutes
  seconds.value = def_seconds

  timesArr.forEach((element) => {
    eval(element).disabled = false
  })

  clearInterval(interval)
})

// reset event handler
btnReset.addEventListener('click', () => {
  clearInterval(interval)
  btnPause.disabled = false

  isPause = false

  minutes.value = def_minutes
  seconds.value = def_seconds

  totalTimeSeconds = getCurrentTotalTime()
  startTimer(totalTimeSeconds)
})

const homeScore = document.getElementById('home-score')
const guestScore = document.getElementById('guest-score')
const periodCount = document.getElementById('period-count')
const homeFouls = document.getElementById('home-fouls')
const guestFouls = document.getElementById('guest-fouls')

// reset button

function newGame () {
  homePoints = 0
  guestPoints = 0
  homeFoulCount = 0
  guestFoulCount = 0
  periodPoint = 0
  homeScore.textContent = homePoints
  guestScore.textContent = guestPoints
  homeFouls.textContent = homeFoulCount
  guestFouls.textContent = guestFoulCount
  periodCount.textContent = periodPoint
  document.getElementById('minutes').value = '12'
  document.getElementById('seconds').value = '00'
  checkHighScore()
}

let shotClockTimer1;
let shotClockTimer2;

function startShotClock1() {
    shotClockTimer1 = setInterval(updateShotClock1, 1000);
}

function stopShotClock1() {
    clearInterval(shotClockTimer1);
}

function resetShotClock1() {
    stopShotClock1();
    document.getElementById("shot-clock-1").innerText = "24";
}

function resetToZero1() {
    document.getElementById("shot-clock-1").innerText = "0";
}

function updateShotClock1() {
    const shotClockElement = document.getElementById("shot-clock-1");
    let currentTime = parseInt(shotClockElement.innerText);
    if (currentTime > 0) {
        currentTime--;
        shotClockElement.innerText = currentTime;
    }
}

function startShotClock2() {
    shotClockTimer2 = setInterval(updateShotClock2, 1000);
}

function stopShotClock2() {
    clearInterval(shotClockTimer2);
}

function resetShotClock2() {
    stopShotClock2();
    document.getElementById("shot-clock-2").innerText = "14";
}

function resetToZero2() {
    document.getElementById("shot-clock-2").innerText = "0";
}

function updateShotClock2() {
    const shotClockElement = document.getElementById("shot-clock-2");
    let currentTime = parseInt(shotClockElement.innerText);
    if (currentTime > 0) {
        currentTime--;
        shotClockElement.innerText = currentTime;
    }
}

function resetAndSwitch() {
    resetToZero1();
    resetShotClock2();
    startShotClock2();
}

function resetAndSwitch2() {
  resetToZero2();
  resetShotClock1();
  startShotClock1();
}
