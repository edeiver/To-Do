import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { LiistOfTodos } from '../components/ListTodosComponent';
import Toast from 'react-native-easy-toast';



export const ListOfTodosScreen = (props) => {
    const { navigation } = props;
    const toastRefer = useRef();
    return(
        <ScrollView>
            <View style={styles.scrollView}>
                <LiistOfTodos navigation={navigation} toastRefer={toastRefer}/>
            </View>
            <Toast
                ref={toastRefer}
                position='center'
                style={styles.toast}
                opacity={0.9}
            />
        </ScrollView>

    );
}
const styles = StyleSheet.create({
    scrollView:{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
    },
    toast:{
        backgroundColor:"#651fff",
        color: "#fff",
    }
})