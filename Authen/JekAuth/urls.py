from django.urls import path
from . import views
urlpatterns = [
    path('login/',views.GoogleView.as_view())
]