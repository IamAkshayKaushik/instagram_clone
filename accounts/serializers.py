from rest_framework import serializers
from .models import UserProfile, RefreshTokenModel
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('profile_picture', 'bio')


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile', 'password')
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
    class Meta:
        model = RefreshTokenModel
        fields = ('token', 'created_at')
