import React, { useEffect }  from 'react' ;
import styled from 'styled-components' ;

import Tail from './Tail' ;
import TailList from './TailList' ;
import SelectTail from './SelectTail' ;
import Timer from './Timer' ;
import { connect } from 'react-redux';

// tile이 만나는 zone
const Container = styled.div`
    width : 82% ;
    height : 100% ;

    border : 1px solid #111 ;
`;

const TimerZone = styled.div`
    width : 100% ;
    height : 5% ;

    display : flex ;

    margin-bottom : 5px ;
`;

const GameZone = styled.div`
    width : 100% ;
    height : 65% ;

    border-bottom : 1px solid #111 ;

    display : flex ;
    align-content: flex-start ;
    flex-wrap : wrap ;
`;

const SelectTailZone = styled.div`
    width : 100% ;
    height : 13% ;
    
    border-top : 1px solid #111 ;
    border-bottom : 1px solid #111 ;
`;

// tile 두는 zone
const TailZone = styled.div`
    width : 100% ;
    height : 22% ;
`;

const TailZoneStairs = styled.div`
    width : 100% ;
    height : 50% ;
    
    display : flex ;
    align-items : center ;
    flex-direction : row ;

    &:not(:last-child) {
        border-bottom : 1px solid #111 ;
    }
`;

const RoomCenterSection = ({ userTail, anthorTail, user, socket, start }) => {

    useEffect(() => {
        console.log('카드 새로고침') ;
    }, [ userTail ]) ;

    return (
        <Container>
            {/* <TimerZone> */}
                {/* <Timer user={user} socket={socket} start={start} /> */}
            {/* </TimerZone> */}
            <GameZone>
                { anthorTail && anthorTail.map((tailArray, index) => (
                    <TailList
                        key={index}
                        tailArray={tailArray}
                    />
                ))}
            </GameZone>
            <SelectTailZone>
                <SelectTail />
            </SelectTailZone>
            <TailZone>
                <TailZoneStairs>
                    {userTail && userTail.slice(0, 23).map((tail, index) =>
                        <Tail 
                            key={index}
                            tail={tail}
                        />
                    )}
                </TailZoneStairs>
                <TailZoneStairs>
                    {userTail && userTail.slice(23, userTail.length).map((tail, index) =>
                        <Tail 
                            key={index}
                            tail={tail}
                        />
                    )}
                </TailZoneStairs>
            </TailZone>   
        </Container>
    ) ;
} ;

function mapStateToProps(state) {
   const { 
       tail : { userTail, anthorTail } 
    } = state ;

    return {
        userTail,
        anthorTail,
        // tailSection : tailSection.map(tails => tails.data)
    } ;
}

export default connect(mapStateToProps)(RoomCenterSection) ;