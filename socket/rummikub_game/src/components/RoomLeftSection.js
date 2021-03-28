import React from 'react' ;
import styled from 'styled-components' ;

import User from './User' ;

const Container = styled.div`
    width : 8% ;
    height : 100% ;
    border : 1px solid #111 ;
`;
const UserUl = styled.ul`
    width : 100% ;
    height : 100% ;
`;

const RoomLeftSection = ({ userList }) => {
    return (
        <Container>
            <UserUl>
                { userList && userList.map((user, index) => (
                    <User
                        key={index}
                        user={user}
                    />
                )) }
            </UserUl>
        </Container>
    );
};

export default RoomLeftSection;