"""
Crop the FGB logo to just the circular badge with transparent background.
Detects the green circle, crops tight, and applies a circular alpha mask.
"""
from PIL import Image, ImageDraw
import sys, os

INPUT = r"C:\Users\saife\.gemini\antigravity\brain\32f53ef9-241f-4a5a-9d49-0fb21205dc52\media__1781191982994.jpg"
OUTPUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images", "fgb-logo.png")

img = Image.open(INPUT).convert("RGBA")
w, h = img.size

# The circle is centered in the image. Sample the corner to get background color.
bg = img.getpixel((10, 10))[:3]  # top-left corner = beige background

# Find bounding box of non-background pixels (the green circle)
pixels = img.load()
min_x, min_y, max_x, max_y = w, h, 0, 0
threshold = 60  # color distance threshold

for y in range(h):
    for x in range(w):
        r, g, b = pixels[x, y][:3]
        dist = ((r - bg[0])**2 + (g - bg[1])**2 + (b - bg[2])**2) ** 0.5
        if dist > threshold:
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

# Add small padding
pad = 4
min_x = max(0, min_x - pad)
min_y = max(0, min_y - pad)
max_x = min(w - 1, max_x + pad)
max_y = min(h - 1, max_y + pad)

# Make it a perfect square (the circle should be square)
crop_w = max_x - min_x
crop_h = max_y - min_y
size = max(crop_w, crop_h)

# Center the crop
cx = (min_x + max_x) // 2
cy = (min_y + max_y) // 2
half = size // 2

left = cx - half
top = cy - half
right = cx + half
bottom = cy + half

# Crop
cropped = img.crop((left, top, right, bottom))
s = cropped.size[0]

# Apply circular mask for transparent corners
mask = Image.new("L", (s, s), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, s - 1, s - 1), fill=255)
cropped.putalpha(mask)

# Save
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
cropped.save(OUTPUT, "PNG")
print(f"Saved cropped logo to: {OUTPUT}")
print(f"Size: {cropped.size}")
