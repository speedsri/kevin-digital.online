"""Regenerates public/images/og-image.png and public/favicon/apple-touch-icon.png.
Optional helper (needs Python + Pillow). Not part of the website build."""
from PIL import Image, ImageDraw, ImageFont
import glob

BLUE = (29, 78, 216); NAVY = (13, 27, 42); MUTED = (74, 91, 112)

def font(sz, bold=True):
    name = 'DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf'
    c = [f for f in glob.glob('/usr/share/fonts/**/*.ttf', recursive=True) if f.endswith(name)]
    return ImageFont.truetype(c[0], sz) if c else ImageFont.load_default()

def mark(d, x, y, s, bg=BLUE, fg=(255, 255, 255)):
    k = s / 32; w = int(2.4 * k) + 1
    P = lambda a, b: (x + a * k, y + b * k)
    d.rounded_rectangle([x, y, x + s, y + s], radius=8 * k, fill=bg)
    for a, b in [((11, 8), (11, 24)), ((11, 16), (21, 8)), ((11, 16), (21, 24))]:
        d.line([P(*a), P(*b)], fill=fg, width=w)
    for cx, cy, r in [(11, 16, 2.7), (21, 8, 2.4), (21, 24, 2.4)]:
        d.ellipse([x + (cx - r) * k, y + (cy - r) * k, x + (cx + r) * k, y + (cy + r) * k], fill=fg)

im = Image.new('RGB', (180, 180), BLUE); mark(ImageDraw.Draw(im), 0, 0, 180)
im.save('public/favicon/apple-touch-icon.png')

W, H = 1200, 630
im = Image.new('RGB', (W, H), (244, 247, 250)); d = ImageDraw.Draw(im)
for gx in range(0, W, 32): d.line([(gx, 0), (gx, H)], fill=(230, 235, 241))
for gy in range(0, H, 32): d.line([(0, gy), (W, gy)], fill=(230, 235, 241))
mark(d, 80, 80, 72)
d.text((172, 88), 'Kevin Digital Developers', font=font(34), fill=NAVY)
d.text((172, 130), 'Digital Solutions & IT Infrastructure', font=font(20, False), fill=MUTED)
d.text((80, 240), 'Building digital systems', font=font(52), fill=NAVY)
d.text((80, 304), 'that connect your business', font=font(52), fill=NAVY)
d.text((80, 400), 'Kurunegala, Sri Lanka', font=font(24, False), fill=MUTED)
d.text((80, 440), 'Websites · CRM · Servers · VPN · WhatsApp · AI', font=font(24, False), fill=MUTED)
x0, y = 930, 90
d.line([(x0, y + 20), (x0, y + 20 + 7 * 60)], fill=(159, 176, 195), width=3)
for i, l in enumerate(['WEB', 'CRM', 'DATABASE', 'SERVER', 'NETWORK', 'CLOUD', 'WHATSAPP', 'AI']):
    yy = y + i * 60
    d.rounded_rectangle([x0 + 22, yy, x0 + 210, yy + 42], radius=8, fill=(255, 255, 255), outline=(211, 220, 230))
    d.ellipse([x0 - 9, yy + 12, x0 + 9, yy + 30], fill=BLUE if i in (0, 7) else (255, 255, 255), outline=BLUE, width=3)
    d.text((x0 + 38, yy + 10), l, font=font(18), fill=BLUE)
d.rectangle([0, H - 10, W, H], fill=BLUE)
im.save('public/images/og-image.png', optimize=True)
print('images written')
