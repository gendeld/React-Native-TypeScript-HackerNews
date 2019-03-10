import React, { Component } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import StoryListPage from "./pages/StoryListPage";
import StoryPage from "./pages/StoryPage";
import { StoryContext } from "./config/context";
import { TOP_STORY_DATA_URL, TOP_STORIES_URL } from "./config/constants";
import { Story } from "./config/types";
import { OFF_WHITE } from "./config/colors";

const AppNavigator = createStackNavigator(
  {
    StoryListPage: {
      screen: StoryListPage
    },
    StoryPage: {
      screen: StoryPage
    }
  },
  {
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

interface Props {}
interface State {
  isLoading: boolean;
  topStories: Story[];
}

export default class App extends Component<Props, State> {
  state = {
    isLoading: false,
    topStories: []
  };

  componentDidMount() {
    this.getHackerNewsArticles();
  }

  getTopStoryData = (topStoryId: number) =>
    new Promise<Story | null>(resolve => {
      // console.warn(`${TOP_STORY_DATA_URL}/${topStoryId}.json`);
      fetch(`${TOP_STORY_DATA_URL}/${topStoryId}.json`)
        .then(res => res.json())
        .then((storyData: Story) => resolve(storyData))
        .catch(err => {
          console.warn(`Get top story data error: ${JSON.stringify(err)}`);
          resolve();
        });
    });

  getHackerNewsArticles() {
    const { isLoading } = this.state;
    if (!isLoading) this.setState({ isLoading: true });
    fetch(TOP_STORIES_URL)
      .then(res => res.json())
      .then(async (topStoryIds = []) => {
        const topStoryPromises = topStoryIds.map(this.getTopStoryData);
        let topStories = await Promise.all(topStoryPromises);
        topStories.filter(topStory => topStory); // Filter out failed requests
        this.setState({ isLoading: false, topStories });
      });
  }

  render() {
    const { topStories, isLoading } = this.state;
    return (
      <StoryContext.Provider value={{ topStories, isLoading }}>
        <SafeAreaView style={styles.root}>
          <AppContainer />
        </SafeAreaView>
      </StoryContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: OFF_WHITE
  }
});
