let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")
let total = document.getElementById("total")
let count = 0;
let count2 = 0;

function increment(){
    count++;
    countEl.innerHTML = count;
    count2++
}

function save(){
    let previousEntry = count + " - "
    saveEl.textContent += previousEntry

    countEl.textContent = 0;
    count = 0

    total.textContent = "Total entries: " + count2
}

