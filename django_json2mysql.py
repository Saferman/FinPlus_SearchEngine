# coding:utf-8

import os
from tqdm import tqdm
import json
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SearchEngineEnd.settings")

# Django 版本大于等于1.7的时候，需要加上下面两句
import pandas as pd

import django
if django.VERSION >= (1, 7):#自动判断版本
    django.setup()

from database_handled.data_clear import expert_name_clear

def main():
    from app_api.models import paper_info
    # f = open('./database_handled/get_expert_info.json')
    # for line in f:
    #     data = json.loads(line)
    #     author_id = list(data.keys())[0]
    #     content = data[author_id]
    #     expert_basic_info.objects.create(author_id=author_id,
    #                                      expert_name=expert_name_clear(content['expert_name']),
    #                                      expert_web_url=content['expert_web_url'],
    #                                      expert_image_url=content['expert_image_url'],
    #                                      expert_org=content['expert_org'],
    #                                      expert_area_list=json.dumps(content['expert_area_list']))
    # f.close()
    #
    # f = open('./database_handled/get_expert_tread_list.json')
    # for line in f:
    #     data = json.loads(line)
    #     author_id = list(data.keys())[0]
    #     content = data[author_id]
    #     expert_trend.objects.create(author_id=author_id, year=json.dumps(content[0]), number=json.dumps(content[1]))
    # f.close()
    #
    f = open('./data/get_paper_list.json')
    for line in f:
        data = json.loads(line)
        author_id = list(data.keys())[0]
        content = data[author_id]
        paper_info.objects.create(author_id=author_id,paper_list_top10=json.dumps(content))
    f.close()



if __name__ == "__main__":
    main()
    print('Done!')
