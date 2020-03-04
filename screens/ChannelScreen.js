import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

function ChannelScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Channel Page!!</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

export default ChannelScreen;