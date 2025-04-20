# MiniCalc Web App

This is a web-based version of the MiniCalc calculator, using Python Flask as backend and HTML/CSS/JavaScript for the frontend.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, division
- Number system conversions: Decimal, Binary, Octal, Hexadecimal
- Draggable calculator interface
- Minimize and close functionality

## Setup Instructions

1. Make sure you have Python installed (3.6+ recommended)

2. Create a project folder structure:
```
mini-calc-web/
├── app.py
├── static/
│   ├── styles.css
│   └── script.js
└── templates/
    └── index.html
```

3. Install Flask:
```bash
pip install flask
```

4. Run the application:
```bash
python app.py
```

5. Open your browser and navigate to:
```
http://127.0.0.1:5000/
```

## Usage

- Use the calculator like any normal calculator
- Click and drag the top bar to move the calculator
- Minimize button reduces calculator to just the title bar
- Close button hides the calculator (refresh page to bring it back)
- Use Bin, Oct, Hex, and Dec buttons for number system conversions

## Notes

- All calculations are processed on the backend for security
- The calculator maintains the look and feel of the original desktop application
- Responsive design works on both desktop and mobile devices
