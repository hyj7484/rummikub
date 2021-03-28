import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faDotCircle, faTimesCircle, faCheck } from '@fortawesome/free-solid-svg-icons' ;

import { connect } from 'react-redux' ;
import { createAction } from '../store' ;

import api from '../api' ;

// button 모음 zone
const Container = styled.div`
    width : 8% ;
    height : 100% ;

    border : 1px solid #111 ;
`;

const Button = styled.button`
    all : unset ;
    
    width : 90px ;
    height : 35px ;

    border : 1px solid #111 ;
    border-radius : 15px ;

    text-align : center ;
`;

const ButtonContainer = styled.ul`
    width : 100% ;
    height : 100% ;
`;

const ButtonLi = styled.li`
    width : 100% ;
    height : 14.2% ;

    display : flex ;
    justify-content : center ;
    align-items : center ;

    &:not(:last-child) {
        border-bottom : 1px solid #111 ;
    }
`;

const AlignmentButton = styled(Button)`
    background-color : ${props => props.color || '#fff'} ;
    color : ${props => {
        if(props.color === 'red')
            return '#fff' ;
        else 
            return '#111' ;
    }} ;
`;

const SeatResetButton = styled(Button)`

`;

const CodeText = styled.span`

`;


const RoomRightSection = ({ 
    ascCard, 
    socket, 
    selectTail, 
    backStatus, 
    onClickOut, 
    user, 
    anthorTail, 
    goPrivious, 
    addAnthorTail,
    gameStatus,
    userTailNum,
    previousUserTailNum
}) => {
    const [ answerStatus, setAnswerStatus ] = useState(false) ;

    const checkTails = async () => {

        const tailList = new FormData() ;

        const newArray = [ ...anthorTail ] ;
        
        newArray[anthorTail.length] = selectTail ; 
        tailList.append('tailList', JSON.stringify({ 'tailList' : newArray })) ;

        const { data : { status } } =  await api.userTailCheck(tailList) ;

        for(const key in status) {
            if(!status[key]) { setAnswerStatus(false) ; return ; }
        }

        setAnswerStatus(true) ;
    }

    function ascTailOnClick() { 
        ascCard() ;
    }

    function resetPositionOnClick() {
        backStatus() ;
    }

    function previousStatus(){
        goPrivious() ;
    }

    function listAdd() {
        addAnthorTail(selectTail) ;
    }

    function onMessageTail() {
        socket.send(JSON.stringify( { 'message' : [ ...anthorTail, selectTail ], 'textType' : 'anthorTail' } )) ;
        socket.send(JSON.stringify( { 'message' : user, 'textType' : 'nextTurn' } )) ;
        setAnswerStatus(false) ;
    }

    function cardDraw() {
        socket.send(JSON.stringify( { 'message' : user, 'textType' : 'drawCard' } )) ;
        socket.send(JSON.stringify( { 'message' : user, 'textType' : 'nextTurn' } )) ;
    }

    return (
        <Container>
            <ButtonContainer>
                <ButtonLi>
                    <CodeText>
                        <AlignmentButton onClick={onClickOut}>나가기</AlignmentButton>
                    </CodeText>
                </ButtonLi>
                <ButtonLi>
                    <AlignmentButton
                        onClick={ascTailOnClick}
                    >
                        오름 차순
                    </AlignmentButton>
                </ButtonLi>
                <ButtonLi>
                    <SeatResetButton
                        onClick={resetPositionOnClick}
                    >
                        선택 취소
                    </SeatResetButton>
                </ButtonLi>
                <ButtonLi>
                    <AlignmentButton
                        onClick={gameStatus ? previousStatus : null}
                    >
                        처음으로
                    </AlignmentButton>
                </ButtonLi>
                <ButtonLi onClick={gameStatus ? listAdd : null}>
                    <AlignmentButton>리스트 생성</AlignmentButton>
                </ButtonLi>
                <ButtonLi onClick={gameStatus ? checkTails : null}>
                    <AlignmentButton>전체 확인</AlignmentButton>
                </ButtonLi>
                <ButtonLi onClick={ gameStatus ? (answerStatus ? onMessageTail : cardDraw) : null }>
                    <AlignmentButton color={ answerStatus ? 'green' : 'red' } >턴 넘기기</AlignmentButton>
                </ButtonLi>
            </ButtonContainer>
        </Container>
    );
};

function mapStateToProps(state) {
    const { tail : { selectTail, anthorTail, userTail, previousStatus }, turn : { gameStatus } } = state ;
    return {
        selectTail,
        anthorTail,
        gameStatus,
        // userTailNum : userTail.length,
        // previousUserTailNum : previousStatus.userTail.length,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ascCard : () => 
            dispatch(createAction.ascCard()),
        backStatus : () =>
            dispatch(createAction.backStatus()),
        addAnthorTail : tailList =>
            dispatch(createAction.addAnthorTail(tailList)),
        myTurn : () => 
            dispatch(createAction.myTurn()),
        goPrivious : () =>
            dispatch(createAction.goPrivious()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomRightSection) ;