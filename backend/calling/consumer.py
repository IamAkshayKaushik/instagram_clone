import json

from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
import json
import re


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


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Connected")
        # self.user = self.scope["user"]
        query_params = self._extract_query_params()
        my_user_id = await self._check_authorization(query_params.get('token'))
        other_user_id = query_params.get('receiver_user_id')
        self.other_user_id = other_user_id
        if not my_user_id or not other_user_id:
            return await self.close()
        print(my_user_id, other_user_id)
        self.user = await self._get_user(my_user_id)
        self.room_name = self._get_room_name(my_user_id, other_user_id)
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        print("Disconnected")
        if not self.other_user_id or not self.user.id:
            return await self.close()
        self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        print('Received')
        received_data = json.loads(text_data)
        print(received_data['message'])
        received_data['channel_layer'] = self.channel_name
        if not received_data.get('room_group_name'):
            received_data['room_group_name'] = self.room_group_name
        await self.channel_layer.group_send(received_data['room_group_name'], {
            "type": "send.message",
            "message": received_data
        })

    async def send_message(self, received_data):
        await self.send(text_data=json.dumps(received_data))

    @database_sync_to_async
    def _check_authorization(self, token):
        try:
            if token and AccessToken(token):
                print('Token is valid', AccessToken(token).payload)
                return AccessToken(token).payload.get('user_id')
            else:
                self.close()
        except Exception as e:
            print(self._check_authorization.__name__, e)
            self.close()

    @database_sync_to_async
    def _get_user(self, user_id):
        # Retrieve user from the database based on user_id
        return User.objects.get(id=user_id)

    def _get_room_name(self, user_id1, user_id2):
        if int(user_id1) > int(user_id2):
            return f'{user_id1}-{user_id2}'
        else:
            return f'{user_id2}-{user_id1}'

    def _extract_query_params(self):
        query_params = {}
        query_matches = re.findall(r'([^&=]+)=([^&]+)', self.scope['query_string'].decode('utf-8'))
        for key, value in query_matches:
            query_params[key] = value
        return query_params
