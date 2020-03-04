import React, { useRef } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { useState } from 'react';
import { Loading } from '../../components/Loading'; 
import axios from 'axios'

export const LoginForm = (props) => {

    const loginRef = useRef();
    const inputUsername = useRef();
    const { navigation } = props;    
    const isAut = 'isAuth';
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ visiblePassword, setVisiblePassword ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ empty, setEmpty ] = useState('');
    const [ empty2, setEmpty2 ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    var  id = '';


    const login = async() => {
        setIsLoading(true);
        if (!username && !password) {
            setEmpty('Empty Field');
            setEmpty2('Empty Field');
            setIsLoading(false);
        } else if(!password){
            setEmpty2('Empty Field');
            setIsLoading(false);
        } else if(!username){
            setEmpty('Empty Field');
            setIsLoading(false);
        } else {
            console.log('aca empieza la peticion');
            await
            axios.post(`https://apitodoed.herokuapp.com/login/`,{
                username: username,
                password: password
            })
            .then(res => {
                //setIsLogin(true);
                //console.log(islogin);
                if (res.data) {
                id = res.data
                console.log('res', res.data);
                console.log('Login coreectamente');
                AsyncStorage.setItem(isAut, 'auth')
                .then(AsyncStorage.getItem(isAut))
                .catch((e) => console.log(e))
                AsyncStorage.setItem('id', id.toString())
                .then(AsyncStorage.getItem('id'))
                .catch((e) => console.log(e))
                navigation.navigate('App');
                }
            })
            .catch(error => {
                console.log(error);
                if (error === 400) {
                loginRef.current.clear();
                inputUsername.current.clear();
                console.log(errorMsg);
                setError(true);
                setEmpty('');
                setEmpty2('');
                 AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiRemove(keys))
                .catch((e) => console.log(e))
                navigation.navigate('Auth');  
                }
                setError(true);
                 AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiRemove(keys))
                .catch((e) => console.log(e))
                navigation.navigate('Auth');  
            })
            setIsLoading(false);
            loginRef.current.clear();
            inputUsername.current.clear();
       } 
    }
      
    return(
        <View style={StyleSheet.formContainer}>
            <Input
                ref={inputUsername}
                placeholder="Username"
                containerStyle={styles.inputForm}
                onChange={(e) => {setUsername(e.nativeEvent.text)
                    username.valueOf().length <0 ? setEmpty('Empty Field') : setEmpty('')
                }}
                rightIcon={
                    <Icon
                        type="font-awesome"
                        name="user-circle"
                        iconStyle={styles.iconRight}
                    />
                }
                errorMessage={empty}
            />
            <Input 
                ref={loginRef}            
                placeholder="Password"
                password={true}
                secureTextEntry={visiblePassword}
                containerStyle={styles.inputForm}
                onChange={(e) => {setPassword(e.nativeEvent.text)
                    password.valueOf().length<0 ? setEmpty2('Empty Field') : setEmpty2('')
                }}
                rightIcon={
                    <Icon
                        type="font-awesome"
                        name={visiblePassword ? "eye-slash" : "eye"}
                        onPress={() => setVisiblePassword(!visiblePassword)}
                        iconStyle={styles.iconRight} 
                    />
                }
                errorMessage={empty2}
            />
            <Button
                title="Login"
                onPress={login}
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
            />
                {
                    error &&(
                        <View>
                            <Button
                                title='inavlid user name or password'
                                onPress={()=> setError(false)}
                                containerStyle={styles.error}
                                buttonStyle={styles.btnError}
                                icon={
                                    <Icon
                                        type="material"
                                        name="close"
                                        iconStyle={styles.iconError} 
                                    />
                                }
                            />
                        </View>
                    )}
            <Loading text="Login ..." isVisible={isLoading}/>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    iconRight:{
        color: "#1883ff",
    },
    btnContainerLogin:{
        marginTop: 20,
        width: "100%"
    },
    btnLogin:{
        backgroundColor: "#1883ff"
    },
    error:{
        marginTop: 20,
        width: "100%" 
    },
    btnError:{
        backgroundColor: "#D62012",
    },
    iconError:{
        color: "#fff",
        fontSize: 22,
        marginRight: 10,
        textAlign: "justify"
    }

});