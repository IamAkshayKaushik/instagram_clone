from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile, RefreshTokenModel
from .serializers import UserProfileSerializer, UserSerializer, RefreshTokenSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user=user)
            refresh_token = RefreshTokenModel.objects.create(user=user, token=str(refresh))
            refresh_token.save()
            access_token = refresh.access_token
            response_data = {
                'access_token': str(access_token),
                'refresh_token': str(refresh_token)
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
