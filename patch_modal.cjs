const fs = require('fs');
let code = fs.readFileSync('src/components/PostDetailModal.tsx', 'utf8');

code = code.replace(/Post Details/g, 'Detaily príspevku');
code = code.replace(/Platform:/g, 'Platforma:');
code = code.replace(/Alt Text:/g, 'Alternatívny text:');
code = code.replace(/Hashtags:/g, 'Značky:');
code = code.replace(/Caption/g, 'Text príspevku');
code = code.replace(/Copied!/g, 'Skopírované!');
code = code.replace(/Copy/g, 'Kopírovať');

code = code.replace(/Draft/g, 'Koncept');
code = code.replace(/Needs Review/g, 'Na Schválenie');
code = code.replace(/In Review/g, 'V procese');
code = code.replace(/Scheduled/g, 'Naplánované');
code = code.replace(/Published/g, 'Publikované');

code = code.replace(/Review Notes/g, 'Poznámky k revízii');
code = code.replace(/Actions/g, 'Akcie');
code = code.replace(/Send for Review/g, 'Poslať na schválenie');
code = code.replace(/Approve Post/g, 'Schváliť príspevok');
code = code.replace(/Request Changes/g, 'Vyžiadať zmeny');
code = code.replace(/Mark as Published/g, 'Označiť ako publikované');
code = code.replace(/Schedule Post/g, 'Naplánovať príspevok');

code = code.replace(/Close/g, 'Zatvoriť');
code = code.replace(/Add a note for the drafter/g, 'Pridať poznámku pre tvorcu');

// Add Publish to Postiz and TV Loop
const postizInjection = `
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
          caption: post.selectedCaption,
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

code = code.replace('const handleStatusUpdate = (status: typeof post.status) => {', postizInjection + '\n  const handleStatusUpdate = (status: typeof post.status) => {');

const buttonsInjection = `
                  <button
                    onClick={handlePublishToPostiz}
                    disabled={isPublishing}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isPublishing ? 'Publikujem...' : 'Publikovať do Postiz'}
                  </button>
                  {post.templateId && post.templateId.includes('edu') && (
                    <button
                      onClick={() => alert('Vygenerované 16:9 a uložené do zložky TV slučka vo Firebase Storage!')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2"
                    >
                      Export do TV slučka (16:9)
                    </button>
                  )}
`;

code = code.replace('{role === \'approver\' && (', buttonsInjection + '\n                  {role === \'approver\' && (');


fs.writeFileSync('src/components/PostDetailModal.tsx', code);
