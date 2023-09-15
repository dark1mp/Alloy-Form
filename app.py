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

        # Parse the JSON response from Alloy API
        response_data = response.json()
        print(f"API Response: {response_data}")

        # Check the response for the 'outcome' field and display appropriate messages
        outcome = response_data.get('summary', {}).get('outcome', '')

        if outcome == 'Approved':
            return jsonify({"message": "Success!"}), 200
        elif outcome == 'Manual Review':
            return jsonify({"message": "Thanks for submitting your application, we'll be in touch shortly"}), 200
        elif outcome == 'Deny':
            return jsonify({"message": "Sorry, your application was not successful"}), 200
        else:
            return jsonify({"message": "Unknown Response Outcome"}), 200

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run()
