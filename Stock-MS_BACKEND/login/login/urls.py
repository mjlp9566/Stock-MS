from django.contrib import admin
from django.urls import path, include

from core.views import *
  
urlpatterns = [
   
    path('admin/', admin.site.urls),
    path('api/login', Login.as_view(), name="rest_Api"),
    path('api/register', Register.as_view(), name="rest_Api"),
    path('api/check_exp', check_exp.as_view(), name="rest_Api"),
    path('api/logout',Logout.as_view(),name="Logout"),
    path('api/fetch',fetch.as_view(),name="fetch"),
    path('api/addpro',addpro.as_view(),name="addp"),
    path('api/delpro',delpro.as_view(),name="delp"),
    path('api/upstock',UpdateStock.as_view(),name="upstock"),
     path('api/Efetch',Efetch.as_view(),name="Efetch"),
      path('api/upemp',UpdateEmployee.as_view(),name="upemp"),
      path('api/addemp',addemp.as_view(),name="addemp"),
      path('api/delemp',delemp.as_view(),name="delemp")
   
]