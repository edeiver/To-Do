import { createStackNavigator } from 'react-navigation-stack';
import { Login } from '../screens/account/Login';
import { Register } from '../screens/account/Register';


const AccountScreenStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: () =>({
            title: 'Login'
        })
    },
    Register: {
        screen: Register,
        navigationOptions: () =>({
            title: 'Register'
        })        
    }
})
export default AccountScreenStack;