from rest_framework import serializers
from .models import UserProfile, RefreshTokenModel
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('profile_picture', 'bio')


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile',
                  'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)
        return user


class RefreshTokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = RefreshTokenModel
        fields = ('token', 'user', 'created_at')


class UserSerializerWithToken(UserSerializer):
    # token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

    # def get_token(self, obj):
    #     token = RefreshToken.for_user(obj)
    #     return str(token.access_token)
