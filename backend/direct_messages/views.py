from rest_framework import generics, permissions
from .serializers import MessageSerializer
from .models import Message
from django.contrib.auth.models import User
from django.db.models import Q


class MessageListView(generics.ListCreateAPIView):
    # queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Message.objects.all().filter(Q(sender=self.request.user) | Q(receiver=self.request.user))

    def perform_create(self, serializer):
        recipient_id = self.request.data.get('receiver')
        recipient_obj = User.objects.get(pk=recipient_id)
        serializer.save(sender=self.request.user, receiver=recipient_obj)
