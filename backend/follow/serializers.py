from rest_framework import serializers
from .models import Follow


class FollowSerializer(serializers.ModelSerializer):
    following_username = serializers.ReadOnlyField(source='following.username')

    class Meta:
        model = Follow
        fields = ('id', 'following', 'following_username', 'created_at', 'blocked')
