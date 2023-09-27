import { styled } from 'styled-components';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #d0dde2;
    padding: 20px;
`;

export const Container2 = styled.View`
    flex: 1;
    align-items: center;
    background-color: #d0dde2;
    padding: 0px 20px 0px 20px;
`;

export const Card = styled.View`
    background-color:  #d0dde2;
    width: 100%;
    border-radius: 15px;
    
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
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
