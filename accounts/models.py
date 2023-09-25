from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = 'User Profiles'


class RefreshTokenModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    # created_at = models.DateTimeField(auto_now_add=True)  # field is not editable
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.user.username} {self.token}'

    class Meta:
        verbose_name_plural = 'Refresh Tokens'
