from django.utils import timezone
from django.db import models
from django.db.models.deletion import CASCADE
from django.utils.translation import gettext_lazy as _


# Create your models here.
class NewUser(models.Model):
    id_token = models.CharField(primary_key=True, max_length=150, unique=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    image = models.CharField(max_length=150, unique=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_('about'), max_length=500, default='About the User')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Question(models.Model):
    user = models.ForeignKey(NewUser, on_delete=CASCADE)
    title = models.CharField(max_length=100)
    body = models.TextField()
    created = models.DateTimeField('date published', auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    vote = models.IntegerField(0)
    n_answers = models.IntegerField(default=0)
    n_views = models.IntegerField(default=0)
    time = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def published(self):
        return (timezone.now() - self.updated).total_seconds()

class Answer(models.Model):
    user = models.ForeignKey(NewUser, on_delete=CASCADE)
    question = models.ForeignKey(Question, on_delete=CASCADE)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    vote = models.IntegerField(0)

    def __str__(self):
        return self.body[0:50]
 

class Comment(models.Model):
    user = models.ForeignKey(NewUser, on_delete=CASCADE)
    answer = models.ForeignKey(Answer, on_delete=CASCADE)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body[0:50]