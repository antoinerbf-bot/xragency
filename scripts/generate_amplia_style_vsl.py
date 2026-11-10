import os
import sys
import subprocess
import tempfile
import math

sys.path.append("/Users/rousseauantoine/Library/Python/3.9/lib/python/site-packages")
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FFMPEG = "./scripts/ffmpeg"
FONT_ROUNDED = "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"

VOICEOVER = "public/videos/xr-vsl-voiceover-48k.mp3"
MUSIC = "public/videos/music-inspired.mp3"
OUTPUT_VIDEO = "public/videos/xr-agency-vsl.mp4"
OUTPUT_POSTER = "public/videos/vsl-poster.jpg"

SCENES = [
    {"id": "hook", "dur": 8.6, "name": "Hook Artisan / Dirigeant"},
    {"id": "google_search", "dur": 7.0, "name": "Le Réflexe Google"},
    {"id": "competitor_call", "dur": 9.0, "name": "Le Concurrent qui gagne"},
    {"id": "ugly_site", "dur": 7.6, "name": "Le Constat 95% ne vendent pas"},
    {"id": "xr_solution", "dur": 8.8, "name": "Solution Machine d'Acquisition"},
    {"id": "web_couture", "dur": 9.7, "name": "Pilier 1 Web Haute Couture"},
    {"id": "maps_domination", "dur": 13.0, "name": "Pilier 2 Google Maps Top 3"},
    {"id": "social_branding", "dur": 9.3, "name": "Pilier 3 Tournages 4K & Branding"},
    {"id": "seo_care_robots", "dur": 7.4, "name": "Pilier 4 SEO, WebCare & Robots"},
    {"id": "social_proof", "dur": 7.0, "name": "Preuve Sociale +50 & 5 Jours"},
    {"id": "cta_whatsapp", "dur": 3.68, "name": "Call to Action WhatsApp & Audit"},
]

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.truetype(FONT_BOLD, size)

def draw_pill(draw, bbox, bg_color, border_color=None, border_width=2, radius=18):
    draw.rounded_rectangle(bbox, radius=radius, fill=bg_color, outline=border_color, width=border_width if border_color else 0)

def draw_shadow_box(img, bbox, radius=20, shadow_blur=24, shadow_color=(0, 0, 0, 140)):
    w, h = img.size
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sx1, sy1, sx2, sy2 = bbox[0] + 4, bbox[1] + 12, bbox[2] + 4, bbox[3] + 12
    sdraw.rounded_rectangle([sx1, sy1, sx2, sy2], radius=radius, fill=shadow_color)
    shadow = shadow.filter(ImageFilter.GaussianBlur(shadow_blur))
    img.alpha_composite(shadow)

def draw_star(draw, cx, cy, r_out=13, r_in=5.5, fill=(255, 190, 40)):
    points = []
    for i in range(10):
        r = r_out if i % 2 == 0 else r_in
        angle = i * math.pi / 5 - math.pi / 2
        points.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(points, fill=fill)

def draw_check_icon(draw, cx, cy, size=18, color=(52, 211, 153), width=3):
    p1 = (cx - size * 0.45, cy)
    p2 = (cx - size * 0.1, cy + size * 0.35)
    p3 = (cx + size * 0.45, cy - size * 0.35)
    draw.line([p1, p2], fill=color, width=width)
    draw.line([p2, p3], fill=color, width=width)

def draw_phone_frame(img, x, y, w, h, bg_color=(12, 16, 26)):
    draw_shadow_box(img, [x, y, x + w, y + h], radius=44, shadow_blur=30, shadow_color=(0, 0, 0, 160))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([x, y, x + w, y + h], radius=44, fill=bg_color, outline=(70, 85, 115), width=3)
    draw.rounded_rectangle([x + 6, y + 6, x + w - 6, y + h - 6], radius=38, outline=(25, 30, 45), width=2)
    # Dynamic Island
    di_w, di_h = 100, 26
    di_x = x + (w - di_w) // 2
    di_y = y + 14
    draw.rounded_rectangle([di_x, di_y, di_x + di_w, di_y + di_h], radius=13, fill=(0, 0, 0))
    draw.ellipse([di_x + 72, di_y + 8, di_x + 82, di_y + 18], fill=(18, 22, 35))

    font_status = get_font(FONT_BOLD, 13)
    draw.text((x + 28, y + 18), "9:41", font=font_status, fill=(255, 255, 255))
    draw.rectangle([x + w - 50, y + 20, x + w - 28, y + 30], outline=(255, 255, 255), width=1)
    draw.rectangle([x + w - 48, y + 22, x + w - 34, y + 28], fill=(255, 255, 255))
    draw.rectangle([x + w - 27, y + 23, x + w - 25, y + 27], fill=(255, 255, 255))

def draw_laptop_frame(img, x, y, w, h, title="duval-plomberie.fr"):
    draw_shadow_box(img, [x, y, x + w, y + h], radius=24, shadow_blur=35, shadow_color=(0, 0, 0, 180))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([x, y, x + w, y + h], radius=24, fill=(245, 246, 250), outline=(210, 215, 225), width=2)
    draw.rounded_rectangle([x, y, x + w, y + 46], radius=24, fill=(235, 238, 245))
    draw.rectangle([x, y + 24, x + w, y + 46], fill=(235, 238, 245))
    draw.line([(x, y + 46), (x + w, y + 46)], fill=(215, 220, 230), width=1)
    draw.ellipse([x + 18, y + 17, x + 30, y + 29], fill=(255, 95, 86))
    draw.ellipse([x + 38, y + 17, x + 50, y + 29], fill=(255, 189, 46))
    draw.ellipse([x + 58, y + 17, x + 70, y + 29], fill=(39, 201, 63))
    url_w = 340
    url_x = x + (w - url_w) // 2
    draw.rounded_rectangle([url_x, y + 10, url_x + url_w, y + 36], radius=8, fill=(255, 255, 255), outline=(215, 220, 230), width=1)
    font_url = get_font(FONT_REGULAR, 13)
    draw.text((url_x + 30, y + 15), f"https://{title}", font=font_url, fill=(100, 105, 120))

def create_base_canvas(theme="dark"):
    canvas = Image.new("RGBA", (1920, 1080), (12, 16, 28, 255))
    draw = ImageDraw.Draw(canvas)
    
    if theme == "dark":
        for y in range(0, 1080, 48):
            draw.line([(0, y), (1920, y)], fill=(20, 26, 44, 255), width=1)
        for x in range(0, 1920, 48):
            draw.line([(x, 0), (x, 1080)], fill=(20, 26, 44, 255), width=1)
        glow = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.ellipse([300, -100, 1620, 900], fill=(1, 90, 255, 45))
        glow = glow.filter(ImageFilter.GaussianBlur(150))
        canvas.alpha_composite(glow)
    elif theme == "blue":
        for y in range(1080):
            r = int(1 + (8 * y / 1080))
            g = int(80 + (25 * y / 1080))
            b = int(245 - (15 * y / 1080))
            draw.line([(0, y), (1920, y)], fill=(r, g, b, 255))
        for y in range(0, 1080, 52):
            draw.line([(0, y), (1920, y)], fill=(255, 255, 255, 20), width=1)
        for x in range(0, 1920, 52):
            draw.line([(x, 0), (x, 1080)], fill=(255, 255, 255, 20), width=1)
    elif theme == "light":
        for y in range(1080):
            r = int(248 + (5 * y / 1080))
            g = int(250 + (3 * y / 1080))
            b = int(255)
            draw.line([(0, y), (1920, y)], fill=(r, g, b, 255))
        for y in range(0, 1080, 52):
            draw.line([(0, y), (1920, y)], fill=(225, 232, 245, 255), width=1)
        for x in range(0, 1920, 52):
            draw.line([(x, 0), (x, 1080)], fill=(225, 232, 245, 255), width=1)
        glow = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.ellipse([-200, -200, 700, 700], fill=(1, 90, 255, 30))
        glow = glow.filter(ImageFilter.GaussianBlur(120))
        canvas.alpha_composite(glow)

    return canvas

# ----------------- SCENE BUILDERS ----------------- #

def build_scene_01_hook():
    canvas = create_base_canvas("dark")
    if os.path.exists("src/assets/hero-cinematic.jpg"):
        bg = Image.open("src/assets/hero-cinematic.jpg").convert("RGBA")
        bg = bg.resize((1920, 1080), Image.Resampling.LANCZOS)
        overlay = Image.new("RGBA", (1920, 1080), (10, 14, 24, 185))
        bg.alpha_composite(overlay)
        canvas.paste(bg, (0, 0))

    draw = ImageDraw.Draw(canvas)
    f_kicker = get_font(FONT_ROUNDED, 44)
    f_pill = get_font(FONT_ROUNDED, 84)
    f_sub = get_font(FONT_ROUNDED, 24)

    draw.text((90, 60), "XR AGENCY | ACQUISITION DIGITALE & HAUTE COUTURE", font=get_font(FONT_BOLD, 18), fill=(208, 166, 110, 220))
    draw.ellipse([1800, 64, 1814, 78], fill=(52, 211, 153))
    draw.text((1825, 62), "VSL", font=get_font(FONT_BOLD, 18), fill=(255, 255, 255, 220))

    draw.text((960, 360), "T ' E S", font=f_kicker, fill=(160, 200, 255), anchor="mm")

    pill_w, pill_h = 1060, 140
    px1, py1 = (1920 - pill_w) // 2, 440
    px2, py2 = px1 + pill_w, py1 + pill_h

    draw_shadow_box(canvas, [px1, py1, px2, py2], radius=32, shadow_blur=45, shadow_color=(1, 90, 255, 220))
    draw = ImageDraw.Draw(canvas)
    draw_pill(draw, [px1, py1, px2, py2], bg_color=(1, 90, 255), border_color=(255, 255, 255, 200), border_width=2, radius=32)
    draw.text((960, py1 + pill_h // 2), "DIRIGEANT OU ARTISAN ?", font=f_pill, fill=(255, 255, 255), anchor="mm")

    cat_y = 740
    categories = ["Artisans BTP", "PME & Dirigeants", "Commerces", "Restauration", "Professions Libérales"]
    total_w = sum(draw.textbbox((0, 0), cat, font=f_sub)[2] + 48 for cat in categories)
    cur_x = (1920 - total_w) // 2
    for i, cat in enumerate(categories):
        cw = draw.textbbox((0, 0), cat, font=f_sub)[2] + 48
        is_active = (i == 0)
        bg_col = (1, 90, 255, 240) if is_active else (255, 255, 255, 25)
        border_col = (255, 255, 255, 220) if is_active else (255, 255, 255, 60)
        draw.rounded_rectangle([cur_x, cat_y, cur_x + cw, cat_y + 54], radius=27, fill=bg_col, outline=border_col, width=1)
        draw.text((cur_x + cw // 2, cat_y + 27), cat, font=f_sub, fill=(255, 255, 255) if is_active else (210, 215, 225), anchor="mm")
        cur_x += cw + 12

    return canvas

def build_scene_02_google_search():
    canvas = create_base_canvas("light")
    draw = ImageDraw.Draw(canvas)

    f_title = get_font(FONT_ROUNDED, 76)
    f_input = get_font(FONT_ROUNDED, 32)
    f_sub = get_font(FONT_ROUNDED, 24)

    draw.text((960, 270), "Mais sur Google...", font=f_title, fill=(18, 24, 38), anchor="mm")
    draw.text((960, 360), "on te trouve ?", font=f_title, fill=(18, 24, 38), anchor="mm")
    draw.arc([680, 275, 1140, 315], start=0, end=180, fill=(1, 90, 255), width=5)

    sb_w, sb_h = 920, 84
    sb_x1, sb_y1 = (1920 - sb_w) // 2, 480
    sb_x2, sb_y2 = sb_x1 + sb_w, sb_y1 + sb_h

    draw_shadow_box(canvas, [sb_x1, sb_y1, sb_x2, sb_y2], radius=42, shadow_blur=30, shadow_color=(1, 90, 255, 50))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([sb_x1, sb_y1, sb_x2, sb_y2], radius=42, fill=(255, 255, 255), outline=(215, 225, 240), width=2)

    gx = sb_x1 + 36
    draw.ellipse([gx, sb_y1 + 24, gx + 36, sb_y1 + 60], fill=(66, 133, 244))
    draw.ellipse([gx + 8, sb_y1 + 32, gx + 28, sb_y1 + 52], fill=(255, 255, 255))
    draw.rectangle([gx + 18, sb_y1 + 38, gx + 36, sb_y1 + 46], fill=(66, 133, 244))

    draw.text((sb_x1 + 95, sb_y1 + 42), "artisan ou entreprise près de chez moi", font=f_input, fill=(30, 35, 45), anchor="lm")
    draw.line([(sb_x1 + 685, sb_y1 + 24), (sb_x1 + 685, sb_y1 + 60)], fill=(1, 90, 255), width=3)

    draw.ellipse([sb_x2 - 58, sb_y1 + 30, sb_x2 - 38, sb_y1 + 50], outline=(1, 90, 255), width=3)
    draw.line([(sb_x2 - 42, sb_y1 + 46), (sb_x2 - 34, sb_y1 + 56)], fill=(1, 90, 255), width=3)

    sug_box_y = sb_y2 + 16
    draw.rounded_rectangle([sb_x1, sug_box_y, sb_x2, sug_box_y + 190], radius=24, fill=(255, 255, 255), outline=(225, 230, 242), width=1)
    suggestions = [
        "artisan recommandé avec avis 5 étoiles",
        "devis gratuit immédiat intervention rapide",
        "meilleure entreprise locale top 3 google",
    ]
    for i, s in enumerate(suggestions):
        sy = sug_box_y + 36 + i * 54
        # draw blue magnifying glass
        draw.ellipse([sb_x1 + 35, sy - 12, sb_x1 + 50, sy + 3], outline=(1, 90, 255), width=2)
        draw.line([(sb_x1 + 47, sy), (sb_x1 + 54, sy + 7)], fill=(1, 90, 255), width=2)
        draw.text((sb_x1 + 68, sy), s, font=f_sub, fill=(90, 100, 115))

    return canvas

def build_scene_03_competitor_call():
    canvas = create_base_canvas("dark")
    draw = ImageDraw.Draw(canvas)

    f_big = get_font(FONT_ROUNDED, 80)
    f_sub = get_font(FONT_ROUNDED, 36)
    f_pill = get_font(FONT_ROUNDED, 48)

    lx = 140
    draw.text((lx, 320), "Ton", font=f_big, fill=(255, 255, 255))
    draw.rounded_rectangle([lx, 420, lx + 520, 520], radius=24, fill=(235, 50, 50))
    draw.text((lx + 32, 470), "concurrent...", font=f_pill, fill=(255, 255, 255), anchor="lm")

    draw.text((lx, 570), "qui bosse peut-être moins bien...", font=f_sub, fill=(200, 210, 230))
    draw.text((lx, 630), "mais qui décroche tous les appels.", font=f_sub, fill=(208, 166, 110))

    px, py, pw, ph = 1200, 180, 420, 780
    draw_phone_frame(canvas, px, py, pw, ph, bg_color=(15, 20, 32))
    draw = ImageDraw.Draw(canvas)

    draw.text((px + pw // 2, py + 120), "Appel en cours | Mobile", font=get_font(FONT_REGULAR, 16), fill=(160, 175, 200), anchor="mm")
    draw.text((px + pw // 2, py + 165), "Plomberie & Travaux Dupont", font=get_font(FONT_ROUNDED, 24), fill=(255, 255, 255), anchor="mm")
    draw.text((px + pw // 2, py + 205), "00:08", font=get_font(FONT_BOLD, 18), fill=(52, 211, 153), anchor="mm")

    cx, cy = px + pw // 2, py + 330
    draw.ellipse([cx - 70, cy - 70, cx + 70, cy + 70], fill=(45, 55, 80), outline=(70, 85, 120), width=2)
    draw.text((cx, cy), "PD", font=get_font(FONT_ROUNDED, 48), fill=(255, 255, 255), anchor="mm")

    draw.rounded_rectangle([px + 40, py + 460, px + pw - 40, py + 520], radius=16, fill=(52, 211, 153, 30), outline=(52, 211, 153), width=1)
    draw_check_icon(draw, px + 75, py + 490, size=16, color=(52, 211, 153))
    draw.text((px + 100, py + 490), "Contrat signé en 1 clic", font=get_font(FONT_ROUNDED, 18), fill=(52, 211, 153), anchor="lm")

    draw.ellipse([cx - 40, py + 620, cx + 40, py + 700], fill=(235, 50, 50))
    draw.rectangle([cx - 16, py + 656, cx + 16, py + 664], fill=(255, 255, 255))

    return canvas

def build_scene_04_ugly_site():
    canvas = create_base_canvas("dark")
    draw = ImageDraw.Draw(canvas)

    f_top = get_font(FONT_ROUNDED, 58)
    f_red = get_font(FONT_ROUNDED, 58)

    draw.text((960, 160), "Pas de photos de tes chantiers...", font=f_top, fill=(255, 255, 255), anchor="mm")
    draw.text((960, 230), "95% des sites ne vendent rien.", font=f_red, fill=(235, 50, 50), anchor="mm")

    lx, ly, lw, lh = 360, 310, 1200, 640
    draw_laptop_frame(canvas, lx, ly, lw, lh, title="artisan-dupont-2014.free.fr")
    draw = ImageDraw.Draw(canvas)

    draw.rectangle([lx + 10, ly + 50, lx + lw - 10, ly + 140], fill=(20, 120, 140))
    draw.text((lx + lw // 2, ly + 95), "ENTREPRISE ARTISAN TRAVAUX", font=get_font(FONT_BOLD, 36), fill=(255, 255, 100), anchor="mm")

    draw.rectangle([lx + 20, ly + 160, lx + 220, ly + 460], fill=(225, 230, 235))
    menu_items = ["Accueil", "Qui sommes-nous ?", "Nos prestations", "Tarifs (sur devis)", "Contact"]
    for i, it in enumerate(menu_items):
        draw.text((lx + 40, ly + 190 + i * 45), it, font=get_font(FONT_REGULAR, 16), fill=(30, 60, 140))

    for b in range(3):
        bx = lx + 260 + b * 290
        by = ly + 180
        draw.rectangle([bx, by, bx + 270, by + 190], fill=(240, 242, 245), outline=(200, 205, 215), width=1)
        draw.line([(bx, by), (bx + 270, by + 190)], fill=(210, 215, 225), width=2)
        draw.line([(bx + 270, by), (bx, by + 190)], fill=(210, 215, 225), width=2)
        draw.text((bx + 135, by + 95), "Image introuvable", font=get_font(FONT_REGULAR, 15), fill=(160, 165, 175), anchor="mm")

    draw.rectangle([lx + 260, ly + 400, lx + lw - 40, ly + 450], fill=(255, 215, 0))
    draw.text((lx + 680, ly + 425), "SITE EN CONSTRUCTION DEPUIS 2014", font=get_font(FONT_BOLD, 22), fill=(0, 0, 0), anchor="mm")

    draw_shadow_box(canvas, [lx + lw - 420, ly + 210, lx + lw - 20, ly + 290], radius=20, shadow_blur=25, shadow_color=(235, 50, 50, 120))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([lx + lw - 420, ly + 210, lx + lw - 20, ly + 290], radius=20, fill=(255, 255, 255), outline=(235, 50, 50), width=2)
    draw.text((lx + lw - 220, ly + 250), "0 appel / mois", font=get_font(FONT_ROUNDED, 28), fill=(235, 50, 50), anchor="mm")

    return canvas

def build_scene_05_xr_solution():
    canvas = create_base_canvas("blue")
    draw = ImageDraw.Draw(canvas)

    f_top = get_font(FONT_ROUNDED, 68)
    f_pill = get_font(FONT_ROUNDED, 46)

    draw.text((960, 130), "XR AGENCY", font=get_font(FONT_ROUNDED, 42), fill=(255, 255, 255), anchor="mm")

    lx, ly, lw, lh = 380, 210, 1160, 600
    draw_laptop_frame(canvas, lx, ly, lw, lh, title="xragencyai.com/client-showcase")
    draw = ImageDraw.Draw(canvas)

    if os.path.exists("src/assets/web-luxury-showcase.jpg"):
        sc = Image.open("src/assets/web-luxury-showcase.jpg").convert("RGBA")
        sc = sc.resize((lw - 4, lh - 50), Image.Resampling.LANCZOS)
        canvas.paste(sc, (lx + 2, ly + 48))

    draw_shadow_box(canvas, [760, 450, 1160, 560], radius=24, shadow_blur=30, shadow_color=(0, 0, 0, 180))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([760, 450, 1160, 560], radius=24, fill=(16, 20, 30, 240), outline=(255, 255, 255, 180), width=2)
    draw.text((960, 505), "VITRINE", font=get_font(FONT_ROUNDED, 64), fill=(255, 255, 255), anchor="mm")
    draw.line([(780, 505), (1140, 505)], fill=(235, 50, 50), width=9)

    draw.text((960, 880), "Pas une simple vitrine...", font=f_top, fill=(255, 255, 255), anchor="mm")
    draw_pill(draw, [420, 930, 1500, 1020], bg_color=(12, 16, 28), border_color=(208, 166, 110), border_width=2, radius=24)
    draw.text((960, 975), "UNE VRAIE MACHINE D'ACQUISITION COMMERCIALE", font=f_pill, fill=(208, 166, 110), anchor="mm")

    return canvas

def build_scene_06_web_couture():
    canvas = create_base_canvas("light")
    draw = ImageDraw.Draw(canvas)

    lx, ly, lw, lh = 100, 240, 980, 580
    draw_laptop_frame(canvas, lx, ly, lw, lh, title="haute-couture.xragencyai.com")
    if os.path.exists("src/assets/web-luxury-showcase.jpg"):
        sc = Image.open("src/assets/web-luxury-showcase.jpg").convert("RGBA")
        sc = sc.resize((lw - 4, lh - 50), Image.Resampling.LANCZOS)
        canvas.paste(sc, (lx + 2, ly + 48))

    draw_shadow_box(canvas, [lx + 40, ly + lh - 120, lx + 440, ly + lh + 20], radius=22, shadow_blur=25, shadow_color=(1, 90, 255, 70))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([lx + 40, ly + lh - 120, lx + 440, ly + lh + 20], radius=22, fill=(255, 255, 255), outline=(52, 211, 153), width=2)
    draw.ellipse([lx + 60, ly + lh - 105, lx + 140, ly + lh - 25], outline=(52, 211, 153), width=8)
    draw.text((lx + 100, ly + lh - 65), "99", font=get_font(FONT_ROUNDED, 36), fill=(16, 185, 129), anchor="mm")
    draw.text((lx + 160, ly + lh - 82), "0,4 s", font=get_font(FONT_ROUNDED, 40), fill=(20, 25, 35), anchor="lm")
    draw.text((lx + 160, ly + lh - 48), "Vitesse de chargement A+", font=get_font(FONT_REGULAR, 16), fill=(100, 110, 125), anchor="lm")

    rx = 1140
    draw.text((rx, 180), "01 | UNIVERS WEB HAUTE COUTURE", font=get_font(FONT_BOLD, 22), fill=(1, 90, 255))
    draw.text((rx, 225), "Dès 499 € clés en main", font=get_font(FONT_ROUNDED, 36), fill=(15, 20, 30))

    checklist = [
        ("Design Haute Couture", "Inspire confiance au premier regard"),
        ("Textes qui vendent", "Rédigés pour déclencher l'appel"),
        ("Ultra-rapide < 0.4s", "Optimisé mobile à 100% sans perte"),
        ("Taux de conversion x3", "Formulaires & Appels 1-clic direct"),
    ]
    for i, (title, sub) in enumerate(checklist):
        cy = 290 + i * 135
        cw, ch = 680, 115
        draw_shadow_box(canvas, [rx, cy, rx + cw, cy + ch], radius=20, shadow_blur=18, shadow_color=(1, 90, 255, 30))
        draw = ImageDraw.Draw(canvas)
        draw.rounded_rectangle([rx, cy, rx + cw, cy + ch], radius=20, fill=(255, 255, 255), outline=(220, 228, 240), width=1)
        draw.ellipse([rx + 24, cy + 30, rx + 78, cy + 84], fill=(1, 90, 255))
        draw_check_icon(draw, rx + 51, cy + 57, size=18, color=(255, 255, 255))
        draw.text((rx + 100, cy + 42), title, font=get_font(FONT_ROUNDED, 24), fill=(15, 20, 30))
        draw.text((rx + 100, cy + 74), sub, font=get_font(FONT_REGULAR, 18), fill=(100, 110, 125))

    return canvas

def build_scene_07_maps_domination():
    canvas = create_base_canvas("dark")
    draw = ImageDraw.Draw(canvas)

    f_head = get_font(FONT_ROUNDED, 46)
    f_sub = get_font(FONT_ROUNDED, 22)

    draw.text((960, 110), "02 | GOOGLE MAPS & RÉFÉRENCEMENT LOCAL", font=get_font(FONT_BOLD, 20), fill=(234, 67, 53), anchor="mm")
    draw.text((960, 165), "Domination Top 3 : Capter tous les clients de ta zone", font=f_head, fill=(255, 255, 255), anchor="mm")

    mx, my, mw, mh = 140, 260, 840, 680
    draw_shadow_box(canvas, [mx, my, mx + mw, my + mh], radius=26, shadow_blur=30, shadow_color=(0, 0, 0, 180))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([mx, my, mx + mw, my + mh], radius=26, fill=(24, 28, 42), outline=(208, 166, 110, 150), width=2)

    # Top search bar
    draw.rounded_rectangle([mx + 30, my + 30, mx + mw - 30, my + 80], radius=14, fill=(16, 20, 30), outline=(50, 60, 85), width=1)
    # Draw red pin icon
    draw.ellipse([mx + 50, my + 45, mx + 68, my + 63], fill=(234, 67, 53))
    draw.polygon([(mx + 52, my + 57), (mx + 66, my + 57), (mx + 59, my + 70)], fill=(234, 67, 53))
    draw.ellipse([mx + 56, my + 51, mx + 62, my + 57], fill=(255, 255, 255))
    draw.text((mx + 82, my + 55), "Google Maps | Résultats à proximité", font=f_sub, fill=(180, 195, 220), anchor="lm")

    # Item #1 - HIGHLIGHTED TOP 1
    y1 = my + 110
    draw.rounded_rectangle([mx + 20, y1, mx + mw - 20, y1 + 170], radius=18, fill=(35, 45, 68), outline=(208, 166, 110), width=2)
    draw.rounded_rectangle([mx + 40, y1 + 20, mx + 110, y1 + 60], radius=10, fill=(208, 166, 110))
    draw.text((mx + 75, y1 + 40), "#1", font=get_font(FONT_ROUNDED, 24), fill=(0, 0, 0), anchor="mm")

    draw.text((mx + 130, y1 + 40), "Votre Entreprise (Client XR Agency)", font=get_font(FONT_ROUNDED, 26), fill=(255, 255, 255), anchor="lm")
    
    # 5 Gold vector stars
    for s in range(5):
        draw_star(draw, mx + 55 + s * 24, y1 + 85, r_out=10, r_in=4.5, fill=(255, 190, 40))
    draw.text((mx + 185, y1 + 85), "4.9 (148 avis) | Fiche Vérifiée Google Business", font=f_sub, fill=(255, 190, 40), anchor="lm")
    
    draw.ellipse([mx + 42, y1 + 120, mx + 54, y1 + 132], fill=(52, 211, 153))
    draw.text((mx + 65, y1 + 125), "Ouvert | Réponse sous 15 min | Zone couverte à 100%", font=get_font(FONT_REGULAR, 17), fill=(52, 211, 153), anchor="lm")

    # Item #2 & #3 (Competitors below)
    y2 = y1 + 190
    draw.rounded_rectangle([mx + 20, y2, mx + mw - 20, y2 + 130], radius=16, fill=(20, 24, 36), outline=(40, 50, 70), width=1)
    for s in range(3):
        draw_star(draw, mx + 50 + s * 20, y2 + 35, r_out=8, r_in=3.5, fill=(150, 160, 175))
    draw.text((mx + 120, y2 + 35), "#2 Concurrent A | 3.8 (19 avis)", font=get_font(FONT_REGULAR, 20), fill=(160, 170, 185), anchor="lm")
    draw.text((mx + 40, y2 + 75), "Fermé récemment | Pas de photos récentes", font=get_font(FONT_REGULAR, 16), fill=(110, 120, 135), anchor="lm")

    y3 = y2 + 150
    draw.rounded_rectangle([mx + 20, y3, mx + mw - 20, y3 + 130], radius=16, fill=(20, 24, 36), outline=(40, 50, 70), width=1)
    for s in range(4):
        draw_star(draw, mx + 50 + s * 20, y3 + 35, r_out=8, r_in=3.5, fill=(150, 160, 175))
    draw.text((mx + 140, y3 + 35), "#3 Concurrent B | 4.0 (11 avis)", font=get_font(FONT_REGULAR, 20), fill=(160, 170, 185), anchor="lm")
    draw.text((mx + 40, y3 + 75), "Horaires non confirmés", font=get_font(FONT_REGULAR, 16), fill=(110, 120, 135), anchor="lm")

    # Right: The 2 Enriched Offers (99 € & 159 €)
    rx = 1040
    # Offer 1: 99 €/m
    o1_y = 260
    draw.rounded_rectangle([rx, o1_y, rx + 740, o1_y + 200], radius=22, fill=(24, 30, 48), outline=(60, 75, 110), width=1)
    draw.text((rx + 36, o1_y + 45), "OFFRE 1 | GESTION & CROISSANCE", font=get_font(FONT_BOLD, 17), fill=(140, 165, 210))
    draw.text((rx + 36, o1_y + 90), "99 € / mois", font=get_font(FONT_ROUNDED, 40), fill=(255, 255, 255))
    draw_check_icon(draw, rx + 50, o1_y + 145, size=16, color=(140, 165, 210))
    draw.text((rx + 75, o1_y + 145), "Optimisation Google Business Profile complète", font=f_sub, fill=(220, 230, 245), anchor="lm")
    draw_check_icon(draw, rx + 50, o1_y + 185, size=16, color=(140, 165, 210))
    draw.text((rx + 75, o1_y + 185), "Collecte d'avis 5 étoiles & Réponses stratégiques pro", font=f_sub, fill=(220, 230, 245), anchor="lm")

    # Offer 2: 159 €/m (POPULAIRE)
    o2_y = 485
    draw.rounded_rectangle([rx, o2_y, rx + 740, o2_y + 270], radius=22, fill=(35, 42, 65), outline=(208, 166, 110), width=2)
    draw.rounded_rectangle([rx + 480, o2_y + 25, rx + 710, o2_y + 65], radius=12, fill=(208, 166, 110))
    draw.text((rx + 595, o2_y + 45), "PLUS POPULAIRE", font=get_font(FONT_BOLD, 14), fill=(0, 0, 0), anchor="mm")

    draw.text((rx + 36, o2_y + 45), "OFFRE 2 | DOMINATION TOP 3 ACCÉLÉRÉE", font=get_font(FONT_BOLD, 17), fill=(208, 166, 110))
    draw.text((rx + 36, o2_y + 90), "159 € / mois", font=get_font(FONT_ROUNDED, 40), fill=(255, 255, 255))
    draw_check_icon(draw, rx + 50, o2_y + 145, size=16, color=(208, 166, 110))
    draw.text((rx + 75, o2_y + 145), "Garantie contractuelle Top 3 sur ta ville", font=f_sub, fill=(255, 255, 255), anchor="lm")
    draw_check_icon(draw, rx + 50, o2_y + 185, size=16, color=(52, 211, 153))
    draw.text((rx + 75, o2_y + 185), "Plaque comptoir NFC / QR Code offerte & livrée", font=f_sub, fill=(52, 211, 153), anchor="lm")
    draw_check_icon(draw, rx + 50, o2_y + 225, size=16, color=(208, 166, 110))
    draw.text((rx + 75, o2_y + 225), "Citations locales & Netlinking géolocalisé", font=f_sub, fill=(220, 230, 245), anchor="lm")

    # Bottom Result Pill
    draw_pill(draw, [rx, 775, rx + 740, 865], bg_color=(234, 67, 53), border_color=(255, 255, 255), border_width=1, radius=20)
    draw.text((rx + 370, 820), "RÉSULTAT : +300% D'APPELS DIRECTS DÈS LE 1ER MOIS", font=get_font(FONT_ROUNDED, 24), fill=(255, 255, 255), anchor="mm")

    return canvas

def build_scene_08_social_branding():
    canvas = create_base_canvas("dark")
    draw = ImageDraw.Draw(canvas)

    draw.text((960, 110), "03 | PRODUCTION 4K & BRANDING PRESTIGE", font=get_font(FONT_BOLD, 20), fill=(244, 63, 94), anchor="mm")
    draw.text((960, 165), "Des vidéos virales et une image qui justifie des prix élevés", font=get_font(FONT_ROUNDED, 46), fill=(255, 255, 255), anchor="mm")

    px, py, pw, ph = 240, 240, 420, 740
    draw_phone_frame(canvas, px, py, pw, ph, bg_color=(5, 5, 10))
    if os.path.exists("src/assets/svc-social-cinematic.jpg"):
        sc = Image.open("src/assets/svc-social-cinematic.jpg").convert("RGBA")
        sc = sc.resize((pw - 12, ph - 70), Image.Resampling.LANCZOS)
        canvas.paste(sc, (px + 6, py + 48))

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([px + 20, py + ph - 160, px + pw - 20, py + ph - 30], radius=16, fill=(0, 0, 0, 210))
    draw.text((px + 36, py + ph - 135), "Tournage cinéma 4K sur site", font=get_font(FONT_BOLD, 17), fill=(255, 255, 255))
    draw.text((px + 36, py + ph - 105), "14.8K likes | 148K vues virales", font=get_font(FONT_ROUNDED, 18), fill=(255, 75, 110))
    draw.text((px + 36, py + ph - 75), "Dès 349 € / mois | Scripts viraux", font=get_font(FONT_BOLD, 15), fill=(208, 166, 110))

    rx = 740
    draw.rounded_rectangle([rx, 240, rx + 940, 580], radius=24, fill=(24, 28, 42), outline=(208, 166, 110), width=2)
    if os.path.exists("src/assets/svc-branding-cinematic.jpg"):
        bc = Image.open("src/assets/svc-branding-cinematic.jpg").convert("RGBA")
        bc = bc.resize((420, 336), Image.Resampling.LANCZOS)
        canvas.paste(bc, (rx + 2, 242))

    draw = ImageDraw.Draw(canvas)
    bx = rx + 450
    draw.text((bx, 280), "BRANDING DE PRESTIGE", font=get_font(FONT_BOLD, 22), fill=(208, 166, 110))
    draw.text((bx, 325), "Dès 199 €", font=get_font(FONT_ROUNDED, 40), fill=(255, 255, 255))
    
    draw_check_icon(draw, bx + 15, 380, size=16, color=(208, 166, 110))
    draw.text((bx + 35, 380), "Logotype vectoriel complet HD", font=get_font(FONT_REGULAR, 20), fill=(220, 230, 245), anchor="lm")
    draw_check_icon(draw, bx + 15, 420, size=16, color=(208, 166, 110))
    draw.text((bx + 35, 420), "Brand Book 20+ pages & Typographies", font=get_font(FONT_REGULAR, 20), fill=(220, 230, 245), anchor="lm")
    draw_check_icon(draw, bx + 15, 460, size=16, color=(208, 166, 110))
    draw.text((bx + 35, 460), "Papeterie & Cartes de visite d'art", font=get_font(FONT_REGULAR, 20), fill=(220, 230, 245), anchor="lm")
    draw_check_icon(draw, bx + 15, 500, size=16, color=(52, 211, 153))
    draw.text((bx + 35, 500), "Cession totale 100% des droits d'auteur", font=get_font(FONT_BOLD, 20), fill=(52, 211, 153), anchor="lm")

    draw_pill(draw, [rx, 630, rx + 940, 730], bg_color=(244, 63, 94), border_color=(255, 255, 255), border_width=1, radius=22)
    draw.text((rx + 470, 680), "RÉSULTAT : UNE AUTORITÉ IMMÉDIATE QUI MULTIPLIE VOS PRIX", font=get_font(FONT_ROUNDED, 24), fill=(255, 255, 255), anchor="mm")

    return canvas

def build_scene_09_seo_care_robots():
    canvas = create_base_canvas("dark")
    draw = ImageDraw.Draw(canvas)

    f_title = get_font(FONT_ROUNDED, 46)
    f_sub = get_font(FONT_REGULAR, 20)

    draw.text((960, 110), "04 | RÉFÉRENCEMENT, SÉCURITÉ & ROBOTIQUE", font=get_font(FONT_BOLD, 20), fill=(208, 166, 110), anchor="mm")
    draw.text((960, 165), "Une suite complète pour automatiser et pérenniser votre croissance", font=f_title, fill=(255, 255, 255), anchor="mm")

    cols = [
        {
            "num": "05",
            "tag": "SEO GOOGLE DURABLE",
            "price": "Dès 299 € / m",
            "color": (139, 92, 246),
            "items": ["#1 sur vos mots-clés stratégiques", "Cocons sémantiques puissants", "Trafic chaud sans dépendance pub"],
            "img": "src/assets/svc-seo-cinematic.jpg"
        },
        {
            "num": "06",
            "tag": "WEBCARE 24/7 & CYBER",
            "price": "Dès 29 € / m",
            "color": (14, 165, 233),
            "items": ["Surveillance continue 24/7/365", "Sauvegardes cloud quotidiennes", "Astreinte humaine garantie < 2h"],
            "img": "src/assets/svc-maintenance-cinematic.jpg"
        },
        {
            "num": "07",
            "tag": "ROBOTS KORBEN & IA",
            "price": "Dès 499 € / m",
            "color": (208, 166, 110),
            "items": ["Robots de service autonomes", "Accueil CHR & commerces", "Maintenance & déploiement inclus"],
            "img": "src/assets/svc-robotics-cinematic.jpg"
        },
    ]

    for i, col in enumerate(cols):
        cx = 120 + i * 570
        cy, cw, ch = 240, 540, 710
        draw_shadow_box(canvas, [cx, cy, cx + cw, cy + ch], radius=24, shadow_blur=25, shadow_color=(0, 0, 0, 160))
        draw = ImageDraw.Draw(canvas)
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=24, fill=(22, 26, 38), outline=col["color"], width=2)

        if os.path.exists(col["img"]):
            th = Image.open(col["img"]).convert("RGBA")
            th = th.resize((cw - 4, 220), Image.Resampling.LANCZOS)
            canvas.paste(th, (cx + 2, cy + 2))

        draw = ImageDraw.Draw(canvas)
        draw.text((cx + 30, cy + 250), col["tag"], font=get_font(FONT_BOLD, 17), fill=col["color"])
        draw.text((cx + 30, cy + 295), col["price"], font=get_font(FONT_ROUNDED, 36), fill=(255, 255, 255))

        for j, it in enumerate(col["items"]):
            draw_check_icon(draw, cx + 45, cy + 365 + j * 50, size=15, color=col["color"])
            draw.text((cx + 70, cy + 365 + j * 50), it, font=f_sub, fill=(215, 225, 240), anchor="lm")

        draw.rounded_rectangle([cx + 24, cy + ch - 80, cx + cw - 24, cy + ch - 24], radius=14, fill=(col["color"][0], col["color"][1], col["color"][2], 50), outline=col["color"], width=1)
        draw.text((cx + cw // 2, cy + ch - 52), "100% GARANTI PAR CONTRAT", font=get_font(FONT_BOLD, 15), fill=(255, 255, 255), anchor="mm")

    return canvas

def build_scene_10_social_proof():
    canvas = create_base_canvas("light")
    draw = ImageDraw.Draw(canvas)

    f_huge = get_font(FONT_ROUNDED, 120)
    f_sub = get_font(FONT_ROUNDED, 38)

    draw.text((540, 180), "+50", font=f_huge, fill=(1, 90, 255), anchor="rm")
    draw.text((580, 145), "entreprises et artisans", font=f_sub, fill=(18, 24, 38))
    draw.text((580, 195), "nous font déjà confiance.", font=f_sub, fill=(18, 24, 38))

    # 5 Gold vector stars
    for s in range(5):
        draw_star(draw, 595 + s * 30, 250, r_out=12, r_in=5, fill=(255, 185, 30))
    draw.text((755, 250), "Clients 100% satisfaits", font=get_font(FONT_ROUNDED, 24), fill=(255, 185, 30), anchor="lm")

    cards = [
        ("Maison Lumière", "Architecture & Rénovation", "pf-01-maison-lumiere.jpg"),
        ("Villa Azur", "Hôtellerie Prestige", "pf-02-villa-azur.jpg"),
        ("Cabinet Mercier", "Droit & Conseil", "pf-04-cabinet-mercier.jpg"),
        ("Élan Studio", "Fitness & Bien-être", "pf-05-elan-studio.jpg"),
    ]
    for i, (title, cat, fn) in enumerate(cards):
        cx = 100 + i * 440
        cy, cw, ch = 330, 400, 290
        draw_shadow_box(canvas, [cx, cy, cx + cw, cy + ch], radius=20, shadow_blur=20, shadow_color=(1, 90, 255, 30))
        draw = ImageDraw.Draw(canvas)
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=20, fill=(255, 255, 255), outline=(225, 230, 245), width=1)
        path = os.path.join("src/assets", fn)
        if os.path.exists(path):
            img = Image.open(path).convert("RGBA")
            img = img.resize((cw - 4, 180), Image.Resampling.LANCZOS)
            canvas.paste(img, (cx + 2, cy + 2))
        draw = ImageDraw.Draw(canvas)
        draw.text((cx + 20, cy + 215), title, font=get_font(FONT_ROUNDED, 22), fill=(18, 24, 38))
        draw.text((cx + 20, cy + 248), cat, font=get_font(FONT_REGULAR, 16), fill=(100, 110, 125))

    ty = 740
    draw.text((960, ty - 40), "MÉTHODE SIMPLE & LIVRAISON GARANTIE EN 5 JOURS", font=get_font(FONT_BOLD, 20), fill=(1, 90, 255), anchor="mm")
    draw.line([(300, ty + 40), (1620, ty + 40)], fill=(1, 90, 255), width=4)

    steps = [
        ("1", "Appel 15 min", "Sans engagement", 360, "J1"),
        ("2", "Maquette offerte", "Pensée pour ton métier", 760, "J2-J3"),
        ("3", "Tu valides", "Ajustements sur mesure", 1160, "J4"),
        ("4", "En ligne !", "Ton système tourne 24/7", 1560, "J5"),
    ]
    for num, title, desc, sx, day in steps:
        draw.ellipse([sx - 28, ty + 12, sx + 28, ty + 68], fill=(1, 90, 255))
        draw.text((sx, ty + 40), num, font=get_font(FONT_ROUNDED, 24), fill=(255, 255, 255), anchor="mm")
        draw.text((sx, ty + 95), title, font=get_font(FONT_ROUNDED, 22), fill=(18, 24, 38), anchor="mm")
        draw.text((sx, ty + 125), desc, font=get_font(FONT_REGULAR, 16), fill=(100, 110, 125), anchor="mm")
        # Solid day pill with high contrast white text
        draw.rounded_rectangle([sx - 48, ty + 155, sx + 48, ty + 195], radius=12, fill=(1, 90, 255))
        draw.text((sx, ty + 175), day, font=get_font(FONT_BOLD, 18), fill=(255, 255, 255), anchor="mm")

    return canvas

def build_scene_11_cta_whatsapp():
    canvas = create_base_canvas("blue")
    draw = ImageDraw.Draw(canvas)

    f_huge = get_font(FONT_ROUNDED, 62)
    f_sub = get_font(FONT_ROUNDED, 28)

    lx = 140
    draw.text((lx, 300), "Ne laisse plus tes concurrents", font=f_huge, fill=(255, 255, 255))
    draw.text((lx, 380), "te voler tes clients.", font=f_huge, fill=(255, 255, 255))
    draw.text((lx, 470), "Échange direct avec un stratège dédié | Sans engagement", font=f_sub, fill=(220, 235, 255))

    draw_shadow_box(canvas, [lx, 560, lx + 740, 670], radius=28, shadow_blur=35, shadow_color=(0, 0, 0, 140))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([lx, 560, lx + 740, 670], radius=28, fill=(255, 255, 255))
    
    # Down arrow symbol
    draw.polygon([(lx + 60, 625), (lx + 70, 610), (lx + 50, 610)], fill=(1, 90, 255))
    draw.text((lx + 400, 615), "CLIQUE SUR LE BOUTON SOUS LA VIDÉO", font=get_font(FONT_ROUNDED, 26), fill=(1, 90, 255), anchor="mm")

    px, py, pw, ph = 1200, 160, 440, 800
    draw_phone_frame(canvas, px, py, pw, ph, bg_color=(240, 235, 225))
    draw = ImageDraw.Draw(canvas)

    draw.rectangle([px + 6, py + 48, px + pw - 6, py + 120], fill=(7, 94, 84))
    draw.text((px + 40, py + 84), "←", font=get_font(FONT_BOLD, 24), fill=(255, 255, 255), anchor="mm")
    draw.ellipse([px + 65, py + 64, px + 105, py + 104], fill=(208, 166, 110))
    draw.text((px + 85, py + 84), "XR", font=get_font(FONT_BOLD, 16), fill=(0, 0, 0), anchor="mm")
    draw.text((px + 120, py + 74), "XR Agency", font=get_font(FONT_ROUNDED, 20), fill=(255, 255, 255))
    draw.text((px + 120, py + 96), "en ligne | +33 7 67 56 67 83", font=get_font(FONT_REGULAR, 14), fill=(200, 230, 220))

    bx1, by1 = px + 60, py + 160
    bx2, by2 = px + pw - 30, py + 260
    draw.rounded_rectangle([bx1, by1, bx2, by2], radius=16, fill=(220, 248, 198))
    draw.text((bx1 + 20, by1 + 30), "Bonjour ! Je veux ma maquette", font=get_font(FONT_ROUNDED, 18), fill=(18, 24, 38))
    draw.text((bx1 + 20, by1 + 60), "offerte et mon audit Google Maps.", font=get_font(FONT_ROUNDED, 18), fill=(18, 24, 38))
    draw.text((bx2 - 70, by2 - 20), "10:24", font=get_font(FONT_REGULAR, 12), fill=(120, 150, 130))

    draw.rounded_rectangle([px + 20, py + ph - 80, px + pw - 80, py + ph - 25], radius=22, fill=(255, 255, 255))
    draw.text((px + 40, py + ph - 52), "Écrire un message...", font=get_font(FONT_REGULAR, 16), fill=(140, 150, 160), anchor="lm")
    draw.ellipse([px + pw - 65, py + ph - 75, px + pw - 25, py + ph - 35], fill=(7, 94, 84))
    draw.polygon([(px + pw - 48, py + ph - 63), (px + pw - 38, py + ph - 55), (px + pw - 48, py + ph - 47)], fill=(255, 255, 255))

    return canvas

# ----------------- MAIN PIPELINE ----------------- #

BUILDERS = [
    build_scene_01_hook,
    build_scene_02_google_search,
    build_scene_03_competitor_call,
    build_scene_04_ugly_site,
    build_scene_05_xr_solution,
    build_scene_06_web_couture,
    build_scene_07_maps_domination,
    build_scene_08_social_branding,
    build_scene_09_seo_care_robots,
    build_scene_10_social_proof,
    build_scene_11_cta_whatsapp,
]

def main():
    print("==================================================")
    print("XR AGENCY | RENDERING FLAWLESS MASTER VSL (1080p)")
    print("==================================================")

    temp_dir = tempfile.mkdtemp()
    print(f"Working directory: {temp_dir}")

    # Generate Poster first
    print("Generating official high-converting VSL Poster...")
    poster_canvas = build_scene_01_hook()
    poster_canvas.convert("RGB").save(OUTPUT_POSTER, quality=95)
    print(f"Poster saved to: {OUTPUT_POSTER}")

    segment_files = []
    fps = 30

    for idx, (sc_info, builder) in enumerate(zip(SCENES, BUILDERS)):
        dur = sc_info["dur"]
        name = sc_info["name"]
        print(f"Rendering Scene {idx+1:02d}/11: {name} ({dur}s)...")

        canvas = builder()
        frame_png = os.path.join(temp_dir, f"frame_{idx:02d}.png")
        canvas.save(frame_png, "PNG")

        seg_mp4 = os.path.join(temp_dir, f"seg_{idx:02d}.mp4")

        total_frames = int(dur * fps)
        zoom_expr = "min(zoom+0.0006,1.06)" if idx in [0, 4, 7] else "1.0"
        
        filter_complex = (
            f"[0:v]scale=1920:1080,zoompan=z='{zoom_expr}':d={total_frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps={fps}[v]"
        )

        cmd = [
            FFMPEG, "-y",
            "-loop", "1", "-i", frame_png,
            "-t", str(dur),
            "-filter_complex", filter_complex,
            "-map", "[v]",
            "-c:v", "libx264",
            "-preset", "faster",
            "-pix_fmt", "yuv420p",
            seg_mp4
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode != 0:
            print(f"Error rendering scene {idx}: {res.stderr.decode('utf-8', errors='ignore')}")
            return
        segment_files.append(seg_mp4)

    concat_txt = os.path.join(temp_dir, "concat.txt")
    with open(concat_txt, "w") as f:
        for seg in segment_files:
            f.write(f"file '{seg}'\n")

    video_only = os.path.join(temp_dir, "video_merged.mp4")
    print("Concatenating 11 scenes into seamless master track...")
    subprocess.run([
        FFMPEG, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_txt,
        "-c", "copy",
        video_only
    ], check=True)

    print("Mastering final audio mix (Vivienne Neural 48kHz + Ambient Tech Bed)...")
    audio_mix = (
        "[1:a]volume=1.08[vo];"
        "[2:a]volume=0.12,afade=t=in:st=0:d=1.5,afade=t=out:st=88.0:d=3.0[bgm];"
        "[vo][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]"
    )

    subprocess.run([
        FFMPEG, "-y",
        "-i", video_only,
        "-i", VOICEOVER,
        "-i", MUSIC,
        "-filter_complex", audio_mix,
        "-map", "0:v",
        "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        OUTPUT_VIDEO
    ], check=True)

    sz = os.path.getsize(OUTPUT_VIDEO)
    print(f"✅ MASTER VSL VIDEO GENERATED: {OUTPUT_VIDEO} ({sz / (1024*1024):.2f} MB)")

if __name__ == "__main__":
    main()
