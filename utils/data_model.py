# Imports
from pydantic import BaseModel
from typing import List

# Defining Data Models

class ScanRequest(BaseModel):
    image: str

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
    text: str

class ChatbotResponse(BaseModel):
    response: str

class PrescriptionRequest(BaseModel):
    name: str
    age: int
    gender: str
    weight: str
    demographics: List[str]
    disease: List[str]

class PrescriptionResponse(BaseModel):
    response: dict

class PrescriptionReportRequest(BaseModel):
    name: str
    age: int
    gender: str
    weight: str
    doctor_name: str
    diet_plan: dict
    exercise_plan: List[str]
    precautions: List[str]
    medicine: str