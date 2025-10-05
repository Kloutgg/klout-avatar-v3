import color from "tinycolor2";

async function hash(str: string): Promise<number> {
  let sum = 0;
  const buffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str))
  for (const n of new Uint8Array(buffer)) {
    sum += n;
  }
  return sum;
}

export async function generateGradient(username: string) {
  const hashValue = await hash(username);
  const yellowTint = color('#FDBC04');

  // Create multiple variations based on hash
  const seed1 = hashValue % 360;
  const seed2 = (hashValue * 137) % 360; // Use different multiplier for variety
  const seed3 = (hashValue * 73) % 360; // Another multiplier

  // Create colors based on yellow tint with variations
  const yellowHue = yellowTint.toHsl().h;
  const yellowSat = yellowTint.toHsl().s;
  const yellowLight = yellowTint.toHsl().l;

  // Create first color: yellow with slight hue variation
  const color1 = color({
    h: (yellowHue + seed1 * 0.1) % 360, // Small hue variation
    s: Math.min(1, yellowSat + (hashValue % 10) / 100), // Vary saturation slightly
    l: Math.max(0.3, Math.min(0.8, yellowLight + (hashValue % 20 - 10) / 100)) // Vary lightness
  });

  // Create second color: yellow with different variation
  const color2 = color({
    h: (yellowHue + seed2 * 0.15) % 360, // Slightly more hue variation
    s: Math.min(1, yellowSat + (seed3 % 15) / 100), // Different saturation variation
    l: Math.max(0.3, Math.min(0.8, yellowLight + (seed3 % 25 - 12) / 100)) // Different lightness variation
  });

  return {
    fromColor: color1.toHexString(),
    toColor: color2.toHexString(),
  };
}
