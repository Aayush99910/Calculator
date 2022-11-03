const input = document.querySelector("#input");
let del = false;

function operation (equation, operator) {
    let firstNumber = '';
    let secondNumber = '';
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === operator) {
            secondNumber = equation.slice(i + 1);
            break;
        }
        else {
            firstNumber += equation[i];
        }
    }

    if (operator === "+") {
        return (Number(firstNumber) + Number(secondNumber));
    }else if (operator === "-") {
        return (Number(firstNumber) - Number(secondNumber));
    }else if (operator === "*") {
        return (Number(firstNumber) * Number(secondNumber));
    }else if (operator === "/") {
        return (Number(firstNumber) / Number(secondNumber));
    }
}


function runOperation() {
    const finalOutput = document.querySelector("#final-output");
    let equation = input.innerText;
    finalOutput.textContent = equation;
    let lastItem = equation.length - 1;
    let newEquation = equation.slice(0, lastItem);

    if (newEquation.includes("+")) {
        add(newEquation);
    }else if (newEquation.includes("-")) {
        subtract(newEquation);
    }else if (newEquation.includes("*")) {
        multiply(newEquation);
    }else if (newEquation.includes("/")) {
        divide(newEquation);
    }
}

function add (equation) {
    const result = operation(equation, '+');
    input.innerText = result;
}


function subtract (equation) {
    const result = operation(equation, "-");
    input.innerText = result;
}


function multiply (equation) {
    const result = operation(equation, "*");
    input.innerText = result;
}


function divide (equation) {
    const result = operation(equation, "/");
    input.innerText = result;
}

function render(item) {
    if (input.innerText) {
        input.innerText += item;
    }else {
        input.textContent = item;
    }
} 

function removeItem() {
    let equation = input.innerText;
    let lastIndex = equation.length - 1;
    let newEquation = equation.slice(0, lastIndex);
    input.innerText = " ";
    render(newEquation);
    del = false;
}

const clearContent = () => {
    const finalOutput = document.querySelector("#final-output");
    finalOutput.innerText = " ";
    input.innerText = " ";
}


const btns = document.querySelectorAll("button");
const btnsArray = Array.from(btns);
btnsArray.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.innerText.toLowerCase() === "clear" || e.target.innerText.toLowerCase() === "delete") {
            return // skips if the button are clear and delete
        } else {
            render(e.target.innerText);
        }
    });
});


const equalBtn = document.querySelector("#equal");
equalBtn.addEventListener("click", runOperation);

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearContent);

const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", () => {
    del = true;
    removeItem();
});