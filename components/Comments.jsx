import { View, Text, StyleSheet, Image } from "react-native";

const Comments = ({ data }) => {
  return (
    <View style={styles.comment}>
      <Image
        height={25}
        width={25}
        source={{ uri: data.postedBy.image }}
        style={styles.img}
      />
      <Text style={styles.commentBodyText}>{data.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    marginVertical: 15,
    marginHorizontal: 25,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#fff",
  },
  img: {
    borderRadius: 100,
    marginRight: 10,
  },
  commentBodyText: {
    fontSize: 12,
    maxWidth: "90%",
  },
});

export default Comments;
