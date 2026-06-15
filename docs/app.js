// ============================================
// 大地幼教学材 - Application Logic
// App Version: 20250613v29
// ============================================

const AppState = {
    currentPage: 'welcome',
    selectedChar: null,
    selectedLevel: null,
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
        question1: '小朋友，你知道我們的身體有哪些部位嗎？',
        
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
        poem2: '春曉',
        poem3: '詠鵝',
        poem4: '憫農',
        poem5: '登鸛雀樓',
        poem6: '江雪',
        poem7: '問劉十九',
        poem8: '暮江吟',
        poem9: '望廬山瀑布',
        poem10: '早發白帝城',
        poem11: '黃鶴樓',
        poem12: '山居秋暝',
        
        // 語言選擇
        langTW: '繁體中文',
        langCN: '简體中文',
        
        // 首頁
        startLearning: '開始學習',
        siteTitle: '大地幼教学材 - 学习平台',
        // 課前提問
        quizQ0: '小朋友，你知道我們的身體有哪些部位嗎？',
        quizQ0Opt0: '嘴巴',
        quizQ0Opt1: '耳朵',
        quizQ0Opt2: '眼睛',
        quizQ0Opt3: '椅子',
        quizQ1: '小鳥唱歌，我們用什麼來聽呢？',
        quizQ1Opt0: '嘴巴',
        quizQ1Opt1: '手',
        quizQ1Opt2: '眼睛',
        quizQ1Opt3: '耳朵',
        quizQ2: '看美麗的花朵，我們用什麼來看呢？',
        quizQ2Opt0: '鼻子',
        quizQ2Opt1: '眼睛',
        quizQ2Opt2: '耳朵',
        quizQ2Opt3: '嘴巴',
        quizQ3: '拿玩具、抱抱媽媽，我們用什麼呢？',
        quizQ3Opt0: '腳',
        quizQ3Opt1: '眼睛',
        quizQ3Opt2: '手',
        quizQ3Opt3: '耳朵',
        quizQ4: '眉毛在那裡？',
        quizQ4Btn0: '眉毛',
        quizQ4Btn1: '眼睛',
        quizQ4Btn2: '鼻子',
        quizQ4Btn3: '耳朵',
        quizQ4Btn4: '嘴巴',
        quizQ5: '眼睛在那裡？',
        quizQ5Btn0: '眉毛',
        quizQ5Btn1: '眼睛',
        quizQ5Btn2: '鼻子',
        quizQ5Btn3: '耳朵',
        quizQ5Btn4: '嘴巴',
        quizQ6: '鼻子在那裡？',
        quizQ6Btn0: '眉毛',
        quizQ6Btn1: '眼睛',
        quizQ6Btn2: '鼻子',
        quizQ6Btn3: '耳朵',
        quizQ6Btn4: '嘴巴',
        quizQ7: '耳朵在那裡？',
        quizQ7Btn0: '眉毛',
        quizQ7Btn1: '眼睛',
        quizQ7Btn2: '鼻子',
        quizQ7Btn3: '耳朵',
        quizQ7Btn4: '嘴巴',
        quizQ8: '嘴巴在那裡？',
        quizQ8Btn0: '眉毛',
        quizQ8Btn1: '眼睛',
        quizQ8Btn2: '鼻子',
        quizQ8Btn3: '耳朵',
        quizQ8Btn4: '嘴巴',
        
        // 識圖定義
        recDef1: '我的頭在這裡。',
        recDef2: '我的耳朵在這裡。',
        recDef3: '我的腳在這裡。',
        recDef4: '我的鼻子在這裡。',
        recDef5: '我的眼睛在這裡。',
        recDef6: '我的嘴巴在這裡。',
        recDef7: '我的手在這裡。',
        
        // 故事繪本
        storyBook1Title: '千變萬化的手',
        storyBook1Page1Text: '我們每個人都有兩隻手。手可以做很多很多的事情。',
        storyBook1Page2Text: '用手可以推門、拉窗，還可以握手打招呼。',
        storyBook1Page2Q: '你能用手做一個推的動作給老師看嗎？',
        storyBook1Page3Text: '手還可以畫畫、寫字、摺紙，做出美麗的作品。',
        storyBook1Page4Text: '我們要愛護自己的雙手，保持乾淨，勤洗手。',
        storyBook1Page4Q: '你知道什麼時候應該洗手嗎？',
        storyBook2Title: '我的身體',
        storyBook2Page1Text: '這是我的身體。我有頭、頸、軀幹、手和腳。',
        storyBook2Page2Text: '頭上有眼睛、耳朵、鼻子和嘴巴，幫助我認識世界。',
        storyBook2Page2Q: '你能指一指自己的眼睛在哪裡嗎？',
        storyBook2Page3Text: '身體可以跑、跳、走、坐，讓我做各種運動。',
        storyBook2Page4Text: '我們要好好照顧自己的身體，吃得健康、多運動。',
        storyBook2Page4Q: '你喜歡做什麼運動呢？',
        storyBook3Title: '眼睛的故事',
        storyBook3Page1Text: '每個人都有兩隻眼睛。眼睛讓我們看到美麗的世界。',
        storyBook3Page2Text: '眼睛可以看到紅的花、綠的樹、藍的天和白雲。',
        storyBook3Page2Q: '你現在能看到什麼顏色？',
        storyBook3Page3Text: '看書的時候要保持距離，不能靠得太近。',
        storyBook3Page4Text: '看完電視或手機後，要讓眼睛休息一下，看看遠方。',
        storyBook3Page4Q: '你知道怎樣做眼保健操嗎？',
        
        // 遊戲問題
        gameQuizQ0: '小朋友，你知道我們的身體有哪些部位嗎？',
        gameQuizQ0Opt0: '眼睛',
        gameQuizQ0Opt1: '耳朵',
        gameQuizQ0Opt2: '鼻子',
        gameQuizQ0Opt3: '椅子',
        gameQuizQ1: '小鳥唱歌，我們用什麼來聽呢？',
        gameQuizQ1Opt0: '嘴巴',
        gameQuizQ1Opt1: '手',
        gameQuizQ1Opt2: '眼睛',
        gameQuizQ1Opt3: '耳朵',
        gameQuizQ2: '看美麗的花朵，我們用什麼來看呢？',
        gameQuizQ2Opt0: '鼻子',
        gameQuizQ2Opt1: '眼睛',
        gameQuizQ2Opt2: '耳朵',
        gameQuizQ2Opt3: '嘴巴',
        gameQuizQ3: '拿玩具、抱抱媽媽，我們用什麼呢？',
        gameQuizQ3Opt0: '腳',
        gameQuizQ3Opt1: '眼睛',
        gameQuizQ3Opt2: '手',
        gameQuizQ3Opt3: '耳朵',
        
        // 其他
        storyIllustration: '故事插圖',
        realPhoto: '真人照片',
        // 章節名稱（續）
        chapter12: '交通工具',
        chapter13: '家庭成員',
        chapter14: '日常用品',
        chapter15: '蔬菜',
        chapter16: '飲料',
        chapter17: '職業',
        chapter18: '國家',
        chapter19: '節日',
        chapter20: '情緒',
        chapter21: '服裝',
        chapter22: '時間',
        chapter23: '自然',
        
        // 課程標題前後綴
        lessonPrefix: '第',
        lessonSuffix: '課：',
        
        // 歌曲分類
        commonSongs: '常用歌曲',
        unitSongs: '單元歌曲',
        
        // 單元歌曲名稱
        unitSong1: '一家人',
        unitSong2: '幼兒園',
        unitSong3: '數字',
        unitSong4: '顏色',
        unitSong5: '動物',
        unitSong6: '水果',
        unitSong7: '天氣',
        unitSong8: '季節',
        unitSong9: '運動',
        unitSong10: '食物',
        unitSong11: '身體',
        unitSong12: '交通工具',
        unitSong13: '家庭成員',
        unitSong14: '日常用品',
        unitSong15: '蔬菜',
        unitSong16: '飲料',
        unitSong17: '職業',
        unitSong18: '國家',
        unitSong19: '節日',
        unitSong20: '情緒',
        unitSong21: '服裝',
        unitSong22: '時間',
        unitSong23: '自然',
        
        // 常用兒歌
        commonSong1: '上學歌',
        commonSong2: '天氣歌',
        
        // 遊戲活動
        gameMatching: '圖案配對',
        gameQuiz: '文字選擇',
        gameMemory: '記憶翻牌',
        
        // 按鈕與標籤
        continueBtn: '繼續',
        questionLabel: '題目',
        multiSelectHint: '（可多選）',
        
        // 寫字頁面
        writingPracticeTitle: '現在一起練習寫字吧',
        strokeAnimation: '筆順動畫',
        
        // 提示文字
        videoPending: '影片連結待補',
        selectStoryBook: '請選擇一本故事書',
        selectGameActivity: '請選擇一個遊戲活動',
        coverPlaceholder: '封面圖片待補',
        pagePlaceholder: '頁面圖片待補',
        imagePlaceholder: '圖片待補',
        bodyPartDiagram: '身體部位示意圖',
        
        // 遊戲完成訊息
        allMatchedMatching: '太棒了！全部配對成功！',
        allMatchedQuiz: '太棒了！全部答對了！',
        matchInstruction: '請把圖案和文字配對起來',
        memoryInstruction: '翻開牌子，找出相同的圖案',
        
        // Logo
        logoChar: '華',
        
        // 故事書標題
        storyBook1Title: '千變萬化的手',
        storyBook2Title: '我的身體',
        storyBook3Title: '眼睛的故事'
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
        // 身体部位单字
        headChar: '头',
        eyeChar: '眼',
        earChar: '耳',
        noseChar: '鼻',
        mouthChar: '口',
        handChar: '手',
        footChar: '脚',
        
        // 课程标题
        lesson11Title: '第11课：身体',
        
        // 按鈕文字
        playAudio: '播放发音',
        watchStroke: '观看笔顺视频',
        clear: '清除',
        complete: '完成',
        back: '返回',
        
        // 問題
        question1: '小朋友，你知道我们的身体有哪些部位吗？',
        
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
        poem4: '悯农',
        poem5: '登鹳雀楼',
        poem6: '江雪',
        poem7: '问刘十九',
        poem8: '暮江吟',
        poem9: '望庐山瀑布',
        poem10: '早发白帝城',
        poem11: '黄鹤楼',
        poem12: '山居秋暝',
        
        // 语言选择
        langTW: '繁体中文',
        langCN: '简体中文',
        
        // 首页
        startLearning: '开始学习',
        siteTitle: '大地幼教学材 - 学习平台',
        // 课前提问
        quizQ0: '小朋友，你知道我们的身体有哪些部位吗？',
        quizQ0Opt0: '嘴巴',
        quizQ0Opt1: '耳朵',
        quizQ0Opt2: '眼睛',
        quizQ0Opt3: '椅子',
        quizQ1: '小鸟唱歌，我们用什么来听呢？',
        quizQ1Opt0: '嘴巴',
        quizQ1Opt1: '手',
        quizQ1Opt2: '眼睛',
        quizQ1Opt3: '耳朵',
        quizQ2: '看美丽的花朵，我们用什么来看呢？',
        quizQ2Opt0: '鼻子',
        quizQ2Opt1: '眼睛',
        quizQ2Opt2: '耳朵',
        quizQ2Opt3: '嘴巴',
        quizQ3: '拿玩具、抱抱妈妈，我们用什么呢？',
        quizQ3Opt0: '脚',
        quizQ3Opt1: '眼睛',
        quizQ3Opt2: '手',
        quizQ3Opt3: '耳朵',
        quizQ4: '眉毛在那里？',
        quizQ4Btn0: '眉毛',
        quizQ4Btn1: '眼睛',
        quizQ4Btn2: '鼻子',
        quizQ4Btn3: '耳朵',
        quizQ4Btn4: '嘴巴',
        quizQ5: '眼睛在那里？',
        quizQ5Btn0: '眉毛',
        quizQ5Btn1: '眼睛',
        quizQ5Btn2: '鼻子',
        quizQ5Btn3: '耳朵',
        quizQ5Btn4: '嘴巴',
        quizQ6: '鼻子在那里？',
        quizQ6Btn0: '眉毛',
        quizQ6Btn1: '眼睛',
        quizQ6Btn2: '鼻子',
        quizQ6Btn3: '耳朵',
        quizQ6Btn4: '嘴巴',
        quizQ7: '耳朵在那里？',
        quizQ7Btn0: '眉毛',
        quizQ7Btn1: '眼睛',
        quizQ7Btn2: '鼻子',
        quizQ7Btn3: '耳朵',
        quizQ7Btn4: '嘴巴',
        quizQ8: '嘴巴在那里？',
        quizQ8Btn0: '眉毛',
        quizQ8Btn1: '眼睛',
        quizQ8Btn2: '鼻子',
        quizQ8Btn3: '耳朵',
        quizQ8Btn4: '嘴巴',
        
        // 识图定义
        recDef1: '我的头在这里。',
        recDef2: '我的耳朵在这里。',
        recDef3: '我的脚在这里。',
        recDef4: '我的鼻子在这里。',
        recDef5: '我的眼睛在这里。',
        recDef6: '我的嘴巴在这里。',
        recDef7: '我的手在这里。',
        
        // 故事绘本
        storyBook1Title: '千变万化的手',
        storyBook1Page1Text: '我们每个人都有两只手。手可以做很多很多的事情。',
        storyBook1Page2Text: '用手可以推门、拉窗，还可以握手打招呼。',
        storyBook1Page2Q: '你能用手做一个推的动作给老师看吗？',
        storyBook1Page3Text: '手还可以画画、写字、折纸，做出美丽的作品。',
        storyBook1Page4Text: '我们要爱护自己的双手，保持干净，勤洗手。',
        storyBook1Page4Q: '你知道什么时候应该洗手吗？',
        storyBook2Title: '我的身体',
        storyBook2Page1Text: '这是我的身体。我有头、颈、躯干、手和脚。',
        storyBook2Page2Text: '头上有眼睛、耳朵、鼻子和嘴巴，帮助我认识世界。',
        storyBook2Page2Q: '你能指一指自己的眼睛在哪里吗？',
        storyBook2Page3Text: '身体可以跑、跳、走、坐，让我做各种运动。',
        storyBook2Page4Text: '我们要好好照顾自己的身体，吃得健康、多运动。',
        storyBook2Page4Q: '你喜欢做什么运动呢？',
        storyBook3Title: '眼睛的故事',
        storyBook3Page1Text: '每个人都有两只眼睛。眼睛让我们看到美丽的世界。',
        storyBook3Page2Text: '眼睛可以看到红的花、绿的树、蓝的天和白云。',
        storyBook3Page2Q: '你现在能看到什么颜色？',
        storyBook3Page3Text: '看书的时候要保持距离，不能靠得太近。',
        storyBook3Page4Text: '看完电视或手机后，要让眼睛休息一下，看看远方。',
        storyBook3Page4Q: '你知道怎样做眼保健操吗？',
        
        // 游戏问题
        gameQuizQ0: '小朋友，你知道我们的身体有哪些部位吗？',
        gameQuizQ0Opt0: '眼睛',
        gameQuizQ0Opt1: '耳朵',
        gameQuizQ0Opt2: '鼻子',
        gameQuizQ0Opt3: '椅子',
        gameQuizQ1: '小鸟唱歌，我们用什么来听呢？',
        gameQuizQ1Opt0: '嘴巴',
        gameQuizQ1Opt1: '手',
        gameQuizQ1Opt2: '眼睛',
        gameQuizQ1Opt3: '耳朵',
        gameQuizQ2: '看美丽的花朵，我们用什么来看呢？',
        gameQuizQ2Opt0: '鼻子',
        gameQuizQ2Opt1: '眼睛',
        gameQuizQ2Opt2: '耳朵',
        gameQuizQ2Opt3: '嘴巴',
        gameQuizQ3: '拿玩具、抱抱妈妈，我们用什么呢？',
        gameQuizQ3Opt0: '脚',
        gameQuizQ3Opt1: '眼睛',
        gameQuizQ3Opt2: '手',
        gameQuizQ3Opt3: '耳朵',
        
        // 其他
        storyIllustration: '故事插图',
        realPhoto: '真人照片',
        // 章节名称（续）
        chapter12: '交通工具',
        chapter13: '家庭成员',
        chapter14: '日常用品',
        chapter15: '蔬菜',
        chapter16: '饮料',
        chapter17: '职业',
        chapter18: '国家',
        chapter19: '节日',
        chapter20: '情绪',
        chapter21: '服装',
        chapter22: '时间',
        chapter23: '自然',
        
        // 课程标题前后缀
        lessonPrefix: '第',
        lessonSuffix: '课：',
        
        // 歌曲分类
        commonSongs: '常用歌曲',
        unitSongs: '单元歌曲',
        
        // 单元歌曲名称
        unitSong1: '一家人',
        unitSong2: '幼儿园',
        unitSong3: '数字',
        unitSong4: '颜色',
        unitSong5: '动物',
        unitSong6: '水果',
        unitSong7: '天气',
        unitSong8: '季节',
        unitSong9: '运动',
        unitSong10: '食物',
        unitSong11: '身体',
        unitSong12: '交通工具',
        unitSong13: '家庭成员',
        unitSong14: '日常用品',
        unitSong15: '蔬菜',
        unitSong16: '饮料',
        unitSong17: '职业',
        unitSong18: '国家',
        unitSong19: '节日',
        unitSong20: '情绪',
        unitSong21: '服装',
        unitSong22: '时间',
        unitSong23: '自然',
        
        // 常用儿歌
        commonSong1: '上学歌',
        commonSong2: '天气歌',
        
        // 游戏活动
        gameMatching: '图案配对',
        gameQuiz: '文字选择',
        gameMemory: '记忆翻牌',
        
        // 按钮与标签
        continueBtn: '继续',
        questionLabel: '题目',
        multiSelectHint: '（可多选）',
        
        // 写字页面
        writingPracticeTitle: '现在一起练习写字吧',
        strokeAnimation: '笔顺动画',
        
        // 提示文字
        videoPending: '影片链接待补',
        selectStoryBook: '请选择一本故事书',
        selectGameActivity: '请选择一个游戏活动',
        coverPlaceholder: '封面图片待补',
        pagePlaceholder: '页面图片待补',
        imagePlaceholder: '图片待补',
        bodyPartDiagram: '身体部位示意图',
        
        // 游戏完成讯息
        allMatchedMatching: '太棒了！全部配对成功！',
        allMatchedQuiz: '太棒了！全部答对了！',
        matchInstruction: '请把图案和文字配对起来',
        memoryInstruction: '翻开牌子，找出相同的图案',
        
        // Logo
        logoChar: '华',
        
        // 故事书标题
        storyBook1Title: '千变万化的手',
        storyBook2Title: '我的身体',
        storyBook3Title: '眼睛的故事'
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
    
    // 更新課件學習頁背景與功能標籤圖片
    updateCoursewareImages();
    
    // 更新學段選擇頁按鈕圖片
    updateLevelButtons();
    
    // 更新內容類型選擇頁按鈕圖片
    updateCatButtons();
    
    // 更新唐詩列表頁圖片
    updatePoemImages();
    
    // 更新兒歌選項頁按鈕圖片
    updateSongMenuButtons();
    
    // 更新學習頁面默認顯示的字符
    const demoChar = document.getElementById('demoChar');
    if (demoChar) {
        demoChar.textContent = t('headChar');
    }
    const demoMeaning = document.getElementById('demoMeaning');
    if (demoMeaning) {
        demoMeaning.textContent = t('head');
    }
    
    // 重新渲染當前內容
    refreshCurrentContent();
    
    // 保存語言偏好
    localStorage.setItem('preferredLanguage', lang);
}

function refreshCurrentContent() {
    // 重新渲染 gameContainer 覆蓋層內容
    const container = document.getElementById('gameContainer');
    if (container && container.style.display !== 'none' && container.innerHTML.trim()) {
        // 根據當前活動重新渲染
        if (AppState.currentPage === 'poems') {
            // 詩詞頁面在 gameContainer 中沒有持久狀態，返回列表
            const poemList = document.querySelector('.poems-page');
            if (poemList) {
                document.querySelectorAll('.poem-box span').forEach((el, i) => {
                    if (i < 12) el.textContent = t('poem' + (i + 1));
                });
            }
        }
    }
    
    // 重新渲染學習模塊
    if (AppState.currentPage === 'learning' && AppState.currentSection !== undefined) {
        const section = AppState.currentSection;
        if (section === 0) renderQuiz();
        else if (section >= 1 && section <= 7) renderRecognition();
        else if (section === 8) renderWriting();
        else if (section === 9) renderStory();
        else if (section === 10) {
            if (gameState.currentActivity === 'menu') renderGameMenu();
            else if (gameState.currentActivity === 'matching') renderMatchingGame();
            else if (gameState.currentActivity === 'quiz') renderQuizGame();
            else if (gameState.currentActivity === 'memory') renderMemoryGame();
        }
    }
    
    // 更新課程介紹頁圖片
    if (AppState.currentPage === 'intro') {
        updateIntroImage();
    }
    
    // 更新子導航
    if (AppState.currentPage === 'learning') {
        updateSubNavVisibility(AppState.currentSection);
    }
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
    for (let i = 1; i <= 23; i++) {
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
    
    // 更新 alt 屬性
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        if (key) el.alt = t(key);
    });
    
    // 更新 title 標籤
    document.querySelectorAll('title[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) el.textContent = t(key);
    });
    
    // 通用 data-i18n 處理（僅處理無子元素的節點，避免破壞複雜結構）
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && el.children.length === 0) {
            const translated = t(key);
            if (translated !== key && el.textContent !== translated) {
                el.textContent = translated;
            }
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
    document.querySelectorAll('.lang-btn, .char2-lang-btn').forEach(btn => {
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
    
    // 更新課件學習頁背景與功能標籤圖片
    updateCoursewareImages();
    
    // 更新學段選擇頁按鈕圖片
    updateLevelButtons();
    
    // 更新內容類型選擇頁按鈕圖片
    updateCatButtons();
    
    // 更新唐詩列表頁圖片
    updatePoemImages();
    
    // 更新兒歌選項頁按鈕圖片
    updateSongMenuButtons();
    
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
            <img src="${charImg}" alt="${t('selectCharHint')}">
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

    // 切換頁面時先隱藏遊戲全螢幕層，避免遮蓋目標頁面
    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer) gameContainer.style.display = 'none';
    
    // 更新角色圖片
    updateCharacterImages(pageId);
    
    // 學習夥伴已移除，不再顯示角色引導和問候語
    
    if (pageId === 'intro') {
        updateIntroImage();
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
    AppState.selectedLevel = level;
    goTo('cats');
}

// 根據語言更新學段選擇頁按鈕圖片
function updateLevelButtons() {
    document.querySelectorAll('.level-btn').forEach(btn => {
        const src = AppState.language === 'zh-CN' ? btn.dataset.cn : btn.dataset.tw;
        if (src) btn.src = src;
    });
}

// 根據語言更新內容類型選擇頁按鈕圖片
function updateCatButtons() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        const src = AppState.language === 'zh-CN' ? btn.dataset.cn : btn.dataset.tw;
        if (src) btn.src = src;
    });
}

// 根據語言更新唐詩列表頁圖片
function updatePoemImages() {
    const title = document.querySelector('.poems-title-img');
    if (title) {
        title.src = AppState.language === 'zh-CN' ? title.dataset.cn : title.dataset.tw;
    }
    document.querySelectorAll('.poem-btn').forEach(btn => {
        const src = AppState.language === 'zh-CN' ? btn.dataset.cn : btn.dataset.tw;
        if (src) btn.src = src;
    });
}

// 根據語言更新兒歌選項頁按鈕圖片
function updateSongMenuButtons() {
    document.querySelectorAll('.songs-type-btn').forEach(btn => {
        const src = AppState.language === 'zh-CN' ? btn.dataset.cn : btn.dataset.tw;
        if (src) btn.src = src;
    });
}

// 課程介紹頁圖片映射（依單元與語言）
const introImages = {
    11: {
        tw: '課程介紹頁更新版/進入學習繁體按鈕.png',
        cn: '課程介紹頁更新版/進入學習簡體按鈕.png'
    }
};

// 根據語言與單元更新課程介紹頁進入學習圖片
function updateIntroImage() {
    const img = document.querySelector('.intro-enter-btn');
    if (!img) return;
    const mapping = introImages[AppState.currentChapter];
    if (mapping) {
        img.dataset.tw = mapping.tw;
        img.dataset.cn = mapping.cn;
    }
    const src = AppState.language === 'zh-CN' ? img.dataset.cn : img.dataset.tw;
    if (src) img.src = src;
}

// ============================================
// COURSEWARE COMMON SHELL
// ============================================
const coursewareConfig = {
    quiz: {
        bg: { tw: '課件背景/課前提問繁體背景.png', cn: '課件背景/課前提問簡體背景.png' },
        logo: '課件logo按鈕/課前提問logo按鈕.png'
    },
    recognition: {
        bg: { tw: '課件背景/識圖繁體背景.png', cn: '課件背景/識圖簡體背景.png' },
        logo: '課件logo按鈕/識圖logo按鈕.png'
    },
    writing: {
        bg: { tw: '課件背景/識字書寫繁體背景.png', cn: '課件背景/識字書寫簡體背景.png' },
        logo: '課件logo按鈕/識字logo按鈕.png'
    },
    story: {
        bg: { tw: '課件背景/故事繪本繁體背景.png', cn: '課件背景/故事繪本簡體背景.png' },
        logo: '課件logo按鈕/遊戲繪本logo按鈕.png'
    },
    game: {
        bg: { tw: '課件背景/遊戲繁體背景.png', cn: '課件背景/遊戲簡體背景.png' },
        logo: '課件logo按鈕/課前提問logo按鈕.png'
    }
};

const coursewareTabs = [
    { key: 'quiz', y: 337.4, h: 90.7, twShort: '長短按鈕/課前提問繁體短按鈕.png', cnShort: '長短按鈕/課前提問簡體短按鈕.png', twLong: '長短按鈕/課前提問繁體長按鈕.png', cnLong: '長短按鈕/課前提問簡體長按鈕.png' },
    { key: 'recognition', y: 426.9, h: 90.7, twShort: '長短按鈕/識圖繁體短按鈕.png', cnShort: '長短按鈕/識圖簡體短按鈕.png', twLong: '長短按鈕/識圖繁體長按鈕.png', cnLong: '長短按鈕/識圖簡體長按鈕.png' },
    { key: 'writing', y: 516.4, h: 91.9, twShort: '長短按鈕/識字繁體短按鈕.png', cnShort: '長短按鈕/識字簡體短按鈕.png', twLong: '長短按鈕/識字繁體長按鈕.png', cnLong: '長短按鈕/識字簡體長按鈕.png' },
    { key: 'story', y: 607.1, h: 90.7, twShort: '長短按鈕/繪本繁體短按鈕.png', cnShort: '長短按鈕/繪本簡體短按鈕.png', twLong: '長短按鈕/繪本繁體長按鈕.png', cnLong: '長短按鈕/繪本簡體長按鈕.png', twShortActive: '長短按鈕/繪本繁體短按鈕active.png', cnShortActive: '長短按鈕/繪本簡體短按鈕active.png', twLongActive: '長短按鈕/繪本繁體長按鈕active.png', cnLongActive: '長短按鈕/繪本簡體長按鈕active.png' },
    { key: 'game', y: 696.6, h: 91.9, twShort: '長短按鈕/活動繁體短按鈕.png', cnShort: '長短按鈕/活動簡體短按鈕.png', twLong: '長短按鈕/活動繁體長按鈕.png', cnLong: '長短按鈕/活動簡體長按鈕.png' }
];

const coursewareContainerIds = {
    quiz: 'quizContainer',
    recognition: 'recognitionContainer',
    writing: 'writingContainer',
    story: 'storyContainer',
    game: 'gameContainer'
};

function getCoursewareBgSrc(module) {
    const cfg = coursewareConfig[module];
    return AppState.language === 'zh-CN' ? cfg.bg.cn : cfg.bg.tw;
}

function getCoursewareTabSrc(tab, type) {
    return AppState.language === 'zh-CN' ? tab['cn' + type] : tab['tw' + type];
}

function renderCoursewareTabs(activeKey) {
    return `<div class="cw-tabs">` +
        coursewareTabs.map(tab => {
            const active = tab.key === activeKey ? 'active' : '';
            const shortSrc = getCoursewareTabSrc(tab, 'Short');
            const longSrc = active && tab.twLongActive ? getCoursewareTabSrc(tab, 'LongActive') : getCoursewareTabSrc(tab, 'Long');
            const onclick = active ? '' : `onclick="switchLearningModule('${tab.key}')"`;
            return `<div class="cw-tab ${active}" style="top:${tab.y}px;height:${tab.h}px;" ${onclick}>
                <div class="cw-tab-long"><img src="${longSrc}" alt=""></div>
                <div class="cw-tab-short" style="--tab-src:url('${shortSrc}')"><img src="${shortSrc}" alt=""></div>
            </div>`;
        }).join('') +
    `</div>`;
}

function coursewareCanPrev(module) {
    if (module === 'quiz') return quizState.currentIndex > 0;
    if (module === 'recognition') return recognitionState.currentIndex > 0;
    if (module === 'writing') return writingState.currentIndex > 0;
    if (module === 'story' && storyState.view === 'reader') return storyState.currentPageIndex > 0;
    if (module === 'game') return true;
    return false;
}

function coursewareCanNext(module) {
    if (module === 'quiz') return quizState.currentIndex < quizData.length - 1;
    if (module === 'recognition') return recognitionState.currentIndex < recognitionData.length - 1;
    if (module === 'writing') return writingState.currentIndex < writingData.length - 1;
    if (module === 'story' && storyState.view === 'reader') {
        const book = storyBooks[storyState.currentBookIndex];
        return storyState.currentPageIndex < book.pages.length - 1;
    }
    if (module === 'game') return true;
    return false;
}

function coursewarePrev(module) {
    if (module === 'quiz') prevQuiz();
    else if (module === 'recognition') prevRecognition();
    else if (module === 'writing') prevWritingWord();
    else if (module === 'story') {
        if (storyState.view === 'reader') {
            prevStoryPage();
        } else if (storyState.currentBookIndex > 0) {
            goToStory(storyState.currentBookIndex - 1);
        }
    } else if (module === 'game') {
        if (gameState.currentActivity !== 'menu') {
            backToGameMenu();
        } else {
            switchLearningModule('story');
        }
    }
}

function coursewareNext(module) {
    if (module === 'quiz') nextQuiz();
    else if (module === 'recognition') nextRecognition();
    else if (module === 'writing') nextWritingWord();
    else if (module === 'story') {
        if (storyState.view === 'reader') nextStoryPage();
        else if (storyState.currentBookIndex < storyBooks.length - 1) goToStory(storyState.currentBookIndex + 1);
    } else if (module === 'game') {
        if (gameState.currentActivity !== 'menu') {
            backToGameMenu();
        } else {
            goToUnitEnd();
        }
    }
}

function applyCoursewareShell(moduleKey) {
    const cfg = coursewareConfig[moduleKey];
    const containerId = coursewareContainerIds[moduleKey];
    const container = document.getElementById(containerId);
    if (!container) return;
    const content = container.innerHTML;
    if (!content.trim()) return;

    const prevDisabled = coursewareCanPrev(moduleKey) ? '' : 'disabled';
    const nextDisabled = coursewareCanNext(moduleKey) ? '' : 'disabled';
    const isGameMenu = moduleKey === 'game' && content.includes('game-menu-buttons');
    const nextAction = isGameMenu
        ? 'goToUnitEnd()'
        : `coursewareNext('${moduleKey}')`;

    container.innerHTML = `
        <div class="cw-page cw-theme-${moduleKey}" data-module="${moduleKey}">
            <img class="cw-bg" src="${getCoursewareBgSrc(moduleKey)}" alt="">
            <img class="cw-back-logo" src="${cfg.logo}" onclick="goTo('chapters', event)" alt="返回">
            ${renderCoursewareTabs(moduleKey)}
            <div class="cw-prev-btn ${prevDisabled}" onclick="coursewarePrev('${moduleKey}')"></div>
            <div class="cw-next-btn ${nextDisabled}" onclick="${nextAction}"></div>
            <div class="cw-content">${content}</div>
        </div>
    `;

    // 課件頁是動態生成的，必須重新計算縮放比例
    if (typeof updateStageScale === 'function') {
        updateStageScale('.cw-page', 1920, 1080);
    }
}

function updateCoursewareImages() {
    const page = document.querySelector('.cw-page');
    if (!page) return;
    const module = page.dataset.module;
    if (!module || !coursewareConfig[module]) return;

    const bg = page.querySelector('.cw-bg');
    if (bg) bg.src = getCoursewareBgSrc(module);

    page.querySelectorAll('.cw-tab').forEach((tabEl, i) => {
        const tab = coursewareTabs[i];
        if (!tab) return;
        const short = tabEl.querySelector('.cw-tab-short');
        const long = tabEl.querySelector('.cw-tab-long');
        if (short) short.src = getCoursewareTabSrc(tab, 'Short');
        if (long) long.src = getCoursewareTabSrc(tab, 'Long');
    });
}

// ============================================
// PAGE 5 & 6: POEMS & SONGS
// ============================================
function playSong(id) {
    const songs = [t('song1'), t('song2'), t('song3'), t('song4'), t('song5'), t('song6'), t('song7'), t('song8'), t('song9'), t('song10'), t('song11'), t('song12')];
    speakText(t('playAudio') + '：' + songs[id - 1]);
}

// ============================================
// PAGE 7: CHAPTERS
// ============================================
function showVolume(vol, el) {
    const target = el || event.currentTarget || event.target;
    document.querySelectorAll('.volume-tab').forEach(t => t.classList.remove('active'));
    if (target) target.classList.add('active');
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
    updateIntroImage();
    goTo('intro');
}

function getChapterTitle(num) {
    return t('chapter' + num);
}

function updateIntroTitle() {
    const titleEl = document.querySelector('.intro-topic');
    if (titleEl && AppState.currentChapter) {
        const title = getChapterTitle(AppState.currentChapter) || '';
        titleEl.textContent = t('lessonPrefix') + AppState.currentChapter + t('lessonSuffix') + title;
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
        const bodyParts = [t('eye'), t('ear'), t('nose'), t('mouth'), t('hand'), t('foot'), t('head')];
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

// ============================================
// 唐詩數據
// ============================================
const poemData = [
    { name: '靜夜思', videoId: 'ofZypMlVeLQ', cover: '唐诗/静夜思.png' },
    { name: '春曉', videoId: 'KpZkzQOdv0Q', cover: '唐诗/春晓.png' },
    { name: '詠鵝', videoId: 't7q70yhQ3Ro', cover: '唐诗/咏鹅.png' },
    { name: '憫農', videoId: 'ayEPQu5o_X4', cover: '唐诗/悯农.png' },
    { name: '登鸛雀樓', videoId: 'z36Ib24Ggq0', cover: '唐诗/登鹳雀楼.png' },
    { name: '江雪', videoId: '19VrhE3WpSE', cover: '唐诗/江雪.png' },
    { name: '問劉十九', videoId: 'mfSceN8bpcc', cover: '唐诗/问刘十九.png' },
    { name: '暮江吟', videoId: 'dhX2ZhGYAR0', cover: '唐诗/暮江吟.png' },
    { name: '望廬山瀑布', videoId: 'KXJTo_SVyF8', cover: '唐诗/望庐山瀑布.png' },
    { name: '早發白帝城', videoId: 'C9i70cAOaXQ', cover: '唐诗/早发白帝城.png' },
    { name: '黃鶴樓', videoId: 'lZG8gYtcDXM', cover: '唐诗/黄鹤楼.png' },
    { name: '山居秋暝', videoId: 'tQnYA_cQ2Ns', cover: '唐诗/山居秋暝.png' },
];

function goToPoemPlayer(index) {
    const poem = poemData[index];
    const container = document.getElementById('gameContainer');
    if (!container) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    container.innerHTML = `
        <div class="poem-player-page">
            <div class="poem-player-stage" style="--scale: ${scale}">
                <img class="poem-player-logo" src="第二頁元素更新版/綠色華字logo.png" alt="logo">
                <img class="poem-player-back" src="第四頁元素更新版/綠色返回logo.png" alt="返回" onclick="closePoemPlayer()">
                <div class="poem-player-wrapper">
                    <iframe src="https://www.youtube.com/embed/${poem.videoId}?rel=0"
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                </div>
            </div>
        </div>
    `;
    container.style.display = 'block';
}

function closePoemPlayer() {
    const container = document.getElementById('gameContainer');
    if (container) {
        container.innerHTML = '';
        container.style.display = 'none';
    }
}

function closeSongPage() {
    const container = document.getElementById('gameContainer');
    if (container) {
        container.innerHTML = '';
        container.style.display = 'none';
    }
}

// ============================================
// 兒歌數據
// ============================================
const commonSongData = [
    { id: 1, name: '上學歌', videoId: '', cover: '兒歌/上學歌.png' },
    { id: 2, name: '天氣歌', videoId: '', cover: '兒歌/天氣歌.png' },
];

const unitSongData = [
    // 上冊
    { id: 1, name: '一家人', videoId: '' },
    { id: 2, name: '幼兒園', videoId: '' },
    { id: 3, name: '數字', videoId: '' },
    { id: 4, name: '顏色', videoId: '' },
    { id: 5, name: '動物', videoId: '' },
    { id: 6, name: '水果', videoId: '' },
    { id: 7, name: '天氣', videoId: '' },
    { id: 8, name: '季節', videoId: '' },
    { id: 9, name: '運動', videoId: '' },
    { id: 10, name: '食物', videoId: '' },
    { id: 11, name: '身體', videoId: '' },
    // 下冊
    { id: 12, name: '交通工具', videoId: '' },
    { id: 13, name: '家庭成員', videoId: '' },
    { id: 14, name: '日常用品', videoId: '' },
    { id: 15, name: '蔬菜', videoId: '' },
    { id: 16, name: '飲料', videoId: '' },
    { id: 17, name: '職業', videoId: '' },
    { id: 18, name: '國家', videoId: '' },
    { id: 19, name: '節日', videoId: '' },
    { id: 20, name: '情緒', videoId: '' },
    { id: 21, name: '服裝', videoId: '' },
    { id: 22, name: '時間', videoId: '' },
    { id: 23, name: '自然', videoId: '' },
];

let currentSongBackPage = 'songs-menu';

function goToCommonSongs() {
    const container = document.getElementById('gameContainer');
    if (!container) return;
    currentSongBackPage = 'common-songs';
    const cells = commonSongData.map((song, idx) =>
        `<button class="song-cell" onclick="goToSongPlayer('common', ${idx})">
            <img class="song-cell-img" src="${song.cover}" alt="${t('commonSong'+song.id)}" onerror="this.style.display='none'">
            <span class="song-cell-title">${t('commonSong'+song.id)}</span>
        </button>`
    ).join('');
    container.innerHTML = `
        <div class="song-list-page">
            <button class="song-blue-btn song-back-btn" onclick="closeSongPage()" title="${t('back')}">◀</button>
            <div class="song-blue-btn song-logo-btn">${t('logoChar')}</div>
            <div class="song-pill" data-i18n="commonSongs">常用歌曲</div>
            <div class="song-grid">${cells}</div>
        </div>
    `;
    container.style.display = 'block';
}

function goToUnitSongs() {
    const container = document.getElementById('gameContainer');
    if (!container) return;
    currentSongBackPage = 'unit-songs';
    const upperCells = unitSongData.slice(0, 11).map((song, idx) =>
        `<button class="song-unit-cell" onclick="goToSongPlayer('unit', ${idx})"><span class="song-unit-title">${t('unitSong'+song.id)}</span></button>`
    ).join('');
    const lowerCells = unitSongData.slice(11).map((song, idx) =>
        `<button class="song-unit-cell" onclick="goToSongPlayer('unit', ${idx + 11})"><span class="song-unit-title">${t('unitSong'+song.id)}</span></button>`
    ).join('');
    container.innerHTML = `
        <div class="song-unit-page">
            <button class="song-blue-btn song-back-btn" onclick="closeSongPage()" title="${t('back')}">◀</button>
            <div class="song-blue-btn song-logo-btn">${t('logoChar')}</div>
            <div class="song-pill" data-i18n="unitSongs">單元歌曲</div>
            <div class="song-volume-tabs">
                <button class="song-volume-tab active" onclick="switchSongVolume(1)">${t('volumeUpper')}</button>
                <button class="song-volume-tab" onclick="switchSongVolume(2)">${t('volumeLower')}</button>
            </div>
            <div class="song-unit-grid" id="songUnitGridUpper">${upperCells}</div>
            <div class="song-unit-grid" id="songUnitGridLower" style="display:none;">${lowerCells}</div>
        </div>
    `;
    container.style.display = 'block';
}

function switchSongVolume(vol) {
    document.querySelectorAll('.song-volume-tab').forEach(t => t.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    const upper = document.getElementById('songUnitGridUpper');
    const lower = document.getElementById('songUnitGridLower');
    if (upper) upper.style.display = vol === 1 ? 'grid' : 'none';
    if (lower) lower.style.display = vol === 2 ? 'grid' : 'none';
}

function goToSongPlayer(type, index) {
    const song = type === 'common' ? commonSongData[index] : unitSongData[index];
    if (!song.videoId) {
        alert(t('videoPending'));
        return;
    }
    const container = document.getElementById('gameContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="song-player-page">
            <button class="song-blue-btn song-back-btn" onclick="${currentSongBackPage === 'common-songs' ? 'goToCommonSongs()' : 'goToUnitSongs()'}" title="${t('back')}">◀</button>
            <div class="song-blue-btn song-logo-btn">${t('logoChar')}</div>
            <div class="song-pill">${type==='common'?t('commonSong'+song.id):t('unitSong'+song.id)}</div>
            <div class="song-player-wrapper">
                <iframe src="https://www.youtube.com/embed/${song.videoId}?rel=0"
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
        </div>
    `;
    container.style.display = 'block';
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
        card: {
            tw: '故事繪本頁面更新版/故事卡片/11課故事一繁體.png',
            cn: '故事繪本頁面更新版/故事卡片/11課故事一簡體.png',
            width: 411.9, height: 587.3, x: 365.4, y: 247.5
        },
        pages: [
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 1.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 2.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 3.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 4.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 5.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 6.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/千變萬化的手/11課故事1問題1繁體.png', cn: '故事繪本頁面更新版/千變萬化的手/11課故事1問題1簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 7.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 8.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 9.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/千變萬化的手/11課故事1問題2繁體.png', cn: '故事繪本頁面更新版/千變萬化的手/11課故事1問題2簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 10.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 11.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/千變萬化的手/Picture 12.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/千變萬化的手/11課故事1問題3繁體.png', cn: '故事繪本頁面更新版/千變萬化的手/11課故事1問題3簡體.png' } }
        ]
    },
    {
        id: 'body',
        title: '我的身體',
        cover: '圖書封面/book_cover_body.png',
        card: {
            tw: '故事繪本頁面更新版/故事卡片/11課故事二繁體.png',
            cn: '故事繪本頁面更新版/故事卡片/11課故事二簡體.png',
            width: 389.2, height: 587.3, x: 776.7, y: 247.5
        },
        pages: [
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture a.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture b.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture c.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/我的身體/11課故事2問題1繁體.png', cn: '故事繪本頁面更新版/我的身體/11課故事2問題1簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture d.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/我的身體/11課故事2問題2繁體.png', cn: '故事繪本頁面更新版/我的身體/11課故事2問題2簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture e.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture f.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture g.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/我的身體/11課故事2問題3繁體.png', cn: '故事繪本頁面更新版/我的身體/11課故事2問題3簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture h.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture i.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture j.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/我的身體/Picture k.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/我的身體/11課故事2問題4繁體.png', cn: '故事繪本頁面更新版/我的身體/11課故事2問題4簡體.png' } }
        ]
    },
    {
        id: 'eyes',
        title: '眼睛的故事',
        cover: '圖書封面/book_cover_eyes.png',
        card: {
            tw: '故事繪本頁面更新版/故事卡片/11課故事三繁體.png',
            cn: '故事繪本頁面更新版/故事卡片/11課故事三簡體.png',
            width: 389.2, height: 587.3, x: 1165.4, y: 247.5
        },
        pages: [
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 一.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 二.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 三.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 四.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/眼睛的故事/11課故事3問題1繁體.png', cn: '故事繪本頁面更新版/眼睛的故事/11課故事3問題1簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 五.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/眼睛的故事/11課故事3問題2繁體.png', cn: '故事繪本頁面更新版/眼睛的故事/11課故事3問題2簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 六.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 七.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 八.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 九.jpg' },
            { type: 'question', image: { tw: '故事繪本頁面更新版/眼睛的故事/11課故事3問題3繁體.png', cn: '故事繪本頁面更新版/眼睛的故事/11課故事3問題3簡體.png' } },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 十.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 十一.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 十二.jpg' },
            { type: 'image', image: '故事繪本頁面更新版/眼睛的故事/Picture 十三.jpg' }
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

    const booksHtml = storyBooks.map((book, index) => {
        const src = AppState.language === 'zh-CN' ? book.card.cn : book.card.tw;
        const c = book.card;
        return `
            <div class="story-book-card" onclick="goToStory(${index})" style="left:${c.x}px;top:${c.y}px;width:${c.width}px;height:${c.height}px;">
                <img src="${src}" alt="${book.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'story-page-placeholder\'><span class=\'placeholder-icon\'>📖</span><span>${t('coverPlaceholder')}</span></div>';">
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="story-page">
            <div class="story-selection">
                <div class="story-books-grid">
                    ${booksHtml}
                </div>
            </div>
        </div>
    `;
    applyCoursewareShell('story');
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

    let contentHtml = '';
    if (page.type === 'question') {
        const src = AppState.language === 'zh-CN' ? page.image.cn : page.image.tw;
        contentHtml = `<img class="story-reader-question" src="${src}" alt="" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'story-page-placeholder\\'><span class=\\'placeholder-icon\\'>🖼️</span><span>${t('pagePlaceholder')}</span></div>';">`;
    } else {
        contentHtml = `
            <img class="story-reader-card" src="故事繪本頁面更新版/故事頁面卡片.png" alt="">
            <img class="story-reader-image" src="${page.image}" alt="" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'story-page-placeholder\\'><span class=\\'placeholder-icon\\'>🖼️</span><span>${t('pagePlaceholder')}</span></div>';">
        `;
    }

    container.innerHTML = `
        <div class="story-page">
            <div class="story-reader">
                ${contentHtml}
            </div>
        </div>
    `;
    applyCoursewareShell('story');
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
    quiz: { currentQ: 0, selected: new Set(), answered: false, correctCount: 0 },
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
    gameState.quiz = { currentQ: 0, selected: new Set(), answered: false, correctCount: 0 };
}

function resetMemoryGame() {
    gameState.memory = { cards: [], flipped: [], matched: new Set(), canFlip: true };
}

const gameStarConfigs = {
    matching: { count: 7, x: 742.6, y: 902.6, gap: 7, w: 48.7, h: 46.4 },
    quiz:     { count: 4, x: 851.9, y: 902.6, gap: 7, w: 48.7, h: 46.4 },
    memory:   { count: 6, x: 798.4, y: 902.6, gap: 7, w: 48.7, h: 46.4 }
};

function renderGameStars(game, earned) {
    const cfg = gameStarConfigs[game];
    if (!cfg) return '';
    const starPath = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
    let html = '';
    for (let i = 0; i < cfg.count; i++) {
        const x = cfg.x + i * (cfg.w + cfg.gap);
        const fill = i < earned ? '#FFD700' : '#BDBDBD';
        html += `<div class="game-star" style="left:${x}px;top:${cfg.y}px;width:${cfg.w}px;height:${cfg.h}px;"><svg viewBox="0 0 24 24" fill="${fill}"><path d="${starPath}"/></svg></div>`;
    }
    return `<div class="game-stars-bar">${html}</div>`;
}

/* ---------- 活動選擇菜單 ---------- */

function renderGameMenu() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    gameState.currentActivity = 'menu';

    const isCN = AppState.language === 'zh-CN';
    const suffix = isCN ? '簡體' : '繁體';
    const btns = [
        { id: 'matching', src: `遊戲頁面更新版/圖案匹配${suffix}按鈕.png`, w: 411.9, h: 587.3, x: 365.4, y: 247.5 },
        { id: 'quiz',     src: `遊戲頁面更新版/文字選擇${suffix}按鈕.png`, w: 389.2, h: 587.3, x: 776.7, y: 247.5 },
        { id: 'memory',   src: `遊戲頁面更新版/記憶翻牌${suffix}按鈕.png`, w: 389.2, h: 587.3, x: 1165.4, y: 247.5 }
    ];

    const btnsHtml = btns.map(b => `
        <div class="game-menu-btn" onclick="startGameActivity('${b.id}')" style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;">
            <img src="${b.src}" alt="">
        </div>
    `).join('');

    container.innerHTML = `
        <div class="game-page">
            <div class="game-menu-buttons">${btnsHtml}</div>
        </div>
    `;
    applyCoursewareShell('game');
}

function startGameActivity(id) {
    gameState.currentActivity = id;
    document.querySelectorAll('.game-matching-lines').forEach(el => el.remove());
    if (id === 'matching') renderMatchingGame();
    else if (id === 'quiz') renderQuizGame();
    else if (id === 'memory') renderMemoryGame();
}

function backToGameMenu() {
    gameState.currentActivity = 'menu';
    document.querySelectorAll('.game-matching-lines').forEach(el => el.remove());
    renderGameMenu();
}

function goToUnitEnd() {
    goTo('unit-end');
}

function unitEndBackToPrevious() {
    goTo('learning');
    switchLearningModule('game');
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
    const hanziKeyMap = {'頭': 'headChar', '耳': 'earChar', '腳': 'footChar', '鼻': 'noseChar', '眼': 'eyeChar', '口': 'mouthChar', '手': 'handChar'};

    const imagesHtml = shuffledData.map((item, i) => `
        <div class="game-matching-image ${gameState.matching.matched.has(item.hanzi) ? 'matched' : ''}"
             data-hanzi="${item.hanzi}" data-side="image" data-idx="${i}"
             onclick="handleMatchingClick(this)">
            <img src="${item.image}" alt="${t(hanziKeyMap[item.hanzi] || item.hanzi)}">
        </div>
    `).join('');

    const textsHtml = shuffledTexts.map((item, i) => `
        <div class="game-matching-text ${gameState.matching.matched.has(item.hanzi) ? 'matched' : ''}"
             data-hanzi="${item.hanzi}" data-side="text" data-idx="${i}"
             onclick="handleMatchingClick(this)">
            ${t(hanziKeyMap[item.hanzi] || item.hanzi)}
        </div>
    `).join('');

    const progress = gameState.matching.matched.size;

    container.innerHTML = `
        <div class="game-page">
            <div class="game-matching">
                <div class="game-matching-area" id="matchingArea">
                    <div class="game-matching-row images">${imagesHtml}</div>
                    <div class="game-matching-row texts">${textsHtml}</div>
                </div>
            </div>
            ${renderGameStars('matching', progress)}
        </div>
    `;

    requestAnimationFrame(() => drawMatchingLines());
    applyCoursewareShell('game');

    if (window.__matchingLinesResize) window.removeEventListener('resize', window.__matchingLinesResize);
    window.__matchingLinesResize = () => {
        if (gameState.currentActivity === 'matching') drawMatchingLines();
        else document.querySelectorAll('.game-matching-lines').forEach(el => el.remove());
    };
    window.addEventListener('resize', window.__matchingLinesResize);
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
                setTimeout(() => showGameComplete(t('allMatchedMatching'), () => {
                    resetMatchingGame();
                    startGameActivity('quiz');
                }), 600);
            }
        } else {
            // Wrong
            playWrongSound();
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

function getOffsetRelativeTo(el, ancestor) {
    let x = 0;
    let y = 0;
    let cur = el;
    while (cur && cur !== ancestor) {
        x += cur.offsetLeft;
        y += cur.offsetTop;
        cur = cur.offsetParent;
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function drawMatchingLines() {
    document.querySelectorAll('.game-matching-lines').forEach(el => el.remove());

    if (gameState.matching.matchedPairs.length === 0) return;

    const area = document.getElementById('matchingArea');
    if (!area) return;
    const page = area.closest('.game-page');
    if (!page) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'game-matching-lines');
    svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;overflow:visible;';

    gameState.matching.matchedPairs.forEach((pair) => {
        const imgEl = document.querySelector(`.game-matching-image[data-hanzi="${pair.image}"]`);
        const txtEl = document.querySelector(`.game-matching-text[data-hanzi="${pair.text}"]`);
        if (!imgEl || !txtEl) return;

        const imgOff = getOffsetRelativeTo(imgEl, page);
        const txtOff = getOffsetRelativeTo(txtEl, page);

        const x1 = imgOff.x + imgOff.w / 2;
        const y1 = imgOff.y + imgOff.h;
        const x2 = txtOff.x + txtOff.w / 2;
        const y2 = txtOff.y;

        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#E91E63');
        line.setAttribute('stroke-width', '4');
        svg.appendChild(line);
    });

    page.appendChild(svg);
}

/* ---------- 活動2：文字選擇題 ---------- */

function renderQuizGame() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    const q = gameQuizQuestions[gameState.quiz.currentQ];
    const gqi = gameState.quiz.currentQ;

    const cardsHtml = q.options.map((opt, i) => {
        let cls = 'game-quiz-card';
        let mark = '';
        if (gameState.quiz.answered) {
            const isCorrect = Array.isArray(q.correct) ? q.correct.includes(i) : i === q.correct;
            if (isCorrect) {
                cls += ' correct';
                mark = '<div class="game-quiz-mark">✓</div>';
            } else if (gameState.quiz.selected.has(i)) {
                cls += ' wrong';
                mark = '<div class="game-quiz-mark">✗</div>';
            }
            cls += ' disabled';
        } else if (gameState.quiz.selected.has(i)) {
            cls += ' selected';
        }
        return `<div class="${cls}" data-idx="${i}" onclick="handleQuizClick(${i})"><span>${t('gameQuizQ' + gqi + 'Opt' + i)}</span>${mark}</div>`;
    }).join('');

    const multiHint = q.type === 'multi' ? `<div class="game-quiz-hint">${t('multiSelectHint')}</div>` : '';

    container.innerHTML = `
        <div class="game-page">
            <div class="game-page-title">${t('gameQuiz')}</div>
            <div class="game-quiz">
                <div class="game-quiz-question">${t('gameQuizQ' + gqi)}</div>
                ${multiHint}
                <div class="game-quiz-cards">${cardsHtml}</div>
            </div>
            ${renderGameStars('quiz', gameState.quiz.correctCount || 0)}
        </div>
    `;
    applyCoursewareShell('game');
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
            playWrongSound();
            renderQuizGame();
            setTimeout(() => {
                if (gameState.quiz.currentQ < gameQuizQuestions.length - 1) {
                    gameState.quiz.currentQ++;
                    gameState.quiz.selected = new Set();
                    gameState.quiz.answered = false;
                    renderQuizGame();
                } else {
                    showGameComplete(t('allMatchedQuiz'), () => {
                        resetQuizGame();
                        startGameActivity('memory');
                    });
                }
            }, 1200);
        } else if (allCorrectSelected) {
            gameState.quiz.answered = true;
            gameState.score++;
            gameState.quiz.correctCount = (gameState.quiz.correctCount || 0) + 1;
            playCorrectSound();
            renderQuizGame();
            setTimeout(() => {
                if (gameState.quiz.currentQ < gameQuizQuestions.length - 1) {
                    gameState.quiz.currentQ++;
                    gameState.quiz.selected = new Set();
                    gameState.quiz.answered = false;
                    renderQuizGame();
                } else {
                    showGameComplete(t('allMatchedQuiz'), () => {
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
            gameState.quiz.correctCount = (gameState.quiz.correctCount || 0) + 1;
            playCorrectSound();
        } else {
            playWrongSound();
        }
        renderQuizGame();
        setTimeout(() => {
            if (gameState.quiz.currentQ < gameQuizQuestions.length - 1) {
                gameState.quiz.currentQ++;
                gameState.quiz.selected = new Set();
                gameState.quiz.answered = false;
                renderQuizGame();
            } else {
                showGameComplete(t('allMatchedQuiz'), () => {
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

    if (gameState.memory.cards.length === 0) {
        const pairs = [...gameMemoryData].sort(() => Math.random() - 0.5).slice(0, 6);
        const hzk = {'頭': 'headChar', '耳': 'earChar', '腳': 'footChar', '鼻': 'noseChar', '眼': 'eyeChar', '口': 'mouthChar', '手': 'handChar'};
        const deck = [...pairs, ...pairs].map((item, i) => ({ ...item, id: i, displayHanzi: t(hzk[item.hanzi] || item.hanzi) })).sort(() => Math.random() - 0.5);
        gameState.memory.cards = deck;
    }

    const tops = [227.4, 442.9, 658.4];
    const gridHtml = gameState.memory.cards.map((card, i) => {
        const isFlipped = gameState.memory.flipped.includes(i) || gameState.memory.matched.has(i);
        const isMatched = gameState.memory.matched.has(i);
        const col = i % 4;
        const row = Math.floor(i / 4);
        const left = 538.5 + col * 213.2;
        const top = tops[row];
        return `
            <div class="game-memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}"
                 data-idx="${i}" onclick="handleMemoryClick(${i})"
                 style="left:${left}px;top:${top}px;">
                <div class="game-memory-card-inner">
                    <div class="game-memory-front">?</div>
                    <div class="game-memory-back">
                        <img src="${card.image}" alt="${card.hanzi}">
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const pairsMatched = gameState.memory.matched.size / 2;

    container.innerHTML = `
        <div class="game-page">
            <div class="game-memory">
                <div class="game-memory-grid">${gridHtml}</div>
            </div>
            ${renderGameStars('memory', pairsMatched)}
        </div>
    `;
    applyCoursewareShell('game');
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
                    setTimeout(() => showGameComplete(t('allMatchedMatching'), () => {
                        resetMemoryGame();
                        renderWritingPage();
                    }), 600);
                }
            }, 600);
        } else {
            // No match
            playWrongSound();
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
            <button class="game-writing-back-btn" onclick="backToGameMenu()" title="${t('back')}">◀</button>
            <div class="game-writing-card">
                <img src="第六頁/練習寫字環節卡片.png?v=2" alt="${t('writingPracticeTitle')}"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'game-writing-placeholder\\'>${t('imagePlaceholder')}</div>';">
            </div>
            <h2 class="game-writing-title">${t('writingPracticeTitle')}</h2>
            <button class="game-writing-done-btn" onclick="goToLevels()" title="${t('complete')}">✓</button>
        </div>
    `;
    applyCoursewareShell('game');
}

function goToLevels() {
    const container = document.getElementById('gameContainer');
    if (container) {
        container.innerHTML = '';
        container.style.display = 'none';
    }
    goTo('levels');
}

/* ---------- 通用輔助函數 ---------- */

function playCorrectSound() {
    try {
        const audio = new Audio('音效/correct_answer copy.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
    } catch(e) {}
}

function playWrongSound() {
    try {
        const audio = new Audio('音效/wrong_answer copy.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
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
            <button class="complete-btn" onclick="this.closest('.game-complete-overlay').remove();">${t('continueBtn')}</button>
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
// POEMS PAGE - 唐詩卡片點擊由 HTML onclick 直接處理
// ============================================

console.log('🦁 大地幼教学材已加载');
// Cache bust: 1774964562


// ============================================
// QUIZ SYSTEM - 課前提問
// ============================================

const quizData = [
    {
        type: 'choice',
        mode: 'multi',
        question: '小朋友，你知道我們的身體有哪些部位嗎？',
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
        landmarks: [
            { cx: 38.0, cy: 42.0, w: 50, h: 20 },
            { cx: 61.0, cy: 42.0, w: 50, h: 20 }
        ]
    },
    {
        type: 'photo',
        target: '眼睛',
        question: '眼睛在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '眼睛',
        landmarks: [
            { cx: 40.0, cy: 49.0, w: 45, h: 30 },
            { cx: 59.0, cy: 49.0, w: 45, h: 30 }
        ]
    },
    {
        type: 'photo',
        target: '鼻子',
        question: '鼻子在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '鼻子',
        landmarks: [
            { cx: 50.0, cy: 55.0, w: 40, h: 55 }
        ]
    },
    {
        type: 'photo',
        target: '耳朵',
        question: '耳朵在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '耳朵',
        landmarks: [
            { cx: 27.0, cy: 54.0, w: 38, h: 75 },
            { cx: 72.0, cy: 54.0, w: 38, h: 75 }
        ]
    },
    {
        type: 'photo',
        target: '嘴巴',
        question: '嘴巴在那裡？',
        buttons: ['眉毛', '眼睛', '鼻子', '耳朵', '嘴巴'],
        activeButton: '嘴巴',
        landmarks: [
            { cx: 50.0, cy: 66.0, w: 58, h: 32 }
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
            <div class="quiz-title-pill">${t('sectionIntro')}</div>
            <div class="quiz-pink-circle" style="font-size:22px;font-weight:bold;">${t('logoChar')}</div>
        </div>
        <div class="quiz-side-tabs">
            <div class="quiz-side-tab active" onclick="switchLearningModule('quiz')"><span>❓</span> ${t('sectionIntro')}</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('recognition')"><span>👁️</span> ${t('sectionLearning')}</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('writing')"><span>✏️</span> ${t('sectionWriting')}</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('story')"><span>📚</span> ${t('sectionStory')}</div>
            <div class="quiz-side-tab" onclick="switchLearningModule('game')"><span>🎮</span> ${t('sectionGames')}</div>
        </div>
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
    applyCoursewareShell('quiz');
}

function renderChoiceQuestion(q) {
    const qi = quizState.currentIndex;
    const cardsHtml = q.options.map((opt, i) => {
        let stateClass = '';
        const isSelected = quizState.selectedCards.has(i);
        if (isSelected) {
            stateClass = opt.correct ? 'correct' : 'wrong';
        }
        return `
            <div class="quiz-card ${stateClass}" onclick="handleCardClick(${i}, ${opt.correct})">
                <div class="quiz-card-icon">${opt.icon}</div>
                <div class="quiz-card-label">${t('quizQ' + qi + 'Opt' + i)}</div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="quiz-choice-mode">
            <div class="quiz-question">${t('quizQ' + qi)}</div>
            <div class="quiz-cards">${cardsHtml}</div>
        </div>
    `;
}

function renderPhotoQuestion(q) {
    const qi = quizState.currentIndex;
    const btnMap = {'眉毛': 'eyebrow', '眼睛': 'eye', '鼻子': 'nose', '耳朵': 'ear', '嘴巴': 'mouth'};
    const buttonsHtml = q.buttons.map((btn, i) => {
        const isActive = btn === q.activeButton;
        return `<div class="quiz-photo-btn ${isActive ? 'active' : ''}">${t('quizQ' + qi + 'Btn' + i)}</div>`;
    }).join('');
    
    // 渲染所有已保存的標記
    const markersHtml = quizState.markers.map(m => 
        `<div class="quiz-marker" style="width:${m.w}px;height:${m.h}px;left:${m.left}%;top:${m.top}%;"></div>`
    ).join('');
    
    return `
        <div class="quiz-photo-mode">
            <div class="quiz-photo-question">${t('quizQ' + qi)}</div>
            <div class="quiz-photo-left">${buttonsHtml}</div>
            <div class="quiz-photo-area" id="photoArea" onclick="handlePhotoClick(event)">
                <img src="真人圖片標記_11課身體.png" alt="${t('realPhoto')}">
                ${markersHtml}
            </div>
        </div>
    `;
}

function handleCardClick(index, isCorrect) {
    const q = quizData[quizState.currentIndex];
    
    if (q.mode === 'multi') {
        const wasSelected = quizState.selectedCards.has(index);
        if (wasSelected) {
            quizState.selectedCards.delete(index);
        } else {
            quizState.selectedCards.add(index);
            // 每選擇一個正確答案播放一次答對音效；選到錯誤選項播放答錯音效
            if (q.options[index].correct) {
                playCorrectSound();
            } else {
                playWrongSound();
            }
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
                playCorrectSound();
                playConfetti();
            }
        } else {
            quizState.selectedCards = new Set([index]);
            playWrongSound();
        }
        renderQuiz();
    }
}

function handlePhotoClick(event) {
    const q = quizData[quizState.currentIndex];
    const area = document.getElementById('photoArea');
    if (!area || !q.landmarks || q.landmarks.length === 0) return;

    // 容器設計尺寸與圖片實際顯示尺寸（object-fit: contain）
    const AREA_W = 750;
    const AREA_H = 580;
    const IMG_SIZE = 580;
    const IMG_OFFSET_X = 85;

    const areaRect = area.getBoundingClientRect();
    const scale = areaRect.width / AREA_W;

    // 把點擊位置換算成容器設計座標
    const xDesign = (event.clientX - areaRect.left) / scale;
    const yDesign = (event.clientY - areaRect.top) / scale;

    // 換算成相對於 580×580 圖片區域的座標與百分比
    const imgX = xDesign - IMG_OFFSET_X;
    const imgY = yDesign;
    if (imgX < 0 || imgX > IMG_SIZE || imgY < 0 || imgY > IMG_SIZE) return;

    const xPct = (imgX / IMG_SIZE) * 100;
    const yPct = (imgY / IMG_SIZE) * 100;

    // 找到最近的五官中心點
    let nearest = null;
    let minDist = Infinity;
    for (const lm of q.landmarks) {
        const dx = xPct - lm.cx;
        const dy = yPct - lm.cy;
        const dist = dx * dx + dy * dy;
        if (dist < minDist) {
            minDist = dist;
            nearest = lm;
        }
    }

    if (!nearest) return;

    // 判斷點擊位置是否在該五官的標記範圍內
    const halfWPct = (nearest.w / 2 / IMG_SIZE) * 100;
    const halfHPct = (nearest.h / 2 / IMG_SIZE) * 100;
    const threshold = halfWPct * halfWPct + halfHPct * halfHPct;
    const isCorrect = minDist <= threshold;

    if (!isCorrect) {
        playWrongSound();
        return;
    }

    // 把中心點轉回容器百分比，讓標記正確貼在圖片上
    const leftPct = ((nearest.cx / 100) * IMG_SIZE + IMG_OFFSET_X) / AREA_W * 100;
    const topPct = (nearest.cy / 100) * IMG_SIZE / AREA_H * 100;

    playCorrectSound();

    quizState.markers.push({
        left: leftPct,
        top: topPct,
        w: nearest.w,
        h: nearest.h
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
    const hk = {'頭': 'headChar', '耳': 'earChar', '腳': 'footChar', '鼻': 'noseChar', '眼': 'eyeChar', '口': 'mouthChar', '手': 'handChar'};

    const html = `
        <div class="recognition-page">
            <!-- 上方 7 個詞彙圓圈 -->
            <div class="rec-word-nav">
                ${recognitionData.map((w, i) => `<button class="rec-word-btn ${i === recognitionState.currentIndex ? 'active' : ''}" onclick="goToRecognition(${i})">${t(hk[w.hanzi] || w.hanzi)}</button>`).join('')}
            </div>

            <!-- 左側圖片 -->
            <div class="rec-image-area">
                <img src="${item.image}" alt="${t(hk[item.hanzi] || item.hanzi)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <div class="rec-image-fallback" style="background:${item.color}22;border:4px dashed ${item.color};">
                    <div style="text-align:center;">
                        <div style="font-size:120px;color:${item.color};font-weight:bold;">${t(hk[item.hanzi] || item.hanzi)}</div>
                        <div style="font-size:16px;color:#888;margin-top:10px;">${t('bodyPartDiagram')}</div>
                    </div>
                </div>
            </div>

            <!-- 右側文字 -->
            <div class="rec-text-area">
                <button class="rec-speaker" onclick="playPronunciation()" title="${t('playAudio')}">🔊</button>
                <div class="rec-pinyin">${item.pinyin}</div>
                <div class="rec-hanzi">${t(hk[item.hanzi] || item.hanzi)}</div>
                <div class="rec-definition">${t('recDef' + (recognitionState.currentIndex + 1))}</div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    applyCoursewareShell('recognition');
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

    // 更新全局狀態
    const sectionMap = { quiz: 0, recognition: 1, writing: 8, story: 9, game: 10 };
    const mainMap = { quiz: 'intro', recognition: 'learning', writing: 'writing', story: 'story', game: 'games' };
    AppState.currentSection = sectionMap[module] ?? 0;
    currentMainSection = mainMap[module] ?? 'intro';
    AppState.currentLearningModule = module;

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
        videoTraditional: '../筆畫動畫/頭-繁體筆畫.mov',
        videoSimplified: '../筆畫動畫/頭-簡體筆畫.mov'
    },
    {
        hanzi: '耳', pinyin: 'ěr', simpleHanzi: '耳',
        videoTraditional: '../筆畫動畫/耳-繁體簡體筆畫.mov',
        videoSimplified: '../筆畫動畫/耳-繁體簡體筆畫.mov'
    },
    {
        hanzi: '腳', pinyin: 'jiǎo', simpleHanzi: '脚',
        videoTraditional: '../筆畫動畫/腳-繁體筆畫.mov',
        videoSimplified: '../筆畫動畫/腳-簡體筆畫.mov'
    },
    {
        hanzi: '鼻', pinyin: 'bí', simpleHanzi: '鼻',
        videoTraditional: '../筆畫動畫/鼻-繁體簡體.mov',
        videoSimplified: '../筆畫動畫/鼻-繁體簡體.mov'
    },
    {
        hanzi: '眼', pinyin: 'yǎn', simpleHanzi: '眼',
        videoTraditional: '../筆畫動畫/眼-繁體簡體.mov',
        videoSimplified: '../筆畫動畫/眼-繁體簡體.mov'
    },
    {
        hanzi: '口', pinyin: 'kǒu', simpleHanzi: '口',
        videoTraditional: '../筆畫動畫/口-繁體簡體.mov',
        videoSimplified: '../筆畫動畫/口-繁體簡體.mov'
    },
    {
        hanzi: '手', pinyin: 'shǒu', simpleHanzi: '手',
        videoTraditional: '../筆畫動畫/手-繁體簡體.mov',
        videoSimplified: '../筆畫動畫/手-繁體簡體.mov'
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
    const whk = {'頭': 'headChar', '耳': 'earChar', '腳': 'footChar', '鼻': 'noseChar', '眼': 'eyeChar', '口': 'mouthChar', '手': 'handChar'};
    const riceGridSvg = `<svg class="writing-rice-grid" viewBox="0 0 200 200" preserveAspectRatio="none">
        <line x1="100" y1="0" x2="100" y2="200" />
        <line x1="0" y1="100" x2="200" y2="100" />
        <line x1="0" y1="0" x2="200" y2="200" />
        <line x1="200" y1="0" x2="0" y2="200" />
    </svg>`;

    const html = `
        <div class="writing-page">
            <!-- 上方 7 個詞彙圓圈 -->
            <div class="writing-word-nav">
                ${writingData.map((w, i) =>
                    `<button class="writing-word-btn ${i === writingState.currentIndex ? 'active' : ''}" onclick="goToWriting(${i})">${t(whk[w.hanzi] || w.hanzi)}</button>`
                ).join('')}
            </div>

            <!-- 左邊筆順展示區域 -->
            <div class="writing-stroke-area">
                <div class="writing-model-box" id="writingModelBox">
                    ${riceGridSvg}
                    <div class="writing-model-char">${t(whk[item.hanzi] || item.hanzi)}</div>
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
                <button class="writing-pencil-btn" onclick="playWritingAnimation()" title="${t('strokeAnimation')}">✏️</button>
            </div>

            <!-- 右邊手寫練習區域 -->
            <div class="writing-canvas-area">
                <div class="writing-canvas-box" id="writingCanvasBox">
                    <svg class="writing-canvas-grid" viewBox="0 0 200 200" preserveAspectRatio="none">
                        <line x1="100" y1="0" x2="100" y2="200" />
                        <line x1="0" y1="100" x2="200" y2="100" />
                        <line x1="0" y1="0" x2="200" y2="200" />
                        <line x1="200" y1="0" x2="0" y2="200" />
                    </svg>
                    <canvas id="writingCanvas" width="640" height="640"></canvas>
                </div>
                <div class="writing-action-btns">
                    <button class="writing-btn-clear" onclick="clearWritingCanvas()">${t('clear')}</button>
                    <button class="writing-btn-done" onclick="nextWritingWord()">${t('complete')}</button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    applyCoursewareShell('writing');

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

    // 設置 Canvas 實際像素尺寸為顯示尺寸的 2 倍（Retina 清晰）
    const rect = box.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 8;
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
    // 考慮 Canvas 實際像素與顯示尺寸的縮放比例（適用 Retina 及 CSS transform 縮放）
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
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
    writingCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
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

// 備援：遊戲活動選擇頁面的右箭嘴點擊直接進入單元結束頁面
document.addEventListener('click', function(e) {
    const nextBtn = e.target.closest('.cw-next-btn');
    if (!nextBtn) return;
    const page = nextBtn.closest('.cw-page');
    if (!page || page.dataset.module !== 'game') return;
    const menu = page.querySelector('.game-menu-buttons');
    if (!menu) return;
    e.preventDefault();
    e.stopPropagation();
    goToUnitEnd();
}, true);
