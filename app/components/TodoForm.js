import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, AsyncStorage, View } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { Loading } from './Loading';
import axios from 'axios';



 export const CreateTodo = (props) => {
    const { toastRef } = props;
    const titleRef = useRef();
    const descRef = useRef();
    const [ title, setTitle ] = useState('');
    const [ error, setError ] = useState(false);
    const [ desc, setDesc ]= useState('');
    const [ emptyTitle, setEmptyTitle ] = useState('');
    const [ emptyDesc, setEmptyDesc ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);


    const register = async() => {
        setIsLoading(true);
        if (!title && !desc) {
            setEmptyTitle('Empty Field');
            setEmptyDesc('Empty Field');
            setIsLoading(false);
        } else if (!title){
            setEmptyTitle('Empty Field');
            setIsLoading(false);
        } else if (!desc){
            setEmptyDesc('Empty Field');
            setIsLoading(false);
        } else {
            const id = await AsyncStorage.getItem('id');
            console.log('aca empieza la peticion');
            await
            axios.post(`https://apitodoed.herokuapp.com/todos/`,{
                title: title,
                description: desc,
                user: parseFloat(id)   
            })
            .then(res => {
                console.log('res', res.data);
                console.log('registrado coreectamente');
                setIsLoading(false);
                setDesc('');
                setTitle('');
                toastRef.current.show('Create');
            })
            .catch(error => {
                setError(true)
                console.log('error', error);
                console.log(error);
                setIsLoading(false); 
                titleRef.current.clear();
                descRef.current.clear();

            })
            setIsLoading(false);
            setDesc('');
            setTitle('');
            titleRef.current.clear();
            descRef.current.clear();
       }
    }        
    
    return(
        <ScrollView>
            <View style={styles.viewForm}>
                <Input
                    ref={titleRef}
                    placeholder= 'Title'
                    containerStyle={styles.inputContainer}
                    onChange={(e) => {setTitle(e.nativeEvent.text)
                        title.valueOf().length<0 ? setEmptyTitle('Empty Field') : setEmptyTitle('')
                    }}
                    rightIcon={
                        <Icon
                            type="material"
                            name="assignment"
                            iconStyle={styles.iconRight}
                        />
                    }
                    errorMessage={emptyTitle}
                />
                <Input
                    ref={descRef}
                    placeholder= 'Description'
                    containerStyle={styles.inputContainer}
                    onChange={(e) => {setDesc(e.nativeEvent.text)
                       desc.valueOf().length <0 ? setEmptyDesc('Empty field') : setEmptyDesc('')
                    }}
                    rightIcon={
                        <Icon
                            type="material"
                            name="inbox"
                            iconStyle={styles.iconRight}
                        />
                    }
                    errorMessage={emptyDesc}
                />
                <Button
                    title= "Create"
                    onPress={register}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnCreate}
                    icon={
                        <Icon
                        type="material"
                        name="inbox"
                        iconStyle={styles.iconRightBtn}
                        />
                      }
                    iconRight
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
            <Loading text="creating a Todo" isVisible={isLoading}/>
        </ScrollView>
    );
}
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
        color: '#651fff'
    },
    btnContainer:{
        marginTop: 30,
        width: "95%"
    },
    btnCreate:{
        backgroundColor: "#651fff"
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
    },
    iconRightBtn:{
        color: '#fff',
        paddingLeft: 10
    },
})