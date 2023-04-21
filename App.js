import { NativeRouter, Routes, Route} from "react-router-native";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PostDetails />} />
      </Routes>
    </NativeRouter>
  );
}
