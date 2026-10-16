"""Rebuild the website and photo price lists from script.js.

Run with Python containing reportlab and Pillow. Requires Node.js.
"""

import io
import json
import subprocess
from decimal import Decimal
from pathlib import Path
from urllib.parse import unquote
from xml.sax.saxutils import escape

from PIL import Image as PillowImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Image, LongTable, Paragraph, SimpleDocTemplate, Spacer, TableStyle


ROOT = Path(__file__).resolve().parents[1]
EXTRACT = r"""
const fs = require('fs'), vm = require('vm');
const source = fs.readFileSync('script.js', 'utf8');
const catalog = vm.runInNewContext(source.slice(source.indexOf('const CATALOG ='), source.indexOf('/* ---------- State ---------- */')) + '; CATALOG');
const photo = vm.runInNewContext(source.slice(source.indexOf('const PRODUCT_PHOTO_CODES'), source.indexOf('function totals')) + '; productPhoto');
console.log(JSON.stringify(catalog.map(([name, items]) => [name, items.map(item => [...item, photo(item[0], item[1])])])));
"""


def catalog():
    return json.loads(subprocess.check_output(["node", "-e", EXTRACT], cwd=ROOT, text=True))


def plain(text):
    return str(text).replace("—", "-").replace("–", "-").replace("°", " degrees")


def money(value):
    text = f"{value:,.2f}"
    return text.rstrip("0").rstrip(".")


def paragraph(text, style):
    return Paragraph(escape(plain(text)), style)


def thumbnail(relative_path):
    if not relative_path:
        return "-"
    path = ROOT / unquote(relative_path)
    if not path.is_file():
        raise FileNotFoundError(path)
    with PillowImage.open(path) as image:
        image = image.convert("RGB")
        image.thumbnail((160, 140))
        output = io.BytesIO()
        image.save(output, format="PNG")
        output.seek(0)
        factor = min(36 / image.width, 38 / image.height)
        return Image(output, width=image.width * factor, height=image.height * factor)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#d9cdbb"))
    canvas.line(28, 33, A4[0] - 28, 33)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#67574c"))
    canvas.drawString(28, 21, "Thala Crackers - Sivakasi | All prices in INR")
    canvas.drawRightString(A4[0] - 28, 21, f"Page {doc.page}")
    canvas.restoreState()


def build(groups, filename, with_photos=False):
    normal = ParagraphStyle("Product", fontName="Helvetica", fontSize=8, leading=11)
    centered = ParagraphStyle("Centered", parent=normal, alignment=TA_CENTER)
    right = ParagraphStyle("Right", parent=normal, alignment=TA_RIGHT)
    title = ParagraphStyle("Title", fontName="Helvetica-Bold", fontSize=19, leading=23, alignment=TA_CENTER, textColor=colors.HexColor("#430c1c"))
    subtitle = ParagraphStyle("Subtitle", parent=centered, fontSize=9, leading=14)
    category = ParagraphStyle("Category", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=colors.HexColor("#430c1c"))
    doc = SimpleDocTemplate(str(ROOT / filename), pagesize=A4, leftMargin=28, rightMargin=28,
                            topMargin=26, bottomMargin=44, title="Thala Crackers - " + ("Photo " if with_photos else "") + "Price List", author="Thala Crackers")
    story = [paragraph("THALA CRACKERS", title),
             paragraph("SIVAKASI - DIWALI PRICE LIST", subtitle),
             paragraph("Call: 6374439080 | WhatsApp: 9345273268 | Instagram: @thala_crackers", subtitle),
             Spacer(1, 12)]
    widths = [30, 48, 174, 90, 64, 64, 69] if with_photos else [28, 205, 100, 68, 68, 70]
    widths[-1] += doc.width - sum(widths)
    headings = ["S.No"] + (["Photo"] if with_photos else []) + ["Product Name", "Content", "MRP", "Disc.", "Our Price"]
    serial = 0
    for name, items in groups:
        rows = [[paragraph(f"{name} - {len(items)} items", category)] + [""] * (len(widths) - 1),
                [paragraph(text, centered if i == 0 else normal) for i, text in enumerate(headings)]]
        for code, product, pack, amount, image_path in items:
            serial += 1
            price = Decimal(str(amount))
            mrp = price * 4
            row = [paragraph(serial, centered)]
            if with_photos:
                row.append(thumbnail(image_path))
            row += [paragraph(product, normal), paragraph(pack, normal)]
            row += [paragraph(value, right) for value in (["-", "-"] if name == "Combo Packs" else [money(mrp), money(mrp - price)]) + [money(price)]]
            rows.append(row)
        table = LongTable(rows, colWidths=widths, repeatRows=2, hAlign="LEFT")
        table.setStyle(TableStyle([
            ("SPAN", (0, 0), (-1, 0)),
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#f5e5ba")),
            ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#f5f1eb")),
            ("ROWBACKGROUNDS", (0, 2), (-1, -1), [colors.white, colors.HexColor("#fdfbf7")]),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("ALIGN", (0, 2), (0, -1), "CENTER"),
            ("ALIGN", (1, 2), (1, -1), "CENTER" if with_photos else "LEFT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("LINEBELOW", (0, 1), (-1, 1), 0.5, colors.HexColor("#c6b69a")),
            ("LINEBELOW", (0, 2), (-1, -1), 0.25, colors.HexColor("#e6e0d5")),
        ]))
        story.extend([table, Spacer(1, 12)])
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"Updated {filename}: {serial} products")


if __name__ == "__main__":
    groups = catalog()
    build(groups, "price_list.pdf")
    build(groups, "personal pdf.pdf", with_photos=True)
