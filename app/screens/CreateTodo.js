import React, { useRef } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { CreateTodo } from '../components/TodoForm';
import Toast from 'react-native-easy-toast';


export const CreateTodoScreen = (props) => {
    const toastRef = useRef();
    return(
        <ScrollView>
            <Image
                source={require('../../assets/img/todo-create.jpg')}
                resizeMode= "contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <CreateTodo toastRef={toastRef}/>
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
        marginTop: 60,
        borderRadius: 17
    },
    viewContainer:{
        marginTop: 40,
        marginRight: 40,
        marginLeft: 40,
    },
    toast:{
        backgroundColor:"#651fff",
        color: "#fff",
        padding: 10
    }
})