import { createGlobalStyle } from 'styled-components' ;
import rest from 'styled-reset' ;

// import backgroundImg from '../assets/backgroundImg.jpg'

/* body {
    background-image : url(${backgroundImg}) ;
    background-repeat : no-repeat ;
    background-position : 10px cover ;
    background-size : cover ;
} */

const GlobalStyled = createGlobalStyle`
    ${rest}
    #root {
        width : 100% ;
        height : 574px ;
        font-size : 12px ;
    }
    * {
        padding : 0 ;
        margin : 0 ;
        box-sizing : border-box ;
        user-select : none ;
    }
    a {
        text-decoration : none ;
        color : black ;

        &:hover {
            color : black ;
        }
    }
`;

export default GlobalStyled ;