'use strict';
let imgArray = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const imageSection = document.getElementById('imageSection');
const firstImage = document.getElementById('firstImage');
const secondImage = document.getElementById('secondImage');
const thirdImage = document.getElementById('thirdImage');


let firstIndex = 0;
let secondIndex = 0;
let thirdIndex = 0;
const clickCounter = 25;


function WierdItems(name) {
    this.name = name.split('.')[0];
    this.image = `img/${name}`;
    this.clicks = 0;
    this.shown = 0;
    WierdItems.all.push(this);
};
WierdItems.all = [];
WierdItems.counter = 0;



for (let i = 0; i < imgArray.length; i++) {
    new WierdItems(imgArray[i]);
};

let nextShown = [];
function addWierdItems() {
    document.getElementById('button1').style.visibility = 'hidden';
    let previouslyShown = nextShown;
    do {
        let temp = [];
        nextShown = temp;
        let first = randomNumber(0, WierdItems.all.length - 1);
        firstImage.src = WierdItems.all[first].image;
        firstImage.alt = WierdItems.all[first].name;
        firstIndex = first;

        let second; do { second = randomNumber(0, WierdItems.all.length - 1); }
        while (first == second);
        secondImage.src = WierdItems.all[second].image;
        secondImage.alt = WierdItems.all[second].name;
        secondIndex = second;

        let third; do { third = randomNumber(0, WierdItems.all.length - 1); }
        while (first == third || second == third);
        thirdImage.src = WierdItems.all[third].image;
        thirdImage.alt = WierdItems.all[third].name;
        thirdIndex = third;

        WierdItems.all[firstIndex].shown++;
        WierdItems.all[secondIndex].shown++;
        WierdItems.all[thirdIndex].shown++;
        nextShown.push(first, second, third);
    }
    while (nextShown.includes(previouslyShown[0]) || nextShown.includes(previouslyShown[1]) || nextShown.includes(previouslyShown[2])
    );




};

imageSection.addEventListener('click', handelClick);

function handelClick(event) {
    if (WierdItems.counter < clickCounter) {
        const clicked = event.target;
        if (clicked.id === 'firstImage' || clicked.id === 'secondImage' || clicked.id === 'thirdImage') {
            if (clicked.id === 'firstImage') {
                WierdItems.all[firstIndex].clicks++
            }
            if (clicked.id === 'secondImage') {
                WierdItems.all[secondIndex].clicks++
            }
            if (clicked.id === 'thirdImage') {
                WierdItems.all[thirdIndex].clicks++
            }
            WierdItems.counter++
            addWierdItems();
            console.log(WierdItems.all);

        }
    }
    else {
        // chartElement();
        showButton();
        imageSection.removeEventListener('click', handelClick);

    }

}
console.log(WierdItems.all);

function showButton() {
    document.getElementById('button1').style.visibility = 'visible';
};

let results = function () {
    const data = document.getElementById('data');
    const dataList = document.createElement('ul');
    data.appendChild(dataList);

    for (let i = 0; i < imgArray.length; i++) {
        const items = document.createElement('li');
        dataList.appendChild(items);
        items.textContent = `${WierdItems.all[i].name}; Cliked at:${WierdItems.all[i].clicks}; viewd:${WierdItems.all[i].shown}`;
    };
};

addWierdItems();



function chartElement() {

    let nameArray = [];
    let clicksArray = [];
    let viewsArray = [];

    for (let i = 0; i < WierdItems.all.length; i++) {
        nameArray.push(WierdItems.all[i].name);
        clicksArray.push(WierdItems.all[i].clicks);
        viewsArray.push(WierdItems.all[i].shown);
    }
    let ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameArray,
            datasets: [
                {
                    label: '# of Votes',
                    data: clicksArray,
                    backgroundColor: '(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                },
                {
                    label: '# of views',
                    data: viewsArray,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                },

            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
addWierdItems();

