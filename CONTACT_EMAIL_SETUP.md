# 邮件功能配置说明

为了让"联系我们"表单能够真正发送邮件到您的邮箱，您需要完成以下配置：

## 方案一：使用 EmailJS（推荐）

### 1. 注册 EmailJS 账户
- 访问 https://www.emailjs.com/
- 注册免费账户

### 2. 配置邮件服务
- 登录 EmailJS 控制台
- 添加邮件服务（如 Gmail、Outlook 等）
- 按照指引完成邮箱验证

### 3. 创建邮件模板
- 在 EmailJS 控制台创建新模板
- 设置模板内容，例如：
  ```
  主题: {{subject}}
  
  来自: {{from_name}} <{{from_email}}>
  
  留言:
  {{message}}
  
  ---
  此邮件来自丽江音悦台网站联系表单
  ```

### 4. 更新网站代码
编辑 `index.html` 文件，找到以下部分并替换相应的值：

```javascript
// 在页面加载时初始化
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // 替换为您的公钥
})();

// 在发送邮件函数中
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

- `YOUR_PUBLIC_KEY`: 在 EmailJS 仪表板的 "Account" -> "Public Key" 中找到
- `YOUR_SERVICE_ID`: 在 EmailJS 仪表板的邮件服务设置中找到
- `YOUR_TEMPLATE_ID`: 在 EmailJS 仪表板的模板设置中找到

### 5. 设置接收邮箱
在 `sendContactEmail` 函数中，将 `"your-receiving-email@example.com"` 替换为您实际接收邮件的地址。

## 方案二：使用后端 API

如果您有自己的服务器，可以创建一个简单的后端服务来处理邮件发送：

### Node.js 示例：
```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { nickname, email, message } = req.body;
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password' // 使用应用专用密码
    }
  });
  
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'receiving-email@example.com',
    subject: `来自${nickname}的联系`,
    html: `
      <h2>丽江音悦台联系表单</h2>
      <p><strong>昵称:</strong> ${nickname}</p>
      <p><strong>邮箱:</strong> ${email}</p>
      <p><strong>留言:</strong></p>
      <p>${message}</p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('邮件发送失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

然后修改前端代码以调用此API端点。

## 重要提醒

- **安全性**: 如果使用方案一，不要在公开代码中暴露您的私钥
- **隐私**: 确保遵循相关的隐私法规
- **测试**: 配置完成后务必测试邮件发送功能

## 故障排除

如果邮件无法发送：
1. 检查所有配置项是否正确
2. 查看浏览器控制台是否有错误信息
3. 确认邮件服务商没有阻止发送
4. 验证邮箱地址是否有效