from chat.models import *

class RoomData:
    def __init__(self):
        pass

    def delRooms(self):
        room = Room.objects.all()
        room.delete()
        return True

    def getRoomNumber(self):
        room = Room.objects.exclude(InnerUsers=4)&Room.objects.filter(play=0)
        if len(room) == 0:
            room = Room(InnerUsers=0, play=0)
            room.save()
            return room.id
        # print('play Room = ',room[0].play)
        return room[0].id

    def InnerRoomUser(self, room_id):
        # print(room_id, "room id ")
        room = Room.objects.filter(id=room_id)[0]
        # print(room, "Room Obj")
        # print(room.id, 'inner User')
        room.InnerUsers = int(room.InnerUsers) + 1
        # print(room.InnerUsers)
        room.save()
        return room

    def outUser(self, room_id):
        room = Room.objects.filter(id=room_id)[0]
        room.InnerUsers = int(room.InnerUsers) - 1
        room.save()
        if(room.InnerUsers == 0):
            room.delete()
            print("delete Room")
        return True

    def getUserCount(self, roomId):
        room = Room.objects.filter(id=room_id)[0]
        return room.InnerUsers

    def playGame(self, roomNum, chk):
        room = Room.objects.filter(id=roomNum)[0]
        room.play = chk
        room.save()
        print(room.play)
        return room
