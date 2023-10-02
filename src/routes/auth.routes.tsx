import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SingIn } from '@screens/SignIn';
import { SingUp } from '@screens/SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen
        name='signIn'
        component={SingIn}
      />
      <Screen
        name='signUn'
        component={SingUp}
      />
    </Navigator>
  )
}