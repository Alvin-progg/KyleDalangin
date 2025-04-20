
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calc-btn');
    const closeBtn = document.getElementById('closeBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    
    let expression = '';
    let isDragging = false;
    let offsetX, offsetY;
    let isMinimized = false;
    let originalHeight;
    

    const topbar = document.querySelector('.topbar');
    const calculator = document.querySelector('.calculator-container');
    
    topbar.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - calculator.getBoundingClientRect().left;
        offsetY = e.clientY - calculator.getBoundingClientRect().top;
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            calculator.style.position = 'absolute';
            calculator.style.left = x + 'px';
            calculator.style.top = y + 'px';
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    

    closeBtn.addEventListener('click', function() {
        calculator.style.display = 'none';
    });
    
    minimizeBtn.addEventListener('click', function() {
        if (!isMinimized) {
            originalHeight = calculator.offsetHeight;
            calculator.style.height = '25px';
            document.querySelector('.display').style.display = 'none';
            document.querySelector('.btn-frame').style.display = 'none';
            isMinimized = true;
        } else {
            calculator.style.height = originalHeight + 'px';
            document.querySelector('.display').style.display = 'flex';
            document.querySelector('.btn-frame').style.display = 'block';
            isMinimized = false;
        }
    });
    

    buttons.forEach(button => {
        if (!button.classList.contains('disabled')) {
            button.addEventListener('click', function() {
                const value = button.textContent;
                
                if (value === 'C') {
                    expression = '';
                    display.textContent = '';
                }
                else if (value === '=') {
                    calculateResult();
                }
                else if (['Bin', 'Oct', 'Hex', 'Dec'].includes(value)) {
                    convertNumber(value);
                }
                else {
                    expression += value;
                    display.textContent = expression;
                }
            });
        }
    });
    

    function calculateResult() {
        if (expression) {
            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression: expression }),
            })
            .then(response => response.json())
            .then(data => {
                expression = data.result;
                display.textContent = expression;
            })
            .catch(error => {
                console.error('Error:', error);
                expression = 'Error';
                display.textContent = expression;
            });
        }
    }
    

    function convertNumber(type) {
        if (expression) {
            fetch('/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    value: expression,
                    type: type 
                }),
            })
            .then(response => response.json())
            .then(data => {
                expression = data.result;
                display.textContent = expression;
            })
            .catch(error => {
                console.error('Error:', error);
                expression = 'Error';
                display.textContent = expression;
            });
        }
    }
});