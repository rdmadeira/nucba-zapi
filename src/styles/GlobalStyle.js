import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        font-family: 'Lato', sans-serif;
        height: 100vh;
        background-color: #f1e7ca;
    }
    h1, h2, h3 {
        font-family: 'Montserrat', sans-serif;
    }
    a {
        text-decoration: none;
    }
`;
