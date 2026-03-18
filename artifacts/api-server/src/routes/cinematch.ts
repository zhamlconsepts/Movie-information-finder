import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { IdentifyFilmSceneBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/cinematch/identify", async (req, res) => {
  try {
    const parsed = IdentifyFilmSceneBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const { imageBase64, mimeType } = parsed.data;

    const prompt = `You are a film expert with encyclopedic knowledge of cinema worldwide. 
Analyze this image carefully and determine if it is from a movie, TV show, or film.

If you can identify the film, respond with a JSON object in this exact format:
{
  "found": true,
  "title": "exact film title",
  "year": release year as a number,
  "director": "director name(s)",
  "genre": "genre",
  "description": "2-3 sentence description of the film",
  "confidence": "high" or "medium" or "low",
  "sceneDescription": "brief description of what is happening in this specific scene"
}

If you cannot identify a specific film (not a movie scene, or too unclear), respond with:
{
  "found": false,
  "title": null,
  "year": null,
  "director": null,
  "genre": null,
  "description": null,
  "confidence": null,
  "sceneDescription": null
}

IMPORTANT: 
- Look for visual cues: costumes, sets, lighting style, actors, distinctive cinematography
- Respond ONLY with the JSON object, no other text
- Be honest about confidence level`;

    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
                detail: "high",
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message?.content ?? "";

    let filmInfo: Record<string, unknown>;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      filmInfo = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
    } catch {
      res.status(500).json({ error: "Failed to parse AI response" });
      return;
    }

    res.json(filmInfo);
  } catch (err) {
    console.error("Error identifying film:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
