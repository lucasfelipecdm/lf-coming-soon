let currentDate, dateGoals, diffInMs;
let dday, dhours, dmin, dsec;
let rhours, rmin, rsec;

function getTimeNow() {
    currentDate = new Date();
}

function getDateGoals() {
    dateGoals = new Date(2020, 1, 1);
}

function getDateDiff() {
    diffInMs = (dateGoals - currentDate);
    transformMsToDate(diffInMs);
}

function transformMsToDate(ms) {
    dsec = ms / 1000;
    rsec = Math.round(dsec % 60);
    dmin = Math.floor(dsec) / 60;
    rmin = Math.floor(dmin % 60);
    dhours = Math.floor(dmin) / 60;
    rhours = Math.floor(dhours % 24);
    dday = Math.floor(Math.floor(dhours) / 24);        
    timeDown(dday, rhours, rmin, rsec);
}

getTimeNow();
getDateGoals();
getDateDiff();

function timeDown(day, hours, min, sec) {
    setTimeout(function(){
        if (sec === 0) {            
            if (day === 0 && hours === 0 && min === 0 && sec === 0) {
                stop = true;
            }

            if (min != 0) {
                min -= 1;
            } else {
                [sec, min] = [59, 59];
                if (hours != 0) {
                    hours -= 1;
                } else {
                    [sec, min] = [59, 59, 23];
                    if (day != 0) {
                        [sec, min, hours] = [59, 59, 23];
                        day -= 1;
                    } else {
                        [sec, min, hours] = [59, 59, 23];
                    }
                }
            }
            if (!stop) {
                sec = 59;
            }
        }

        /*day < 10 ? $('#day').text('0'+day.toString()) : $('#day').text(day);
        hours < 10 ? $('#hours').text('0'+hours.toString()) : $('#hours').text(hours);
        min < 10 ? $('#min').text('0'+min.toString()) : $('#min').text(min);
        sec < 10 ? $('#sec').text('0'+sec.toString()) : $('#sec').text(sec);*/

        if (day < 10){
            $('#day').text('0'+day.toString());
        } else {
            $('#day').text(day);
        }

        if (hours < 10){          
            $('#hours').text('0'+hours.toString());
        } else {          
            $('#hours').text(hours);
        }  

        if (min < 10){
            $('#min').text('0'+min.toString());
        } else {
            $('#min').text(min);
        }  

        if (sec < 10){
            $('#sec').text('0'+sec.toString());
        } else {
            $('#sec').text(sec);
        }
        sec -= 1;
        if (!stop){
            timeDown(day, hours, min, sec);
        }    
    }, 1000)
}
