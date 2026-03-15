// ===============
// 1. Получаем элементы из HTML
// ===============

//getElementById -> ДИНАМИЧЕСКИЙ ЭЛЕМЕНТ (HTML элемент)
//querySelector(All) -> СТАТИЧЕСКИЙ ЭЛЕМЕНТ (NodeList)

// Экран
const display = document.getElementById("display"); 

// Все кнопки с цифрами
const numberButtons = document.querySelectorAll("[data-number]");

// Кнопки операций
const operatorButtons = document.querySelectorAll("[data-op]")

// Кнопка очистки
const clearButton = document.querySelector(".clear");

// Кнопка равно
const equalButton = document.querySelector(".equal");

// ===============
// 2. Состояние калькулятора
// ===============

// const - переменная с постоянным значением, например, объект
// let - переменная с динамическим значением, например, число

// Текущее вводимое число
let currentNumber = ""

// Предыдущее число
let previousNumber = ""

// Выбранная операция
let operator = null

// ===============
// 3. Функция обновления экрана
// ===============

function updateDisplay(value) {
    if (value === "") {
        display.textContent = "0"
    }
    else{
        display.textContent = value
    }
}

// ===============
// 4. Обработка нажатия на цифры
// ===============

numberButtons.forEach(button => {
    // добавляем обработчик клика
    button.addEventListener("click", () => {
        // получаем число из data-атрибута
        const number = button.dataset.number

        // добавляем цифру к текущему числу
        currentNumber += number

        // обновляем экран
        updateDisplay(currentNumber)
    })
})

// ===============
// 5. Обработка нажатия на операции
// ===============

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        // если ввод пустой, ничего не делаем
        if(currentNumber === "") return

        // сохраняем операцию
        operator = button.dataset.op

        // переносим число в previous
        previousNumber = currentNumber

        // очищаем текущий ввод
        currentNumber = ""
    })
})

// ===============
// 6. Функция вычисления
// ===============

function calculate() {
    // преобразуем строки в числа
    const a = Number(previousNumber)
    const b = Number(currentNumber)

    let result = 0

    // выбираем операцию
    if (operator === "+"){
        result = a + b
    }

    if (operator === "-"){
        result = a - b
    }

    if (operator === "*"){
        result = a * b
    }

    if (operator === "/"){
        result = a / b
    }

    return result
}

// ===============
// 7. Кнопка "="
// ===============

equalButton.addEventListener("click", () => {
    // если данных нет, ничего не делаем
    if (currentNumber === "" || previousNumber === "") return

    // вызываем вычисление
    const result = calculate()

    // показываем результат
    updateDisplay(result)

    // результат становится новым currentNumber
    currentNumber = String(result)

    // очищаем состояние
    previousNumber = ""
    operator = null
})

// ===============
// 8. Кнопка Очистки
// ===============

clearButton.addEventListener("click", () => {
    // сбрасываем все данные
    currentNumber = ""
    previousNumber = ""
    operator = null
    
    // обновляем экран
    updateDisplay("")
})


