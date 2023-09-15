from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/submit-applicant": {"origins": "*"}})


@app.route('/submit-applicant', methods=['POST'])
def submit_applicant():
    try:
        # Get the JSON data sent from the React frontend
        applicant_data = request.get_json()

        # Perform data validation here
        validation_errors = validate_applicant_data(applicant_data)

        if validation_errors:
            return jsonify({"error": validation_errors}), 400

        # Make a request to the Alloy API
        response = requests.post('https://sandbox.alloy.co/v1/evaluations/', json=applicant_data, headers={
            'Content-Type': 'application/json',
            # Add any required headers or authentication tokens here
        })

        # Forward the Alloy API response to the frontend
        return jsonify(response.json()), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def validate_applicant_data(data):
    # Implement your data validation logic here
    errors = []

    if not data.get("firstName"):
        errors.append("First Name is required")

    if not data.get("lastName"):
        errors.append("Last Name is required")

    if not data.get("email"):
        errors.append("Email is required")

    if not data.get("addressLine1"):
        errors.append("Address Line 1 is required")

    if not data.get("city"):
        errors.append("City is required")

    if not data.get("state"):
        errors.append("State is required")

    if not data.get("zipCode"):
        errors.append("Zip/Postal Code is required")

    if not data.get("country"):
        errors.append("Country is required")

    if not data.get("ssn"):
        errors.append("SSN is required")

    if not data.get("dob"):
        errors.append("Date of Birth is required")

    return errors


if __name__ == '__main__':
    app.run()
