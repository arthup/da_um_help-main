import React, { useState }   from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/index.js';
import { useEffect } from 'react';
import { auth } from './src/Services/firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
      if (user) {
        const uid = _user.uid;
        console.log(uid);
      }
    })
    return unsubscribe; }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>
        <Routes/>
    </NavigationContainer>
  );
}
export default App;