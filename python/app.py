from flask import Flask, request, jsonify
import os
from main import *

from werkzeug.utils import secure_filename


app = Flask(__name__)

# Define a directory for uploaded files
UPLOAD_FOLDER = 'resume_uploads'
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), UPLOAD_FOLDER)



def allowed_file(filename):
    # Check if file extension is allowed
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ['pdf']

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        # Call the process_file function after saving
        text_per_page,num_of_pages = main(file_path)
        results = analyse_pdf(text_per_page,num_of_pages)

        return jsonify({'message': 'File uploaded and processed successfully', 
                        'filename': filename,
                        'results': results}), 200
    else:
        return jsonify({'message': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
