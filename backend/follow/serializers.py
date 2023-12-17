from rest_framework import serializers
from .models import Follow
from accounts.serializers import UserSerializer


class FollowSerializer(serializers.ModelSerializer):
    following = UserSerializer(read_only=True)

    # def get_following(self, obj):
    #     return UserSerializer(obj.following).data

    class Meta:
        model = Follow
        fields = ('id', 'following', 'created_at', 'blocked')
