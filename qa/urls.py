from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from qa.api import viewsets

app_name='qa'
urlpatterns = [
    path('', viewsets.get_routes),
    path('users/', viewsets.user_list),
    path('users/<str:token>/', viewsets.user),
    path('users/<str:token>/vote/', viewsets.user_vote),
    path('users/<str:token>/edit/', viewsets.user_edit),
    path('users/<str:token>/rep-up/', viewsets.user_repUP),
    path('users/<str:token>/rep-down/', viewsets.user_repDOWN),
    path('questions/', viewsets.question_list),
    path('questions/<int:id>/', viewsets.question),
    path('questions/<int:id>/vote-up/', viewsets.question_voteUp),
    path('questions/<int:id>/vote-down/', viewsets.question_voteDown),
    path('questions/<int:id>/nview-update/', viewsets.question_viewUPDT),
    path('questions/<int:id>/nanswers-update/', viewsets.question_nanswersUPDT),
    path('answers/', viewsets.answer_list),
    path('answers/<int:id>/', viewsets.answer),
    path('answers/<int:id>/vote-up/', viewsets.answer_voteUp),
    path('answers/<int:id>/vote-down/', viewsets.answer_voteDown),
    path('comments/', viewsets.comment_list),
    path('comments/<int:id>/', viewsets.comment),
]

urlpatterns = format_suffix_patterns(urlpatterns)