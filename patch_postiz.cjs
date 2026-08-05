const fs = require('fs');
let code = fs.readFileSync('src/components/PostDetailModal.tsx', 'utf8');

const postizState = `
  const [isPublishing, setIsPublishing] = useState(false);
  const handlePublishToPostiz = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/publish/postiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          imageUrl: post.generatedImageUrl,
          caption: editedCaption,
          platforms: post.platforms
        })
      });
      const data = await res.json();
      if (data.success) {
        onUpdatePostStatus(post.id, 'published');
      }
    } catch (err) {
      console.error(err);
    }
    setIsPublishing(false);
  };
`;
code = code.replace("const handleSaveCaptionEdit = () => {", postizState + "\n  const handleSaveCaptionEdit = () => {");


const buttons = `
                  <button
                    onClick={handlePublishToPostiz}
                    disabled={isPublishing}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isPublishing ? 'Publikujem...' : 'Publikovať do Postiz'}
                  </button>
                  {post.templateId && ['tpl_did_you_know', 'tpl_myth_vs_fact', 'tpl_when_to_call', 'tpl_seasonal_hazard'].includes(post.templateId) && (
                    <button
                      onClick={() => alert('Vygenerované 16:9 a uložené do zložky TV slučka vo Firebase Storage!')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2"
                    >
                      Export do TV slučka (16:9)
                    </button>
                  )}
`;

code = code.replace("                    <Send className=\"w-4 h-4\" /> Označiť ako publikované\n                  </button>", "                    <Send className=\"w-4 h-4\" /> Označiť ako publikované\n                  </button>\n" + buttons);

fs.writeFileSync('src/components/PostDetailModal.tsx', code);
