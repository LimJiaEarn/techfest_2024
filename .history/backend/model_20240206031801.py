import gensim
import gensim.downloader as api
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from config import MODEL_NAME

class SkillGapModel(object):
    def __init__(self):
        self.model = api.load(MODEL_NAME)
    
    # Averaging method for embedding sentences for simplicity
    def avg_vector(self, x):
        y = np.array(x)
        y = y.mean(axis =0)
        return y

    # Get the vector representation of the words present in the user's current skills profile or skills section of target jobs 
    def getSkillsVector(self, skills_list):
        return self.avg_vector(self.model[skills_list]).reshape(1, -1)

    # Finding which job role is most similar to current user's skillset
    def computeCosineSimilarity(self, user_skills, job_listings):
        user_skills_vector = self.getSkillsVector([skill.lower() for skill in user_skills])
        similarity_dict = {}
        # job_listings = {key: [item.lower() for item in value] for key, value in job_listings.items()}

        for job in job_listings:
            try:
                job_skills_vector = self.getSkillsVector(job_listings[job])
                similarity_dict[job] = cosine_similarity(user_skills_vector, job_skills_vector)[0][0]
                print(f"The cosine similarity between the user's skills and '{job}' job  is {similarity_dict[job]}")
            except KeyError as e:
                continue
            
        return similarity_dict

    def getTopXJobListings(self, similarity_dict, x):
        return sorted(similarity_dict.items(), key=lambda x:x[1], reverse=True)[:x]

    def getAllMissingSkills(self, job_listings, user_skills, x):
        similarity_dict = self.computeCosineSimilarity(user_skills, job_listings)
        top_x_listings = self.getTopXJobListings(similarity_dict, x)
        
        job_role_list = [job[0] for job in top_x_listings]

        skills_gap_dict = {}
        
        for job in job_role_list:
            if job in job_listings.keys():
                skills_gap_dict[job] = set([skill for skill in job_listings[job] if skill not in user_skills])
                
        return skills_gap_dict
