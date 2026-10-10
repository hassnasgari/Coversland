import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display

def shape_text(text):
    return get_display(arabic_reshaper.reshape(text))

# Define the mild background color for the entire label and A4 sheet
BG_COLOR = (235, 240, 245) # A very soft, elegant medical gray-blue

def create_single_label():
    # Use the clean logo without the artifact
    logo = Image.open('extracted_layers/logo_clean_no_artifact.png')
    
    # Use the clean product without the extra logo text attached to it
    prod = Image.open('extracted_layers/prod_clean_no_artifact.png')
    
    enhancer = ImageEnhance.Sharpness(prod)
    prod_sharp = enhancer.enhance(2.2)
    enhancer_c = ImageEnhance.Contrast(prod_sharp)
    prod_sharp = enhancer_c.enhance(1.2) # Reverted contrast back to 1.2
    
    W, H = 1240, 1169
    
    im3 = Image.new('RGB', (W, H), BG_COLOR)
    draw3 = ImageDraw.Draw(im3)
    
    # Outer clean border
    draw3.rounded_rectangle([(16, 16), (W-16, H-16)], radius=24, outline=(15, 23, 42), width=4)
    
    # Top Bar Header
    header_bottom = 175
    # Keep the header white so it contrasts with the mild background, or use a slightly different color?
    # Actually the header was (241, 245, 249). With our BG_COLOR (235, 240, 245), a white header (255, 255, 255) looks very crisp.
    draw3.rounded_rectangle([(24, 24), (W-24, header_bottom)], radius=18, fill=(255, 255, 255))
    logo_w = 420
    logo_h = int(logo.height * (logo_w / logo.width))
    logo_resized = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    im3.paste(logo_resized, ((W - logo_w) // 2, 35), logo_resized)
    
    # Badge 1 (Black Box)
    badge1_top = 715
    badge1_box = [(40, badge1_top), (W - 40, 845)]
    draw3.rounded_rectangle(badge1_box, radius=20, fill=(15, 23, 42))
    
    # Product Image - properly sized (NO SHADOW)
    prod_w = 660
    prod_h = int(prod_sharp.height * (prod_w / prod_sharp.width))
    prod_resized = prod_sharp.resize((prod_w, prod_h), Image.Resampling.LANCZOS)
    
    empty_space_height = badge1_top - header_bottom
    y_center = header_bottom + (empty_space_height - prod_h) // 2
    
    # Paste perfectly centered product image (directly on the mild background, white pops natively)
    im3.paste(prod_resized, ((W - prod_w) // 2, y_center), prod_resized)
    
    font_text = ImageFont.truetype('C:/Windows/Fonts/Vazirmatn-Black.ttf', 70)
    font_numbers = ImageFont.truetype('C:/Windows/Fonts/Vazirmatn-Black.ttf', 96)
    
    visual_parts_ltr = [
         (" تایی روکش ", (255, 255, 255), font_text),
         ("۵۰", (255, 50, 50), font_numbers),
         (" بسته ", (255, 255, 255), font_text),
         ("۲۵۰", (255, 50, 50), font_numbers)
    ]
    
    total_w = 0
    widths = []
    for part, color, font in visual_parts_ltr:
        t = shape_text(part)
        w = draw3.textlength(t, font=font)
        widths.append(w)
        total_w += w
        
    current_x = (W - total_w) // 2
    box_center_y = 715 + 130 // 2 - 8 # Optically center in the box
    
    for i, (part, color, font) in enumerate(visual_parts_ltr):
        t = shape_text(part)
        draw3.text((current_x, box_center_y), t, font=font, fill=color, anchor="lm")
        current_x += widths[i]
    
    # Badge 2
    badge2_box = [(40, 865), (W - 40, 975)]
    draw3.rounded_rectangle(badge2_box, radius=20, fill=(2, 132, 199))
    font_b2 = ImageFont.truetype('C:/Windows/Fonts/Vazirmatn-Bold.ttf', 54)
    t2 = shape_text('روکش پوآر و ساکشن (هر بسته ۵۰ عدد)')
    bbox2 = draw3.textbbox((0, 0), t2, font=font_b2)
    draw3.text(((W - (bbox2[2] - bbox2[0])) // 2, 865 + (110 - (bbox2[3] - bbox2[1])) // 2 - 10), t2, font=font_b2, fill=(255, 255, 255))
    
    # Subtitle English
    font_en = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 38)
    t_en = '250 Packs • Syringe & Suction Sleeves (50 Pcs/Pack)'
    bbox_en = draw3.textbbox((0, 0), t_en, font=font_en)
    draw3.text(((W - (bbox_en[2] - bbox_en[0])) // 2, 1010), t_en, font=font_en, fill=(15, 23, 42))
    
    # Bottom row
    font_foot = ImageFont.truetype('C:/Windows/Fonts/Vazirmatn-Bold.ttf', 30)
    t_foot = shape_text('یکبار مصرف دندانپزشکی  •  Medical Disposable')
    bbox_foot = draw3.textbbox((0, 0), t_foot, font=font_foot)
    draw3.text(((W - (bbox_foot[2] - bbox_foot[0])) // 2, 1085), t_foot, font=font_foot, fill=(71, 85, 105))
    
    im3.save('تک_جدید_بدون_زائده.png', dpi=(300, 300))
    return im3

def create_layout(img):
    output_png = 'شیت_نهایی_اصلاح_شده.png'
    output_pdf = 'شیت_نهایی_اصلاح_شده.pdf'

    a4_w, a4_h = 2480, 3508
    canvas = Image.new('RGB', (a4_w, a4_h), BG_COLOR)

    cols, rows = 2, 3
    cell_w = a4_w // cols
    cell_h = a4_h // rows

    for i in range(rows):
        for j in range(cols):
            x = j * cell_w
            y = i * cell_h
            canvas.paste(img, (x, y))

    draw = ImageDraw.Draw(canvas)
    line_color = "gray"
    line_width = 3

    draw.line([(cell_w, 0), (cell_w, a4_h)], fill=line_color, width=line_width)
    draw.line([(0, cell_h), (a4_w, cell_h)], fill=line_color, width=line_width)
    draw.line([(0, cell_h*2), (a4_w, cell_h*2)], fill=line_color, width=line_width)

    canvas.save(output_png)
    canvas.save(output_pdf, "PDF", resolution=300.0)
    print("Done")

if __name__ == "__main__":
    label_img = create_single_label()
    create_layout(label_img)
