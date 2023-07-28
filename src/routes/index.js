import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import Images from '../pages/SignIn/Images';
import Docments from '../pages/SignIn/Documents';
import Welcome from '../pages/Welcome';
import LogIn from '../pages/LogIn';
import EditProfile from '../pages/Screens/Profile/editProfile';
import Selection from '../pages/Selection';
import Screens from '../pages/Screens';
import React from 'react';

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
                name="Selection"
                component={Selection}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="Images"
                component={Images}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="Documents"
                component={Docments}
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
        </Stack.Navigator>

        
    );
}