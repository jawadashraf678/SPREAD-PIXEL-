import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Detailed Knowledge Base of SpreadPixels Marketing Agency
const SPREADPIXELS_KNOWLEDGE_BASE = `
### SPREADPIXELS MARKETING AGENCY - KNOWLEDGE BASE
- Business Name: SpreadPixels Marketing Agency
- Primary Contact: WhatsApp 0331 6049421
- Mission: We build result-oriented, high-converting websites for Pakistani businesses (Clinics, Doctors, Real Estate, Manufacturers, Consultants, Brands, and Exporters) to generate actual customers and leads, not just visual decoration.

### PACKAGES & PRICING:
1. Basic Package:
   - Includes: Single Page Landing Page, Modern Responsive Design, Direct WhatsApp Call-to-Action buttons, Basic SEO Setup.
   - Ideal for: Startups, freelancers, single service providers.
2. Standard Package (SAB SE ZYADA LIYA JAANE WALA / Best Value):
   - Includes: Multi-page Full Website, Custom UI/UX, WhatsApp Integration, Lead CRM Setup, Speed Optimization, Mid-tier Local SEO.
   - Ideal for: Established Pakistani businesses, clinics, real estate agencies, manufacturers.
3. Enterprise / Custom Package:
   - Includes: Custom Web Application, Tailored Features, Advanced CRM & Automation, High-level SEO, Dedicated Support.
   - Ideal for: Large companies, exporters, scale-ups.

### TIMELINES:
- Basic Landing Pages: 7 - 10 Days.
- Standard / Corporate Websites: 2 - 3 Weeks.
- Custom Enterprise Apps: 3 - 4 Weeks.

### KEY ADVANTAGES:
- Conversion-Focused Layouts: Designed to get WhatsApp messages and form enquiries.
- Fast Page Load Speed.
- Full Ownership & Source Code transferred to client.
- Local Pakistani Business Support.
`;

export async function POST(req: Request) {
  try {
    const { message, userName, userEmail, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Smart local responder that uses Knowledge Base + User's Name & Email
    const getLocalResponse = (msg: string) => {
      const lowerMsg = msg.toLowerCase();
      const displayName = userName ? userName : "friend";
      
      if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('package') || lowerMsg.includes('rate') || lowerMsg.includes('kitnay')) {
        return `Thank you ${displayName}! Humaray web design packages Basic Landing Page se shuru hotay hain. Standard Package sab se zyada popular hai jisme Full Website + WhatsApp CRM setup milta hai. Aap niche green button par click karke WhatsApp (0331 6049421) par direct details le saktay hain!`;
      }
      if (lowerMsg.includes('time') || lowerMsg.includes('duration') || lowerMsg.includes('day') || lowerMsg.includes('waqt') || lowerMsg.includes('din')) {
        return `${displayName}, Basic landing page hum 7 se 10 din me deliver kar detay hain, aur standard business website me 2 se 3 weeks lagtay hain. Aap ka project kab tak delivery chahiye?`;
      }
      if (lowerMsg.includes('portfolio') || lowerMsg.includes('work') || lowerMsg.includes('sample') || lowerMsg.includes('kaam')) {
        return `${displayName}, Hum ne Pakistan me Real Estate, Clinics, Exporters, aur Brands ke liye high-converting websites banayi hain. Aap website par Selected Work check karein ya WhatsApp par samples mangwaiye!`;
      }
      return `Thank you ${displayName}! Aap ki query save ho gayi hai. Humara team member aap ke email (${userEmail || 'provided email'}) ya WhatsApp par rabta karega, ya aap direct 0331 6049421 par message kar saktay hain!`;
    };

    if (!apiKey) {
      return NextResponse.json({ reply: getLocalResponse(message) });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
${SPREADPIXELS_KNOWLEDGE_BASE}

User Profile:
- Name: ${userName || 'User'}
- Email: ${userEmail || 'Not provided'}

Instructions:
1. Address the user politely using their name (${userName || 'User'}).
2. Reply in short, concise Roman Urdu / Hinglish & English mix (max 2-3 sentences).
3. Do NOT mention that you are an AI model or powered by Gemini. You are SpreadPixels AI assistant.
4. Guide them to connect on WhatsApp (0331 6049421) or click the WhatsApp button.

Conversation History:
${JSON.stringify(history)}

User Question: ${message}
AI Response:`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return NextResponse.json({ reply: responseText.trim() });
    } catch (apiError) {
      console.log("Gemini API error, falling back to Knowledge Base responder:", apiError);
      return NextResponse.json({ reply: getLocalResponse(message) });
    }
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ reply: `JazakAllah ${userName || ''}! Please message us directly on WhatsApp (0331 6049421) to discuss your project!` });
  }
}
