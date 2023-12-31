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
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
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
    width:80%
`;

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export const PostTime = styled.Text`
    font-size: 12px;
    color: #A2ACC3;
`;

export const PostText = styled.Text`
    font-size: 14px;
    padding-left: 15px;
    padding-right: 15px;
`;

export const PostImage = styled.Image`
    width: 100%;
    height: 250px;
    margin-top: 15px;
`;

export const Divider = styled.View`
    border-bottom-color: #A2ACC3;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;  
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: black;
    margin-top: 10px;
    margin-left: 5px;
`;

export const Check = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export const Close = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;