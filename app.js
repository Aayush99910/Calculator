// grabbing the user input element a element which will show the equation
const input = document.querySelector("#input");
const finalOutput = document.querySelector("#final-output");
let del = false; // del variable


// This function takes in a string equation as parameter and 
// it seperates two number from the equation and does the desired
// operation. For example it takes in "9 + 1". It separates and assigns
// firstNumber to 9 and secondNumber to 1. At last it checks which 
// operation to perform.It converts the string into number 
// and returns the end product. Here that is 10.
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

// This function first removes the "=" sign from the equation and passes
// the arguments to needed function and at last it returns the end product. 
function runOperation(equation) {
    let newEquation;

    if (equation.includes("=")) {
        let lastItem = equation.length - 1;
        newEquation = equation.slice(0, lastItem);
    }else {
        newEquation = equation;
    }

    if (newEquation.includes("+")) {
        return add(newEquation);
    }else if (newEquation.includes("-")) {
        return subtract(newEquation);
    }else if (newEquation.includes("*")) {
        return multiply(newEquation);
    }else if (newEquation.includes("/")) {
        return divide(newEquation);
    }
}


// adds two numbers
// this function takes in a equation and calls the operation function.
// At last it returns the end product.
function add (equation) {
    return operation(equation, '+');
}


// subtracts two numbers
// this function takes in a equation and calls the operation function.
// At last it returns the end product.
function subtract (equation) {
    return operation(equation, "-");
}


// multiplies two numbers
// this function takes in a equation and calls the operation function.
// At last it returns the end product.
function multiply (equation) {
    return operation(equation, "*");
}


// divides two numbers
// this function takes in a equation and calls the operation function.
// At last it returns the end product.
function divide (equation) {
    return operation(equation, "/");
}


// this function renders the item when user presses on one i.e a button.
function render(item) {
    if (input.innerText) {
        if (item === "*" || item === "+" || item === "/" || item === "-") {
            if ((input.innerText[input.innerText.length - 1] === "*" && (item === "*" || item === "-" || item ==="+" || item === "/" )) 
                || (input.innerText[input.innerText.length - 1] === "+" && (item === "+" || item === "*" || item === "-" || item ==="/"))
                || (input.innerText[input.innerText.length - 1] === "-" && (item === "-" || item === "*" || item === "/" || item ==="+")) 
                || (input.innerText[input.innerText.length - 1] === "/" && (item === "/" || item === "*" || item === "-" || item ==="+"))) {
                return;
            }else{
                input.textContent += ` ${item} `;
            }
        }else {
            input.textContent += item;
        }
    }else {
        input.textContent = item;
    }
} 


// deletes a item from the string when user clicks the delete Button.
function removeItem() {
    let equation = input.innerText;
    let lastIndex = equation.length - 1;
    let newEquation = equation.slice(0, lastIndex);
    input.innerText = " ";
    render(newEquation);
    del = false;
}

// I took this function from Ujwal Pansari aka God D. Ussop so for this function 
// credit goes to him || HIS GITHUB PROFILE https://github.com/Captain-Usopp
function handleEquation(equation) {

	equation = equation.split(" ");
	const operators = ['/', '*', '%', '+', '-'];
	let firstNumber;
	let secondNumber;
	let operator;
	let operatorIndex;
	let result;

	/*  
		1. Perform calculations as per BODMAS Method
		2. For that use operators array
		3. after calculation of 1st numbers replace them with result
		4. use splice method

	*/
	for (var i = 0; i < operators.length; i++) {
		while (equation.includes(operators[i])) {
			operatorIndex = equation.findIndex(item => item === operators[i]);
			firstNumber = equation[operatorIndex-1];
			operator = equation[operatorIndex];
			secondNumber = equation[operatorIndex+1];
            let equationString = `${firstNumber}${operator}${secondNumber}`;
			result = runOperation(equationString);
			equation.splice(operatorIndex - 1, 3, result);
		}
	}

	return result;
}

// clears the content and everthing goes to blank
const clearContent = () => {
    finalOutput.innerText = " ";
    input.innerText = " ";
}


// event listener for the buttons in the calculator
// whenever a button is clicked this even fires up and the item
// is rendered
const btns = document.querySelectorAll("button");
const btnsArray = Array.from(btns);
btnsArray.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.innerText.toLowerCase() === "ac" || e.target.innerText.toLowerCase() === "delete") {
            return // skips if the button are clear and delete
        } else {
            render(e.target.innerText);
        }
    });
});



// event listener for equal button
// when this button is clicked it calls the handleEquation function
// and at the end displays the end product to the user
const equalBtn = document.querySelector("#equal");
equalBtn.addEventListener("click", () => {
    const initialText = input.innerText;
    finalOutput.textContent = initialText;
    input.textContent = handleEquation(input.innerText);
});


// event listener for clear button
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearContent);


// event listener for delete button
const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", () => {
    del = true;
    removeItem();
});


// keyboard support
document.addEventListener("keypress", (e) => {
    const array = [
        "+", "-", "/", "*", "0", "1", "2", "3", "4",
        "5", "6", "7", "8", "9", "Enter", "c", "C", "D",
        "d"
    ];


    function checkIfInArray() {
        for (let i = 0; i < array.length; i++) {
            if (e.key === array[i]) {
                return true;
            }
        }
        return false;
    }
    
    if (checkIfInArray()) {
        if (e.key.toLowerCase() === "enter") {
            const initialText = input.innerText;
            finalOutput.textContent = initialText;
            input.textContent = handleEquation(input.innerText);
        }else if (e.key.toLowerCase() === "c") {
            clearContent();
        }else if (e.key.toLowerCase() === "d") {
            del = true;
            removeItem();
        }else{
            render(e.key);
        }
    }
});