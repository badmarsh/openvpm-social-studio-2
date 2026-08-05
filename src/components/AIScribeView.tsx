import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, Stethoscope, Save, FileText } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { marked } from 'marked';

export const AIScribeView: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { showToast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      showToast('Chyba', 'Nepodarilo sa získať prístup k mikrofónu.');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processAudio = async (blob: Blob) => {
    setLoading(true);
    setTranscription('');
    
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];
        if (!base64data) return;

        const res = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioBase64: base64data, mimeType: 'audio/webm' })
        });
        const data = await res.json();
        
        if (data.transcription) {
          setTranscription(data.transcription);
          showToast('Hotovo', 'Záznam bol úspešne prepísaný.');
        }
        setLoading(false);
      };
    } catch (e) {
      showToast('Chyba', 'Prepis zlyhal.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Scribe (Digitálny Asistent)</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Automatický prepis vyšetrenia do SOAP záznamu bez písania.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-[#E8E1D5] p-8 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-xl transition-all ${isRecording ? 'bg-red-50 animate-pulse border-4 border-red-200' : 'bg-emerald-50 border border-emerald-100'}`}>
            {isRecording ? (
              <Mic className="w-12 h-12 text-red-500" />
            ) : (
              <Stethoscope className="w-12 h-12 text-[#134027]" />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-[#2D3748] mb-2">
            {isRecording ? 'Nahrávam vyšetrenie...' : 'Pripravený počúvať'}
          </h3>
          <p className="text-sm text-stone-500 mb-8 max-w-sm">
            Kliknite na tlačidlo a začnite hovoriť počas vyšetrenia. AI vyfiltruje dôležité medicínske fakty a vytvorí štruktúrovaný SOAP záznam.
          </p>

          {isRecording ? (
            <button 
              onClick={stopRecording}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Square className="w-5 h-5 fill-current" /> Zastaviť nahrávanie
            </button>
          ) : (
            <button 
              onClick={startRecording}
              disabled={loading}
              className="bg-[#134027] hover:bg-teal-900 text-white font-bold py-3 px-8 rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
            >
              <Mic className="w-5 h-5" /> Začať nahrávanie
            </button>
          )}

          {audioURL && !isRecording && (
            <div className="mt-8 w-full max-w-xs">
              <audio src={audioURL} controls className="w-full" />
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-[#E8E1D5] p-6 shadow-sm flex flex-col h-full min-h-[400px]">
          <div className="flex items-center justify-between mb-4 border-b border-[#E8E1D5] pb-4">
            <h3 className="font-bold text-[#2D3748] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#134027]" /> SOAP Záznam
            </h3>
            {transcription && (
              <button className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Save className="w-3.5 h-3.5" /> Uložiť do karty
              </button>
            )}
          </div>

          <div className="flex-1 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5] p-6 overflow-y-auto prose prose-sm max-w-none text-stone-700">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#134027]" />
                <p className="font-medium animate-pulse text-[#134027]">Spracovávam medicínsky záznam...</p>
              </div>
            ) : transcription ? (
              <div dangerouslySetInnerHTML={{ __html: marked(transcription) }} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-stone-400">
                <p className="italic text-center">Zatiaľ žiadny prepis.<br/>Záznam sa objaví tu vo formáte SOAP.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
