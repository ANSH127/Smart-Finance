
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import WelcomScreen from '../screens/WelcomScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';
import { Alert } from 'react-native';
import { useEffect } from 'react';



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const user = useSelector(state => state.user.user);

  const dispach = useDispatch();

  onAuthStateChanged(auth, (user) => {
    // console.log('user', user)
    if(user?.emailVerified){

      dispach(setUser(user))
    }
    else{
      user?Alert.alert('Please verify your email'):null;
      dispach(setUser(null))

    }
    
  })

  useEffect(() => {
    console.log('user', user)
  }, [user])




  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'  >
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTripScreen} />
          <Stack.Screen options={{ headerShown: false }} name="TripExpenses" component={TripExpensesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddTripExpenses" component={AddExpenseScreen} />

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