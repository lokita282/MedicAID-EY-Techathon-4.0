import os
import json
import shutil
import numpy as np
from PIL import Image
import tensorflow as tf
from PIL import ImageDraw
from PIL import ImageFont
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications.densenet import preprocess_input
from fastapi import FastAPI, Request, Body, UploadFile, File, APIRouter
from tensorflow.keras.applications.vgg16 import preprocess_input as preprocess_input_mri

## function and data type imports from other modules
from utils.general_chat import *
from utils.data_model import *
from utils.chatbot import *
from models.ddig import *
from utils.gpt import *
from utils.prescription import *

app = FastAPI()
router = APIRouter()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NumpyInt64Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.int64):
            return int(obj)
        return super().default(obj)

# Load the model
ctmodel_path = 'models/assets/ct-scan/chest_CT_SCAN-DenseNet201.hdf5'
ctmodel = load_model(ctmodel_path)

mrimodel_path ='models/assets/MRI/VGG16-Brain-Tumor-MRI-3.h5'
mrimodel = load_model(mrimodel_path)

@app.get("/")
async def home():
    return {"message": "headless api base url, visit/docs for swagger documentation."}


@app.post("/chat-bot")
async def notgpt(request: ChatbotRequest):
    prompt = request.prompt
    result = querybot(prompt)
    return ChatbotResponse(response=result)


@app.post("/diagnosis")
async def diagnosis(request: DiagnosisRequest):
    psymptoms = request.symptoms
    tailing_zeros = 17 - len(psymptoms)
    # Add trailing zeros
    psymptoms = psymptoms + [0] * tailing_zeros
    result = predd(psymptoms)
    return DiagnosisResponse(response=result)


@app.post("/ct-scan")
async def predict_ct(img: UploadFile = File(...)):
    # Load and preprocess the image
    img_path = f"{img.filename}"  # Save the file temporarily
    with open(img.filename, "wb") as buffer:
        shutil.copyfileobj(img.file, buffer)

    img = image.load_img(img.filename, target_size=(460, 460))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)

    predictions = ctmodel.predict(img)

    class_labels = ['Adenocarcinoma', 'Large.cell.carcinoma',
                    'Normal', 'Squamous.cell.carcinoma']
    predicted_class_index = np.argmax(predictions, axis=1)
    predicted_class_label = class_labels[predicted_class_index[0]]

    response = {
        'predicted_class': predicted_class_label,
        'probability': float(predictions[0][predicted_class_index[0]]) * 100
    }
    os.remove(img_path)

    return response

@app.post("/predict-mri")
async def predict_mri(img: UploadFile = File(...)):
    # Load and preprocess the image
    img_path = f"{img.filename}"  # Save the file temporarily
    with open(img.filename, "wb") as buffer:
        shutil.copyfileobj(img.file, buffer)

    img = image.load_img(img.filename, target_size=(460, 460))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input_mri(img)

    predictions = mrimodel.predict(img)

    class_labels = ['Pituitary', 'Notumor', 'Meningioma', 'Glioma']
    predicted_class_index = np.argmax(predictions, axis=1)
    predicted_class_label = class_labels[predicted_class_index[0]]

    response = {
        'predicted_class': predicted_class_label,
        'probability': float(predictions[0][predicted_class_index[0]]) * 100
    }
    os.remove(img_path)

    return response

@app.post("/diff-diagnosis")
async def gemi(request:DifferentialDiagnosisRequest):
    demographics = request.demographics
    symptoms = request.symptoms
    chatbot_response = chatbot(demographics, symptoms)
    return chatbot_response 

@app.post("/prescription")
async def prescription(request:PrescriptionRequest):
    demographics = request.demographics
    disease = request.disease
    chatbot_response = prescription_data(demographics, disease)
    if chatbot_response["diet_plan"] == "None":
        diet_plan = "No diet plan required"
    else:
        diet_plan = chatbot_response["diet_plan"]

    if chatbot_response["exercise_plan"] == "None":
        exercise_plan = "No exercise plan required"
    else:
        exercise_plan = chatbot_response["exercise_plan"]
    
    if chatbot_response["precautions"] == "None":
        precautions = "No precautions required"
    else:
        precautions = chatbot_response["precautions"]
    
    img = Image.open('assets/template.png')
    I1 = ImageDraw.Draw(img)
    details_font = ImageFont.truetype("arial.ttf", 65)

    # patient details
    I1.text((656, 695), name, font=details_font, fill=(255, 0, 0))
    I1.text((1763, 695), date, font=details_font, fill=(255, 0, 0))
    I1.text((367, 830), age, font=details_font, fill=(255, 0, 0))
    I1.text((1067, 830), gender, font=details_font, fill=(255, 0, 0))
    I1.text((1772, 830), weight, font=details_font, fill=(255, 0, 0))
    I1.text((552, 989), diagonsis, font=details_font, fill=(255, 0, 0))

    # diet plan
    _font = ImageFont.truetype("arial.ttf", 50)
    I1.text((200, 989), "Diet Plan", font=details_font, fill=(255, 0, 0))
    for i in range(len(diet_plan["food_to_eat"])):
        I1.text((200, 1300 + i*150), diet_plan["food_to_eat"][i], font=_font, fill=(255, 0, 0))

    img.save('template.png')
    # return chatbot_response 