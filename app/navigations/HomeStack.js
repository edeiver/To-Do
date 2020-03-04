import { createStackNavigator } from 'react-navigation-stack';
import  MyAccount  from '../screens/account/MyAccount';

const MyAccountS = createStackNavigator({
    MyAccount: {
        screen: MyAccount,
        navigationOptions: () => ({
            title: 'My Account'
        })
    }
});
export default MyAccountS;