/**
 * 音源切换优化 - 修复日志
 *
 * 问题：即使当前音源可以播放，也会显示"正在搜索免费音源"
 *
 * 根本原因：
 * 1. switchToFallbackSource() 在尝试代理播放后，仍会进入 for 循环
 * 2. 提示在循环第一次迭代时就显示，但此时可能不需要换源
 *
 * 修复方案：
 * 1. 添加 shouldShowToast 变量判断是否真的需要换源
 * 2. 只在第一次尝试（attempt === 0）且确实需要换源时才显示提示
 * 3. 如果 attemptLimit === 0（没有备用音源），不显示提示
 */

// 修改前：
async function switchToFallbackSource(reason, requestId, failedUrl) {
  // ... 省略前面代码

  // ❌ 问题：无条件显示提示
  for (var attempt = 0; attempt < attemptLimit; attempt++) {
    showToast('正在搜索免费音源...', 2000); // 总是显示
    // ...
  }
}

// 修改后：
async function switchToFallbackSource(reason, requestId, failedUrl) {
  // ... 省略前面代码

  var attemptLimit = Math.max(1, inferTrackSourceCandidates(currentTrack).length);
  var shouldShowToast = attemptLimit > 0; // ✅ 判断是否真的需要换源

  for (var attempt = 0; attempt < attemptLimit; attempt++) {
    // ✅ 只在第一次尝试且确实需要换源时才显示
    if (shouldShowToast && attempt === 0) {
      showToast('正在搜索免费音源...', 2000);
    }
    // ...
  }
}

/**
 * 测试场景
 *
 * 场景 1：代理播放成功
 * - 预期：不显示"正在搜索免费音源"
 * - 原因：tryProxyPlaybackLine() 成功，直接返回，不进入循环
 *
 * 场景 2：代理失败，但有备用音源
 * - 预期：显示"正在搜索免费音源"
 * - 原因：shouldShowToast = true，attempt === 0
 *
 * 场景 3：代理失败，没有备用音源
 * - 预期：不显示提示（或显示其他提示）
 * - 原因：attemptLimit === 0 或 1，但会根据实际情况处理
 *
 * 场景 4：第一个备用音源失败，尝试第二个
 * - 预期：只在第一次显示提示，第二次不再显示
 * - 原因：attempt === 1，不满足 attempt === 0 的条件
 */

/**
 * 附加优化建议
 *
 * 1. 区分错误类型
 *    - 网络错误 → "网络异常，正在重试..."
 *    - 音源错误 → "正在搜索免费音源..."
 *    - 版权限制 → "该歌曲暂无版权，正在寻找..."
 *
 * 2. 更智能的提示
 *    - 如果有预热结果 → "正在切换音源..."（更快）
 *    - 如果没有预热 → "正在搜索免费音源..."（较慢）
 *
 * 3. 提示去重
 *    - 短时间内多次失败，不要重复显示相同提示
 *    - 使用 toast ID 来更新现有提示，而不是创建新的
 */

// 更精细的错误处理示例：
function getErrorMessage(error, hasPrewarm) {
  if (isNetworkError(error)) {
    return '网络异常，正在重试...';
  }

  if (isCopyrightError(error)) {
    return '该歌曲暂无版权，正在寻找其他音源...';
  }

  if (hasPrewarm) {
    return '正在切换音源...'; // 有预热，速度快
  }

  return '正在搜索免费音源...'; // 默认
}

/**
 * 文件修改清单
 *
 * ✅ js/app.js - 第 1393-1424 行
 * ✅ index.html - 第 3501-3532 行
 *
 * 影响范围：
 * - switchToFallbackSource() 函数
 * - 音源切换时的用户提示
 *
 * 测试建议：
 * 1. 播放一首歌，触发音源切换
 * 2. 观察是否只在真正需要换源时才显示提示
 * 3. 尝试多个场景（代理成功、代理失败、多次失败等）
 */
