from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import base64

app = Flask(__name__)
CORS(app, resources={r"/submit-applicant": {"origins": "*"}})


def validate_applicant_data(data):
    # data validation logic
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


@app.route('/submit-applicant', methods=['POST'])
def submit_applicant():
    try:
        # Get the JSON data sent from the React frontend
        applicant_data = request.get_json()

        # Combine your workflow token and secret with a colon
        credentials = 'IQCMVOwEMVP2wUxeucySvP6F45DnLa24:815YifqYjXbqHlkBquVITxutjaB6mghF'

        # Base64 encode the combined string
        base64_credentials = base64.b64encode(credentials.encode()).decode()
        print(f"Base64 Credentials: {base64_credentials}")

        headers = {
            'Authorization': f'Basic {base64_credentials}'
        }

        # data validation
        validation_errors = validate_applicant_data(applicant_data)
        print(f"Validation Errors: {validation_errors}")

        if validation_errors:
            return jsonify({"error": validation_errors}), 400

        # Make a request to the Alloy API
        response = requests.post(
            'https://sandbox.alloy.co/v1/evaluations/', json=applicant_data, headers=headers)

        # Forward the Alloy API response to the frontend
        return jsonify(response.json()), response.status_code

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run()
