from flask import Flask, request, jsonify

app = Flask(__name__)

# POST Endpoint
@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.json.get('data', [])
        
        if not isinstance(data, list):
            return jsonify({"is_success": False, "message": "Invalid input format"}), 400

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lowercase_alphabets = [item for item in alphabets if item.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

        response = {
            "is_success": True,
            "user_id": "john_doe_17091999",  # Replace with your full_name and DOB
            "email": "john@xyz.com",         # Replace with the actual email ID
            "roll_number": "ABCD123",        # Replace with the actual roll number
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

# GET Endpoint
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
