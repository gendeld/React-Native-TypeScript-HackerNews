import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const goBack = (navigation: any) => {
  if (navigation && navigation.goBack) {
    navigation.goBack(null);
  }
};

const Header = ({
  shouldHideBackButton,
  navigation
}: {
  shouldHideBackButton?: boolean;
  navigation?: any;
}) => (
  <View style={styles.header}>
    <Image
      style={styles.headerImage}
      resizeMode="contain"
      source={require("../../images/news.jpg")}
    />
    {!shouldHideBackButton && (
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={goBack.bind(null, navigation)}
          style={styles.backButton}
        >
          <Icon size={24} name="md-arrow-back" />
        </TouchableOpacity>
      </View>
    )}
  </View>
);
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7
  },
  backButtonContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 10,
    justifyContent: "center"
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  headerImage: { flex: 1, maxWidth: "90%" }
});

export default Header;
