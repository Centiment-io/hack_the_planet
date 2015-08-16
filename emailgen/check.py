import pymongo
import random

con=pymongo.MongoClient()
db=con['CONNECTIONS']
col=db['email']
col2=db['email_detailed']
print('number of emails')
print(col.count())
print('detailed')
print(col2.count())
