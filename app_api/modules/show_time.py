import datetime

def show_time_decorator(func):
    def wrapper(*args, **kw):
        print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        result = func(*args, **kw)
        print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        return result
    return wrapper