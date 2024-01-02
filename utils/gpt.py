# Imports
import openai
import requests


# Configurations

######################## Type 1 ########################
# url = "https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions"
# headers = {
# 	"content-type": "application/json",
# 	"X-RapidAPI-Key": "9239df53a7msh095dafe3f618c2cp1bbea6jsn1ab7db754ec0",
# 	"X-RapidAPI-Host": "chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com"
# }
# openai.api_key = "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"

######################## Type 2 ########################
url = "https://open-ai21.p.rapidapi.com/conversationgpt"
headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "9239df53a7msh095dafe3f618c2cp1bbea6jsn1ab7db754ec0",
	"X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
}


# Chatbot functions
async def chat(demographics, symptoms, **kwargs):
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
    A person has demographics as mentioned in BODY, you have to give 10 diseases which are most likely to occur to the person.  Also, suggest the most likely disease and give reasons why other diseases are not likely to occur.

    % OUTPUT FORMAT
    a JSON object which contains 10 objects for 10 diseases with their name, descriptions, and probability in percentage of disease occurrence to user, and a reason justify with a single sentence why you gave the probability
"""

    messages = [{"role": "system", "content": system_prompt.format(demographics, symptoms)}]
    completion = {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.8
    }   
    response = requests.post(url, json=completion, headers=headers)
    response = response.json()

    print(response["result"])

    ######################## Type 1 ########################
    # print(response["choices"][0]["message"]["content"])
    # res = response["choices"][0]["message"]["content"]

    ######################## Type 2 ########################
    # print(response["result"])
    res = response["result"]

    return res