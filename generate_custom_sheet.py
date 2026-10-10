# -*- coding: utf-8 -*-
"""
اسکریپت تولید شیت چاپ برچسب A4 (۶ عددی)
این اسکریپت به شما اجازه می‌دهد فواصل حاشیه و بین برچسب‌ها را به دلخواه بر اساس نوع کاغذ برچسب خود تنظیم کنید.
"""

from PIL import Image, ImageDraw

def create_a4_sheet(label_image_path, output_pdf_path, output_png_path,
                    margin_x=50, margin_y=60, col_gap=30, row_gap=25):
    # اندازه برگه A4 در رزولوشن 300DPI
    A4_WIDTH = 2480
    A4_HEIGHT = 3508

    label = Image.open(label_image_path)
    
    # محاسبه اندازه بهینه هر برچسب متناسب با فواصل تعیین‌شده
    cols = 2
    rows = 3
    
    avail_w = A4_WIDTH - (2 * margin_x) - ((cols - 1) * col_gap)
    avail_h = A4_HEIGHT - (2 * margin_y) - ((rows - 1) * row_gap)
    
    label_w = avail_w // cols
    label_h = avail_h // rows
    
    label_resized = label.resize((label_w, label_h), Image.Resampling.LANCZOS)
    
    a4 = Image.new('RGB', (A4_WIDTH, A4_HEIGHT), (255, 255, 255))
    draw = ImageDraw.Draw(a4)
    
    for r in range(rows):
        for c in range(cols):
            x = margin_x + c * (label_w + col_gap)
            y = margin_y + r * (label_h + row_gap)
            a4.paste(label_resized, (x, y))
            # خط راهنمای برش ظریف
            draw.rectangle([(x-1, y-1), (x + label_w + 1, y + label_h + 1)], outline=(210, 215, 220), width=1)
            
    a4.save(output_png_path, dpi=(300, 300))
    a4.save(output_pdf_path, 'PDF', resolution=300.0)
    print(f"فایل با موفقیت در {output_pdf_path} ذخیره شد.")

if __name__ == '__main__':
    create_a4_sheet(
        label_image_path='نمونه_۲_برچسب_مدرن.png',
        output_pdf_path='شیت_اختصاصی_A4.pdf',
        output_png_path='شیت_اختصاصی_A4.png'
    )
