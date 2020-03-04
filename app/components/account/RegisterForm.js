import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, View } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Loading } from '../../components/Loading';
import { validateEmail } from '../../utils/Validate'
import axios from 'axios';


 const RegisterForm = (props) => {
    const { toastRef } = props;
    const registerRef = useRef();
    const inputUsername = useRef();
    const inputPassword = useRef();
    const inputPassword2 = useRef();
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState(false);
    const [ password, setPassword ]= useState('');
    const [ password2, setPassword2 ]= useState('');
    const [ username, setUserName ]= useState('');
    const [ empty, setEmpty ] = useState('');
    const [ emptyUsername, setEmptyUsername ] = useState('');
    const [ emptyPassword, setEmptyPassword ] = useState('');
    const [ emptyPassword2, setEmptyPassword2 ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [visiblePassword, setVisiblePassword ] = useState(true);
    const [visiblePassword2, setVisiblePassword2 ] = useState(true);


    const register = async() => {
        setIsLoading(true);
        if (!email && !password && !username && !password2) {
            setEmpty('Empty Field');
            setEmptyPassword('Empty Field');
            setEmptyPassword2('Empty Field');
            setEmptyUsername('Empty Field');
            setIsLoading(false);
        } else if (!validateEmail(email)){
            setEmpty('Incorrect Email');
            setIsLoading(false);
        } else if (!email){
            setEmpty('Empty Field');
            setIsLoading(false);
        } else if (!password){
            setEmptyPassword('Empty Field');
            setIsLoading(false);
        } else if (!username) {
            setEmptyUsername('Empty Field');
            setIsLoading(false);
        } else if (!password2){
            setEmptyPassword2('Empty Field');
            setIsLoading(false);
        } else if (password != password2){
            setEmptyPassword("Don't Match");
            setEmptyPassword2("Don't Match");
            setIsLoading(false);
        } else {
            console.log('aca empieza la peticion');
            await
            axios.post(`https://apitodoed.herokuapp.com/register/`,{
                email: email,
                password: password,
                username: username     
            })
            .then(res => {
                console.log('res', res.data);
                console.log('registrado correctamente');
                toastRef.current.show('Register: OK')
                registerRef.current.clear();
                inputPassword.current.clear();
                inputPassword2.current.clear();
                inputUsername.current.clear();
            })
            .catch(error => {
                setError(true)
                console.log('error', error);
                console.log(error);
                setIsLoading(false); 
                registerRef.current.clear();
                inputPassword.current.clear();
                inputPassword2.current.clear();
                inputUsername.current.clear();

            })
            setIsLoading(false);
            registerRef.current.clear();
            inputPassword.current.clear();
            inputPassword2.current.clear();
            inputUsername.current.clear();
       }
    }        
    
    return(
        <ScrollView>
            <View style={styles.viewForm}>
                <Input
                    ref={registerRef}
                    placeholder= 'Email'
                    containerStyle={styles.inputContainer}
                    onChange={(e) => {setEmail(e.nativeEvent.text)
                        email.valueOf().length<0 ? setEmpty('Empty Field') : setEmpty('')
                    }}
                    rightIcon={
                        <Icon
                            type="material-community" 
                            name="at"
                            iconStyle={styles.iconRight}
                        />
                    }
                    errorMessage={empty}
                />
                <Input
                    ref={inputUsername}
                    placeholder= 'Username'
                    containerStyle={styles.inputContainer}
                    onChange={(e) => {setUserName(e.nativeEvent.text)
                       username.valueOf().length <0 ? setEmptyUsername('Empty field') : setEmptyUsername('')
                    }}
                    rightIcon={
                        <Icon
                            type="font-awesome" 
                            name="user-circle"
                            iconStyle={styles.iconRight}
                        />
                    }
                    errorMessage={emptyUsername}
                />
                <Input
                    ref={inputPassword}
                    placeholder= 'Password'
                    containerStyle={styles.inputContainer}
                    onChange={(e) => {setPassword(e.nativeEvent.text)
                        password.valueOf().length<0 ? setEmptyPassword('Empty Field') : setEmptyPassword('')
                    }}
                    password={true}
                    secureTextEntry={visiblePassword}
                    rightIcon={
                        <Icon
                            type="font-awesome" 
                            name={visiblePassword ? "eye-slash" : "eye"}
                            iconStyle={styles.iconRight}
                            onPress={()=> setVisiblePassword(!visiblePassword)}
                        />
                    }
                    errorMessage={emptyPassword}
                />
                <Input
                    ref={inputPassword2}
                    placeholder= 'Re-Write password'
                    containerStyle={styles.inputContainer}
                    onChange={(e) => {setPassword2(e.nativeEvent.text)
                        password2.valueOf().length<0 ? setEmptyPassword2('Empty Field') : setEmptyPassword2('')
                    }}
                    password={true}
                    secureTextEntry={visiblePassword2}
                    rightIcon={
                        <Icon
                            type="font-awesome" 
                            name={visiblePassword2 ? "eye-slash" : "eye"}
                            iconStyle={styles.iconRight}
                            onPress={()=> setVisiblePassword2(!visiblePassword2)}
                        />
                    }
                    errorMessage={emptyPassword2}
                />
                <Button
                    title= "Register"
                    onPress={register}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnRegister}
                />                               
            </View>
            {
                    error &&(
                        <View>
                            <Button
                                title='An error ocurred'
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
            <Loading text="creating an account" isVisible={isLoading}/>
        </ScrollView>
    );
}
export default withNavigation(RegisterForm)


const styles = StyleSheet.create({
    viewForm:{
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    inputContainer:{
        width: '100%',
        marginTop: 20,
    },
    iconRight:{
        color: '#1883ff'
    },
    btnContainer:{
        marginTop: 30,
        width: "95%"
    },
    btnRegister:{
        backgroundColor: "#1883ff"
    },
    error:{
        marginTop: 5,
        width: "100%",
        marginBottom: 20
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
})