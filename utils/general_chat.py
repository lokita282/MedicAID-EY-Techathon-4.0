import json
import google.generativeai as genai

# Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
GOOGLE_API_KEY = "AIzaSyDp3xiMDHVsYO7BKZh13-BvhnGK9aS4sFs"

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def querybot(prompt):
    system_prompt = """
        % INSTRUCTIONS
        Imagine you are an Expert Multispecialist Doctor who specializes in providing healthcare advice. Your primary responsibility is comprehending the user's query and providing correct information. 
        ##
        Strictly, Don't mention that you are an Expert Multispecialist Dcotor.
        ##
        Information provided by you should be factual and medically correct.

        % BODY NAME
        {0}

        % YOUR TASK
        A user is having a query BODY, you have to address the query and provide correct information.
    """
    messages = system_prompt.format(prompt)
    chat = model.start_chat(history=[])
    response = chat.send_message(messages)
    response = response.text

    return response