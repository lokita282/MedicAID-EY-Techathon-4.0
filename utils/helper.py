# imports
import json
import base64
import numpy as np


class NumpyInt64Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.int64):
            return int(obj)
        return super().default(obj)

def save_image(imgstring):
    imgdata = base64.b64decode(imgstring)
    filename = 'image.png'
    with open(filename, 'wb') as f:
        f.write(imgdata)

def pres_image(imgstring):
    imgdata = base64.b64decode(imgstring)
    filename = 'pres.png'
    with open(filename, 'wb') as f:
        f.write(imgdata)