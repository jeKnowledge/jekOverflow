from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from qa.api import viewsets

app_name='qa'
urlpatterns = [
    path('', viewsets.get_routes),
    path('questions/', viewsets.question_list),
    path('questions/<int:id>/', viewsets.question),
    path('questions/<int:id>/vote-up/', viewsets.question_voteUp),
    path('questions/<int:id>/vote-down/', viewsets.question_voteDown),
    path('answers/', viewsets.answer_list),
    path('answers/<int:id>/', viewsets.answer),
    path('answers/<int:id>/vote-up/', viewsets.answer_voteUp),
    path('answers/<int:id>/vote-down/', viewsets.answer_voteDown),
    path('comments/', viewsets.answer_list),
    path('comments/<int:id>/', viewsets.answer),
]

urlpatterns = format_suffix_patterns(urlpatterns)