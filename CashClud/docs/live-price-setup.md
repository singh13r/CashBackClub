# Live Price Setup With Supabase

Live prices are handled by this Supabase Edge Function:

```txt
supabase/functions/live-price/index.ts
```

Your website calls it from `app.js` using:

```js
supabase.functions.invoke("live-price", ...)
```

## What You Need To Do

1. Add your ScrapingBee API key in Supabase secrets.
2. Deploy the `live-price` Edge Function.
3. Replace search URLs with exact product or affiliate URLs.

## Add API Key

In Supabase Dashboard:

```txt
Edge Functions -> Secrets -> Add secret
```

Add:

```txt
SCRAPINGBEE_API_KEY = your_real_scrapingbee_key
```

Do not put this key in frontend files.

## Deploy Function

If using Supabase CLI:

```txt
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy live-price
```

If you want the function public, deploy with:

```txt
supabase functions deploy live-price --no-verify-jwt
```

For this website, normal invoke through `supabase-js` should work because the client sends the Supabase auth/anon headers.

## Add Exact Product Links

Open:

```txt
supabase/functions/live-price/index.ts
```

Find:

```ts
const PRODUCT_URLS
```

Replace search links with exact product links.

Example:

```ts
"1": {
  amazon: "https://www.amazon.in/dp/REAL_ID?tag=YOURTAG-21",
  flipkart: "https://www.flipkart.com/real-product/p/REAL_ID"
}
```

Exact links are better than search links for live price accuracy.
