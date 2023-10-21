import { NativeRouter, Routes, Route } from "react-router-native";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import { PostsProvider } from "./context/PostsContext";

export default function App() {
  return (
    <NativeRouter>
        <PostsProvider>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PostDetails />} />
      </Routes>
        </PostsProvider>
    </NativeRouter>
  );
}
