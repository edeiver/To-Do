import { createStackNavigator } from 'react-navigation-stack';
import { CreateTodoScreen } from '../screens/CreateTodo';

const CreateTodosScrenStacks = createStackNavigator ({
    CreateTodos:{
        screen: CreateTodoScreen,  
        navigationOptions : () => ({
            title: 'Create Todos'
        })
    }
})
export default CreateTodosScrenStacks