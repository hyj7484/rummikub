import React from 'react' ;
import styled from 'styled-components' ;

import { connect } from 'react-redux' ;

import Tail from './Tail' ;
import { TAIL_WIDTH } from './util' ;

const Container = styled.div`
    width : 100% ;
    height : 100% ;
`;

const SelectTailContainer = styled.div`

    width : 100% ;
    height : 100% ;
    display : flex ;
    flex-direction : row ;
    align-items : center ;
    
    border-radius : 5px ; 
`;

const SelectTail = ({ selectTail }) => {
    return (
        <Container>
            <SelectTailContainer>
                {selectTail && selectTail.map((tail, index) =>
                    <Tail 
                        key={index}
                        tail={tail}
                        select={true}
                    />
                )}
            </SelectTailContainer>
        </Container>
    );
};

function mapStateToProps(state) {
    const { 
        tail : { selectTail } 
    } = state ;
    
    return {
        selectTail
    } ;
}

export default connect(mapStateToProps)(SelectTail) ;
