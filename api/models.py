import json
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db import models

default_google_drive_image_url = "https://drive.google.com/file/d/1A5wF1HnsLlBA7G5zJQSZO0s8vRlgxttZ/view?usp=sharing"

# class Instructions(models.Model):
#     stamp = models.TextField(default="stamp instructions")
#     spray = models.TextField(default="spray instructions")
#     check = models.TextField(default="check instructions")

class FilterBible(models.Model):
    part_no = models.TextField(default="0000 or *000-00")
    
    actual_size = models.TextField(default="0.0\"x 0.0\"", null=True)

    instructions = models.TextField(null=True)

    # google_drive_image_urls = ArrayField(
    #     base_field=models.TextField(default=default_google_drive_image_url))
    google_drive_image_urls = models.TextField(default=default_google_drive_image_url)

class Todo(models.Model):
    title = models.CharField(max_length=120, default="0000 or *000-00")
    quantity = models.PositiveIntegerField(default=18) # 18 each or 1 set
    toOil = models.BooleanField(default=False)
    status = models.IntegerField(default=0)
    highPriority = models.BooleanField(default=False)
    partNumber = models.CharField(max_length=20, default="0000 or *000-00")
    lastModified = models.DateTimeField(auto_now=True)
    discarded = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # give the clients a heads-up
        from . import serializers
        async_to_sync(get_channel_layer().group_send)("filter_room", {
            "type": "model_callback",
            "rowData": serializers.Todo(self).data
        })

    def delete(self, *args, **kwargs):
        delete_id = int(self.id) # save id before it gets deleted...
        super().delete(*args, **kwargs)

        # give the clients a heads-up
        from . import serializers
        async_to_sync(get_channel_layer().group_send)("filter_room", {
            "type": "delete_callback",
            "rowData": {**serializers.Todo(self).data, "id": delete_id}
        })

    def __str__(self):
        return f"[{self.id}] {self.title} | {self.quantity}"
