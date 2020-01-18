import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { Container } from './styles';

export default function Main() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Main!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#fff',
  }
});
