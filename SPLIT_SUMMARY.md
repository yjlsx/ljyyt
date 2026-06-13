# index.html 拆分总结

## 完成的工作

### 1. 文件拆分
- ✅ 将 index.html 中的 CSS 提取到 `css/styles.css` (78 KB)
- ✅ 将 index.html 中的 JS 提取到 `js/app.js` (227 KB)
- ✅ index.html 从 309 KB 减少到 4 KB（只保留 HTML 结构）

### 2. 构建系统更新
- ✅ 更新 `scripts/build-dist.cjs` 以支持内联外部资源
- ✅ dist/index.html 构建时自动内联 CSS 和 JS

### 3. 测试适配
- ✅ 创建 `tests/setup.cjs` - 自动 patch fs.readFileSync
- ✅ 更新 `tests/test-helpers.cjs` - 添加 readSourceContent 等辅助函数
- ✅ 更新 `scripts/run-tests.cjs` - 自动加载 setup
- ✅ 修复 js/app.js 末尾缺失的 `});`

### 4. 测试结果
- **之前**: 61 个测试失败
- **之后**: 2 个测试失败（都是 worker 相关，与拆分无关）
- **通过率**: 101/103 (98.1%)

## 技术方案

通过 monkey-patching fs.readFileSync，当测试读取 index.html 时：
1. 检测是否有外部引用（`<script src="js/app.js">` 和 `<link href="css/styles.css">`）
2. 如果有，自动读取外部文件并内联到 HTML 中
3. 返回合并后的内容，对测试透明

这样无需修改 103 个测试文件，只需 2 个辅助文件即可适配。

## 文件结构

```
ljyyt/
├── index.html          (4 KB, 只含 HTML)
├── css/
│   └── styles.css      (78 KB)
├── js/
│   └── app.js          (227 KB)
├── dist/
│   └── index.html      (309 KB, 内联版本)
└── tests/
    ├── setup.cjs       (自动加载的 patch)
    └── test-helpers.cjs (辅助函数)
```
