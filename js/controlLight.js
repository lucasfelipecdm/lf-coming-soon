const allTime = $('.time-div time');
const allSpan = $('.time-div span');
const allTS = $.merge(allTime, allSpan);

let pointw, pointh;
let posw, posh;
let stop = false;
let [lightGet, spanOn] = [false, false];
let myLogo = $('#logolf');


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
            if ($('.span-light-on-clicked').length === 8){
                $(myLogo).css({                    
                    'animation': 'imgLight 0.3s ease'
                })
                setTimeout(function(){
                    $(myLogo).attr('src','img/logo-white.png');
                    $(myLogo).css({
                        'filter':'drop-shadow(0 0 10px white)',
                        'animation': 'imgBlink 2s ease infinite'
                    })                    
                }, 300)
            } else {
                $(myLogo).attr('src','img/logo.png');
                $(myLogo).css({
                    'filter':'none',
                    'animation': 'none'
                })
            }
        }
    })
})

function getLight() {
    lightGet = true;     
        $('#light').toggleClass('light-on light-off');
        $('body').css({"cursor":"none"});
        $('#lightActive').toggleClass('mouseround');
}

function letLight() {
    lightGet = false; 
        $('#light').toggleClass('light-on light-off');
        $('body').css({"cursor":"default"});
        $('#lightActive').toggleClass('mouseround');
}

$('#light').mouseenter(function (){
    if (lightGet === false) {
        getLight();
    } else {
        letLight();
    }
})