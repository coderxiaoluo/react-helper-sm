import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import musicPlayer from "./services/MusicPlayer.js";

// 应用启动时预初始化音乐播放器
musicPlayer.init();

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
