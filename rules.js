


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
            return s > x
        }
        f.text = 'Sum higher than '+x
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

    'asManyAasB': (a,b)=>{
        let f = ()=>{
            let count = {}
            count[a] = 0
            count[b] = 0
            for (let dice of shaker) {
                if (dice.name == a || dice.name == b) { count[dice.name] += 1 }
            }
            return count[a] == count[b]
        }
        f.text = 'As much '+a+' as '+b
        return f
    },

    'asManyXasY': (x,y)=>{
        let f = ()=>{
            let count = {x: 0, y: 0}
            for (let dice of shaker) {
                if (dice.number == x || dice.number == y) { count[dice.number] += 1 }
            }
            return count[x] == count[y]
        }
        f.text = 'As many '+x+'s as '+y+'s'
        return f
    },



    

}

let bonusPatterns = {
    '+1forX' : (x)=>{
        let f = ()=>{
            let score = 0
            for (let dice of shaker) {
                if (dice.number == x) { score += 1}
            }
            return score
        }
        f.text = '+1 for each '+x
        return f
    },

    '+1forUniqueNumbers' : ()=>{
        let f = ()=>{
            let count = []
            let score = 0
            for (let dice of shaker) {
                if (count.indexOf(dice.number) == -1 ) { 
                    score += 1
                    count.push(dice.number)
                }
            }
            return score
        }
        f.text = '+1 for every unique number'
        return f
    },

    '+1forUniqueIngredients' : ()=>{
        let f = ()=>{
            let count = []
            let score = 0
            for (let dice of shaker) {
                if (count.indexOf(dice.name) == -1 ) { 
                    score += 1
                    count.push(dice.name)
                }
            }
            return score
        }
        f.text = '+1 for every unique ingredient'
        return f
    },

    '+1forHighSum' : ()=>{
        let f = ()=>{
            let score = 0
            for (let dice of shaker) { score += dice.number }
            return parseInt(score/5.0)
        }
        f.text = '+1 for every 5 points of the sum'
        return f
    },

    '+1forLowSum' : ()=>{
        let f = ()=>{
            let score = 0
            for (let dice of shaker) { score += dice.number }
            score = score >= 15 ? 0 : parseInt((15-score)/3.0)
            return score
        }
        f.text = '+1 for every 3 points lower than 15'
        return f
    },
}

let populateRules = ()=> {
    for (let x = 1; x< 7; x++) {
        rules.push(rulePatterns['no number lower than x'](x))
        rules.push(rulePatterns['no number higher than x'](x))
        // rules.push(rulePatterns['contains exactly one x'](x))
        rules.push(rulePatterns['contains at least one x'](x))
        rules.push(rulePatterns['contains at least two x'](x))
        rules.push(rulePatterns['contains maximally two x'](x))
        rules.push(rulePatterns['high-low<X'](x))
        rules.push(rulePatterns['high-low>X'](x))
        boni.push(bonusPatterns['+1forX'](x))
        for (let y = x+1; y<7;y++) {
            rules.push(rulePatterns['asManyXasY'](x,y))
            
        }
    }

    for (let x = 0; x< 36; x++) {
        rules.push(rulePatterns['sum<X'](x))
        rules.push(rulePatterns['sum>X'](x))
    }

    for (let x = 0; x < ingredients.length; x++){
        let a = ingredients[x].name
        for (let y=x+1; y<ingredients.length; y++){
            let b = ingredients[y].name
            rules.push(rulePatterns['ingredientAorB'](a,b))
            rules.push(rulePatterns['asManyAasB'](a,b))
            // rules.push(rulePatterns['mainIngredientAorB'](a,b))
        }
        rules.push(rulePatterns['mainIngredientA'](a))
    }

    rules.push(rulePatterns['contains a pair']())
    rules.push(rulePatterns['contains x pairs'](2))
    // rules.push(rulePatterns['contains x pairs'](3))
    rules.push(rulePatterns['contains a tripple']())
    // rules.push(rulePatterns['contains x tripples'](2))
    // rules.push(rulePatterns['contains x tripples'](3))

    rules.push(rulePatterns['onlyEven']())
    rules.push(rulePatterns['onlyOdd']())
    rules.push(rulePatterns['allDifferentNumbers']())
    rules.push(rulePatterns['allDifferentIngredients']())


    boni.push(bonusPatterns['+1forUniqueIngredients']())
    boni.push(bonusPatterns['+1forUniqueNumbers']())
    boni.push(bonusPatterns['+1forHighSum']())
    boni.push(bonusPatterns['+1forLowSum']())


}


function newRules() {
    let DIV = document.getElementById('rules')
    
    for (let d of ruleDivs) { DIV.removeChild(d) }
    ruleDivs = []
    clearShaker()




    let numRules = 3
    let numBoni = 2
    let shakerTemp = shaker
    shaker = []
    for (let i = 0; i< glassSize; i++) {
        let d = ingredients[randint(ingredients.length)]
        d.roll()
        shaker.push(d)
    }

    let chosenRules = []
    let trueRules = []
    let weights = []
    for (let r of rules) {
        if (r()) { 
            trueRules.push(r)
            weights.push(Math.pow(1000-r.count,2))
        }
    }
    // trueRules.sort((a,b) => (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0))

    numRules = Math.min(trueRules.length, numRules)
    while(chosenRules.length <numRules) {
        // let r = trueRules[chosenRules.length]
        let r = weighted_random(trueRules, weights)
        if (r.text in chosenRules) { continue}
        else {
            chosenRules.push(r.text)

            let d = createDiv('rule')
            d.innerText = r.text
            d.f = r
            // d.classList.toggle('true', false) /// needed?
            ruleDivs.push(d)
            DIV.appendChild(d)
        }
    }

    for (let i=0; i<numBoni;i++) {
        let b = boni[randint(boni.length)]

        let d = createDiv('bonus')
        d.innerText = b.text
        d.f = b

        let m = createDiv('multiplier')
        m.innerText = 'x0'
        d.appendChild(m)

        ruleDivs.push(d)
        DIV.appendChild(d)
    }

    // Logging
    for (let dice of shaker) {
        console.log(dice.number)
    }
    shaker = []
    shaker = shakerTemp

}

function evalRules(){
    let succeded = true
    let points = 0
    for (let r of ruleDivs){
        if (r.classList.contains('rule')){
            let b = r.f()
            r.classList.toggle('true', b)
            succeded = b && succeded
        }

        if (r.classList.contains('bonus')){
            let x = r.f()
            if (x>0){
                r.children[0].innerText = '+'+x
                r.className = 'bonus eval'
                points += x
            }
        }
        
    }
    succeded = succeded && glassSize == shaker.length
    points = succeded ? points + 10 : 0
    document.getElementById('score').innerText = points
    document.getElementById('rangeValue').classList.toggle('false', shaker.length != glassSize)
}
