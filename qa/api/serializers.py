from rest_framework import serializers
from qa import models

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NewUser
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Answer
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = '__all__'

class Question_VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question_Vote
        fields = '__all__'

class Answer_VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Answer_Vote
        fields = '__all__'