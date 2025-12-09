import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Ensure API key is present
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API Key is missing. Ensure process.env.API_KEY is set.");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

/**
 * Analyzes an olive plant image using the specific dataset logic.
 * The prompt is engineered to replicate the classification logic of the Python TensorFlow model.
 */
export const analyzeOliveImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const modelId = "gemini-2.5-flash"; 

    // Dataset classes definitions based on the user's specific classes:
    // 1. Aculus olearius
    // 2. Olive Peacock Spot
    // 3. Healthy
    const prompt = `
      Sen, özel bir 'Zeytin Hastalıkları Veri Seti' (Olive Disease Dataset) ile eğitilmiş bir Ziraat Mühendisi asistanısın.
      
      Görevin, sana gönderilen fotoğrafı aşağıdaki **3 KESİN SINIF** (Class Names) ile eşleştirmektir.
      Bu sınıflar dışında bir hastalık uydurma. Sadece veri setindeki etiketleri kullan.

      ### DATASET SINIFLARI (CLASSES):

      1. **Aculus olearius** (Zeytin Tomurcuk Akarı):
         - Görsel Özellikler: Yapraklarda orak şeklinde büzülmeler, deformasyonlar, yaprak renginde pas rengi veya kahverengileşme.
      
      2. **Olive Peacock Spot** (Zeytin Halkalı Leke):
         - Bilimsel Adı: Spilocaea oleaginea.
         - Görsel Özellikler: Yaprak üst yüzeyinde iç içe geçmiş halkalar şeklinde (tavus kuşu gözü gibi) belirgin koyu lekeler.
      
      3. **Healthy** (Sağlıklı):
         - Görsel Özellikler: Temiz, lekesiz, deformasyon olmayan canlı yeşil yapraklar veya pürüzsüz meyveler.

      ### ANALİZ ADIMLARI:
      1. Görüntünün bir zeytin ağacı, yaprağı veya meyvesi olduğunu doğrula. (Değilse 'isOlivePlant' = false).
      2. Görüntüyü yukarıdaki 3 sınıftan biriyle eşleştir.
      3. Eşleşme oranını (Confidence Score) 0-100 arasında ver.
      4. Hastalık tespit ettiysen (Healthy değilse), Türkçe olarak tarımsal çözüm önerileri (ilaçlama zamanı, kültürel önlemler vb.) sun.

      Yanıtını sadece aşağıdaki JSON formatında ver:
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isOlivePlant: { type: Type.BOOLEAN, description: "Is this strictly related to olive plants?" },
            isHealthy: { type: Type.BOOLEAN, description: "Is the class 'Healthy'?" },
            diseaseName: { 
              type: Type.STRING, 
              description: "Must be exactly one of: 'Aculus olearius', 'Olive Peacock Spot', or 'Healthy'." 
            },
            confidenceScore: { type: Type.NUMBER, description: "Confidence score between 0 and 100" },
            description: { type: Type.STRING, description: "Detailed visual analysis explaining WHY it matches the class." },
            treatmentSuggestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-4 specific treatment steps if diseased."
            }
          },
          required: ["isOlivePlant", "isHealthy", "diseaseName", "confidenceScore", "description", "treatmentSuggestions"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw new Error("Analiz servisine ulaşılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
  }
};