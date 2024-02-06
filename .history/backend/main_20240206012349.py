import scraper
import model
from config import API_URL, MAX_PAGES, TOP_X_RESULTS, USER_SKILLS # To replace USER_SKILLS with the actual input of the user's skills

if __name__ == '__main__':
    job_scrapper = scraper.JobScrapper()
    skill_gap_model = model.SkillGapModel()
    
    job_listings_dict = job_scrapper.get_job_info(API_URL, MAX_PAGES)
    similarity_dict = skill_gap_model.computeCosineSimilarity(USER_SKILLS, job_listings_dict)
    
    skill_gap_dict = skill_gap_model.getAllMissingSkills(similarity_dict, USER_SKILLS, TOP_X_RESULTS)
    
    
    
    