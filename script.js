const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clearBtns = document.querySelectorAll(".clear-btn");
const display = document.getElementById("display");
const decimalBtn = document.getElementById("decimal");
const result = document.getElementById("result");
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
        operationPress(e.target.textContent);
    });
};

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.target.textContent);
    });
};

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        };
    };
};

function operationPress(op) {
    let localOperationMemory = display.value;

    if (op === '√' && MemoryNewNumber) {
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    } else if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        if (op === '-') {
            display.value = op;
            MemoryNewNumber = false;
        } else {
            display.value = MemoryCurrentNumber;
        }
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber = (MemoryCurrentNumber * 100000 + localOperationMemory * 100000) / 100000;
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber = (MemoryCurrentNumber * 100000 - localOperationMemory * 100000) / 100000;
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= +localOperationMemory;
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= +localOperationMemory;
        } else if (MemoryPendingOperation === '√') {
            MemoryCurrentNumber = Math.sqrt(+localOperationMemory);
            if (Number.isNaN(MemoryCurrentNumber)) {
                MemoryCurrentNumber = Math.sqrt(+(-localOperationMemory));
            };

        } else if (MemoryPendingOperation === '^') {
            MemoryCurrentNumber = Math.pow(+MemoryCurrentNumber, +localOperationMemory);
        } else {
            MemoryCurrentNumber = +localOperationMemory;
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    };
};

function decimal(argument) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};