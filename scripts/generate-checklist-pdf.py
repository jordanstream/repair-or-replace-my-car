from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "downloads" / "major-car-repair-decision-checklist.txt"
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_OUTPUT = ROOT / "public" / "downloads" / "major-car-repair-decision-checklist.pdf"
ARCHIVO_REGULAR = ROOT / "public" / "fonts" / "Archivo-Regular.ttf"
ARCHIVO_BOLD = ROOT / "public" / "fonts" / "Archivo-Bold.ttf"
LOGO_ASSET = ROOT / "public" / "brand" / "cso-logo-primary.png"

INK = colors.HexColor("#16201D")
INK_2 = colors.HexColor("#33413B")
MUTED = colors.HexColor("#58645E")
CANVAS = colors.HexColor("#F4F6F3")
LINE = colors.HexColor("#C7CEC9")
BRAND = colors.HexColor("#C94724")
BRAND_SOFT = colors.HexColor("#F8D8CC")
DANGER = colors.HexColor("#A32525")
DANGER_SOFT = colors.HexColor("#F6DADA")


class ChecklistLine(Flowable):
    def __init__(self, text: str, style: ParagraphStyle):
        super().__init__()
        self.paragraph = Paragraph(text, style)
        self.box = 8
        self.gap = 8
        self.height = 0

    def wrap(self, available_width, available_height):
        width = available_width - self.box - self.gap
        _, paragraph_height = self.paragraph.wrap(width, available_height)
        self.height = max(self.box, paragraph_height) + 5
        return available_width, self.height

    def draw(self):
        box_y = self.height - self.box - 2
        self.canv.setStrokeColor(INK_2)
        self.canv.setLineWidth(0.85)
        self.canv.rect(0, box_y, self.box, self.box, fill=0, stroke=1)
        self.paragraph.drawOn(self.canv, self.box + self.gap, self.height - self.paragraph.height - 1)


class WriteLine(Flowable):
    def __init__(self, label: str = "", height: float = 24):
        super().__init__()
        self.label = label
        self.height = height

    def wrap(self, available_width, available_height):
        self.width = available_width
        return available_width, self.height

    def draw(self):
        if self.label:
            self.canv.setFont("Archivo-Bold", 9)
            self.canv.setFillColor(INK_2)
            self.canv.drawString(0, self.height - 10, self.label)
            line_y = 3
        else:
            line_y = self.height / 2
        self.canv.setStrokeColor(LINE)
        self.canv.setLineWidth(0.8)
        self.canv.line(0, line_y, self.width, line_y)


class SectionRule(Flowable):
    def __init__(self):
        super().__init__()
        self.height = 9

    def wrap(self, available_width, available_height):
        self.width = available_width
        return available_width, self.height

    def draw(self):
        self.canv.setStrokeColor(LINE)
        self.canv.setLineWidth(0.8)
        self.canv.line(0, self.height / 2, self.width, self.height / 2)


def draw_brand(canvas, x, y):
    logo = ImageReader(str(LOGO_ASSET))
    source_width, source_height = logo.getSize()
    target_height = 27
    target_width = target_height * source_width / source_height
    canvas.drawImage(
        logo,
        x,
        y - 4,
        width=target_width,
        height=target_height,
        preserveAspectRatio=True,
        mask="auto",
    )


def page_chrome(canvas, doc):
    width, height = letter
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    draw_brand(canvas, doc.leftMargin, height - 38)
    canvas.setStrokeColor(BRAND)
    canvas.setLineWidth(3)
    canvas.line(doc.leftMargin, height - 48, width - doc.rightMargin, height - 48)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.line(doc.leftMargin, 34, width - doc.rightMargin, 34)
    canvas.setFillColor(MUTED)
    canvas.setFont("Archivo", 7.2)
    canvas.drawString(
        doc.leftMargin,
        22,
        "Educational worksheet only. Use qualified professionals for mechanical, safety, financial, insurance, or purchasing advice.",
    )
    canvas.drawRightString(width - doc.rightMargin, 22, f"{doc.page}")
    canvas.restoreState()


def parse_sections(text: str):
    lines = [line.rstrip() for line in text.splitlines()]
    sections = []
    current = None
    for line in lines[5:]:
        stripped = line.strip()
        if not stripped:
            if current is not None:
                current["items"].append("")
            continue
        if stripped[:1].isdigit() and ". " in stripped[:4]:
            current = {"title": stripped, "items": []}
            sections.append(current)
        elif current is not None:
            current["items"].append(stripped)
    return sections


def build_story():
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Archivo-Bold",
        fontSize=26,
        leading=28,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=9,
    )
    deck = ParagraphStyle(
        "Deck",
        parent=styles["BodyText"],
        fontName="Archivo",
        fontSize=10.4,
        leading=15,
        textColor=INK_2,
        spaceAfter=10,
    )
    section = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Archivo-Bold",
        fontSize=15,
        leading=18,
        textColor=INK,
        spaceBefore=3,
        spaceAfter=8,
    )
    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Archivo",
        fontSize=9,
        leading=12,
        textColor=INK_2,
    )
    small = ParagraphStyle(
        "Small",
        parent=body,
        fontSize=8,
        leading=11,
        textColor=MUTED,
    )

    raw = SOURCE.read_text(encoding="utf-8")
    sections = parse_sections(raw)
    story = [
        Spacer(1, 10),
        Paragraph("Major car repair<br/>decision worksheet", title),
        Paragraph(
            "Use this checklist before approving a major car repair, replacing your car, trading it in, or selling it as-is.",
            deck,
        ),
        Paragraph(
            "<b>Keep safety separate from the cost comparison.</b> If the vehicle may be unsafe, ask a qualified professional whether it should be driven before delaying or declining work.",
            ParagraphStyle(
                "Safety",
                parent=body,
                backColor=DANGER_SOFT,
                borderColor=DANGER,
                borderWidth=0.8,
                borderPadding=8,
                borderRadius=4,
                textColor=INK,
                spaceAfter=12,
            ),
        ),
    ]

    page_break_before = {1, 2, 4, 6}
    for index, parsed in enumerate(sections):
        if index in page_break_before:
            story.append(PageBreak())
        elif index > 0:
            story.append(SectionRule())

        title_parts = parsed["title"].split(". ", 1)
        section_heading = KeepTogether(
            [
                Paragraph(
                    f'<font color="#C94724">{title_parts[0].zfill(2)}</font>&nbsp;&nbsp;{title_parts[1]}',
                    section,
                )
            ]
        )
        story.append(section_heading)

        blank_run = 0
        for item in parsed["items"]:
            if not item:
                blank_run += 1
                continue
            if blank_run:
                story.append(Spacer(1, min(blank_run * 4, 10)))
                blank_run = 0
            if item.startswith("[ ] "):
                story.append(ChecklistLine(item[4:], body))
            elif set(item) == {"_"}:
                story.append(WriteLine(height=23))
            elif ":" in item and not item.endswith(":"):
                label, value = item.split(":", 1)
                story.append(WriteLine(f"{label}: {value.strip()}", height=19))
            elif item.endswith(":"):
                story.append(WriteLine(item, height=28))
            else:
                story.append(Paragraph(item, small))
                story.append(Spacer(1, 3))
    return story


def generate():
    if not LOGO_ASSET.exists():
        raise FileNotFoundError(
            f"Missing approved logo asset: {LOGO_ASSET}. Run scripts/generate-brand-assets.py first."
        )
    pdfmetrics.registerFont(TTFont("Archivo", str(ARCHIVO_REGULAR)))
    pdfmetrics.registerFont(TTFont("Archivo-Bold", str(ARCHIVO_BOLD)))
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = OUTPUT_DIR / "major-car-repair-decision-checklist.pdf"
    frame = Frame(42, 43, letter[0] - 84, letter[1] - 128, id="content")
    doc = BaseDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=42,
        rightMargin=42,
        topMargin=59,
        bottomMargin=43,
        title="Major Car Repair Decision Checklist",
        author="Car Second Opinion",
        subject="Educational worksheet for comparing a major repair with realistic replacement options",
    )
    doc.addPageTemplates([PageTemplate(id="worksheet", frames=[frame], onPage=page_chrome)])
    doc.build(build_story())
    PUBLIC_OUTPUT.write_bytes(output.read_bytes())
    print(output)
    print(PUBLIC_OUTPUT)


if __name__ == "__main__":
    generate()
