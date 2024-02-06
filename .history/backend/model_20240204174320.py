import gensim
import gensim.downloader as api
import numpy as np
from userskills import user1
import joblistings
from sklearn.metrics.pairwise import cosine_similarity

model = api.load("glove-twitter-25")

# model.most_similar(["software", "engineer"])


# Get the vector representation of the words present in the user's current skills profile
def getUserSkillsVector(user_skills_list):
    
    user_skills = model[user_skills_list].reshape(1,-1)
    
    return user_skills
    
# Get the vector representation of the words present in the skills section of target jobs
def getJobSkillsVector(job_listings):
    job_list = []
    
    for job in job_listings:
        job_list.append(model(job.values))
    
    return job_list

user1skills = getUserSkillsVector(userskills.user1)
jobListings = getJobSkillsVector(joblistings.jobListings)
