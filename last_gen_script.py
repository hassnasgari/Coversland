python -c "
import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import arabic_reshaper
from bidi.algorithm import get_display

logo = Image.open('extracted_layers/logo_transp.png')
prod = Image.open('extracted_layers/prod_transp.png')

enhancer = ImageEnhance.Sharpness(prod)
prod_sharp = enhancer.enhance(2.2)
enhancer_c = ImageEnhance.Contrast(prod_sharp)
prod_sharp = enhancer_c.enhance(1.2)

W, H = 1180, 1100

def shape_text(text):
    return get_display(arabic_reshaper.reshape(text))

# ----------------- SAMPLE 2: Modern Premium Medical Layout -----------------
im2 = Image.new('RGB', (W, H), (255, 255, 255))
draw2 = ImageDraw.Draw(im2)

# Outer card with solid clean frame
draw2.rounded_rectangle([(16, 16), (W-16, H-16)], radius=20, fill=(255, 255, 255), outline=(14, 165, 233), width=4)

# Top Bar Header (Soft Medical Blue)
draw2.rounded_rectangle([(20, 20), (W-20, 180)], radius=18, fill=(240, 249, 255))
# Flatten bottom corners of header
draw2.rectangle([(20, 150), (W-20, 180)], fill=(240, 249, 255))
draw2.line([(20, 180), (W-20, 180)], fill=(186, 230, 253), width=2)

# Logo inside header
logo_w = 380
logo_h = int(logo.height * (logo_w / logo.width))
logo_resized = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
im2.paste(logo_resized, ((W - logo_w) // 2, 40), logo_resized)

# Product photo in the center - large & sharp
prod_w = 600
prod_h = int(prod_sharp.height * (prod_w / prod_sharp.width))
prod_resized = prod_sharp.resize((prod_w, prod_h), Image.Resampling.LANCZOS)
im2.paste(prod_resized, ((W - prod_w) // 2, 210), prod_resized)

# Pill Badge 1: 250 بسته ۵۰ تایی روکش (Solid vibrant cyan with white text)
badge1_box = [(70, 680), (W - 70, 790)]
draw2.rounded_rectangle(badge1_box, radius=24, fill=(2, 132, 199))
font_b1 = ImageFont.truetype('C:/Windows/Fonts/Vazirmatn-Black.ttf', 52)
t1 = shape_text('۲۵۰ بسته ۵۰ تایی روکش')
bbox1 = draw2.textbbox((0, 0), t1, font=font_b1)
tw1 = bbox1[2] - bbox1[0]
th1 = bbox1[3] - bbox1[1]
draw2.text(((W - tw1) // 2, 680 + (110 - th1) // 2 - 8), t1, font=font_b1, fill=(255, 255, 255))

# Pill Badge 2: روکش پوآر و ساکشن (هر بسته ۵۰ عدد) (Solid emerald green)
badge2_box = [(70, 810), (W - 70, 915)]
draw2.rounded_rectangle(badge2_box, radius=24, fill=(5, 150, 105))
font_b2 = ImageFont.truetype('C:/Windows/Fonts/Vazirmatn-Bold.ttf', 44)
t2 = shape_text('روکش پوآر و ساکشن (هر بسته ۵۰ عدد)')
bbox2 = draw2.textbbox((0, 0), t2, font=font_b2)
tw2 = bbox2[2] - bbox2[0]
th2 = bbox2[3] - bbox2[1]
draw2.text(((W - tw2) // 2, 810 + (105 - th2) // 2 - 6), t2, font=font_b2, fill=(255, 255, 255))

# English subtitle
font_en = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 30)
t_en = '250 Packs • Syringe & Suction Sleeves (50 Pcs/Pack)'
bbox_en = draw2.textbbox((0, 0), t_en, font=font_en)
draw2.text(((W - (bbox_en[2] - bbox_en[0])) // 2, 940), t_en, font=font_en, fill=(30, 41, 59))

# Bottom strip
draw2.line([(100, 990), (W-100, 990)], fill=(226, 232, 240), width=2)
font_foot = ImageFont.truetype('C:/Windows/Fonts/Vazirmatn-Bold.ttf', 24)
t_foot = shape_text('یکبار مصرف دندانپزشکی  |  Medical Disposable')
bbox_foot = draw2.textbbox((0, 0), t_foot, font=font_foot)
draw2.text(((W - (bbox_foot[2] - bbox_foot[0])) // 2, 1015), t_foot, font=font_foot, fill=(71, 85, 105))

im2.save('نمونه_۲_برچسب_مدرن.png', dpi=(300, 300))
print('Sample 2 created!')

# ----------------- A4 6-UP PRINT SHEET CREATION -----------------
# A4 at 300 DPI: 2480 x 3508 pixels
a4_w, a4_h = 2480, 3508
a4_sheet = Image.new('RGB', (a4_w, a4_h), (255, 255, 255))
draw_a4 = ImageDraw.Draw(a4_sheet)

# 2 columns x 3 rows
# Margin left/right = 40 px, gap between cols = 40 px -> 2 * 1180 + 120 = 2480 px (exact fit!)
# Margin top/bottom = 74 px, gap between rows = 30 px -> 3 * 1100 + 148 + 60 = 3508 px (exact fit!)
cols = 2
rows = 3
col_gap = 40
row_gap = 30
margin_x = (a4_w - (cols * W + (cols - 1) * col_gap)) // 2
margin_y = (a4_h - (rows * H + (rows - 1) * row_gap)) // 2

for r in range(rows):
    for c in range(cols):
        x = margin_x + c * (W + col_gap)
        y = margin_y + r * (H + row_gap)
        a4_sheet.paste(im2, (x, y))
        # Draw light cutting guidelines around labels
        draw_a4.rectangle([(x-2, y-2), (x + W + 2, y + H + 2)], outline=(203, 213, 225), width=1)

a4_sheet.save('شیت_چاپ_A4_شش_تایی.png', dpi=(300, 300))
# Also save as PDF for direct standard printing!
a4_sheet.save('شیت_چاپ_A4_شش_تایی.pdf', 'PDF', resolution=300.0)
print('A4 Sheet PNG and PDF generated!')
"