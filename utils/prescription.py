import json
import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyDp3xiMDHVsYO7BKZh13-BvhnGK9aS4sFs"

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def prescription_data(demographics, disease):
    system_prompt = """
    % INSTRUCTIONS
    Imagine you are an Nutritionist who specializes in providing healthcare advice. Your primary responsibility is to make a personlaised treatment plan for the patient.
    ##
    Strictly, Don't mention that you are an Nutritionist.
    ##
    Information provided by you should be factual and medically correct.

    % BODY NAME
    {0}

    % DISEASE NANE
    {1}

    % YOUR TASK
    A person has demographics as mentioned in BODY and disease DISEASE. Create a treatment plan for the patient. The treatment plan should contain the following:
    1. Diet plan
    2. Exercise plan (if required if required else write "None")
    3. Precations to be taken (if required else write "None")

    % OUTPUT FORMAT
    Always respond ONLY in JSON format without new line characters and it should contain diet_plan mentioning what 5 food_to_eat and 5 food_to_avoid, 5 excercise_plan mentioning what excersies can be done at home and 5 precations that needs to be taken.
    ##
    Strictly, the response should not contain anything else than the JSON object. It should not contain quotes or declaration of the json.

    % OUTPUT EXAMPLE
    diet_plan: food_to_eat: [],food_to_avoi: [], exercise_plan: ,precautions: []
"""
    messages = system_prompt.format(demographics, disease)
    chat = model.start_chat(history=[])
    response = chat.send_message(messages)
    response = response.text
    print(response)
    json_object = json.loads(response)
    
    return json_object