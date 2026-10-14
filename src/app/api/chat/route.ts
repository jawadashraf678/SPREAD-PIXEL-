import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Detailed Knowledge Base of SpreadPixels Marketing Agency
const SPREADPIXELS_KNOWLEDGE_BASE = `
### SPREADPIXELS MARKETING AGENCY - KNOWLEDGE BASE
- Business Name: SpreadPixels Marketing Agency
- Primary Contact: WhatsApp 0331 6049421
- Mission: We build result-oriented, high-converting websites for Pakistani businesses (Clinics, Doctors, Real Estate, Manufacturers, Consultants, Brands, and Exporters) to generate actual customers and leads, not just visual decoration.

### PACKAGES & PRICING:
1. Basic Package (PKR 15,000):
   - Includes: 4 to 5 pages, Full content writing, Contact form & WhatsApp integration, Custom graphics, Mobile optimized.
   - Ideal for: Startups and new businesses getting online properly.
2. Advance Package (PKR 28,500) (SAB SE ZYADA LIYA JAANE WALA / Best Value):
   - Includes: 8 to 10 pages, Full content writing, WhatsApp integration, SEO keyword research, AI chatbot integration, Custom graphics, Mobile optimized.
   - Ideal for: Growing businesses wanting steady leads from Google.
3. Premium Package (PKR 40,000):
   - Includes: 15+ pages, Full content writing, WhatsApp integration, CRM integration, SEO keyword research, AI chatbot, Custom graphics.
   - Ideal for: Established businesses with multiple locations or services.

### TIMELINES:
- Basic Package: 1 - 2 Weeks.
- Advance Package: 2 - 3 Weeks.
- Premium Package: 3 - 4 Weeks.

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
        return `Thank you ${displayName}! Humaray web design packages:\n• Basic: PKR 15,000\n• Advance (Most Popular): PKR 28,500\n• Premium: PKR 40,000\nAap niche green button par click karke WhatsApp (0331 6049421) par direct details le saktay hain!`;
      }
      if (lowerMsg.includes('time') || lowerMsg.includes('duration') || lowerMsg.includes('day') || lowerMsg.includes('waqt') || lowerMsg.includes('din')) {
        return `${displayName}, Basic package hum 1 se 2 weeks me deliver kar detay hain, Advance package me 2 se 3 weeks lagtay hain, aur Premium me final scope par depend karta hai. Aap ka project kab tak delivery chahiye?`;
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
    return NextResponse.json({ reply: "JazakAllah! Please message us directly on WhatsApp (0331 6049421) to discuss your project!" });
  }
}
