import { styled } from 'styled-components';

export const Card = styled.View`
    margin-top: 2px;
    background-color:  #F2F3FA;
    width: 100%;
    border-radius: 15px;
    
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const UserImg = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 25px;
`;

export const UserInfoText = styled.View`
    flex-durection: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export const Divider = styled.View`
    border-bottom-color: #A2ACC3;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    
`;
