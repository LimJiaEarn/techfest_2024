import pandas as pd
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as pl
import nltk
import matplotlib.pyplot as plt
import contractions
import regex as re
from nltk.corpus import stopwords
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
from nltk.tokenize import word_tokenize
# nltk.download('stopwords')
stop_words = set(stopwords.words('english'))
pd.set_option('display.max_colwidth', 200)

def scrape_article_ids(api_url, max_pages):
    job_id =[]
    titles = []
    companies = []
    locations = []
    categorys= []
    subCategorys= []
    job_types=[]
    salarys=[]
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

                job_id.append(jid)
                titles.append(title)
                companies.append(company)
                locations.append(location)
                categorys.append(category)
                subCategorys.append(subCategory)
                job_types.append(job_type)
                salarys.append(salary)
                #print(f"Job ID: {job_id}")

        else:
            print(f"Failed to retrieve data from the API. Status Code: {response.status_code}")
            break

    return job_id, titles, companies, locations, categorys, subCategorys,job_types,salarys

def fetch_job_article(job_id):
    article_url = f'https://www.jobstreet.com.my/job/{job_id}'
    response = requests.get(article_url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve job article. Status Code: {response.status_code}")
        return None

def extract_text_from_ul(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    ul_tags = soup.find_all('ul')
    text_list = [ul.get_text(separator='\n') for ul in ul_tags]
    return '\n'.join(text_list)

def scrape_and_store_text(job_ids):
    data = {'job_id': [],'job_title':[],'company':[], 'requirements': [], 'location':[],'category':[],'subcategory':[],'type':[],'salary':[]}

    for job_id in job_ids:
        job_article_content = fetch_job_article(job_id)
        
        if job_article_content:
            text_from_ul = extract_text_from_ul(job_article_content)
            data['job_id'].append(job_id)
            data['requirements'].append(text_from_ul)

    data['job_title'] = titles
    data['company'] = companies
    data['location'] = locations 
    data['category'] = categorys
    data['subcategory'] = subCategorys
    data['type']=job_types
    data['salary']=salarys
    
    return data

max_pages = 6

# api url taken from Network -> Header 
api_url = 'https://www.jobstreet.com.my/api/chalice-search/v4/search?siteKey=MY-Main&sourcesystem=houston&userqueryid=2b00edd417ec163434fca9421e24c97a-7428735&userid=e56c7e89-1d1a-42b9-b7a5-37c12653d6b9&usersessionid=e56c7e89-1d1a-42b9-b7a5-37c12653d6b9&eventCaptureSessionId=e56c7e89-1d1a-42b9-b7a5-37c12653d6b9&seekSelectAllPages=true&keywords=data+scientist&pageSize=99&include=seodata&locale=en-MY&solId=568d2fe8-e8ef-4998-8e24-3e1ccfb1348b'
job_id, titles, companies, locations, categorys, subCategorys,job_types,salarys = scrape_article_ids(api_url, max_pages)

data = scrape_and_store_text(job_id)
result_df = pd.DataFrame(data).to_csv("/backend/jobstreet_scraped_v2.csv", index=False)

result_df = pd.read_csv("/backend/jobstreet_scraped_v2.csv", index_col=0)

# Basic Text Preprocessing
result_df['requirements'] = result_df['requirements'].apply(lambda x: [contractions.fix(word) for word in str(x).split()])
result_df['requirements'] = [' '.join(map(str, l)) for l in result_df['requirements']].str.lower()
result_df['requirements'] = result_df['requirements'].apply(lambda x: re.sub(r'[^\w\d\s\']+', '', x))

result_df['tokenized_desc'] = result_df['requirements'].apply(word_tokenize)

# Remove stopwords 
result_df['tokenized_desc'] = result_df['tokenized_desc'].apply(lambda x: [word for word in x if word not in stop_words])
result_df['tokenized_desc_join'] = [' '.join(map(str, l)) for l in result_df['tokenized_desc']]

result_dict = result_df.set_index('job_title')['tokenized_desc_join'].to_dict()

print(result_dict)

