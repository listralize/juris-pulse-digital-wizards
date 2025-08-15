// Verificação específica para produção
console.log('🔍 Production Check iniciado');

// Verificar se todos os elementos críticos estão presentes
const checkProductionReadiness = () => {
  const checks = {
    root: !!document.getElementById('root'),
    css: !!document.querySelector('style, link[rel="stylesheet"]'),
    scripts: !!document.querySelector('script[type="module"]'),
    fonts: document.fonts ? document.fonts.size > 0 : true,
    html: document.documentElement.classList.contains('dark'),
    body: document.body.style.backgroundColor !== ''
  };
  
  console.log('🎯 Production readiness checks:', checks);
  
  const allPassed = Object.values(checks).every(Boolean);
  console.log(allPassed ? '✅ Produção pronta' : '❌ Problemas detectados');
  
  return checks;
};

// Executar verificação
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkProductionReadiness);
} else {
  checkProductionReadiness();
}

// Verificação periódica
let checkCount = 0;
const intervalCheck = setInterval(() => {
  checkCount++;
  console.log(`🔄 Check ${checkCount}/5`);
  
  const status = checkProductionReadiness();
  
  if (checkCount >= 5 || Object.values(status).every(Boolean)) {
    clearInterval(intervalCheck);
    console.log('🏁 Verificação de produção finalizada');
  }
}, 2000);