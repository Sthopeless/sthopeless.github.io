let currentDay = 1;
let cash = 500;
let debt = 0;
let inventory = { heroin: 0, cocaine: 0, marijuana: 0, ecstasy: 0, meth: 0, acid: 0, shrooms: 0, lsd: 0, fentanyl: 0, crack: 0 };
let cities = [
    { name: "City A", heroin: Math.floor(Math.random() * 100) + 50, cocaine: Math.floor(Math.random() * 100) + 60, marijuana: Math.floor(Math.random() * 50) + 30, ecstasy: Math.floor(Math.random() * 80) + 50, meth: Math.floor(Math.random() * 80) + 100, acid: Math.floor(Math.random() * 70) + 60, shrooms: Math.floor(Math.random() * 70) + 90, lsd: Math.floor(Math.random() * 70) + 60, fentanyl: Math.floor(Math.random() * 100) + 140, crack: Math.floor(Math.random() * 80) + 90 },
    { name: "City B", heroin: Math.floor(Math.random() * 100) + 70, cocaine: Math.floor(Math.random() * 100) + 60, marijuana: Math.floor(Math.random() * 50) + 30, ecstasy: Math.floor(Math.random() * 80) + 50, meth: Math.floor(Math.random() * 80) + 100, acid: Math.floor(Math.random() * 70) + 60, shrooms: Math.floor(Math.random() * 70) + 90, lsd: Math.floor(Math.random() * 70) + 60, fentanyl: Math.floor(Math.random() * 100) + 140, crack: Math.floor(Math.random() * 80) + 90 },
    { name: "City C", heroin: Math.floor(Math.random() * 100) + 60, cocaine: Math.floor(Math.random() * 100) + 60, marijuana: Math.floor(Math.random() * 50) + 30, ecstasy: Math.floor(Math.random() * 80) + 50, meth: Math.floor(Math.random() * 80) + 100, acid: Math.floor(Math.random() * 70) + 60, shrooms: Math.floor(Math.random() * 70) + 90, lsd: Math.floor(Math.random() * 70) + 60, fentanyl: Math.floor(Math.random() * 100) + 140, crack: Math.floor(Math.random() * 80) + 90 },
    { name: "City D", heroin: Math.floor(Math.random() * 100) + 55, cocaine: Math.floor(Math.random() * 100) + 60, marijuana: Math.floor(Math.random() * 50) + 30, ecstasy: Math.floor(Math.random() * 80) + 50, meth: Math.floor(Math.random() * 80) + 100, acid: Math.floor(Math.random() * 70) + 60, shrooms: Math.floor(Math.random() * 70) + 90, lsd: Math.floor(Math.random() * 70) + 60, fentanyl: Math.floor(Math.random() * 100) + 140, crack: Math.floor(Math.random() * 80) + 90 },
    { name: "City E", heroin: Math.floor(Math.random() * 100) + 80, cocaine: Math.floor(Math.random() * 100) + 60, marijuana: Math.floor(Math.random() * 50) + 30, ecstasy: Math.floor(Math.random() * 80) + 50, meth: Math.floor(Math.random() * 80) + 100, acid: Math.floor(Math.random() * 70) + 60, shrooms: Math.floor(Math.random() * 70) + 90, lsd: Math.floor(Math.random() * 70) + 60, fentanyl: Math.floor(Math.random() * 100) + 140, crack: Math.floor(Math.random() * 80) + 90 }
];
let currentCityIndex = 0;

function updateUI() {
    const city = cities[currentCityIndex];
    let inventoryDisplay = "<h3>Inventory:</h3><ul>";
    for (let product in inventory) {
        inventoryDisplay += `<li>${product}: ${inventory[product]} units</li>`;
    }
    inventoryDisplay += "</ul>";
    let productOptions = "";
    for (let product in inventory) {
        productOptions += `<option value="${product}">${product}</option>`;
    }
    document.getElementById("game-container").innerHTML = `
    <h2>Day ${currentDay}</h2>
    <p>Cash: $${cash} | Debt: $${debt}</p>
    <h3>${city.name}</h3>
    <p>Heroin: $${city.heroin} | Cocaine: $${city.cocaine} | Marijuana: $${city.marijuana}</p>
    <p>Ecstasy: $${city.ecstasy} | Meth: $${city.meth} | Acid: $${city.acid}</p>
    <p>Shrooms: $${city.shrooms} | LSD: $${city.lsd} | Fentanyl: $${city.fentanyl} | Crack: $${city.crack}</p>
    ${inventoryDisplay}
<!--
    <div>
        <button onclick="travel(0)">Travel to City A</button>
        <button onclick="travel(1)">Travel to City B</button>
        <button onclick="travel(2)">Travel to City C</button>
        <button onclick="travel(3)">Travel to City D</button>
        <button onclick="travel(4)">Travel to City E</button>
        <button onclick="travelRandom()">Travel to Random City</button>
    </div>
-->
    <div>
        <label for="productSelect">Select product:</label>
        <select id="productSelect">
            ${productOptions}
        </select>
        <input type="number" id="quantity" min="1" value="1" />
        <button onclick="buyMultiple()">Buy</button>
        <button onclick="sellMultiple()">Sell</button>
        <button onclick="buyAll(document.getElementById('productSelect').value)">Buy All</button>
        <button onclick="sellAll(document.getElementById('productSelect').value)">Sell All</button>
    </div>
    <div>
        <button onclick="randomEvent()">Random Event</button>
    </div>
`;
}

function checkGameOver() {
    if (cash < 0) {
        alert("Game Over! You ran out of cash.");
        location.reload();
    }
}

function travelRandom() {
    let randomCityIndex;
    do {
        randomCityIndex = Math.floor(Math.random() * cities.length);
    } while (randomCityIndex === currentCityIndex);
    travel(randomCityIndex);
}

function travel(index) {
    if (index !== currentCityIndex) {
        currentCityIndex = index;
        currentDay++;
        randomPriceChange();
        updateUI();
        checkGameOver();
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

function buyMultiple() {
    const drug = document.getElementById("productSelect").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const city = cities[currentCityIndex];
    const price = city[drug];
    if (price && quantity > 0 && cash >= price * quantity) {
        inventory[drug] += quantity;
        cash -= price * quantity;
        alert(`Bought ${quantity} units of ${drug} for $${price * quantity}`);
        updateUI();
    } else {
        alert("Invalid input or not enough cash!");
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

function sellMultiple() {
    const drug = document.getElementById("productSelect").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    if (inventory[drug] >= quantity && quantity > 0) {
        const city = cities[currentCityIndex];
        const price = city[drug];
        inventory[drug] -= quantity;
        cash += price * quantity;
        alert(`Sold ${quantity} units of ${drug} for $${price * quantity}`);
        updateUI();
    } else {
        alert("Invalid input or not enough product to sell!");
    }
}

function buyAll(product) {
    const city = cities[currentCityIndex];
    const price = city[product];
    const maxUnits = Math.floor(cash / price);
    if (maxUnits > 0) {
        inventory[product] += maxUnits;
        cash -= price * maxUnits;
        alert(`Bought ${maxUnits} units of ${product} for $${price * maxUnits}`);
        updateUI();
    } else {
        alert("You don't have enough cash to buy any!");
    }
}

function sellAll(product) {
    if (inventory[product] > 0) {
        const city = cities[currentCityIndex];
        const price = city[product];
        const totalSale = inventory[product] * price;
        cash += totalSale;
        inventory[product] = 0;
        alert(`Sold all units of ${product} for $${totalSale}`);
        updateUI();
    } else {
        alert(`You don't have any ${product} to sell!`);
    }
}

function randomEvent() {
    const events = [
        { event: "Police bust! Lose $100", action: () => { cash -= 100; } },
        { event: "You stole a dealer and got $500", action: () => { cash += 500; } },
        { event: "Mugged! Lose $50", action: () => { cash -= 50; } },
        // { event: "Loan shark offers a loan. Loan shark takes 20% interest after 5 days.", action: () => { loan(); } },
        { event: "You invested in Cryptos and doubled your money", action: () => { cash *= 2; } },
        { event: "Cryptos crash! Lose 90% of your cash", action: () => { cash -= cash * 0.9; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
        { event: "You travel safely", action: () => { cash += 0; } },
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent.action();
    if (randomEvent.event !== "You travel safely") {
        alert(randomEvent.event);
    }
    travelRandom();
    updateUI();
} 

function loan() {
    if (debt > 0) {
        alert("You already have an outstanding loan!");
    } else {
        let loanAmount = 200;
        debt += loanAmount;
        cash += loanAmount;
        setTimeout(() => { debt += loanAmount * 0.2; }, 5000);
    }
}

function randomPriceChange() {
    cities.forEach(city => {
        city.heroin = Math.floor(Math.random() * 1000) + 50;
        city.cocaine = Math.floor(Math.random() * 1000) + 60;
        city.marijuana = Math.floor(Math.random() * 500) + 30;
        city.ecstasy = Math.floor(Math.random() * 800) + 50;
        city.meth = Math.floor(Math.random() * 800) + 100;
        city.acid = Math.floor(Math.random() * 700) + 60;
        city.shrooms = Math.floor(Math.random() * 700) + 90;
        city.lsd = Math.floor(Math.random() * 700) + 60;
        city.fentanyl = Math.floor(Math.random() * 1000) + 140;
        city.crack = Math.floor(Math.random() * 800) + 90;
    });
}

window.onload = () => {
    updateUI();
};

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        travelRandom();
    }
});
