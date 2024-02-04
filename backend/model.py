import gensim
import gensim.downloader as api
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

model = api.load("glove-twitter-25")

# model.most_similar(["software", "engineer"])

user1 = ['software', 'engineer', 'java', 'sql']

jobListings = {
    'machine learning engineer': ['machine', 'learning', 'python', 'deep', 'learning'],
    'data engineer': ['hadoop', 'scala', 'spark', 'flask', 'hive'],
    'full stack': ['javascript', 'nodejs', 'angularjs', 'mongodb']
}

def avg_vector(x):
    y = np.array(x)
    y = y.mean(axis =0)
    return y

# Get the vector representation of the words present in the user's current skills profile or skills section of target jobs 
def getSkillsVector(skills_list):
    return avg_vector(model[skills_list]).reshape(1,-1)

# Get the vector representation of the words present in the 
def computeCosineSimilarity(user_skills, job_listings):
    
    user_skills_vector = getSkillsVector(user_skills)
    
    similarity_dict = {}
    
    for job in job_listings:
        job_skills_vector = getSkillsVector(job_listings[job])
        similarity_dict[job] = cosine_similarity(user_skills_vector, job_skills_vector)[0][0]
        print(f"The cosine similarity between the user's skills and '{job}' job  is {similarity_dict[job]}")
        
    return similarity_dict

computeCosineSimilarity(user1, jobListings)
