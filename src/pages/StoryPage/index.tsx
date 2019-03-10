import React from "react";
import {
  WebView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import Header from "../../components/Header";
import { OFF_WHITE, ALMOST_BLACK, DARK_GRAY } from "../../config/colors";
import { getTimestampString } from "../../lib/functions";
import textBind from "../../config/textBind";
import StoryProperty from "../../components/StoryProperty";

interface Props {
  navigation: any;
}
interface State {
  loading: boolean;
}

class StoryPage extends React.Component<Props, State> {
  state = {
    loading: true
  };

  onLoadEnd = () => {
    this.setState({ loading: false });
  };

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    const story = navigation && navigation.getParam("story");
    const { by = "", score = 0, time = 0, title = "", url = "" } = story || {};
    return (
      <View style={styles.root}>
        <View style={styles.storyInfo}>
          <Text style={styles.title}>{title}</Text>
          <StoryProperty
            tag={textBind.storyRow.writtenBy}
            value={by}
            color={DARK_GRAY}
            serif
          />
          <StoryProperty
            tag={textBind.storyPage.publishedAt}
            value={getTimestampString(time)}
            color={DARK_GRAY}
            serif
          />
          <StoryProperty
            tag={textBind.storyPage.score}
            value={`${score.toString()} / 100`}
            color={DARK_GRAY}
            serif
          />
        </View>
        {url && <WebView onLoadEnd={this.onLoadEnd} source={{ uri: url }} />}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={ALMOST_BLACK} />
          </View>
        )}
        <Header {...{ navigation }} />
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: ALMOST_BLACK,
    marginBottom: 6
  },
  storyInfo: {
    padding: 30
  },
  loadingContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,.5)",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StoryPage;
