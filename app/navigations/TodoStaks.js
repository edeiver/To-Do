import { createStackNavigator } from 'react-navigation-stack';
import { ListOfTodosScreen } from '../screens/ListOfTodos';

const ListOfTodosScrenStacks = createStackNavigator ({
    ListOfTodos:{
        screen: ListOfTodosScreen,  
        navigationOptions : () => ({
            title: 'List Of Todos'
        })
    }
})
export default ListOfTodosScrenStacks