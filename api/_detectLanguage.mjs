/**
 * Detect whether the visitor's message is English or Roman Urdu.
 * Returns "english" | "roman-urdu"
 */
export function detectLanguage(text) {
  if (!text || typeof text !== "string") return "english";

  const trimmed = text.trim();
  if (!trimmed) return "english";

  // Urdu/Arabic script → respond in Roman Urdu
  if (/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(trimmed)) {
    return "roman-urdu";
  }

  const lower = trimmed.toLowerCase();

  const romanUrduWords =
    /\b(aap|aapke|aapki|aapka|tum|tumhare|tumhari|kya|kyun|kaise|kahan|kab|hain|hai|hun|hoon|ho|hain|mein|main|men|ke|ki|ka|ko|se|par|aur|ya|lekin|magar|nahi|nahin|bhi|yeh|ye|woh|wo|mera|meri|mere|apka|apki|batayen|batayein|batain|batao|bataiye|bataiyega|skte|sakte|karta|karti|karte|kiya|karni|karna|skills|talash|madad|kar|sakta|sakti|sakte|hain|kya|hain|ke\s+baare|baare|mein|zara|thoda|bohat|bahut|shukriya|salam|assalam|khush|amdeed|jawab|sawal|experience|talim|education|project)\b/gi;

  const matches = lower.match(romanUrduWords) || [];
  const wordCount = lower.split(/\s+/).filter(Boolean).length;
  const urduScore = matches.length;

  if (urduScore >= 2 || (urduScore >= 1 && wordCount <= 6)) {
    return "roman-urdu";
  }

  if (/\b(kya|kaise|kahan|kyun)\b/i.test(lower) && /\b(hai|hain|hun|hoon|hain)\b/i.test(lower)) {
    return "roman-urdu";
  }

  return "english";
}

export function languageInstruction(lang) {
  if (lang === "roman-urdu") {
    return `

=== MANDATORY LANGUAGE FOR THIS REPLY ===
The visitor's latest message is in ROMAN URDU (Urdu written in English/Latin letters).
You MUST write your entire reply ONLY in Roman Urdu. Use natural Roman Urdu phrasing (e.g. "Main ne...", "Mere paas...", "Meri skills...").
Do NOT reply in English. Do NOT mix English sentences. Technical terms (React, Java, Next.js) may stay as-is.`;
  }

  return `

=== MANDATORY LANGUAGE FOR THIS REPLY ===
The visitor's latest message is in ENGLISH.
You MUST write your entire reply ONLY in English.
Do NOT reply in Roman Urdu or Urdu. Do NOT mix Roman Urdu phrases.`;
}
