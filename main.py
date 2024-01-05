import os
import json
import shutil
import datetime
import textwrap
import numpy as np
import tensorflow as tf
from PIL import Image, ImageDraw, ImageFont
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications.densenet import preprocess_input
from fastapi import FastAPI, Request, Body, UploadFile, File, APIRouter
from fastapi.responses import FileResponse
from tensorflow.keras.applications.vgg16 import preprocess_input as preprocess_input_mri

## function and data type imports from other modules
from utils.prescription import *
from utils.general_chat import *
from utils.data_model import *
from utils.chatbot import *
from utils.helper import *
from models.ddig import *
from utils.gpt import *

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

# Load the model
ctmodel_path = 'models/assets/ct-scan/chest_CT_SCAN-DenseNet201.hdf5'
ctmodel = load_model(ctmodel_path)

mrimodel_path ='models/assets/MRI/VGG16-Brain-Tumor-MRI-3.h5'
mrimodel = load_model(mrimodel_path)

@app.get("/")
async def home():
    return {"message": "headless api base url, visit/docs for swagger documentation."}


@app.post("/chatbot")
async def notgpt(request: ChatbotRequest):
    prompt = request.text
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
async def predict_ct(request: ScanRequest):
    save_image(request.image)

    img = image.load_img("image.png", target_size=(460, 460))
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
    os.remove('image.png')

    return response

@app.post("/predict-mri")
async def predict_mri(request: ScanRequest):
    save_image(request.image)

    img = image.load_img("image.png", target_size=(460, 460))
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
    os.remove('image.png')

    return response

@app.post("/diff-diagnosis")
async def gemi(request:DifferentialDiagnosisRequest):
    demographics = request.demographics
    symptoms = request.symptoms
    chatbot_response = chatbot(demographics, symptoms)
    return chatbot_response 

@app.post("/generate-prescription-data")
async def generate_prescription_data(request:PrescriptionRequest):
    demographics = request.demographics
    disease = request.disease
    chatbot_response = prescription_data(demographics, disease)
    # return PrescriptionResponse(response=chatbot_response)
    return chatbot_response


@app.post("/generate-prescription")
async def generate_prescription(request:PrescriptionReportRequest):
    
    img = Image.open('models/assets/template.png')
    I1 = ImageDraw.Draw(img)
    details_font = ImageFont.truetype("arial.ttf", 65)
    doctor_font = ImageFont.truetype("fonts/PlayfairDisplay-Black.ttf", 130)

    name = request.name
    date = datetime.datetime.now().strftime("%d/%m/%Y")
    age = str(request.age)
    gender = request.gender
    weight = request.weight

    doctor_name = request.doctor_name
    medicine = request.medicine

    diet_plan = request.diet_plan
    exercise_plan = request.exercise_plan
    precautions = request.precautions
    medicine = request.medicine

    food_to_eat = diet_plan['food_to_eat']
    food_to_avoid = diet_plan['food_to_avoid']

    def draw_text(text, position, font, color=(255, 255, 255), max_width=125):
        lines = textwrap.wrap(text, width=max_width)
        y_text = position[1]
        for line in lines:
            width, height = font.getsize(line)
            I1.text((position[0], y_text), line, font=font, fill=color)
            y_text += height

    # doctor details
    I1.text((161, 340), doctor_name, font=doctor_font, fill=(48,80,107))

    # patient details
    I1.text((656, 695), name, font=details_font, fill=(48,80,107))
    I1.text((1763, 695), date, font=details_font, fill=(48,80,107))
    I1.text((380, 830), age, font=details_font, fill=(48,80,107))
    I1.text((1067, 830), gender, font=details_font, fill=(48,80,107))
    I1.text((1772, 830), weight, font=details_font, fill=(48,80,107))

    title_font = ImageFont.truetype("fonts/PlayfairDisplay-Black.ttf", 80)
    text_font = ImageFont.truetype("fonts/PlayfairDisplay-Black.ttf", 48)
    
    #medicine
    I1.text((200 ,1000 ), "Medicine:", (48,80,107), font=title_font)
    draw_text(medicine, (200 ,1140 ), text_font, color=(48,80,107), max_width=90)

    #food_to_eat
    diet_plan_list = food_to_eat
    I1.text((200 ,1500 ), "Food to eat:", (48,80,107), font=title_font)
    for i in range(len(diet_plan_list)):
        draw_text(diet_plan_list[i], (200 ,1640 + 60*i), text_font, color=(48,80,107), max_width=40)

    #food_to_avoid
    diet_plan_list = food_to_avoid
    I1.text((1300 ,1500 ), "Food to avoid:", (48,80,107), font=title_font)
    for i in range(len(diet_plan_list)):
        draw_text(diet_plan_list[i], (1300 ,1640 + 60*i), text_font, color=(48,80,107), max_width=40)

    #exercise_plan
    I1.text((200 ,2100 ), "Exercise plan:", (48,80,107), font=title_font)
    diet_plan_list = exercise_plan
    if diet_plan_list == "No exercise plan required":
        I1.text((200 ,1500 ), "No exercise plan required", (48,80,107), font=text_font)
    else:
        for i in range(len(diet_plan_list)):
            draw_text(diet_plan_list[i], (200 ,2240 + 60*i), text_font, color=(48,80,107), max_width=40)

    #precautions
    I1.text((1300 ,2100 ), "Precautions:", (48,80,107), font=title_font)
    diet_plan_list = precautions
    if diet_plan_list == "No exercise plan required":
        I1.text((200 ,1500 ), "No exercise plan required", (48,80,107), font=text_font)
    else:
        for i in range(len(diet_plan_list)):
            draw_text(diet_plan_list[i], (1300 ,2240 + 60*i), text_font, color=(48,80,107), max_width=40)

    img.save('template.png')
    return FileResponse('template.png')