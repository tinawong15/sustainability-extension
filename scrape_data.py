### FINAL SCRIPT
import os, requests, bs4
import pandas as pd

def table_to_df(table):
    return pd.DataFrame([[td.text for td in row.findAll('td')] for row in table.tbody.findAll('tr')])

def format_output(df,res):
    for i in range(1,len(df[0])):
        company_name = df[0][i].strip()
        score = df[1][i].strip()
        res.loc[len(res.index)] = [company_name, score]
        
def next_page(soup):
    return "https://www.csrhub.com" + soup.find('a', attrs={'class':'next_page'}).get('href')

column_names = ['company_name','score']
res = pd.DataFrame(columns = column_names)
url = "https://www.csrhub.com/csrhub/"
counter = 1

while counter <= 883:
    print("on page",counter)
    page = requests.get(url)
    soup = bs4.BeautifulSoup(page.content, 'lxml')
    table = soup.find(name='table', attrs={'class': 'search-result_table'})
    format_output(table_to_df(table),res)
    url = next_page(soup)
    page = requests.get(url)
    counter += 1

res.to_csv('add_path_here', index=None, sep=';', encoding='iso-8859–1')