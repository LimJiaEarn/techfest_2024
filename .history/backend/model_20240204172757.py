import gensim
import gensim.downloader as api
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

model = api.load("glove-twitter-25")



model.most_similar(["software", "engineer"])

model[['machine', 'learning', 'python']].reshape(1,-1)
# get vector representation of each word

# Get the vector representation of the words present in the user's current skills profile
def getUserSkillsVector(skills_list):
    
    user_skills = model[skills_list].reshape(1,-1)
    
    return user_skills
    
# Get the vector representation of the words present in the skills section of target jobs
def getJobSkillsVector():
    return