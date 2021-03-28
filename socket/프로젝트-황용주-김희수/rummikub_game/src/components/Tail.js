import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faMeh } from '@fortawesome/free-solid-svg-icons' ;

import { 
    TAIL_WIDTH, 
    TAIL_HEIGHT, 
    CENTER_CONTAINER_WITDH,
    CENTER_CONTAINER_HEIGHT,
    WALL_COLLISION,
    TAIL_SECITON_HEIGHT
 } from './util' ;
 
import { connect } from 'react-redux';
import { createAction } from '../store';

const Container = styled.div`
    width : ${`${TAIL_WIDTH}px`} ;
    height : ${`${TAIL_HEIGHT}px`} ;

    padding : 3px 8px 0 8px ;

    border : ${props => props.border} ;
    border-radius : 6px ;

    background-color : #dce775 ;
    user-select : none ;

`;

const TextContainer = styled.div`
    width : 100% ;
    height : 25px ;

    border-radius : 50% ;

    display : flex ;
    justify-content : center ;
    align-items : center ;

    box-shadow : inset 0px 0px 3px #555 ;
    
    background-color : ${props => props.color} ;
`;

const Text = styled.span`
    font-size : 14px ;
    font-weight : 600 ;
    pointer-events : none ;

    color : ${props => props.color} ;
`;

const Tail = ({ 
    tail,
    select,
    selectCancel,
    selectAnthorTail,
    selectUserTail,
    gameStatus
}) => {

    useEffect(() => {
        console.log(gameStatus ?  'my Game' : 'anthor Game') ;
    }, [gameStatus])

    function onClickTail(e) {
        if(!gameStatus) return ;
        return select ? selectCancel(tail) : (tail.type === 'userTail' ? selectUserTail(tail) : selectAnthorTail(tail) ) ;
    }

    return (
                <Container
                    onClick={onClickTail}
                >
                <TextContainer>
                    <Text color={tail.color}>
                        {tail.num !== -1 ? tail.num : (
                            <FontAwesomeIcon
                                icon={faMeh} 
                                color={tail.color}
                                size="2x"
                            />
                        )}
                    </Text>
                </TextContainer>
            </Container>
    )
} ;

function mapStateToProps(state) {
    const { 
        turn : { gameStatus }  
    } = state ;
    return {
        gameStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectUserTail : tail => 
            dispatch(createAction.selectUserTail(tail)),
        selectCancel : tail =>
            dispatch(createAction.selectCancel(tail)),
        selectAnthorTail : tail =>
            dispatch(createAction.selectAnthorTail(tail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tail) ;