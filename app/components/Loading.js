import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

export const Loading = (props) => {
    const { text, isVisible } = props;
    return( 
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor= "transparent"
        overlayStyle={styles.overlay}        
        >
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#1983ff"/>
                {
                    text &&(
                        <Text style={styles.text}>
                            {text}
                        </Text>
                    )
                }
            </View>

        </Overlay>
    
    );

}

const styles = StyleSheet.create({
    overlay:{
        height: 120,
        width: 200,
        backgroundColor: "#fff",
        borderRadius: 12
    },
    view:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        color: "#1983ff",
        textTransform: "uppercase",
        marginTop: 22
    }
})