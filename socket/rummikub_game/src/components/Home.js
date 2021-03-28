import React, { useState } from 'react' ;
import styled from 'styled-components' ;

import { Link } from 'react-router-dom' ;

const Container = styled.div`
    width : 100% ;
    height : 100% ;
`;

const Title = styled.h1`
     padding-top : 120px ;

    text-align : center ;
    font-size : 48px ;
    font-weight : 550 ;

    user-select : none ;
`;

const ButtonContainer = styled.div`
    width : 20% ;
    margin : 100px auto 0 auto ;

    display : flex ;
    justify-items : center ;
    align-items : center ;
    flex-direction: column ;
`;

const Input = styled.input`
    all : unset ;

    /* width : 100% ; */
    height : 40px ;

    border : 1px solid #111 ;
    border-radius : 15px ;

    text-align : center ;
    margin-top : 10px ;
`;

const RoomFindButton = styled(Input)`
    
`;

const RoomCreateButton = styled(Input)`
    width : 100px ;
`;

const Form = styled.form`
    width : 100% ;
    display : flex ;
`;

const CodeInput = styled(Input)`
    margin-right : 10px ;
`;

const CodeButton = styled(Input)`
    width : 70px ;
`;

const Home = () => {
    const [ load, setLoad ] = useState(true) ;

    // useEffect(async () => {
    //     try {

    //     } catch {
            
    //     } finally {
    //         setLoad(false) ;   
    //     }

    // }, []) ;

    function RoomFindOnClick () {
        
    }


    function RoomCreateOnClick() {

    }

    function codeOnSubmit() {
        
    }

    function CodeButtonOnClick() {

    }
    return (
        <Container>
            <Title>
                Rummikub
            </Title>
            <ButtonContainer>
                {/* <RoomFindButton type="button" value="방 생성" /> */}
                <Link to="/room">
                    <RoomCreateButton type="button" value="방 참가" onClick={RoomFindOnClick} />
                </Link>
                {/* <Form>
                    <CodeInput type="text" placeholder="코드입력"/>
                    <CodeButton type="submit" value="참가"/>
                </Form> */}
            </ButtonContainer>
        </Container>
    );
};

export default Home;