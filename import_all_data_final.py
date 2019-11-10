# coding:utf-8

import os
from tqdm import tqdm
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SearchEngineEnd.settings")

# Django 版本大于等于1.7的时候，需要加上下面两句
import django
if django.VERSION >= (1, 7):#自动判断版本
    django.setup()

from app_api.models import get_expert_info_fina,topic_info

import pandas as pd
# import  json
# print(get_expert_info_fina.objects.filter(key='117180')[0])
# with open('data/name2id.json', 'r') as t:
#     name2id = json.load(t)
# author_name_search_set = name2id.keys()
# with open('data/id2score.json', 'r') as t:
#     id2score = json.load(t)
X=pd.read_csv('data/topic_info.csv',header=None)
for i in tqdm(range(len(X))):
    line=X.iloc[i].values
    topic_info.objects.create(key=line[0],req=line[1])
X=pd.read_csv('data/get_expert_info_fina_dic.csv',header=None)
for i in tqdm(range(len(X))):
    line=X.iloc[i].values
    get_expert_info_fina.objects.create(key=line[0],req=line[1])
