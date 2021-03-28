import React from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUser } from '@fortawesome/free-solid-svg-icons' ;

const UserLi = styled.li`
    width : 100% ;
    height : 25% ;

    display : flex ;
    justify-content : center ;
    align-items : center ;
`;

const CardNumText = styled.span`
    width : 30px ;
    height : 30px ;

    text-align : center ;
    line-height : 28px ;

    border-radius : 15px ;
    border : 1px solid #111 ;

    margin-left : 5px ;
`;


const User = ({ user }) => {
    return (
        <UserLi>
            <FontAwesomeIcon icon={faUser} size="5x"/>
        </UserLi>
    );
};

export default User;