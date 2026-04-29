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

    const prompt = `You are a world-class cinephile with encyclopedic knowledge of films and TV series from EVERY region — Hollywood, European, Asian, Bollywood, Russian, Turkish, Uzbek, Korean, Japanese, anime, classic cinema, and every major streaming series (Netflix, HBO, Disney+, Amazon, Apple TV, etc).

Examine the image carefully and identify the film or TV series it is from. Use EVERY available visual cue:
- Actors' faces, even partially visible or in costume/makeup
- Costumes, props, sets, vehicles, weapons, locations
- Color grading, lighting style, cinematography signature
- Composition, framing, aspect ratio, era cues
- Visual effects, creature design, distinctive production design
- Iconic shots, memorable scenes, recognizable moments
- On-screen text, logos, signage, language
- Genre conventions and visual storytelling cues

BE GENEROUS in identification: if you have a reasonable guess (even 40-60% certain), return it as "medium" or "low" confidence rather than giving up. Users prefer a plausible answer they can verify over a flat "unknown".

Respond ONLY with a single valid JSON object — no prose, no markdown, no code fences. Use this exact schema:

If you can identify the film/show with ANY reasonable level of confidence:
{
  "found": true,
  "title": "exact official title (use original English title or most well-known international title)",
  "year": release year as integer (for series, the year of the season/episode if known, otherwise series start year),
  "director": "director name(s) — for TV series use 'creator' or 'showrunner' name(s)",
  "genre": "primary genre (e.g. Drama, Sci-Fi, Thriller, Action, Komediya, Triller, Animatsiya)",
  "description": "2-3 sentence description of the film/series IN UZBEK LATIN SCRIPT (oʻzbek tilida, lotin yozuvida). Informative and natural.",
  "confidence": "high" | "medium" | "low",
  "sceneDescription": "1-2 sentences describing what is happening in THIS specific scene, IN UZBEK LATIN SCRIPT"
}

ONLY return found:false if the image is clearly NOT a movie/TV scene — for example: a screenshot of a website or app, a meme template, a photo of food/object, a generic stock photo, a personal photo, a document, or pure abstract art. In those cases, return:
{
  "found": false,
  "title": null,
  "year": null,
  "director": null,
  "genre": null,
  "description": null,
  "confidence": null,
  "sceneDescription": "1 sentence in UZBEK LATIN SCRIPT describing what the image actually shows (e.g. 'Bu rasm veb-sayt skrinshotiga oʻxshaydi, kino kadri emas.')"
}

Rules:
- Output JSON only, nothing else.
- Confidence: 'high' = very sure, 'medium' = educated guess, 'low' = plausible match worth offering.
- All Uzbek text MUST be in latin script (lotin yozuvi), NEVER cyrillic.
- Use proper Uzbek words: "rejissyor", "yili", "janri", "kino", "sahna", "qahramon", "serial".`;

    const response = await openai.chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 1500,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an Uzbek-speaking film expert assistant that returns concise, accurate JSON responses about identified films. All free-text fields (description, sceneDescription) must be written in Uzbek using latin script.",
        },
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
