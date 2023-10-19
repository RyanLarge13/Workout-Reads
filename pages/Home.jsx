import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, FlatList, Text, View } from "react-native";
import { getPosts, getCategories } from "../client.js";
import "react-native-url-polyfill/auto";
import Post from "../components/Post.jsx";

const Home = () => {
  const [posts, setPosts] = useState(false);
  const [categories, setCatagories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((res) => setCatagories(res))
      .catch((err) => console.log(err));
    getPosts(0)
      .then((res) => {
        setPosts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      {posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post post={item} key={item._id} />}
          keyExtractor={(post) => post._id}
        />
      )}
      <StatusBar translucent={true} style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
