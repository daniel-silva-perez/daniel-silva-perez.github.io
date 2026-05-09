(function() {
  var t = localStorage.getItem('theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
  var c = localStorage.getItem('caseMode') || 'lowercase';
  if (c === 'lowercase') document.documentElement.setAttribute('data-case', 'lowercase');
})();
