
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3001;

// Configure Multer for memory storage (file handling)
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const ELITE_ENGINE_PROMPT = `
ACT AS: The Core Engine for "EliteCV" (Senior Executive Recruiter & Multi-Style Content Architect).
MISSION: Rewrite user CV data into one of 20 specific professional personas.

CORE PERSONAS (Apply Tone & Structure):
1. Executive Leadership: Focus on ROI, strategic growth, high-level KPIs, and P&L responsibility. Use "Spearheaded", "Orchestrated".
2. Entry-Level/Student: Focus on academic projects, internships, potential, and soft skills like "Agility" and "Fast Learner".
3. Creative Portfolio: Use vibrant, storytelling language. Focus on "Visual Impact", "Conceptualizing", and "User-Centric Narrative".
4. Technical/Developer: Categorize content by Stack (Frontend, Backend, Tools). Focus on "Scalability", "Latency", and "Deployment".
5. Minimalist: Concise, direct, and focused on absolute clarity.
6. Academic: Extensive, formal, and focusing on research/publications.
7. Skills-Based: Function-first, highlighting competencies over chronology.
8. Sales-Driven: Aggressive focus on targets, quotas, and revenue generation.
9. Medical: Detail-oriented, compliance-focused, clinical precision.
10. Legal: Authoritative, formal, and focused on analytical rigor.
11. Startup: Entrepreneurial, "owner-mindset", versatile, and fast-paced.
12. Corporate Formal: Strict industry standard, polished, and safe.
13. Hybrid: A balance of modern tech and traditional corporate.
14. Bold/High-Contrast: Direct, punchy, and attention-grabbing.
15. International: Standardized for global/multi-national firm ATS.
16. Infographic: Narrative-heavy and structured for visual parsing.
17. Project-Focused: Centered on specific delivery milestones and outcomes.
18. Military Transition: Translating tactical excellence into civilian terminology.
19. Retail/Service: High-energy, customer-satisfaction, and efficiency-focused.
20. Modern Chronological: Current industry best practice for general use.

REWRITING RULES:
- GOOGLE XYZ FORMULA: "Accomplished [X] as measured by [Y], by doing [Z]".
- ATS OPTIMIZATION: Integrate high-traffic industry keywords.
- ARABIC-TO-ENGLISH: If input is Arabic, translate to superior professional English automatically.

OUTPUT FORMAT:
ALWAYS return a clean JSON object that matches these keys:
{
  "personalInfo": { "firstName", "lastName", "email", "phone", "location", "jobTitle", "summary", "linkedin" },
  "experience": [ { "company", "position", "startDate", "endDate", "current", "description" } ],
  "education": [ { "institution", "degree", "graduationDate" } ],
  "skills": [ { "name", "level" } ],
  "languages": [ { "name", "level" } ]
}
`;

const getLangName = (lang) => {
    switch (lang) {
        case 'ar': return 'Arabic';
        case 'fr': return 'French';
        default: return 'English';
    }
};

// Route: Parse CV (accepts file upload)
app.post('/api/parse', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const base64Data = req.file.buffer.toString('base64');
        const mimeType = req.file.mimetype;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `${ELITE_ENGINE_PROMPT}
    TASK: Extract data from the attached document and transform it into the "Modern Chronological" persona.
    Return strictly valid JSON.`;

        const result = await model.generateContent([
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: prompt }
        ]);

        const responseText = result.response.text();
        const json = JSON.parse(responseText.replace(/```json|```/g, '').trim());
        res.json(json);
    } catch (error) {
        console.error("Parse Error:", error);
        res.status(500).json({ error: 'Parsing failed' });
    }
});

// Route: Optimize CV
app.post('/api/optimize', async (req, res) => {
    try {
        const { data, modelStyle, lang } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `${ELITE_ENGINE_PROMPT}
    TASK: Perform a Global Style Transformation for the archetype: "${modelStyle}".
    Completely rewrite the Summary, Experience, and Skills to reflect this persona's specific tone and priorities.
    Input Language: ${getLangName(lang)}.
    DATA: ${JSON.stringify(data)}
    
    Return the updated JSON object.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const json = JSON.parse(responseText.replace(/```json|```/g, '').trim());
        res.json(json);
    } catch (error) {
        console.error("Optimize Error:", error);
        res.json(req.body.data); // Fallback: return original data
    }
});

// Route: Refine Bullets
app.post('/api/refine', async (req, res) => {
    try {
        const { role, context, lang } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `${ELITE_ENGINE_PROMPT}
    TASK: Transform these notes for a "${role}" into accomplishments using the Google XYZ formula.
    LANGUAGE: ${getLangName(lang)}.
    INPUT: "${context}"
    Return as a JSON array of strings.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
            }
        });

        const responseText = result.response.text();
        const json = JSON.parse(responseText.replace(/```json|```/g, '').trim());
        res.json(json);
    } catch (error) {
        console.error("Refine Error:", error);
        res.json([req.body.context]);
    }
});

// Route: Chat
app.post('/api/chat', async (req, res) => {
    try {
        const { cvData, userInstruction, currentContent, lang } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `${ELITE_ENGINE_PROMPT}
    TASK: Write a persuasive cover letter.
    CONTEXT: ${JSON.stringify(cvData)}
    USER REQUEST: "${userInstruction}"
    LANGUAGE: ${getLangName(lang)}.
    Output ONLY the letter text in Markdown.`;

        const result = await model.generateContent(prompt);
        res.json({ content: result.response.text() });
    } catch (error) {
        console.error("Chat Error:", error);
        res.json({ content: req.body.currentContent });
    }
});

// Route: Summary
app.post('/api/summary', async (req, res) => {
    try {
        const { jobTitle, skills, lang } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `${ELITE_ENGINE_PROMPT}
    TASK: Generate a high-impact 3-line professional summary.
    ROLE: ${jobTitle}. SKILLS: ${skills.join(', ')}.
    LANGUAGE: ${getLangName(lang)}.`;

        const result = await model.generateContent(prompt);
        res.json({ summary: result.response.text() });
    } catch (error) {
        console.error("Summary Error:", error);
        res.json({ summary: "" });
    }
});

// Start server with proper error handling
const server = app.listen(port, () => {
    console.log(`Backend API running at http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please free up the port or change the server port.`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
        process.exit(1);
    }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

// Prevent unhandled promise rejections from crashing the server
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
