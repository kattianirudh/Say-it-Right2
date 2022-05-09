import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#000000" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    backgroundColor: 'lightgrey',
    opacity: 0.3,
    top: 0,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loading;