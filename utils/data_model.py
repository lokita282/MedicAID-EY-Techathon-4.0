# Imports
from pydantic import BaseModel
from typing import List

# Defining Data Models

class DifferentialDiagnosisRequest(BaseModel):
    demographics: List[str]
    symptoms: List[str]

class DifferentialDiagnosisResponse(BaseModel):
    response: dict

class DiagnosisRequest(BaseModel):
    symptoms: List[str]

class DiagnosisResponse(BaseModel):
    response: dict

class ChatbotRequest(BaseModel):
    prompt: str

class ChatbotResponse(BaseModel):
    response: str

class PrescriptionRequest(BaseModel):
    demographics: List[str]
    disease: List[str]

class PrescriptionResponse(BaseModel):
    response: dict