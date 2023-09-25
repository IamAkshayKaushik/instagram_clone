from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    image_or_video = models.FileField(upload_to="post_media/")
    likes = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    shares = models.ManyToManyField(User, related_name="shared_posts", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Post by {self.user.username}'


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    comment = models.TextField()

    def __str__(self):
        return f'Comment by {self.user.username} on post by {self.post.user.username}'
