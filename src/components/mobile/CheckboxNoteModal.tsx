'use client';

import React, { useEffect } from 'react';
import { X, Mic, Save } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface CheckboxNoteModalProps {
  note: string;
  onSave: (note: string) => void;
  onClose: () => void;
}

export default function CheckboxNoteModal({
  note,
  onSave,
  onClose,
}: CheckboxNoteModalProps) {
  const { text, isRecording, startRecording, stopRecording, hasRecognitionSupport } = useSpeechRecognition();
  const [currentNote, setCurrentNote] = React.useState(note);

  useEffect(() => {
    if (text) {
      setCurrentNote(text);
    }
  }, [text]);

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Add Note</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Type or record your note..."
            className="w-full h-40 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          />
          
          <div className="flex space-x-3">
            <button
              onClick={() => onSave(currentNote)}
              className="flex-1 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </button>
            {hasRecognitionSupport && (
              <button
                onClick={handleRecordClick}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                    : 'bg-slate-600 hover:bg-slate-500 text-slate-300'
                }`}
              >
                <Mic className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
