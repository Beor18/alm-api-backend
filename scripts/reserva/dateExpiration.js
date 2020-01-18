const moment = require('moment');
const access_ttl = 60;
const login_timestamp = moment();
const expire_timestamp = login_timestamp.add(access_ttl, 's');

let now, timeToExpire;

function updateTime() {
  now = moment();
  timeToExpire = expire_timestamp.diff(now, 'seconds');
}


function displayClock(inputSeconds) {
  const sec_num = parseInt(inputSeconds.toString(), 10);
  const hours = Math.floor(sec_num / 60);
  const minutes = Math.floor((sec_num - (hours * 60)) / 60);
  const seconds = sec_num - (hours * 60) - (minutes * 60);
  let hoursString = '';
  let minutesString = '';
  let secondsString = '';
  hoursString = (hours < 10) ? "0" + hours : hours.toString();
  minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
  secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
  return hoursString + ':' + minutesString + ':' + secondsString;
}

function timer() {
	updateTime();
    console.log(`Expira en: ${displayClock(timeToExpire)}`)
}

const p = setInterval(() => {
  timer();
}, 1000);
