from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests


class GoogleView(APIView):
    def post(self, request):
        payload = {'id_token': request.data.get('token')}
        try:
            idinfo = id_token.verify_oauth2_token(payload['id_token'], requests.Request(),'707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com')

            verified = idinfo['email_verified'] 

            if verified:
                try:
                    user = User.objects.get(email= idinfo['email'])
                    print("user found: %s" % user)
                except User.DoesNotExist:
                     user = User()
                     user.username = idinfo['name']
                     user.password = make_password(BaseUserManager().make_random_password())
                     user.email = idinfo['email']
                     user.save()

                try:
                     token = RefreshToken.for_user(user)
                     response = {}
                     response['status'] = "found"
                     response['username'] = user.username
                     response['refresh_token'] = str(token)
                     return Response(response)

                except Exception as e:
                    print("error: %s" % e)
                    return Response({'error': "Error while creating token"}, status=400)

            else:
                return Response({"error": "Email Not Verified"}, status=400)


        except ValueError as e:
            print(e)
            print("Invalid token sent")
            return Response({"error": "Invalid token."}, status=400)              
                    