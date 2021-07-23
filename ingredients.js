


let addIngredient = (name)=>{
    let d
    for (let i of ingredients) {
        if (i.name == name) {
            d = i
            break
        }
    }

    if (!d) { return }
    
    let dice = new Dice(d.name, d.numbers, d.color)
    let div = dice.createDiv()
    dice.div = div
    shaker.push(dice)
    let shakerDiv = document.getElementById('shaker')
    shakerDiv.appendChild(div)
    shakerDiv.classList.toggle('showRoll', false)

}

let removeIngredient = (div)=> {
    document.getElementById('shaker').removeChild(div)
}


let addToShaker = ()=>{
    console.log('whats this?',event)
    let btn = document.createElement('div')
    btn.className = 'ingredient'
    btn.innerText = event.srcElement.innerText
    shakerDiv.appendChild(btn)
}




function shake() {
    document.getElementById('shaker').classList.toggle('showRoll', true)
    for (let dice of shaker) {
        dice.roll()
        dice.updateDiv()
    }
    evalRules()
}


function clearShaker() {
    let shakerDiv = document.getElementById('shaker')
    for (let dice of shaker){
        if (!dice.div) { continue}
        shakerDiv.removeChild(dice.div)
    }

    shaker = []
}


function sliderInput() {
    glassSize = parseInt(document.getElementById('range').value)
    document.getElementById('rangeValue').innerText = glassSize
}




let ingredients = [
    new Dice('Lemon', [3,6], '#e0d332'),
    new Dice('Orange', [1,2,3], 'orange'),
    new Dice('Mango', [1,3], '#da8126'),
    new Dice('Chocolate', [4,5], '#734638'),
    new Dice('Tomato', [1,3,5], 'red'),
    new Dice('Chilli', [6], '#bd1515'),
    new Dice('Ice', [-4], 'blue'),
    new Dice('Blueberry', [1], '#5050bf'),
    new Dice('Apple', [4,5,6], 'green'),

    new Dice('Mint', [1,2,3,4], '#65a565'),
    

    
    
    
    
    
    
    
    
    
]
