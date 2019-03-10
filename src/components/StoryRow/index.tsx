import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import StoryProperty from "../StoryProperty";
import { Story } from "../../config/types";
import textBind from "../../config/textBind";
import { getTimestampString } from "../../lib/functions";

const openStory = (story: Story, navigation: any) => {
  if (navigation && navigation.push) {
    navigation.push("StoryPage", {
      story
    });
  }
};

const StoryRow = ({ story, navigation }: { story: Story; navigation: any }) => {
  const { id, by, title, time } = story;
  return (
    <TouchableOpacity
      onPress={openStory.bind(null, story, navigation)}
      style={styles.storyRow}
      key={id}
    >
      <Text>{title}</Text>
      <View style={styles.propertiesRow}>
        <StoryProperty tag={textBind.storyRow.writtenBy} value={by} />
        <StoryProperty value={getTimestampString(time)} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  storyRow: {
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: 70,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  propertiesRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default StoryRow;
