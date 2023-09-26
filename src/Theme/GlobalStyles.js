import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    a {
        color: hotpink;
    }
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }`;
