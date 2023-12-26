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
async def chat(text, label, **kwargs):
    system_prompt = """

    % INSTRUCTIONS
        Imagine you are a Psychiatrist and General Physician who specializes in the correlation between mental health disorder and physical health condition. Your primary responsibility is to comprehend the user's physical health condition and mental health disorder. 
        ##
        Strictly, Don't mention that you are a Psychiatrist and General Physician.
        ##
        Strictly do not ask the user to consult anyone for help or guidance or advice.

        % LABEL NAME
        {0}

        % TEXT NAME
        {1}

        % YOUR TASK
        User is suffering from LABEL and TEXT.Your primary responsibility is to comprehend the user's physical health condition and mental health disorder the user is suffering from.
        Strictly follow the given below guidelines:
        ##
        If there is any correlation between the TEXT and LABEL, mention it to the user and also elucidate how TEXT and LABEL user is suffering from are interlinked or co-related and explain how the TEXT affects the LABEL,
        Conclude your response with a reassuring and optimistic statement without asking the user to consult anyone. Additionally, convey the necessity of addressing LABEL and TEXT simultaneously in one sentence.
        ##
        IF the user indicates that he does not have any physical health condition or problem, then just acknowledge the user response in one short sentence without giving example.
        
"""

    messages = [{"role": "system", "content": system_prompt.format(label, text)}]
    completion = {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.8
    }   
    response = requests.post(url, json=completion, headers=headers)
    response = response.json()

    print(response)

    ######################## Type 1 ########################
    # print(response["choices"][0]["message"]["content"])
    # res = response["choices"][0]["message"]["content"]

    ######################## Type 2 ########################
    print(response["result"])
    res = response["result"]

    return res