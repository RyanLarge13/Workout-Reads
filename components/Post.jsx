import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { client } from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import {
  useNavigate,
} from "react-router-native";

const Post = ({ post }) => {
  const builder = imageUrlBuilder(client);
  const navigate = useNavigate();

  function urlFor(source) {
    return builder.image(source);
  }

  const getDate = (string) => {
    return new Date(string).toLocaleDateString();
  };

  return (
    <View style={styles.post}>
      <Image
        height={200}
        fadeDuration={750}
        source={{ uri: post.image.asset.url }}
        alt="post hero"
        style={styles.img}
      />
      <View style={styles.titleAndDateContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>{getDate(post._createdAt)}</Text>
      </View>
      <View style={styles.postedBy}>
        <Image
          style={styles.profileImg}
          height={25}
          width={25}
          source={{ uri: post.postedBy.image }}
        />
        <Text style={styles.name}>{post.postedBy.name}</Text>
      </View>
      <Text style={styles.excerpt}>{post.excerpt}</Text>
      <View style={styles.commentAndLikeOutter}>
        <View style={styles.commentAndLikeInner}>
          <Icon name="heart" style={styles.icon} />
          <Text>{post.save?.length ? post.save.length : "0"}</Text>
        </View>
        <View style={styles.commentAndLikeInner}>
          <Icon name="comments" style={styles.icon} />
          <Text>{post.comments?.length ? post.comments.length : "0"}</Text>
        </View>
      </View>
      <View style={styles.categories}>
        {post.categories.map((category) => (
          <View key={category.title} style={styles.category}>
            <Text style={styles.categoryText}>{category.title}</Text>
          </View>
        ))}
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={() => navigate(`/${post._id}`)} style={styles.view}>
          <Text>View</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
  },
  img: {
    borderRadius: 10,
    marginBottom: 5,
  },
  titleAndDateContainer: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    maxWidth: "70%",
    fontSize: 20,
    marginBottom: 5,
  },
  excerpt: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 13,
  },
  commentAndLikeOutter: {
    marginBottom: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentAndLikeInner: {
    marginTop: 15,
    flexDirection: "row",
    textAlign: "center",
  },
  icon: {
    fontSize: 20,
    textAlign: "center",
    marginRight: 5,
  },
  categories: {
    marginTop: 15,
    marginBottom: 10,
    marginLeft: -5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  category: {
    marginHorizontal: 5,
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: "#9133ee",
    elevation: 5,
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
  },
  postedBy: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  date: {
    marginRight: 5,
    marginTop: 5,
    fontSize: 9,
  },
  profileImg: {
    borderRadius: 100,
    marginRight: 5,
  },
  name: {
    fontSize: 10,
  },
  btnContainer: {
    marginTop: 10,
  },
  view: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#f0f",
    elevation: 5,
  },
});

export default Post;
