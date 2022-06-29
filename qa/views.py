from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from qa.models import NewUser, Question, Answer, Comment

# Create your views here.