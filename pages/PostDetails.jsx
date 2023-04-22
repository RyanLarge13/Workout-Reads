import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  BackHandler,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { singlePost } from "../client.js";
import { useParams, useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RenderHtml from "react-native-render-html";
import Comments from "../components/Comments";

const PostDetails = () => {
  const [post, setPost] = useState(false);
  const [source, setSource] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNav = () => {
      navigate("/");
      return true;
    };
    const back = BackHandler.addEventListener("hardwareBackPress", handleNav);
    singlePost(id)
      .then((res) => {
        setPost(res[0]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => back.remove();
  }, []);

  useEffect(() => {
    const source = {
      html: post.body,
    };
    setSource(source);
  }, [post]);

  return (
    <ScrollView>
      {post && source ? (
        <>
          <Image height={300} source={{ uri: post.image.asset.url }} />
          <View style={styles.infoParent}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.excerpt}>{post.excerpt}</Text>
            <View style={styles.categories}>
              {post.categories.map((category) => (
                <View key={category.title} style={styles.category}>
                  <Text style={styles.categoryText}>{category.title}</Text>
                </View>
              ))}
            </View>
            <View style={styles.info}>
              <View style={styles.postedBy}>
                <Image
                  height={50}
                  width={50}
                  source={{ uri: post.postedBy.image }}
                  style={styles.postedByImg}
                />
                <Text>{post.postedBy.name}</Text>
              </View>
              <View style={styles.commentAndLikeOutter}>
                <View style={styles.commentAndLikeInner}>
                  <Icon name="heart" style={styles.icon} />
                  <Text>{post.save?.length ? post.save.length : "0"}</Text>
                </View>
                <View style={styles.commentAndLikeInner}>
                  <Icon name="comments" style={styles.icon} />
                  <Text>
                    {post.comments?.length ? post.comments.length : "0"}
                  </Text>
                </View>
              </View>
              <View style={styles.dates}>
                <View style={styles.dateInner}>
                  <Text style={styles.smallText}>Created On</Text>
                  <Text style={styles.date}>
                    {new Date(post._createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.dateInner}>
                  <Text style={styles.smallText}>Last Updated</Text>
                  <Text style={styles.date}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <RenderHtml source={source} />
          </View>
          <Text style={styles.update}>
            Last updated {new Date(post.publishedAt).toLocaleDateString()}
          </Text>
          <View style={styles.comments}>
            <>
              <Text style={styles.commentsTitle}>Comments</Text>
              {post.comments ? (
                post.comments.map((comment) => (
                  <Comments key={comment._key} data={comment} />
                ))
              ) : (
                <Text style={styles.noComment}>No comments to show</Text>
              )}
            </>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 5,
    marginTop: 10,
    fontSize: 25,
    textAlign: "center",
  },
  infoParent: {
    backgroundColor: "#f1f1f1",
    marginBottom: 50,
    elevation: 5,
  },
  info: {
    marginVertical: 50,
    paddingVertical: 20,
  },
  postedBy: {
    justifyContent: "center",
    alignItems: "center",
  },
  postedByImg: {
    borderRadius: 100,
  },
  excerpt: {
    marginTop: 10,
    marginHorizontal: 5,
    textAlign: "center",
  },
  categories: {
    marginTop: 15,
    marginBottom: 10,
    marginLeft: -5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
  commentAndLikeOutter: {
    marginTop: 5,
    paddingHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentAndLikeInner: {
    flexDirection: "row",
    textAlign: "center",
  },
  icon: {
    fontSize: 20,
    textAlign: "center",
    marginRight: 5,
  },
  dates: {
    flexDirection: "row",
    paddingHorizontal: 25,
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    marginBottom: 5,
    fontSize: 10,
  },
  smallText: {
    fontSize: 10,
  },
  body: {
    paddingHorizontal: 15,
  },
  update: {
    marginRight: 15,
    marginTop: 15,
    marginBottom: 5,
    textAlign: "right",
    fontSize: 10,
  },
  comments: {
    backgroundColor: "#f1f1f1",
  },
  commentsTitle: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 20,
  },
  noComment: {
    marginVertical: 25,
    textAlign: "center",
  },
});

export default PostDetails;
