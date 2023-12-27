# Imports
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.utils import shuffle
from sklearn.ensemble import RandomForestClassifier

# Data Preprocessing
df = pd.read_csv('dataset/dataset.csv')
df = shuffle(df,random_state=42)
for col in df.columns:
    df[col] = df[col].str.replace('_',' ')
cols = df.columns
data = df[cols].values.flatten()

s = pd.Series(data)
s = s.str.strip()
s = s.values.reshape(df.shape)
df = pd.DataFrame(s, columns=df.columns)
df = df.fillna(0)

df1 = pd.read_csv('dataset/Symptom-severity.csv')
df1['Symptom'] = df1['Symptom'].str.replace('_',' ')

vals = df.values
symptoms = df1['Symptom'].unique()

for i in range(len(symptoms)):
    vals[vals == symptoms[i]] = df1[df1['Symptom'] == symptoms[i]]['weight'].values[0]
d = pd.DataFrame(vals, columns=cols)
d = d.replace('dischromic  patches', 0)
d = d.replace('spotting  urination',0)
df = d.replace('foul smell of urine',0)

# Data Split
data = df.iloc[:,1:].values
labels = df['Disease'].values
x_train, x_test, y_train, y_test = train_test_split(data, labels, train_size = 0.8,random_state=42)

# Train
rnd_forest = RandomForestClassifier(random_state=42, max_features='sqrt', n_estimators= 500, max_depth=13)
rnd_forest.fit(x_train,y_train)
preds=rnd_forest.predict(x_test)

# Adding Description
discrp = pd.read_csv("dataset/symptom_Description.csv")
ektra7at = pd.read_csv("dataset/symptom_precaution.csv")


# Prediction

def predd(psymptoms):
    a = np.array(df1["Symptom"])
    b = np.array(df1["weight"])
    for j in range(len(psymptoms)):
        for k in range(len(a)):
            if psymptoms[j] == a[k]:
                psymptoms[j] = b[k]
    psy = [psymptoms]
    pred2 = rnd_forest.predict(psy)
    y_pred_probabilities = rnd_forest.predict_proba(psy)

    top_n = 10
    for i, probs in enumerate(y_pred_probabilities):
        top_n_indices = probs.argsort()[-top_n:][
            ::-1
        ]
        top_n_classes = rnd_forest.classes_[
            top_n_indices
        ]
    disp = discrp[discrp["Disease"] == pred2[0]]
    disp = disp.values[0][1]
    recomnd = ektra7at[ektra7at["Disease"] == pred2[0]]
    c = np.where(ektra7at["Disease"] == pred2[0])[0][0]
    precuation_list = []
    for i in range(1, len(ektra7at.iloc[c])):
        precuation_list.append(ektra7at.iloc[c, i])
    
    return {
        "Disease": top_n_classes.tolist(),
        "Probability": probs[top_n_indices].tolist(),
        "Most Probable Disease": pred2[0],
        "Most Probable Disease Description": disp,
    }
