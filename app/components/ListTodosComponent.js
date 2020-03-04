import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Icon, Tooltip, ListItem, Button } from 'react-native-elements';
import { Loading } from '../components/Loading';
import axios from 'axios';
import {AsyncStorage} from 'react-native';


export const LiistOfTodos = (props) => {  
    const { navigation} = props;
    const { toastRefer } = props
    const [ todos, setTodos ] = useState({});
    const [ isLoading, setIsLoading ]=useState(false)

    const getTodos = async () => {
      const id = await AsyncStorage.getItem('id');
      setIsLoading(true)
        await axios.get(`https://apitodoed.herokuapp.com/detail/${parseFloat(id)}`)
        .then(res => {
          toastRefer.current.show('Update: Ok');
          setTodos(res.data)
          console.log('ok');
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false)
        
        })
        setIsLoading(false)
      }
   const _signOutAsync = async () => {
      //#await AsyncStorage.clear();
      await AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => toastRefer.current.show('success sign up'));
        console.log(await AsyncStorage.getItem('auth'));
        console.log(await AsyncStorage.getItem('id'));
        navigation.navigate('Auth');
      };
  const keyExtractor = (item, index) => index.toString();

   const renderItem = ({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.description}
          subtitle={item.create_date}
          bottomDivider
          chevron
          containerStyle={styles.ListItem}
        />
      )

    return(
        <View style={styles.flatList}>
          <Button
            title="SIGN OUT"
            onPress={()=>_signOutAsync()}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnUpdate}
            icon={
              <Icon
                type="font-awesome"
                name="sign-out"
                iconStyle={styles.iconUpdate}
              />
            }
            iconRight
          />          
          <Button
            title="Update List"
            onPress={getTodos}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnUpdate}
            icon={
              <Icon
                type="material"
                name="loop"
                iconStyle={styles.iconUpdate}
              />
            }
            iconRight
          />
            <FlatList
              keyExtractor={keyExtractor}
              data={todos}
              renderItem={renderItem}
            />
            <Loading text="Actualizando..." isVisible={isLoading}/> 
        </View>
    );
}

const styles = StyleSheet.create({
    ListItem:{
        borderStyle: 'solid',
        borderColor: '#b482d1',
        borderLeftWidth: 5,
        borderRightColor: "#cecece",
        borderRightWidth: 5,
        marginBottom: 7,
        borderRadius: 12,
    },
    flatList:{
        width: "100%",
    },
    btnContainer:{
      marginBottom: 20,
    },
    btnUpdate:{
      borderRadius: 12,
      backgroundColor: "#651fff"
    },
    iconUpdate:{
      color: "#fff",
      marginLeft: 10
    },
    toast:{
      backgroundColor:"#651fff",
      color: "#fff",
  }
})