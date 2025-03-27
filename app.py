from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and scalers
try:
    model = pickle.load(open('./model.pkl', 'rb'))
    sc = pickle.load(open('./standscaler.pkl', 'rb'))
    mx = pickle.load(open('./minmaxscaler.pkl', 'rb'))
except FileNotFoundError as e:
    print(f" Error: {e}. Make sure model and scaler files are present.")
    exit()
except Exception as e:
    print(f" An unexpected error occurred: {e}")
    exit()

# Crop Dictionary
crop_dict = {
    1: {"name": "Rice", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/rice.jpg?updatedAt=1743067640518"},
    2: {"name": "Maize", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/maize.jpg?updatedAt=1743067634479"},
    3: {"name": "Jute", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/jute.jpg?updatedAt=1743067628781"},
    4: {"name": "Cotton", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/cotton.jpg?updatedAt=1743067629429"},
    5: {"name": "Coconut", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/coconut.jpg?updatedAt=1743067645258"},
    6: {"name": "Papaya", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/papaya.jpg?updatedAt=1743068191793"},
    7: {"name": "Orange", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/orange.jpg?updatedAt=1743067645590"},
    8: {"name": "Apple", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/apple.jpg?updatedAt=1743067636564"},
    9: {"name": "Muskmelon", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/muskmelon.jpg?updatedAt=1743068259477"},
    10: {"name": "Watermelon", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/watermelon.jpg?updatedAt=1743067642928"},
    11: {"name": "Grapes", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/grapes.jpg?updatedAt=1743068358624"},
    12: {"name": "Mango", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/mango.jpg?updatedAt=1743067635232"},
    13: {"name": "Banana", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/banana.jpg?updatedAt=1743067628336"},
    14: {"name": "Pomegranate", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/Pomegranate.jpg?updatedAt=1743067640232"},
    15: {"name": "Lentil", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/lentils.jpg?updatedAt=1743067631051"},
    16: {"name": "Blackgram", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/blackgram.jpg?updatedAt=1743067629702"},
    17: {"name": "Mungbean", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/munggram.jpg?updatedAt=1743067654488"},
    18: {"name": "Mothbeans", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/moth%20beans.jpg?updatedAt=1743067653408"},
    19: {"name": "Pigeonpeas", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/Pigeonpeas.jpg?updatedAt=1743068460685"},
    20: {"name": "Kidneybeans", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/Kidneybeans.jpg?updatedAt=1743067628986"},
    21: {"name": "Chickpea", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/chickpeas.jpg?updatedAt=1743068569806"},
    22: {"name": "Coffee", "image": "https://ik.imagekit.io/yci3efhum/soil_pred_crops_picture/coffee.jpg?updatedAt=1743067628992"}
}


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        
        # Extract input values
        feature_list = np.array([[ 
            float(data["nitrogen"]), 
            float(data["phosphorus"]), 
            float(data["potassium"]), 
            float(data["temperature"]), 
            float(data["humidity"]), 
            float(data["ph"]), 
            float(data["rainfall"])
        ]])

        # Apply scaling
        scaled_features = sc.transform(mx.transform(feature_list))

        # Make prediction
        prediction = model.predict(scaled_features)

        # Return the crop name and image
        crop = crop_dict.get(prediction[0], {"name": "Unknown Crop", "image": ""})
        return jsonify(crop)

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "API is running"})

if __name__ == "__main__":
    print("Starting Crop Recommendation API...")
    print("API will be available at http://127.0.0.1:5000")
    app.run(debug=True)

