import time, json, asyncio
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from . import models

class ApiConsumer(WebsocketConsumer):

   def connect(self):

      # set up channel layer (needed for onSave model event)
      self.room_group_name = "filter_room"
      async_to_sync(self.channel_layer.group_add)(
         self.room_group_name,
         self.channel_name
      )
      print("channel layer setup success:", self.room_group_name)

      # finish connecting
      self.accept()

   def receive(self, text_data):

      # set up channel layer receive functionality
      text_data_json = json.loads(text_data)
      rowData = text_data_json["rowData"]
      async_to_sync(self.channel_layer.group_send)(
         self.room_group_name, 
         {
            "type": "model_callback",
            "rowData": rowData 
         }
      )

   def model_callback(self, event):
      message = event["rowData"] 
      self.send(text_data=json.dumps({
         "type": "update/create",
         "rowData": message
      }))

   def delete_callback(self, event):
      message = event["rowData"] 
      self.send(text_data=json.dumps({
         "type": "delete",
         "rowData": message
      }))