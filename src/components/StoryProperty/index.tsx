import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { GRAY, MUTED_CYAN } from "../../config/colors";

const StoryProperty = ({
  tag,
  value,
  serif,
  color = GRAY
}: {
  tag?: string;
  value: string;
  serif?: boolean;
  color?: string;
}) => (
  <View style={styles.property}>
    {tag && (
      <Text
        style={[styles.propertyTag, { color }, serif ? styles.serif : {}]}
      >{`${tag}:`}</Text>
    )}
    <Text
      style={[styles.propertyValue, serif ? styles.serif : {}]}
    >{`${value}`}</Text>
  </View>
);
const styles = StyleSheet.create({
  property: {
    flexDirection: "row",
    marginTop: 6
  },
  propertyTag: {
    fontSize: 12
  },
  propertyValue: {
    marginLeft: 4,
    fontSize: 12,
    color: MUTED_CYAN
  },
  serif: {
    fontSize: 14,
    fontStyle: "italic",
    fontFamily: Platform.OS === "android" ? "serif" : "Georgia"
  }
});

export default StoryProperty;
