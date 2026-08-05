const fs = require('fs');
const path = require('path');

const files = [
  'src/components/GenerationWizard.tsx',
  'src/components/CalendarView.tsx',
  'src/components/PostDetailModal.tsx'
];

const replacements = {
  'bg-stone-50': 'bg-[#F5F1EB]',
  'bg-stone-100': 'bg-[#FAF8F5]',
  'bg-stone-200': 'bg-[#E8E1D5]',
  'border-stone-100': 'border-[#F5F1EB]',
  'border-stone-200': 'border-[#E8E1D5]',
  'border-stone-300': 'border-[#E8E1D5]',
  'text-stone-400': 'text-gray-400',
  'text-stone-500': 'text-gray-500',
  'text-stone-600': 'text-gray-500',
  'text-stone-700': 'text-[#2D3748]',
  'text-stone-800': 'text-[#2D3748]',
  'text-stone-900': 'text-[#2D3748]',
  'hover:bg-stone-100': 'hover:bg-[#E8E1D5]',
  'hover:bg-stone-200': 'hover:bg-[#E8E1D5]',
  'hover:border-stone-300': 'hover:border-[#E8E1D5]',
  'text-teal-600': 'text-[#3D8D95]',
  'text-teal-700': 'text-[#3D8D95]',
  'text-teal-800': 'text-[#3D8D95]',
  'bg-teal-700': 'bg-[#3D8D95]',
  'bg-teal-600': 'bg-[#3D8D95]',
  'hover:bg-teal-800': 'hover:bg-[#347A81]',
  'hover:text-teal-800': 'hover:text-[#347A81]',
  'border-teal-500': 'border-[#3D8D95]',
  'ring-teal-500': 'ring-[#3D8D95]',
  'bg-teal-50/60': 'bg-[#F0F7F7]',
  'bg-teal-50': 'bg-[#F0F7F7]',
  'shadow-xs': 'shadow-sm',
  'shadow-2xs': 'shadow-sm',
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    // using split join to replace all matching exact class names
    content = content.replace(new RegExp('(?<=[\\s"\'`])' + key + '(?=[\\s"\'`/\\\\])', 'g'), value);
  }
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
