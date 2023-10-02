import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import { SingIn } from '@screens/SignIn';
import { SingUp } from '@screens/SignUp';

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='signIn'
        component={SingIn}
      />
      <Screen
        name='signUp'
        component={SingUp}
      />
    </Navigator>
  )
}