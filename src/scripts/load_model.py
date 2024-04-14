import sys
import json
import numpy as np
import pickle
import os

def load_model_and_predict(data):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'kmeans_model.pkl')
    # print(model_path)

    with open(model_path, 'rb') as f: 
        model = pickle.load(f)
    
    input_data = np.array(data)
    
    predictions = model.predict(input_data)
    # print(predictions)
    
    return predictions.tolist()[0]

if __name__ == '__main__':
    data = json.loads(sys.argv[1])
    # print(data)
    
    results = load_model_and_predict(data)
    print(json.dumps(results))
