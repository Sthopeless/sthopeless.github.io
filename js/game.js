
let currentDay = 1;
let cash = 500;
let debt = 0;
let inventory = { heroin: 0, cocaine: 0, marijuana: 0 };
let cities = [
    { name: "City A", heroin: 50, cocaine: 80, marijuana: 30 },
    { name: "City B", heroin: 70, cocaine: 60, marijuana: 40 },
    { name: "City C", heroin: 60, cocaine: 75, marijuana: 35 }
];
let currentCityIndex = 0;

function toggleTheme() {
    document.body.classList.toggle('retro');
}

function updateUI() {
    const city = cities[currentCityIndex];
    document.getElementById("game-container").innerHTML = `
        <h2>Day ${currentDay}</h2>
        <p>Cash: $${cash} | Debt: $${debt}</p>
        <h3>${city.name}</h3>
        <p>Heroin: $${city.heroin} | Cocaine: $${city.cocaine} | Marijuana: $${city.marijuana}</p>
        <div>
            <button onclick="travel(0)">Travel to City A</button>
            <button onclick="travel(1)">Travel to City B</button>
            <button onclick="travel(2)">Travel to City C</button>
        </div>
        <div>
            <button onclick="buy('heroin')">Buy Heroin</button>
            <button onclick="buy('cocaine')">Buy Cocaine</button>
            <button onclick="buy('marijuana')">Buy Marijuana</button>
        </div>
        <div>
            <button onclick="sell('heroin')">Sell Heroin</button>
            <button onclick="sell('cocaine')">Sell Cocaine</button>
            <button onclick="sell('marijuana')">Sell Marijuana</button>
        </div>
        <div>
            <button onclick="randomEvent()">Random Event</button>
        </div>
    `;
}

function travel(index) {
    if (index !== currentCityIndex) {
        currentCityIndex = index;
        currentDay++;
        randomPriceChange();
        updateUI();
    }
}

function buy(drug) {
    const city = cities[currentCityIndex];
    const price = city[drug];
    if (cash >= price) {
        inventory[drug]++;
        cash -= price;
        alert(`Bought 1 unit of ${drug} for $${price}`);
        updateUI();
    } else {
        alert("You don't have enough cash to buy this!");
    }
}

function sell(drug) {
    if (inventory[drug] > 0) {
        const city = cities[currentCityIndex];
        const price = city[drug];
        inventory[drug]--;
        cash += price;
        alert(`Sold 1 unit of ${drug} for $${price}`);
        updateUI();
    } else {
        alert(`You don't have any ${drug} to sell!`);
    }
}

function randomEvent() {
    const events = [
        { event: "Police bust! Lose $100", action: () => { cash -= 100; } },
        { event: "Mugged! Lose $50", action: () => { cash -= 50; } },
        { event: "Loan shark offers a loan. Loan shark takes 20% interest after 5 days.", action: () => { loan(); } },
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent.action();
    alert(randomEvent.event);
    updateUI();
}

function loan() {
    if (debt > 0) {
        alert("You already have an outstanding loan!");
    } else {
        let loanAmount = 200;
        debt += loanAmount;
        cash += loanAmount;
        setTimeout(() => { debt += loanAmount * 0.2; }, 5000);  // Interest after 5 days
    }
}

function randomPriceChange() {
    cities.forEach(city => {
        city.heroin = Math.floor(Math.random() * 100) + 50;
        city.cocaine = Math.floor(Math.random() * 100) + 60;
        city.marijuana = Math.floor(Math.random() * 50) + 30;
    });
}

window.onload = () => {
    updateUI();
};
