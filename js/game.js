# Update the game to use a dropdown for buying/selling multiple units and add buttons to buy/sell all possible quantity

game_js_content_v3 = """
let currentDay = 1;
let cash = 5000;
let debt = 0;
let inventory = { heroin: 0, cocaine: 0, marijuana: 0, ecstasy: 0, meth: 0, acid: 0, shrooms: 0, lsd: 0, fentanyl: 0, crack: 0 };
let cities = [
    { name: "City A", heroin: 50, cocaine: 80, marijuana: 30, ecstasy: 60, meth: 120, acid: 90, shrooms: 110, lsd: 70, fentanyl: 150, crack: 100 },
    { name: "City B", heroin: 70, cocaine: 60, marijuana: 40, ecstasy: 55, meth: 100, acid: 80, shrooms: 95, lsd: 85, fentanyl: 160, crack: 110 },
    { name: "City C", heroin: 60, cocaine: 75, marijuana: 35, ecstasy: 65, meth: 110, acid: 85, shrooms: 120, lsd: 75, fentanyl: 140, crack: 90 },
    { name: "City D", heroin: 55, cocaine: 85, marijuana: 50, ecstasy: 70, meth: 130, acid: 95, shrooms: 100, lsd: 60, fentanyl: 145, crack: 120 },
    { name: "City E", heroin: 80, cocaine: 70, marijuana: 45, ecstasy: 75, meth: 125, acid: 100, shrooms: 105, lsd: 80, fentanyl: 155, crack: 130 }
];
let currentCityIndex = 0;

function toggleTheme() {
   # document.body.classList.toggle('retro');
    document.body.classList.add('retro');

}

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
        <div>
            <button onclick="travel(0)">Travel to City A</button>
            <button onclick="travel(1)">Travel to City B</button>
            <button onclick="travel(2)">Travel to City C</button>
            <button onclick="travel(3)">Travel to City D</button>
            <button onclick="travel(4)">Travel to City E</button>
        </div>
        <div>
            <button onclick="buy('heroin')">Buy Heroin (1 unit)</button>
            <button onclick="buy('cocaine')">Buy Cocaine (1 unit)</button>
            <button onclick="buy('marijuana')">Buy Marijuana (1 unit)</button>
            <button onclick="buy('ecstasy')">Buy Ecstasy (1 unit)</button>
            <button onclick="buy('meth')">Buy Meth (1 unit)</button>
            <button onclick="buy('acid')">Buy Acid (1 unit)</button>
            <button onclick="buy('shrooms')">Buy Shrooms (1 unit)</button>
            <button onclick="buy('lsd')">Buy LSD (1 unit)</button>
            <button onclick="buy('fentanyl')">Buy Fentanyl (1 unit)</button>
            <button onclick="buy('crack')">Buy Crack (1 unit)</button>
        </div>
        <div>
            <button onclick="sell('heroin')">Sell Heroin (1 unit)</button>
            <button onclick="sell('cocaine')">Sell Cocaine (1 unit)</button>
            <button onclick="sell('marijuana')">Sell Marijuana (1 unit)</button>
            <button onclick="sell('ecstasy')">Sell Ecstasy (1 unit)</button>
            <button onclick="sell('meth')">Sell Meth (1 unit)</button>
            <button onclick="sell('acid')">Sell Acid (1 unit)</button>
            <button onclick="sell('shrooms')">Sell Shrooms (1 unit)</button>
            <button onclick="sell('lsd')">Sell LSD (1 unit)</button>
            <button onclick="sell('fentanyl')">Sell Fentanyl (1 unit)</button>
            <button onclick="sell('crack')">Sell Crack (1 unit)</button>
        </div>
        <div>
            <label for="productSelect">Select product:</label>
            <select id="productSelect">
                ${productOptions}
            </select>
            <input type="number" id="quantity" min="1" value="1" />
            <button onclick="buyMultiple()">Buy Multiple Units</button>
            <button onclick="sellMultiple()">Sell Multiple Units</button>
            <button onclick="buyAll()">Buy All Possible Units</button>
            <button onclick="sellAll()">Sell All Units</button>
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

function buyAll() {
    const drug = document.getElementById("productSelect").value;
    const city = cities[currentCityIndex];
    const price = city[drug];
    const maxUnits = Math.floor(cash / price);
    if (maxUnits > 0) {
        inventory[drug] += maxUnits;
        cash -= price * maxUnits;
        alert(`Bought ${maxUnits} units of ${drug} for $${price * maxUnits}`);
        updateUI();
    } else {
        alert("You don't have enough cash to buy any!");
    }
}

function sellAll() {
    const drug = document.getElementById("productSelect").value;
    if (inventory[drug] > 0) {
        const city = cities[currentCityIndex];
        const price = city[drug];
        const totalSale = inventory[drug] * price;
        cash += totalSale;
        inventory[drug] = 0;
        alert(`Sold all ${inventory[drug]} units of ${drug} for $${totalSale}`);
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
   
