import React, { useEffect, useState, useRef } from 'react' ;
import styled from 'styled-components' ;

import LeftSection from './RoomLeftSection' ;
import CenterSection from './RoomCenterSection' ;
import RightSection from './RoomRightSection' ;

import { connect } from 'react-redux' ;
import { createAction } from '../store' ;

import api from '../api' ;
import { IP } from './util' ;

const Container = styled.div`
    width : 100% ;
    height : 100% ;

    margin : 0 auto ;
    display : flex ;
`;

const StartContainer = styled.div`
    display : ${props => props.display } ;

    position : fixed ;
    
    width : 100% ;
    height : 100% ;

    z-index : 100 ;

    background-color : rgba(0, 0, 0, 0.8) ;
`;

const Button = styled.button`
    position : absolute ;
    
    top : 50% ;
    left : 50% ;

    z-index : 101 ;
`;

const Room = ({ 
    getCard, 
    socketAnthorTail, 
    tails,
    removeTails,
    getUserCard,
    myTurn,
    nextTurn,
    preious,
    addAnthorTail
}) => {

    const [ user, setUser ] = useState(null) ;
    const [ start, setStart ] = useState(false) ;

    const [ userList, setUserList ] = useState([]) ;

    const ws = useRef() ;

    useEffect(async () => {
        const { data } = await api.userRegister() ;

        setUser({ ...data }) ;

    }, []) ;

    useEffect(() => {

        if(user) {
            ws.current = new window.WebSocket(`ws://${IP}/ws/chat/${user.roomNum}/`) ;
            ws.current.ondisconnect = () => { api.userGetOut(user.id) ; } ;
            ws.current.onclose = () => { api.userGetOut(user.id) ; } ;
            ws.current.onopen = () =>  ws.current.send(JSON.stringify({ 'message' : user, 'textType' : 'userIn' })) ;
        } ;
    }, [ user ]) ;

    useEffect(() => {
        if(ws.current) {
            ws.current.onmessage = (e) => {
                const socket = e.currentTarget ;
                const { data } = e ;

                const { message, textType } = JSON.parse(data) ;

                switch(textType) {
                    case 'cardDivide' :
                        return user.user_ip === message.user.user_ip ? getUserCard(message.cardList) : null ;
                    case 'anthorTail' :
                        console.log(message) ;
                        return socketAnthorTail(message);
                    case 'oneCard' : 
                        return user.user_ip === message.user.user_ip ? getUserCard([message.tail]) : null ;
                    case 'nextTurn' :
                        let i = userList.findIndex(users => users.user_ip === message.user_ip) ;

                        if( userList.length - 1 === i )
                            i = 0 ;
                        else
                            i += 1 ;

                        socket.send(JSON.stringify({ 'message' : [
                            ...userList.slice(0, i), 
                            {
                                ...userList[i],
                                cardNum : 14
                            },
                            ...userList.slice(i + 1, userList.length)
                        ] ,  'textType' : 'userList' } )) ;

                        return user.user_ip === userList[i].user_ip ? (() => {
                            preious() ;
                            myTurn() ;
                        })() : nextTurn() ;
                    default :
                }

                if(user.host === 'host') {
                    switch(textType) {
                        case 'userIn' :
                                setUserList([
                                    ...userList,
                                    message
                                ]) ;
                                socket.send(JSON.stringify({ 'message' : [ ...userList, message ],  'textType' : 'userList' } )) ;
                            return ; 
                        case 'userOut' :
                                const Id = userList.findIndex(user => user.user_ip === message.user_ip) ;
                                setUserList([
                                    ...userList.slice(0, Id),
                                    ...userList.slice(Id + 1, userList.length)
                                ]) ;
                                socket.send(JSON.stringify({ 'message' : [
                                    ...userList.slice(0, Id),
                                    ...userList.slice(Id + 1, userList.length)
                                ],  'textType' : 'userList' } )) ;
                            return ;
                            case 'drawCard' :
                                socket.send(JSON.stringify( { 'message' : { 'tail' : tails[0], 'user' : message }, 'textType' : 'oneCard' } )) ;
                                removeTails(1) ;
                                return ;
                        default : 
                            return ;
                    }
                }else {
                    switch(textType) {
                        case 'userList' :
                            setUserList([
                                ...message
                            ]) ;
                        return ;
                        case 'start' :
                            setStart(true) ;
                            return ;
                        default : 
                            return ;
                    }
                }
            }
        }

    }) ;

    function onClickOut(e) {
        ws.current.send(JSON.stringify({ 'message' : user, 'textType' : 'userOut' })) ;
        ws.current.close() ;
        window.location = 'http://172.26.1.157:3000/' ;
    }

    async function onClickStart(e) {
        e.nativeEvent.stopImmediatePropagation() ;
        // if(userList.length >= 2) {
            setStart(true) ;
            if(user.host === "host") {
                ws.current.send(JSON.stringify({ 'message' : '', 'textType' : 'start' })) ;
                const { data : { cardList } } = await api.getCard() ;
                getCard(cardList) ;
                myTurn() ;
                await api.playGameStatus(user.roomNum, 1) ;

                let num = 0 ;

                let hostList = [] ;

                for(let i = 0 ; i < userList.length ; i++) {
                    if(i === 0) hostList = [ ...cardList.slice(0, 14) ] ;
                    await ws.current.send(JSON.stringify({ 'message' : { cardList : [...cardList.slice(num, num += 14)], user : userList[i] } , 'textType' : 'cardDivide' })) ;
                    userList[i] = { ...userList[i], cardNum : 14 } ;

                    setUserList( 
                        [
                            ...userList.slice(0, i), 
                            {
                                ...userList[i],
                                cardNum : 14
                            },
                            ...userList.slice(i + 1, userList.length)
                        ] 
                    ) ;
                    removeTails(14) ;
                }

                preious(hostList) ;
            }
        // }
    }

    return (
        <Container>
            <LeftSection  userList={userList} />
            <CenterSection user={user} socket={ws.current} start={start}/>
            <RightSection 
                socket={ws.current}
                onClickOut={onClickOut}
                user={user}
            />
            <StartContainer display={start ? 'none' : 'block'}>
                <Button onClick={ user && user.host === 'host' ? onClickStart : null } >
                    { user && user.host === 'host' ? '시작' : '시작할 때까지 기다려 주세요...'}
                </Button>
            </StartContainer>
        </Container>
    );
};

function mapStateToProps(state) {
    const { tail : { tails } } = state ; 
    return {
        tails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCard : tails => 
            dispatch(createAction.getCard(tails)),
        socketAnthorTail : tailList =>
            dispatch(createAction.socketAnthorTail(tailList)),
        removeTails : num =>
            dispatch(createAction.removeTails(num)),
        getUserCard : tailList =>
            dispatch(createAction.getUserCard(tailList)),
        myTurn : () =>
            dispatch(createAction.myTurn()),
        nextTurn : () =>
            dispatch(createAction.nextTurn()),
        preious : (userTail) => 
            dispatch(createAction.preious(userTail)),
        addAnthorTail : tailList =>
            dispatch(createAction.addAnthorTail(tailList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room) ;