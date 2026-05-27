// 搜索功能栏
console.log('🔍 搜索功能加载');

// 获取搜索表单
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');

if (searchForm && searchInput) {
  // 添加搜索表单提交事件
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var query = searchInput.value.trim();
    if (query) {
      console.log('🔍 搜索:', query);
      // 跳转到搜索页面
      window.location.href = 'search.html?q=' + encodeURIComponent(query);
    }
  });
  
  // 添加回车键搜索功能
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var query = searchInput.value.trim();
      if (query) {
        console.log('🔍 搜索:', query);
        window.location.href = 'search.html?q=' + encodeURIComponent(query);
      }
    }
  });
  
  console.log('✅ 搜索功能已启用');
} else {
  console.warn('⚠️ 未找到搜索表单');
}

// 移动端搜索框优化
if (window.innerWidth <= 768) {
  var navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse && searchForm) {
    // 将搜索框移到导航栏折叠菜单中
    var searchLi = document.createElement('li');
    searchLi.className = 'nav-item';
    searchLi.style.padding = '0.5rem 1rem';
    searchForm.style.maxWidth = '100%';
    searchForm.style.marginTop = '0.5rem';
    searchLi.appendChild(searchForm);
    
    var navbarNav = navbarCollapse.querySelector('.navbar-nav');
    if (navbarNav) {
      navbarNav.appendChild(searchLi);
    }
  }
}

console.log('🔍 搜索功能初始化完成');
