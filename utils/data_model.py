# Imports
from pydantic import BaseModel


# Defining Data Models
class SentenceRequest(BaseModel):
    sentence: str


class Text(BaseModel):
    text: str


class NeurocognitionRequest(BaseModel):
    profile: str
    symptoms: str

class NeuroResponse(BaseModel):
    response: str