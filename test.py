from transformers import BartForConditionalGeneration, BartTokenizer

model_name = 'facebook/bart-large-cnn'
model = BartForConditionalGeneration.from_pretrained(model_name)
tokenizer = BartTokenizer.from_pretrained(model_name)

clinical_text = '''
    Patient: John Doe
    Age: 45
    Date: 2023-09-01

    Chief Complaint:
    The patient presents with chest pain and shortness of breath.

    History of Present Illness:
    Mr. Doe has a history of hypertension and smoking. He describes the chest pain as a
    squeezing sensation in the center of the chest. The pain has been persistent for the
    past two hours and is radiating to the left arm.

    Physical Examination:
    On examination, the patient's blood pressure is elevated at 160/95 mm Hg. He appears
    diaphoretic and in distress. Auscultation reveals crackles in the lungs.

    Assessment:
    The patient is at risk of an acute myocardial infarction (heart attack) due to his
    symptoms, history, and physical findings.

    Plan:
    Mr. Doe will be admitted for further evaluation and treatment, including cardiac
    monitoring, laboratory tests, and possible intervention.

    Follow-up:
    The patient's family has been informed, and further updates will be provided
    as necessary.
'''

inputs = tokenizer.encode("summarize: " + clinical_text, return_tensors="pt", max_length=1024, truncation=True)
summary_ids = model.generate(inputs, max_length=150, min_length=30, length_penalty=2.0, num_beams=4, early_stopping=True)

print([tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=False) for g in summary_ids])

summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
print(summary)