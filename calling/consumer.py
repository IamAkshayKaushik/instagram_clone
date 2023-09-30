import json

from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from django.contrib.auth.models import User


import json
from channels.generic.websocket import AsyncWebsocketConsumer


# class CallingConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         user_id = await self.check_authorization(self.scope['query_string'].decode('utf-8').split('=')[1])
#         if not user_id:
#             return self.close()
#         # Get user from JWT auth
#         self.user = await get_user(user_id)
#         self.chat_box_name = self.scope["url_route"]["kwargs"]["room_name"]
#         self.group_name = "chat_%s" % self.chat_box_name

#         await self.channel_layer.group_add(self.group_name, self.channel_name)

#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(self.group_name, self.channel_name)
#     # This function receive messages from WebSocket.

#     async def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json["message"]
#         username = text_data_json["username"]

#         await self.channel_layer.group_send(
#             self.group_name,
#             {
#                 "type": "chatbox_message",
#                 "message": message,
#                 "username": username,
#             },
#         )
#     # Receive message from room group.

#     async def chatbox_message(self, event):
#         message = event["message"]
#         username = event["username"]
#         # send message and username of sender to websocket
#         await self.send(
#             text_data=json.dumps(
#                 {
#                     "message": message,
#                     "username": username,
#                 }
#             )
#         )

#     @database_sync_to_async
#     def check_authorization(self, token):
#         # Retrieve the token from the WebSocket headers
#         # token = self.scope.get('token')
#         try:
#             # Check if the token is valid
#             if token and AccessToken(token):
#                 # Token is valid, proceed
#                 return AccessToken(token).payload.get('user_id')
#             else:
#                 # Token is invalid, close the connection
#                 self.close()
#         except Exception as e:
#             print(e)
#             self.close()


@database_sync_to_async
def get_user(user_id):
    return User.objects.get(id=user_id)


class CallingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "Test_Room"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print('Disconnected')

    async def receive(self, text_data):
        print('Received')
        print(text_data)
        received_data = json.loads(text_data)
        message = received_data["message"]
        action = received_data['action']

        if (action == 'new-offer') or (action == 'new-answer'):
            receiver_channel_name = received_data['message']['receiver_channel_name']
            received_data['message']['receiver_channel_name'] = self.channel_name
            await self.channel_layer.send(
                receiver_channel_name,
                {
                    "type": "send.sdp",
                    "message": received_data
                }
            )
            return

        received_data['message']['receiver_channel_name'] = self.channel_name

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "send.sdp",
                "message": received_data
            }
        )

    async def send_sdp(self, event):
        message = event["message"]
        await self.send(
            text_data=json.dumps(message)
        )
