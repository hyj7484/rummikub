import React from 'react' ;
import styled from 'styled-components' ;

import Tail from './Tail' ;

const Container = styled.div`
    display : flex ;
    align-content: flex-start ;
    flex-wrap : wrap ;

    margin-right : 4px ;
`;

const TailList = ({ tailArray }) => {
    return (
        <Container>
            {tailArray && tailArray.map((tail, index) => (
                <Tail 
                    key={index}
                    tail={tail}
                />
            ))}
        </Container>
    );
};

export default TailList;