import React, { useEffect, useState, useContext} from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreenStack from './AccountStacks';
import CreateTodosScrenStacks from './CreateTodoStacks'
import ListOfTodosScrenStacks from './TodoStaks'
import MyAccountS from './HomeStack';



const Home = createBottomTabNavigator({ 
    Home:{
        screen: MyAccountS,
        navigationOptions: () => ({
            tabBarLabel: 'My Account',
            tabBarIcon: ({tintColor}) => (
                <Icon
                type='material'
                name='account_circle'
                size={22}
                color={tintColor}
                /> 
            )            
        })
    },
 }, 
 {
    initialRouteName: "Home",
    tabBarOptions: {
        inactiveTintColor: "#8e8e93",
        activeTintColor: "#1983ff"
    }
})

const AppStack = createBottomTabNavigator({ 
    CreateTodosScrenStacks:{
        screen: CreateTodosScrenStacks,
        navigationOptions: () => ({
            tabBarLabel: 'Create ToDo',
            tabBarIcon: ({tintColor}) => (
                <Icon
                type='material'
                name='create'
                size={22}
                color={tintColor}
                /> 
            )            
        })        
    },
    ListOfTodosScrenStacks:{
        screen: ListOfTodosScrenStacks,
        navigationOptions: () => ({
            tabBarLabel: 'List of ToDo',
            tabBarIcon: ({tintColor}) => (
                <Icon
                type="material"
                name="list"
                size={22}
                color={tintColor}
                /> 
            )            
        })       
    }
},{
    initialRouteName: "CreateTodosScrenStacks",
    tabBarOptions: {
        inactiveTintColor: "#8e8e93",
        activeTintColor: "#1983ff"
    }  
});
const AuthStack = createBottomTabNavigator({ 
    Account:{
        screen: AccountScreenStack,
        navigationOptions: () => ({
            tabBarLabel: 'My Account',
            tabBarIcon: ({tintColor}) => (
                <Icon
                type="font-awesome" 
                name="user-circle"
                size={22}
                color={tintColor}
                /> 
            )            
        })
    },
 }, 
 {
    initialRouteName: "Account",
    tabBarOptions: {
        inactiveTintColor: "#8e8e93",
        activeTintColor: "#1983ff"
    }
}
 );
/*
const NavigationStacks = createBottomTabNavigator({
    Account:{
        screen: AccountScreenStack,
        navigationOptions: () => ({
            tabBarLabel: 'My Account',
            tabBarIcon: ({tintColor}) => (
                <Icon
                type='material-community'
                name='home-outline'
                size={22}
                color={tintColor}
                /> 
            )            
        })
    },
    CreateTodosScrenStacks:{
        screen: CreateTodosScrenStacks,
        navigationOptions: () => ({
            tabBarLabel: 'Create ToDo',
            tabBarIcon: ({tintColor}) => (
                <Icon
                type='material-community'
                name='home-outline'
                size={22}
                color={tintColor}
                /> 
            )            
        })        
    },
    ListOfTodosScrenStacks:{
        screen: ListOfTodosScrenStacks,
        navigationOptions: () => ({
            tabBarLabel: 'List of ToDo',
            tabBarIcon: ({tintColor}) => (
                <Icon
                type='material-community'
                name='home-outline'
                size={22}
                color={tintColor}
                /> 
            )            
        })       
    }
},
{
    initialRouteName: "Account",
    tabBarOptions: {
        inactiveTintColor: "#8e8e93",
        activeTintColor: "#1983ff"
    }
}
);
export default createAppContainer(NavigationStacks);
*/

export default createAppContainer(createSwitchNavigator(
    {
        Home: Home,
        App: AppStack,
        Auth: AuthStack,
    },
    {
      initialRouteName: 'Home',
    }
  ));