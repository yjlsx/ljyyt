# 丽江音悦台 - 项目说明

## 📁 项目结构

```
D:\GitHub\lijiang-music-website\
├── index.html              # 主页面
├── video-player.html       # 视频播放页面
├── script.js               # JavaScript脚本
├── style.css               # 样式文件
├── videos/                 # 视频文件夹
│   ├── video_data.js       # 视频数据文件
│   └── video_data_template.js # 视频数据模板
├── images/                 # 图片文件夹
│   └── avatar.jpg          # 网站头像
├── test_all_features.html  # 功能测试页面
├── test_tabs.html          # 标签页测试
├── test_music_list.html    # 音乐列表测试
└── test_progress.html      # 进度条测试
```

## 🎵 功能特性

### 1. 音乐功能
- ✅ 10首纳西族音乐
- ✅ 音乐列表显示
- ✅ 音乐播放控制
- ✅ 进度条显示和拖动
- ✅ 音量控制
- ✅ 底部悬浮播放器

### 2. 视频功能
- ✅ 4个视频（2个本地视频 + 2个在线MV）
- ✅ 视频列表显示（大封面设计）
- ✅ 专用视频播放页面
- ✅ 视频播放器
- ✅ 相关视频推荐

### 3. 标签页功能
- ✅ 音乐/视频标签切换
- ✅ 平滑过渡效果
- ✅ 激活状态标识
- ✅ 响应式设计

### 4. 界面设计
- ✅ 统一的导航栏
- ✅ 渐变背景效果
- ✅ 卡片悬停动画
- ✅ 响应式布局

## 📊 数据统计

- **音乐数量**：10首
- **视频数量**：4个
- **标签页**：2个（音乐、视频）

## 🔗 重要文件说明

### videos/video_data.js
视频数据文件，包含所有视频的信息：
- 本地视频：`./videos/naxi_dance.mp4`, `./videos/yulong_snow_mountain.mp4`
- 在线MV：酷狗音乐MV链接

### script.js
主要JavaScript文件，包含：
- 音乐数据（10首）
- 播放器控制逻辑
- 标签页切换功能
- 进度条拖动功能

### index.html
主页面，包含：
- 导航栏
- 音乐/视频标签页
- 底部悬浮播放器

### video-player.html
视频播放页面，包含：
- 视频播放器
- 视频信息显示
- 相关视频推荐

## 🚀 使用方法

### 1. 本地开发
直接在浏览器中打开 `index.html` 文件

### 2. 视频文件准备
确保以下视频文件存在于 `videos/` 文件夹：
- `naxi_dance.mp4` - 纳西族传统舞蹈表演
- `yulong_snow_mountain.mp4` - 玉龙雪山风光

### 3. 图片文件准备
确保以下图片文件存在于 `images/` 文件夹：
- `avatar.jpg` - 网站头像

## 🎨 自定义配置

### 添加新音乐
在 `script.js` 的 `musicData` 数组中添加新的音乐对象：

```javascript
{
  id: 11,
  title: "歌曲标题",
  artist: "艺术家",
  album: "专辑名称",
  src: "音乐文件URL",
  cover: "封面图片URL",
  duration: 时长（秒）,
  type: "music"
}
```

### 添加新视频
在 `videos/video_data.js` 的 `videoData` 数组中添加新的视频对象：

```javascript
{
  id: 105,
  title: "视频标题",
  artist: "创作者",
  album: "视频系列",
  src: "视频文件URL",
  cover: "封面图片URL",
  duration: 时长（秒）,
  type: "video",
  description: "视频描述"
}
```

## 🧪 测试页面

### test_all_features.html
功能总览测试页面，包含：
- 所有功能状态检查
- 测试链接
- 文件结构说明
- 使用说明

### test_tabs.html
标签页功能测试页面

### test_music_list.html
音乐列表功能测试页面

### test_progress.html
进度条功能测试页面

## 📝 注意事项

1. **视频文件路径**：确保本地视频文件路径正确
2. **图片文件**：确保所有图片文件都存在
3. **浏览器兼容性**：建议使用现代浏览器（Chrome、Firefox、Edge）
4. **网络连接**：在线视频需要网络连接

## 🎯 技术栈

- **HTML5**：页面结构
- **CSS3**：样式设计
- **JavaScript**：交互逻辑
- **Bootstrap 5**：UI框架
- **Font Awesome**：图标库

## 📞 联系方式

如有问题，请联系：
- 邮箱：contact@lijiang-music.com
- 网站：https://lijiang-music.com

---

**© 2026 丽江音悦台. 保留所有权利.**
**传承纳西文化，分享民族音乐之美**