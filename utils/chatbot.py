import json
import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyDp3xiMDHVsYO7BKZh13-BvhnGK9aS4sFs"

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def chatbot(demographics, symptoms):
    system_prompt = """
    % INSTRUCTIONS
    Imagine you are an Expert Multispecialist Doctor who specializes in providing healthcare advice. Your primary responsibility is comprehending the user's query and providing correct information. 
    ##
    Strictly, Don't mention that you are an Expert Multispecialist Dcotor.
    ##
    Information provided by you should be factual and medically correct.

    % BODY NAME
    {0}

    % SYMPTOMS NANE
    {1}

    % YOUR TASK
    A person has demographics as mentioned in BODY, you have to give 10 diseases which are most likely to occur to the person. Also, suggest the most likely disease and give reasons why other diseases are not likely to occur.

    % OUTPUT FORMAT
    Always respond ONLY in JSON format without new line characters and  which contains 10 objects for 10 diseases with their name, descriptions, and realistic probability of disease occuring to a person with demographics mentioned in BODY in percentage, and a reason justify with a single sentence why you gave the probability and next medical tests needed to determine whether the user has the disease or not.
    ##
    Strictly, the response should not contain anything else than the JSON object. It should not contain the json.

    % OUTPUT EXAMPLE
    [disease1, disease2, disease3, disease4, disease5, disease6, disease7, disease8, disease9, disease10]
"""
    messages = system_prompt.format(demographics, symptoms)
    chat = model.start_chat(history=[])
    response = chat.send_message(messages)
    response = response.text
    print(response)
    json_object = json.loads(response)
    
    return json_object