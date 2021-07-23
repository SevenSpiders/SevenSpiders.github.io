
window.onload = function() {    
    main()
    document.getElementById('shake').onclick = shake
    populateRules()
    document.getElementById('newRules').onclick = newRules
    document.getElementById('evalRules').onclick = evalRules
    document.getElementById('clearShaker').onclick = clearShaker
    document.getElementById('range').oninput = sliderInput
    evalDifficulty(1000)
}




let ingredientsDiv 
let shakerDiv //= document.getElementsByClassName("shaker")[0]
let shaker = []
let rules = []
let glassSize = 5


class Dice {
    constructor(name, numbers, color) {
        this.name = name
        this.numbers = numbers
        this.color = color
        this.number
        this.div
    }

    roll() {
        this.number = this.numbers[Math.floor(Math.random()*this.numbers.length)];
        return this.number
    }

    createDiv() {

        let div = createDiv('ingredient')
        let leftDiv = createDiv('left')
        let nameDiv = createDiv('name')
        let diceDiv = createDiv('dice')
        let rollDiv = createDiv('roll')

        div.style.background = this.color
        nameDiv.innerText = this.name

        // numbers
        let t = '[ '
        for (let n of this.numbers) {
            t += n + ', '
        }
        t = t.slice(0, -2)
        t += ' ]'
        diceDiv.innerText = t

        rollDiv.innerText = this.number

        leftDiv.appendChild(nameDiv)
        leftDiv.appendChild(diceDiv)
        div.appendChild(leftDiv)
        div.appendChild(rollDiv)
        div.onclick = this.onclick
        
        return div
    }

    onclick() {
        if (this.parentElement.id == 'ingredients') {
            let name = this.children[0].children[0].innerText
            addIngredient(name)
        } else if (this.parentElement.id == 'shaker') {
            // let name = this.children[0].children[0].innerText
            removeIngredient(this)
        }
    }

    updateDiv() {
        if (!this.div) { return }
        this.div.children[1].innerText = this.number
    }
}

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

function shake() {
    document.getElementById('shaker').classList.toggle('showRoll', true)
    for (let dice of shaker) {
        dice.roll()
        dice.updateDiv()
    }
    evalRules()
}




let ingredients = [
    new Dice('Orange', [1,2,3], 'orange'),
    new Dice('Apple', [4,5,6], 'green'),

    new Dice('Cucumber', [1,2,3,4], '#65a565'),
    new Dice('Blueberry', [1], '#5050bf'),

    new Dice('Tabasco', [6], '#bd1515'),
    new Dice('Chocolate', [4,5], '#734638'),
    new Dice('Lemon', [3,6], '#e0d332'),
    new Dice('Mango', [1,3], '#da8126'),
    
    new Dice('Tomato', [1,3,5], 'red'),
    
    new Dice('Ice', [-4], 'blue'),
    
]


let main = ()=>{

    ingredientsDiv = document.getElementsByClassName("ingredients")[0]
    shakerDiv = document.getElementsByClassName("shaker")[0]


    for (let i of ingredients) {
        let d = i.createDiv()
        ingredientsDiv.appendChild(d)

    }
}

let addToShaker = ()=>{
    console.log('whats this?',event)
    let btn = document.createElement('div')
    btn.className = 'ingredient'
    btn.innerText = event.srcElement.innerText
    shakerDiv.appendChild(btn)
}





let createDiv = (c)=> { 
    let d = document.createElement('div')
    d.className = c
    return d
}



let rulePatterns = {
    'sum<X' : (x)=> {
        let f = ()=> {
            let s = 0
            for (let dice of shaker) {
                if (dice.number) { s += dice.number}
            }
            return s < x
        }
        f.text = 'Sum less than '+x
        return f
    },

    'sum>X' : (x)=> {
        let f = ()=> {
            let s = 0
            for (let dice of shaker) {
                if (dice.number) { s += dice.number}
            }
            return s >= x
        }
        f.text = 'Sum higher or equal '+x
        return f
    },

    'no number lower than x': (x)=>{
        let f = ()=>{
            for (let dice of shaker) { if (dice.number < x) { return false} }
            return true
        }
        f.text = 'No number lower than '+x
        return f
    },

    'no number higher than x': (x)=>{
        let f = ()=>{
            for (let dice of shaker) { if (dice.number > x) { return false} }
            return true
        }
        f.text = 'No number higher than '+x
        return f
    },

    'contains exactly one x': (x)=>{
        let f = ()=>{
            let count  = 0
            for (let dice of shaker) { if (dice.number == x) { count += 1 } }
            return count == 1
        }
        f.text = 'Contains exactly one '+x
        return f
    },

    'contains at least one x': (x)=>{
        let f = ()=>{
            let count  = 0
            for (let dice of shaker) { if (dice.number == x) { count += 1 } }
            return count >= 1
        }
        f.text = 'Contains at least one '+x
        return f
    },

    'contains at least two x': (x)=>{
        let f = ()=>{
            let count  = 0
            for (let dice of shaker) { if (dice.number == x) { count += 1 } }
            return count >= 2
        }
        f.text = 'Contains at least two '+x
        return f
    },

    'contains maximally two x': (x)=>{
        let f = ()=>{
            let count  = 0
            for (let dice of shaker) { if (dice.number == x) { count += 1 } }
            return count <= 2
        }
        f.text = 'Contains maximally two '+x
        return f
    },

    'contains a pair': ()=>{
        let f = ()=>{
            let count  = {}
            for (let dice of shaker) { 
                if (dice.number in count) { count[dice.number] += 1 }
                else {count[dice.number] = 1}
            }
            for (let key in count) { if (count[key] >= 2) { return true} }
            return false
        }
        f.text = 'Contains a pair'
        return f
    },

    'contains x pairs': (x)=>{
        let f = ()=>{
            let count  = {}
            for (let dice of shaker) { 
                if (dice.number in count) { count[dice.number] += 1 }
                else {count[dice.number] = 1}
            }
            let countPairs = 0
            for (let key in count) { if (count[key] >= 2) { countPairs += 1 } }
            return countPairs >= x
        }
        f.text = 'Contains '+x+' pairs'
        return f
    },

    'contains a tripple': ()=>{
        let f = ()=>{
            let count  = {}
            for (let dice of shaker) { 
                if (dice.number in count) { count[dice.number] += 1 }
                else {count[dice.number] = 1}
            }
            for (let key in count) { if (count[key] >= 3) { return true} }
            return false
        }
        f.text = 'Contains a tripple'
        return f
    },

    'contains x tripples': (x)=>{
        let f = ()=>{
            let count  = {}
            for (let dice of shaker) { 
                if (dice.number in count) { count[dice.number] += 1 }
                else {count[dice.number] = 1}
            }
            let countPairs = 0
            for (let key in count) { if (count[key] >= 3) { countPairs += 1 } }
            return countPairs >= x
        }
        f.text = 'Contains '+x+' tripples'
        return f
    },

    'ingredientAorB': (a,b)=>{
        let f = ()=>{
            let count  = {}
            for (let dice of shaker) { if (dice.name == a || dice.name == b) { return true} }
            return false
        }
        f.text = 'Contains '+a+' or '+b
        return f
    },

    'high-low<X': (x)=>{
        let f = ()=>{
            let high = 0
            let low = 100
            for (let dice of shaker) { 
                if (dice.number > high) { high = dice.number}
                if (dice.number < low) { low = dice.number} 
            }
            return high-low <= x
        }
        f.text = 'Highest and lowest number not more than '+x+' apart'
        return f
    },

    'high-low>X': (x)=>{
        let f = ()=>{
            let high = 0
            let low = 100
            for (let dice of shaker) { 
                if (dice.number > high) { high = dice.number}
                if (dice.number < low) { low = dice.number} 
            }
            return high-low >= x
        }
        f.text = 'Highest and lowest number at least '+x+' apart'
        return f
    },

    'onlyEven': ()=>{
        let f = ()=>{
            for (let dice of shaker) { 
                if (dice.number%2 != 0) { return false } 
            }
            return true
        }
        f.text = 'Only even numbers'
        return f
    },

    'onlyOdd': ()=>{
        let f = ()=>{
            for (let dice of shaker) { 
                if (dice.number%2 != 1) { return false } 
            }
            return true
        }
        f.text = 'Only odd numbers'
        return f
    },

    'allDifferentNumbers': ()=>{
        let f = ()=>{
            let ns = []
            for (let dice of shaker) {
                if (ns.indexOf(dice.number) != -1) { return false }
                else {ns.push(dice.number)}
            }
            return true
        }
        f.text = 'All numbers are different'
        return f
    },

    'allDifferentIngredients': ()=>{
        let f = ()=>{
            let ns = []
            for (let dice of shaker) {
                if (ns.indexOf(dice.name) != -1) { return false }
                else {ns.push(dice.name)}
            }
            return true
        }
        f.text = 'All ingredients are different'
        return f
    },

    'mainIngredientA': (a)=>{
        let f = ()=>{
            let count = {}
            for (let dice of shaker) {
                if (dice.name in count) { count[dice.name] += 1 }
                else { count[dice.name] = 1 }
            }
            let n = 1
            let c
            for (let key in count) {
                if (count[key] > n) {
                    n = count[key]
                    c = key
                }
            }
            return a == c
        }
        f.text = 'Main ingredient is '+a
        return f
    },

    'mainIngredientAorB': (a,b)=>{
        let f = ()=>{
            let count = {}
            for (let dice of shaker) {
                if (dice.name in count) { count[dice.name] += 1 }
                else { count[dice.name] = 1 }
            }
            let n = 1
            let c
            for (let key in count) {
                if (count[key] > n) {
                    n = count[key]
                    c = key
                }
            }
            return a == c || b == c
        }
        f.text = 'Main ingredient is '+a+' or '+b
        return f
    },



    

}

let populateRules = ()=> {
    for (let x = 1; x< 7; x++) {
        rules.push(rulePatterns['sum<X'](x*3))
        rules.push(rulePatterns['sum>X'](x*3))
        rules.push(rulePatterns['no number lower than x'](x))
        rules.push(rulePatterns['no number higher than x'](x))
        // rules.push(rulePatterns['contains exactly one x'](x))
        rules.push(rulePatterns['contains at least one x'](x))
        rules.push(rulePatterns['contains at least two x'](x))
        rules.push(rulePatterns['contains maximally two x'](x))
        rules.push(rulePatterns['high-low<X'](x))
        rules.push(rulePatterns['high-low>X'](x))
    }

    for (let x = 0; x < ingredients.length; x++){
        let a = ingredients[x].name
        for (let y=x+1; y<ingredients.length; y++){
            let b = ingredients[y].name
            rules.push(rulePatterns['ingredientAorB'](a,b))
            // rules.push(rulePatterns['mainIngredientAorB'](a,b))
        }
        rules.push(rulePatterns['mainIngredientA'](a))
    }

    rules.push(rulePatterns['contains a pair']())
    rules.push(rulePatterns['contains x pairs'](2))
    // rules.push(rulePatterns['contains x pairs'](3))
    rules.push(rulePatterns['contains a tripple']())
    rules.push(rulePatterns['contains x tripples'](2))
    rules.push(rulePatterns['contains x tripples'](3))

    rules.push(rulePatterns['onlyEven']())
    rules.push(rulePatterns['onlyOdd']())
    rules.push(rulePatterns['allDifferentNumbers']())
    rules.push(rulePatterns['allDifferentIngredients']())


}

let ruleDivs = []

function newRules() {
    let DIV = document.getElementById('rules')
    
    for (let d of ruleDivs) {
        DIV.removeChild(d)
    }
    ruleDivs = []




    let numRules = glassSize
    let shakerTemp = shaker
    shaker = []
    for (let i = 0; i< glassSize; i++) {
        let d = ingredients[randint(ingredients.length)]
        d.roll()
        shaker.push(d)
    }

    let chosenRules = []
    let trueRules = []
    for (let r of rules) {
        if (r()) { trueRules.push(r)}
    }
    trueRules.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0))

    numRules = Math.min(trueRules.length, numRules)
    while(chosenRules.length <numRules) {
        // let r = trueRules[randint(trueRules.length)]
        let r = trueRules[chosenRules.length]
        if (r.text in chosenRules) { continue}
        else {
            chosenRules.push(r.text)

            let d = createDiv('rule')
            d.innerText = r.text
            d.f = r
            d.classList.toggle('true', false) /// needed?
            ruleDivs.push(d)
            DIV.appendChild(d)
        }
    }

    // Logging
    for (let dice of shaker) {
        console.log(dice.number)
    }
    shaker = []
    shaker = shakerTemp

}

function evalRules(){
    for (let r of ruleDivs){
        r.classList.toggle('true', r.f())
    }
    document.getElementById('rangeValue').classList.toggle('false', shaker.length != glassSize)
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


function randint(max) { return Math.floor(Math.random() * max); }


function evalDifficulty(runs) {
    let shakerTemp = shaker
    for (let r of rules) {
        r.count = 0
    }

    for (let run = 0; run<runs; run++) {
        shaker = []
        for (let i = 0; i< glassSize; i++) {
            let d = ingredients[randint(ingredients.length)]
            d.roll()
            shaker.push(d)
        }

        let trueRules = []
        for (let r of rules) {
            if (r()) { 
                trueRules.push(r)
                r.count += 1
            }
        }
    }

    rules.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0))

    for (let r of rules) {
        console.log(r.count, r.text)
    }
    shaker = shakerTemp
}


function weighted_random(items, weights) {
    var i;

    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random || i == items.length-1 )
            return items[i];
    
    
}