import gensim
import gensim.downloader as api
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

model = api.load("glove-twitter-25")

# model.most_similar(["software", "engineer"])

user1 = ['software', 'engineer', 'java', 'C']

jobListings = {
    1: ['machine', 'learning', 'python', 'deep', 'learning'],
    2: ['hadoop', 'scala', 'spark', 'flask', 'hive'],
    3: ['javascript', 'nodejs', 'angularjs', 'mongodb']
}


# Get the vector representation of the words present in the user's current skills profile
def getUserSkillsVector(user_skills_list):
    
    user_skills = model[user_skills_list]
    
    return user_skills
    
# Get the vector representation of the words present in the skills section of target jobs
def getJobSkillsVector(job_listings):
    job_list = []
    
    for job in job_listings:
        job_list.append(model(job.values))
    
    return job_list

user1skills = getUserSkillsVector(user1)
jobListings = getJobSkillsVector(jobListings)
