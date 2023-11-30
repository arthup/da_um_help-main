import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import Welcome from '../pages/Welcome';
import LogIn from '../pages/LogIn';
import EditProfile from '../pages/Screens/Profile/editProfile';
import UserProfile from '../pages/Screens/Profile/userProfile';
import Screens from '../pages/Screens';
import React from 'react';
import userImages from '../pages/SignIn/userImages';
import userInfo from '../pages/SignIn/userInfo';
import Message from '../pages/Screens/Message';
import Avalition from '../pages/Screens/Message/avaliation';

const Stack = createNativeStackNavigator();
export default function Routes(){

    return(
        <Stack.Navigator>
    
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false}}
            />
            
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="Screens"
                component={Screens}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="userImages"
                component={userImages}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="userInfo"
                component={userInfo}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="userProfile"
                component={UserProfile}
                options={{ headerShown: false}}
            />
            
            <Stack.Screen
                name="Message"
                component={Message}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="Avaliation"
                component={Avalition}
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
}