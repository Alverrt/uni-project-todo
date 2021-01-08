var bekleyenBolumu = $('#beklemede');
var devamEdenBolumu = $('#devamEden');
var tamamlananBolumu = $('#tamamlanan');
var dragCover = $('.dragCover');

var draggedElement;
var IDofParent;

function changeColor(statusID, element) {
    switch (statusID) {
        case 'beklemede':
            $(element).addClass("bg-primary");
            break;
        case 'devamEden':
            $(element).addClass("bg-warning");
            break;
        case 'tamamlanan':
            $(element).addClass("bg-success");
            break;

        default:
            break;
    }
}

function deleteColor(el) {
    for (let i = el.classList.length - 1; i >= 0; i--) {
        const className = el.classList[i];
        if (className.startsWith('bg')) {
            el.classList.remove(className);
        }
    }
}

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
    event.target.before(draggedElement);
    deleteColor(draggedElement);
    IDofParent = $(event.target).parent().attr("id")
    changeColor(IDofParent, draggedElement);
}