import { Node, mergeAttributes } from '@tiptap/core';
import mermaid from 'mermaid';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import React, { useEffect, useRef, useState } from 'react';

// Initialize mermaid
mermaid.initialize({ startOnLoad: false, theme: 'default' });

const MermaidComponent = ({ node, updateAttributes }) => {
  const code = node.attrs.code;
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    const renderChart = async () => {
      try {
        if (code && containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg: svgCode } = await mermaid.render(id, code);
          setSvg(svgCode);
        }
      } catch (e) {
        console.error('Mermaid render error', e);
        setSvg(`<div class="text-red-500 text-xs font-bold border border-red-200 bg-red-50 p-2 rounded">Error rendering Mermaid diagram: ${e.message}</div>`);
      }
    };
    renderChart();
  }, [code]);

  return (
    <NodeViewWrapper className="mermaid-wrapper my-4">
      <div 
        ref={containerRef}
        className="mermaid-container flex justify-center bg-stone-50 border border-stone-200 rounded-xl p-4"
        dangerouslySetInnerHTML={{ __html: svg || 'Rendering...' }}
      />
    </NodeViewWrapper>
  );
};

export const MermaidExtension = Node.create({
  name: 'mermaid',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      code: {
        default: 'graph TD\\nA-->B;',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre.mermaid',
        getAttrs: (element) => {
          return {
            code: element.innerText,
          }
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['pre', mergeAttributes(HTMLAttributes, { class: 'mermaid hidden' }), HTMLAttributes.code];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidComponent);
  },
});
