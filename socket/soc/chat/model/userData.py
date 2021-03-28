from chat.models import *
import json

class UserData:
    def __init__(self):
        pass

    def addUser(self, roomNumber, userData):
        users = User.objects.filter(InnerRoomNumber=roomNumber, Host="host")
        host = "client"
        if(len(users) == 0):
            host = "host"

        user = User(user_id="noName", user_ip=userData, Host=host,
                haveCard=0, InnerRoomNumber=roomNumber)
        user.save()
        return user

    def getUsers(self):
        user = User.objects.all()
        print(user)
        return user

    def outUsers(self, id):
        user = User.objects.filter(id=id)[0]
        roomNum = user.InnerRoomNumber

        if(user.Host == "host"):
            setHostUser = User.objects.filter(InnerRoomNumber=user.InnerRoomNumber)[0]
            setHostUser.Host = "host"
            setHostUser.save()
        user.delete()
        print("delete user")
        return roomNum

    def delUsers(self):
        user = User.objects.all()
        user.delete()
        return True

    def getUserInRoom(self, room):
        user =User.objects.filter(InnerRoomNumber=room)
        userData = [None] * len(user)
        for index, value in enumerate(user) :
            userData[index] = {"id" : value.id, "user_ip" : value.user_ip, "host" : value.Host, "roomNum" : value.InnerRoomNumber}
        return userData;
# fields=[
#     ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
#     ('user_id', models.CharField(max_length=50)),
#     ('user_ip', models.CharField(max_length=30)),
#     ('Host', models.CharField(max_length=10)),
#     ('haveCard', models.IntegerField()),
#     ('InnerRoomNumber', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.room')),
# ],
