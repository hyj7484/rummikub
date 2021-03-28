from django.conf import settings
from django.db import models
from django.utils import timezone

# Room Table
# 인원수, 방번호, 게임중 여부

class Room(models.Model):
    InnerUsers = models.IntegerField()
    play = models.IntegerField()


# User Table
# 방번호, id, ip, 호스트, 보유카드수
class User(models.Model):
    InnerRoomNumber = models.IntegerField()
    user_id = models.CharField(max_length=50)
    user_ip = models.CharField(max_length=30)
    Host = models.CharField(max_length=10)
    haveCard = models.IntegerField()
