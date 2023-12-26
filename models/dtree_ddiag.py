import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# Synthetic data
np.random.seed(0)
# num_samples = 1000000
num_samples = 10000

symptoms = ['Fever', 'Cough', 'Headache', 'Fatigue', 'Shortness of breath', 'Chills', 'Sore throat', 'Nausea', 'Muscle pain', 'Chest pain']
sexes = ['Male', 'Female']
conditions = ['None', 'Asthma', 'Diabetes', 'Hypertension']
diseases = ['Flu', 'Cold', 'Migraine', 'COVID-19']

data = {
    'Symptoms': [np.random.choice(symptoms, np.random.randint(1, 4), replace=False).tolist() for _ in range(num_samples)],
    'Age': np.random.randint(20, 60, num_samples),
    'Sex': np.random.choice(sexes, num_samples),
    'Height': np.random.randint(150, 200, num_samples),
    'PastHealthConditions': np.random.choice(conditions, num_samples),
    'Disease': np.random.choice(diseases, num_samples)
}

df = pd.DataFrame(data)

# Features and target variable
X = df[['Symptoms', 'Age', 'Sex', 'Height', 'PastHealthConditions']]
y = df['Disease']

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Encoding categorical variables
label_encoders = {}

for column in ['Sex', 'PastHealthConditions']:
    le = LabelEncoder()
    le.fit(X_train[column])
    X_train[column] = le.transform(X_train[column])
    X_test[column] = le.transform(X_test[column])
    label_encoders[column] = le

# Apply MultiLabelBinarizer to the 'Symptoms' column
mlb = MultiLabelBinarizer()
X_train = X_train.join(pd.DataFrame(mlb.fit_transform(X_train.pop('Symptoms')), columns=mlb.classes_, index=X_train.index))
X_test = X_test.join(pd.DataFrame(mlb.transform(X_test.pop('Symptoms')), columns=mlb.classes_, index=X_test.index))

# Apply label encoding to the target variable
le = LabelEncoder()
le.fit(y_train)
y_train = le.transform(y_train)
y_test = le.transform(y_test)
label_encoders['Disease'] = le

from sklearn.model_selection import GridSearchCV

# Define the parameter grid
param_grid = {
    'max_depth': [None, 5, 10, 15, 20],
    'min_samples_split': [2, 5, 10, 20]
}

# Create a GridSearchCV object
grid_search = GridSearchCV(DecisionTreeClassifier(random_state=42), param_grid, cv=5, scoring='accuracy')

# Fit the GridSearchCV object to the data
grid_search.fit(X_train, y_train)

# Print the best parameters and the best score
print(grid_search.best_params_)
print(grid_search.best_score_)

# Use the best estimator to make predictions
model = grid_search.best_estimator_
y_pred = model.predict(X_test)

# To predict a new case
new_data = {
    'Symptoms': [['Cough', 'Fever']],
    'Age': [30],
    'Sex': ['Male'],
    'Height': [170],
    'PastHealthConditions': ['None']
}
new_data_df = pd.DataFrame(new_data)

# Apply label encoding to new data
for column in ['Sex', 'PastHealthConditions']:
    new_data_df[column] = label_encoders[column].transform(new_data_df[column])

# Apply MultiLabelBinarizer to the 'Symptoms' column
new_data_df = new_data_df.join(pd.DataFrame(mlb.transform(new_data_df.pop('Symptoms')), columns=mlb.classes_, index=new_data_df.index))

# Predict disease for new data
new_pred = model.predict(new_data_df)
# Get the predicted disease name
predicted_disease = label_encoders['Disease'].inverse_transform(new_pred)

# Print the predicted disease
print('Predicted disease:', predicted_disease[0])

# Use the best estimator to make predictions
model = grid_search.best_estimator_
y_pred = model.predict(X_test)

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')
confusion = confusion_matrix(y_test, y_pred)

# Print metrics
print('Accuracy:', accuracy)
print('Precision:', precision)
print('Recall:', recall)
print('F1 Score:', f1)
print('Confusion Matrix:\n', confusion)