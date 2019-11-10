# encoding:utf-8
import difflib
from fuzzywuzzy import process
# from .show_time import show_time_decorator
def sim(s,s_list):
    return process.extract(s, s_list,limit=10)#，表示从列表ListS中找出Top n与S1最相似的句子;

def string_similar(s1, s2):
    ans = difflib.SequenceMatcher(None, s1, s2).quick_ratio()
    return ans > 0.7, ans



'''
xmlhttp.open("GET", "/api?" + "type=get_expert_search_result&" + "expert_name_input=" + expert_name_input, true);
                //{
                'expert_info_list':
                [
                {'expert_name':string_expert_name,
                'expert_image_url':string_expert_image_url,
                'expert_org_name':string_expert_org_name,
                'expert_score':string_expert_score,
                'expert_three_num':[string_cititon_num, string_paper_num, string_co_authon_num], 
                'expert_area_list:[string_expert_area_name,string_expert_area_name,string_expert_area_name,string_expert_area_name
                ]
                } * N个 （N < 10)]}
                '''
import pandas as pd
import json
import numpy as np
from tqdm import tqdm
from fuzzywuzzy import process,fuzz
def sim(s,s_list):
    print(s,s_list)
    return process.extract(s, s_list,limit=10)#，表示从列表ListS中找出Top n与S1最相似的句子;

def to_str(x):
    if str(x)=='nan':
        x=''
    return str(x)

def get_expert_search_result_fina(expert_name_input):
#     author_id_serach_set=np.load('author_id_serach_set.npy')
#     author_name_search_set=set(list(map(lambda x:get_expert_info[x]['expert_name'],author_id_serach_set)))
#     name2id={}
#     for i in author_id_serach_set:
#         name2id[get_expert_info[i]['expert_name']]=name2id.get(get_expert_info[i]['expert_name'],[])+[i]
    with open('data/name2id.json','r') as t:
        name2id=json.load(t)
    author_name_search_set=name2id.keys()
    with open('data/id2score.json','r') as t:
        id2score=json.load(t)
    expert_name=expert_name_input
    expert_name_list=sim(expert_name,author_name_search_set)
    expert_id_list=[]
    # print(expert_name_list)
    for val in expert_name_list:
        for _id in name2id[val[0]]:
            if(fuzz.partial_ratio(expert_name,val[0])==100):
                expert_id_list.append([_id,id2score[_id]+100])
            else:
                expert_id_list.append([_id,val[1]])
    expert_id_list=sorted(expert_id_list,key=lambda x:-int(x[1]))[:10]
    return expert_id_list


def get_expert_search_result_fina2(topic_name):
    import numpy as np
    Topic_set=np.load('data/topic.npy')
    topic_name=process.extractOne(topic_name, Topic_set)[0]  # ，返回最相似的一个
    with open('data/topic2author.json') as t:
        topic2author = json.load(t)
    with open('data/topicname2id.json') as t:
        topicname2id = json.load(t)
    with open('data/name2id.json') as t:
        name2id=json.load(t)
    with open('data/id2score.json','r') as t:
        id2score=json.load(t)
    author_id_search_set = set(id2score.keys())
    topic_id = topicname2id[topic_name]
    authors = topic2author[str(topic_id)]
    ans = []
    for val in eval(authors):
        val=str(val)
        if val in author_id_search_set:
            ans.append(val)
        if len(ans) >= 10:
            break
    return str(topic_id),ans


if __name__ == '__main__':
    input = "ssss"
    names = []
    rate_list = []
    print(get_expert_search_result_fina('Dave'))
    for name in names:
        flag, rate = string_similar(input, name)
        if flag:
            rate_list.append((name, rate))
        pass

