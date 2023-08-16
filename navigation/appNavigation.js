
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import WelcomScreen from '../screens/WelcomScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CalciScreen from '../screens/CalciScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { signInWithEmailAndPassword } from 'firebase/auth'



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const user = useSelector(state => state.user.user);

  const dispach = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if(user?.emailVerified){

      dispach(setUser(user))
      

    }
    else{
      user?Alert.alert('Please verify your email'):null;
      dispach(setUser(null))

    }
    
  })

  const fetchUser = async () => {
    try {
      const user = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      if (user && password) {
        try {

          await signInWithEmailAndPassword(auth, user, password);

        }
        catch (e) {
          Alert.alert('Error', e.message)
        }
        
      }
    }
    catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    fetchUser();
  }, [])




  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'  >
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTripScreen} />
          <Stack.Screen options={{ headerShown: false }} name="TripExpenses" component={TripExpensesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddTripExpenses" component={AddExpenseScreen} />
          <Stack.Screen options={{ headerShown: false,presentation:'modal' }} name="Calci" component={CalciScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    );

  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcom'  >
          <Stack.Screen options={{ headerShown: false }} name="Welcom" component={WelcomScreen} />
          <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="SignIn" component={SignInScreen} />
          <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="SignUp" component={SignUpScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );

  }


}