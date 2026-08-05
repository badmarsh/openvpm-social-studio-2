import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, contextText, actionType, brandKit, useBrandContext } = body;

    if (!prompt && !contextText && !actionType) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    let systemInstruction = `Si elitný AI asistent pre veterinárnu kliniku. Tvojou úlohou je pomáhať s administratívou, marketingom a klientskou komunikáciou.
    Základné pravidlá, ktoré MUSÍŠ vždy dodržať:
    1. Jazyk: Primárne komunikuj v profesionálnej slovenčine. Ak je požiadavka na maďarčinu (HU), použi bezchybnú, gramaticky správnu maďarčinu.
    2. Fear-Free Prístup: Všetka komunikácia musí odrážať "Fear-Free" princípy (bezstresová manipulácia, empatia, kľud). Žiadne strašenie klientov.
    3. ZÁKAZ DIAGNOSTIKY: Nikdy neposkytuj medicínske diagnózy, nepredpisuj lieky a neodporúčaj liečebné postupy. Pri zdravotných problémoch vždy naviguj na návštevu lekára.
    4. Tón komunikácie: Profesionálny, upokojujúci, empatický, s ohľadom na to, že domáce zviera je členom rodiny.`;

    if (useBrandContext && brandKit) {
      systemInstruction += `\nKontext ambulancie:
      Názov: ${brandKit.clinicName || 'Naša klinika'}
      Tón značky: ${brandKit.toneOfVoice || 'Profesionálny a empatický'}`;
    }

    let finalPrompt = '';

    switch (actionType) {
      case 'draft':
        finalPrompt = `Na základe nasledujúcich požiadaviek vytvor text (napr. príspevok na sociálne siete, draft SOP alebo email):
        Požiadavka: ${prompt}
        Kontext: ${contextText || 'Žiadny kontext'}`;
        break;
      case 'improve':
        finalPrompt = `Vylepši nasledujúci text tak, aby znel profesionálnejšie, jasnejšie a čitateľnejšie, no zachoval pôvodný význam:
        Text: ${contextText}`;
        break;
      case 'fear_free':
        finalPrompt = `Preformuluj nasledujúci text tak, aby vyžaroval empatiu, ukľudňujúci tón a prísne dodržiaval princípy "Fear-Free" veterinárnej starostlivosti. Odstráň akýkoľvek výhražný alebo príliš strohý tón.
        Text: ${contextText}`;
        break;
      case 'summarize':
        finalPrompt = `Vytvor stručné, výstižné zhrnutie nasledujúceho textu. Zvýrazni kľúčové body.
        Text: ${contextText}`;
        break;
      case 'translate_hu':
        finalPrompt = `Prelož nasledujúci text do bezchybnej, profesionálnej maďarčiny, vhodnej pre komunikáciu veterinárnej kliniky s klientmi na južnom Slovensku.
        Text: ${contextText}`;
        break;
      default:
        finalPrompt = prompt || contextText;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const generatedText = response.text;

    return NextResponse.json({ success: true, content: generatedText });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
