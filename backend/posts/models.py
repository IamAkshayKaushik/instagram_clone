from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    image_or_video = models.FileField(upload_to="post_media/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Post by {self.user.username}'


class Shares(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="shares")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Share by {self.user.username} on post by {self.post.user.username}'


class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Like by {self.user.username} on post by {self.post.user.username}'


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    comment = models.TextField()

    def __str__(self):
        return f'Comment by {self.user.username} on post by {self.post.user.username}'
