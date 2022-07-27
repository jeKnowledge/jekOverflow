const date1 = new Date("2022-07-13T16:53:39.362Z");
const date2 = new Date("Wed Jul 13 2022 17:53:39 GMT+0100 (Horário de Verão da Europa Ocidental)")
var date = new Date();
let time = ''

const diff = date.getTime() - date1.getTime();

let msec = diff;
const hh = Math.floor(msec / 1000 / 60 / 60);
msec -= hh * 1000 * 60 * 60;
const mm = Math.floor(msec / 1000 / 60);
msec -= mm * 1000 * 60;
const ss = Math.floor(msec / 1000);
msec -= ss * 1000;

if (hh > 0) {
  time = hh.toString() + ' horas'
} else {
  if (mm > 0) {
    time = mm.toString() + ' minutos'
  } else {
    if (ss > 0) {
      time = ss.toString(); + ' segundos'
    } else time = 'now';
  }
}

console.log(time);
