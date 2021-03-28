# User Table Column
# id (auto_increment), user_id (CharField), user_ip (CharField),
# Host (CharField), haveCard (IntegerField), InnerRoomNumber ( ForeignKey )

from chat.models import *

def testPrt():
    print("hello")

def insertUser(JsonData):
    user = User(user_id=JsonData['user_id'], user_ip=JsonData['user_ip'], Host=JsonData['host'],
            haveCard=JsonData['haveCard'], InnerRoomNumber=0)
    user.save()
    print(user.id)
    return user.id

def makeRoom():
    # ('InnerUsers', models.IntegerField()),
    room = Room(InnerUsers=0)
    room.save()
    print(room.id)
    return room.id

def InputRoom(roomNumber, user_Id):
    user = User.objects.get(pk=user_Id)
    room = Room.objects.get(pk=roomNumber)
    user.InnerRoomNumber = room.id
    room.InnerUsers += 1
    user.save()
    room.save()
    return room, user
