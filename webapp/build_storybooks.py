#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build storybook assets (pages, questions, covers) for chapters 8/14/15/19
and print an app.js snippet for storyBooksByChapter.
"""
import os, sys, glob, json, shutil, textwrap, subprocess, math

# Allow system Python to import opencc from the venv
sys.path.insert(0, '/private/tmp/opencc_venv/lib/python3.9/site-packages')
import opencc

from PIL import Image, ImageDraw, ImageFont

BASE = '/Users/nadialo/Dadi_Teaching_Material'
WEBAPP = os.path.join(BASE, 'dadi_teachingmaterial_design', 'webapp')
SRC_ROOT = os.path.join(BASE, '第{ch}課', '第{ch}課-繪本部分素材')
DEST_PAGES = os.path.join(WEBAPP, 'assets', 'images', 'stories', '故事繪本頁面更新版', '第{ch}課故事{idx}')
DEST_COVERS = os.path.join(WEBAPP, 'assets', 'images', 'stories', '圖書封面')
FONT_PATH = os.path.join(WEBAPP, 'assets', 'fonts', '網頁字體', 'FZY3K.TTF')

NUM_CN = {1: '一', 2: '二', 3: '三'}

TW2S = opencc.OpenCC('tw2s')

def to_cn(text):
    return TW2S.convert(text)

def load_font(size):
    return ImageFont.truetype(FONT_PATH, size)

def wrap_text(text, font, max_width, draw):
    """Simple character-level wrapping for Chinese text."""
    lines = []
    for paragraph in text.split('\n'):
        line = ''
        for ch in paragraph:
            test = line + ch
            if draw.textlength(test, font=font) <= max_width:
                line = test
            else:
                if line:
                    lines.append(line)
                line = ch
        if line:
            lines.append(line)
    return lines

def rounded_rectangle(size, fill, radius=30):
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, size[0]-1, size[1]-1), radius=radius, fill=fill)
    return img

COVER_COLORS = [
    (255, 209, 220),  # pink
    (207, 236, 207),  # green
    (198, 226, 255),  # blue
    (255, 236, 179),  # yellow
    (230, 210, 255),  # purple
    (255, 218, 185),  # orange
]

def generate_cover(ch, idx, title_tw, title_cn, dest_tw, dest_cn):
    W, H = 412, 588
    radius = 30
    color = COVER_COLORS[(ch * 3 + idx) % len(COVER_COLORS)]
    for lang, title, dest in [('tw', title_tw, dest_tw), ('cn', title_cn, dest_cn)]:
        base = rounded_rectangle((W, H), color + (255,), radius=radius)
        draw = ImageDraw.Draw(base)
        # Decorative top band
        draw.rounded_rectangle((20, 20, W-20, 120), radius=20, fill=(255, 255, 255, 180))
        # Story number
        num_font = load_font(48)
        num_text = f'第{ch}課 {NUM_CN[idx]}'
        bbox = draw.textbbox((0, 0), num_text, font=num_font)
        tw_num = bbox[2] - bbox[0]
        draw.text(((W - tw_num) / 2, 40), num_text, fill=(80, 80, 80, 255), font=num_font)
        # Title
        title_font = load_font(42)
        max_w = W - 60
        lines = wrap_text(title, title_font, max_w, draw)
        # If too many lines, shrink font
        if len(lines) > 4:
            title_font = load_font(34)
            lines = wrap_text(title, title_font, max_w, draw)
        line_h = title_font.getbbox('Ay')[3] - title_font.getbbox('Ay')[1] + 8
        total_h = len(lines) * line_h
        y = (H - total_h) / 2 + 30
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=title_font)
            lw = bbox[2] - bbox[0]
            draw.text(((W - lw) / 2, y), line, fill=(50, 50, 50, 255), font=title_font)
            y += line_h
        # Subtle footer
        footer_font = load_font(22)
        footer = '故事繪本'
        bbox = draw.textbbox((0, 0), footer, font=footer_font)
        fw = bbox[2] - bbox[0]
        draw.text(((W - fw) / 2, H - 70), footer, fill=(100, 100, 100, 255), font=footer_font)
        base.save(dest)

def generate_question_image(text, prev_page_path, dest):
    W, H = 1384, 801
    W, H = 1384, 801
    base = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    # Large capsule / superellipse-style rounded card mask
    mask = rounded_rectangle((W, H), (255, 255, 255, 255), radius=120).convert('L')
    card = rounded_rectangle((W, H), (255, 255, 255, 255), radius=120)
    base.paste(card, (0, 0), card)
    draw = ImageDraw.Draw(base)

    # Larger question text; shrink slightly for very long questions
    font_size = 68 if len(text) <= 30 else 58
    font = load_font(font_size)
    text_top = 70
    # Keep text inside the rounded top of the capsule
    r = 120
    if text_top <= r:
        safe_half = math.sqrt(r ** 2 - (r - text_top) ** 2)
        safe_w = W - 2 * (r - safe_half)
    else:
        safe_w = W
    max_text_w = int(min(W * 0.92, safe_w))
    lines = wrap_text(text, font, max_text_w, draw)
    line_h = font.getbbox('Ay')[3] - font.getbbox('Ay')[1] + 12
    text_h = len(lines) * line_h

    # Draw text near the top inside the capsule
    y = text_top
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        lw = bbox[2] - bbox[0]
        draw.text(((W - lw) / 2, y), line, fill=(51, 51, 51, 255), font=font)
        y += line_h

    # Load and scale previous page image to fill the card
    if os.path.exists(prev_page_path):
        page_img = Image.open(prev_page_path)
        if page_img.mode in ('RGBA', 'P'):
            page_img = page_img.convert('RGBA')
        else:
            page_img = page_img.convert('RGB')
        max_img_w = int(W * 0.86)
        max_img_h = int(H - text_h - 150)
        orig_w, orig_h = page_img.size
        scale = min(max_img_w / orig_w, max_img_h / orig_h)
        new_size = (int(orig_w * scale), int(orig_h * scale))
        page_img = page_img.resize(new_size, Image.Resampling.LANCZOS)
        px = (W - page_img.width) // 2
        py = text_top + text_h + 45
        if page_img.mode == 'RGBA':
            base.paste(page_img, (px, py), page_img)
        else:
            base.paste(page_img, (px, py))
    else:
        ph_font = load_font(40)
        ph = '（前一頁圖片缺失）'
        bbox = draw.textbbox((0, 0), ph, font=ph_font)
        lw = bbox[2] - bbox[0]
        draw.text(((W - lw) / 2, text_top + text_h + 80), ph, fill=(180, 180, 180, 255), font=ph_font)

    # Clip everything to the capsule shape so the thumbnail respects the rounded corners
    base = Image.composite(base, Image.new('RGBA', (W, H), (0, 0, 0, 0)), mask)
    base.save(dest)

def make_placeholder_page(dest, ch, idx, page_num):
    W, H = 565, 341
    img = Image.new('RGB', (W, H), (245, 245, 245))
    draw = ImageDraw.Draw(img)
    font = load_font(28)
    text = f'第{ch}課 故事{NUM_CN[idx]}\n第{page_num}頁\n（素材缺失）'
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((W - tw) / 2, (H - th) / 2 - 20), text, fill=(160, 160, 160), font=font, align='center')
    img.save(dest)

def find_story_dir(ch, idx):
    root = SRC_ROOT.format(ch=ch)
    pattern = os.path.join(root, f'故事{NUM_CN[idx]}*')
    matches = glob.glob(pattern)
    if not matches:
        raise FileNotFoundError(f'No source dir for chapter {ch} story {idx}: {pattern}')
    return matches[0]

def build_story(ch, story_spec):
    idx = story_spec['idx']
    title_tw = story_spec['title']
    title_cn = to_cn(title_tw)
    breaks = sorted(zip(story_spec['breaks'], story_spec['questions']))
    break_nums = [b for b, _ in breaks]
    questions = [q for _, q in breaks]
    expected_pages = max(break_nums)

    dest_dir = DEST_PAGES.format(ch=ch, idx=idx)
    os.makedirs(dest_dir, exist_ok=True)

    src_dir = find_story_dir(ch, idx)

    page_paths = []
    for p in range(1, expected_pages + 1):
        src = os.path.join(src_dir, f'story{idx}_{p:02d}.png')
        dst = os.path.join(dest_dir, f'page{p:02d}.png')
        if os.path.exists(src):
            shutil.copy2(src, dst)
        else:
            make_placeholder_page(dst, ch, idx, p)
        page_paths.append(dst)

    # Generate covers
    cover_tw = os.path.join(DEST_COVERS, f'第{ch}課-故事{idx}封面繁體.png')
    cover_cn = os.path.join(DEST_COVERS, f'第{ch}課-故事{idx}封面簡體.png')
    os.makedirs(DEST_COVERS, exist_ok=True)
    generate_cover(ch, idx, title_tw, title_cn, cover_tw, cover_cn)

    # Generate questions
    q_images_tw = []
    q_images_cn = []
    for qi, (b, qtext_tw) in enumerate(breaks, start=1):
        qtext_cn = to_cn(qtext_tw)
        prev_page = page_paths[b - 1]
        q_tw = os.path.join(dest_dir, f'第{ch}課-故事{idx}問題{qi}繁體.png')
        q_cn = os.path.join(dest_dir, f'第{ch}課-故事{idx}問題{qi}簡體.png')
        generate_question_image(qtext_tw, prev_page, q_tw)
        generate_question_image(qtext_cn, prev_page, q_cn)
        q_images_tw.append(q_tw)
        q_images_cn.append(q_cn)

    # Build pages array
    pages = []
    q_idx = 0
    for p in range(1, expected_pages + 1):
        rel = 'assets/images/stories/故事繪本頁面更新版/第{}課故事{}/page{:02d}.png'.format(ch, idx, p)
        pages.append({'type': 'image', 'image': rel})
        if p in break_nums:
            qi = break_nums.index(p) + 1
            rel_tw = 'assets/images/stories/故事繪本頁面更新版/第{}課故事{}/第{}課-故事{}問題{}繁體.png'.format(ch, idx, ch, idx, qi)
            rel_cn = 'assets/images/stories/故事繪本頁面更新版/第{}課故事{}/第{}課-故事{}問題{}簡體.png'.format(ch, idx, ch, idx, qi)
            pages.append({'type': 'question', 'image': {'tw': rel_tw, 'cn': rel_cn}})

    # Card positions match existing lessons
    positions = {
        1: {'width': 411.9, 'x': 365.4},
        2: {'width': 389.2, 'x': 776.7},
        3: {'width': 389.2, 'x': 1165.4},
    }
    rel_cover_tw = f'assets/images/stories/圖書封面/第{ch}課-故事{idx}封面繁體.png'
    rel_cover_cn = f'assets/images/stories/圖書封面/第{ch}課-故事{idx}封面簡體.png'
    book = {
        'id': f'lesson{ch}-story{idx}',
        'title': title_tw,
        'cover': rel_cover_tw,
        'card': {
            'tw': rel_cover_tw,
            'cn': rel_cover_cn,
            'width': positions[idx]['width'],
            'height': 587.3,
            'x': positions[idx]['x'],
            'y': 247.5
        },
        'pages': pages
    }
    return book

STORIES = {
    8: [
        {
            'idx': 1, 'title': '小熊的野餐',
            'breaks': [1, 2, 3, 5],
            'questions': [
                '小熊帶了什麼食物去野餐？',
                '你有沒有和朋友一起去過野餐？你帶了什麼食物？',
                '小熊最後把蜂蜜分享給誰？分享食物開心嗎？',
                '如果是你去野餐，你想帶什麼食物和大家分享？',
            ]
        },
        {
            'idx': 2, 'title': '小獅子不刷牙',
            'breaks': [1, 2, 4, 7],
            'questions': [
                '小獅子為什麼沒有朋友？',
                '你每天早上和晚上會做什麼？',
                '不刷牙會怎樣？牙齒會怎樣？',
                '你喜歡刷牙嗎？刷牙後牙齒是什麼感覺？',
            ]
        },
        {
            'idx': 3, 'title': '小鼴鼠的布娃娃',
            'breaks': [1, 5, 6, 7],
            'questions': [
                '小鼴鼠為什麼哭？',
                '誰幫小鼴鼠找到了布娃娃？',
                '你有沒有弄丟過心愛的玩具？後來找到了嗎？',
                '如果你有朋友傷心，你會怎麼幫助他？',
            ]
        },
    ],
    14: [
        {
            'idx': 1, 'title': '棕色的熊你在看什麼？',
            'breaks': [1, 6, 10, 12],
            'questions': [
                '棕色的熊看到了什麼顏色的鳥？',
                '你最喜歡書裡哪種動物的顏色？',
                '你能說出彩虹有哪幾種顏色嗎？',
                '我們教室裡有什麼東西是藍色的？',
            ]
        },
        {
            'idx': 2, 'title': '自己的顏色',
            'breaks': [3, 8, 13, 20],
            'questions': [
                '變色龍為什麼沒有自己的顏色？',
                '變色龍站在葉子上是什麼顏色？',
                '如果你有魔法可以變顏色，你想變成什麼顏色？',
                '你最喜歡自己的什麼地方？',
            ]
        },
        {
            'idx': 3, 'title': '彩虹色的故事',
            'breaks': [1, 5, 6, 8],
            'questions': [
                '彩虹有幾種顏色？是哪幾種？',
                '小紅和小藍混在一起變成什麼顏色？',
                '你有沒有看過真正的彩虹？在哪裡看到的？',
                '下雨天後出太陽，我們可能會看到什麼？',
            ]
        },
    ],
    15: [
        {
            'idx': 1, 'title': '樂樂上幼兒園',
            'breaks': [1, 2, 6, 10],
            'questions': [
                '樂樂第一天上學是什麼心情？',
                '你記得第一天來學校的時候嗎？你是什麼感覺？',
                '樂樂在學校做了什麼好玩的事情？',
                '你最喜歡在學校做什麼？',
            ]
        },
        {
            'idx': 2, 'title': '我絕對絕對不去上學',
            'breaks': [2, 13, 14, 16],
            'questions': [
                '勞拉為什麼不想去上學？',
                '勞拉最後為什麼願意去上學了？',
                '你在學校有沒有好朋友？他叫什麼名字？',
                '上學可以做什麼有趣的事情？',
            ]
        },
        {
            'idx': 3, 'title': '古里古怪的幼兒園',
            'breaks': [2, 10, 13, 15],
            'questions': [
                '幼兒園裡誰變得古里古怪？',
                '猴子老師教大家什麼規矩？',
                '你在幼兒園會遵守什麼規矩？',
                '你覺得上學有趣嗎？為什麼？',
            ]
        },
    ],
    19: [
        {
            'idx': 1, 'title': '這是什麼？',
            'breaks': [5, 9, 13, 16],
            'questions': [
                '大米可以做成什麼食物？',
                '土豆可以做成什麼？',
                '你今天早上吃了什麼早餐？',
                '你喜歡吃什麼蔬菜？',
            ]
        },
        {
            'idx': 2, 'title': '米飯的花樣',
            'breaks': [5, 8, 7, 13],
            'questions': [
                '米飯可以變成什麼？',
                '你喜歡吃飯糰還是炒飯？',
                '茶泡飯是怎麼做的？',
                '你最喜歡吃哪種米飯做的食物？',
            ]
        },
        {
            'idx': 3, 'title': '熊熊麵包店',
            'breaks': [1, 3, 13, 16],
            'questions': [
                '誰開了麵包店？',
                '國王請他們做麵包給誰吃？',
                '王子最後為什麼開心了？',
                '你喜歡吃什麼麵包？',
            ]
        },
    ],
}

def build_all():
    manifest = {}
    for ch, specs in STORIES.items():
        manifest[ch] = [build_story(ch, s) for s in specs]
    return manifest

def format_js_value(val, indent=0):
    sp = '    '
    if isinstance(val, dict):
        items = []
        for k, v in val.items():
            items.append(sp * (indent + 1) + f"{k}: {format_js_value(v, indent + 1)}")
        return '{\n' + ',\n'.join(items) + '\n' + sp * indent + '}'
    if isinstance(val, list):
        # If list contains only simple dicts with type/image, keep compact if small
        items = [format_js_value(v, indent + 1) for v in val]
        return '[\n' + ',\n'.join(sp * (indent + 1) + it.replace('\n', '\n' + sp * (indent + 1)) for it in items) + '\n' + sp * indent + ']'
    if isinstance(val, str):
        return json.dumps(val, ensure_ascii=False)
    return json.dumps(val, ensure_ascii=False)

def emit_appjs_snippet(manifest):
    lines = []
    for ch in sorted(manifest.keys()):
        books = manifest[ch]
        lines.append(f"    {ch}: [")
        for i, book in enumerate(books):
            lines.append("        {")
            lines.append(f"            id: {json.dumps(book['id'], ensure_ascii=False)},")
            lines.append(f"            title: {json.dumps(book['title'], ensure_ascii=False)},")
            lines.append(f"            cover: {json.dumps(book['cover'], ensure_ascii=False)},")
            lines.append("            card: {")
            card = book['card']
            lines.append(f"                tw: {json.dumps(card['tw'], ensure_ascii=False)},")
            lines.append(f"                cn: {json.dumps(card['cn'], ensure_ascii=False)},")
            lines.append(f"                width: {card['width']},")
            lines.append(f"                height: {card['height']},")
            lines.append(f"                x: {card['x']},")
            lines.append(f"                y: {card['y']}")
            lines.append("            },")
            lines.append("            pages: [")
            for pi, p in enumerate(book['pages']):
                if p['type'] == 'image':
                    lines.append(f"                {{ type: 'image', image: {json.dumps(p['image'], ensure_ascii=False)} }},")
                else:
                    tw = json.dumps(p['image']['tw'], ensure_ascii=False)
                    cn = json.dumps(p['image']['cn'], ensure_ascii=False)
                    lines.append(f"                {{ type: 'question', image: {{ tw: {tw}, cn: {cn} }} }},")
            lines.append("            ]")
            if i < len(books) - 1:
                lines.append("        },")
            else:
                lines.append("        }")
        lines.append("    ],")
    return '\n'.join(lines)

if __name__ == '__main__':
    manifest = build_all()
    snippet = emit_appjs_snippet(manifest)
    out_path = '/tmp/story_snippet_utf8.txt'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(snippet)
    print(f"Snippet written to {out_path}")
    print(f"Generated assets for chapters: {list(manifest.keys())}")
