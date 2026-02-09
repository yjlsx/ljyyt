import re

print('🔍 更新视频播放器以支持Bilibili嵌入（v2）...\n')

# 读取文件
with open('D:\\GitHub\\ljyyt\\video-player.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('📋 原始文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 查找并替换视频播放逻辑
old_video_creation = r"""// 创建视频元素
      var videoElement = document.createElement('video');
      videoElement.controls = true;
      
      // 检查URL参数是否包含autoplay=true
      var autoplayParam = getUrlParameter('autoplay');
      videoElement.autoplay = (autoplayParam === 'true');
      videoElement.playsInline = true;
      
      // 添加视频源
      var source = document.createElement('source');
      source.src = video.src;
      source.type = 'video/mp4';
      videoElement.appendChild(source);
      
      // 错误处理
      videoElement.addEventListener('error', function() {
        console.error('视频加载失败:', video.src);
        container.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <h3>视频加载失败</h3>
            <p>视频源可能已失效或网络连接有问题</p>
            <p class="small text-muted">视频URL: ${video.src.substring(0, 50)}...</p>
            <a href="index.html" class="btn btn-primary mt-3">返回首页</a>
          </div>
        `;
      });
      
      // 加载成功
      videoElement.addEventListener('loadeddata', function() {
        console.log('视频加载成功');
      });
      
      container.innerHTML = '';
      container.appendChild(videoElement);"""

new_video_creation = r"""// 检查是否是Bilibili视频
      var isBilibiliVideo = video.src.includes('bilibili.com') || video.src.includes('bvid=');
      
      if (isBilibiliVideo) {
        console.log('📺 检测到Bilibili视频，使用嵌入播放器');
        
        // 提取Bilibili视频ID
        var bvid = '';
        if (video.src.includes('bvid=')) {
          var bvidMatch = video.src.match(/bvid=([a-zA-Z0-9]+)/);
          if (bvidMatch) {
            bvid = bvidMatch[1];
          }
        } else if (video.src.includes('/video/')) {
          var videoIdMatch = video.src.match(/\/video\/([a-zA-Z0-9]+)/);
          if (videoIdMatch) {
            bvid = videoIdMatch[1];
          }
        }
        
        console.log('📹 Bilibili视频ID:', bvid);
        
        // 创建Bilibili嵌入播放器
        var iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.minHeight = '450px';
        iframe.src = '//player.bilibili.com/player.html?bvid=' + bvid + '&autoplay=1';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.allowFullscreen = true;
        iframe.style.borderRadius = '10px';
        
        container.innerHTML = '';
        container.appendChild(iframe);
        
        console.log('✅ Bilibili嵌入播放器已创建');
      } else {
        console.log('🎬 普通视频，使用HTML5视频播放器');
        
        // 创建视频元素
        var videoElement = document.createElement('video');
        videoElement.controls = true;
        
        // 检查URL参数是否包含autoplay=true
        var autoplayParam = getUrlParameter('autoplay');
        videoElement.autoplay = (autoplayParam === 'true');
        videoElement.playsInline = true;
        
        // 添加视频源
        var source = document.createElement('source');
        source.src = video.src;
        source.type = 'video/mp4';
        videoElement.appendChild(source);
        
        // 错误处理
        videoElement.addEventListener('error', function() {
          console.error('视频加载失败:', video.src);
          container.innerHTML = `
            <div class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              <h3>视频加载失败</h3>
              <p>视频源可能已失效或网络连接有问题</p>
              <p class="small text-muted">视频URL: ${video.src.substring(0, 50)}...</p>
              <a href="index.html" class="btn btn-primary mt-3">返回首页</a>
            </div>
          `;
        });
        
        // 加载成功
        videoElement.addEventListener('loadeddata', function() {
          console.log('视频加载成功');
        });
        
        container.innerHTML = '';
        container.appendChild(videoElement);
      }"""

if old_video_creation in content:
    content = content.replace(old_video_creation, new_video_creation)
    print('✅ 已更新视频播放逻辑')
    print('   - 添加了Bilibili视频识别')
    print('   - 添加了Bilibili嵌入播放器')
    print('   - 保留了普通视频播放器')
else:
    print('⚠️  未找到匹配的视频创建代码')
    print('   - 尝试查找其他模式')
    
    # 尝试更简单的替换
    if 'videoElement = document.createElement' in content:
        print('   - 找到视频元素创建代码')
        # 这里不替换，因为需要更精确的匹配
        print('   - 需要手动检查')

# 写回文件
with open('D:\\GitHub\\ljyyt\\video-player.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('\n📊 修复后文件统计:')
print(f'   文件大小: {len(content)} 字节')
print(f'   行数: {content.count(chr(10))} 行')

# 验证
if 'isBilibiliVideo' in content:
    print('\n✅ 已添加Bilibili视频识别')
else:
    print('\n❌ 未添加Bilibili视频识别')

if 'player.bilibili.com' in content:
    print('✅ 已添加Bilibili嵌入播放器')
else:
    print('❌ 未添加Bilibili嵌入播放器')

print('\n✅ 视频播放器更新完成！')
