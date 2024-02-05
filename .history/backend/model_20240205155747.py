import gensim
import gensim.downloader as api
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scraper import result_dict

print(result_dict)
model = api.load("glove-twitter-200")

# Averaging method for embedding sentences for simplicity
def avg_vector(x):
    y = np.array(x)
    y = y.mean(axis =0)
    return y

# Get the vector representation of the words present in the user's current skills profile or skills section of target jobs 
def getSkillsVector(skills_list):
    return avg_vector(model[skills_list]).reshape(1,-1)

# Finding which job role is most similar to current user's skillset
def computeCosineSimilarity(user_skills, job_listings):
    user_skills_vector = getSkillsVector([skill.lower() for skill in user_skills])
    similarity_dict = {}
    job_listings = {key: [item.lower() for item in value] for key, value in job_listings.items()}

    for job in job_listings:
        job_skills_vector = getSkillsVector(job_listings[job])
        similarity_dict[job] = cosine_similarity(user_skills_vector, job_skills_vector)[0][0]
        print(f"The cosine similarity between the user's skills and '{job}' job  is {similarity_dict[job]}")
        
    return similarity_dict

def getTopXJobListings(similarity_dict, x):
    return sorted(similarity_dict.items(), key=lambda x:x[1], reverse=True)[:x]

def getAllMissingSkills(user_skills, job_listings, similarity_dict, x):
    top_x_listings = getTopXJobListings(similarity_dict, x)
    
    job_role_list = [job[0] for job in top_x_listings]

    skills_gap_dict = {}
    
    for job in job_role_list:
        if job in job_listings.keys():
            skills_gap_dict[job] = set([skill for skill in job_listings[job] if skill not in user_skills])
            
    return skills_gap_dict

# USER INPUTS
x = 2
user1 = ['software', 'engineer', 'java', 'sql', 'javascript', 'python']
jobListings = {
    'machine learning engineer': ['machine', 'learning', 'python', 'deep', 'learning'],
    'data engineer': ['hadoop', 'scala', 'spark', 'flask', 'hive'],
    'full stack': ['javascript', 'nodejs', 'angularjs', 'mongodb']
}

getAllMissingSkills(user1, result_dict, computeCosineSimilarity(user1, result_dict), x)
