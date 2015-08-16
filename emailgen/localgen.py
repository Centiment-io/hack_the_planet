import pymongo
con=pymongo.MongoClient()
db=con['CONNECTIONS']
col=db['email']
col2=db['userdata']
getemail=lambda x:list(col2.find({"num":str(x)}))[0]["email"]
def push(i,j):
    col.insert({"from":getemail(i),"to":getemail(j),"body":"hi","muse":0.5})


pusharray=dict()
pusharray[6]=[0,1,2,3,4,5]
pusharray[5]=[4,13]
pusharray[4]=[13]
pusharray[13]=[15,12]
pusharray[12]=[7,8,9,10,11,14]
pusharray[14]=[15]
pusharray[15]=[17,16,26]
pusharray[17]=[18]
pusharray[18]=[23]
pusharray[23]=[19,20,21,22]
pusharray[26]=[25,27,28,29]
pusharray[25]=[24]

for i in pusharray.items():
    a=i[0]
    for b in i[1]:
        push(a,b)
        push(b,a)
