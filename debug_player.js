(function(){
  var r = [];
  var bp = document.getElementById('bottom-player');
  r.push('bottom-player: ' + !!bp);
  var ctrls = document.querySelector('#bottom-player .player-controls');
  r.push('player-controls: ' + !!ctrls);
  if(ctrls) r.push('controls children: ' + ctrls.children.length + ' | ' + Array.from(ctrls.children).map(c => c.id || c.tagName).join(', '));
  var vc = document.querySelector('#bottom-player .volume-control');
  r.push('volume-control: ' + !!vc);
  var bl = document.getElementById('btn-list');
  r.push('btn-list in DOM: ' + !!bl);
  if(bl) r.push('btn-list parent: ' + (bl.parentElement.id||bl.parentElement.className));
  if(bl) r.push('btn-list visible: ' + (bl.offsetParent !== null) + ' | display:' + getComputedStyle(bl).display + ' | opacity:' + getComputedStyle(bl).opacity);
  var bodyClass = Array.from(document.body.classList).filter(c=>c.includes('player'));
  r.push('body player classes: ' + bodyClass.join(', '));
  var toggle = document.getElementById('bottom-player-toggle');
  r.push('toggle: ' + !!toggle);
  // Check if player_enhanced.js is loaded
  r.push('playerEnhanced loaded: ' + typeof window.cycleMode);
  
  alert(r.join('\n'));
})();
