import pandas as pd
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as pl
import nltk
import matplotlib.pyplot as plt
import contractions
import regex as re

from config import API_URL, MAX_PAGES
from nltk.corpus import stopwords
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
from nltk.tokenize import word_tokenize
# nltk.download('stopwords')
stop_words = set(stopwords.words('english'))
pd.set_option('display.max_colwidth', 200)

class JobScrapper(object):
    def __init__(self):
        self.job_ids =[]
        self.titles = []
        self.companies = []
        self.locations = []
        self.categorys= []
        self.subCategorys= []
        self.job_types=[]
        self.salarys=[]

    def scrape_article_ids(self, api_url, max_pages):
        
        print('Scraping for jobs...')
        for page_number in range(1, max_pages + 1):
            page_url = f'{api_url}&page={page_number}'
            
            # Send an HTTP request to the API endpoint
            response = requests.get(api_url)
            if response.status_code == 200:
                # Parse the JSON response
                data = response.json()

                # Extract advertiser IDs from each item in the 'data' list
                for item in data['data']:
                    #print(item)
                    jid = item['id']
                    title = item['title']
                    company = item['advertiser'].get('description', '')
                    location = item.get('location', '')
                    category = item['classification'].get('description', '')
                    subCategory= item['subClassification'].get('description', '')
                    job_type = item.get('workType', '')
                    salary = item.get('salary', '')

                    self.job_ids.append(jid)
                    self.titles.append(title)
                    self.companies.append(company)
                    self.locations.append(location)
                    self.categorys.append(category)
                    self.subCategorys.append(subCategory)
                    self.job_types.append(job_type)
                    self.salarys.append(salary)
                    #print(f"Job ID: {job_ids}")

            else:
                print(f"Failed to retrieve data from the API. Status Code: {response.status_code}")
                break
        
        print('Scraping finished!')
        return self.job_ids, self.titles, self.companies, self.locations, self.categorys, self.subCategorys, self.job_types, self.salarys

    def fetch_job_article(self, job_id):
        article_url = f'https://www.jobstreet.com.sg/job/{job_id}'
        response = requests.get(article_url)
        if response.status_code == 200:
            return response.text
        else:
            print(f"Failed to retrieve job article. Status Code: {response.status_code}")
            return None

    def extract_text_from_ul(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        ul_tags = soup.find_all('ul')
        text_list = [ul.get_text(separator='\n') for ul in ul_tags]
        return '\n'.join(text_list)

    def scrape_and_store_text(self):
        data = {'job_id': [],'job_title':[],'company':[], 'requirements': [], 'location':[],'category':[],'subcategory':[],'type':[],'salary':[]}

        for job_id in self.job_ids:
            job_article_content = self.fetch_job_article(job_id)
            
            if job_article_content:
                text_from_ul = self.extract_text_from_ul(job_article_content)
                data['job_id'].append(job_id)
                data['requirements'].append(text_from_ul)

        data['job_title'] = pd.Series(self.titles).astype(str).str.lower()
        data['company'] = pd.Series(self.companies).astype(str).str.lower()
        data['location'] = pd.Series(self.locations).astype(str).str.lower() 
        data['category'] = pd.Series(self.categorys).astype(str).str.lower()
        data['subcategory'] = pd.Series(self.subCategorys).astype(str).str.lower()
        data['type'] = pd.Series(self.job_types).astype(str).str.lower()
        data['salary'] = pd.Series(self.salarys).astype(str).str.lower()
        
        return data

    def get_job_info(self, api_url, max_pages):
        # self.scrape_article_ids(api_url, max_pages)

        # data = self.scrape_and_store_text()
        # pd.DataFrame(data).to_csv("backend/jobstreet_scraped_v2.csv", index=False)

        result_df = pd.read_csv("jobstreet_scraped_v2.csv", index_col=0)

        # Basic Text Preprocessing
        result_df['requirements'] = result_df['requirements'].apply(lambda x: [contractions.fix(word) for word in str(x).split()])
        result_df['requirements'] = [' '.join(map(str, l)) for l in result_df['requirements']]
        result_df['requirements'] = result_df['requirements'].apply(lambda x: re.sub(r'[^\w\d\s\']+', '', x))

        result_df['tokenized_desc'] = result_df['requirements'].apply(word_tokenize)

        # Remove stopwords 
        result_df['tokenized_desc'] = result_df['tokenized_desc'].apply(lambda x: [word for word in x if word not in stop_words])
        result_df['tokenized_desc_join'] = [' '.join(map(str, l)) for l in result_df['tokenized_desc']]

        result_dict = result_df.set_index('job_title')['tokenized_desc_join'].to_dict()
        
        return result_dict

