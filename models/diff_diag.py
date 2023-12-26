# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

# Define the possible values for each feature
symptoms = ['Fever', 'Cough', 'Headache', 'Fatigue', 'Shortness of breath', 'Chills', 'Sore throat', 'Nausea', 'Muscle pain', 'Chest pain']
sexes = ['Male', 'Female']
past_health_conditions = ['None', 'Asthma', 'Diabetes', 'Hypertension']
diseases = ['Flu', 'Cold', 'Migraine', 'COVID-19']

# Generate random data for each feature
np.random.seed(42)  # for reproducibility
data = {
    'Symptom1': np.random.choice(symptoms, 1000),
    'Symptom2': np.random.choice(symptoms, 1000),
    'Age': np.random.randint(20, 80, 1000),
    'Sex': np.random.choice(sexes, 1000),
    'Height': np.random.randint(150, 200, 1000),
    'PastHealthConditions': np.random.choice(past_health_conditions, 1000),
    'Disease': np.random.choice(diseases, 1000)
}

# Create a DataFrame
df = pd.DataFrame(data)

# Define features (X) and target variable (y)
X = df.drop('Disease', axis=1)
y = df['Disease']

# Encode target variable
le = LabelEncoder()
y = le.fit_transform(y)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Define preprocessing steps
numeric_features = ['Age', 'Height']
categorical_features = ['Symptom1', 'Symptom2', 'Sex', 'PastHealthConditions']

numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median'))
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ]
)

# Define the model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', XGBClassifier(use_label_encoder=False, eval_metric='mlogloss'))
])

# Train the model
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Model Accuracy: {accuracy}')