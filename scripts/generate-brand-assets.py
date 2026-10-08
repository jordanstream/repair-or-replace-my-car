from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "brand" / "cso-logo-primary.png"
MARK_OUTPUT = ROOT / "public" / "brand" / "cso-logo-mark.png"
FAVICON_OUTPUT = ROOT / "app" / "icon.png"
APPLE_ICON_OUTPUT = ROOT / "app" / "apple-icon.png"
FONT = ROOT / "public" / "fonts" / "Archivo-Bold.ttf"

INK = "#16201D"
CANVAS = "#F4F6F3"
BRAND = "#C94724"


def draw_tight_text(draw, position, text, font, fill, tracking):
    x, y = position
    for letter in text:
        draw.text((x, y), letter, font=font, fill=fill, anchor="la")
        x += draw.textlength(letter, font=font) + tracking
    return x


def generate():
    scale = 4
    image = Image.new("RGBA", (1240, 300), (255, 255, 255, 0))
    draw = ImageDraw.Draw(image)
    monogram_font = ImageFont.truetype(str(FONT), 220)
    name_font = ImageFont.truetype(str(FONT), 42)

    monogram_left = 20
    monogram_top = 3
    monogram_right = draw_tight_text(
        draw,
        (monogram_left, monogram_top),
        "CSO",
        monogram_font,
        INK,
        tracking=-29,
    )

    car_center_x = int((monogram_left + monogram_right) / 2) - 4
    car_top = 184
    car = [
        (car_center_x - 46, car_top + 34),
        (car_center_x - 32, car_top + 9),
        (car_center_x - 20, car_top - 8),
        (car_center_x + 20, car_top - 8),
        (car_center_x + 32, car_top + 9),
        (car_center_x + 46, car_top + 34),
        (car_center_x + 46, car_top + 68),
        (car_center_x + 32, car_top + 68),
        (car_center_x + 32, car_top + 57),
        (car_center_x - 32, car_top + 57),
        (car_center_x - 32, car_top + 68),
        (car_center_x - 46, car_top + 68),
    ]
    draw.polygon(car, fill=BRAND)
    draw.line(car + [car[0]], fill=CANVAS, width=9, joint="curve")
    draw.polygon(
        [
            (car_center_x - 22, car_top + 24),
            (car_center_x - 12, car_top + 3),
            (car_center_x + 12, car_top + 3),
            (car_center_x + 22, car_top + 24),
        ],
        fill=INK,
    )
    draw.ellipse(
        (car_center_x - 29, car_top + 32, car_center_x - 17, car_top + 44),
        fill=CANVAS,
    )
    draw.ellipse(
        (car_center_x + 17, car_top + 32, car_center_x + 29, car_top + 44),
        fill=CANVAS,
    )
    draw.rounded_rectangle(
        (car_center_x - 10, car_top + 34, car_center_x + 10, car_top + 40),
        radius=3,
        fill=CANVAS,
    )

    separator_x = int(monogram_right + 40)
    draw.line((separator_x, 57, separator_x, 229), fill="#89958F", width=3)
    name_x = separator_x + 30
    draw.text((name_x, 77), "CAR SECOND", font=name_font, fill=INK)
    draw.text((name_x, 127), "OPINION", font=name_font, fill=INK)

    bounds = image.getbbox()
    if bounds is None:
        raise RuntimeError("Logo rendering produced an empty image.")
    crop_left = bounds[0] - 10
    crop_top = bounds[1] - 10
    cropped = image.crop((crop_left, crop_top, bounds[2] + 10, bounds[3] + 10))
    mark_right = separator_x - 15 - crop_left
    mark = cropped.crop((0, 0, mark_right, cropped.height))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(OUTPUT, format="PNG", optimize=True, dpi=(300, 300))
    mark.save(MARK_OUTPUT, format="PNG", optimize=True, dpi=(300, 300))

    def save_square_icon(path, size):
        icon = Image.new("RGBA", (size, size), (255, 255, 255, 0))
        inset = round(size * 0.055)
        available_width = size - (inset * 2)
        available_height = round(size * 0.58)
        contained = mark.copy()
        contained.thumbnail((available_width, available_height), Image.Resampling.LANCZOS)
        icon.alpha_composite(
            contained,
            ((size - contained.width) // 2, (size - contained.height) // 2),
        )
        icon.save(path, format="PNG", optimize=True, dpi=(96, 96))

    save_square_icon(FAVICON_OUTPUT, 512)
    save_square_icon(APPLE_ICON_OUTPUT, 180)

    print(OUTPUT)
    print(cropped.size)
    print(MARK_OUTPUT)
    print(mark.size)
    print(FAVICON_OUTPUT)
    print(APPLE_ICON_OUTPUT)


if __name__ == "__main__":
    generate()
