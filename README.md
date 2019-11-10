# FinPlus_SearchEngine

FinPlus is a search engine with powerful data mining algorithms covering 20 thousand fileds. Besides basic searching function, it can be used to discover core experts and hot topics in different fields. 

What's more, you can easily obtain fastest growing topics according to  professional statistic analysis. The network of prestigious scholars and potential talents are displayed in a user-friendly visualized way, and more specific information about them are provided.

For a prestigious researcher, besides basic information and publications, FinPlus provides his or her academic community relation diagram. Additionally, their research interests and trend are shown. Highly related researchers are recommended, based on analysis of co-authorship and affiliation.

### Technology

Our team contains six students and I'm responsible for all front-end works and back-end works during three days' competitions.

Out system have three important parts in total:

- Front-end: a modified version of [AMiner](https://www.aminer.cn)
- Back-end: Django framework >= 2.2.x
- Database: MySQL >= 5.6

Because time was life during a short-term competition and my team was in lack of front-end developers, I didn't use Bootstrap or Vue.js. Instead I just referred to asome famous website and modifyied their html and css.

For back-end server, I'm good at flask\Django\PHP. Finally I choose to django just because of it's efficient development capability. Another reason is that my teammates didn't know PHP and most of them only specialized in Python.

MySQL is enough for our work and it's convenient.

### Usage

There are three steps to launch our program:

1. Start Mysql Server: 

   You should start mysql (version >= 5.6) server and set root user's password to toor. Then create a database named Chendu80 according to django's settings in SearchEngineEnd/settings.py.

2. Create tables based on Django's models.py:

   ```shell
   py -3 manage.py makemigrations app_api
   py -3 manage.py migrate app_api
   ```

3. Import all datas into MySQL:

   unzip data/DATA.tar.gz in data/ directory.

   ```shell
   python3 django_json2mysql.py
   python3 import_all_data_final.py
   ```

4. Start django server:

   ```shell
   python3 manage.py runserver 0.0.0.0:80
   ```

Enjoy yourself!

### Screenshots

Index page: 

<div align=center><img width="768" height="503" src="./images/finplus_index.png"/></div>

Core experts with his or her partners in economy fields.

<div align=center><img width="505" height="479" src="./images/network.png"/></div>
