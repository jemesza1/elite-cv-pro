
import { CVData, Language } from "../types";

const API_BASE_URL = '/api';

const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const parseCV = async (base64Data: string, mimeType: string): Promise<CVData | null> => {
  try {
    const blob = base64ToBlob(base64Data, mimeType);
    const formData = new FormData();
    formData.append('file', blob, 'resume.pdf');

    const response = await fetch(`${API_BASE_URL}/parse`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Parsing failed');
    return await response.json();
  } catch (error) {
    console.error("AI Engine Error (Parse):", error);
    return null;
  }
};

export const optimizeFullCV = async (data: CVData, modelStyle: string, lang: Language): Promise<CVData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, modelStyle, lang }),
    });

    if (!response.ok) throw new Error('Optimization failed');
    return await response.json();
  } catch (error) {
    console.error("AI Engine Error (Optimize):", error);
    return data;
  }
};

export const refineBulletPoints = async (role: string, context: string, lang: Language): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/refine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, context, lang }),
    });

    if (!response.ok) throw new Error('Refinement failed');
    return await response.json();
  } catch (error) {
    console.error("AI Engine Error (Refine):", error);
    return [context];
  }
};

export const chatWithCoverLetterAssistant = async (cvData: CVData, userInstruction: string, currentContent: string, lang: Language): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cvData, userInstruction, currentContent, lang }),
    });

    if (!response.ok) throw new Error('Chat failed');
    const result = await response.json();
    return result.content || '';
  } catch (error) {
    console.error("AI Engine Error (Chat):", error);
    return currentContent;
  }
};

export const generateProfessionalSummary = async (jobTitle: string, skills: string[], lang: Language): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, skills, lang }),
    });

    if (!response.ok) throw new Error('Summary generation failed');
    const result = await response.json();
    return result.summary || '';
  } catch (error) {
    console.error("AI Engine Error (Summary):", error);
    return "";
  }
}
