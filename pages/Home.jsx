import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Text,
  View,
} from "react-native";
import { getPosts, getCategories } from "../client.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import "react-native-url-polyfill/auto";
import Post from "../components/Post.jsx";
import Categories from "../components/Categories.jsx";
import Search from "../components/Search.jsx";
import { usePostsContext } from "../context/PostsContext";

const Home = () => {
  const {
    posts,
    setPosts,
    categories,
    setCategories,
    filteredPosts,
    setFilteredPosts,
    selectedCategories,
    setSelectedCategories,
    setNewSearch,
  } = usePostsContext();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <View style={styles.container}>
      {posts.length > 0 && (
        <>
          <FlatList
            contentContainerStyle={{
              paddingTop: 100,
              justifyContent: "flex-start",
            }}
            data={filteredPosts.length > 0 ? filteredPosts : posts}
            renderItem={({ item }) => <Post post={item} key={item._id} />}
            keyExtractor={(post) => post._id}
          />
          <Pressable style={styles.categoryBtn} onPress={() => setOpen(true)}>
            <Icon name="filter-menu" style={styles.filterIcon} />
            {selectedCategories.length > 0 && (
              <Text style={styles.filterLength}>
                {selectedCategories.length}
              </Text>
            )}
          </Pressable>
          <Pressable
            style={styles.searchBtn}
            onPress={() => setSearchOpen((prev) => !prev)}
          >
            <Icon name="feature-search" style={styles.searchIcon} />
          </Pressable>
          <Categories
            categories={categories}
            open={open}
            setOpen={setOpen}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <Search
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            setNewSearch={setNewSearch}
          />
        </>
      )}
      {posts.length > 0 && posts.length === 20 && (
        <View>
          <Pressable>
            <Text>Prev</Text>
          </Pressable>
          <Pressable>
            <Text>Next</Text>
          </Pressable>
        </View>
      )}
      <StatusBar translucent={true} style="dark" />
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
  categoryBtn: {
    position: "absolute",
    top: 50,
    left: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  filterIcon: {
    fontSize: 25,
  },
  filterLength: {
    position: "absolute",
    top: -5,
    left: -5,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "#f22",
    fontSize: 8,
  },
  searchBtn: {
    position: "absolute",
    top: 50,
    right: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  searchIcon: {
    fontSize: 25,
  },
});

export default Home;
