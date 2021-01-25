var bekleyenBolumu = $('#bekleyen');
var devamEdenBolumu = $('#devamEden');
var tamamlananBolumu = $('#tamamlanan');
var dragCover = $('.dragCover');
var responsiveDropdowns = $('.dropdown')

var draggedElement;
var IDofParent;


function submitAndClear() {

    $('#gorevForm').submit()

    $('#gorevBaslik').val(' ')
    $('#gorevAciklamasi').val(' ')
    $('#gorevBaslangic').val(' ')
    $('#gorevBitis').val(' ')
}

function changeColor(statusID, element) {
    switch (statusID) {
        case 'bekleyen':
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

function updateStatus(status, gorevID) {
    $.post("/update",
        {
            status: status,
            gorevID: gorevID
        });
}

function deleteColor(el) {
    for (let i = el.classList.length - 1; i >= 0; i--) {
        const className = el.classList[i];
        if (className.startsWith('bg')) {
            el.classList.remove(className);
        }
    }
}

function getGorevID(element) {
    var ID = $(element).attr("id");
    return ID;
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
    var gorevID = getGorevID(draggedElement)
    changeColor(IDofParent, draggedElement);
    updateStatus(IDofParent, gorevID);
}

// ----------------------------------MOBILE SIDE --------------------------------------------------------

    const cards = document.getElementsByClassName('card');
    const statusbox = document.getElementById('statusbox');

    const statusboxBekle = document.getElementById('bekle');
    const statusboxDevam = document.getElementById('devamEt');
    const statusboxTamamla = document.getElementById('tamamla');

    let gorevIDMobile;
    let clickedElement

    const mobileChangeStatus = (e) => {
        statusbox.style.display = 'block';
        statusbox.style.left = e.pageX + 20;
        statusbox.style.top = e.pageY - 5;

        const gorevID = $(e.target).parents('.card').attr('id');
        gorevIDMobile = gorevID;
        clickedElement = e.target.closest('.card');
    }

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', mobileChangeStatus);
    }

    statusboxBekle.addEventListener('click', () => {
        statusbox.style.display = 'none';
        document.getElementById('bekleyen').append(clickedElement)
        deleteColor(clickedElement);
        changeColor('bekleyen', clickedElement);
        updateStatus('bekleyen', gorevIDMobile);
    })

    statusboxDevam.addEventListener('click', () => {
        statusbox.style.display = 'none';
        document.getElementById('devamEden').append(clickedElement);
        deleteColor(clickedElement);
        changeColor('devamEden', clickedElement);
        updateStatus('devamEden', gorevIDMobile);
    })

    statusboxTamamla.addEventListener('click', () => {
        statusbox.style.display = 'none';
        document.getElementById('tamamlanan').append(clickedElement);
        deleteColor(clickedElement);
        changeColor('tamamlanan', clickedElement);
        updateStatus('tamamlanan', gorevIDMobile);
    })

