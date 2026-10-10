from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\ASG\.gemini\antigravity-ide\brain\9cac9b87-0144-4ea6-b1d1-6752d2778e60\.user_uploaded\media_1789378668541.png").convert("RGB")
arr = np.array(img)

# Find black box (dark pixels)
# Let's look for rows where the median or mean color is very dark, or there's a wide segment of dark pixels.
# The image is 1024x954. The black box is likely in the lower half (y > 450).
dark_mask = (arr[:, :, 0] < 50) & (arr[:, :, 1] < 50) & (arr[:, :, 2] < 50)

# Sum of dark pixels per row
dark_pixels_per_row = np.sum(dark_mask, axis=1)

# Find rows with significant dark pixels (e.g. > 200 pixels wide)
black_box_rows = np.where(dark_pixels_per_row > 200)[0]
if len(black_box_rows) > 0:
    bb_y_min = np.min(black_box_rows)
    bb_y_max = np.max(black_box_rows)
    
    # Find columns for these rows
    bb_mask = dark_mask[bb_y_min:bb_y_max+1, :]
    dark_pixels_per_col = np.sum(bb_mask, axis=0)
    black_box_cols = np.where(dark_pixels_per_col > (bb_y_max - bb_y_min) * 0.5)[0]
    bb_x_min = np.min(black_box_cols)
    bb_x_max = np.max(black_box_cols)
    print(f"Black box coords: x={bb_x_min}-{bb_x_max}, y={bb_y_min}-{bb_y_max}")
else:
    print("Could not find black box.")

# Find product image (non-white pixels between logo and black box)
# Logo is probably top (y < 300)
# Product is probably y between 300 and bb_y_min.
# Non-white:
non_white = (arr[:, :, 0] < 240) | (arr[:, :, 1] < 240) | (arr[:, :, 2] < 240)
prod_mask = non_white[250:bb_y_min-20, :]

non_white_rows = np.sum(prod_mask, axis=1)
p_rows = np.where(non_white_rows > 10)[0]
if len(p_rows) > 0:
    p_y_min = np.min(p_rows) + 250
    p_y_max = np.max(p_rows) + 250
    
    p_mask2 = non_white[p_y_min:p_y_max+1, :]
    non_white_cols = np.sum(p_mask2, axis=0)
    p_cols = np.where(non_white_cols > 10)[0]
    p_x_min = np.min(p_cols)
    p_x_max = np.max(p_cols)
    print(f"Product coords: x={p_x_min}-{p_x_max}, y={p_y_min}-{p_y_max}")
else:
    print("Could not find product.")
