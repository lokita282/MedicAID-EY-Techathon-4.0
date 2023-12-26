import numpy as np
import json
from fastapi import FastAPI, Request, Body, UploadFile, File, APIRouter
from fastapi.middleware.cors import CORSMiddleware

# deployment imports
from fastapi_utilities import repeat_at, repeat_every

## function and data type imports from other modules
from utils.data_model import *
from utils.chatbot import *
from models.ddig import *

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


## cron job ##
@router.on_event("startup")
@repeat_every(seconds=20)
async def print_hello():
    print("hello")


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
