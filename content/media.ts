/**
 * Cinematic video sources.
 * Each entry tries the local file first (drop files into /public/media),
 * then falls back to the hosted URL. Replace/extend freely.
 */
export const media = {
  heroOrbit: {
    local: "/media/hero-orbit.mp4",
    remote:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3F5mx6V4gcdPpBsBrilYJZfX4n6/hf_20260714_140302_3f3c8685-985f-45f9-9125-83bcefd87d85.mp4",
  },
  builder: {
    local: "/media/builder.mp4",
    remote: "", // add a hosted URL or drop builder.mp4 into /public/media
  },
  builderPhoto: "/media/Setup.jpg",
  closer: {
    local: "/media/closer.mp4",
    remote: "", // add a hosted URL or drop closer.mp4 into /public/media
    poster: "/media/closer-still.jpg", // your real photo, cinematic-graded by CSS
  },
} as const;

export type MediaSource = { local: string; remote: string; poster?: string };
