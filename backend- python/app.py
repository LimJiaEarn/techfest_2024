from flask import Flask, request, jsonify
import os
from main import *

from werkzeug.utils import secure_filename

import techfest_2024.python.model.scraper as scraper
import techfest_2024.python.model.model as model
from techfest_2024.python.model.config import API_URL, MAX_PAGES, TOP_X_RESULTS, USER_SKILLS # To replace USER_SKILLS with the actual input of the user's skills

app = Flask(__name__)

# Define a directory for uploaded files
UPLOAD_FOLDER = 'resume_uploads'
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), UPLOAD_FOLDER)


def allowed_file(filename):
    # Check if file extension is allowed
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ['pdf']
#Still work in progress
@app.route('/analyse',methods =['GET'])
def analyse():
    job_scrapper = scraper.JobScrapper()

    skill_gap_model = model.SkillGapModel()

    job_listings_dict = job_scrapper.get_job_info(API_URL, MAX_PAGES)
    
    skill_gap_dict = skill_gap_model.getAllMissingSkills(job_listings_dict, USER_SKILLS, TOP_X_RESULTS)
    
    print(skill_gap_dict)

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
