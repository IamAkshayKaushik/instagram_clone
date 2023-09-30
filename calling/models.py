from django.db import models
from django.contrib.auth.models import User


class Call(models.Model):
    caller = models.ForeignKey(User, related_name='caller', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='recipient', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    on_call = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.caller} called {self.recipient}"
