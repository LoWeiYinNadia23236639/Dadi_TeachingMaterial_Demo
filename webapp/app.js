// ============================================
// 大地幼教学材 - Application Logic
// ============================================

const AppState = {
    currentPage: 'welcome',
    selectedChar: null,
    playerName: '',
    currentSection: 0,
    currentChar: '头',
    currentPinyin: 'tóu',
    currentMeaning: '頭部',
    score: 0,
    totalQuestions: 5,
    currentQuestion: 1,
    answered: new Set(),
    gameScore: 0,
    flippedCards: [],
    matchedPairs: 0,
    currentStoryPage: 1,
    writeCtx: null,
    isDrawing: false,
    memoryFlipped: [],
    memoryMatched: 0,
    currentStoryId: 1,
    language: 'zh-TW' // 默認繁體中文
};

// 多語言內容
const i18n = {
    'zh-TW': {
        // 角色選擇頁面
        selectLanguage: '選擇語言',
        inputName: 'Enter your name',
        confirm: '確定',
        selectCharHint: 'Choose a learning partner!',
        selectCharAlert: '請選擇一個角色！',
        writeGood: '寫得很好！',
        
        // 學習頁面
        sectionIntro: '課前提問',
        sectionLearning: '識圖',
        sectionWriting: '書寫練習',
        sectionStory: '故事繪本',
        sectionGames: '遊戲活動',
        
        // 身體部位
        eye: '眼睛',
        ear: '耳朵',
        nose: '鼻子',
        mouth: '嘴巴',
        hand: '手',
        foot: '腳',
        head: '頭',
        
        // 身體部位單字
        headChar: '頭',
        eyeChar: '眼',
        earChar: '耳',
        noseChar: '鼻',
        mouthChar: '口',
        handChar: '手',
        footChar: '腳',
        
        // 課程標題
        lesson11Title: '第11課：身體',
        
        // 按鈕文字
        playAudio: '播放發音',
        watchStroke: '觀看筆順影片',
        clear: '清除',
        complete: '完成',
        back: '返回',
        
        // 問題
        question1: '小朋友，你知道我們的身體有哪些部位嗎？點擊正確的答案！',
        
        // 描述文字
        descEye: '我們用眼睛來看東西',
        descEar: '我們用耳朵來聽聲音',
        descNose: '我們用鼻子來聞氣味',
        descMouth: '我們用嘴巴來吃東西和說話',
        descHand: '我們用手來拿東西和觸摸',
        descFoot: '我們用腳來走路和跑步',
        descHead: '頭部有五官，是我們思考的地方',
        
        // 遊戲提示
        clickRightText: '👆 現在點擊右邊對應的文字！',
        clickLeftFirst: '👉 請先點擊左邊的圖片！',
        matchSuccess: '🎉 配對成功！',
        allMatched: '🎊 恭喜你完成了所有配對！🎊',
        matchingMaster: '太棒了！你是配對小達人！',
        tryAgain: '😅 不對喔，再試試！',
        keepGoing: '繼續加油！',
        flipCardHint: '再翻一張看看！',
        memoryMatchSuccess: '🎉 配對成功！',
        memoryAllMatched: '🎊 恭喜你完成了記憶遊戲！🎊',
        findSameCard: '找到相同的卡片！',
        quizCorrect: '🎉 答對了！真棒！',
        quizAllCorrect: '🎊 太棒了！全部答對！🎊',
        quizWrong: '😅 不對喔，再試試！',
        
        // 其他文字
        score: '得分',
        welcome: '歡迎',
        kindergarten: '幼兒園',
        primary: '小學',
        secondary: '中學',
        courseware: '課件',
        poems: '唐詩',
        songs: '兒歌',
        
        // 冊別
        volumeUpper: '上冊',
        volumeLower: '下冊',
        
        // 章節名稱
        chapter1: '一家人',
        chapter2: '幼兒園',
        chapter3: '數字',
        chapter4: '顏色',
        chapter5: '動物',
        chapter6: '水果',
        chapter7: '天氣',
        chapter8: '季節',
        chapter9: '運動',
        chapter10: '食物',
        chapter11: '身體',
        
        // 引導頁
        enterLearning: '進入學習',
        ready: '準備好了嗎？',
        todayLearn: '今天想學什麼呢？',
        wantLearn: '你想學習什麼內容呢？',
        
        // 页面标题
        selectCharacter: '選擇角色',
        selectLevel: '選擇學習程度',
        selectCategory: '選擇學習類別',
        selectChapter: '選擇章節',
        
        // 歌曲名稱
        song1: '兩隻老虎',
        song2: '小星星',
        song3: '拔蘿蔔',
        song4: '小兔子',
        song5: '找朋友',
        song6: '好媽媽',
        song7: '新年好',
        song8: '春天',
        song9: '數鴨子',
        song10: '泥娃娃',
        song11: '一分錢',
        song12: '小燕子',
        
        // 詩歌名稱
        poem1: '靜夜思',
        poem2: '春暃',
        poem3: '詠鵝',
        poem4: '悯農',
        poem5: '登鶓雀樓',
        poem6: '江雪',
        poem7: '問劉十九',
        poem8: '暮江吟',
        poem9: '望廬山瀑布',
        poem10: '早發白帝城',
        poem11: '黃鶴樓',
        poem12: '山居秀曦',
        
        // 語言選擇
        langTW: '繁體中文',
        langCN: '简體中文',
        
        // 首頁
        startLearning: '開始學習'
    },
    'zh-CN': {
        // 角色選擇頁面
        selectLanguage: '选择语言',
        inputName: 'Enter your name',
        confirm: '确定',
        selectCharHint: 'Choose a learning partner!',
        selectCharAlert: '请选择一个角色！',
        writeGood: '写得很好！',
        
        // 學習頁面
        sectionIntro: '课前提问',
        sectionLearning: '识图',
        sectionWriting: '书写练习',
        sectionStory: '故事绘本',
        sectionGames: '游戏活动',
        
        // 身體部位
        eye: '眼睛',
        ear: '耳朵',
        nose: '鼻子',
        mouth: '嘴巴',
        hand: '手',
        foot: '脚',
        head: '头',
        
        // 課程標題
        lesson11Title: '第11課：身體',
        
        // 按鈕文字
        playAudio: '播放发音',
        watchStroke: '观看笔顺视频',
        clear: '清除',
        complete: '完成',
        back: '返回',
        
        // 問題
        question1: '小朋友，你知道我们的身体有哪些部位吗？点击正确的答案！',
        
        // 描述文字
        descEye: '我们用眼睛来看东西',
        descEar: '我们用耳朵来听声音',
        descNose: '我们用鼻子来闻气味',
        descMouth: '我们用嘴巴来吃东西和说话',
        descHand: '我们用手来拿东西和触摸',
        descFoot: '我们用脚来走路和跑步',
        descHead: '头部有五官，是我们思考的地方',
        
        // 游戏提示
        clickRightText: '👆 现在点击右边对应的文字！',
        clickLeftFirst: '👉 请先点击左边的图片！',
        matchSuccess: '🎉 配对成功！',
        allMatched: '🎊 恭喜你完成了所有配对！🎊',
        matchingMaster: '太棒了！你是配对小达人！',
        tryAgain: '😅 不对哦，再试试！',
        keepGoing: '继续加油！',
        flipCardHint: '再翻一张看看！',
        memoryMatchSuccess: '🎉 配对成功！',
        memoryAllMatched: '🎊 恭喜你完成了记忆游戏！🎊',
        findSameCard: '找到相同的卡片！',
        quizCorrect: '🎉 答对了！真棒！',
        quizAllCorrect: '🎊 太棒了！全部答对！🎊',
        quizWrong: '😅 不对哦，再试试！',
        
        // 其他文字
        score: '得分',
        welcome: '欢迎',
        kindergarten: '幼儿园',
        primary: '小学',
        secondary: '中学',
        courseware: '课件',
        poems: '唐诗',
        songs: '儿歌',
        
        // 册别
        volumeUpper: '上册',
        volumeLower: '下册',
        
        // 章节名称
        chapter1: '一家人',
        chapter2: '幼儿园',
        chapter3: '数字',
        chapter4: '颜色',
        chapter5: '动物',
        chapter6: '水果',
        chapter7: '天气',
        chapter8: '季节',
        chapter9: '运动',
        chapter10: '食物',
        chapter11: '身体',
        
        // 引导页
        enterLearning: '进入学习',
        ready: '准备好了吗？',
        todayLearn: '今天想学什么呢？',
        wantLearn: '你想学习什么内容呢？',
        
        // 页面标题
        selectCharacter: '选择角色',
        selectLevel: '选择学习程度',
        selectCategory: '选择学习类别',
        selectChapter: '选择章节',
        
        // 歌曲名称
        song1: '两只老虎',
        song2: '小星星',
        song3: '拔萝卜',
        song4: '小兔子',
        song5: '找朋友',
        song6: '好妈妈',
        song7: '新年好',
        song8: '春天',
        song9: '数鸭子',
        song10: '泥娃娃',
        song11: '一分钱',
        song12: '小燕子',
        
        // 诗歌名称
        poem1: '静夜思',
        poem2: '春晓',
        poem3: '咏鹅',
        poem4: '怜农',
        poem5: '登鹊鹊楼',
        poem6: '江雪',
        poem7: '问刘十九',
        poem8: '暮江吟',
        poem9: '望庐山瀑布',
        poem10: '早发白帝城',
        poem11: '黄鹤楼',
        poem12: '山居秋晨',
        
        // 语言选择
        langTW: '繁体中文',
        langCN: '简体中文',
        
        // 首页
        startLearning: '开始学习'
    }
};

// 獲取當前語言的文本
function t(key) {
    return i18n[AppState.language][key] || key;
}

// 選擇語言
function selectLanguage(lang) {
    AppState.language = lang;
    
    // 更新按鈕狀態 (舊版 .lang-btn 和 新版 .char2-lang-btn)
    document.querySelectorAll('.lang-btn, .char2-lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const btnId = 'lang-' + (lang === 'zh-TW' ? 'TW' : 'CN');
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add('active');
    
    // 更新語言標籤
    const langLabel = document.getElementById('langLabel');
    if (langLabel) {
        langLabel.textContent = t('selectLanguage');
    }
    
    // 更新所有頁面的文字
    updateAllText();
    
    // 更新學習頁面默認顯示的字符
    const demoChar = document.getElementById('demoChar');
    if (demoChar) {
        demoChar.textContent = t('headChar');
    }
    const demoMeaning = document.getElementById('demoMeaning');
    if (demoMeaning) {
        demoMeaning.textContent = t('head');
    }
    
    // 保存語言偏好
    localStorage.setItem('preferredLanguage', lang);
}

// 更新所有文字
function updateAllText() {
    // 更新輸入框占位符
    const nameInput = document.getElementById('playerName');
    if (nameInput) {
        nameInput.placeholder = t('inputName');
    }
    
    // 更新確定按鈕
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.textContent = t('confirm') + ' ✓';
    }
    
    // 更新選擇角色提示
    const charSelectHint = document.getElementById('charSelectHint');
    if (charSelectHint) {
        charSelectHint.textContent = t('selectCharHint');
    }
    
    // 更新學習頁面section配置
    sectionConfig[0].name = t('sectionIntro');
    sectionConfig[1].name = t('sectionLearning') + ' - ' + t('eye');
    sectionConfig[2].name = t('sectionLearning') + ' - ' + t('ear');
    sectionConfig[3].name = t('sectionLearning') + ' - ' + t('nose');
    sectionConfig[4].name = t('sectionLearning') + ' - ' + t('mouth');
    sectionConfig[5].name = t('sectionLearning') + ' - ' + t('hand');
    sectionConfig[6].name = t('sectionLearning') + ' - ' + t('foot');
    sectionConfig[7].name = t('sectionLearning') + ' - ' + t('head');
    sectionConfig[8].name = t('sectionWriting');
    sectionConfig[9].name = t('sectionStory');
    sectionConfig[10].name = t('sectionGames');
    
    // 更新當前section標題
    const titleEl = document.getElementById('sectionTitle');
    if (titleEl) {
        titleEl.textContent = sectionConfig[AppState.currentSection]?.name || '';
    }
    
    // 更新右側導航文字
    document.querySelectorAll('.nav-sec-text').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            el.textContent = t(key);
        }
    });
    
    // 更新識圖部分的描述文字
    updateBodyPartDescriptions();
    
    // 更新問答挑戰的問題
    updateQuizQuestions();
    
    // 更新程度選擇頁面
    document.querySelectorAll('[data-i18n="kindergarten"]').forEach(el => el.textContent = t('kindergarten'));
    document.querySelectorAll('[data-i18n="primary"]').forEach(el => el.textContent = t('primary'));
    document.querySelectorAll('[data-i18n="secondary"]').forEach(el => el.textContent = t('secondary'));
    
    // 更新分類頁面
    document.querySelectorAll('[data-i18n="courseware"]').forEach(el => el.textContent = t('courseware'));
    document.querySelectorAll('[data-i18n="poems"]').forEach(el => el.textContent = t('poems'));
    document.querySelectorAll('[data-i18n="songs"]').forEach(el => el.textContent = t('songs'));
    
    // 更新冊別
    document.querySelectorAll('[data-i18n="volumeUpper"]').forEach(el => el.textContent = t('volumeUpper'));
    document.querySelectorAll('[data-i18n="volumeLower"]').forEach(el => el.textContent = t('volumeLower'));
    
    // 更新章節名稱
    for (let i = 1; i <= 11; i++) {
        document.querySelectorAll(`[data-i18n="chapter${i}"]`).forEach(el => el.textContent = t(`chapter${i}`));
    }
    
    // 更新引導頁
    document.querySelectorAll('[data-i18n="enterLearning"]').forEach(el => el.textContent = t('enterLearning'));
    
    // 更新按鈕
    document.querySelectorAll('[data-i18n="clear"]').forEach(el => el.textContent = t('clear'));
    document.querySelectorAll('[data-i18n="complete"]').forEach(el => el.textContent = t('complete'));
    document.querySelectorAll('[data-i18n="watchStroke"]').forEach(el => {
        const arrow = el.textContent.includes('▶') ? '▶ ' : '';
        el.textContent = arrow + t('watchStroke');
    });
    
    // 更新頁面標題
    document.querySelectorAll('[data-i18n="selectCharacter"]').forEach(el => el.textContent = t('selectCharacter'));
    document.querySelectorAll('[data-i18n="selectLevel"]').forEach(el => el.textContent = t('selectLevel'));
    document.querySelectorAll('[data-i18n="selectCategory"]').forEach(el => el.textContent = t('selectCategory'));
    document.querySelectorAll('[data-i18n="selectChapter"]').forEach(el => el.textContent = t('selectChapter'));
    
    // 更新歌曲名稱
    for (let i = 1; i <= 12; i++) {
        document.querySelectorAll(`[data-i18n="song${i}"]`).forEach(el => el.textContent = t(`song${i}`));
    }
    
    // 更新詩歌名稱
    for (let i = 1; i <= 12; i++) {
        document.querySelectorAll(`[data-i18n="poem${i}"]`).forEach(el => el.textContent = t(`poem${i}`));
    }
    
    // 更新語言選擇按鈕
    document.querySelectorAll('[data-i18n="langTW"]').forEach(el => el.textContent = t('langTW'));
    document.querySelectorAll('[data-i18n="langCN"]').forEach(el => el.textContent = t('langCN'));
    
    // 更新首頁按鈕
    document.querySelectorAll('[data-i18n="startLearning"]').forEach(el => el.textContent = t('startLearning'));
    
    // 更新課程標題
    document.querySelectorAll('[data-i18n="lesson11Title"]').forEach(el => el.textContent = t('lesson11Title'));
    
    // 更新學習頁面身體部位單字按鈕
    const charButtons = document.querySelectorAll('.char-option');
    charButtons.forEach(btn => {
        const key = btn.getAttribute('data-i18n');
        if (key) {
            btn.textContent = t(key);
        }
    });
}

// 更新頁面語言
function updatePageLanguage() {
    // 更新輸入框占位符
    const nameInput = document.getElementById('playerName');
    if (nameInput) {
        nameInput.placeholder = t('inputName');
    }
    
    // 更新確定按鈕
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.textContent = t('confirm') + ' ✓';
    }
    
    // 更新學習頁面section配置
    sectionConfig[0].name = t('sectionIntro');
    sectionConfig[1].name = t('sectionLearning') + ' - ' + t('eye');
    sectionConfig[2].name = t('sectionLearning') + ' - ' + t('ear');
    sectionConfig[3].name = t('sectionLearning') + ' - ' + t('nose');
    sectionConfig[4].name = t('sectionLearning') + ' - ' + t('mouth');
    sectionConfig[5].name = t('sectionLearning') + ' - ' + t('hand');
    sectionConfig[6].name = t('sectionLearning') + ' - ' + t('foot');
    sectionConfig[7].name = t('sectionLearning') + ' - ' + t('head');
    sectionConfig[8].name = t('sectionWriting');
    sectionConfig[9].name = t('sectionStory');
    sectionConfig[10].name = t('sectionGames');
    
    // 更新當前section標題
    const titleEl = document.getElementById('sectionTitle');
    if (titleEl && AppState.currentSection !== undefined) {
        titleEl.textContent = sectionConfig[AppState.currentSection].name;
    }
    
    // 觸發語言改變事件
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: AppState.language } }));
}

// 頁面加載時檢查語言偏好和角色
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'zh-TW' || savedLang === 'zh-CN')) {
        AppState.language = savedLang;
    }
    
    // 設置語言按鈕狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById('lang-' + (AppState.language === 'zh-TW' ? 'TW' : 'CN'));
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // 更新語言標籤
    const langLabel = document.getElementById('langLabel');
    if (langLabel) {
        langLabel.textContent = t('selectLanguage');
    }
    
    // 更新輸入框占位符
    const nameInput = document.getElementById('playerName');
    if (nameInput) {
        nameInput.placeholder = t('inputName');
    }
    
    // 更新所有頁面文字
    updateAllText();
    
    // 更新學習頁面默認顯示的字符
    const demoChar = document.getElementById('demoChar');
    if (demoChar) {
        demoChar.textContent = t('headChar');
    }
    const demoMeaning = document.getElementById('demoMeaning');
    if (demoMeaning) {
        demoMeaning.textContent = t('head');
    }
    
    // 恢復已選擇的角色
    const savedChar = localStorage.getItem('selectedCharacter');
    if (savedChar) {
        AppState.selectedChar = JSON.parse(savedChar);
    }
});

// ============================================
// 角色引導系統
// ============================================

// 引導對話內容
const guideMessages = {
    'zh-TW': {
        levels: ['哈囉！我是你的學習夥伴！', '請選擇你的學習程度喔！', '幼兒園、小學還是中學呢？'],
        cats: ['太棒了！', '你想學習什麼內容呢？', '課件、唐詩還是兒歌？'],
        chapters: ['我們來選一個課程吧！', '今天想學什麼呢？'],
        intro: ['準備好了嗎？', '讓我們開始學習吧！', '點擊「進入學習」開始！'],
        learning_intro: ['讓我們先來回答問題！', '加油！你可以的！'],
        learning_learning: ['這是我的' + '{part}' + '！', '你也有' + '{part}' + '嗎？', '摸摸看你的' + '{part}' + '！'],
        learning_writing: ['一起來寫字吧！', '跟著筆順寫寫看！', '你可以寫得很棒！'],
        learning_story: ['要聽故事嗎？', '選一本你喜歡的故事！'],
        learning_games: ['來玩遊戲吧！', '試試看你的記憶力！', '加油！'],
        poems: ['唐詩很有趣喔！', '點擊你想聽的詩！'],
        songs: ['一起來唱兒歌！', '選一首喜歡的歌！']
    },
    'zh-CN': {
        levels: ['你好！我是你的学习伙伴！', '请选择你的学习程度哦！', '幼儿园、小学还是中学呢？'],
        cats: ['太棒了！', '你想学习什么内容呢？', '课件、唐诗还是儿歌？'],
        chapters: ['我们来选一个课程吧！', '今天想学什么呢？'],
        intro: ['准备好了吗？', '让我们开始学习吧！', '点击「进入学习」开始！'],
        learning_intro: ['让我们来先回答问题！', '加油！你可以的！'],
        learning_learning: ['这是我的' + '{part}' + '！', '你也有' + '{part}' + '吗？', '摸摸看你的' + '{part}' + '！'],
        learning_writing: ['一起来写字吧！', '跟着笔顺写写看！', '你可以写得很棒！'],
        learning_story: ['要听故事吗？', '选一本你喜欢的故事！'],
        learning_games: ['来玩游戏吧！', '试试看你的记忆力！', '加油！'],
        poems: ['唐诗很有趣哦！', '点击你想听的诗！'],
        songs: ['一起来唱儿歌！', '选一首喜欢的歌！']
    }
};

// 顯示引導角色
function showGuideCharacter(pageId) {
    // 移除舊的角色引導
    const oldGuide = document.querySelector('.guide-character-container');
    if (oldGuide) oldGuide.remove();
    
    // 如果沒有選擇角色，不顯示
    if (!AppState.selectedChar) return;
    
    // 獲取角色圖片
    const charId = AppState.selectedChar.id;
    const charImg = charId ? charId + '.png' : '人1.png';
    
    // 獲取對應頁面的對話
    let message = getGuideMessage(pageId);
    
    // 創建角色引導容器
    const guideContainer = document.createElement('div');
    guideContainer.className = 'guide-character-container';
    guideContainer.innerHTML = `
        <div class="guide-speech-bubble">
            <span class="guide-text">${message}</span>
            <button class="guide-close" onclick="hideGuideSpeech()">✕</button>
        </div>
        <div class="guide-character">
            <img src="${charImg}" alt="學習夥伴">
        </div>
    `;
    
    // 添加到當前頁面
    const currentPage = document.getElementById('page-' + pageId);
    if (currentPage) {
        currentPage.appendChild(guideContainer);
        
        // 添加動畫效果
        setTimeout(() => {
            guideContainer.classList.add('show');
        }, 50);
        
        // 8秒後自動隱藏對話框
        setTimeout(() => {
            hideGuideSpeech();
        }, 8000);
    }
}

// 獲取引導對話
function getGuideMessage(pageId) {
    const messages = guideMessages[AppState.language];
    let pageMessages = [];
    
    // 根據頁面選擇對應的對話
    if (pageId === 'levels') pageMessages = messages.levels;
    else if (pageId === 'cats') pageMessages = messages.cats;
    else if (pageId === 'chapters') pageMessages = messages.chapters;
    else if (pageId === 'intro') pageMessages = messages.intro;
    else if (pageId === 'learning') {
        // 學習頁面根據當前section顯示不同對話
        const section = AppState.currentSection;
        if (section === 0) pageMessages = messages.learning_intro;
        else if (section >= 1 && section <= 7) {
            // 識圖部分
            const bodyParts = ['', t('eye'), t('ear'), t('nose'), t('mouth'), t('hand'), t('foot'), t('head')];
            const part = bodyParts[section] || '';
            pageMessages = messages.learning_learning.map(m => m.replace('{part}', part));
        }
        else if (section === 8) pageMessages = messages.learning_writing;
        else if (section === 9) pageMessages = messages.learning_story;
        else if (section === 10) pageMessages = messages.learning_games;
    }
    else if (pageId === 'poems') pageMessages = messages.poems;
    else if (pageId === 'songs') pageMessages = messages.songs;
    
    // 隨機選擇一條對話
    if (pageMessages && pageMessages.length > 0) {
        return pageMessages[Math.floor(Math.random() * pageMessages.length)];
    }
    
    return AppState.language === 'zh-TW' ? '加油！' : '加油！';
}

// 隱藏對話框
function hideGuideSpeech() {
    const bubble = document.querySelector('.guide-speech-bubble');
    if (bubble) {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(10px) scale(0.9)';
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 300);
    }
}

// 更新引導對話（當切換section時）
function updateGuideMessage() {
    // 學習夥伴已移除，不再顯示角色引導
}

// ============================================
// NAVIGATION
// ============================================
// 更新當前頁面中所有角色圖片為選擇的角色
function updateCharacterImages(pageId) {
    if (!AppState.selectedChar) return;
    const charImg = AppState.selectedChar.id + '.png';
    const page = document.getElementById('page-' + pageId);
    if (!page) return;
    
    // 更新學習夥伴頭像
    page.querySelectorAll('.partner-avatar img, .level-partner-avatar img, .cats-partner-avatar img, .chapters-partner-avatar img').forEach(img => {
        img.src = charImg;
    });
    
    // 更新裝飾角色圖片
    page.querySelectorAll('.poem-char-right img, .song-char-left img, .song-char-right img, .learning-char-right img').forEach(img => {
        img.src = charImg;
    });
}

function goTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + pageId);
    if (page) page.classList.add('active');
    AppState.currentPage = pageId;
    
    // 更新角色圖片
    updateCharacterImages(pageId);
    
    // 學習夥伴已移除，不再顯示角色引導和問候語
    
    if (pageId === 'intro') {
        updateIntroTitle();
    }
    
    if (pageId === 'learning') {
        // 初始化課前提問
        const learningPage = document.getElementById('learningPage');
        if (learningPage) {
            learningPage.style.borderColor = '#F06292';
        }
        setTimeout(() => {
            initQuiz();
        }, 100);
    }
}

function goToChars() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-chars').classList.add('active');
    AppState.currentPage = 'chars';
}

// ============================================
// PAGE 2: CHARACTER SELECTION
// ============================================
function selectChar(element, charId) {
    document.querySelectorAll('.char2-item').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');
    AppState.selectedChar = { id: charId };
}

function selectCharAuto(element, charId) {
    selectChar(element, charId);
    // Auto navigate after a short delay to show the checkmark
    setTimeout(() => {
        confirmChar();
    }, 600);
}

function confirmChar() {
    const nameInput = document.getElementById('playerName');
    if (!nameInput.value.trim()) {
        alert('Please enter your name!');
        return;
    }
    if (!AppState.selectedChar) {
        alert('Please choose a learning partner!');
        return;
    }
    AppState.playerName = nameInput.value.trim();
    
    // 保存選擇的角色到本地存儲
    localStorage.setItem('selectedCharacter', JSON.stringify(AppState.selectedChar));
    
    goTo('levels');
}

function selectAvatar(id) {
    console.log('Selected avatar:', id);
}

// ============================================
// PAGE 3: LEVEL SELECTION
// ============================================
function selectLevel(level) {
    goTo('cats');
}

// ============================================
// PAGE 5 & 6: POEMS & SONGS
// ============================================
function playSong(id) {
    const songs = ['两只老虎', '小星星', '拔萝卜', '小兔子', '找朋友', '好妈妈', '新年好', '春天', '数鸭子', '泥娃娃', '一分钱', '小燕子'];
    speakText('播放儿歌：' + songs[id - 1]);
}

// ============================================
// PAGE 7: CHAPTERS
// ============================================
function showVolume(vol) {
    document.querySelectorAll('.volume-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.volume-content').forEach(c => c.classList.remove('active'));
    const content = document.getElementById('vol-content-' + vol);
    if (content) content.classList.add('active');
}

// 章節標題數據
const chapterTitles = {
    1: '一家人', 2: '幼兒園', 3: '數字', 4: '顏色', 5: '動物',
    6: '水果', 7: '天氣', 8: '季節', 9: '運動', 10: '食物',
    11: '身體', 12: '交通工具', 13: '家庭成員', 14: '日常用品', 15: '蔬菜',
    16: '飲料', 17: '職業', 18: '國家', 19: '節日', 20: '情緒',
    21: '服裝', 22: '時間', 23: '自然'
};

function openChapter(num) {
    AppState.currentChapter = num;
    updateIntroTitle();
    goTo('intro');
}

function updateIntroTitle() {
    const titleEl = document.querySelector('.intro-topic');
    if (titleEl && AppState.currentChapter) {
        const title = chapterTitles[AppState.currentChapter] || '';
        titleEl.textContent = `第${AppState.currentChapter}課：${title}`;
    }
}

// ============================================
// PAGE 9: LEARNING MODULE - SECTIONS
// ============================================
// 5個主要學習部分
const mainSections = {
    intro: { name: '課前提問', theme: 'theme-pink', subSections: [0] },
    learning: { name: '識圖', theme: 'theme-blue', subSections: [1, 2, 3, 4, 5, 6, 7] },
    writing: { name: '書寫練習', theme: 'theme-orange', subSections: [8] },
    story: { name: '故事繪本', theme: 'theme-green', subSections: [9] },
    games: { name: '遊戲活動', theme: 'theme-pink', subSections: [10] }
};

// 詳細的section配置
const sectionConfig = [
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
];

let currentMainSection = 'intro';
let currentSubIndex = 0;

// 顯示主要部分
function showSectionGroup(groupName) {
    currentMainSection = groupName;
    const group = mainSections[groupName];
    currentSubIndex = 0;
    
    // 更新右側導航按鈕狀態
    document.querySelectorAll('.nav-section-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === groupName);
    });
    
    // 顯示該組的第一個子section
    gotoSection(group.subSections[0]);
}

function gotoSection(index) {
    if (index < 0 || index > 10) return;
    AppState.currentSection = index;
    
    document.querySelectorAll('.section-content').forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });
    
    const page = document.getElementById('learningPage');
    if (page) {
        page.className = 'learning-page ' + sectionConfig[index].theme;
    }
    
    const titleEl = document.getElementById('sectionTitle');
    if (titleEl) titleEl.textContent = sectionConfig[index].name;
    
    // 更新右側導航按鈕狀態（根據當前section找到對應的主組）
    for (const [groupName, group] of Object.entries(mainSections)) {
        if (group.subSections.includes(index)) {
            document.querySelectorAll('.nav-section-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.section === groupName);
            });
            break;
        }
    }
    
    document.querySelectorAll('.footer-indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === index % 3);
    });
    
    const pageNum = document.getElementById('currentPage');
    if (pageNum) pageNum.textContent = index + 1;
    
    // 初始化活動頁面遊戲 (待重新設計)
    // if (index === 10) { setTimeout(initMatchingGame, 100); }
    
    // 如果是識圖部分，顯示子導航
    updateSubNavVisibility(index);
    
    // 學習夥伴已移除，不再更新引導對話
}

function nextSection() {
    // 找到當前所在的組
    for (const [groupName, group] of Object.entries(mainSections)) {
        if (group.subSections.includes(AppState.currentSection)) {
            const currentIndexInGroup = group.subSections.indexOf(AppState.currentSection);
            if (currentIndexInGroup < group.subSections.length - 1) {
                // 在同一組內下一個
                gotoSection(group.subSections[currentIndexInGroup + 1]);
            } else {
                // 切換到下一組
                const groupKeys = Object.keys(mainSections);
                const currentGroupIndex = groupKeys.indexOf(groupName);
                if (currentGroupIndex < groupKeys.length - 1) {
                    showSectionGroup(groupKeys[currentGroupIndex + 1]);
                }
            }
            break;
        }
    }
}

function prevSection() {
    // 找到當前所在的組
    for (const [groupName, group] of Object.entries(mainSections)) {
        if (group.subSections.includes(AppState.currentSection)) {
            const currentIndexInGroup = group.subSections.indexOf(AppState.currentSection);
            if (currentIndexInGroup > 0) {
                // 在同一組內上一個
                gotoSection(group.subSections[currentIndexInGroup - 1]);
            } else {
                // 切換到上一組的最後一個
                const groupKeys = Object.keys(mainSections);
                const currentGroupIndex = groupKeys.indexOf(groupName);
                if (currentGroupIndex > 0) {
                    const prevGroup = mainSections[groupKeys[currentGroupIndex - 1]];
                    currentMainSection = groupKeys[currentGroupIndex - 1];
                    currentSubIndex = prevGroup.subSections.length - 1;
                    
                    // 更新導航狀態
                    document.querySelectorAll('.nav-section-btn').forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.section === currentMainSection);
                    });
                    
                    gotoSection(prevGroup.subSections[currentSubIndex]);
                }
            }
            break;
        }
    }
}

// 更新子導航顯示狀態
function updateSubNavVisibility(index) {
    const subNav = document.getElementById('subNav');
    if (!subNav) return;
    
    if (index >= 1 && index <= 7) {
        subNav.style.display = 'flex';
        // 更新子導航按鈕狀態
        const bodyParts = ['眼睛', '耳朵', '鼻子', '嘴巴', '手', '腳', '頭'];
        subNav.innerHTML = bodyParts.map((part, i) => 
            `<button class="sub-nav-btn ${index === i + 1 ? 'active' : ''}" onclick="gotoSection(${i + 1})">${part}</button>`
        ).join('');
    } else {
        subNav.style.display = 'none';
    }
}

// 更新識圖部分的描述文字 (待重新設計)
function updateBodyPartDescriptions() {
    // 佔位函數 - 待重新設計
}

// 更新問答挑戰的問題 (待重新設計)
function updateQuizQuestions() {
    // 佔位函數 - 待重新設計
}

// ============================================
// SECTION 0: QUESTIONS
// ============================================
// 課前提問 - 更適合小朋友的問題
// ============================================
// SECTION 0: QUESTIONS (課前提問 - 待重新設計)
// ============================================
function loadQuestion(qNum) {
    // 佔位函數 - 待重新設計
}

function checkAnswer(btn, answer, isCorrect) {
    // 佔位函數 - 待重新設計
}

// ============================================
// SECTIONS 1-8: 識圖 + 書寫練習 (待重新設計)
// ============================================
function speakText(text) {
    speak(text);
}

function selectCharTab(char, pinyin, meaning, btn) {
    // 佔位函數 - 待重新設計
}

function initCanvas() {
    // 佔位函數 - 待重新設計
}

function clearCanvas() {
    // 佔位函數 - 待重新設計
}

function playStrokeAndSpeak() {
    // 佔位函數 - 待重新設計
}

function showVideoModal(videoUrl) {
    console.log('Opening video:', videoUrl);
    let embedUrl = videoUrl;
    if (videoUrl.includes('youtube.com/shorts/')) {
        const videoId = videoUrl.split('/shorts/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = videoUrl.split('v=')[1].split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    const modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;`;
    modal.innerHTML = `
        <div style="position:relative;width:90%;max-width:800px;background:white;border-radius:20px;padding:20px;">
            <button onclick="closeVideoModal()" style="position:absolute;top:-15px;right:-15px;width:40px;height:40px;border-radius:50%;background:#E85A9C;color:white;border:none;font-size:20px;cursor:pointer;">✕</button>
            <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:15px;">
                <iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe>
            </div>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) { if (e.target === modal) closeVideoModal(); });
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) modal.remove();
}

function checkWriting() {
    // 佔位函數 - 待重新設計
}

// ============================================
// SECTION 9: STORIES (故事繪本)
// ============================================

const storyBooks = [
    {
        id: 'hands',
        title: '千變萬化的手',
        cover: '圖書封面/book_cover_hands.png',
        pages: [
            { image: null, text: '我們每個人都有兩隻手。手可以做很多很多的事情。', question: null },
            { image: null, text: '用手可以推門、拉窗，還可以握手打招呼。', question: '你能用手做一個推的動作給老師看嗎？' },
            { image: null, text: '手還可以畫畫、寫字、摺紙，做出美麗的作品。', question: null },
            { image: null, text: '我們要愛護自己的雙手，保持乾淨，勤洗手。', question: '你知道什麼時候應該洗手嗎？' }
        ]
    },
    {
        id: 'body',
        title: '我的身體',
        cover: '圖書封面/book_cover_body.png',
        pages: [
            { image: null, text: '這是我的身體。我有頭、頸、軀幹、手和腳。', question: null },
            { image: null, text: '頭上有眼睛、耳朵、鼻子和嘴巴，幫助我認識世界。', question: '你能指一指自己的眼睛在哪裡嗎？' },
            { image: null, text: '身體可以跑、跳、走、坐，讓我做各種運動。', question: null },
            { image: null, text: '我們要好好照顧自己的身體，吃得健康、多運動。', question: '你喜歡做什麼運動呢？' }
        ]
    },
    {
        id: 'eyes',
        title: '眼睛的故事',
        cover: '圖書封面/book_cover_eyes.png',
        pages: [
            { image: null, text: '每個人都有兩隻眼睛。眼睛讓我們看到美麗的世界。', question: null },
            { image: null, text: '眼睛可以看到紅的花、綠的樹、藍的天和白雲。', question: '你現在能看到什麼顏色？' },
            { image: null, text: '看書的時候要保持距離，不能靠得太近。', question: null },
            { image: null, text: '看完電視或手機後，要讓眼睛休息一下，看看遠方。', question: '你知道怎樣做眼保健操嗎？' }
        ]
    }
];

let storyState = {
    currentBookIndex: -1,
    currentPageIndex: 0,
    view: 'selection' // 'selection' | 'reader'
};

function initStory() {
    storyState.currentBookIndex = -1;
    storyState.currentPageIndex = 0;
    storyState.view = 'selection';
    renderStory();
}

function renderStory() {
    if (storyState.view === 'selection') {
        renderStorySelection();
    } else {
        renderStoryReader();
    }
}

function renderStorySelection() {
    const container = document.getElementById('storyContainer');
    if (!container) return;

    const booksHtml = storyBooks.map((book, index) => `
        <div class="story-book-card" onclick="goToStory(${index})">
            <div class="story-book-cover">
                <img src="${book.cover}" alt="${book.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'story-page-placeholder\'><span class=\'placeholder-icon\'>📖</span><span>封面圖片待補</span></div>';">
            </div>
            <div class="story-book-title">${book.title}</div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="story-page">
            <!-- 頭部 -->
            <div class="story-header">
                <button class="story-green-circle" onclick="switchLearningModule('quiz')">◀</button>
                <div class="story-title-pill">故事繪本</div>
                <div class="story-green-circle" style="font-size:22px;font-weight:bold;">華</div>
            </div>

            <!-- 右側功能標籤 -->
            <div class="story-side-tabs">
                <div class="story-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="story-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="story-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="story-side-tab active" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="story-side-tab" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>

            <!-- 主內容 -->
            <div class="story-selection">
                <div class="story-selection-title">請選擇一本故事書</div>
                <div class="story-books-grid">
                    ${booksHtml}
                </div>
            </div>

            <!-- 底部導航 -->
            <div class="story-bottom-nav">
                <button class="story-green-circle" onclick="prevSection()">◀</button>
                <button class="story-green-circle" onclick="nextSection()">▶</button>
            </div>
        </div>
    `;
}

function goToStory(index) {
    storyState.currentBookIndex = index;
    storyState.currentPageIndex = 0;
    storyState.view = 'reader';
    renderStoryReader();
}

function backToStorySelection() {
    storyState.currentBookIndex = -1;
    storyState.currentPageIndex = 0;
    storyState.view = 'selection';
    renderStorySelection();
}

function renderStoryReader() {
    const container = document.getElementById('storyContainer');
    if (!container) return;

    const book = storyBooks[storyState.currentBookIndex];
    const page = book.pages[storyState.currentPageIndex];
    const isFirstPage = storyState.currentPageIndex === 0;
    const isLastPage = storyState.currentPageIndex === book.pages.length - 1;

    const imageHtml = page.image
        ? `<img src="${page.image}" alt="故事插圖" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="story-page-placeholder" style="display:none;"><span class="placeholder-icon">🖼️</span><span>頁面圖片待補</span></div>`
        : `<div class="story-page-placeholder"><span class="placeholder-icon">🖼️</span><span>頁面圖片待補</span></div>`;

    const questionHtml = page.question
        ? `<div class="story-page-question">${page.question}</div>`
        : '';

    container.innerHTML = `
        <div class="story-page">
            <!-- 頭部 -->
            <div class="story-header">
                <button class="story-green-circle" onclick="backToStorySelection()">◀</button>
                <div class="story-title-pill">${book.title}</div>
                <div class="story-green-circle" style="font-size:22px;font-weight:bold;">華</div>
            </div>

            <!-- 右側功能標籤 -->
            <div class="story-side-tabs">
                <div class="story-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="story-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="story-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="story-side-tab active" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="story-side-tab" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>

            <!-- 主內容 -->
            <div class="story-reader">
                <div class="story-reader-content">
                    <div class="story-page-card">
                        <div class="story-page-image">
                            ${imageHtml}
                        </div>
                        <div class="story-page-text-area">
                            ${questionHtml}
                            <div class="story-page-indicator">${storyState.currentPageIndex + 1} / ${book.pages.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部導航 -->
            <div class="story-bottom-nav">
                <button class="story-green-circle" onclick="prevStoryPage()" ${isFirstPage ? 'style="opacity:0.3;pointer-events:none;"' : ''}>◀</button>
                <button class="story-green-circle" onclick="nextStoryPage()" ${isLastPage ? 'style="opacity:0.3;pointer-events:none;"' : ''}>▶</button>
            </div>
        </div>
    `;
}

function nextStoryPage() {
    const book = storyBooks[storyState.currentBookIndex];
    if (storyState.currentPageIndex < book.pages.length - 1) {
        storyState.currentPageIndex++;
        renderStoryReader();
    }
}

function prevStoryPage() {
    if (storyState.currentPageIndex > 0) {
        storyState.currentPageIndex--;
        renderStoryReader();
    }
}

// ============================================
// SECTION 10: GAMES (遊戲活動)
// ============================================

const gameActivities = [
    { id: 'matching', name: '圖案和文字配對', icon: '🔗' },
    { id: 'quiz', name: '文字選擇題', icon: '❓' },
    { id: 'memory', name: '記憶力翻牌子', icon: '🃏' }
];

const gameMatchingData = [
    { hanzi: '頭', image: '課程介紹頁/real_head.png' },
    { hanzi: '耳', image: '課程介紹頁/real_ear.png' },
    { hanzi: '腳', image: '課程介紹頁/real_foot.png' },
    { hanzi: '鼻', image: '課程介紹頁/real_nose.png' },
    { hanzi: '眼', image: '課程介紹頁/real_eye.png' },
    { hanzi: '口', image: '課程介紹頁/real_mouth.png' },
    { hanzi: '手', image: '課程介紹頁/real_hand.png' }
];

const gameQuizQuestions = [
    {
        type: 'multi',
        question: '小朋友，你知道我們的身體有哪些部位嗎？',
        options: ['眼睛', '耳朵', '鼻子', '椅子'],
        correct: [0, 1, 2]
    },
    {
        type: 'single',
        question: '小鳥唱歌，我們用什麼來聽呢？',
        options: ['嘴巴', '手', '眼睛', '耳朵'],
        correct: 3
    },
    {
        type: 'single',
        question: '看美麗的花朵，我們用什麼來看呢？',
        options: ['鼻子', '眼睛', '耳朵', '嘴巴'],
        correct: 1
    },
    {
        type: 'single',
        question: '拿玩具、抱抱媽媽，我們用什麼呢？',
        options: ['腳', '眼睛', '手', '耳朵'],
        correct: 2
    }
];

const gameMemoryData = [
    { hanzi: '頭', image: '課程介紹頁/real_head.png' },
    { hanzi: '耳', image: '課程介紹頁/real_ear.png' },
    { hanzi: '腳', image: '課程介紹頁/real_foot.png' },
    { hanzi: '鼻', image: '課程介紹頁/real_nose.png' },
    { hanzi: '眼', image: '課程介紹頁/real_eye.png' },
    { hanzi: '口', image: '課程介紹頁/real_mouth.png' },
    { hanzi: '手', image: '課程介紹頁/real_hand.png' }
];

let gameState = {
    currentActivity: 'menu',
    matching: { selectedImage: null, selectedText: null, matched: new Set(), matchedPairs: [], imageOrder: null, textOrder: null },
    quiz: { currentQ: 0, selected: new Set(), answered: false },
    memory: { cards: [], flipped: [], matched: new Set(), canFlip: true },
    score: 0
};

function initGame() {
    gameState.currentActivity = 'menu';
    gameState.score = 0;
    resetMatchingGame();
    resetQuizGame();
    resetMemoryGame();
    renderGameMenu();
}

function resetMatchingGame() {
    gameState.matching = { selectedImage: null, selectedText: null, matched: new Set(), matchedPairs: [], imageOrder: null, textOrder: null };
}

function resetQuizGame() {
    gameState.quiz = { currentQ: 0, selected: new Set(), answered: false };
}

function resetMemoryGame() {
    gameState.memory = { cards: [], flipped: [], matched: new Set(), canFlip: true };
}

/* ---------- 活動選擇菜單 ---------- */

function renderGameMenu() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    const cardsHtml = gameActivities.map(act => `
        <div class="game-menu-card" onclick="startGameActivity('${act.id}')">
            <div class="game-menu-icon">${act.icon}</div>
            <div class="game-menu-name">${act.name}</div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="game-page">
            <div class="game-header">
                <button class="game-purple-circle" onclick="switchLearningModule('story')">◀</button>
                <div class="game-title-pill">遊戲活動</div>
                <div class="game-purple-circle" style="font-size:22px;font-weight:bold;">華</div>
            </div>
            <div class="game-side-tabs">
                <div class="game-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="game-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="game-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="game-side-tab" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="game-side-tab active" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>
            <div class="game-menu">
                <div class="game-menu-title">請選擇一個遊戲活動</div>
                <div class="game-menu-grid">${cardsHtml}</div>
            </div>
            <div class="game-bottom-nav">
                <button class="game-purple-circle" onclick="prevSection()">◀</button>
                <button class="game-purple-circle" onclick="nextSection()">▶</button>
            </div>
            <div class="game-star-score ${gameState.score > 0 ? 'earned' : ''}" id="gameStar">⭐</div>
        </div>
    `;
}

function startGameActivity(id) {
    gameState.currentActivity = id;
    if (id === 'matching') renderMatchingGame();
    else if (id === 'quiz') renderQuizGame();
    else if (id === 'memory') renderMemoryGame();
}

function backToGameMenu() {
    gameState.currentActivity = 'menu';
    renderGameMenu();
}

/* ---------- 活動1：圖案和文字配對 ---------- */

function renderMatchingGame() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    // Only shuffle on first render; keep stable order after matches to prevent jitter
    if (!gameState.matching.imageOrder) {
        gameState.matching.imageOrder = [...gameMatchingData].sort(() => Math.random() - 0.5);
        gameState.matching.textOrder = [...gameMatchingData].sort(() => Math.random() - 0.5);
    }
    const shuffledData = gameState.matching.imageOrder;
    const shuffledTexts = gameState.matching.textOrder;

    const imagesHtml = shuffledData.map((item, i) => `
        <div class="game-matching-image ${gameState.matching.matched.has(item.hanzi) ? 'matched' : ''}"
             data-hanzi="${item.hanzi}" data-side="image" data-idx="${i}"
             onclick="handleMatchingClick(this)">
            <img src="${item.image}" alt="${item.hanzi}">
        </div>
    `).join('');

    const textsHtml = shuffledTexts.map((item, i) => `
        <div class="game-matching-text ${gameState.matching.matched.has(item.hanzi) ? 'matched' : ''}"
             data-hanzi="${item.hanzi}" data-side="text" data-idx="${i}"
             onclick="handleMatchingClick(this)">
            ${item.hanzi}
        </div>
    `).join('');

    const progress = gameState.matching.matched.size;
    const total = gameMatchingData.length;

    container.innerHTML = `
        <div class="game-page">
            <div class="game-header">
                <button class="game-purple-circle" onclick="backToGameMenu()">◀</button>
                <div class="game-title-pill">圖案和文字配對</div>
                <div class="game-purple-circle" style="font-size:22px;font-weight:bold;">華</div>
            </div>
            <div class="game-side-tabs">
                <div class="game-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="game-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="game-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="game-side-tab" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="game-side-tab active" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>
            <div class="game-matching">
                <div class="game-matching-title">請把圖案和文字配對起來！（${progress}/${total}）</div>
                <div class="game-matching-area" id="matchingArea">
                    <div class="game-matching-col">${imagesHtml}</div>
                    <div class="game-matching-col">${textsHtml}</div>
                </div>
            </div>
            <div class="game-bottom-nav">
                <button class="game-purple-circle" onclick="backToGameMenu()">◀</button>
                <button class="game-purple-circle" onclick="startGameActivity('quiz')">▶</button>
            </div>
            <div class="game-star-score ${gameState.score > 0 ? 'earned' : ''}">⭐</div>
        </div>
    `;

    // Draw connection lines for matched pairs
    requestAnimationFrame(() => drawMatchingLines());
}

function handleMatchingClick(el) {
    const hanzi = el.dataset.hanzi;
    const side = el.dataset.side;

    if (gameState.matching.matched.has(hanzi)) return;

    // Clear previous selection on same side
    if (side === 'image') {
        if (gameState.matching.selectedImage) {
            const prev = document.querySelector(`[data-hanzi="${gameState.matching.selectedImage}"][data-side="image"]`);
            if (prev) prev.classList.remove('selected');
        }
        gameState.matching.selectedImage = hanzi;
        el.classList.add('selected');
    } else {
        if (gameState.matching.selectedText) {
            const prev = document.querySelector(`[data-hanzi="${gameState.matching.selectedText}"][data-side="text"]`);
            if (prev) prev.classList.remove('selected');
        }
        gameState.matching.selectedText = hanzi;
        el.classList.add('selected');
    }

    // Check match
    if (gameState.matching.selectedImage && gameState.matching.selectedText) {
        if (gameState.matching.selectedImage === gameState.matching.selectedText) {
            // Correct!
            const matchedHanzi = hanzi;
            gameState.matching.matched.add(matchedHanzi);
            gameState.matching.matchedPairs.push({ image: gameState.matching.selectedImage, text: gameState.matching.selectedText });
            gameState.matching.selectedImage = null;
            gameState.matching.selectedText = null;
            gameState.score++;
            playCorrectSound();
            renderMatchingGame();
            if (gameState.matching.matched.size === gameMatchingData.length) {
                setTimeout(() => showGameComplete('太棒了！全部配對成功！', () => {
                    resetMatchingGame();
                    startGameActivity('quiz');
                }), 600);
            }
        } else {
            // Wrong
            const imgEl = document.querySelector(`[data-hanzi="${gameState.matching.selectedImage}"][data-side="image"]`);
            const txtEl = document.querySelector(`[data-hanzi="${gameState.matching.selectedText}"][data-side="text"]`);
            if (imgEl) { imgEl.classList.add('game-shake'); setTimeout(() => imgEl.classList.remove('game-shake'), 400); }
            if (txtEl) { txtEl.classList.add('game-shake'); setTimeout(() => txtEl.classList.remove('game-shake'), 400); }
            gameState.matching.selectedImage = null;
            gameState.matching.selectedText = null;
            setTimeout(() => {
                document.querySelectorAll('.game-matching-image.selected, .game-matching-text.selected').forEach(e => e.classList.remove('selected'));
            }, 400);
        }
    }
}

function drawMatchingLines() {
    const area = document.getElementById('matchingArea');
    if (!area) return;

    // Remove old lines
    area.querySelectorAll('.game-matching-connect').forEach(el => el.remove());

    const areaRect = area.getBoundingClientRect();

    gameState.matching.matchedPairs.forEach((pair, index) => {
        const imgEl = document.querySelector(`.game-matching-image[data-hanzi="${pair.image}"]`);
        const txtEl = document.querySelector(`.game-matching-text[data-hanzi="${pair.text}"]`);
        if (!imgEl || !txtEl) return;

        const imgRect = imgEl.getBoundingClientRect();
        const txtRect = txtEl.getBoundingClientRect();

        const x1 = imgRect.right - areaRect.left;
        const y1 = imgRect.top + imgRect.height / 2 - areaRect.top;
        const x2 = txtRect.left - areaRect.left;
        const y2 = txtRect.top + txtRect.height / 2 - areaRect.top;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        const line = document.createElement('div');
        line.className = 'game-matching-connect';
        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        area.appendChild(line);
        // Animate width from 0 for visual effect
        requestAnimationFrame(() => {
            line.style.transition = 'width 0.3s ease';
            line.style.width = length + 'px';
        });
    });
}

/* ---------- 活動2：文字選擇題 ---------- */

function renderQuizGame() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    const q = gameQuizQuestions[gameState.quiz.currentQ];
    const isLast = gameState.quiz.currentQ === gameQuizQuestions.length - 1;

    const cardsHtml = q.options.map((opt, i) => {
        let cls = 'game-quiz-card';
        if (gameState.quiz.answered) {
            if (Array.isArray(q.correct)) {
                if (q.correct.includes(i)) cls += ' correct';
                else if (gameState.quiz.selected.has(i)) cls += ' wrong';
            } else {
                if (i === q.correct) cls += ' correct';
                else if (gameState.quiz.selected.has(i)) cls += ' wrong';
            }
            cls += ' disabled';
        } else if (gameState.quiz.selected.has(i)) {
            cls += ' selected';
        }
        return `<div class="${cls}" data-idx="${i}" onclick="handleQuizClick(${i})">${opt}</div>`;
    }).join('');

    const multiHint = q.type === 'multi' ? '<div style="font-size:14px;color:#888;margin-bottom:10px;text-align:center;">（可多選）</div>' : '';

    container.innerHTML = `
        <div class="game-page">
            <div class="game-header">
                <button class="game-purple-circle" onclick="backToGameMenu()">◀</button>
                <div class="game-title-pill">文字選擇題</div>
                <div class="game-purple-circle" style="font-size:22px;font-weight:bold;">華</div>
            </div>
            <div class="game-side-tabs">
                <div class="game-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="game-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="game-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="game-side-tab" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="game-side-tab active" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>
            <div class="game-quiz">
                <div style="font-size:16px;color:#8B5CF6;margin-bottom:8px;text-align:center;">題目 ${gameState.quiz.currentQ + 1} / ${gameQuizQuestions.length}</div>
                ${multiHint}
                <div class="game-quiz-question">${q.question}</div>
                <div class="game-quiz-cards">${cardsHtml}</div>
            </div>
            <div class="game-bottom-nav">
                <button class="game-purple-circle" onclick="backToGameMenu()">◀</button>
                <button class="game-purple-circle" onclick="startGameActivity('memory')">▶</button>
            </div>
            <div class="game-star-score ${gameState.score > 0 ? 'earned' : ''}">⭐</div>
        </div>
    `;
}

function handleQuizClick(idx) {
    if (gameState.quiz.answered) return;

    const q = gameQuizQuestions[gameState.quiz.currentQ];
    gameState.quiz.selected.add(idx);

    if (q.type === 'multi') {
        // Multi-select: check if all correct are selected
        const allCorrectSelected = q.correct.every(c => gameState.quiz.selected.has(c));
        const anyWrongSelected = Array.from(gameState.quiz.selected).some(s => !q.correct.includes(s));

        if (anyWrongSelected) {
            gameState.quiz.answered = true;
            renderQuizGame();
            setTimeout(() => {
                if (gameState.quiz.currentQ < gameQuizQuestions.length - 1) {
                    gameState.quiz.currentQ++;
                    gameState.quiz.selected = new Set();
                    gameState.quiz.answered = false;
                    renderQuizGame();
                } else {
                    showGameComplete('太棒了！全部答對了！', () => {
                        resetQuizGame();
                        startGameActivity('memory');
                    });
                }
            }, 1200);
        } else if (allCorrectSelected) {
            gameState.quiz.answered = true;
            gameState.score++;
            playCorrectSound();
            renderQuizGame();
            setTimeout(() => {
                if (gameState.quiz.currentQ < gameQuizQuestions.length - 1) {
                    gameState.quiz.currentQ++;
                    gameState.quiz.selected = new Set();
                    gameState.quiz.answered = false;
                    renderQuizGame();
                } else {
                    showGameComplete('太棒了！全部答對了！', () => {
                        resetQuizGame();
                        startGameActivity('memory');
                    });
                }
            }, 1200);
        } else {
            // Still selecting, just re-render to show selection state
            renderQuizGame();
        }
    } else {
        // Single select
        gameState.quiz.answered = true;
        if (idx === q.correct) {
            gameState.score++;
            playCorrectSound();
        }
        renderQuizGame();
        setTimeout(() => {
            if (gameState.quiz.currentQ < gameQuizQuestions.length - 1) {
                gameState.quiz.currentQ++;
                gameState.quiz.selected = new Set();
                gameState.quiz.answered = false;
                renderQuizGame();
            } else {
                showGameComplete('太棒了！全部答對了！', () => {
                    resetQuizGame();
                    startGameActivity('memory');
                });
            }
        }, 1200);
    }
}

/* ---------- 活動3：記憶力翻牌子 ---------- */

function renderMemoryGame() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    // Initialize cards if empty
    if (gameState.memory.cards.length === 0) {
        const pairs = [...gameMemoryData].sort(() => Math.random() - 0.5).slice(0, 6);
        const deck = [...pairs, ...pairs].map((item, i) => ({ ...item, id: i })).sort(() => Math.random() - 0.5);
        gameState.memory.cards = deck;
    }

    const gridHtml = gameState.memory.cards.map((card, i) => {
        const isFlipped = gameState.memory.flipped.includes(i) || gameState.memory.matched.has(i);
        const isMatched = gameState.memory.matched.has(i);
        return `
            <div class="game-memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}"
                 data-idx="${i}" onclick="handleMemoryClick(${i})">
                <div class="game-memory-card-inner">
                    <div class="game-memory-front">?</div>
                    <div class="game-memory-back">
                        <img src="${card.image}" alt="${card.hanzi}">
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const progress = gameState.memory.matched.size;
    const total = gameState.memory.cards.length;

    container.innerHTML = `
        <div class="game-page">
            <div class="game-header">
                <button class="game-purple-circle" onclick="backToGameMenu()">◀</button>
                <div class="game-title-pill">記憶力翻牌子</div>
                <div class="game-purple-circle" style="font-size:22px;font-weight:bold;">華</div>
            </div>
            <div class="game-side-tabs">
                <div class="game-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="game-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="game-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="game-side-tab" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="game-side-tab active" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>
            <div class="game-memory">
                <div class="game-memory-title">翻開牌子，找出相同的圖案！（${progress}/${total}）</div>
                <div class="game-memory-grid">${gridHtml}</div>
            </div>
            <div class="game-bottom-nav">
                <button class="game-purple-circle" onclick="backToGameMenu()">◀</button>
                <button class="game-purple-circle" onclick="renderWritingPage()">▶</button>
            </div>
            <div class="game-star-score ${gameState.score > 0 ? 'earned' : ''}">⭐</div>
        </div>
    `;
}

function handleMemoryClick(idx) {
    const mem = gameState.memory;
    if (!mem.canFlip) return;
    if (mem.flipped.includes(idx) || mem.matched.has(idx)) return;

    mem.flipped.push(idx);
    renderMemoryGame();

    if (mem.flipped.length === 2) {
        mem.canFlip = false;
        const [a, b] = mem.flipped;
        const cardA = mem.cards[a];
        const cardB = mem.cards[b];

        if (cardA.hanzi === cardB.hanzi) {
            // Match!
            setTimeout(() => {
                mem.matched.add(a);
                mem.matched.add(b);
                mem.flipped = [];
                mem.canFlip = true;
                gameState.score++;
                playCorrectSound();
                renderMemoryGame();
                if (mem.matched.size === mem.cards.length) {
                    setTimeout(() => showGameComplete('太棒了！全部配對成功！', () => {
                        resetMemoryGame();
                        renderWritingPage();
                    }), 600);
                }
            }, 600);
        } else {
            // No match
            setTimeout(() => {
                mem.flipped = [];
                mem.canFlip = true;
                renderMemoryGame();
            }, 1000);
        }
    }
}

/* ---------- 練習寫字環節 ---------- */

function renderWritingPage() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="game-writing-page">
            <button class="game-writing-back-btn" onclick="backToGameMenu()" title="返回">◀</button>
            <div class="game-writing-card">
                <img src="第六頁/練習寫字環節卡片.png?v=2" alt="練習寫字環節"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'game-writing-placeholder\\'>圖片待補</div>';">
            </div>
            <button class="game-writing-done-btn" onclick="goToLevels()" title="完成">✓</button>
        </div>
    `;
}

function goToLevels() {
    goTo('cats');
}

/* ---------- 通用輔助函數 ---------- */

function playCorrectSound() {
    // 使用 Web Audio API 播放簡單的正確音效
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    } catch(e) {}
}

function showGameComplete(message, onNext) {
    playGameConfetti();
    const overlay = document.createElement('div');
    overlay.className = 'game-complete-overlay';
    overlay.innerHTML = `
        <div class="game-complete-box">
            <div class="complete-icon">🎉</div>
            <div class="complete-text">${message}</div>
            <button class="complete-btn" onclick="this.closest('.game-complete-overlay').remove();">繼續</button>
        </div>
    `;
    overlay.querySelector('.complete-btn').addEventListener('click', onNext);
    document.body.appendChild(overlay);
}

function playGameConfetti() {
    const colors = ['#8B5CF6', '#F06292', '#FFD700', '#4CAF50', '#F44336'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'game-confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-10px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.width = (8 + Math.random() * 12) + 'px';
        piece.style.height = (8 + Math.random() * 12) + 'px';
        piece.style.animationDelay = (Math.random() * 0.8) + 's';
        piece.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 4500);
    }
}

function drawLine(elem1, elem2) {
    // 佔位函數 - 待重新設計
}

function resetLineGame() {
    // 佔位函數 - 待重新設計
}

function initMemoryGame() {
    // 佔位函數 - 待重新設計
}

function flipMemoryCard(card) {
    // 佔位函數 - 待重新設計
}

function celebrateWin() {
    createConfetti();
    setTimeout(createConfetti, 300);
    setTimeout(createConfetti, 600);
}

function answerQuiz(btn, isCorrect, soundText) {
    // 佔位函數 - 待重新設計
}

function updateGameScore() {
    const scoreEl = document.getElementById('gameScore');
    if (scoreEl) scoreEl.textContent = AppState.gameScore;
}

// ============================================
// AUDIO - MANDARIN CHINESE (國語/普通話) ONLY
// 嚴格排除廣東話/粵語
// ============================================
// ============================================
// AUDIO - 普通話語音 (國語)
// ============================================
let mandarinVoice = null;

function loadMandarinVoice() {
    const voices = window.speechSynthesis.getVoices();
    
    // 嚴格過濾：只接受普通話，排除粵語/廣東話
    const isCantonese = (v) => {
        const lang = v.lang.toLowerCase();
        const name = v.name.toLowerCase();
        return lang.includes('zh-hk') || 
               lang.includes('zh-hant-hk') ||
               lang.includes('yue') || 
               lang.includes('cantonese') ||
               name.includes('cantonese') ||
               name.includes('hong kong') ||
               name.includes('香港') ||
               name.includes('粵語') ||
               name.includes('廣東') ||
               name.includes('粤') ||
               name.includes('yue');
    };
    
    // 優先選擇中國大陸普通話 (最標準的普通話)
    mandarinVoice = voices.find(v => !isCantonese(v) && v.lang === 'zh-CN') ||
                    voices.find(v => !isCantonese(v) && v.lang === 'zh-Hans-CN') ||
                    voices.find(v => !isCantonese(v) && v.lang === 'cmn-CN') ||
                    voices.find(v => !isCantonese(v) && v.lang === 'zh-Hans') ||
                    voices.find(v => !isCantonese(v) && v.lang.startsWith('zh-CN')) ||
                    // 台灣國語也是普通話
                    voices.find(v => !isCantonese(v) && v.lang === 'zh-TW') ||
                    voices.find(v => !isCantonese(v) && v.lang === 'zh-Hant-TW') ||
                    voices.find(v => !isCantonese(v) && v.lang.startsWith('zh-TW'));
    
    if (mandarinVoice) {
        console.log('使用普通話語音:', mandarinVoice.name, mandarinVoice.lang);
    } else {
        console.log('未找到普通話語音，可用語音:', voices.map(v => v.name + '(' + v.lang + ')'));
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utter = new SpeechSynthesisUtterance(text);
        // 強制使用普通話
        utter.lang = 'zh-CN';
        utter.rate = 0.85;
        utter.pitch = 1.1;
        utter.volume = 1;
        
        // 確保使用普通話語音
        if (!mandarinVoice) {
            loadMandarinVoice();
        }
        if (mandarinVoice) {
            utter.voice = mandarinVoice;
            console.log('使用語音:', mandarinVoice.name, mandarinVoice.lang);
        }
        
        window.speechSynthesis.speak(utter);
    }
}

// 等待語音加載
if ('speechSynthesis' in window) {
    // 立即嘗試加載
    loadMandarinVoice();
    
    // 語音改變時重新加載
    window.speechSynthesis.onvoiceschanged = function() {
        console.log('語音列表已更新，重新加載普通話語音...');
        loadMandarinVoice();
    };
}

// ============================================
// CELEBRATION EFFECTS
// ============================================
function createConfetti() {
    const colors = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    const container = document.createElement('div');
    container.className = 'celebration';
    document.body.appendChild(container);
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);
    }
    
    setTimeout(() => container.remove(), 3000);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (AppState.currentPage === 'learning') {
        if (e.key === 'ArrowRight') nextSection();
        if (e.key === 'ArrowLeft') prevSection();
    }
});

// ============================================
// LEVELS PAGE - LEARNING PARTNER
// ============================================
function initLevelPartner() {
    const partnerEl = document.getElementById('levelPartner');
    if (!partnerEl) return;
    
    const speechEl = document.getElementById('levelPartnerSpeech');
    const avatarEl = partnerEl.querySelector('.level-partner-avatar');
    if (!speechEl || !avatarEl) return;
    
    // Show greeting on page load
    speechEl.classList.remove('hidden');
    
    // Hide after 15 seconds
    setTimeout(() => {
        speechEl.classList.add('hidden');
    }, 15000);
    
    // Show on hover
    avatarEl.addEventListener('mouseenter', () => {
        speechEl.classList.remove('hidden');
    });
    avatarEl.addEventListener('mouseleave', () => {
        speechEl.classList.add('hidden');
    });
}

function hideLevelPartnerSpeech() {
    const speechEl = document.getElementById('levelPartnerSpeech');
    if (speechEl) speechEl.classList.add('hidden');
}

// CATS PAGE - LEARNING PARTNER
// ============================================
function initCatsPartner() {
    const partnerEl = document.getElementById('catsPartner');
    if (!partnerEl) return;
    
    const speechEl = document.getElementById('catsPartnerSpeech');
    const avatarEl = partnerEl.querySelector('.cats-partner-avatar');
    if (!speechEl || !avatarEl) return;
    
    // Show greeting on page load
    speechEl.classList.remove('hidden');
    
    // Hide after 15 seconds
    setTimeout(() => {
        speechEl.classList.add('hidden');
    }, 15000);
    
    // Show on hover
    avatarEl.addEventListener('mouseenter', () => {
        speechEl.classList.remove('hidden');
    });
    avatarEl.addEventListener('mouseleave', () => {
        speechEl.classList.add('hidden');
    });
}

function hideCatsPartnerSpeech() {
    const speechEl = document.getElementById('catsPartnerSpeech');
    if (speechEl) speechEl.classList.add('hidden');
}

// CHAPTERS PAGE - LEARNING PARTNER
// ============================================
function initChaptersPartner() {
    const partnerEl = document.getElementById('chaptersPartner');
    if (!partnerEl) return;
    
    const speechEl = document.getElementById('chaptersPartnerSpeech');
    const avatarEl = partnerEl.querySelector('.chapters-partner-avatar');
    if (!speechEl || !avatarEl) return;
    
    // Show greeting on page load
    speechEl.classList.remove('hidden');
    
    // Hide after 15 seconds
    setTimeout(() => {
        speechEl.classList.add('hidden');
    }, 15000);
    
    // Show on hover
    avatarEl.addEventListener('mouseenter', () => {
        speechEl.classList.remove('hidden');
    });
    avatarEl.addEventListener('mouseleave', () => {
        speechEl.classList.add('hidden');
    });
}

function hideChaptersPartnerSpeech() {
    const speechEl = document.getElementById('chaptersPartnerSpeech');
    if (speechEl) speechEl.classList.add('hidden');
}

// PARTNER GREETING (學習夥伴問候語)
// ============================================
function initPartnerGreeting(pageId) {
    const greetingEl = document.getElementById(pageId + 'PartnerGreeting');
    if (!greetingEl) return;
    
    const speechEl = greetingEl.querySelector('.partner-speech');
    const avatarEl = greetingEl.querySelector('.partner-avatar');
    if (!speechEl || !avatarEl) return;
    
    // Show greeting on page load
    speechEl.classList.remove('hidden');
    
    // Hide after 15 seconds
    const hideTimer = setTimeout(() => {
        speechEl.classList.add('hidden');
    }, 15000);
    
    // Show on hover
    avatarEl.addEventListener('mouseenter', () => {
        speechEl.classList.remove('hidden');
    });
    avatarEl.addEventListener('mouseleave', () => {
        speechEl.classList.add('hidden');
    });
}

// ============================================
// POEMS PAGE - FORCE INTERCEPT ALL CLICKS
// ============================================
// 強制攔截所有詩歌卡片的點擊事件
function initPoemBoxHandlers() {
    const poemsGrid = document.querySelector('.poems-grid');
    if (!poemsGrid) return;
    
    // 使用 capture phase 確保最先攔截事件
    poemsGrid.addEventListener('click', function(e) {
        const box = e.target.closest('.poem-box');
        if (!box) return;
        
        // 完全阻止默認行為
        e.preventDefault();
        e.stopPropagation();
        
        // 獲取 onclick 屬性中的 URL
        const onclickAttr = box.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/showVideoModal\(['"](.+?)['"]\)/);
            if (match && match[1]) {
                showVideoModal(match[1]);
            }
        }
        
        return false;
    }, true); // true = capture phase
}

// 頁面加載後初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPoemBoxHandlers);
} else {
    initPoemBoxHandlers();
}

// 頁面切換時也重新初始化
const originalGoTo = window.goTo;
if (originalGoTo) {
    window.goTo = function(page) {
        setTimeout(initPoemBoxHandlers, 100);
        return originalGoTo.apply(this, arguments);
    };
}

console.log('🦁 大地幼教学材已加载');
// Cache bust: 1774964562


// ============================================
// QUIZ SYSTEM - 課前提問
// ============================================

const quizData = [
    {
        type: 'choice',
        mode: 'multi',
        question: '小朋友，你知道我們的身體有哪些部位嗎？點擊正確的答案！',
        options: [
            { icon: '👄', label: '嘴巴', correct: true },
            { icon: '👂', label: '耳朵', correct: true },
            { icon: '👁️', label: '眼睛', correct: true },
            { icon: '🪑', label: '椅子', correct: false }
        ]
    },
    {
        type: 'choice',
        mode: 'single',
        question: '小鳥唱歌，我們用什麼來聽呢？',
        options: [
            { icon: '👄', label: '嘴巴', correct: false },
            { icon: '🖐️', label: '手', correct: false },
            { icon: '👁️', label: '眼睛', correct: false },
            { icon: '👂', label: '耳朵', correct: true }
        ]
    },
    {
        type: 'choice',
        mode: 'single',
        question: '看美麗的花朵，我們用什麼來看呢？',
        options: [
            { icon: '👃', label: '鼻子', correct: false },
            { icon: '👁️', label: '眼睛', correct: true },
            { icon: '👂', label: '耳朵', correct: false },
            { icon: '👄', label: '嘴巴', correct: false }
        ]
    },
    {
        type: 'choice',
        mode: 'single',
        question: '拿玩具、抱抱媽媽，我們用什麼呢？',
        options: [
            { icon: '🦶', label: '腳', correct: false },
            { icon: '👁️', label: '眼睛', correct: false },
            { icon: '🖐️', label: '手', correct: true },
            { icon: '👂', label: '耳朵', correct: false }
        ]
    },
    {
        type: 'photo',
        target: '眉毛',
        question: '眉毛在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '眉毛',
        regions: [
            { x1: 33, y1: 38.5, x2: 43, y2: 41.5, cx: 38, cy: 40 },
            { x1: 56.5, y1: 38.5, x2: 66.5, y2: 41.5, cx: 62, cy: 40 }
        ]
    },
    {
        type: 'photo',
        target: '眼睛',
        question: '眼睛在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '眼睛',
        regions: [
            { x1: 35.5, y1: 43, x2: 43.5, y2: 48.5, cx: 39.5, cy: 46 },
            { x1: 56.5, y1: 43, x2: 64.5, y2: 48.5, cx: 60.5, cy: 46 }
        ]
    },
    {
        type: 'photo',
        target: '鼻子',
        question: '鼻子在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '鼻子',
        regions: [
            { x1: 47, y1: 50, x2: 53, y2: 57.5, cx: 50, cy: 53.5 }
        ]
    },
    {
        type: 'photo',
        target: '耳朵',
        question: '耳朵在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '耳朵',
        regions: [
            { x1: 23, y1: 47.5, x2: 30, y2: 58, cx: 26.5, cy: 52.5 },
            { x1: 70.5, y1: 47.5, x2: 77.5, y2: 58, cx: 73.5, cy: 52.5 }
        ]
    },
    {
        type: 'photo',
        target: '嘴巴',
        question: '嘴巴在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '嘴巴',
        regions: [
            { x1: 45.5, y1: 62, x2: 54.5, y2: 67, cx: 50, cy: 64.5 }
        ]
    }
];

let quizState = {
    currentIndex: 0,
    scores: new Array(9).fill(false),
    selectedCards: new Set(),
    photoMarked: false,
    markers: []
};

function playPopSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 600;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
}

function initQuiz() {
    quizState.currentIndex = 0;
    quizState.scores = new Array(9).fill(false);
    quizState.selectedCards = new Set();
    quizState.photoMarked = false;
    quizState.markers = [];
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    const q = quizData[quizState.currentIndex];
    const isLast = quizState.currentIndex === quizData.length - 1;
    const hasScore = quizState.scores[quizState.currentIndex];
    
    let html = `
        <div class="quiz-header">
            <button class="quiz-pink-circle" onclick="goTo('intro', event)">◀</button>
            <div class="quiz-title-pill">課前提問</div>
            <div class="quiz-pink-circle" style="font-size:22px;font-weight:bold;">華</div>
        </div>
        <div class="quiz-side-tabs">
            <div class="quiz-side-tab active" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
        </div>
        <div class="quiz-star-score ${hasScore ? 'earned' : ''}" id="quizStar">⭐</div>
    `;
    
    if (q.type === 'choice') {
        html += renderChoiceQuestion(q);
    } else {
        html += renderPhotoQuestion(q);
    }
    
    html += `
        <div class="quiz-bottom-nav">
            <button class="quiz-pink-circle" onclick="prevQuiz()" ${quizState.currentIndex === 0 ? 'style="opacity:0.3;pointer-events:none;"' : ''}>◀</button>
            <button class="quiz-pink-circle" onclick="nextQuiz()" ${isLast ? 'style="opacity:0.3;pointer-events:none;"' : ''}>▶</button>
        </div>
    `;
    
    container.innerHTML = html;
}

function renderChoiceQuestion(q) {
    const cardsHtml = q.options.map((opt, i) => {
        let stateClass = '';
        const isSelected = quizState.selectedCards.has(i);
        if (isSelected) {
            stateClass = opt.correct ? 'correct' : 'wrong';
        }
        return `
            <div class="quiz-card ${stateClass}" onclick="handleCardClick(${i}, ${opt.correct})">
                <div class="quiz-card-icon">${opt.icon}</div>
                <div class="quiz-card-label">${opt.label}</div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="quiz-choice-mode">
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-cards">${cardsHtml}</div>
        </div>
    `;
}

function renderPhotoQuestion(q) {
    const buttonsHtml = q.buttons.map(btn => {
        const isActive = btn === q.activeButton;
        return `<div class="quiz-photo-btn ${isActive ? 'active' : ''}">${btn}</div>`;
    }).join('');
    
    // 渲染所有已保存的標記
    const markersHtml = quizState.markers.map(m => 
        `<div class="quiz-marker" style="width:${m.w}px;height:${m.h}px;left:${m.left}%;top:${m.top}%;"></div>`
    ).join('');
    
    return `
        <div class="quiz-photo-mode">
            <div class="quiz-photo-question">${q.question}</div>
            <div class="quiz-photo-left">${buttonsHtml}</div>
            <div class="quiz-photo-area" id="photoArea" onclick="handlePhotoClick(event)">
                <img src="真人圖片標記_11課身體.png" alt="真人照片">
                ${markersHtml}
            </div>
        </div>
    `;
}

function handleCardClick(index, isCorrect) {
    const q = quizData[quizState.currentIndex];
    
    if (q.mode === 'multi') {
        if (quizState.selectedCards.has(index)) {
            quizState.selectedCards.delete(index);
        } else {
            quizState.selectedCards.add(index);
        }
        
        const correctIndices = q.options.map((o, i) => o.correct ? i : -1).filter(i => i !== -1);
        const allCorrectSelected = correctIndices.every(i => quizState.selectedCards.has(i));
        const noWrongSelected = Array.from(quizState.selectedCards).every(i => q.options[i].correct);
        
        if (allCorrectSelected && noWrongSelected) {
            if (!quizState.scores[quizState.currentIndex]) {
                quizState.scores[quizState.currentIndex] = true;
                playConfetti();
            }
        }
        
        renderQuiz();
    } else {
        if (isCorrect) {
            quizState.selectedCards = new Set([index]);
            if (!quizState.scores[quizState.currentIndex]) {
                quizState.scores[quizState.currentIndex] = true;
                playConfetti();
            }
        } else {
            quizState.selectedCards = new Set([index]);
        }
        renderQuiz();
    }
}

function handlePhotoClick(event) {
    const q = quizData[quizState.currentIndex];
    const area = document.getElementById('photoArea');
    if (!area || !q.regions) return;
    
    const rect = area.getBoundingClientRect();
    const xPct = ((event.clientX - rect.left) / rect.width) * 100;
    const yPct = ((event.clientY - rect.top) / rect.height) * 100;
    
    // 檢查是否落在正確區域內
    let matchedRegion = null;
    for (const r of q.regions) {
        if (xPct >= r.x1 && xPct <= r.x2 && yPct >= r.y1 && yPct <= r.y2) {
            matchedRegion = r;
            break;
        }
    }
    
    if (matchedRegion) {
        // 正確！
        playPopSound();
        
        // 保存標記
        quizState.markers.push({
            left: matchedRegion.cx,
            top: matchedRegion.cy,
            w: 80,
            h: 50
        });
        
        if (!quizState.scores[quizState.currentIndex]) {
            quizState.scores[quizState.currentIndex] = true;
        }
        
        renderQuiz();
        
        // 最後一題播放紙屑並清除標記
        if (quizState.currentIndex === quizData.length - 1) {
            setTimeout(() => {
                playConfetti();
                setTimeout(() => {
                    quizState.markers = [];
                    renderQuiz();
                }, 3000);
            }, 400);
        } else {
            // 自動進入下一題
            setTimeout(() => {
                nextQuiz();
            }, 800);
        }
    } else {
        // 錯誤！顯示紅叉 + 震動
        const wrongEl = document.createElement('div');
        wrongEl.className = 'quiz-photo-wrong';
        wrongEl.textContent = '✕';
        wrongEl.style.left = xPct + '%';
        wrongEl.style.top = yPct + '%';
        area.appendChild(wrongEl);
        
        area.classList.add('shake');
        setTimeout(() => {
            area.classList.remove('shake');
            wrongEl.remove();
        }, 600);
    }
}

function nextQuiz() {
    if (quizState.currentIndex < quizData.length - 1) {
        quizState.currentIndex++;
        quizState.selectedCards = new Set();
        quizState.photoMarked = false;
        quizState.markers = [];
        renderQuiz();
    }
}

function prevQuiz() {
    if (quizState.currentIndex > 0) {
        quizState.currentIndex--;
        quizState.selectedCards = new Set();
        quizState.photoMarked = false;
        quizState.markers = [];
        renderQuiz();
    }
}

function playConfetti() {
    const colors = ['#F06292', '#F44336', '#FFD700', '#4CAF50', '#2196F3'];
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-10px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.width = (8 + Math.random() * 10) + 'px';
        piece.style.height = (8 + Math.random() * 10) + 'px';
        piece.style.animationDelay = (Math.random() * 0.5) + 's';
        piece.style.animationDuration = (2 + Math.random() * 1.5) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3500);
    }
}

/* ============================================
   識圖模塊 (Recognition Module)
   ============================================ */

const recognitionData = [
    { hanzi: '頭', pinyin: 'tóu',   definition: '我的頭在這裡。',   color: '#FF6B6B', image: '課程介紹頁/real_head.png',  audio: '課程介紹頁/audio_tou.mp3' },
    { hanzi: '耳', pinyin: 'ěr',    definition: '我用耳朵聽聲音。', color: '#4ECDC4', image: '課程介紹頁/real_ear.png',   audio: '課程介紹頁/audio_er.mp3' },
    { hanzi: '脚', pinyin: 'jiǎo',  definition: '我用腳走路。',     color: '#45B7D1', image: '課程介紹頁/real_foot.png',  audio: '課程介紹頁/audio_jiao.mp3' },
    { hanzi: '鼻', pinyin: 'bí',    definition: '我用鼻子聞香味。', color: '#96CEB4', image: '課程介紹頁/real_nose.png',  audio: '課程介紹頁/audio_bi.mp3' },
    { hanzi: '眼', pinyin: 'yǎn',   definition: '我用眼睛看東西。', color: '#FFEAA7', image: '課程介紹頁/real_eye.png',   audio: '課程介紹頁/audio_yan.mp3' },
    { hanzi: '口', pinyin: 'kǒu',   definition: '我用嘴巴吃東西。', color: '#DDA0DD', image: '課程介紹頁/real_mouth.png', audio: '課程介紹頁/audio_kou.mp3' },
    { hanzi: '手', pinyin: 'shǒu',  definition: '我用手拿東西。',   color: '#98D8C8', image: '課程介紹頁/real_hand.png', audio: '課程介紹頁/audio_shou.mp3' }
];

let recognitionState = {
    currentIndex: 0
};

function initRecognition() {
    recognitionState.currentIndex = 0;
    renderRecognition();
}

function renderRecognition() {
    const container = document.getElementById('recognitionContainer');
    if (!container) return;

    const item = recognitionData[recognitionState.currentIndex];
    const isFirst = recognitionState.currentIndex === 0;
    const isLast = recognitionState.currentIndex === recognitionData.length - 1;

    const html = `
        <div class="recognition-page">
            <!-- 頭部 -->
            <div class="rec-header">
                <button class="rec-blue-circle" onclick="switchLearningModule('quiz')">◀</button>
                <div class="rec-title-pill">識圖</div>
                <div class="rec-blue-circle" style="font-size:22px;font-weight:bold;margin-right:12px;">華</div>
            </div>

            <!-- 右側功能標籤 -->
            <div class="rec-side-tabs">
                <div class="rec-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="rec-side-tab active" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="rec-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="rec-side-tab" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="rec-side-tab" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>

            <!-- 主內容 -->
            <div class="rec-content">
                <!-- 詞彙導航 -->
                <div class="rec-word-nav">
                    ${recognitionData.map((w, i) => `
                        <button class="rec-word-btn ${i === recognitionState.currentIndex ? 'active' : ''}" onclick="goToRecognition(${i})">${w.hanzi}</button>
                    `).join('')}
                </div>

                <!-- 圖片與文字區域 -->
                <div class="rec-main-area">
                    <!-- 左側圖片 -->
                    <div class="rec-image-area">
                        <img src="${item.image}" alt="${item.hanzi}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                        <div style="width:100%;height:100%;border-radius:24px;display:none;align-items:center;justify-content:center;background:${item.color}22;border:4px dashed ${item.color};box-shadow:0 8px 30px rgba(0,0,0,0.12);">
                            <div style="text-align:center;">
                                <div style="font-size:120px;color:${item.color};font-weight:bold;">${item.hanzi}</div>
                                <div style="font-size:16px;color:#888;margin-top:10px;">身體部位示意圖</div>
                            </div>
                        </div>
                    </div>

                    <!-- 右側文字 -->
                    <div class="rec-text-area">
                        <button class="rec-speaker" onclick="playPronunciation()" title="朗讀">🔊</button>
                        <div class="rec-pinyin">${item.pinyin}</div>
                        <div class="rec-hanzi">${item.hanzi}</div>
                        <div class="rec-definition">${item.definition}</div>
                    </div>
                </div>
            </div>

            <!-- 底部導航 -->
            <div class="rec-bottom-nav">
                <button class="rec-blue-circle" onclick="prevRecognition()" ${recognitionState.currentIndex === 0 ? 'style="opacity:0.3;pointer-events:none;"' : ''}>◀</button>
                <button class="rec-blue-circle" onclick="nextRecognition()" ${recognitionState.currentIndex === recognitionData.length - 1 ? 'style="opacity:0.3;pointer-events:none;"' : ''}>▶</button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

let recCurrentAudio = null;

function playPronunciation() {
    const btn = document.querySelector('.rec-speaker');
    const item = recognitionData[recognitionState.currentIndex];
    
    // 停止之前的音檔
    if (recCurrentAudio) {
        recCurrentAudio.pause();
        recCurrentAudio.currentTime = 0;
    }
    
    // 創建新的 Audio 物件
    recCurrentAudio = new Audio(item.audio);
    
    // 播放開始時添加動畫
    if (btn) btn.classList.add('playing');
    
    recCurrentAudio.onended = function() {
        if (btn) btn.classList.remove('playing');
        recCurrentAudio = null;
    };
    
    recCurrentAudio.onerror = function() {
        if (btn) btn.classList.remove('playing');
        recCurrentAudio = null;
    };
    
    recCurrentAudio.play().catch(() => {
        if (btn) btn.classList.remove('playing');
        recCurrentAudio = null;
    });
}

function goToRecognition(index) {
    if (index >= 0 && index < recognitionData.length) {
        recognitionState.currentIndex = index;
        renderRecognition();
    }
}

function nextRecognition() {
    if (recognitionState.currentIndex < recognitionData.length - 1) {
        recognitionState.currentIndex++;
        renderRecognition();
    }
}

function prevRecognition() {
    if (recognitionState.currentIndex > 0) {
        recognitionState.currentIndex--;
        renderRecognition();
    }
}

/* ============================================
   學習模塊切換 (Learning Module Switcher)
   ============================================ */

function switchLearningModule(module) {
    const quizContainer = document.getElementById('quizContainer');
    const recognitionContainer = document.getElementById('recognitionContainer');
    const writingContainer = document.getElementById('writingContainer');
    const storyContainer = document.getElementById('storyContainer');
    const gameContainer = document.getElementById('gameContainer');
    const learnMain = document.querySelector('.learn-main');
    const learningPage = document.getElementById('learningPage');

    if (!quizContainer || !recognitionContainer) return;

    // 全部隱藏
    quizContainer.style.display = 'none';
    recognitionContainer.style.display = 'none';
    if (writingContainer) writingContainer.style.display = 'none';
    if (storyContainer) storyContainer.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'none';
    if (learnMain) learnMain.style.display = 'none';

    // 移除所有主題類
    if (learningPage) {
        learningPage.classList.remove('theme-pink');
    }

    switch (module) {
        case 'quiz':
            quizContainer.style.display = 'block';
            if (learningPage) {
                learningPage.classList.add('theme-pink');
                learningPage.style.borderColor = '#F06292';
            }
            renderQuiz();
            break;
        case 'recognition':
            recognitionContainer.style.display = 'block';
            if (learningPage) {
                learningPage.style.borderColor = '#0054a6';
            }
            renderRecognition();
            break;
        case 'writing':
            if (writingContainer) writingContainer.style.display = 'block';
            if (learningPage) {
                learningPage.style.borderColor = '#F5A623';
            }
            initWriting();
            break;
        case 'story':
            if (storyContainer) storyContainer.style.display = 'block';
            if (learningPage) {
                learningPage.style.borderColor = '#4CAF50';
            }
            initStory();
            break;
        case 'game':
            if (gameContainer) gameContainer.style.display = 'block';
            if (learningPage) {
                learningPage.style.borderColor = '#8B5CF6';
            }
            initGame();
            break;
        default:
            quizContainer.style.display = 'block';
            if (learningPage) learningPage.classList.add('theme-pink');
    }
}

/* ============================================
   書寫練習模塊 (Writing Practice Module)
   ============================================ */

const writingData = [
    {
        hanzi: '頭', pinyin: 'tóu', simpleHanzi: '头',
        videoTraditional: 'videos/stroke/tou_fanti.mp4',
        videoSimplified: 'videos/stroke/tou_jianti.mp4'
    },
    {
        hanzi: '耳', pinyin: 'ěr', simpleHanzi: '耳',
        videoTraditional: 'videos/stroke/er.mp4',
        videoSimplified: 'videos/stroke/er.mp4'
    },
    {
        hanzi: '腳', pinyin: 'jiǎo', simpleHanzi: '脚',
        videoTraditional: 'videos/stroke/jiao_fanti.mp4',
        videoSimplified: 'videos/stroke/jiao_jianti.mp4'
    },
    {
        hanzi: '鼻', pinyin: 'bí', simpleHanzi: '鼻',
        videoTraditional: 'videos/stroke/bi.mp4',
        videoSimplified: 'videos/stroke/bi.mp4'
    },
    {
        hanzi: '眼', pinyin: 'yǎn', simpleHanzi: '眼',
        videoTraditional: 'videos/stroke/yan.mp4',
        videoSimplified: 'videos/stroke/yan.mp4'
    },
    {
        hanzi: '口', pinyin: 'kǒu', simpleHanzi: '口',
        videoTraditional: 'videos/stroke/kou.mp4',
        videoSimplified: 'videos/stroke/kou.mp4'
    },
    {
        hanzi: '手', pinyin: 'shǒu', simpleHanzi: '手',
        videoTraditional: 'videos/stroke/shou.mp4',
        videoSimplified: 'videos/stroke/shou.mp4'
    }
];

let writingState = {
    currentIndex: 0,
    isAnimating: false
};

function initWriting() {
    writingState.currentIndex = 0;
    writingState.isAnimating = false;
    renderWriting();
}

function renderWriting() {
    const container = document.getElementById('writingContainer');
    if (!container) return;

    const item = writingData[writingState.currentIndex];
    const isFirst = writingState.currentIndex === 0;
    const isLast = writingState.currentIndex === writingData.length - 1;

    const html = `
        <div class="writing-page">
            <!-- 頭部 -->
            <div class="writing-header">
                <button class="writing-orange-circle" onclick="switchLearningModule('recognition')">◀</button>
                <div class="writing-title-pill">書寫練習</div>
                <div class="writing-orange-circle" style="font-size:22px;font-weight:bold;margin-right:12px;">華</div>
            </div>

            <!-- 右側功能標籤 -->
            <div class="writing-side-tabs">
                <div class="writing-side-tab" onclick="switchLearningModule('quiz')"><span>❓</span> 課前提問</div>
                <div class="writing-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> 識圖</div>
                <div class="writing-side-tab active" onclick="switchLearningModule('writing')"><span>✏️</span> 書寫練習</div>
                <div class="writing-side-tab" onclick="switchLearningModule('story')"><span>📚</span> 故事繪本</div>
                <div class="writing-side-tab" onclick="switchLearningModule('game')"><span>🎮</span> 遊戲活動</div>
            </div>

            <!-- 主內容 -->
            <div class="writing-content">
                <!-- 左側字詞選擇 -->
                <div class="writing-word-grid">
                    ${writingData.map((w, i) => `
                        <button class="writing-grid-btn ${i === writingState.currentIndex ? 'active' : ''}" onclick="goToWriting(${i})">${w.hanzi}</button>
                    `).join('')}
                </div>

                <!-- 中間練習區 -->
                <div class="writing-practice-area">
                    <!-- 大字範本區 -->
                    <div class="writing-model-wrapper">
                        <div class="writing-model-box" id="writingModelBox">
                            <svg class="writing-rice-grid" viewBox="0 0 200 200">
                                <line x1="100" y1="0" x2="100" y2="200" />
                                <line x1="0" y1="100" x2="200" y2="100" />
                                <line x1="0" y1="0" x2="200" y2="200" />
                                <line x1="200" y1="0" x2="0" y2="200" />
                            </svg>
                            <div class="writing-model-char">${item.hanzi}</div>
                            <video 
                                id="writingStrokeVideo"
                                class="writing-stroke-video"
                                style="display:none;"
                                preload="auto"
                                autoplay
                                playsinline
                                muted
                                onended="hideWritingVideo()"
                            ></video>
                        </div>
                        <button class="writing-pencil-btn" onclick="playWritingAnimation()" title="筆順動畫">✏️</button>
                    </div>

                    <!-- 手寫練習區 -->
                    <div class="writing-canvas-area">
                        <div class="writing-canvas-box" id="writingCanvasBox">
                            <canvas id="writingCanvas" width="640" height="640"></canvas>
                        </div>
                        <div class="writing-action-btns">
                            <button class="writing-btn-clear" onclick="clearWritingCanvas()">清除</button>
                            <button class="writing-btn-done" onclick="nextWritingWord()">完成</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部導航 -->
            <div class="writing-bottom-nav">
                <button class="writing-orange-circle" onclick="prevWritingWord()" ${isFirst ? 'style="opacity:0.3;pointer-events:none;"' : ''}>◀</button>
                <button class="writing-orange-circle" onclick="nextWritingWord()" ${isLast ? 'style="opacity:0.3;pointer-events:none;"' : ''}>▶</button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // 初始化 Canvas
    setTimeout(initWritingCanvas, 50);
}

/* ============================================
   筆順動畫
   ============================================ */

function getWritingVideoUrl(item) {
    // 根據當前語言選擇對應視頻
    const isSimplified = AppState.language === 'zh-CN';
    return isSimplified ? item.videoSimplified : item.videoTraditional;
}

function hideWritingVideo() {
    const video = document.getElementById('writingStrokeVideo');
    if (video) {
        video.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    }
    writingState.isAnimating = false;
}

function playWritingAnimation() {
    const item = writingData[writingState.currentIndex];
    const video = document.getElementById('writingStrokeVideo');
    if (!video) {
        console.error('找不到 video 元素 #writingStrokeVideo');
        return;
    }

    const videoUrl = getWritingVideoUrl(item);
    console.log('播放筆順動畫視頻:', videoUrl);

    if (!videoUrl) {
        console.error('找不到對應視頻路徑');
        return;
    }

    // 如果正在播放，先停止
    video.pause();
    video.currentTime = 0;

    // 設置新視頻源
    video.src = videoUrl;
    video.load();

    // 顯示並播放
    video.style.display = 'block';
    writingState.isAnimating = true;

    // 確保視頻加載後再播放
    video.onloadeddata = function() {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.error('視頻播放失敗:', err);
                hideWritingVideo();
            });
        }
    };

    video.onerror = function() {
        console.error('視頻載入失敗:', videoUrl);
        hideWritingVideo();
    };
}

/* ============================================
   Canvas 手寫功能
   ============================================ */

let writingCanvasCtx = null;
let writingIsDrawing = false;

function initWritingCanvas() {
    const canvas = document.getElementById('writingCanvas');
    const box = document.getElementById('writingCanvasBox');
    if (!canvas || !box) return;

    // 設置 Canvas 實際像素尺寸與顯示尺寸一致
    const rect = box.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#333333';
    writingCanvasCtx = ctx;

    // 綁定事件
    canvas.addEventListener('mousedown', writingStartDraw);
    canvas.addEventListener('mousemove', writingDraw);
    canvas.addEventListener('mouseup', writingEndDraw);
    canvas.addEventListener('mouseleave', writingEndDraw);

    // 觸摸事件
    canvas.addEventListener('touchstart', writingTouchStart, { passive: false });
    canvas.addEventListener('touchmove', writingTouchMove, { passive: false });
    canvas.addEventListener('touchend', writingEndDraw);
}

function getCanvasPos(e) {
    const canvas = document.getElementById('writingCanvas');
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function writingStartDraw(e) {
    writingIsDrawing = true;
    const pos = getCanvasPos(e);
    if (writingCanvasCtx) {
        writingCanvasCtx.beginPath();
        writingCanvasCtx.moveTo(pos.x, pos.y);
    }
}

function writingDraw(e) {
    if (!writingIsDrawing || !writingCanvasCtx) return;
    const pos = getCanvasPos(e);
    writingCanvasCtx.lineTo(pos.x, pos.y);
    writingCanvasCtx.stroke();
}

function writingEndDraw() {
    writingIsDrawing = false;
    if (writingCanvasCtx) {
        writingCanvasCtx.beginPath();
    }
}

function writingTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    e.target.dispatchEvent(mouseEvent);
}

function writingTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    e.target.dispatchEvent(mouseEvent);
}

function clearWritingCanvas() {
    const canvas = document.getElementById('writingCanvas');
    if (!canvas || !writingCanvasCtx) return;
    const rect = canvas.getBoundingClientRect();
    writingCanvasCtx.clearRect(0, 0, rect.width * 2, rect.height * 2);
}

function nextWritingWord() {
    if (writingState.currentIndex < writingData.length - 1) {
        writingState.currentIndex++;
        renderWriting();
    }
}

function prevWritingWord() {
    if (writingState.currentIndex > 0) {
        writingState.currentIndex--;
        renderWriting();
    }
}

function goToWriting(index) {
    if (index >= 0 && index < writingData.length) {
        writingState.currentIndex = index;
        renderWriting();
    }
}
