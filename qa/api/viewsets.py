from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from qa.api.serializers import NewUserSerializer, QuestionSerializer, AnswerSerializer, CommentSerializer
from qa.models import NewUser, Question, Answer, Comment


@api_view(['GET'])
def get_routes(request, format=None):
    '''view that returns all the routes of the api'''
    routes = [
        'questions: http://127.0.0.1:8000/api/questions/',
        'answers: http://127.0.0.1:8000/api/answers/',
        'comments: http://127.0.0.1:8000/api/comments/'
    ]
    return Response(routes)

#users
@api_view(['GET', 'POST'])
def user_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all users and/or add new ones'''

    if request.method == 'GET':
        # get all the questions on the data base and serialize the data to return it
        users = NewUser.objects.all()
        serializer = NewUserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # create a new question and serialize it
        serializer = NewUserSerializer(data=request.data)

        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user(request, token, format=None):
    ''' view that manipulates a specific question, selected by it's id,
        in a way that is possible get it's data, update or delete it'''

    # verifies if the question exists through it's id and return a 404 ERROR if not
    try:
        user = NewUser.objects.get(id_token=token)
    except NewUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the question and returns it's data
        serializer = NewUserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # updates the data of an existing question and verifies if it still valid
        serializer = NewUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        # delete the question and returns a no content error
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def user_vote(request, token, format=None):
    '''view that, passed a user by it's token, 
        increments one in their vote's count'''

    if request.method == 'GET':
        # verifies if the user exists through it's token and return a 404 ERROR if not
        try:
            user = NewUser.objects.get(pk=token)            
        except NewUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, adds one and passes it as request's voting field
        request.data['id_token'] = user.id_token
        request.data['username'] = user.username
        request.data['email'] = user.email
        request.data['image'] = user.image
        request.data['start_date'] = user.start_date
        request.data['about'] = user.about
        request.data['is_staff'] = user.is_staff
        request.data['is_active'] = user.is_active
        request.data['reputation'] = user.reputation
        request.data['votes'] = user.votes + 1
        request.data['edits'] = user.edits
        
        # updates the data of an existing user and verifies if it still valid
        serializer = NewUserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_edit(request, token, format=None):
    '''view that, passed a user by it's token, 
        increments one in their edit's count'''

    if request.method == 'GET':
        # verifies if the user exists through it's token and return a 404 ERROR if not
        try:
            user = NewUser.objects.get(pk=token)            
        except NewUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, adds one and passes it as request's voting field
        request.data['id_token'] = user.id_token
        request.data['username'] = user.username
        request.data['email'] = user.email
        request.data['image'] = user.image
        request.data['start_date'] = user.start_date
        request.data['about'] = user.about
        request.data['is_staff'] = user.is_staff
        request.data['is_active'] = user.is_active
        request.data['reputation'] = user.reputation
        request.data['votes'] = user.votes
        request.data['edits'] = user.edits + 1
        
        # updates the data of an existing user and verifies if it still valid
        serializer = NewUserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_repUP(request, token, format=None):
    '''view that, passed a user by it's token, 
        increments in ten units theirs reputation'''

    if request.method == 'GET':
        # verifies if the user exists through it's token and return a 404 ERROR if not
        try:
            user = NewUser.objects.get(pk=token)            
        except NewUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, adds one and passes it as request's voting field
        request.data['id_token'] = user.id_token
        request.data['username'] = user.username
        request.data['email'] = user.email
        request.data['image'] = user.image
        request.data['start_date'] = user.start_date
        request.data['about'] = user.about
        request.data['is_staff'] = user.is_staff
        request.data['is_active'] = user.is_active
        request.data['reputation'] = user.reputation + 10
        request.data['votes'] = user.votes
        request.data['edits'] = user.edits
        
        # updates the data of an existing user and verifies if it still valid
        serializer = NewUserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_repDOWN(request, token, format=None):
    '''view that, passed a user by it's token, 
        decrements in two units theirs reputation'''

    if request.method == 'GET':
        # verifies if the user exists through it's token and return a 404 ERROR if not
        try:
            user = NewUser.objects.get(pk=token)            
        except NewUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, adds one and passes it as request's voting field
        request.data['id_token'] = user.id_token
        request.data['username'] = user.username
        request.data['email'] = user.email
        request.data['image'] = user.image
        request.data['start_date'] = user.start_date
        request.data['about'] = user.about
        request.data['is_staff'] = user.is_staff
        request.data['is_active'] = user.is_active
        request.data['reputation'] = user.reputation - 2
        request.data['votes'] = user.votes
        request.data['edits'] = user.edits
        
        # updates the data of an existing user and verifies if it still valid
        serializer = NewUserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# questions
@api_view(['GET', 'POST'])
def question_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all questions and/or add new ones'''

    if request.method == 'GET':
        # get all the questions on the data base and serialize the data to return it
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # create a new question and serialize it
        serializer = QuestionSerializer(data=request.data)
        request.data['vote']=0

        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid() and request.data['vote']==0:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['GET'])
def question_voteUp(request, id, format=None):
    '''view that, passed a question by it's id, 
        increments one vote in this question'''

    if request.method == 'GET':
        # verifies if the question exists through it's id and return a 404 ERROR if not
        try:
            question = Question.objects.get(pk=id)            
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, adds one and passes it as request's voting field
        request.data['vote'] = question.vote + 1
        request.data['title'] = question.title
        request.data['body'] = question.body
        request.data['n_answers'] = question.n_answers
        request.data['n_views'] = question.n_views
        request.data['user'] = question.user.id_token
        request.data['created'] = question.created
        request.data['updated'] = question.updated
        request.data['bountied'] = question.bountied
        
        # updates the data of an existing question and verifies if it still valid
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def question_voteDown(request, id, format=None):
    '''view that, passed a question by it's id, 
        decrements one vote in this question'''

    if request.method == 'GET':
        # verifies if the question exists through it's id and return a 404 ERROR if not
        try:
            question = Question.objects.get(pk=id)            
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, subtracts one and passes it as request's voting field
        request.data['vote'] = question.vote - 1
        request.data['title'] = question.title
        request.data['body'] = question.body
        request.data['n_answers'] = question.n_answers
        request.data['n_views'] = question.n_views
        request.data['user'] = question.user.id_token
        request.data['created'] = question.created
        request.data['updated'] = question.updated
        request.data['bountied'] = question.bountied

        # updates the data of an existing question and verifies if it still valid
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def question_viewUPDT(request, id, format=None):
    '''view that, passed a question by it's id, 
        increments one view in this question'''

    if request.method == 'GET':
        # verifies if the question exists through it's id and return a 404 ERROR if not
        try:
            question = Question.objects.get(pk=id)            
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, subtracts one and passes it as request's voting field
        request.data['n_views'] = question.n_views + 1
        request.data['vote'] = question.vote
        request.data['title'] = question.title
        request.data['body'] = question.body
        request.data['n_answers'] = question.n_answers
        request.data['user'] = question.user.id_token
        request.data['created'] = question.created
        request.data['updated'] = question.updated
        request.data['bountied'] = question.bountied
        
        # updates the data of an existing question and verifies if it still valid
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def question_nanswersUPDT(request, id, format=None):
    '''view that, passed a question by it's id, 
        increments one view in this question'''

    if request.method == 'GET':
        # verifies if the question exists through it's id and return a 404 ERROR if not
        try:
            question = Question.objects.get(pk=id)            
        except Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # gets the current number of votes, subtracts one and passes it as request's voting field
        request.data['n_answers'] = question.n_answers + 1
        request.data['vote'] = question.vote
        request.data['title'] = question.title
        request.data['body'] = question.body
        request.data['n_views'] = question.n_views
        request.data['user'] = question.user.id_token
        request.data['created'] = question.created
        request.data['updated'] = question.updated
        request.data['bountied'] = question.bountied
        
        # updates the data of an existing question and verifies if it still valid
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# answers
@api_view(['GET', 'POST'])
def answer_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all answers and/or add new ones'''

    if request.method == 'GET':
        # get all the answers on the data base and serialize the data to return
        answers = Answer.objects.all()
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # create a new answers and serialize it
        serializer = AnswerSerializer(data=request.data)
        request.data['vote']=0

    # verifies if the serialized data is valid and, if yes, save it
    if serializer.is_valid() and request.data['vote']==0:
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['GET'])
def answer_voteUp(request, id, format=None):
    '''view that, passed an answer by it's id, 
        increments one vote in this answer'''

    # verifies if the answer exists through it's id and return a 404 ERROR if not
    try:
        answer = Answer.objects.get(pk=id)            
    except Answer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # gets the current number of votes, adds one and passes it as request's voting field
    request.data['vote'] = answer.vote + 1
    request.data['user'] = answer.user.id_token
    request.data['body'] = answer.body
    request.data['question'] = answer.question.id
    request.data['created'] = answer.created
    request.data['updated'] = answer.updated
    
    # updates the data of an existing answer and verifies if it still valid
    serializer = AnswerSerializer(answer, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def answer_voteDown(request, id, format=None):
    '''view that, passed an answer by it's id, 
        increments one vote in this answer'''

    # verifies if the answer exists through it's id and return a 404 ERROR if not
    try:
        answer = Answer.objects.get(pk=id)            
    except Answer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # gets the current number of votes, subtracts one and passes it as request's voting field
    request.data['vote'] = answer.vote - 1
    request.data['user'] = answer.user.id_token
    request.data['body'] = answer.body
    request.data['question'] = answer.question.id
    request.data['created'] = answer.created
    request.data['updated'] = answer.updated
    
    # updates the data of an existing answer and verifies if it still valid
    serializer = AnswerSerializer(answer, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# comments
@api_view(['GET', 'POST'])
def comment_list(request, format=None):
    if request.method == 'GET':
        # get all the comments on the data base and serialize the data to return
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
         # create a new comment and serialize it
        serializer = CommentSerializer(data=request.data)
    
    # verifies if the serialized data is valid and, if yes, save it
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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