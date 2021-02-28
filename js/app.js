'use strict';
let imgArray = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass'
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


function wierdItems(name, image) {
    this.name = name;
    this.image = `./img/${name}.jpg` || `./img/${name}.gif` || `./img/${name}.png`;
    this.clicks = 0;
    this.shown = 0;
    wierdItems.all.push(this);
};
wierdItems.all = [];
wierdItems.counter = 0;
for (let i = 0; i < imgArray.length; i++) {
    new wierdItems(imgArray[i]);
};
function addWierdItems() {
    let first = randomNumber(0, wierdItems.all.length - 1);
    firstImage.src = wierdItems.all[first].image;
    firstImage.alt = wierdItems.all[first].name;
    firstIndex = first;

    let second; do { second = randomNumber(0, wierdItems.all.length - 1); }
    while (first == second);
    secondImage.src = wierdItems.all[second].image;
    secondImage.alt = wierdItems.all[second].name;
    secondIndex = second;

    let third; do { third = randomNumber(0, wierdItems.all.length - 1); }
    while (first == third || second == third);
    thirdImage.src = wierdItems.all[third].image;
    thirdImage.alt = wierdItems.all[third].name;
    thirdIndex = third;

    wierdItems.all[firstIndex].shown++;
    wierdItems.all[secondIndex].shown++;
    wierdItems.all[thirdIndex].shown++;
};

function handelClick(event) {
    if (wierdItems.counter <= clickCounter) {
        const clicked = event.target;
        if (clicked.Id == 'firstImage' || clicked.Id == 'secondImage' || clicked.Id == 'thirdImage') {
            if (clicked.id == 'firstImage') {
                wierdItems.all[firstIndex].clicks++
            }
            if (clicked.id == 'secondImage') {
                wierdItems.all[secondIndex].clicks++
            }
            if (clicked.id == 'thirdImage') {
                wierdItems.all[thirdIndex].clicks++
            }
            wierdItems.counter++
            addWierdItems();
            console.log(wierdItems.all);
        }
    }
}
imageSection.addEventListener('click', handelClick);
console.log(wierdItems.all);

addWierdItems();


wierdItems.prototype.results = function () {
    const data = document.getElementById('data');
    const dataList = document.createElement('ul');
    data.appendChild(dataList);

    for (let i = 0; i < imgArray.length; i++) {
        const items = document.createElement('li');
        dataList.appendChild(item);
        items.textContent = wierdItems.all[i];
    }
};




