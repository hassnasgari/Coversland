from PIL import Image
import numpy as np

# Load the clean original mockup
im_orig = Image.open('orig_mockup/mockup_packaging_coversland.jpg').convert('RGB')
w, h = im_orig.size
arr = np.array(im_orig)

# The watermark sticker was at x: 905 to 958, y: 708 to 779
# In im_orig, column x = 895 to 900 is 100% clean and pristine!
# Corner vertical line is at x_corner = 930
x_corner = 930

# 1. Front face: from x = 904 to x_corner - 1 (x = 904..929)
# Copy smoothly from the pristine column x = 900 (which has clean front, shadow, and table)
for x in range(904, x_corner):
    # From y = 700 all the way to bottom of crop y = 820:
    for y in range(700, 820):
        # sample from pristine x = 900
        arr[y, x] = arr[y, 900]

# 2. Side face: from x = x_corner to 959
# In im_orig, column x = 960 is the boundary of the sticker.
# Let's inspect column x = 960 in im_orig:
# Below y = 760, x = 960 has the contact shadow (y=770..776) and table (y>=777).
# For y = 708 to 765, the side face between x=930 and x=955 is clean shaded card.
# Shaded card color in im_orig at y=710, x=960 is [162, 158, 149].
# At y=740, x=960 is [157, 149, 146].
# At y=755, x=960 is [153, 144, 135].

for x in range(x_corner, 960):
    # Linear perspective line from y=777 at x_corner to y=770 at x=960
    # slope = (770 - 777) / (960 - 930) = -7 / 30 = -0.233
    y_bot = int(round(777 - 0.233 * (x - x_corner)))
    
    # Side face card stock
    for y in range(708, y_bot):
        # vertical gradient
        frac = (y - 708) / max(1, (y_bot - 708))
        r = int(162 * (1 - frac) + 153 * frac)
        g = int(158 * (1 - frac) + 144 * frac)
        b = int(149 * (1 - frac) + 135 * frac)
        # Also check if x >= 952 and there's emblem edge:
        # keep emblem natural transition if x >= 956
        arr[y, x] = [r, g, b]
        
    # Contact shadow (2px)
    arr[y_bot, x] = [98, 80, 60]
    arr[y_bot + 1, x] = [105, 85, 65]
    
    # Table below contact shadow
    for y in range(y_bot + 2, 820):
        # Table wood runs horizontally: sample from x = 960 (which is clean table in im_orig)
        arr[y, x] = arr[y, 960]

im_fixed = Image.fromarray(arr)

# 3. Also apply the clean pouch text and clean box logo
# CL logo on box
clean_mark = Image.open('coversland_mark_highres.png').convert('RGBA')
mark_w = 115
mark_h = int(clean_mark.height * (mark_w / clean_mark.width))
mark_resized = clean_mark.resize((mark_w, mark_h), Image.Resampling.LANCZOS)

# Clean out the cut logo on the box
box_bg = im_fixed.crop((550, 350, 580, 440)).resize((160, 90))
im_fixed.paste(box_bg, (620, 350))
im_fixed.paste(mark_resized, (642, 356), mark_resized)

# Clean pouch
pouch_clean_bg = im_fixed.crop((190, 530, 240, 640)).resize((260, 110))
im_fixed.paste(pouch_clean_bg, (250, 530))

pouch_mark_w = 78
pouch_mark_h = int(clean_mark.height * (pouch_mark_w / clean_mark.width))
pouch_mark_resized = clean_mark.resize((pouch_mark_w, pouch_mark_h), Image.Resampling.LANCZOS)
im_fixed.paste(pouch_mark_resized, (290, 535), pouch_mark_resized)

from PIL import ImageDraw, ImageFont
font_pouch = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 32)
draw = ImageDraw.Draw(im_fixed)
draw.text((260, 595), 'CoversLand', font=font_pouch, fill=(10, 42, 80))

font_sub = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 16)
draw.text((265, 632), 'Disposable Cover Pouch', font=font_sub, fill=(13, 148, 136))

# Crop corner to inspect
im_fixed.crop((850, 650, 980, 820)).save('corner_repaired_flawless.png')

# Save main mockup
im_fixed.save('mockup_packaging_coversland.jpg', quality=95)
print('Successfully rebuilt mockup_packaging_coversland.jpg from clean source!')
