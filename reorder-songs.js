#!/usr/bin/env node

/**
 * 歌曲ID重新排序工具
 * 功能：按顺序重新分配歌曲ID（从1开始），并显示处理进度
 */

const fs = require('fs');
const path = require('path');

// 配置
const SCRIPT_FILE = path.join(__dirname, 'script.js');
const BACKUP_FILE = path.join(__dirname, 'script.js.backup');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function progressBar(current, total, label = '') {
  const barLength = 30;
  const progress = current / total;
  const filledLength = Math.round(barLength * progress);
  const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
  const percentage = (progress * 100).toFixed(1);
  
  process.stdout.write(`\r${colors.cyan}${label} ${colors.bright}[${bar}] ${percentage}% (${current}/${total})${colors.reset}`);
  
  if (current === total) {
    console.log(); // 换行
  }
}

async function reorderSongIds() {
  log('\n🎵 歌曲ID重新排序工具', 'bright');
  log('═'.repeat(50), 'cyan');
  
  try {
    // 步骤1: 读取文件
    log('\n📖 步骤 1/5: 读取 script.js...', 'blue');
    const content = fs.readFileSync(SCRIPT_FILE, 'utf8');
    log('✓ 文件读取成功', 'green');
    
    // 步骤2: 创建备份
    log('\n💾 步骤 2/5: 创建备份文件...', 'blue');
    fs.writeFileSync(BACKUP_FILE, content);
    log(`✓ 备份已保存: ${path.basename(BACKUP_FILE)}`, 'green');
    
    // 步骤3: 提取音乐数据
    log('\n🔍 步骤 3/5: 解析音乐数据...', 'blue');
    const musicDataMatch = content.match(/const musicData = \[([\s\S]*?)\];/);
    
    if (!musicDataMatch) {
      throw new Error('无法找到 musicData 数组');
    }
    
    const musicDataStr = musicDataMatch[1];
    
    // 使用正则表达式分割每个歌曲对象
    const songObjects = [];
    let depth = 0;
    let currentObj = '';
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < musicDataStr.length; i++) {
      const char = musicDataStr[i];
      const prevChar = i > 0 ? musicDataStr[i - 1] : '';
      
      // 处理字符串
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }
      
      if (!inString) {
        if (char === '{') {
          depth++;
          if (depth === 1) {
            currentObj = '{';
            continue;
          }
        } else if (char === '}') {
          currentObj += char;
          depth--;
          if (depth === 0) {
            songObjects.push(currentObj.trim());
            currentObj = '';
            continue;
          }
        }
      }
      
      if (depth > 0) {
        currentObj += char;
      }
    }
    
    log(`✓ 找到 ${songObjects.length} 首歌曲`, 'green');
    
    // 步骤4: 重新分配ID
    log('\n🔄 步骤 4/5: 重新分配ID...', 'blue');
    const reorderedSongs = [];
    
    for (let i = 0; i < songObjects.length; i++) {
      let songObj = songObjects[i];
      const newId = i + 1;
      
      // 替换ID（支持多种格式）
      songObj = songObj.replace(
        /"id"\s*:\s*\d+|'id'\s*:\s*\d+|id\s*:\s*\d+/,
        `id: ${newId}`
      );
      
      reorderedSongs.push(songObj);
      
      // 显示进度
      progressBar(i + 1, songObjects.length, '处理进度:');
    }
    
    log('✓ ID重新分配完成', 'green');
    
    // 步骤5: 写入文件
    log('\n💾 步骤 5/5: 保存修改...', 'blue');
    
    const newMusicDataStr = `const musicData = [\n  ${reorderedSongs.join(',\n  ')}\n];`;
    const newContent = content.replace(
      /const musicData = \[[\s\S]*?\];/,
      newMusicDataStr
    );
    
    fs.writeFileSync(SCRIPT_FILE, newContent, 'utf8');
    log('✓ 文件保存成功', 'green');
    
    // 总结
    log('\n' + '═'.repeat(50), 'cyan');
    log('✨ 重新排序完成！', 'bright');
    log(`\n📊 处理统计:`, 'yellow');
    log(`   • 总歌曲数: ${songObjects.length}`, 'cyan');
    log(`   • ID范围: 1 - ${songObjects.length}`, 'cyan');
    log(`   • 备份文件: ${path.basename(BACKUP_FILE)}`, 'cyan');
    log('\n💡 提示: 如需恢复，运行: cp script.js.backup script.js', 'yellow');
    log('═'.repeat(50) + '\n', 'cyan');
    
  } catch (error) {
    log('\n❌ 错误: ' + error.message, 'red');
    log('\n💡 如果文件已损坏，可以从备份恢复:', 'yellow');
    log('   cp script.js.backup script.js', 'cyan');
    process.exit(1);
  }
}

// 执行
reorderSongIds();
