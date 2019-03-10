import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import StoryRow from "../../components/StoryRow";
import Header from "../../components/Header";
import { StoryContext } from "../../config/context";
import { Story } from "../../config/types";
import { OFF_WHITE } from "../../config/colors";
import textBind from "../../config/textBind";

interface Props {
  navigation: any;
}
interface State {}

class StoryListPage extends React.Component<Props, State> {
  renderStoryRow = ({ item }: { item: Story }) => {
    const { navigation } = this.props;
    return <StoryRow story={item} {...{ navigation }} />;
  };

  render() {
    return (
      <View style={styles.root}>
        <StoryContext.Consumer>
          {({ isLoading, topStories }) =>
            isLoading ? (
              <View>
                <ActivityIndicator size="large" color="black" />
                <Text style={styles.loadingText}>
                  {textBind.storyListPage.loading}
                </Text>
              </View>
            ) : (
              <FlatList
                data={topStories}
                keyExtractor={story => story && story.id.toString()}
                renderItem={this.renderStoryRow}
                ListHeaderComponent={() => <View style={{ height: 16 }} />}
              />
            )
          }
        </StoryContext.Consumer>
        <Header shouldHideBackButton />
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "center",
    backgroundColor: OFF_WHITE
  },
  loadingText: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  }
});

export default StoryListPage;
