import { createContext, useState, useContext, useEffect } from "react";
import { getPosts, getCategories } from "../client.js";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(false);
  const [categories, setCatagories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [newSearch, setNewSearch] = useState(""); 

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCatagories(res);
      })
      .catch((err) => console.log(err));
    getPosts(0)
      .then((res) => {
        setPosts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
useEffect(() => {
    if (selectedCategories.length > 0) {
      const newPosts = posts.filter((post) => {
        const postCategoryIds = post.categories.map((cat) => cat._id);
        if (postCategoryIds.some((id) => selectedCategories.includes(id))) {
          return post;
        }
      });
      return setFilteredPosts(newPosts);
    }
    setFilteredPosts([]);
  }, [selectedCategories]);

  useEffect(() => {
    if (newSearch) {
      const newPosts = posts.filter((post) => post.title.includes(newSearch));
      setFilteredPosts(newPosts);
    }
    if (!newSearch) {
      setFilteredPosts([]);
    }
  }, [newSearch]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        categories,
        setCatagories,
        filteredPosts,
        setFilteredPosts,
        selectedCategories, 
        setSelectedCategories, 
        newSearch, 
        setNewSearch
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
