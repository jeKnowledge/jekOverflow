from django.contrib import admin
from django.urls import path
from JekAuth import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.GoogleView.as_view(), name='google'),
]