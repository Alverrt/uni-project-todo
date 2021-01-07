var bekleyenBolumu = $('#beklemede');
var devamEdenBolumu = $('#devamEden');
var tamamlananBolumu = $('#tamamlanan');
var dragCover = $('.dragCover');

var draggedElement;

function dragStart(event) {
    bekleyenBolumu.css('position', 'relative');
    devamEdenBolumu.css('position', 'relative');
    tamamlananBolumu.css('position', 'relative');
    dragCover.css('display', 'block');
    draggedElement = event.target;
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

function allowDrop(event) {
    event.preventDefault();
}

function dragLeave(event) {
    event.target.style.backgroundColor = 'rgba(66, 126, 245, .3)';
}

function dropped(event) {
    console.log(event.target);
}