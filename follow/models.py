from django.db import models
from django.contrib.auth.models import User


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    created_at = models.DateTimeField(auto_now_add=True)
    blocked = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.follower} follows {self.following}'

    class Meta:
        unique_together = ('follower', 'following')
