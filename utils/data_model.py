# Imports
from pydantic import BaseModel
from typing import List

# Defining Data Models

class NeurocognitionRequest(BaseModel):
    text: str

class NeuroResponse(BaseModel):
    response: str

class DiagnosisRequest(BaseModel):
    symptoms: List[str]

class DiagnosisResponse(BaseModel):
    response: dict