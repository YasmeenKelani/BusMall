'use strict';
let attemptEl = document.getElementById('attempts');

let container = document.getElementById('image-container');

let leftImg = document.getElementById('leftImg');
let middleImg = document.getElementById('middleImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');

let busImage=[];
let views = [];
let votes = [];

let productsImg = ['bag.jpg', 'banana.jpg', 'breakfast.jpg', 'bathroom.jpg', 'boots.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg ', 'unicorn.jpg', 'water-can.jpg ', 'wine-glass.jpg'];

let attempt = 1;
let maxAttempt = 25;
let products = [];

function ProductImg(productName) {
    this.productName = productName.split('.')[0];
    this.productImg = `assest/${productName}`;
    this.votes = 0;
    this.views = 0;
    products.push(this);
    busImage.push(this.productName );
}

for (let i = 0; i < productsImg.length; i++) {
    new ProductImg(productsImg[i]);
}

function randomProduct() {
    return Math.floor(Math.random() * products.length);
}

let leftIndex;
let middleIndex;
let rightIndex;

let roundImg = [];
function renderProduct() {
    leftIndex = randomProduct();
    middleIndex = randomProduct();
    rightIndex = randomProduct();

    while (leftIndex === middleIndex || middleIndex === rightIndex || rightIndex === leftIndex ||  roundImg.includes(leftIndex)  || roundImg.includes(rightIndex) || roundImg.includes(middleIndex )) {
        leftIndex = randomProduct();
        middleIndex = randomProduct();
        rightIndex = randomProduct();
    }
    roundImg = [];
    roundImg[0] = rightIndex;
    roundImg[1] = middleIndex;
    roundImg[3] = leftIndex;

    leftImg.setAttribute('src', products[leftIndex].productImg)
    middleImg.setAttribute('src', products[middleIndex].productImg);
    rightImg.setAttribute('src', products[rightIndex].productImg);

    products[leftIndex].views++;
    products[middleIndex].views++;
    products[rightIndex].views++;
}

renderProduct();

leftImg.addEventListener('click', clickHandler);
middleImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maxAttempt) {

        let clickedImg = event.target.id;
        if (clickedImg === 'leftImg') {
            products[leftIndex].votes++;
        }

        else if (clickedImg === 'middleImg') {
            products[middleIndex].votes++
        }

        else if (clickedImg === 'rightImg') {
            products[rightIndex].votes++
        }

        renderProduct();
        attempt++;

    }
}

let btn = document.getElementById('button');
btn.addEventListener('click', showResult);

let finalArr=[];
function showResult() {
    for (let i = 0; i < products.length; i++) {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${products[i].productName} has ${products[i].votes} votes and  ${products[i].views} views.`;
        views.push(busImage[i].views);
        votes.push(busImage[i].votes);
        finalArr.push(busImage[i].productImg);


    }
}
 

    function chartRender() {
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type : 'bar',
            data: {
                labels: productsImg,
                datasets: [{
                    label: '# of Votes',
                    data: votes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }, {
                    label: '# of views',
                    data: views,
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
    chartRender();
    
