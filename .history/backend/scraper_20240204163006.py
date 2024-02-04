import requests
from bs4 import BeautifulSoup

def extract(page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'}
    url = f'https://www.mycareersfuture.gov.sg/search?search=software&sortBy=relevancy&page={page}'
    r = requests.get(url, headers)
    soup = BeautifulSoup(r.content, 'html.parser')
    return soup

def transform(soup):
    divs = soup.find_all('div', class_ = 'card relative')
    return len(divs)

c = extract(0)
print(transform(c))
    
    