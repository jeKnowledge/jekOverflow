from django.contrib import admin

# Register your models here.
from .models import NewUser, Question, Answer, Comment, Question_Vote, Answer_Vote

admin.site.register(NewUser)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Comment)
admin.site.register(Question_Vote)
admin.site.register(Answer_Vote)