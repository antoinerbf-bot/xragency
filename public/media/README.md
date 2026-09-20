# Hero studio media

The repository currently contains the Lovable asset manifest for `hero-studio.mp4`, but the binary is not present in the Git clone.

Place the production media here before launch:

- `public/media/hero-desktop.mp4` — H.264 MP4, 1920×1080 or 2560×1440, minimum 15 seconds, muted/loopable, target < 12 MB.
- `public/media/hero-mobile.mp4` — H.264 MP4, 1080×1920, minimum 15 seconds, target < 8 MB.
- `public/media/hero-poster.webp` — WebP/JPG poster, ideally 1600px+ wide, compressed for LCP.

The homepage already falls back to a local cinematic studio image poster, respects `prefers-reduced-motion` / `Save-Data`, and never renders an empty black hero while the media is missing.

Source manifest: `src/assets/hero-studio.mp4.asset.json`.
