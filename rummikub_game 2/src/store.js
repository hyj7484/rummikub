import { createStore, applyMiddleware } from 'redux' ;
import logger from 'redux-logger' ;
import { combineReducers } from 'redux' ;

import { LNITIAL_TIME } from './components/util' ;

const SELECT_USERTAIL = 'SELECT_USERTAIL' ;
const SELECT_CANCEL = 'SELECT_CANCEL' ;
const SELECT_ANTHORTAIL = 'SELECT_ANTHORTAIL' ;

const UPDATE_TIME = 'UPDATE_TIME' ;

const GET_CARD = 'GET_CARD' ;

const ASC_CARD = 'ASC_CARD' ;
const BACK_STATUS = 'BACK_CARD' ;
const ADD_ANTHOR_TAIL = 'ADD_ANTHOR_TAIL' ;
const GET_USER_CARD = 'GET_USER_CARD' ;
const REMOVE_TAILS = 'REMOVE_TAILS' ;
const PREVIOUS = 'PRVIOUS' ;
const GO_PRVIOUS = 'GO_PRVIOUS' ;
const SOCKET_ANTHOR_TAIL = 'SOCKET_ANTHOR_TAIL' ;

const socketAnthorTail = (tailList) => ({ type : SOCKET_ANTHOR_TAIL, tailList }) ;

const goPrivious = () => ({ type : GO_PRVIOUS }) ;

const preious = (tailList) => ({ type : PREVIOUS, tailList }) ;

const removeTails = num => ({ type : REMOVE_TAILS, num }) ;

const getUserCard = tailList => ({ type : GET_USER_CARD, tailList }) ;

const addAnthorTail = (tailList) => ({ type : ADD_ANTHOR_TAIL, tailList }) ;

const backStatus = () => ({ type : BACK_STATUS }) ;

const ascCard = () => ({ type : ASC_CARD }) ;

const getCard = tails => ({
    type : GET_CARD,
    tails
}) ;

const selectUserTail = tail => ({
    type : SELECT_USERTAIL,
    tail
}) ;

const selectCancel = tail => ({
    type : SELECT_CANCEL,
    tail
}) ;

const selectAnthorTail = tail => ({
    type : SELECT_ANTHORTAIL,
    tail
}) ;

const updateTime = time => ({
    type : UPDATE_TIME,
    time
}) ;

const idCheck = action => tail => tail.id === action.tail.id ;

const TailReducer = ( 
    state = { 
        tails : [],
        userTail : [], 
        selectTail : [], 
        anthorTail : [],
        preiousState : {}
    }, action ) => {

    const { userTail, selectTail, anthorTail } = state ; 

    const actionIdCheck = idCheck(action) ;

    const userSelectTail = action.tail ? userTail.findIndex(actionIdCheck) : null ;
    const selectSelectTail = action.tail ? selectTail.findIndex(actionIdCheck) : null ;
    const anthorSelectTail = action.tail ? anthorTail.findIndex(actionIdCheck) : null ;

    const tail = userTail[userSelectTail] || selectTail[selectSelectTail] || anthorTail[anthorSelectTail] ;

    switch(action.type) {
        case SOCKET_ANTHOR_TAIL :
            return {
                ...state,
                selectTail : [],
                anthorTail : [ ...action.tailList ].map((tailList, index) => ([ ...tailList.map(tail =>({ ...tail, type : 'anthorTail', anthorNum : index }))]))
            }
        case PREVIOUS :
            return action.tailList ? {
                ...state,
                preiousState : { 
                    ...state,
                    userTail : action.tailList.map(tail => ({ ...tail, type : 'userTail' }))
                }
            } : {
                ...state,
                preiousState : { 
                    ...state,
                }
            }
        case GO_PRVIOUS :
            return {
                ...state.preiousState,
                preiousState : state.preiousState
            } ;
        case REMOVE_TAILS :
            return {
                ...state,
                tails : [
                    ...state.tails.slice(action.num, state.tails.length)
                ]
            } ;
        case GET_USER_CARD :
            return {
                ...state,
                userTail : [ ...userTail, ...action.tailList.map(tail => ({ ...tail, type : 'userTail' })) ],
            } ;
        case ADD_ANTHOR_TAIL :
            const tailList = action.tailList.map(tail => ({ ...tail, type : 'anthorTail', anthorNum : anthorTail.length})) ;
            const anthorTailAll = [ 
                ...anthorTail,
                [ ...tailList ]
            ].filter(tailList1 => tailList1.length !== 0) ;

            return {
                ...state,
                selectTail : [],
                anthorTail : anthorTailAll
            }
        case BACK_STATUS :
            const users = [] ;
            selectTail.forEach(tail => {
                return tail.type === 'userTail' ? users.push(tail) : anthorTail[tail.anthorNum].push(tail) ;
            }) ;

            return {
                ...state,
                selectTail : [],
                userTail : [ ...userTail, ...users ].sort((a, b) => a.num - b.num),
                anthorTail : anthorTail
            }
        case ASC_CARD :
            return {
                ...state,
                userTail : [ ...userTail.sort((a, b) => a.num - b.num) ]
            } ;
        case GET_CARD :
            return {
                ...state,
                tails : [ ...action.tails ],
            }
        case SELECT_USERTAIL :
            return {
                ...state,
                userTail : [
                    ...userTail.slice(0, userSelectTail),
                    ...userTail.slice(userSelectTail + 1, userTail.length) 
                ],
                selectTail : [
                    ...selectTail,
                    tail,
                ]
            } ;
        case SELECT_CANCEL :
            return tail.type === 'userTail' ? {
                ...state,
                selectTail : [
                    ...selectTail.slice(0, selectSelectTail),
                    ...selectTail.slice(selectSelectTail + 1, selectTail.length)
                ],
                userTail : [
                    ...userTail,
                    tail
                ]
            } : {
                ...state,
                selectTail : [
                    ...selectTail.slice(0, selectSelectTail),
                    ...selectTail.slice(selectSelectTail + 1, selectTail.length)
                ],
                anthorTail : [
                    ...anthorTail.slice(0, action.tail.anthorNum),
                    [ ...anthorTail[action.tail.anthorNum], action.tail ],
                    ...anthorTail.slice(action.tail.anthorNum + 1, anthorTail.length)
                ]
            } ;
        case SELECT_ANTHORTAIL :
            const findIndexAnthorTail = anthorTail[action.tail.anthorNum].findIndex(tail => tail.id === action.tail.id) ; 
            return {
                ...state,
                anthorTail : [
                    ...state.anthorTail.slice(0, action.tail.anthorNum),
                    [ 
                        ...state.anthorTail[action.tail.anthorNum].slice(0, findIndexAnthorTail),
                        ...state.anthorTail[action.tail.anthorNum].slice(findIndexAnthorTail + 1, anthorTail[action.tail.anthorNum].length)
                    ],
                    ...state.anthorTail.slice(action.tail.anthorNum + 1, anthorTail.length)
                ],
                selectTail : [
                    ...selectTail, action.tail
                ]
            } ;
        default :
            return state ;
    }
}

const TimeReducer = ( state = LNITIAL_TIME, action ) => {
    const { time } = action ;
    switch(action.type) {
        case UPDATE_TIME :
            return time ;
        default :
            return state ;
    }
}

const NEXT_TURN = 'NEXT_TURN' ;
const MY_TURN = 'MY_TURN' ;

const nextTurn = () => ({ type : NEXT_TURN }) ;
const myTurn = () => ({ type : MY_TURN }) ;

const TurnReducer = ( state = { turn : 0, user : null, gameStatus : false }, action ) => {
    switch(action.type) {
        case NEXT_TURN :
            return { ...state, turn : state.turn + 1, gameStatus : false } ;
        case MY_TURN :
            return { ...state, gameStatus : true } ;
        default :
            return state ; 
    }
} 

const reducer = combineReducers({ tail : TailReducer, time : TimeReducer, turn : TurnReducer})
const store = createStore(reducer, applyMiddleware(logger)) ;

export const createAction = {
    getCard,
    selectUserTail,
    selectCancel,
    selectAnthorTail,
    updateTime,
    ascCard,
    backStatus,
    addAnthorTail,
    getUserCard,
    removeTails,
    nextTurn,
    myTurn,
    goPrivious,
    preious,
    socketAnthorTail
} ;

export default store ;
