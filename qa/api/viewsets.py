from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from qa.api.serializers import QuestionSerializer, AnswerSerializer, CommentSerializer
from qa.models import Question, Answer, Comment


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class AnswerViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


# questions
@api_view(['GET', 'POST'])
def question_list(request, format=None):
    ''' view that give us the possibility of get a 
        list of all questions and/or add new ones'''

    if request.method == 'GET':
        # get all the questions on the data base and serialize the data to return it
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # create a new question and serialize it
        serializer = QuestionSerializer(data=request.data)

        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def question(request, id, format=None):
    ''' view that manipulates a specific question, selected by it's id,
        in a way that is possible get it's data, update or delete it'''

    # verifies if the question exists through it's id and return a 404 ERROR if not
    try:
        question = Question.objects.get(pk=id)            
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the question and returns it's data
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # updates the data of an existing question and verifies if it still valid
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        # delete the question and returns a no content error
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#def question_vote(request)


# answers
@api_view(['GET', 'POST'])
def answer_list(request, format=None):
    ''' view that give us the possibility of get a 
        list of all answers and/or add new ones'''

    if request.method == 'GET':
        # get all the answers on the data base and serialize the data to return
        answers = Answer.objects.all()
        serializer = Answer(answers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # create a new answers and serialize it
        serializer = AnswerSerializer(data=request.data)

        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# one specific answer
# can get the data of this answer, update or delete it
@api_view(['GET', 'PUT', 'DELETE'])
def answer(request, id, format=None):
    ''' view that manipulates a specific answer, selected by it's id,
        in a way that is possible get it's data, update or delete it'''

    # verifies if the answer exists through it's id and return a 404 ERROR if not
    try:
        answer = Answer.objects.get(pk=id)            
    except Answer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the answer and returns it's data
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # updates the data of an existing answer and verifies if it still valid
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        # delete the answer and returns a no content error
        answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#def answer_vote(request)




@api_view(['GET', 'POST'])
def comment_list(request, format=None):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = Comment(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def comment(request, id, format=None):
    try:
        comment = Comment.objects.get(pk=id)            
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)