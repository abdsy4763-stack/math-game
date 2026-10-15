import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const ai = new GoogleGenAI();
// In-memory cache for ultra-fast instant Arabic audio playback
const ttsCache = new Map<string, { audioData: string; mimeType: string }>();

// API route to synthesize Arabic voice audio via Gemini TTS
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const cleanText = text.trim();
    const cacheKey = `${voice}:${cleanText}`;

    if (ttsCache.has(cacheKey)) {
      return res.json(ttsCache.get(cacheKey));
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: cleanText,
      config: {
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }
          }
        }
      }
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    const inlineData = part?.inlineData;

    if (!inlineData?.data) {
      return res.status(500).json({ error: 'Failed to generate Arabic audio' });
    }

    const result = {
      audioData: inlineData.data,
      mimeType: inlineData.mimeType || 'audio/wav'
    };

    ttsCache.set(cacheKey, result);
    return res.json(result);
  } catch (err: any) {
    console.error('Error generating Arabic TTS:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Math Heroes app running on port ${port}`);
  });
}

startServer();
