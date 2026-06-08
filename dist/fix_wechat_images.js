// 修复微信公众号图片防盗链问题（精准方案）
console.log('🔍 开始修复微信公众号图片...');

document.addEventListener('DOMContentLoaded', function() {
  // 查找所有微信公众号的图片
  const wechatImages = document.querySelectorAll('img[src*="mmbiz.qpic.cn"], img[src*="mmbiz.qlogo.cn"]');
  
  if (wechatImages.length > 0) {
    console.log('📸 找到 ' + wechatImages.length + ' 张微信公众号图片');
    
    wechatImages.forEach(function(img, index) {
      // 设置 referrerpolicy 属性
      img.setAttribute('referrerpolicy', 'no-referrer');
      
      // 如果图片已经加载失败，强制重载
      if (!img.complete || img.naturalWidth === 0) {
        console.log('🔄 重载图片 ' + (index + 1) + ': ' + img.src.substring(0, 50) + '...');
        
        // 保存原始 src
        const originalSrc = img.src;
        
        // 先清空 src，然后重新设置
        img.src = '';
        setTimeout(function() {
          img.src = originalSrc;
        }, 10);
      }
    });
    
    console.log('✅ 微信公众号图片修复完成');
  } else {
    console.log('ℹ️  未找到微信公众号图片');
  }
});

// 监听动态添加的图片（可选）
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeName === 'IMG') {
        const src = node.getAttribute('src');
        if (src && (src.includes('mmbiz.qpic.cn') || src.includes('mmbiz.qlogo.cn'))) {
          node.setAttribute('referrerpolicy', 'no-referrer');
          console.log('🔄 修复动态添加的微信图片');
        }
      }
    });
  });
});

// 开始观察整个文档
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('✅ 微信公众号图片修复脚本已加载');
