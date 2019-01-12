const allTime = $('.time-div time');
const allSpan = $('.time-div span');
const allTS = $.merge(allTime, allSpan);

let currentDate, dateGoals, diffInMs;
let dday, dhours, dmin, dsec;
let rhours, rmin, rsec;
let pointw, pointh;
let posw, posh;
let [lightGet, spanOn] = [false, false];


function getTimeNow() {
    currentDate = new Date();
}

function getDateGoals() {
    dateGoals = new Date(2019, 3, 1);
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

console.log("Day:"+dday+" Hours:"+rhours+" Min:"+rmin+" Sec:"+rsec);



let stop = false;
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
 
let myLogo = document.querySelector('#logolf');

function MouseRollover() {           
            myLogo.src = "img/logo-white.png";          
    }
        function MouseOut() {
               myLogo.src = "img/logo.png";               
    }
    
 document.onmousemove = document.updatemyLogoPosition; 

 MouseRollover();
 MouseOut();

function mouseRadius(event){
    [pointw, pointh] = [event.pageX, event.pageY]; 
    $('.mouseround').css({
        'top' : pointh, 
        'left' : pointw,
        'transform' : 'translate(-50%, -50%)'
    });
}

function nearLetter() {
    $(allTS).each(function (){ 
        [posw, posh] = [$(this).offset().left, $(this).offset().top] 
        distw = Math.abs(pointw - (posw + 24)); 
        disth = Math.abs(pointh - (posh + 40)); 
        if (distw < 50 && disth < 50 && lightGet === true){ 
            $(this).addClass('span-light-on');
        } else {
            $(this).addClass('span-light-off');
            $(this).removeClass('span-light-on');
        }
    })
}

$(window).mousemove(function(event){
    mouseRadius(event);
    nearLetter();
})

$(allTS).each(function (){
    $(this).click(function(){
        if (lightGet){            
            $(this).toggleClass('span-light-on-clicked');
        }
    })
})

$('#light').mouseenter(function (){
    if (lightGet === false) {
        lightGet = true;
        $('body').css({"cursor":"none"});
        $('#lightActive').toggleClass('mouseround');
    } else {
        lightGet = false;
        $('body').css({"cursor":"default"});
        $('#lightActive').toggleClass('mouseround');
    }
})