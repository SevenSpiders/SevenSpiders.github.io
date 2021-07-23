


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