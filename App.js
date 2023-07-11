import React, { useState }   from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/index.js';
import TabBar from './src/routes/TabBar'
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
      } else {

      }})

    return unsubscribe; }, []);

  return (
    
    <NavigationContainer>
      <StatusBar backgroundColor="#619dfd" barStyle="ligth-content"/>
        <Routes>
         
        </Routes>
     
    </NavigationContainer>
  );
}

export default App;