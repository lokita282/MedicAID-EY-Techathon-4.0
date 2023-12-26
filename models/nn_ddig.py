import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from keras.models import Sequential
from keras.layers import Dense
from keras.utils.np_utils import to_categorical
from sklearn.preprocessing import LabelEncoder

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

# Convert categorical variables to numeric
le = LabelEncoder()
X_train['Sex'] = le.fit_transform(X_train['Sex'])
X_train['PastHealthConditions'] = le.fit_transform(X_train['PastHealthConditions'])

X_test['Sex'] = le.transform(X_test['Sex'])
X_test['PastHealthConditions'] = le.transform(X_test['PastHealthConditions'])

# Convert target variable to one-hot encoding
y_train = to_categorical(le.fit_transform(y_train))
y_test = to_categorical(le.transform(y_test))

# Define the model
model = Sequential()
model.add(Dense(32, input_dim=X_train.shape[1], activation='relu'))  # Input layer
model.add(Dense(16, activation='relu'))  # Hidden layer
model.add(Dense(y_train.shape[1], activation='softmax'))  # Output layer

# Compile the model
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=50, batch_size=10, verbose=1)

# Evaluate the model
_, accuracy = model.evaluate(X_test, y_test, verbose=0)
print('Accuracy: %.2f' % (accuracy*100))

# Predict the classes
y_pred = model.predict_classes(X_test)

# Print the classification report
print(classification_report(y_test, y_pred))

# Print the confusion matrix
print(confusion_matrix(y_test, y_pred))