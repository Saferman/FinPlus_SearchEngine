# encoding:utf-8
from django.shortcuts import render,redirect
from django.http import HttpResponse
from .modules.match import string_similar,sim,get_expert_search_result_fina,to_str,get_expert_search_result_fina2
from .models import *
import json

"""
 django.http模块中定义了HttpResponse 对象的API
 作用：不需要调用模板直接返回数据
 HttpResponse属性：
    content: 返回内容,字符串类型
    charset: 响应的编码字符集
    status_code: HTTP响应的状态码
"""

"""
hello 为一个视图函数，每个视图函数必须第一个参数为request。哪怕用不到request。
request是django.http.HttpRequest的一个实例
"""


def api(request):
    type_string = request.GET.get('type')
    if type_string == 'get_expert_info':
        que = request.GET.get('expert_id')
        val = get_expert_info_fina.objects.filter(key=que)[0]
        resp = val.req
        resp = json.dumps(eval(resp))
        # resp.replace('"',"@#@").replace("'",'"').replace("@#@",)
        # print(resp)
        return HttpResponse(resp, content_type="application/json")
    if type_string == 'get_topic_info':
        que = request.GET.get('topic_id')
        val = topic_info.objects.filter(key=que)[0]
        resp = val.req
        resp = json.dumps(eval(resp))
        return HttpResponse(resp, content_type="application/json")
    return HttpResponse("Nothing")

# 搜索页面逻辑
def search(request):
    searched_expert_name = request.GET.get('expert_name')
    searched_topic_name = request.GET.get('topic_name')
    if searched_expert_name != None:
        # B神
        expert_id_list = get_expert_search_result_fina(searched_expert_name)
        ans = {}
        for val in expert_id_list:
            expert_info = eval(get_expert_info_fina.objects.filter(key=val[0])[0].req)
            expert_info['author_id'] = val[0]
            ans['expert_info_list'] = ans.get('expert_info_list', []) + [expert_info]
        resp = to_str(ans)
        resp = json.dumps(eval(resp))
        data = json.loads(resp)
        # ---- END
        expert_list = []
        for expert_json_data in data['expert_info_list']:
            tmp = {}
            tmp['expert_name'] = expert_json_data['expert_name']
            tmp['author_id'] = expert_json_data['author_id']
            tmp['image_url'] = expert_json_data['expert_image_url']
            tmp['h_index'] = expert_json_data['expert_score']
            tmp['paper_num'] = eval(expert_json_data["expert_three_num"])[1]
            tmp['citation'] =  eval(expert_json_data["expert_three_num"])[0]
            tmp['discription'] = ''
            tmp['topic_list'] = [ item[0] for item in eval(expert_json_data["expert_area_paper_num_list"])]
            expert_list.append(tmp)
        info_dict = {
            'query_result_number':len(data['expert_info_list']),
            'query_result_content':searched_expert_name,
            'expert_list':expert_list
        }
        # topic_list 长度不要超过5
        # return HttpResponse(resp, content_type="application/json")
        return render(request, "author_result.html", info_dict)
    if searched_topic_name!= None:
        topic_id,expert_id_list=get_expert_search_result_fina2(searched_topic_name)
        return redirect('/topic_info.html?topic_id='+topic_id)
    return HttpResponse("Nothing")


def index(request):
    return render(request, 'index.html')


def author_result(request):
    return render(request, 'author_result.html')


def author_info(request):
    author_id = request.GET.get('author_id')
    data = json.loads(paper_info.objects.filter(author_id=author_id)[0].paper_list_top10)
    paper_list = []
    data = data['paper_list_top10']
    for paper in data:
        tmp = {}
        tmp['title'] = paper[0]
        tmp['author'] = paper[3]
        tmp['topics'] = " ".join(paper[2])
        tmp['citation'] = ''
        tmp['datetime'] = paper[6]
        paper_list.append(tmp)
    info_dict = {
        'paper_list':paper_list
    }
    # print(info_dict['paper_list'])
    return render(request, 'author_info.html', info_dict)

def my_topic_info(request):
    return render(request, 'topic_info.html')