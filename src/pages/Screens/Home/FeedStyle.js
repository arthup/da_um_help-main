import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Image, Alert } from 'react-native';
import { updateProfile } from "firebase/auth";
import  {auth, storage} from '../../../Services/firebaseConfig';
import styled from 'styled-components';

export const Container = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 20px
`;

export const Card = styled.View`
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;

`;