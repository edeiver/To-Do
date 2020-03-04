import React from 'react';
import { StyleSheet, ScrollView, View, Image,Text } from 'react-native';
import { LoginForm } from '../../components/account/LoginForm';

export const Login = (props) => {
    const { navigation } = props;
    return(
        <ScrollView>
            <Image 
                source={require('../../../assets/img/todo-logo.jpg')}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm navigation={navigation}/>
                <CreateAccount navigation={navigation} />
            </View>
        </ScrollView>
    );
}

const CreateAccount = (props) => {
    const { navigation } = props

    return(
        <Text style={styles.textRegister}>
            ¿Don't have an account?{" "}
            <Text style={styles.btnRegister}
                onPress={()=> navigation.navigate("Register")}            
            >
                Register here
            </Text>
        </Text>
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
    btnRegister:{
        color: "#3498DB",
        fontWeight: "bold"
    },
    textRegister:{
        marginTop: 30,
        textAlign: 'center'
    }
});