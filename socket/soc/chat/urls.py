from django.urls import path
from . import views

# urlpatterns = [
#     path('', views.index, name='index'),
#     path('test/DB', views.myTest, name='test'),
#     path('rumi/roomnum', views.roomnum, name='roomnum'),
#     path('<str:room_name>/', views.room, name='room'),
#     path('<str:room_name>/sender/', views.send, name='send'),
#     path('video/<str:room_name>/', views.video, name='video'),
#     path('test/getDB/', views.test, name='dbTest'),
#     path('test/sender/<str:room_name>', views.socTest, name='socT'),
#     path('rumi/chkCard/<str:room_name>', views.chkCard, name='cardChk'),
#     path('rumi/dbTest/room', views.setHost, name='myTTTTest'),
# ]


urlpatterns = [
    #  방접속 > 자동으로 방번호배정 및 유저 등록
    #  리턴값 : 유저 고유 id, ip, roomNum, host or client
    #  KeyValue : id, user_ip, roomNum, host
    path('rumi/insertRoom', views.insertRoom, name='insertRoom'),
    #  room Out :
    #  url room_name > getType ( roomNumber )
    #  where -> roomNum, id > delete DB
    # ex) url + rumi/outUser/{ roomNumber }
    path('rumi/outUser/<str:userID>', views.outRoom, name="outUserRoom"),
    # host Request Link
    # Get CardList
    # Json Type return
    path('rumi/getCard/', views.getCard, name='getCard'),

    # get Data to Json
    path('rumi/checkCard', views.checkCard, name='checkCard'),

    # get User List
    path('rumi/getUsers/<str:roomNum>', views.getRoomUser, name='getUsers'),

    path('rumi/getUserCount/<str:roomNum>', views.getUserCount, name='getUserCount'),

    path('rumi/playGame/<str:roomNum>/<str:roomChk>', views.playGame, name='playGame'),



    path('test/getDB', views.getDB, name='test0'),
    path('test/delRoom', views.roomdel, name='test1'),
    path('test/delUser', views.userdel, name='test8'),
    path('test/getIp', views.getIp, name='test2'),
    path('test/getUser', views.prtTest, name='test3'),
    path('test/getRoomInnerUser/<str:roomNum>', views.prtRoomInnerUser, name='test4'),
    path('test/getRoomList', views.prtRoomList, name='test5'),
    path('test/getUserList', views.getUserList, name='test6'),
    path('test/jsonReturn', views.testJson, name='test7'),
    path('test/out', views.testOut, name='test9'),
    path('test/Post', views.testPost, name='test10'),
    path('test/postT', views.page, name='test11'),
    path('test/webSocket', views.webSocket, name='test12'),
    path('test/webSocket/room/<str:room_num>', views.testRoom, name='testRoom'),
    path('test/webSocket/sender/<str:room_num>', views.testSender, name='testSender'),
]
