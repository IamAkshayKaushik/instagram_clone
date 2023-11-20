from .models import Call
from rest_framework import serializers


class CallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Call
        fields = ('recipient', 'start_time', 'end_time', 'on_call')
