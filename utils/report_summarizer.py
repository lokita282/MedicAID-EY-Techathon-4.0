import json
from bardapi import Bard, BardCookies

from utils.helper import *

cookie_dict = {
    "__Secure-1PSID": "fQiu9QQLwJoG-7-WKyj1mdtOkb_KH6cUuBAMLwImTymnYkCtENaZvFJiPUzkAoItt_h5BQ.",
    "__Secure-1PSIDTS": "sidts-CjEBPVxjSktDikFXIzEu1YLwftHUAkY5kmIjdUrXmLRnj3J4-jkjKy3NExgf-NRXPuowEAA",
    # Any cookie values you want to pass session object.
}
bard = BardCookies(cookie_dict=cookie_dict)

def report_summarizer(image):
    pres_image(image)
    image = open('pres.png', 'rb').read()

    system_prompt = """
        % INSTRUCTIONS
        Imagine you are an Expert Multispecialist Doctor who specializes in providing healthcare advice. Your primary responsibility is comprehending the user's query and providing correct information. 
        ##
        Strictly, Don't mention that you are an Expert Multispecialist Doctor.
        ##
        Information provided by you should be factual and medically correct.

        % YOUR TASK
        Analyse the image and provide the following information:

        % OUTPUT FORMAT
        Always respond ONLY in JSON format without new line characters and  which contains objects for test names with their name, result, and a single line interpretation of that.
        ##
        Strictly, the response should not contain anything else than the JSON object. It should not contain the json.

        % OUTPUT EXAMPLE
        {"Test1": {"result": ,"interpretation": },"Test2": {"result": ,"interpretation": }
    """
    res = bard.ask_about_image(system_prompt, image)['content']
    print(res)
    return res