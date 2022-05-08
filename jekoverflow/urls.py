"""jekoverflow URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.db import router
from django.urls import path, include

from rest_framework import routers
from qa.api import viewsets as qaviewsets

'''
route = routers.DefaultRouter()
route.register('questions', qaviewsets.QuestionViewSet, basename="Questions")
#route.register('questions', qaviewsets.question_list, basename="Questions List")
#route.register('questions/<int:id>', qaviewsets.question, basename="Question")

route.register('answers', qaviewsets.AnswerViewSet, basename="Answers")
#route.register('answers', qaviewsets.answer_list, basename="Answers List")
#route.register('answers/<int:id>', qaviewsets.answer, basename="Answers")

route.register('comments', qaviewsets.CommentViewSet, basename="Comments")
#route.register('comments', qaviewsets.answer_list, basename="Comments List")
#route.register('comments/<int:id>', qaviewsets.answer, basename="Comment")
'''

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('qa.urls')),
    #path('api/', include(route.urls)),
]
