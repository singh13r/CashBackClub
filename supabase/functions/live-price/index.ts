import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PRODUCT_URLS: Record<string, { amazon: string; flipkart: string }> = {
  "1": {
    amazon: "https://www.amazon.in/boAt-Rockerz-650-Pro-Headphones/dp/B0DV5J28LW",
    flipkart: "https://www.flipkart.com/boat-rockerz-650-pro-2025-launch-touch-swipe-controls-dolby-audio-80-hrs-battery-bluetooth/p/itmded454eeb49f5?pid=ACCH8GEKZGUC4GHW",
  },
  "2": {
    amazon: "https://www.amazon.in/dp/B0GF23R9B6",
    flipkart: "https://www.flipkart.com/redmi-note-15-pro-5g-carbon-black-256-gb/p/itm53c77b92f509c?pid=MOBHK464A2HGQ9DM",
  },
  "4": {
    amazon: "https://www.amazon.in/dp/B0FCXZ85YX",
    flipkart: "https://www.flipkart.com/acer-aspire-lite-amd-ryzen-7-octa-core-7730u-16-gb-512-gb-ssd-windows-11-home-al15-41-thin-light-laptop/p/itm1bc0bcb4598e7?pid=COMHY74JVWWHKWKA",
  },
  "5": {
    amazon: "https://www.amazon.in/dp/B0F8QFMXJ7",
    flipkart: "https://www.flipkart.com/lenovo-ideapad-slim-3-intel-core-i3-13th-gen-1315u-8-gb-512-gb-ssd-windows-11-home-15iru8-thin-light-laptop/p/itmc6707c8d4b21b?pid=COMHFMPWQSGRSZ9T",
  },
  "6": {
    amazon: "https://www.amazon.in/dp/B0GWHGS8P5",
    flipkart: "https://www.flipkart.com/dell-15-ai-powered-intel-core-ultra-5-225h-16-gb-512-gb-ssd-windows-11-home-thin-light-laptop/p/itm3d19bf8ab4b69?pid=COMHM29DAFVUFDWE",
  },
  "7": {
    amazon: "https://www.amazon.in/dp/B0DGGVHMDS",
    flipkart: "https://www.flipkart.com/fastrack-revoltt-fr2-pro-smartwatch/p/itm1824bd884eeaa?pid=SMWHF7GMGRUKJA5X",
  },
  "10": {
    amazon: "https://www.amazon.in/dp/B09B8XJDW5",
    flipkart: "https://www.flipkart.com/alexa-echo-dot-5th-gen-bluetooth-assistant-smart-speaker/p/itm9a342ef093026?pid=ACCH4N5D5DYKVDG9",
  },
};

const PRODUCT_PRICE_LIMITS: Record<string, { min: number; max: number }> = {
  "1": { min: 1000, max: 8000 },
  "2": { min: 10000, max: 60000 },
  "4": { min: 20000, max: 200000 },
  "5": { min: 20000, max: 200000 },
  "6": { min: 20000, max: 250000 },
  "7": { min: 1000, max: 15000 },
  "10": { min: 1000, max: 10000 },
};

const PRODUCT_VARIANT_HINTS: Record<string, string[]> = {
  "1": ["650 pro"],
  "2": ["256 gb", "5g"],
  "4": ["7730u", "16 gb", "512 gb", "al15-41", "ryzen 7"],
  "5": ["1315u", "8 gb", "512 gb", "15iru8", "i3"],
  "6": ["225h", "16 gb", "512 gb", "ultra 5", "dell 15 ai powered"],
  "7": ["fr2 pro"],
  "10": ["echo dot", "5th gen"],
};

const PRICE_PATTERN = /(?:â‚¹|₹|Rs\.?|INR)\s*([1-9][0-9,]*(?:\.[0-9]{1,2})?)/gi;
const AMAZON_WHOLE_PATTERN = /a-price-whole[^>]*>\s*([0-9,]+)\s*</gi;
const AMAZON_FRACTION_PATTERN = /a-price-fraction[^>]*>\s*([0-9]{2})\s*</gi;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function parseCandidateValue(raw: string, limits: { min: number; max: number }) {
  const value = Number(String(raw).replace(/,/g, ""));
  if (!Number.isFinite(value) || value < limits.min || value > limits.max) {
    return null;
  }
  return Math.round(value);
}

function collectPatternValues(source: string, pattern: RegExp, limits: { min: number; max: number }) {
  const values: number[] = [];
  for (const match of source.matchAll(pattern)) {
    const value = parseCandidateValue(match[1], limits);
    if (value !== null) values.push(value);
  }
  return values;
}

function chooseMostLikelyPrice(values: number[]) {
  if (!values.length) return null;

  const counts = new Map<number, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0];
}

function scoreSnippet(snippet: string, hints: string[]) {
  const lowered = snippet.toLowerCase();
  let score = 0;
  for (const hint of hints) {
    if (lowered.includes(hint)) score += 2;
  }
  return score;
}

function chooseVariantAwarePrice(source: string, pattern: RegExp, limits: { min: number; max: number }, hints: string[]) {
  const candidates: Array<{ value: number; score: number }> = [];
  for (const match of source.matchAll(pattern)) {
    const value = parseCandidateValue(match[1], limits);
    if (value === null || typeof match.index !== "number") continue;
    const start = Math.max(0, match.index - 220);
    const end = Math.min(source.length, match.index + 220);
    const snippet = source.slice(start, end);
    const score = scoreSnippet(snippet, hints);
    candidates.push({ value, score });
  }

  if (!candidates.length) return null;

  candidates.sort((a, b) => b.score - a.score || a.value - b.value);
  const best = candidates[0];
  if (best.score > 0) return best.value;

  if (hints.length) return null;

  return chooseMostLikelyPrice(candidates.map((candidate) => candidate.value));
}

function normalizePriceFromText(text: string, limits: { min: number; max: number }) {
  const values = Array.from(text.replace(/\s+/g, " ").matchAll(PRICE_PATTERN))
    .map((match) => Number(match[1].replace(/,/g, "")))
    .filter((value) => Number.isFinite(value) && value >= limits.min && value <= limits.max);

  const chosen = chooseMostLikelyPrice(values);
  if (chosen === null) return null;

  return {
    value: chosen,
    text: "Rs." + chosen.toLocaleString("en-IN"),
  };
}

function normalizePriceFromHtml(html: string, market: "amazon" | "flipkart", limits: { min: number; max: number }, hints: string[]) {
  const compactHtml = html.replace(/\s+/g, " ");

  const strongPatterns = market === "amazon"
    ? [
        /"priceToPay"\s*:\s*\{"price"\s*:\s*([0-9]+(?:\.[0-9]{1,2})?)/gi,
        /"displayPrice"\s*:\s*"[^0-9]*([0-9,]+(?:\.[0-9]{1,2})?)"/gi,
        /"priceAmount"\s*:\s*([0-9]+(?:\.[0-9]{1,2})?)/gi,
      ]
    : [
        /"finalPrice"\s*:\s*\{"value"\s*:\s*([0-9]+(?:\.[0-9]{1,2})?)\}/gi,
        /"sellingPrice"\s*:\s*\{"amount"\s*:\s*([0-9]+(?:\.[0-9]{1,2})?)\}/gi,
        /"_30jeq3[^>]*>\s*[^0-9]*([0-9,]+(?:\.[0-9]{1,2})?)\s*</gi,
      ];

  for (const pattern of strongPatterns) {
    const chosen = chooseVariantAwarePrice(compactHtml, pattern, limits, hints);
    if (chosen !== null) {
      return {
        value: chosen,
        text: "Rs." + chosen.toLocaleString("en-IN"),
      };
    }
  }

  if (market === "amazon") {
    const wholeMatches = Array.from(compactHtml.matchAll(AMAZON_WHOLE_PATTERN));
    const fractionMatches = Array.from(compactHtml.matchAll(AMAZON_FRACTION_PATTERN));
    const combinedValues: number[] = [];

    for (let i = 0; i < wholeMatches.length; i++) {
      const whole = wholeMatches[i]?.[1];
      const fraction = fractionMatches[i]?.[1] || "00";
      const value = parseCandidateValue(whole + "." + fraction, limits);
      if (value !== null) combinedValues.push(value);
    }

    const chosen = chooseMostLikelyPrice(combinedValues);
    if (chosen !== null) {
      return {
        value: chosen,
        text: "Rs." + chosen.toLocaleString("en-IN"),
      };
    }
  }

  const fallbackPatterns = [
    PRICE_PATTERN,
  ];

  for (const pattern of fallbackPatterns) {
    const chosen = chooseVariantAwarePrice(compactHtml, pattern, limits, hints);
    if (chosen !== null) {
      return {
        value: chosen,
        text: "Rs." + chosen.toLocaleString("en-IN"),
      };
    }
  }

  return normalizePriceFromText(compactHtml, limits);
}

async function fetchPrice(apiKey: string, market: "amazon" | "flipkart", url: string, limits: { min: number; max: number }, hints: string[]) {
  const endpoint = new URL("https://app.scrapingbee.com/api/v1/");
  endpoint.searchParams.set("api_key", apiKey);
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("render_js", "true");
  endpoint.searchParams.set("block_ads", "true");
  endpoint.searchParams.set("country_code", "in");
  endpoint.searchParams.set("wait", "3500");
  endpoint.searchParams.set("timeout", "45000");

  const response = await fetch(endpoint.toString());
  const html = await response.text();
  const price = normalizePriceFromHtml(html, market, limits, hints);

  return {
    market,
    ok: response.ok && !!price,
    status: response.status,
    url,
    minAcceptedPrice: limits.min,
    maxAcceptedPrice: limits.max,
    price: price?.value ?? null,
    priceText: price?.text ?? null,
  };
}

serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json({ error: "Use POST." }, 405);
  }

  const apiKey =
    typeof (globalThis as any).Deno !== "undefined"
      ? (globalThis as any).Deno.env.get("SCRAPINGBEE_API_KEY")
      : undefined;
  if (!apiKey) {
    return json({ error: "Missing SCRAPINGBEE_API_KEY secret." }, 500);
  }

  let productId = "";
  try {
    const body = await request.json();
    productId = String(body.productId || "");
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const productUrls = PRODUCT_URLS[productId];
  if (!productUrls) {
    return json({ error: "Unknown productId." }, 404);
  }

  const priceLimits = PRODUCT_PRICE_LIMITS[productId] || { min: 500, max: 300000 };
  const variantHints = PRODUCT_VARIANT_HINTS[productId] || [];
  const [amazon, flipkart] = await Promise.all([
    fetchPrice(apiKey, "amazon", productUrls.amazon, priceLimits, variantHints),
    fetchPrice(apiKey, "flipkart", productUrls.flipkart, priceLimits, variantHints),
  ]);

  return json({
    productId,
    updatedAt: new Date().toISOString(),
    amazon,
    flipkart,
  });
});
