window.onload = function() {    
    main()
    document.getElementById('shake').onclick = shake
    populateRules()
    document.getElementById('newRules').onclick = newRules
    document.getElementById('evalRules').onclick = evalRules
    document.getElementById('clearShaker').onclick = clearShaker
    document.getElementById('range').oninput = sliderInput
    evalDifficulty(1000)
    newRules()
}




let main = ()=>{

    ingredientsDiv = document.getElementsByClassName("ingredients")[0]
    shakerDiv = document.getElementsByClassName("shaker")[0]


    for (let i of ingredients) {
        let d = i.createDiv()
        ingredientsDiv.appendChild(d)

    }
}




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
