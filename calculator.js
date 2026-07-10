let display = document.querySelector("#display");

let result = false;
let first = true;
let a = "";
let b = "";
let op;

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(a, b, op){
    a = Number(a);
    b = Number(b);
    switch (op){
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
    }
    return;
}

function removeHighlight(event){
    document.querySelectorAll(".operator").forEach((element) => {
        element.classList.remove("highlight");
    });
}

document.querySelectorAll(".button.digit").forEach((element) => {
    element.addEventListener("click", (event) => {
        if (result && op === ""){
            a = "";
            result = false;
            first = true;
        }
        if (first && a.length < 7){
            a = a.concat(event.target.textContent);
            display.textContent = a;
        } else if (!first && b.length < 7) {
            b = b.concat(event.target.textContent);
            display.textContent = b;
        }
    });
});

document.querySelector("#clear").addEventListener("click", () => {
    a = "";
    b = "";
    op = "";
    display.textContent = "0";
    removeHighlight();
    first = true;
});

document.querySelectorAll(".button.operator").forEach((element) => {
    element.addEventListener("click", (event) => {
        op = event.target.textContent;
        switch(op){
            case "×":
                op = "*";
                break;
            case "÷":
                op = "/";
                break;
        }
        first = false;
        display.textContent = "0";
        removeHighlight();
        event.target.classList.add("highlight");
    })
});

document.querySelector("#equals").addEventListener("click", () => {
    if (a === "" || b === ""){
        return;
    } 
    if (op === "/" && Number(b) === 0){
        display.textContent = "ERR";
        document.querySelector("#clear").dispatchEvent("click");
        return;
    }
    a = operate(a, b, op);
    display.textContent = a;
    b = "";
    op = "";
    removeHighlight();
    result = true;
});