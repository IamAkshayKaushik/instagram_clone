from rest_framework import serializers
from .models import Post, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user', 'comment')
        extra_kwargs = {
            "user": {"required": False}
        }


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    comments_count = serializers.SerializerMethodField()
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def get_comments_count(self, obj):
        return obj.comments.count()

    class Meta:
        model = Post
        fields = ('id', 'user', 'content', 'image_or_video', 'likes', 'shares', 'comments', 'comments_count')
        extra_kwargs = {
            "user": {"required": False}
        }
