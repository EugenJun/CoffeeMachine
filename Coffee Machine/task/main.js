const input = require('sync-input')

let coffeeMachineSupplies = {water: 600, milk: 740, beans: 220,
    smallCups: 9, mediumCups: 5, largeCups: 4, money: 550}
let espresso = {water: 250, milk: 0, beans: 16, cup: 1, cost: 4}
let latte = {water: 350, milk: 75, beans: 20, cup: 1, cost: 7}
let cappuccino = {water: 200, milk: 100, beans: 12, cup: 1, cost: 6}
let americano = {water: 350, milk: 0, beans: 16, cup: 1, cost: 5}

function showSupplies() {
    console.log('\nThe coffee machine has:')
    console.log(`${coffeeMachineSupplies.water} ml of water`)
    console.log(`${coffeeMachineSupplies.milk} ml of milk`)
    console.log(`${coffeeMachineSupplies.beans} g of coffee beans`)
    console.log(`${coffeeMachineSupplies.smallCups} disposable cups of small size`)
    console.log(`${coffeeMachineSupplies.mediumCups} disposable cups of medium size`)
    console.log(`${coffeeMachineSupplies.largeCups} disposable cups of large size`)
    console.log(`\$${coffeeMachineSupplies.money} of money\n`)
}

function makeCupOfCoffee(coffeeType, cupSize) {
    let cupSizeCoefficient
    switch (cupSize) {
        case '1':
            cupSizeCoefficient = 0.75
            coffeeMachineSupplies.smallCups -= coffeeType.cup
            break
        case '3':
            cupSizeCoefficient = 1.25
            coffeeMachineSupplies.largeCups -= coffeeType.cup
            break
        default:
            cupSizeCoefficient = 1
            coffeeMachineSupplies.mediumCups -= coffeeType.cup
            break
    }

    coffeeMachineSupplies.milk -= Math.round(coffeeType.milk * cupSizeCoefficient)
    coffeeMachineSupplies.money += coffeeType.cost
    coffeeMachineSupplies.beans -= Math.round(coffeeType.beans * cupSizeCoefficient)
    coffeeMachineSupplies.water -= Math.round(coffeeType.water * cupSizeCoefficient)

    for (let product in coffeeMachineSupplies) {
        if (coffeeMachineSupplies[product] < 0) {
            coffeeMachineSupplies.milk += Math.round(coffeeType.milk * cupSizeCoefficient)
            coffeeMachineSupplies.money -= coffeeType.cost
            coffeeMachineSupplies.beans += Math.round(coffeeType.beans * cupSizeCoefficient)
            coffeeMachineSupplies.water += Math.round(coffeeType.water * cupSizeCoefficient)
            switch (cupSize) {
                case '1':
                    coffeeMachineSupplies.smallCups += coffeeType.cup
                    break
                case '2':
                    coffeeMachineSupplies.mediumCups += coffeeType.cup
                    break
                case '3':
                    coffeeMachineSupplies.largeCups += coffeeType.cup
                    break
            }
            return console.log(`Sorry, not enough ${product}!\n`)
        }
    }
    return console.log('I have enough resources, making you a coffee!\n')
}

function fillCoffeeMachine(water, milk, coffeeBeans, smallCups, mediumCups, largeCups) {
    coffeeMachineSupplies.milk += parseInt(milk)
    coffeeMachineSupplies.smallCups += parseInt(smallCups)
    coffeeMachineSupplies.mediumCups += parseInt(mediumCups)
    coffeeMachineSupplies.largeCups += parseInt(largeCups)
    coffeeMachineSupplies.beans += parseInt(coffeeBeans)
    coffeeMachineSupplies.water += parseInt(water)
    console.log()
}

let coffeeMachineActive = true

while (coffeeMachineActive) {
    let action = input('Write action (buy, fill, take, remaining, exit):\n')
    if (action === 'exit') {
        coffeeMachineActive = false
    } else if (action === 'remaining') {
        showSupplies()
    } else if (action === 'buy') {
        let coffeeType = input('\nWhat do you want to buy? 1 - espresso, 2 - latte,' +
            ' 3 - cappuccino 4 - americano, back - to main menu:\n')
        let coffeeCupSize = input('Choose a cup size: 1 - Small, 2 - Medium, 3 - Large:\n')
        switch (coffeeType) {
            case '1':
                makeCupOfCoffee(espresso, coffeeCupSize);
                break;
            case '2':
                makeCupOfCoffee(latte, coffeeCupSize);
                break;
            case '3':
                makeCupOfCoffee(cappuccino, coffeeCupSize)
                break
            case '4':
                makeCupOfCoffee(americano, coffeeCupSize)
                break;
            case 'back':
                break;
        }
    } else if (action === 'fill') {
        let addedWater = input('\nWrite how many ml of water you want to add:\n')
        let addedMilk = input('Write how many ml of milk you want to add:\n')
        let addedCoffeeBeans = input('Write how many grams of coffee beans you want to add:\n')
        let addedSmallCups = input('Write how many small coffee cups you want to add:\n')
        let addedMediumCups = input('Write how many medium coffee cups you want to add:\n')
        let addedLargeCups = input('Write how many large coffee cups you want to add:\n')
        fillCoffeeMachine(addedWater, addedMilk, addedCoffeeBeans, addedSmallCups, addedMediumCups, addedLargeCups)
    } else if (action === 'take') {
        console.log(`\nI gave you \$${coffeeMachineSupplies.money}\n`)
        coffeeMachineSupplies.money = 0
    }
}

