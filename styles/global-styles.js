import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@media (min-width: 576px) {
    html {
        font-size: 16px;
    }
}

@media (max-width: 576px) {
    html {
        font-size: 14px
    }
}
    
`;

export default GlobalStyle;

/* 
Title 

    разделы на главной 
    font-size: 50px

    ссылки в навигации, карточки в проектах 
    font-size: 40px

     Обложка, карточки 
    font-size: 34px 

    карточки, футер 
    font-size: 30px

    подссылка в навигации 
    font-size: 26px

    подразделы в футере, ссылки в таблице
    font-size: 21px

*/
