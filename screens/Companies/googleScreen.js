import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


function GoogleScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.logoTitle}>Google Insight</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center'
    },
    logoTitle: {
        color: '#FFF',
        marginTop: 40,
        fontSize: 20,
        width: 200,
        height: 40,
        textAlign: "center",
        justifyContent: 'center'
    }
});

export default GoogleScreen;