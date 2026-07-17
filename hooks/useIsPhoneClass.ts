"use client";

import { useSyncExternalStore } from "react";

/**
 * Phone-class detection: small touch screens only.
 * iPad (and other tablets, via a min-dimension check) are treated as
 * desktop-class so they keep the full scroll-scrubbed hero orbit — only
 * phones fall back to a simpler autoplay loop. iPadOS reports as
 * "MacIntel" with multi-touch, so UA sniffing alone can't tell it apart
 * from a Mac; the touch-point check catches that case.
 */
function isPhoneClass(): boolean {
  const isIPad =
    /iPad/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIPad) return false;

  const touch =
    navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
  if (!touch) return false;

  const minDimension = Math.min(window.innerWidth, window.innerHeight);
  return minDimension < 600;
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  window.addEventListener("orientationchange", callback);
  return () => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("orientationchange", callback);
  };
}

function getServerSnapshot() {
  return false;
}

/**
 * Re-evaluates on resize/orientationchange so rotating a device (or a
 * split-screen/foldable resize) doesn't leave the hero stuck classifying
 * the viewport as the wrong device type.
 */
export function useIsPhoneClass(): boolean {
  return useSyncExternalStore(subscribe, isPhoneClass, getServerSnapshot);
}
