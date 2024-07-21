from email.mime import base
import time
import json
from flask import jsonify
from matplotlib.font_manager import json_dump
from pymongo import *
from django.shortcuts import render
from importlib_metadata import requires
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import base64
# Create your views here.
from pymongo import MongoClient
client = MongoClient(host="localhost", port=27017)
db = client['STOCK']
times=time.time()
'''
document = {
    "name":"admin",
    "password":"Admin@123",
    "email":"admin@stock.com",
    "phone":9566959372
 }
collection = db.User
result = collection.insert_one(document)
'''

class Login(APIView):
    def parse_json(data):
     return json.loads(json_util.dumps(data))

    def gen_sess(self,passw):
        return passw+str(times)
    def post(self, request):
        details=request.data
        print(request.data)
        passw=request.data['password']
        def user_exist():
         collection = db.User
         result = collection.find({"email":request.data["Email"]})
         l=[]
         for x in result:
            l.append(x) 
         if(len(l)==0):
            return 0
         else:
            return 1
        if(user_exist()==1):
         collection = db.User
         result = collection.find({"email":request.data["Email"]})
         l=[]
         for x in result:
            l.append(x)
         db_pass=l[0]['password']
         print(db_pass)
         if(base64.b64decode(db_pass).decode('utf-8')==passw):
            print("SuccessFull")
            sess_id=Login.gen_sess(self,passw)
            collection = db.Session
            res={
                "q":"LOGIN SUCCESSFULL",
                 "sess":sess_id,
                 "user":request.data['Email']
                }
            session={
                "user":request.data['Email'],
                "sess":sess_id
            }
            result = collection.insert_one(session)
            print(res)
            return Response(res)
         else:
            res={
                "q":"INVALID USERNAME OR PASSWORD",
                }
            print("INVALID USERNAME OR PASSWORD")
            return Response(res)

        
        else:
            res={
                "q":"USER NOT FOUND",
                }
            print("user not found")
            return Response(res)

class Register(APIView):
    def post(self, request):
        details=request.data
        print(request.data)
        def user_exist():
         collection = db.User
         result = collection.find({"email":request.data["email"]})
         l=[]
         for x in result:
            l.append(x)
         if(len(l)==0):
            return 0
         else:
            return 1
        if(user_exist()==1):
         return Response("USER ALREADY EXIST")
        else:
         collection = db.User
         document=request.data
         passw=document['password']
         ssb=passw.encode("ascii")
         b6=base64.b64encode(ssb)
         b6s=b6.decode('ascii')
         document['password']=b6s
         result = collection.insert_one(document)
         return Response("ACCOUNT CREATED SUCCESSFULLY")

class check_exp(APIView):
    def post(self,request):
        print(request.data)
        sess=request.data['sessi']
        mail=request.data['user']

        collection = db.Session
        result=collection.find({"sess":sess})
        l=[]
        for x in result:
            l.append(x)
        
        if(len(l)!=0):
            if(l[0]['user']==mail):
                return Response("1")
        else:
                return Response("0")

class Logout(APIView):
    def post(self,request):
        sess=request.data['sessi']
        mail=request.data['user']
        collection=db.Session
        collection.delete_one({"sess":sess})
        return Response("1")

class fetch(APIView):
    def get(self,request):
        data=[]
        collection = db.Stocks
        res=collection.find()
        for x in res:
            data.append(x)

        for x in data:
            del x['_id']
            print(x)
        return Response((data))

class UpdateStock(APIView):
    def post(self,request):
        collection=db.Stocks
        data=request.data['upDate']
        updata=[]
        for d in data:
            a={}
            a['id']=d['id']
            a['name']=d['name']
            a['price']=d['price']
            a['indate']=d['indate']
            a['edate']=d['edate']
            a['quantity']=d['quantity']
            a['Supplier']=d['Supplier']
            updata.append(a)
        print(updata)
        for d in updata:
            filter={'id':d['id']}
            newvalues={
                "$set":{
                    'name':d['name'],
                'price':d['price'],
               'indate':d['indate'],
                'edate':d['edate'],
                'Supplier':d['Supplier'],
                'quantity':d['quantity']}
            }
            #print(newvalues)
            collection.update_one(filter,newvalues)

        return Response(1)

class addpro(APIView):
    def post(self,request):
        collection=db.Stocks
        data=request.data
        id=data['id']
        d=[]
        res=collection.find({"id":id})
        print(request.data)
        for i in res:
            d.append(i)
        if(len(d)!=0):
            print("ALREADY EXIST")
            return Response(0)
        else:
            collection.insert_one(data)
            return Response(1)

class delpro(APIView):
    def post(self,request):
        collection=db.Stocks
        data=request.data
        ids=[]
        for x in range(0,len(data['selectedProducts'])):
         ids.append(data['selectedProducts'][x]['id'])
        for id in ids:
         collection.delete_one({"id":id})
        return Response(1)


#Employee------------------------------------------
class Efetch(APIView):
    def get(self,request):
        data=[]
        collection = db.Employee
        res=collection.find()
        for x in res:
            data.append(x)

        for x in data:
            del x['_id']
            print(x)
        return Response((data))


class UpdateEmployee(APIView):
    def post(self,request):
        collection=db.Employee
        data=request.data['upDate']
        updata=[]
        for d in data:
            a={}
            a['id']=d['id']
            a['name']=d['name']
            a['phone']=d['phone']
            a['mail']=d['mail']
            a['address']=d['address']
            a['salary']=d['salary']
           
            updata.append(a)
        print(updata)
        for d in updata:
            filter={'id':d['id']}
            newvalues={
                "$set":{
                    'name':d['name'],
                'phone':d['phone'],
               'mail':d['mail'],
                'address':d['address'],
                'salary':d['salary']
                }
            }
            #print(newvalues)
            collection.update_one(filter,newvalues)

        return Response(1)

class addemp(APIView):
    def post(self,request):
        collection=db.Employee
        data=request.data
        id=data['id']
        d=[]
        res=collection.find({"id":id})
        print(request.data)
        for i in res:
            d.append(i)
        if(len(d)!=0):
            print("ALREADY EXIST")
            return Response(0)
        else:
            collection.insert_one(data)
            return Response(1)


class delemp(APIView):
    def post(self,request):
        collection=db.Employee
        data=request.data
        ids=[]
        for x in range(0,len(data['selectedEmployee'])):
         ids.append(data['selectedEmployee'][x]['id'])
        for id in ids:
         collection.delete_one({"id":id})
        return Response(1)

