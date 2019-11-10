import django
print(django.get_version()) # 2.2.5
d = [['a'],['b']]
import json
s=json.dumps(d)
print(type(s))