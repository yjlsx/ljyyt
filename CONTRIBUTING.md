# 贡献指南

## Commit Message 规范

使用语义化提交信息，格式：`<type>: <description>`

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构（既不是新功能也不是修复）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具/依赖更新
- `ci`: CI/CD 配置

### 示例

```
feat: add netease playlist support
fix: resolve QQ audio truncation issue
docs: update API documentation
chore: add ESLint configuration
```

## 开发流程

1. 运行测试：`npm test`
2. 代码检查：`npm run lint`
3. 构建：`npm run build`
4. 本地预览：`npm start`

## 代码规范

- 使用 ESLint 检查代码质量
- 使用 Prettier 统一格式
- 提交前运行 `npm run lint:fix` 自动修复格式问题
