'use strict';

let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let rightImg = document.getElementById('rightImg');
let middleImg = document.getElementById('middleImg');
let result = document.getElementById('results');

 let busImages = ['bag.jpg', 'banana.jpg', 'breakfast.jpg', 'bathroom.jpg', 'boots.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg ', 'unicorn.jpg', 'water-can.jpg ', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1
let bus = [];
let aNames = [];
let vote = [];
let view = [];

let ulEl = document.getElementById('bus');

function saveToLocalStorage() {
  
    let data = JSON.stringify(bus);
    localStorage.setItem('busMall', data);

}

function readFromLocalStorage() {

    let stringObject = localStorage.getItem('busMall');
    let normalObject = JSON.parse(stringObject);

    if (normalObject) {

        bus = normalObject;
        renderImg();

    }

}

function BusImages(busName) {
    this.bName = busName.split('.')[0];
    this.bImg = `assest/${busName}`;
    this.votes = 0;
    this.views = 0;
    bus.push(this);
    aNames.push(this.bName);
}

for (let i = 0; i < busImages.length; i++) {
    new BusImages(busImages[i]);
    console.log(busImages[i]);
}

function randomImage() {
    return Math.floor(Math.random() * bus.length);

}

let leftIndex;
let rightIndex;
let middleIndex;
let ran = [];
function renderImg() {

    while (leftIndex === middleIndex ||
        middleIndex === rightIndex ||
        leftIndex === rightIndex || ran.includes(leftIndex) ||
        ran.includes(middleIndex) ||
        ran.includes(rightIndex)) {
        leftIndex = randomImage();
        rightIndex = randomImage();
        middleIndex = randomImage();
    }

    ran[0] = (leftIndex);
    ran[1] = (rightIndex);
    ran[2] = (middleIndex);

    leftImg.setAttribute('src', bus[leftIndex].bImg);
    rightImg.setAttribute('src', bus[rightIndex].bImg);
    middleImg.setAttribute('src', bus[middleIndex].bImg);

    bus[leftIndex].views++;
    bus[rightIndex].views++;
    bus[middleIndex].views++;

}


renderImg();

leftImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);
middleImg.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;

        if (clickedImage === 'leftImg') {
            bus[leftIndex].votes++;

        } else if (clickedImage === 'rightImg') {
            bus[rightIndex].votes++;

        } else if (clickedImage === 'middleImg') {
            bus[middleIndex].votes++;

        }

        renderImg();

        attempt++;


    } else {

        leftImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
        middleImg.removeEventListener('click', clickHandler);
    }

}
let btn = document.getElementById('btn');
btn.addEventListener('click',showingResult);

function showingResult() {

    for (let i = 0; i < bus.length; i++) {

        let liEl = document.createElement('li');

        result.appendChild(liEl);

        liEl.textContent = `${bus[i].bName} has ${bus[i].votes} votes and ${bus[i].views} views.`;

        vote.push(bus[i].votes);
        view.push(bus[i].views);

    }

    btn.removeEventListener('click', showingResult);
    saveToLocalStorage();
    chartRender();

}

function chartRender() {

    let ctx = document.getElementById('myChart').getContext('2d');

    let myChart = new Chart(ctx, {

        type: 'bar',
        data: {
            labels: aNames,
            datasets: [{
                label: '# of Votes',
                data: vote,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: view,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true

                }

            }

        }

    });

}

readFromLocalStorage();