var bekleyenBolumu = $('#beklemede');
var devamEdenBolumu = $('#devamEden');
var tamamlananBolumu = $('#tamamlanan');
var dragCover = $('.dragCover');


function dragStart() {
    bekleyenBolumu.css('position', 'relative');
    devamEdenBolumu.css('position', 'relative');
    tamamlananBolumu.css('position', 'relative');
    dragCover.css('display', 'block');
}

function dragEnd() {
    bekleyenBolumu.css('position', 'static');
    devamEdenBolumu.css('position', 'static');
    tamamlananBolumu.css('position', 'static');
    dragCover.css('display', 'none');
}

function dragEnter(event) {
    event.target.style.backgroundColor = 'rgba(66, 126, 245, .6)';
}

function dragLeave(event) {
    event.target.style.backgroundColor = 'rgba(66, 126, 245, .3)';
}