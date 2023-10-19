from django.views.generic import TemplateView
from rest_framework import permissions, generics
from .models import Call
from .serializers import CallSerializer
# Create your views here.


class CallingView(TemplateView):
    template_name = 'calling/call.html'


class ChatView(TemplateView):
    template_name = 'calling/chat.html'


class CallListView(generics.ListCreateAPIView):
    # queryset = Call.objects.all()
    serializer_class = CallSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Call.objects.filter(caller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(caller=self.request.user)


# self.room_name = self.scope['url_route']['kwargs']['room_name']
# self.room_group_name = 'call_%s' % self.room_name
