import { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text, Animated } from "react-native";

const Categories = ({
  categories,
  open,
  setOpen,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [selected, setSelected] = useState(selectedCategories);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSelected(selectedCategories);
    if (!!open) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (!open) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  const pickCategory = (categoryId) => {
    if (selected.length > 0) {
      if (selected.includes(categoryId)) {
        const newSelection = selected.filter((id) => id !== categoryId);
        return setSelected(newSelection);
      }
      const newSelection = [...selected, categoryId];
      return setSelected(newSelection);
    }
    const selection = [categoryId];
    setSelected(selection);
  };

  const submit = () => {
    setSelectedCategories(selected);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setOpen(false)}
        style={styles.backDropPressable}
        pointerEvents={open ? "auto" : "none"}
      >
        <Animated.View
          style={[styles.backDrop, { opacity: animation }]}
        ></Animated.View>
      </Pressable>
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[styles.categories, { opacity: animation }]}
      >
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <Pressable
              key={category._id}
              onPress={() => pickCategory(category._id)}
            >
              <View
                style={
                  selected.length > 0
                    ? selected.includes(category._id)
                      ? styles.categorySelected
                      : styles.category
                    : styles.category
                }
              >
                <Text style={styles.categoryText}>{category.title}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <Pressable onPress={() => submit()} style={styles.submit}>
            <Text>Select Categories</Text>
          </Pressable>
          <Pressable onPress={() => setSelected([])}>
            <Text>Clear Categories</Text>
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backDropPressable: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  backDrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  categories: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 25,
    right: 25,
    left: 25,
    borderRadius: 25,
    paddingVertical: 50,
    elevation: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#9133ee",
    borderRadius: 100,
  },
  categorySelected: {
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f",
    borderRadius: 100,
  },
  categoryText: {
    color: "#fff",
  },
  btnContainer: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    marginBottom: 25,
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: "#f0f",
    elevation: 10,
    borderRadius: 5,
  },
});

export default Categories;
