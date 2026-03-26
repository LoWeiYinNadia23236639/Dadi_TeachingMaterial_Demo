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
        inputName: '輸入你的名字',
        confirm: '確定',
        selectCharHint: '請選擇一個學習夥伴！',
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
        inputName: '输入你的名字',
        confirm: '确定',
        selectCharHint: '请选择一个学习伙伴！',
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
    
    // 更新按鈕狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('lang-' + (lang === 'zh-TW' ? 'TW' : 'CN')).classList.add('active');
    
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
    const charImg = charId ? charId.replace('char', '') : '1';
    
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
            <img src="char${charImg}.png" alt="學習夥伴">
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
    if (AppState.currentPage === 'learning') {
        showGuideCharacter('learning');
    }
}

// ============================================
// NAVIGATION
// ============================================
function goTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + pageId);
    if (page) page.classList.add('active');
    AppState.currentPage = pageId;
    
    // 在每個頁面顯示角色引導（除了歡迎頁和角色選擇頁）
    if (pageId !== 'welcome' && pageId !== 'chars') {
        setTimeout(() => {
            showGuideCharacter(pageId);
        }, 150);
    }
    
    if (pageId === 'learning') {
        setTimeout(initCanvas, 100);
        // 初始化顯示第一個部分
        setTimeout(() => {
            showSectionGroup('intro');
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
    document.querySelectorAll('.char-item').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');
    AppState.selectedChar = { id: charId };
    
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) confirmBtn.classList.add('show');
}

function confirmChar() {
    const nameInput = document.getElementById('playerName');
    if (!nameInput.value.trim()) {
        alert(t('inputName') + '！');
        return;
    }
    if (!AppState.selectedChar) {
        alert(t('selectCharAlert'));
        return;
    }
    AppState.playerName = nameInput.value.trim();
    
    // 保存選擇的角色到本地存儲
    localStorage.setItem('selectedCharacter', JSON.stringify(AppState.selectedChar));
    
    goTo('levels');
    
    // 在程度選擇頁面顯示角色引導
    setTimeout(() => {
        showGuideCharacter('levels');
    }, 100);
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

function openChapter(num) {
    goTo('intro');
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
    
    // 初始化活動頁面遊戲
    if (index === 10) {
        setTimeout(() => {
            initMatchingGame();
        }, 100);
    }
    
    // 如果是識圖部分，顯示子導航
    updateSubNavVisibility(index);
    
    // 更新角色引導對話
    setTimeout(() => {
        updateGuideMessage();
    }, 300);
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

// 更新識圖部分的描述文字
function updateBodyPartDescriptions() {
    // 更新各個識圖section的描述
    const descriptions = [
        { index: 1, key: 'descEye' },
        { index: 2, key: 'descEar' },
        { index: 3, key: 'descNose' },
        { index: 4, key: 'descMouth' },
        { index: 5, key: 'descHand' },
        { index: 6, key: 'descFoot' },
        { index: 7, key: 'descHead' }
    ];
    
    descriptions.forEach(({ index, key }) => {
        const section = document.querySelector(`.section-content[data-section="${index}"]`);
        if (section) {
            const descEl = section.querySelector('.part-description');
            if (descEl) {
                descEl.textContent = t(key);
            }
            // 更新按鈕文字
            const audioBtn = section.querySelector('.audio-btn');
            if (audioBtn) {
                audioBtn.textContent = '🔊 ' + t('playAudio');
            }
        }
    });
}

// 更新問答挑戰的問題
function updateQuizQuestions() {
    // 更新問題數據
    quizQuestions[0].question = t('question1');
}

// ============================================
// SECTION 0: QUESTIONS
// ============================================
// 課前提問 - 更適合小朋友的問題
// 圖片映射
const emojiToImage = {
    '👁️': '眼睛.png',
    '👂': '耳朵.png',
    '👃': '鼻子.png',
    '👄': '嘴.png',
    '✋': '手.png',
    '🦶': '腳.png'
};

const questionsData = [
    {
        question: '小朋友，我們的身體有哪些部位呢？點擊正確的答案！',
        answers: [
            { emoji: '👁️', text: '眼睛', correct: true },
            { emoji: '👂', text: '耳朵', correct: true },
            { emoji: '👃', text: '鼻子', correct: true },
            { emoji: '🪑', text: '桌子', correct: false }
        ]
    },
    {
        question: '五官是哪些呢？想一想！',
        answers: [
            { emoji: '👄', text: '嘴巴', correct: true },
            { emoji: '👁️', text: '眼睛', correct: true },
            { emoji: '👟', text: '鞋子', correct: false },
            { emoji: '👃', text: '鼻子', correct: true }
        ]
    },
    {
        question: '小鳥唱歌，我們用什麼來聽呢？',
        answers: [
            { emoji: '👂', text: '耳朵', correct: true },
            { emoji: '👁️', text: '眼睛', correct: false },
            { emoji: '👃', text: '鼻子', correct: false },
            { emoji: '👄', text: '嘴巴', correct: false }
        ]
    },
    {
        question: '看美麗的花朵，我們用什麼來看呢？',
        answers: [
            { emoji: '👁️', text: '眼睛', correct: true },
            { emoji: '👂', text: '耳朵', correct: false },
            { emoji: '👃', text: '鼻子', correct: false },
            { emoji: '✋', text: '手', correct: false }
        ]
    },
    {
        question: '拿玩具、抱抱媽媽，我們用什麼呢？',
        answers: [
            { emoji: '✋', text: '手', correct: true },
            { emoji: '👁️', text: '眼睛', correct: false },
            { emoji: '🦶', text: '腳', correct: false },
            { emoji: '👂', text: '耳朵', correct: false }
        ]
    }
];

function loadQuestion(qNum) {
    if (qNum > questionsData.length) {
        createConfetti();
        alert('恭喜你！完成了所有問題！你的得分是' + AppState.score + '分！');
        return;
    }
    
    AppState.currentQuestion = qNum;
    const qData = questionsData[qNum - 1];
    
    document.querySelectorAll('.q-progress-dot').forEach((dot, i) => {
        dot.classList.remove('current', 'completed');
        if (i < qNum - 1) dot.classList.add('completed');
        if (i === qNum - 1) dot.classList.add('current');
    });
    
    document.getElementById('questionText').textContent = qData.question;
    
    const answersArea = document.getElementById('answersArea');
    answersArea.innerHTML = '';
    qData.answers.forEach((ans) => {
        const btn = document.createElement('button');
        btn.className = 'answer-card';
        const imgSrc = emojiToImage[ans.emoji] || '';
        btn.innerHTML = `<span class="answer-emoji">${imgSrc ? `<img src="${imgSrc}" alt="${ans.text}" style="width: 80px; height: 80px; object-fit: contain;">` : ans.emoji}</span><span class="answer-text">${ans.text}</span>`;
        btn.onclick = () => checkAnswer(btn, ans.text, ans.correct);
        answersArea.appendChild(btn);
    });
}

function checkAnswer(btn, answer, isCorrect) {
    if (AppState.answered.has(AppState.currentQuestion + '-' + answer)) return;
    
    AppState.answered.add(AppState.currentQuestion + '-' + answer);
    
    if (isCorrect) {
        btn.classList.add('correct');
        AppState.score++;
        document.getElementById('scoreValue').textContent = AppState.score;
        speakText(answer);
        createConfetti();
        
        setTimeout(() => {
            loadQuestion(AppState.currentQuestion + 1);
        }, 1500);
    } else {
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 1000);
    }
}

// ============================================
// SECTIONS 1-5: BODY PARTS (Single pages)
// ============================================
function speakText(text) {
    speak(text);
}

// ============================================
// SECTION 6: WRITING
// ============================================

// 筆順影片連結
const strokeVideos = {
    '头': 'https://www.youtube.com/shorts/q8KAu1CTZXE',
    '眼': 'https://youtu.be/p4QZvx3TX98',
    '耳': 'https://youtu.be/rdP57TBmreI',
    '鼻': 'https://youtu.be/xyS0x5INxMY',
    '口': 'https://youtu.be/0At3BydJJ-w',
    '手': 'https://youtu.be/fmbv-e1iFqM',
    '脚': 'https://youtu.be/0jNK48jBm4c'
};

function selectCharTab(char, pinyin, meaning, btn) {
    AppState.currentChar = char;
    AppState.currentPinyin = pinyin;
    AppState.currentMeaning = meaning;
    
    document.querySelectorAll('.char-option').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    
    document.getElementById('demoChar').textContent = char;
    document.getElementById('demoPinyin').textContent = pinyin;
    document.getElementById('demoMeaning').textContent = meaning;
    
    clearCanvas();
}

function initCanvas() {
    const canvas = document.getElementById('writeCanvas');
    if (!canvas || AppState.writeCtx) return;
    
    const ctx = canvas.getContext('2d');
    AppState.writeCtx = ctx;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    let drawing = false;
    let lastX = 0, lastY = 0;
    
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }
    
    function start(e) {
        e.preventDefault();
        drawing = true;
        const pos = getPos(e);
        lastX = pos.x;
        lastY = pos.y;
    }
    
    function move(e) {
        e.preventDefault();
        if (!drawing) return;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }
    
    function end() { drawing = false; }
    
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseout', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);
}

function clearCanvas() {
    if (!AppState.writeCtx) return;
    const canvas = document.getElementById('writeCanvas');
    AppState.writeCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function playStrokeAndSpeak() {
    // 支持繁體和簡體字查找筆順影片
    let videoUrl = strokeVideos[AppState.currentChar];
    if (!videoUrl) {
        // 將繁體轉換為簡體查找
        const simplifiedMap = {
            '頭': '头', '眼': '眼', '耳': '耳', '鼻': '鼻',
            '口': '口', '手': '手', '腳': '脚'
        };
        const simplified = simplifiedMap[AppState.currentChar];
        if (simplified) {
            videoUrl = strokeVideos[simplified];
        }
    }
    if (videoUrl) {
        showVideoModal(videoUrl);
    }
}

// 顯示影片彈窗
function showVideoModal(videoUrl) {
    // 將 YouTube 網址轉換為嵌入格式
    console.log('Opening video:', videoUrl);
    
    // 將 YouTube 網址轉換為嵌入格式
    let embedUrl = videoUrl;
    
    // 處理不同格式的 YouTube 網址
    if (videoUrl.includes('youtube.com/shorts/')) {
        // Shorts 格式: https://www.youtube.com/shorts/VIDEO_ID
        const videoId = videoUrl.split('/shorts/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtube.com/watch?v=')) {
        // 標準格式: https://www.youtube.com/watch?v=VIDEO_ID
        const videoId = videoUrl.split('v=')[1].split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtu.be/')) {
        // youtu.be 格式: https://youtu.be/VIDEO_ID
        const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    
    // 創建彈窗
    const modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            position: relative;
            width: 90%;
            max-width: 800px;
            background: white;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        ">
            <button onclick="closeVideoModal()" style="
                position: absolute;
                top: -15px;
                right: -15px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #E85A9C;
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                z-index: 10;
            ">✕</button>
            <div style="
                position: relative;
                padding-bottom: 56.25%;
                height: 0;
                overflow: hidden;
                border-radius: 15px;
            ">
                <iframe src="${embedUrl}" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                " allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 點擊背景關閉
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.remove();
    }
}

function checkWriting() {
    alert('写得很好！');
    createConfetti();
}

// ============================================
// SECTION 7: STORIES
// ============================================
// 故事繪本 - 更豐富有趣的內容
const storiesData = {
    1: { 
        title: '千變萬化的手', 
        pages: [
            '我們有一雙神奇的手！👋 手可以做很多事情。',
            '早上起床，我們用手刷牙、洗臉。💦',
            '吃飯時，我們用手拿湯匙。🥄 畫畫時，我們用手拿畫筆。🎨',
            '我們要愛護雙手，常常洗手，保持乾淨！🧼'
        ] 
    },
    2: { 
        title: '我的身體', 
        pages: [
            '這是我的身體！我有頭、手、腳... 🧍',
            '頭上有眼睛、鼻子、耳朵和嘴巴。👀👃👂👄',
            '每個部位都有重要的工作，就像一個大家庭！🏠',
            '我愛我的身體，我要好好照顧它！❤️'
        ] 
    },
    3: { 
        title: '眼睛看世界', 
        pages: [
            '我們的眼睛像兩顆明亮的星星！✨ 幫助我們看這個美麗的世界。',
            '我們可以用眼睛看到紅紅的蘋果、綠綠的樹葉。🍎🌿',
            '看書、看電視、看媽媽的笑容，都需要眼睛！📺',
            '記得不要看太多電視，要讓眼睛休息哦！😊'
        ] 
    },
    4: { 
        title: '耳朵聽聲音', 
        pages: [
            '我們有兩隻可愛的耳朵！👂 像兩個小問號。',
            '耳朵可以聽到小鳥唱歌：嘰嘰喳喳！🐦',
            '可以聽到媽媽叫我們吃飯：「寶貝，來吃飯囉！」🍚',
            '也可以聽到美妙的音樂。🎵 耳朵真神奇！'
        ] 
    },
    5: { 
        title: '牙齒的故事', 
        pages: [
            '我有二十顆白白的牙齒！🦷 像一排小珍珠。',
            '牙齒幫助我們咬食物，讓我們可以吃到好吃的東西。🍎🥕',
            '每天早上和晚上，都要刷牙刷得乾乾淨淨！🪥',
            '少吃糖果，多刷牙，牙齒才會健康又漂亮！✨'
        ] 
    },
    6: { 
        title: '心臟蹦蹦跳', 
        pages: [
            '摸摸你的胸口，感覺到了嗎？心臟在蹦蹦跳！❤️',
            '心臟就像一個小幫浦，每天不停工作。',
            '它把血液送到全身，讓我們有力氣玩耍。🏃',
            '運動後心跳會加快，這是心臟在努力工作呢！💪'
        ] 
    }
};

function openStory(id) {
    AppState.currentStoryId = id;
    AppState.currentStoryPage = 1;
    const story = storiesData[id];
    
    document.getElementById('storyTitle').textContent = story.title;
    updateStoryPage();
    goTo('story');
}

function closeStory() {
    goTo('learning');
    gotoSection(7);
}

function updateStoryPage() {
    const story = storiesData[AppState.currentStoryId];
    document.getElementById('storyPageNum').textContent = AppState.currentStoryPage + ' / ' + story.pages.length;
    document.getElementById('storyText').innerHTML = `
        <h3>${story.title} - 第${AppState.currentStoryPage}頁</h3>
        <p>${story.pages[AppState.currentStoryPage - 1]}</p>
    `;
}

function nextStoryPage() {
    const story = storiesData[AppState.currentStoryId];
    if (AppState.currentStoryPage < story.pages.length) {
        AppState.currentStoryPage++;
        updateStoryPage();
    }
}

function prevStoryPage() {
    if (AppState.currentStoryPage > 1) {
        AppState.currentStoryPage--;
        updateStoryPage();
    }
}

// ============================================
// SECTION 8: GAMES
// ============================================

// 所有身體部位數據（用於遊戲）
const allBodyParts = [
    { key: 'eye', src: '眼睛.png', name: '眼睛', emoji: '👁️' },
    { key: 'ear', src: '耳朵.png', name: '耳朵', emoji: '👂' },
    { key: 'nose', src: '鼻子.png', name: '鼻子', emoji: '👃' },
    { key: 'mouth', src: '嘴.png', name: '嘴巴', emoji: '👄' },
    { key: 'hand', src: '手.png', name: '手', emoji: '✋' },
    { key: 'foot', src: '腳.png', name: '腳', emoji: '🦶' }
];

// 問答題目數據
const quizQuestions = [
    { question: '我們用什麼來看東西？', options: ['眼睛', '耳朵', '鼻子', '嘴巴'], correct: 0, emoji: '👁️', sound: '眼睛' },
    { question: '我們用什麼來聽聲音？', options: ['眼睛', '耳朵', '鼻子', '嘴巴'], correct: 1, emoji: '👂', sound: '耳朵' },
    { question: '我們用什麼來聞氣味？', options: ['眼睛', '耳朵', '鼻子', '嘴巴'], correct: 2, emoji: '👃', sound: '鼻子' },
    { question: '我們用什麼來吃東西？', options: ['眼睛', '耳朵', '鼻子', '嘴巴'], correct: 3, emoji: '👄', sound: '嘴巴' },
    { question: '我們用什麼來拿東西？', options: ['頭', '手', '腳', '耳朵'], correct: 1, emoji: '✋', sound: '手' },
    { question: '我們用什麼來走路？', options: ['頭', '手', '腳', '耳朵'], correct: 2, emoji: '🦶', sound: '腳' }
];

let currentQuizIndex = 0;

function switchGameType(type) {
    document.querySelectorAll('.game-option').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    // 重置遊戲分數
    AppState.gameScore = 0;
    
    if (type === 'matching') {
        initMatchingGame();
    } else if (type === 'memory') {
        initMemoryGameHTML();
    } else if (type === 'quiz') {
        currentQuizIndex = 0;
        initQuizGame();
    }
}

// 配對遊戲初始化 - 更有趣的版本
function initMatchingGame() {
    const gameArea = document.getElementById('gameArea');
    
    // 隨機選擇4個部位
    const shuffled = [...allBodyParts].sort(() => Math.random() - 0.5).slice(0, 4);
    const leftItems = [...shuffled].sort(() => Math.random() - 0.5);
    const rightItems = [...shuffled].sort(() => Math.random() - 0.5);
    
    const leftHTML = leftItems.map(part => `
        <div class="emoji-item" data-part="${part.key}" data-name="${part.name}" onclick="selectLeft(this)" style="
            width: 110px;
            height: 90px;
            background: linear-gradient(145deg, #ffffff, #f5f5f5);
            border: 4px solid #E85A9C;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 6px 20px rgba(232,90,156,0.2);
        " onmouseover="if(!this.classList.contains('matched')) { this.style.transform='scale(1.08)'; this.style.boxShadow='0 10px 30px rgba(232,90,156,0.35)'; }"
        onmouseout="if(!this.classList.contains('matched')) { this.style.transform='scale(1)'; this.style.boxShadow='0 6px 20px rgba(232,90,156,0.2)'; }">
            <img src="${part.src}" alt="${part.name}" style="width: 65px; height: 65px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">
        </div>
    `).join('');
    
    const rightHTML = rightItems.map(part => `
        <div class="text-item" data-part="${part.key}" data-name="${part.name}" onclick="selectRight(this)" style="
            width: 110px;
            height: 90px;
            background: linear-gradient(145deg, #ffffff, #f5f5f5);
            border: 4px solid #0066CC;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 6px 20px rgba(0,102,204,0.2);
            font-size: 26px;
            font-weight: bold;
            color: #0066CC;
        " onmouseover="if(!this.classList.contains('matched')) { this.style.transform='scale(1.08)'; this.style.boxShadow='0 10px 30px rgba(0,102,204,0.35)'; }"
        onmouseout="if(!this.classList.contains('matched')) { this.style.transform='scale(1)'; this.style.boxShadow='0 6px 20px rgba(0,102,204,0.2)'; }">${part.name}</div>
    `).join('');
    
    gameArea.innerHTML = `
        <div id="matchingInstruction" style="
            font-size: 22px;
            color: #E85A9C;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
            animation: pulse 2s infinite;
        ">🎯 點擊左邊圖片，再點擊右邊文字來配對！</div>
        
        <div id="lineMatchingGame" style="
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 500px;
            height: 420px;
            padding: 20px 50px;
            background: linear-gradient(145deg, #f8f9fa, #ffffff);
            border-radius: 25px;
            box-shadow: inset 0 2px 15px rgba(0,0,0,0.08);
        ">
            <svg id="connectionLines" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;"></svg>
            <div style="display: flex; flex-direction: column; gap: 25px; z-index: 2;">${leftHTML}</div>
            <div style="display: flex; flex-direction: column; gap: 25px; z-index: 2;">${rightHTML}</div>
        </div>
        
        <div id="matchMessage" style="
            margin-top: 15px;
            font-size: 22px;
            font-weight: bold;
            height: 35px;
            text-align: center;
            color: #4CAF50;
        "></div>
        
        <div style="
            margin-top: 10px;
            background: linear-gradient(135deg, #E85A9C, #C44569);
            color: white;
            padding: 15px 35px;
            border-radius: 30px;
            font-size: 22px;
            font-weight: bold;
            box-shadow: 0 6px 20px rgba(232,90,156,0.4);
            display: flex;
            align-items: center;
            gap: 10px;
        ">
            <span>🏆</span>
            <span>得分: <span id="gameScore">0</span></span>
        </div>
        
        <button onclick="initMatchingGame()" style="
            margin-top: 15px;
            padding: 12px 30px;
            background: linear-gradient(135deg, #4CAF50, #388E3C);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(76,175,80,0.4);
            transition: all 0.3s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🔄 重新開始</button>
    `;
    
    initLineMatchingGame();
}

// 記憶遊戲初始化（生成HTML）- 更有趣的版本
function initMemoryGameHTML() {
    const gameArea = document.getElementById('gameArea');
    
    // 隨機選擇4個部位，每個2張 = 8張牌
    const selected = [...allBodyParts].sort(() => Math.random() - 0.5).slice(0, 4);
    const cards = [];
    selected.forEach(part => {
        cards.push({ ...part, id: part.key + '_1' });
        cards.push({ ...part, id: part.key + '_2' });
    });
    const shuffled = cards.sort(() => Math.random() - 0.5);
    
    // 使用更簡單可靠的HTML結構
    gameArea.innerHTML = `
        <div id="memoryGame" style="
            display: grid;
            grid-template-columns: repeat(4, 90px);
            grid-template-rows: repeat(2, 90px);
            gap: 12px;
            justify-content: center;
            align-content: center;
            padding: 20px;
            background: linear-gradient(145deg, #f0f0f0, #ffffff);
            border-radius: 20px;
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
        ">
            ${shuffled.map((card, i) => `
                <div class="memory-card" data-key="${card.key}" data-name="${card.name}" onclick="flipMemoryCard(this)" style="
                    width: 90px;
                    height: 90px;
                    position: relative;
                    cursor: pointer;
                    transform-style: preserve-3d;
                    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                ">
                    <div class="card-front" style="
                        position: absolute;
                        width: 90px;
                        height: 90px;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 32px;
                        font-weight: bold;
                        color: white;
                        background: linear-gradient(135deg, #E85A9C, #C44569);
                        box-shadow: 0 4px 15px rgba(232,90,156,0.4);
                        backface-visibility: hidden;
                        -webkit-backface-visibility: hidden;
                        border: 3px solid white;
                    ">?</div>
                    <div class="card-back" style="
                        position: absolute;
                        width: 90px;
                        height: 90px;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: white;
                        border: 3px solid #4CAF50;
                        box-shadow: 0 4px 15px rgba(76,175,80,0.3);
                        transform: rotateY(180deg);
                        backface-visibility: hidden;
                        -webkit-backface-visibility: hidden;
                    ">
                        <img src="${card.src}" alt="${card.name}" style="width: 55px; height: 55px; object-fit: contain;">
                    </div>
                </div>
            `).join('')}
        </div>
        <div id="gameMessage" style="
            margin-top: 15px;
            font-size: 20px;
            font-weight: bold;
            color: #E85A9C;
            height: 30px;
            text-align: center;
            transition: all 0.3s;
        ">找到相同的卡片！</div>
        <div class="game-score" style="
            margin-top: 10px;
            background: linear-gradient(135deg, #E85A9C, #C44569);
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 20px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(232,90,156,0.4);
        ">⭐ 得分: <span id="gameScore">0</span></div>
        <button onclick="initMemoryGameHTML()" style="
            margin-top: 15px;
            padding: 12px 30px;
            background: linear-gradient(135deg, #4CAF50, #388E3C);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(76,175,80,0.4);
            transition: transform 0.3s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🔄 重新開始</button>
    `;
    
    initMemoryGame();
}

// 問答遊戲初始化 - 更有趣的版本
function initQuizGame() {
    const gameArea = document.getElementById('gameArea');
    const q = quizQuestions[currentQuizIndex];
    
    const progressDots = quizQuestions.map((_, i) => `
        <div style="
            width: ${i === currentQuizIndex ? '35px' : '12px'};
            height: 12px;
            border-radius: 6px;
            background: ${i < currentQuizIndex ? '#4CAF50' : (i === currentQuizIndex ? '#E85A9C' : '#ddd')};
            transition: all 0.3s;
        "></div>
    `).join('');
    
    const optionsHTML = q.options.map((opt, i) => `
        <button id="quizBtn${i}" onclick="answerQuiz(this, ${i === q.correct}, '${q.sound}')" style="
            padding: 25px 20px;
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
            border: 3px solid #e0e0e0;
            border-radius: 20px;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
            color: #333;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'" 
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.1)'">
            <span style="font-size: 32px;">${i === q.correct ? q.emoji : ['👀', '👂', '👃', '👄', '🧠', '✋', '🦶'][i % 7]}</span>
            <span>${opt}</span>
        </button>
    `).join('');
    
    gameArea.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 100%;
            max-width: 550px;
            animation: fadeIn 0.5s ease-out;
        ">
            <div style="
                display: flex;
                gap: 8px;
                padding: 10px 20px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            ">${progressDots}</div>
            
            <div style="
                font-size: 32px;
                font-weight: bold;
                color: #333;
                text-align: center;
                background: linear-gradient(145deg, #ffffff, #f8f8f8);
                padding: 30px 40px;
                border-radius: 25px;
                border: 4px solid #E85A9C;
                box-shadow: 0 8px 30px rgba(232,90,156,0.2);
                width: 100%;
                position: relative;
                overflow: hidden;
            ">
                <div style="font-size: 50px; margin-bottom: 10px;">❓</div>
                ${q.question}
            </div>
            
            <div style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                width: 100%;
            ">${optionsHTML}</div>
        </div>
        
        <div id="quizFeedback" style="
            margin-top: 15px;
            font-size: 24px;
            font-weight: bold;
            height: 40px;
            text-align: center;
            transition: all 0.3s;
        "></div>
        
        <div style="
            margin-top: 10px;
            background: linear-gradient(135deg, #E85A9C, #C44569);
            color: white;
            padding: 15px 35px;
            border-radius: 30px;
            font-size: 22px;
            font-weight: bold;
            box-shadow: 0 6px 20px rgba(232,90,156,0.4);
            display: flex;
            align-items: center;
            gap: 10px;
        ">
            <span>🏆</span>
            <span>得分: <span id="gameScore">${AppState.gameScore}</span></span>
        </div>
    `;
}

// 連線配對遊戲數據（包含所有可用部位）
const bodyPartsData = {
    'eye': { emoji: '👁️', text: '眼睛', image: '眼睛.png' },
    'nose': { emoji: '👃', text: '鼻子', image: '鼻子.png' },
    'ear': { emoji: '👂', text: '耳朵', image: '耳朵.png' },
    'mouth': { emoji: '👄', text: '嘴巴', image: '嘴.png' },
    'hand': { emoji: '✋', text: '手', image: '手.png' },
    'foot': { emoji: '🦶', text: '腳', image: '腳.png' }
};

let selectedLeft = null;
let matchedPairs = new Set();

function initLineMatchingGame() {
    selectedLeft = null;
    matchedPairs.clear();
    AppState.gameScore = 0;
    updateGameScore();
    
    // 從左側獲取當前顯示的部位
    const leftItems = document.querySelectorAll('.emoji-item');
    const parts = Array.from(leftItems).map(item => item.dataset.part).sort(() => Math.random() - 0.5);
    
    // 洗牌右側文字（使用與左側相同的部位）
    const rightItems = document.querySelectorAll('.text-item');
    rightItems.forEach((item, i) => {
        item.dataset.part = parts[i];
        item.textContent = bodyPartsData[parts[i]].text;
        item.classList.remove('matched');
        // 重置樣式
        item.style.background = 'linear-gradient(145deg, #ffffff, #f5f5f5)';
        item.style.borderColor = '#0066CC';
        item.style.color = '#0066CC';
        item.style.transform = 'scale(1)';
    });
    
    // 重置左側
    document.querySelectorAll('.emoji-item').forEach(item => {
        item.classList.remove('selected', 'matched');
    });
    
    // 清除連線
    const svg = document.getElementById('connectionLines');
    if (svg) svg.innerHTML = '';
}

function selectLeft(element) {
    if (element.classList.contains('matched')) return;
    
    // 移除其他選中狀態
    document.querySelectorAll('.emoji-item').forEach(el => {
        el.classList.remove('selected');
        el.style.borderColor = '#E85A9C';
        el.style.background = 'linear-gradient(145deg, #ffffff, #f5f5f5)';
        el.style.transform = 'scale(1)';
    });
    
    // 添加選中樣式
    element.classList.add('selected');
    element.style.borderColor = '#FF9800';
    element.style.background = 'linear-gradient(145deg, #FFF3E0, #FFE0B2)';
    element.style.transform = 'scale(1.1)';
    element.style.boxShadow = '0 0 25px rgba(255,152,0,0.5)';
    selectedLeft = element;
    
    // 更新提示
    const msgEl = document.getElementById('matchMessage');
    if (msgEl) msgEl.textContent = t('clickRightText');
}

function selectRight(element) {
    const msgEl = document.getElementById('matchMessage');
    
    if (!selectedLeft || element.classList.contains('matched')) {
        if (msgEl && !selectedLeft) msgEl.textContent = t('clickLeftFirst');
        return;
    }
    
    const leftPart = selectedLeft.dataset.part;
    const rightPart = element.dataset.part;
    
    if (leftPart === rightPart) {
        // 配對成功
        element.classList.add('matched');
        selectedLeft.classList.add('matched');
        selectedLeft.classList.remove('selected');
        matchedPairs.add(leftPart);
        AppState.gameScore += 10;
        updateGameScore();
        
        // 成功樣式
        element.style.background = 'linear-gradient(145deg, #C8E6C9, #A5D6A7)';
        element.style.borderColor = '#4CAF50';
        element.style.color = '#2E7D32';
        element.style.transform = 'scale(1.1)';
        
        selectedLeft.style.background = 'linear-gradient(145deg, #C8E6C9, #A5D6A7)';
        selectedLeft.style.borderColor = '#4CAF50';
        selectedLeft.style.transform = 'scale(1.1)';
        selectedLeft.style.boxShadow = '0 8px 25px rgba(76,175,80,0.4)';
        
        // 繪製連線
        drawLine(selectedLeft, element);
        
        // 播放發音
        const partName = bodyPartsData[leftPart]?.text || selectedLeft.dataset.name;
        speakText(partName);
        
        // 更新提示
        if (msgEl) msgEl.innerHTML = `🎉 ${partName} 配對成功！`;
        
        // 創建小煙花效果
        createMiniConfetti(element);
        
        if (matchedPairs.size >= 4) {
            setTimeout(() => {
                celebrateWin();
                if (msgEl) msgEl.innerHTML = t('allMatched');
                document.getElementById('matchingInstruction').textContent = t('matchingMaster');
            }, 500);
        }
        
        selectedLeft = null;
    } else {
        // 配對失敗
        element.style.animation = 'shake 0.5s ease-out';
        element.style.background = 'linear-gradient(145deg, #FFCDD2, #EF9A9A)';
        element.style.borderColor = '#EF5350';
        
        if (msgEl) msgEl.innerHTML = '😅 不對喔，再試試！';
        
        setTimeout(() => {
            element.style.animation = '';
            element.style.background = 'linear-gradient(145deg, #ffffff, #f5f5f5)';
            element.style.borderColor = '#0066CC';
        }, 600);
        
        selectedLeft.classList.remove('selected');
        selectedLeft.style.borderColor = '#E85A9C';
        selectedLeft.style.background = 'linear-gradient(145deg, #ffffff, #f5f5f5)';
        selectedLeft.style.transform = 'scale(1)';
        selectedLeft.style.boxShadow = '0 6px 20px rgba(232,90,156,0.2)';
        selectedLeft = null;
        
        setTimeout(() => {
            if (msgEl && matchedPairs.size < 4) msgEl.textContent = '';
        }, 1500);
    }
}

// 小煙花效果
function createMiniConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107'];
    
    for (let i = 0; i < 8; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        confetti.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => confetti.remove();
    }
}

function drawLine(elem1, elem2) {
    const svg = document.getElementById('connectionLines');
    if (!svg) return;
    
    const gameArea = document.getElementById('lineMatchingGame');
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    const gameRect = gameArea.getBoundingClientRect();
    
    const x1 = rect1.right - gameRect.left;
    const y1 = rect1.top + rect1.height / 2 - gameRect.top;
    const x2 = rect2.left - gameRect.left;
    const y2 = rect2.top + rect2.height / 2 - gameRect.top;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#4CAF50');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    
    svg.appendChild(line);
}

function resetLineGame() {
    initLineMatchingGame();
}

function initMemoryGame() {
    AppState.memoryFlipped = [];
    AppState.memoryMatched = 0;
    AppState.gameScore = 0;
    updateGameScore();
}

function flipMemoryCard(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || AppState.memoryFlipped.length >= 2) return;
    
    // 翻牌動畫
    card.style.transform = 'rotateY(180deg)';
    card.classList.add('flipped');
    AppState.memoryFlipped.push(card);
    
    // 更新提示文字
    const msgEl = document.getElementById('gameMessage');
    if (msgEl) msgEl.textContent = AppState.memoryFlipped.length === 1 ? t('flipCardHint') : '...';
    
    if (AppState.memoryFlipped.length === 2) {
        const [c1, c2] = AppState.memoryFlipped;
        const partName = c1.dataset.name;
        
        if (c1.dataset.key === c2.dataset.key) {
            // 配對成功
            if (msgEl) msgEl.textContent = t('matchSuccess');
            
            setTimeout(() => {
                c1.querySelector('.card-back').style.background = '#C8E6C9';
                c1.querySelector('.card-back').style.borderColor = '#4CAF50';
                c2.querySelector('.card-back').style.background = '#C8E6C9';
                c2.querySelector('.card-back').style.borderColor = '#4CAF50';
                c1.classList.add('matched');
                c2.classList.add('matched');
                
                // 添加勝利動畫
                c1.style.animation = 'bounce 0.5s ease-out';
                c2.style.animation = 'bounce 0.5s ease-out';
                
                AppState.memoryMatched++;
                AppState.gameScore += 10;
                updateGameScore();
                AppState.memoryFlipped = [];
                
                // 播放發音
                speakText(partName);
                createConfetti();
                
                if (AppState.memoryMatched >= 4) {
                    if (msgEl) msgEl.innerHTML = t('memoryAllMatched');
                    setTimeout(() => {
                        celebrateWin();
                    }, 500);
                } else {
                    setTimeout(() => {
                        if (msgEl) msgEl.textContent = t('keepGoing');
                    }, 1500);
                }
            }, 600);
        } else {
            // 配對失敗
            if (msgEl) msgEl.textContent = t('tryAgain');
            
            setTimeout(() => {
                c1.style.transform = 'rotateY(0deg)';
                c2.style.transform = 'rotateY(0deg)';
                c1.classList.remove('flipped');
                c2.classList.remove('flipped');
                AppState.memoryFlipped = [];
                
                setTimeout(() => {
                    if (msgEl) msgEl.textContent = t('findSameCard');
                }, 500);
            }, 1200);
        }
    }
}

// 勝利慶祝動畫
function celebrateWin() {
    createConfetti();
    setTimeout(createConfetti, 300);
    setTimeout(createConfetti, 600);
}

function answerQuiz(btn, isCorrect, soundText) {
    const feedbackEl = document.getElementById('quizFeedback');
    const allBtns = document.querySelectorAll('[id^="quizBtn"]');
    
    // 禁用所有按鈕
    allBtns.forEach(b => {
        b.disabled = true;
        b.style.opacity = '0.7';
        b.style.cursor = 'not-allowed';
    });
    
    if (isCorrect) {
        // 正確答案樣式
        btn.style.background = 'linear-gradient(145deg, #C8E6C9, #A5D6A7)';
        btn.style.borderColor = '#4CAF50';
        btn.style.transform = 'scale(1.05)';
        btn.style.boxShadow = '0 8px 25px rgba(76,175,80,0.4)';
        
        if (feedbackEl) {
            feedbackEl.innerHTML = t('quizCorrect');
            feedbackEl.style.color = '#4CAF50';
        }
        
        AppState.gameScore += 10;
        updateGameScore();
        createConfetti();
        
        // 播放正確答案的發音
        speakText(soundText);
        
        setTimeout(() => {
            currentQuizIndex++;
            if (currentQuizIndex < quizQuestions.length) {
                initQuizGame();
            } else {
                // 完成所有題目
                celebrateWin();
                if (feedbackEl) {
                    feedbackEl.innerHTML = t('quizAllCorrect');
                }
                setTimeout(() => {
                    alert(`🎉 恭喜你完成了所有題目！\n\n總得分: ${AppState.gameScore} 分\n\n你是學習小達人！`);
                    currentQuizIndex = 0;
                    AppState.gameScore = 0;
                    initQuizGame();
                }, 1000);
            }
        }, 1800);
    } else {
        // 錯誤答案樣式
        btn.style.background = 'linear-gradient(145deg, #FFCDD2, #EF9A9A)';
        btn.style.borderColor = '#EF5350';
        btn.style.animation = 'shake 0.5s ease-out';
        
        if (feedbackEl) {
            feedbackEl.innerHTML = t('quizWrong');
            feedbackEl.style.color = '#EF5350';
        }
        
        setTimeout(() => {
            btn.style.background = 'linear-gradient(145deg, #ffffff, #f0f0f0)';
            btn.style.borderColor = '#e0e0e0';
            btn.style.animation = '';
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            
            allBtns.forEach(b => {
                if (b !== btn) {
                    b.disabled = false;
                    b.style.opacity = '1';
                    b.style.cursor = 'pointer';
                }
            });
            
            if (feedbackEl) feedbackEl.textContent = '';
        }, 1200);
    }
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

console.log('🦁 大地幼教学材已加载');


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
