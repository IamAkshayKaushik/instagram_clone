from rest_framework import serializers
from .models import Post, Comment, Shares, Likes


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {
            "user": {"required": False}
        }


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('__all__')
        extra_kwargs = {
            "user": {"required": False},
            "post": {"required": False}
        }

    def create(self, validated_data):
        # validated_data['user'] = self.context['request'].user
        user = self.context['request'].user
        post = validated_data['post']
        likes, created = Likes.objects.get_or_create(user=user, post=post)
        if not created:
            likes.delete()
            return likes
        likes.save()
        return likes


class SharesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shares
        fields = ('__all__')
        extra_kwargs = {
            "user": {"required": False}
        }


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    total_comments = serializers.SerializerMethodField()
    total_shares = serializers.SerializerMethodField()
    total_likes = serializers.SerializerMethodField()
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def get_total_comments(self, obj):
        return obj.comments.count()

    def get_total_shares(self, obj):
        return obj.shares.count()

    def get_total_likes(self, obj):
        return obj.likes.count()

    class Meta:
        model = Post
        fields = (
            'id',
            'user',
            'content',
            'image_or_video',
            # 'likes',
            # 'shares',
            'comments',
            'total_comments',
            'total_shares',
            'total_likes')
        extra_kwargs = {
            "user": {"required": False},
            # "comments": {'many': True, 'read_only': True}
        }
