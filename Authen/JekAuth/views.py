from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt
import datetime


class GoogleView(APIView):
    def post(self, request):
        payload = {'id_token': request.data.get('token')}
        try:
            idinfo = id_token.verify_oauth2_token(payload['id_token'], requests.Request(),'707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com')

            mail = idinfo['email']
            verified = idinfo['email_verified'] 

            if verified:
                try:
                    user = User.objects.get(email=mail)
                    print(user)
                    print("user found: %s" % user)
                except User.DoesNotExist:
                    return Response(
                        {
                            "status": "Not found",
                            "user_email": mail,
                            "first_name": idinfo['given_name'],
                            "last_name": idinfo['family_name'],
                            "message": "User not found. Please register"
                        })

                try:
                    jwtsecret = "KHYgoJGsDAtgx4dthV6IHl8GWBVL7bPVhygOwNx1cJyC0mMcsuZBCRI6jcv2V8z"
                    encoded_jwt = jwt.encode(
                        {
                            'email': mail,
                            'username': user.username,
                            'first_name': user.first_name,
                            'last_name': user.last_name,
                            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                        }, jwtsecret, algorithm='HS256')

                    print("token: %s" % encoded_jwt)  

                    return Response({
                        "status": "found",
                        'token': encoded_jwt,
                        'user': {
                            'email': mail,
                            'username': user.username,
                            'first_name': user.first_name,
                            'last_name': user.last_name,
                        },
                    })

                except Exception as e:
                    print("error: %s" % e)
                    return Response({'error': "Error while creating token"}, status=400)

            else:
                return Response({"error": "Email Not Verified"}, status=400)


        except ValueError as e:
            print(e)
            print("Invalid token sent")
            return Response({"error": "Invalid token."}, status=400)              
                    