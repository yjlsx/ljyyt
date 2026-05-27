/**
 * 联系表单邮件处理指南
 * 
 * 由于客户端JavaScript无法直接发送邮件（安全限制），
 * 您需要使用服务器端解决方案。
 * 
 * 以下是几种可行的方案：
 */

/*
方案1: 使用EmailJS (推荐)
1. 注册EmailJS账号: https://www.emailjs.com/
2. 在EmailJS中配置您的邮箱账户
3. 获取User ID, Service ID, Template ID
4. 替换index.html中的邮件发送代码如下:
*/

function sendContactEmailWithEmailJS(nickname, email, message) {
  // 配置EmailJS
  emailjs.init("YOUR_PUBLIC_KEY"); // 替换为您的公钥
  
  const templateParams = {
    from_name: nickname,
    from_email: email,
    message: message,
    to_email: "your-receiving-email@example.com" // 接收邮件的地址
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('您的消息已成功发送！');
      document.getElementById('contactForm').reset();
    }, function(error) {
      console.log('FAILED...', error);
      alert('发送失败，请稍后重试。');
    });
}

/*
方案2: 使用后端API
创建一个服务器端接口来处理邮件发送，例如：

POST /api/send-contact-email
{
  "nickname": "用户昵称",
  "email": "用户邮箱",
  "message": "留言内容"
}

服务器端使用nodemailer、sendgrid、mailgun等库发送邮件
*/

/*
方案3: 使用表单提交服务
例如Formspree、Netlify Forms等静态网站表单处理服务
*/

// 表单验证函数
function validateContactForm(formData) {
  const errors = [];
  
  if (!formData.nickname || formData.nickname.trim().length < 2) {
    errors.push('昵称至少需要2个字符');
  }
  
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.push('请输入有效的邮箱地址');
  }
  
  if (!formData.message || formData.message.trim().length < 5) {
    errors.push('留言内容至少需要5个字符');
  }
  
  return errors;
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 表单提交处理器
async function handleContactSubmit(event) {
  event.preventDefault();
  
  // 获取表单数据
  const formData = {
    nickname: document.getElementById('nickname').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  };
  
  // 验证数据
  const validationErrors = validateContactForm(formData);
  if (validationErrors.length > 0) {
    alert('请修正以下错误：\n' + validationErrors.join('\n'));
    return;
  }
  
  // 显示发送中状态
  const submitBtn = document.querySelector('#contactForm .btn-primary');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '发送中...';
  submitBtn.disabled = true;
  
  try {
    // 方案选择：使用EmailJS或后端API
    // await sendContactViaBackend(formData); // 后端API方案
    // 或
    // sendContactViaEmailJS(formData); // EmailJS方案
    
    console.log('表单数据:', formData);
  } catch (error) {
    console.error('提交失败:', error);
    alert('发送失败，请稍后重试。');
  } finally {
    // 恢复按钮状态
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// 绑定表单提交事件
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});

export { handleContactSubmit, validateContactForm, isValidEmail };