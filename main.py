import numpy as np
import json
from fastapi import FastAPI, Request, Body, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

## function and data type imports from other modules
from utils.data_model import *
from utils.chatbot import *

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"message":"headless api base url, visit /docs for swagger documentation."}


@app.post("/neurocognition")
async def neurocognition(request: NeurocognitionRequest):
    profile = request.profile
    symptoms = request.symptoms
    result = await neuro(profile, symptoms)
    return NeuroResponse(prediction=result)

