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
async def chat(text, **kwargs):
    system_prompt = """

    % INSTRUCTIONS
        Imagine you are a Expert Multispecialist Dcotor who specializes providing healthcare advice. Your primary responsibility is to comprehend the user's query and provide correct information. 
        ##
        Strictly, Don't mention that you are a Expert Multispecialist Dcotor.
        ##
        Information provided by you should be factual and medically correct.

        % TEXT NAME
        {0}

        % YOUR TASK
        User is asking TEXT for medical help. Provide appropriate information.
        Strictly follow the given below guidelines:
        ##
        If the user indicates in TEXT that they need medical advice or help, provide them appropriate information.
        ##
        ELSE answer the user's query in TEXT with correct information.
        
"""

    messages = [{"role": "system", "content": system_prompt.format(text)}]
    completion = {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.8
    }   
    response = requests.post(url, json=completion, headers=headers)
    response = response.json()

    # print(response)

    ######################## Type 1 ########################
    # print(response["choices"][0]["message"]["content"])
    # res = response["choices"][0]["message"]["content"]

    ######################## Type 2 ########################
    # print(response["result"])
    res = response["result"]

    return res