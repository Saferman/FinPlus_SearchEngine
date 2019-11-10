from django.db import models

# Create your models here.

# author_id,paper_num,ccnt,score,name,org_id,currentInstitution,author_list
class get_expert_info_fina(models.Model):
    key = models.TextField()
    req = models.TextField()

class topic_info(models.Model):
    key = models.TextField()
    req = models.TextField()

class paper_info(models.Model):
    author_id = models.TextField()
    paper_list_top10 = models.TextField()
