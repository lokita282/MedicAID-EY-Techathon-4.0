import os
import json
import shutil
import numpy as np
from PIL import Image
import tensorflow as tf
from fastapi import FastAPI, Request, Body, UploadFile, File, APIRouter
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications.densenet import preprocess_input
from tensorflow.keras.applications.vgg16 import preprocess_input as preprocess_input_mri
from tensorflow.keras.models import load_model

# deployment imports
from fastapi_utilities import repeat_at, repeat_every

## function and data type imports from other modules
from utils.data_model import *
from utils.chatbot import *
from models.ddig import *
# from models.ct_scan import *

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

# pneumonia_path = 'models/assets/PNEUMONIA/pneumonia_model.h5'
# pneumonia_model = load_model(pneumonia_path)

# cancerModel = load_model("models/assets/LUNG-CANCER/lung cancer_final_99.h5")
# cancerModel.compile(optimizer='rmsprop',
#                     loss=tf.keras.losses.SparseCategoricalCrossentropy(
#                         from_logits=True),
#                     metrics=['accuracy'])

@app.get("/")
async def home():
    return {"message": "headless api base url, visit /docs for swagger documentation."}


@app.post("/chatbot")
async def chatbot(request: NeurocognitionRequest):
    query = request.text
    result = await chat(query)
    return NeuroResponse(response=result)


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