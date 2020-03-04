import React, { useState, useRef } from 'react';
import { Loading } from '../../components/Loading';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, ActivityIndicator, View, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';



const MyAccount = (props) =>{
    const toastRef = useRef();
    const { navigation } = props;
    const isAut = 'isAuth';
    const getAuth = async () => {
        try {
          const userId = await AsyncStorage.getItem(isAut);
          navigation.navigate(userId ? 'App' : 'Auth');
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
        return userId;
      }
      getAuth()
        return (
          <View style={styles.container}>
            <ActivityIndicator />
            <Toast
                ref={toastRef}
                position='center'
                style={styles.toast}
                opacity={0.9}
            />
          </View>
        );
      
    

}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    toast:{
      backgroundColor:"#651fff",
      color: "#fff",
  }
})

export default withNavigation(MyAccount);
