// GET /api/shorts -> JSON feed of the latest YouTube Shorts for Xandra Creative.
// Vercel Serverless Function (no dependencies). Fetches the public YouTube RSS
// feed server-side (avoids browser CORS issues) and returns up to 10 items.
// Edge-cached for an hour so the channel page stays live without hammering YouTube.

const CHANNEL_ID = "UC8gFjswhNdlSGg1z-hLbejQ";
const RSS_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL_ID;
const MAX_ITEMS = 10;

function decodeXmlEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function parseFeed(xml) {
  const items = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRe.exec(xml)) !== null && items.length < MAX_ITEMS) {
    const e = m[1];
    const idM = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(e);
    const titleM = /<title>([\s\S]*?)<\/title>/.exec(e);
    const linkM =
      /<link[^>]*rel="alternate"[^>]*href="([^"]+)"/.exec(e) ||
      /<link[^>]*href="([^"]+)"[^>]*rel="alternate"/.exec(e);
    if (!idM || !linkM) continue;
    const id = idM[1].trim();
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) continue;
    items.push({
      id: id,
      title: titleM ? decodeXmlEntities(titleM[1].trim()) : "Untitled",
      url: "https://www.youtube.com/shorts/" + id,
      thumb: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg",
    });
  }
  return items;
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }
  try {
    const r = await fetch(RSS_URL, {
      headers: { "User-Agent": "xandra-shorts-feed/1.0 (+https://xandrathecreative.com)" },
    });
    if (!r.ok) throw new Error("youtube rss responded " + r.status);
    const items = parseFeed(await r.text());
    if (!items.length) throw new Error("no items parsed from feed");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({
      channelId: CHANNEL_ID,
      updated: new Date().toISOString(),
      items: items,
    });
  } catch (err) {
    res.setHeader("Cache-Control", "no-store");
    res.status(502).json({ error: "feed unavailable" });
  }
};
