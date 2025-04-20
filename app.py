
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        expression = data.get('expression', '')
        

        expr = expression.replace("×", "*").replace("÷", "/").replace("−", "-")
        result = str(eval(expr))
        
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'result': 'Error'})

@app.route('/convert', methods=['POST'])
def convert():
    try:
        data = request.json
        value = data.get('value', '')
        conversion_type = data.get('type', '')
        

        num = int(eval(value.replace("×", "*").replace("÷", "/").replace("−", "-")))
        
        if conversion_type == "Bin":
            result = bin(num)[2:]
        elif conversion_type == "Oct":
            result = oct(num)[2:]
        elif conversion_type == "Hex":
            result = hex(num)[2:].upper()
        elif conversion_type == "Dec":
            result = str(num)
        else:
            result = "Invalid conversion"
            
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'result': 'Error'})

if __name__ == '__main__':
    app.run(debug=True)