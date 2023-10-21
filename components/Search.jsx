import { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Animated, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Search = ({ searchOpen, setSearchOpen, setNewSearch }) => {
  const [search, setSearch] = useState("");

  const animation = useRef(new Animated.Value(0)).current;

  const submit = () => {
    if (!search) {
      setNewSearch(false);
      return setSearchOpen(false);
    }
    if (search) {
      setNewSearch(search);
      setSearchOpen(false)
    }
  };

  useEffect(() => {
    if (!!searchOpen) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (!searchOpen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [searchOpen]);

  return (
    <Animated.View
      style={[styles.container, { opacity: animation }]}
      pointerEvents={searchOpen ? "auto" : "none"}
    >
      <TextInput
        placeholder="Search"
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        onSubmitEditing={() => submit()}
      />
      <Pressable onPress={() => submit()}>
        <Icon name="search" style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 5,
    padding: 10,
  },
  input: {
    flex: 5,
  },
  icon: {
    fontSize: 20,
  },
});

export default Search;
