from .models import Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        extra_kwargs = {
            'sender': {'required': False},
            # 'receiver': {'required': False}
        }

    # def create(self, validated_data):
    #     user = self.context['request'].user
    #     receiver = validated_data['receiver']
    #     message = validated_data['message']
    #     message, created = Message.objects.get_or_create(sender=user, receiver=receiver, message=message)
    #     if not created:
    #         return message
    #     return created
