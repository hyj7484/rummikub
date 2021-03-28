from django.shortcuts import render
import random ;
from django.http import HttpResponse, JsonResponse
from . import models
from .model.insertRoom import *
from .model.randomCard import *
from .model.roomData import *
from .model.userData import *
from .models import *
import json

# def view(request):
#        if request.method == 'POST':
#            roll_number = request.POST['roll_number']
#            # You can now manipulate the form data.

# Create your views here.
def index(request):
    return render(request, 'chat/index.html')

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })
def myTest(res):
    makeRoom()
    return JsonResponse({'a':100})

def send(request, room_name):
    return render(request, 'chat/send.html',{
        'room_name' : room_name
    })

def video(request, room_name):
    return render(request, 'chat/getImage.html',{
        'room_name' : room_name
    })

# 방번호배정하기
def roomnum(req) :
    data ={
        'roomNumber' : 100
    }
    return JsonResponse(data)

def socTest(req, room_name):
    return render(req, 'chat/test.html',{
    'room_name' : room_name
    })

def setHost(req):
    room = RoomData()
    t = room.prt()
    data ={
        'roomNumber' : 100
    }
    # print(t)
    return JsonResponse(data)


def chkCard(req, room_name):

    return JsonResponse()



"""
유저 관리 DB 구축 -> 호스트 지정 -> 카드 배분

"""
# test room del
def roomdel(req):
    room = RoomData()
    room.delRooms()
    return HttpResponse('suc delRooms')

def userdel(req):
    user = UserData()
    user.delUsers()
    return HttpResponse('suc delUsers')


def prtTest(req):
    user = UserData()
    user.getUsers()
    return HttpResponse("H")

def prtRoomList(req):
    room = Room.objects.all()
    print(room)
    return HttpResponse("suc roomList")

def getUserList(req):
    user = User.objects.all()
    for i in user:
        print(i.id)
        print(i.Host)
        print(i.InnerRoomNumber)
        print('------------')
    return HttpResponse("suc userList")

def prtRoomInnerUser(req, roomNum):
    room = Room.objects.get(pk=roomNum)
    print(room.InnerUsers)
    return HttpResponse("suc RoomListInnerUser")

def getIp(req):
    x_forwarded_for = req.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = req.META.get('REMOTE_ADDR')
    return HttpResponse(ip)

def delUserAll(req):
    user = User.objects.all()
    user.delete()
    return HttpResponse("suc")

def testJson(req):
    data = {
    "key" : 100
    }
    return JsonResponse(data)

def getDB(req):
    return HttpResponse("h")

def testOut(req):
    return render(req, 'chat/room.html', {
        'room_name': 10
    })

def testPost(req):
    if req.method == 'POST':
        print("hello")
        print(req.POST)
    return HttpResponse("POST Succes")

def page(req):
    return render(req, 'chat/test.html')

def webSocket(req):
        return render(req, 'chat/send.html',{
            'room_name' : 'myTestSocket'
        })

def testRoom(req, room_num):{

}

def testSender(req, room_num):
    return render(req, 'chat/send.html',{
        'room_name' : room_num
    })

def testRoom(req, room_num):
    return render(req, 'chat/room.html',{
        'room_name' : room_num
    })

# ---------------------------------------------------
#  getRoomNumber -> return roomNumber to json

def insertRoom(req):
    # ---------------  get Ip ------------------------------
    x_forwarded_for = req.META.get('HTTP_X_FORWARDED_FOR')
    ip = 0
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = req.META.get('REMOTE_ADDR')
    # -------------------------------------------------------

    room = RoomData()
    user = UserData()

    roomNumber = room.getRoomNumber()
    userData = user.addUser(roomNumber, ip)
    room.InnerRoomUser(roomNumber)
    JsonUser = {
        "id" : userData.id,
        "user_ip" : userData.user_ip,
        "roomNum" : userData.InnerRoomNumber,
        "host" : userData.Host
    }
    print(JsonUser)
    return JsonResponse(JsonUser)

def outRoom(req, userID):
    room = RoomData()
    user = UserData()
    roomNum = user.outUsers(userID)
    room.outUser(roomNum)
    print("Out User")
    return HttpResponse("Out Succes")

def getCard(req):
    cardList = CardList()
    jsonList = [None] * 106
    for index, value in enumerate(cardList.cardList):
        jsonList[index] = {'id' : value.getId(), 'num' : value.getNumber(), 'color' : value.getColor()}
    jsonDec = {"cardList" : jsonList}
    print(jsonDec)
    print()
    return JsonResponse(jsonDec)

def getRoomUser(req, roomNum):
    userObj = UserData()
    user = userObj.getUserInRoom(roomNum)
    return JsonResponse({"userList" : user})

def getUserCount(req, roomNum):
    roomObj = RoomData()
    room = roomObj.getUserCount(roomNum)
    data = {
        "userCount" : room
    }
    return JsonResponse(data)

def checkCard(req):
    # colorListt = {'#263238' : '검', '#d32f2f' : '빨강', '#f57f17' : '주황', '#283593' : '파랑'}
    # key Name = {'color': '#283593', 'num': 12, 'type': 'userTail', 'id': 11}
    # hidden = num : -1
    #
    chk = True
    if req.method == 'POST':
        # print(req.POST[])
        #
        # { tailList : [
        #   [ object ],
        #   [ object ],
        #   [ object ],
        #   [ object ],
        # ]}
        cardList = req.POST['tailList']
        cardList = json.loads(cardList)['tailList']
        # cardList = {"cardList" : json.loads(cardList)}
        for index , value in enumerate(cardList):
            print(len(value), "len Value")
            if len(value) == 0 :
                print("delete")
                print(index)
                cardList.pop(index)
        print()




        for index , value in enumerate(cardList):
            print(len(value), "len Value")
            if len(value) == 0 :
                print("delete")
                del cardList[index]

        print()
        cardData = {}
        for index, value in enumerate(cardList) :
            print(value, 'this is print value')
            print(index, 'this is print index')
            dic = {index : True}
            cardData.update(dic)
            if len(value) < 3:
                print('count False')
                print(len(value), 'to Count ')
                dic = {index : False}
                cardData.update(dic)
                continue

            for i in value :
                if i['num'] != -1 :
                    c = i['color']
                    break

            # 비교형식 체크
            # True : 동일한색 다른숫자
            # False : 다른색상 동일한 숫자
            a = True
            for i in value :
                if i['color'] != c and i['num'] != -1 :
                    a = False
                    break
            c = 0
            colorlist = [0, 0, 0, 0]
            for i in value :
                if a :
                    if c == 0 :
                        if i['num'] != -1 :
                            c = i['num']
                    elif c+1 == i['num'] :
                        c = i['num']
                    elif i['num'] == -1 :
                        c += 2
                    else :
                        print('number False')
                        dic = {index : False}
                        cardData.update(dic)
                else :
                    if i['color'] == 'Black':
                        colorlist[0] += 1
                    elif i['color'] == 'Blue':
                        colorlist[1] += 1
                    elif i['color'] == 'Red':
                        colorlist[2] += 1
                    elif i['color'] == 'Orange':
                        colorlist[3] += 1
                    for colorC in colorlist :
                        if colorC > 1 :
                            dic = {index : False}
                            cardData.update(dic)
                    if len(value) > 4 :
                        print(value)
                        print(len(value))
                        print('color Over False')
                        dic = {index : False}
                        cardData.update(dic)
                        continue
                    if c == 0 :
                        if i['num'] == -1 :
                            pass
                        else :
                            c = i['num']
                    elif c == i['num'] :
                        pass
                    elif i['num'] == -1:
                        pass
                    else :
                        print("else card")
                        dic = {index : False}
                        cardData.update(dic)
    print('cardData Print ', cardData)
    data = { "status" : cardData}
    return JsonResponse(data)

def playGame(req, roomNum, roomChk):
    room = RoomData()
    room.playGame(roomNum, roomChk)
    print("succes play game")
    return HttpResponse("succes setting")
