import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+sans:400,600,700');
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${props=> props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size: 14px;
        font-family:-
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus {
        outline:none;
    }
`;