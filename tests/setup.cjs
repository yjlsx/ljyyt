// Auto-patch fs.readFileSync for split index.html compatibility
const Module = require('module');
const path = require('path');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  const module = originalRequire.apply(this, arguments);
  
  if (id === 'fs') {
    const originalReadFileSync = module.readFileSync;
    
    module.readFileSync = function(filePath, ...args) {
      const resolved = path.resolve(filePath);
      const basename = path.basename(resolved);
      const dirname = path.dirname(resolved);
      
      // Intercept index.html reads and return combined content
      if (basename === 'index.html') {
        const html = originalReadFileSync.apply(this, arguments);
        
        // Check for external references
        const hasExternalJs = /<script\s+src="js\/app\.js"><\/script>/i.test(html);
        const hasExternalCss = /<link\s+rel="stylesheet"\s+href="css\/styles\.css">/i.test(html);
        
        if (hasExternalJs || hasExternalCss) {
          let combined = html;
          
          // Inline JS
          if (hasExternalJs) {
            const jsPath = path.join(dirname, 'js/app.js');
            try {
              const jsContent = originalReadFileSync(jsPath, 'utf8');
              combined = combined.replace(
                /<script\s+src="js\/app\.js"><\/script>/i,
                `<script>\n${jsContent}\n  </script>`
              );
            } catch (e) {}
          }
          
          // Inline CSS
          if (hasExternalCss) {
            const cssPath = path.join(dirname, 'css/styles.css');
            try {
              const cssContent = originalReadFileSync(cssPath, 'utf8');
              combined = combined.replace(
                /<link\s+rel="stylesheet"\s+href="css\/styles\.css">/i,
                `<style>\n${cssContent}\n  </style>`
              );
            } catch (e) {}
          }
          
          return args[0] === 'utf8' ? combined : Buffer.from(combined);
        }
      }
      
      return originalReadFileSync.apply(this, arguments);
    };
  }
  
  return module;
};
