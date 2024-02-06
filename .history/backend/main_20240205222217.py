import scraper
import model
from config import API_URL, MAX_PAGES, TOP_X_RESULTS

# from . import scraper
# .scraper import JobScrapper

if __name__ == '__main__':
    job_scrapper = scraper.JobScrapper()
    skill_gap_model = model.SkillGapModel()
    
    job_listings_dict = job_scrapper.get_job_info(API_URL, MAX_PAGES)
    similarity_dict = skill_gap_model.computeCosineSimilarity(user_skills, job_listings_dict)
    
    getAllMissingSkills(user1, similarity_dict, TOP_X_RESULTS)
    
    