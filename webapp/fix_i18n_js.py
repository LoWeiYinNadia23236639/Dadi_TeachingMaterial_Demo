#!/usr/bin/env python3
import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    # 1. chapterTitles - use t() for all chapters
    ("""const chapterTitles = {
    1: '一家人', 2: '幼兒園', 3: '數字', 4: '顏色', 5: '動物',
    6: '水果', 7: '天氣', 8: '季節', 9: '運動', 10: '食物',
    11: '身體', 12: '交通工具', 13: '家庭成員', 14: '日常用品', 15: '蔬菜',
    16: '飲料', 17: '職業', 18: '國家', 19: '節日', 20: '情緒',
    21: '服裝', 22: '時間', 23: '自然'
};""",
     """const chapterTitles = {
    1: t('chapter1'), 2: t('chapter2'), 3: t('chapter3'), 4: t('chapter4'), 5: t('chapter5'),
    6: t('chapter6'), 7: t('chapter7'), 8: t('chapter8'), 9: t('chapter9'), 10: t('chapter10'),
    11: t('chapter11'), 12: t('chapter12'), 13: t('chapter13'), 14: t('chapter14'), 15: t('chapter15'),
    16: t('chapter16'), 17: t('chapter17'), 18: t('chapter18'), 19: t('chapter19'), 20: t('chapter20'),
    21: t('chapter21'), 22: t('chapter22'), 23: t('chapter23')
};"""),

    # 2. updateIntroTitle - use t() for prefix/suffix
    ("""function updateIntroTitle() {
    const titleEl = document.querySelector('.intro-topic');
    if (titleEl && AppState.currentChapter) {
        const title = chapterTitles[AppState.currentChapter] || '';
        titleEl.textContent = `第${AppState.currentChapter}課：${title}`;
    }
}""",
     """function updateIntroTitle() {
    const titleEl = document.querySelector('.intro-topic');
    if (titleEl && AppState.currentChapter) {
        const title = chapterTitles[AppState.currentChapter] || '';
        titleEl.textContent = t('lessonPrefix') + AppState.currentChapter + t('lessonSuffix') + title;
    }
}"""),

    # 3. mainSections - use t() for names
    ("""const mainSections = {
    intro: { name: '課前提問', theme: 'theme-pink', subSections: [0] },
    learning: { name: '識圖', theme: 'theme-blue', subSections: [1, 2, 3, 4, 5, 6, 7] },
    writing: { name: '書寫練習', theme: 'theme-orange', subSections: [8] },
    story: { name: '故事繪本', theme: 'theme-green', subSections: [9] },
    games: { name: '遊戲活動', theme: 'theme-pink', subSections: [10] }
};""",
     """const mainSections = {
    intro: { name: t('sectionIntro'), theme: 'theme-pink', subSections: [0] },
    learning: { name: t('sectionLearning'), theme: 'theme-blue', subSections: [1, 2, 3, 4, 5, 6, 7] },
    writing: { name: t('sectionWriting'), theme: 'theme-orange', subSections: [8] },
    story: { name: t('sectionStory'), theme: 'theme-green', subSections: [9] },
    games: { name: t('sectionGames'), theme: 'theme-pink', subSections: [10] }
};"""),

    # 4. sectionConfig - use t() for names
    ("""const sectionConfig = [
    { name: '課前提問', theme: 'theme-pink' },
    { name: '識圖 - 眼睛', theme: 'theme-blue' },
    { name: '識圖 - 耳朵', theme: 'theme-blue' },
    { name: '識圖 - 鼻子', theme: 'theme-blue' },
    { name: '識圖 - 嘴巴', theme: 'theme-blue' },
    { name: '識圖 - 手', theme: 'theme-blue' },
    { name: '識圖 - 腳', theme: 'theme-blue' },
    { name: '識圖 - 頭', theme: 'theme-blue' },
    { name: '書寫練習', theme: 'theme-orange' },
    { name: '故事繪本', theme: 'theme-green' },
    { name: '遊戲活動', theme: 'theme-pink' }
];""",
     """const sectionConfig = [
    { name: t('sectionIntro'), theme: 'theme-pink' },
    { name: t('sectionLearning') + ' - ' + t('eye'), theme: 'theme-blue' },
    { name: t('sectionLearning') + ' - ' + t('ear'), theme: 'theme-blue' },
    { name: t('sectionLearning') + ' - ' + t('nose'), theme: 'theme-blue' },
    { name: t('sectionLearning') + ' - ' + t('mouth'), theme: 'theme-blue' },
    { name: t('sectionLearning') + ' - ' + t('hand'), theme: 'theme-blue' },
    { name: t('sectionLearning') + ' - ' + t('foot'), theme: 'theme-blue' },
    { name: t('sectionLearning') + ' - ' + t('head'), theme: 'theme-blue' },
    { name: t('sectionWriting'), theme: 'theme-orange' },
    { name: t('sectionStory'), theme: 'theme-green' },
    { name: t('sectionGames'), theme: 'theme-pink' }
];"""),

    # 5. goToPoemPlayer - use t() for back title and logo
    ('title="返回">◀</button>\n            <div class="btn-logo-player">華</div>',
     'title="' + "'+t('back')+'" + '">◀</button>\n            <div class="btn-logo-player">' + "'+t('logoChar')+'" + '</div>'),

    # Actually, the above won't work well in template literals. Let me think about this differently.
]

# The above approach with template literals inside replacement strings is problematic.
# Let me use a different strategy: direct string replacements for each function.

print("Script loaded, using direct replacements...")
