

// GLOBALS

let ruleDivs = []
let rules = []
let boni = []
let shaker = []
let glassSize = 5





let createDiv = (c)=> { 
    let d = document.createElement('div')
    d.className = c
    return d
}

function randint(max) { return Math.floor(Math.random() * max); }


function weighted_random(items, weights) {
    var i;

    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random || i == items.length-1 )
            return items[i];
    
    
}





function nameGenerator() {
    let part1 = [
        'Cosmic',
        'Amazing',
        'Sparkling',
        'Burning',
        'Refreshing',
        'Fresh',
        'Icey',
        'Cool',
        'Warming',
        'Intoxicating',
        'Addictive',
        'Energy Rich'
    ]

    let part2 = [
        'Rasputin',
        'Molotov',
        'Blitz',
        'Tornado',
        'Ball',
        'Tonic',
        'Potion',
        'Rush',
        'Shot',
        'Sour',
    ]


    return 'the '+part1[randint(part1.length)]+ ' '+part2[randint(part2.length)]
}