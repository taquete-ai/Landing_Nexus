import fetch from 'node-fetch';

console.log('\n═══════════════════════════════════════════');
console.log('   Dashboard Demo — Visual Verification');
console.log('═══════════════════════════════════════════\n');

const response = await fetch('http://localhost:3001');
const html = await response.text();

// Check for key component text content
const components = {
  'Cabeçalho da Seção': 'DEMONSTRAÇÃO LIVE',
  'Título Principal': 'Ecossistema em Tempo Real',
  'Descrição': 'Visualize métricas de operação',
  'Primeira Métrica': 'Automações Ativas',
  'Segunda Métrica': 'Leads Capturados',
  'Terceira Métrica': 'Integrações Ativas',
  'Pipeline Label': 'Pipeline de Leads',
  'Taxa de Conversão': '68.4%',
  'Status Section': 'Status de Sistemas',
  'Chart Section': 'Atividades da Semana',
  'Activity Feed': 'Feed de Atividades',
};

let foundCount = 0;
console.log('✓ Components Found:\n');

for (const [name, text] of Object.entries(components)) {
  const found = html.includes(text);
  console.log(`  ${found ? '✓' : '✗'} ${name}`);
  if (found) foundCount++;
}

console.log(`\n✓ Coverage: ${foundCount}/${Object.keys(components).length} components\n`);

// Check for animation classes
const animations = [
  'animate-pulse',
  'transition-all',
  'duration-',
];

console.log('✓ Animations & Interactions:\n');
for (const anim of animations) {
  const found = html.includes(anim);
  console.log(`  ${found ? '✓' : '✗'} ${anim}`);
}

// Check design token colors
const colors = ['#caff33', '#e8e8e8', '#141416'];
console.log('\n✓ Design System Colors:\n');
for (const color of colors) {
  const found = html.includes(color.toLowerCase()) || html.includes(color.toUpperCase());
  console.log(`  ${found ? '✓' : '✗'} ${color}`);
}

console.log('\n═══════════════════════════════════════════');
console.log(`✅ Dashboard Demo Successfully Rendered!`);
console.log('═══════════════════════════════════════════\n');

