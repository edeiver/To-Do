import React, { useRef } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import RegisterForm  from '../../components/account/RegisterForm';
import Toast from 'react-native-easy-toast';

export const Register = () => {
    const toastRef = useRef();
    return(
        <ScrollView>
            <Image 
                source={require('../../../assets/img/todo-logo.jpg')}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <RegisterForm toastRef={toastRef}/>
            </View>
            <Toast
                ref={toastRef}
                position='center'
                style={styles.toast}
                opacity={0.9}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    logo:{
        width: "100%",
        height: 200,
        marginTop: 50,
        borderRadius: 17
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
    },
    toast:{
        backgroundColor:"#651fff",
        color: "#fff",
        padding: 10
    }
});