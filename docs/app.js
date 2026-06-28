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
        
        // 動物單字
        animalCharChick: '雞',
        animalCharLamb: '羊',
        animalCharCalf: '牛',
        animalCharPony: '馬',
        animalCharRabbit: '兔',
        animalCharCat: '貓',
        animalCharDog: '狗',
        animalCharPig: '豬',
        animalCharGoose: '鵝',
        animalCharDuck: '鴨',
        animalCharBug: '蟲',
        animalCharFish: '魚',
        animalCharBird: '鳥',
        animalCharElephant: '象',
        animalCharTiger: '虎',
        
        // 數字單字
        numberCharOne: '一',
        numberCharTwo: '二',
        numberCharThree: '三',
        numberCharFour: '四',
        numberCharFive: '五',
        numberCharSix: '六',
        numberCharSeven: '七',
        numberCharEight: '八',
        numberCharNine: '九',
        numberCharTen: '十',
        
        // 第5課：家人（一）
        familyCharBig: '大',
        familyCharSmall: '小',
        familyCharMale: '男',
        familyCharFemale: '女',
        familyCharMom: '媽',
        familyCharDad: '爸',
        familyCharBrother: '哥',
        familyCharYoungerBrother: '弟',
        familyCharSister: '姐',
        familyCharYoungerSister: '妹',
        familyCharI: '我',
        familyCharYou: '你',
        familyCharShe: '她',
        familyCharHe: '他',
        familyCharIt: '它',
        familyCharAnimalIt: '牠',
        
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
        memoryPeekHint: '按一下看全部圖案，再按一下開始玩',
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
        chapter1: '數字',
        chapter2: '幼兒園',
        chapter3: '數字',
        chapter4: '顏色',
        chapter5: '家人（一）',
        chapter6: '水果',
        chapter7: '動物（一）',
        chapter8: '季節',
        chapter9: '動物（三）',
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
        poem2: '憫農',
        poem3: '山村詠懷',
        poem4: '詠柳',
        poem5: '江南',
        poem6: '遊子吟',
        poem7: '登鸛雀樓',
        poem8: '江雪',
        poem9: '望廬山瀑布',
        poem10: '黃鶴樓',
        poem11: '春曉',
        poem12: '詠鵝',
        
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
        
        // 單元7：動物 課前提問
        quiz7Q0: '抬頭看看天空，什麼動物會在天上飛呢？',
        quiz7Q0Opt0: '小鳥',
        quiz7Q0Opt1: '小魚',
        quiz7Q0Opt2: '小狗',
        quiz7Q0Opt3: '小貓',
        quiz7Q1: '看看池塘裡，什麼動物會在水中游呢？',
        quiz7Q1Opt0: '小雞',
        quiz7Q1Opt1: '小魚',
        quiz7Q1Opt2: '小鳥',
        quiz7Q1Opt3: '小羊',
        quiz7Q2: '草地上有隻小動物，牠正在吃小蟲子，是誰呢？',
        quiz7Q2Opt0: '小雞',
        quiz7Q2Opt1: '小牛',
        quiz7Q2Opt2: '小馬',
        quiz7Q2Opt3: '小豬',
        quiz7Q3: '草原上有隻大動物，牠正在低頭吃草，是誰呢？',
        quiz7Q3Opt0: '小貓',
        quiz7Q3Opt1: '小狗',
        quiz7Q3Opt2: '小牛',
        quiz7Q3Opt3: '小雞',
        quiz7Q4: '農場裡有隻圓滾滾的動物，牠胖胖的，是誰呢？',
        quiz7Q4Opt0: '小馬',
        quiz7Q4Opt1: '小豬',
        quiz7Q4Opt2: '小兔',
        quiz7Q4Opt3: '小鳥',
        quiz7Q5: '森林裡有隻小動物，牠有長長的耳朵，是誰呢？',
        quiz7Q5Opt0: '小兔',
        quiz7Q5Opt1: '小貓',
        quiz7Q5Opt2: '小狗',
        quiz7Q5Opt3: '小雞',
        quiz7Q6: '動物園裡有隻動物，牠有長長的鼻子，是誰呢？',
        quiz7Q6Opt0: '小豬',
        quiz7Q6Opt1: '小狗',
        quiz7Q6Opt2: '大象',
        quiz7Q6Opt3: '小兔',
        quiz7Q7: '草原上有隻動物，牠頭上有尖尖的角，是誰呢？',
        quiz7Q7Opt0: '小馬',
        quiz7Q7Opt1: '小牛',
        quiz7Q7Opt2: '小貓',
        quiz7Q7Opt3: '小狗',
        quiz7Q8: '農場裡有隻小動物，牠有翅膀，是誰呢？',
        quiz7Q8Opt0: '小雞',
        quiz7Q8Opt1: '小魚',
        quiz7Q8Opt2: '小牛',
        quiz7Q8Opt3: '小豬',
        quiz7Q9: '農場裡有哪些動物呢？',
        quiz7Q9Btn0: '小雞',
        quiz7Q9Btn1: '小羊',
        quiz7Q9Btn2: '小牛',
        quiz7Q9Btn3: '小馬',
        quiz7Q9Btn4: '小兔',
        quiz7Q9Btn5: '小貓',
        quiz7Q9Btn6: '小狗',
        quiz7Q9Btn7: '小豬',
        quiz7Q9Btn8: '鵝',
        quiz7Q9Btn9: '鴨',
        quiz7Q9Btn10: '蟲',
        quiz7Q10: '動物園裡有哪些動物呢？',
        quiz7Q10Btn0: '大象',
        quiz7Q10Btn1: '老虎',
        quiz7Q10Btn2: '鳥',
        quiz7Q10Btn3: '魚',
        
        // 單元1：數字 課前提問
        quiz1Q0: '你有多少個鼻子？',
        quiz1Q0Opt0: '一',
        quiz1Q0Opt1: '二',
        quiz1Q0Opt2: '三',
        quiz1Q0Opt3: '四',
        quiz1Q1: '你有多少隻耳朵？',
        quiz1Q1Opt0: '一',
        quiz1Q1Opt1: '二',
        quiz1Q1Opt2: '三',
        quiz1Q1Opt3: '四',
        quiz1Q2: '你有多少根手指？',
        quiz1Q2Opt0: '五',
        quiz1Q2Opt1: '八',
        quiz1Q2Opt2: '十',
        quiz1Q2Opt3: '二十',
        quiz1Q3: '你有多少隻眼睛？',
        quiz1Q3Opt0: '一',
        quiz1Q3Opt1: '二',
        quiz1Q3Opt2: '三',
        quiz1Q3Opt3: '四',
        quiz1Q4: '水果店裡有哪些數字呢？',
        quiz1Q4Btn0: '一',
        quiz1Q4Btn1: '二',
        quiz1Q4Btn2: '三',
        quiz1Q4Btn3: '四',
        quiz1Q4Btn4: '五',
        quiz1Q4Btn5: '六',
        quiz1Q4Btn6: '七',
        quiz1Q4Btn7: '八',
        quiz1Q4Btn8: '九',
        quiz1Q4Btn9: '十',
        
        // 第5課課前提問
        quiz5Q0: '家裡比你大的男孩子是誰？',
        quiz5Q0Opt0: '哥哥',
        quiz5Q0Opt1: '妹妹',
        quiz5Q0Opt2: '媽媽',
        quiz5Q0Opt3: '嬰兒',
        quiz5Q1: '家裡比你小的女孩子是誰？',
        quiz5Q1Opt0: '姐姐',
        quiz5Q1Opt1: '弟弟',
        quiz5Q1Opt2: '妹妹',
        quiz5Q1Opt3: '爺爺',
        quiz5Q2: '看到朋友時，你會說什麼？',
        quiz5Q2Opt0: '你好',
        quiz5Q2Opt1: '我好',
        quiz5Q2Opt2: '牠好',
        quiz5Q2Opt3: '他好',
        quiz5Q3: '「她」用來稱呼誰？',
        quiz5Q3Opt0: '男生',
        quiz5Q3Opt1: '女生',
        quiz5Q3Opt2: '小狗',
        quiz5Q3Opt3: '花朵',
        quiz5Q4: '「他」用來稱呼誰？',
        quiz5Q4Opt0: '女生',
        quiz5Q4Opt1: '男生',
        quiz5Q4Opt2: '小貓',
        quiz5Q4Opt3: '大樹',
        
        // 識圖定義
        recDef1: '我的頭在這裡。',
        recDef2: '我的耳朵在這裡。',
        recDef3: '我的腳在這裡。',
        recDef4: '我的鼻子在這裡。',
        recDef5: '我的眼睛在這裡。',
        recDef6: '我的嘴巴在這裡。',
        recDef7: '我的手在這裡。',
        
        // 動物識圖例句
        recDefChick: '小雞會叽叽叫。',
        recDefLamb: '小羊有軟軟的毛。',
        recDefCalf: '小牛喜歡吃草。',
        recDefPony: '小馬跑得很快。',
        recDefRabbit: '小兔有長長的耳朵。',
        recDefCat: '小貓喜歡抓老鼠。',
        recDefDog: '小狗會汪汪叫。',
        recDefPig: '小豬喜歡在泥裡玩。',
        recDefGoose: '鵝有長長的脖子。',
        recDefDuck: '鴨子會在水裡游。',
        recDefBug: '小蟲會在花叢裡飛。',
        recDefFish: '魚兒生活在水裡。',
        recDefBird: '小鳥會在天上飛。',
        recDefElephant: '大象有長長的鼻子。',
        recDefTiger: '老虎是森林之王。',
        
        // 數字定義
        recDefOne: '這是一。',
        recDefTwo: '這是二。',
        recDefThree: '這是三。',
        recDefFour: '這是四。',
        recDefFive: '這是五。',
        recDefSix: '這是六。',
        recDefSeven: '這是七。',
        recDefEight: '這是八。',
        recDefNine: '這是九。',
        recDefTen: '這是十。',
        
        // 第5課：家人（一）識圖定義
        recDefFamilyBig: '蘋果很大，櫻桃很小。',
        recDefFamilySmall: '蘋果很大，櫻桃很小。',
        recDefFamilyMale: '他是男生，不是女生。',
        recDefFamilyFemale: '她是女生，不是男生。',
        recDefFamilyMom: '媽媽愛我，我愛媽媽。',
        recDefFamilyDad: '爸爸很高，力氣很大。',
        recDefFamilyBrother: '哥哥年長，是我兄長。',
        recDefFamilyYoungerBrother: '弟弟年幼，是我幼弟。',
        recDefFamilySister: '姐姐年長，是我姊姊。',
        recDefFamilyYoungerSister: '妹妹年幼，是我妹妹。',
        recDefFamilyI: '我是學生，正在學習。',
        recDefFamilyYou: '你是誰呢？你好嗎？',
        recDefFamilyShe: '她是女孩，我的朋友。',
        recDefFamilyHe: '他是男孩，我的同學。',
        recDefFamilyIt: '它是植物，不會走動。',
        recDefFamilyAnimalIt: '牠是動物，會跑會跳。',
        
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
        unitSong5: '家人（一）',
        unitSong6: '水果',
        unitSong7: '動物（一）',
        unitSong8: '季節',
        unitSong9: '動物（三）',
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
        
        // 动物单字
        animalCharChick: '鸡',
        animalCharLamb: '羊',
        animalCharCalf: '牛',
        animalCharPony: '马',
        animalCharRabbit: '兔',
        animalCharCat: '猫',
        animalCharDog: '狗',
        animalCharPig: '猪',
        animalCharGoose: '鹅',
        animalCharDuck: '鸭',
        animalCharBug: '虫',
        animalCharFish: '鱼',
        animalCharBird: '鸟',
        animalCharElephant: '象',
        animalCharTiger: '虎',
        
        // 数字单字
        numberCharOne: '一',
        numberCharTwo: '二',
        numberCharThree: '三',
        numberCharFour: '四',
        numberCharFive: '五',
        numberCharSix: '六',
        numberCharSeven: '七',
        numberCharEight: '八',
        numberCharNine: '九',
        numberCharTen: '十',
        
        // 第5课：家人（一）
        familyCharBig: '大',
        familyCharSmall: '小',
        familyCharMale: '男',
        familyCharFemale: '女',
        familyCharMom: '妈',
        familyCharDad: '爸',
        familyCharBrother: '哥',
        familyCharYoungerBrother: '弟',
        familyCharSister: '姐',
        familyCharYoungerSister: '妹',
        familyCharI: '我',
        familyCharYou: '你',
        familyCharShe: '她',
        familyCharHe: '他',
        familyCharIt: '它',
        familyCharAnimalIt: '它',
        
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
        memoryPeekHint: '按一下看全部图案，再按一下开始玩',
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
        chapter1: '数字',
        chapter2: '幼儿园',
        chapter3: '数字',
        chapter4: '颜色',
        chapter5: '家人（一）',
        chapter6: '水果',
        chapter7: '动物（一）',
        chapter8: '季节',
        chapter9: '动物（三）',
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
        poem2: '悯农',
        poem3: '山村咏怀',
        poem4: '咏柳',
        poem5: '江南',
        poem6: '游子吟',
        poem7: '登鹳雀楼',
        poem8: '江雪',
        poem9: '望庐山瀑布',
        poem10: '黄鹤楼',
        poem11: '春晓',
        poem12: '咏鹅',
        
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
        
        // 单元7：动物 课前提问
        quiz7Q0: '抬头看看天空，什么动物会在天上飞呢？',
        quiz7Q0Opt0: '小鸟',
        quiz7Q0Opt1: '小鱼',
        quiz7Q0Opt2: '小狗',
        quiz7Q0Opt3: '小猫',
        quiz7Q1: '看看池塘里，什么动物会在水中游呢？',
        quiz7Q1Opt0: '小鸡',
        quiz7Q1Opt1: '小鱼',
        quiz7Q1Opt2: '小鸟',
        quiz7Q1Opt3: '小羊',
        quiz7Q2: '草地上有只小动物，它正在吃小虫子，是谁呢？',
        quiz7Q2Opt0: '小鸡',
        quiz7Q2Opt1: '小牛',
        quiz7Q2Opt2: '小马',
        quiz7Q2Opt3: '小猪',
        quiz7Q3: '草原上有只大动物，它正在低头吃草，是谁呢？',
        quiz7Q3Opt0: '小猫',
        quiz7Q3Opt1: '小狗',
        quiz7Q3Opt2: '小牛',
        quiz7Q3Opt3: '小鸡',
        quiz7Q4: '农场里有只圆滚滚的动物，它胖胖的，是谁呢？',
        quiz7Q4Opt0: '小马',
        quiz7Q4Opt1: '小猪',
        quiz7Q4Opt2: '小兔',
        quiz7Q4Opt3: '小鸟',
        quiz7Q5: '森林里有只小动物，它有长长的耳朵，是谁呢？',
        quiz7Q5Opt0: '小兔',
        quiz7Q5Opt1: '小猫',
        quiz7Q5Opt2: '小狗',
        quiz7Q5Opt3: '小鸡',
        quiz7Q6: '动物园里有只动物，它有长长的鼻子，是谁呢？',
        quiz7Q6Opt0: '小猪',
        quiz7Q6Opt1: '小狗',
        quiz7Q6Opt2: '大象',
        quiz7Q6Opt3: '小兔',
        quiz7Q7: '草原上有只动物，它头上有尖尖的角，是谁呢？',
        quiz7Q7Opt0: '小马',
        quiz7Q7Opt1: '小牛',
        quiz7Q7Opt2: '小猫',
        quiz7Q7Opt3: '小狗',
        quiz7Q8: '农场里有只小动物，它有翅膀，是谁呢？',
        quiz7Q8Opt0: '小鸡',
        quiz7Q8Opt1: '小鱼',
        quiz7Q8Opt2: '小牛',
        quiz7Q8Opt3: '小猪',
        quiz7Q9: '农场里有哪些动物呢？',
        quiz7Q9Btn0: '小鸡',
        quiz7Q9Btn1: '小羊',
        quiz7Q9Btn2: '小牛',
        quiz7Q9Btn3: '小马',
        quiz7Q9Btn4: '小兔',
        quiz7Q9Btn5: '小猫',
        quiz7Q9Btn6: '小狗',
        quiz7Q9Btn7: '小猪',
        quiz7Q9Btn8: '鹅',
        quiz7Q9Btn9: '鸭',
        quiz7Q9Btn10: '虫',
        quiz7Q10: '动物园里有哪些动物呢？',
        quiz7Q10Btn0: '大象',
        quiz7Q10Btn1: '老虎',
        quiz7Q10Btn2: '鸟',
        quiz7Q10Btn3: '鱼',
        
        // 单元1：数字 课前提问
        quiz1Q0: '你有多少个鼻子？',
        quiz1Q0Opt0: '一',
        quiz1Q0Opt1: '二',
        quiz1Q0Opt2: '三',
        quiz1Q0Opt3: '四',
        quiz1Q1: '你有多少只耳朵？',
        quiz1Q1Opt0: '一',
        quiz1Q1Opt1: '二',
        quiz1Q1Opt2: '三',
        quiz1Q1Opt3: '四',
        quiz1Q2: '你有多少根手指？',
        quiz1Q2Opt0: '五',
        quiz1Q2Opt1: '八',
        quiz1Q2Opt2: '十',
        quiz1Q2Opt3: '二十',
        quiz1Q3: '你有多少只眼睛？',
        quiz1Q3Opt0: '一',
        quiz1Q3Opt1: '二',
        quiz1Q3Opt2: '三',
        quiz1Q3Opt3: '四',
        quiz1Q4: '水果店里有哪些数字呢？',
        quiz1Q4Btn0: '一',
        quiz1Q4Btn1: '二',
        quiz1Q4Btn2: '三',
        quiz1Q4Btn3: '四',
        quiz1Q4Btn4: '五',
        quiz1Q4Btn5: '六',
        quiz1Q4Btn6: '七',
        quiz1Q4Btn7: '八',
        quiz1Q4Btn8: '九',
        quiz1Q4Btn9: '十',
        
        // 第5课课前提问
        quiz5Q0: '家里比你大的男孩子是谁？',
        quiz5Q0Opt0: '哥哥',
        quiz5Q0Opt1: '妹妹',
        quiz5Q0Opt2: '妈妈',
        quiz5Q0Opt3: '婴儿',
        quiz5Q1: '家里比你小的女孩子是谁？',
        quiz5Q1Opt0: '姐姐',
        quiz5Q1Opt1: '弟弟',
        quiz5Q1Opt2: '妹妹',
        quiz5Q1Opt3: '爷爷',
        quiz5Q2: '看到朋友时，你会说什么？',
        quiz5Q2Opt0: '你好',
        quiz5Q2Opt1: '我好',
        quiz5Q2Opt2: '它好',
        quiz5Q2Opt3: '他好',
        quiz5Q3: '「她」用来称呼谁？',
        quiz5Q3Opt0: '男生',
        quiz5Q3Opt1: '女生',
        quiz5Q3Opt2: '小狗',
        quiz5Q3Opt3: '花朵',
        quiz5Q4: '「他」用来称呼谁？',
        quiz5Q4Opt0: '女生',
        quiz5Q4Opt1: '男生',
        quiz5Q4Opt2: '小猫',
        quiz5Q4Opt3: '大树',
        
        // 识图定义
        recDef1: '我的头在这里。',
        recDef2: '我的耳朵在这里。',
        recDef3: '我的脚在这里。',
        recDef4: '我的鼻子在这里。',
        recDef5: '我的眼睛在这里。',
        recDef6: '我的嘴巴在这里。',
        recDef7: '我的手在这里。',
        
        // 动物识图例句
        recDefChick: '小鸡会叽叽叫。',
        recDefLamb: '小羊有软软的毛。',
        recDefCalf: '小牛喜欢吃草。',
        recDefPony: '小马跑得很快。',
        recDefRabbit: '小兔有长长的耳朵。',
        recDefCat: '小猫喜欢抓老鼠。',
        recDefDog: '小狗会汪汪叫。',
        recDefPig: '小猪喜欢在泥里玩。',
        recDefGoose: '鹅有长长的脖子。',
        recDefDuck: '鸭子会在水里游。',
        recDefBug: '小虫会在花丛里飞。',
        recDefFish: '鱼儿生活在水里。',
        recDefBird: '小鸟会在天上飞。',
        recDefElephant: '大象有长长的鼻子。',
        recDefTiger: '老虎是森林之王。',
        
        // 数字定义
        recDefOne: '这是一。',
        recDefTwo: '这是二。',
        recDefThree: '这是三。',
        recDefFour: '这是四。',
        recDefFive: '这是五。',
        recDefSix: '这是六。',
        recDefSeven: '这是七。',
        recDefEight: '这是八。',
        recDefNine: '这是九。',
        recDefTen: '这是十。',
        
        // 第5课：家人（一）识图定义
        recDefFamilyBig: '苹果很大，樱桃很小。',
        recDefFamilySmall: '苹果很大，樱桃很小。',
        recDefFamilyMale: '他是男生，不是女生。',
        recDefFamilyFemale: '她是女生，不是男生。',
        recDefFamilyMom: '妈妈爱我，我爱妈妈。',
        recDefFamilyDad: '爸爸很高，力气很大。',
        recDefFamilyBrother: '哥哥年长，是我兄长。',
        recDefFamilyYoungerBrother: '弟弟年幼，是我幼弟。',
        recDefFamilySister: '姐姐年长，是我姐姐。',
        recDefFamilyYoungerSister: '妹妹年幼，是我妹妹。',
        recDefFamilyI: '我是学生，正在学习。',
        recDefFamilyYou: '你是谁呢？你好吗？',
        recDefFamilyShe: '她是女孩，我的朋友。',
        recDefFamilyHe: '他是男孩，我的同学。',
        recDefFamilyIt: '它是植物，不会走动。',
        recDefFamilyAnimalIt: '它是动物，会跑会跳。',
        
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
        unitSong5: '家人（一）',
        unitSong6: '水果',
        unitSong7: '动物（一）',
        unitSong8: '季节',
        unitSong9: '动物（三）',
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

// 更新 body 語言 class，供 CSS 根據語言切換樣式
function updateBodyLangClass() {
    document.body.classList.remove('lang-tw', 'lang-cn');
    document.body.classList.add(AppState.language === 'zh-CN' ? 'lang-cn' : 'lang-tw');
}

// 選擇語言
function selectLanguage(lang) {
    AppState.language = lang;
    
    // 更新 body 語言 class
    updateBodyLangClass();
    
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

// 根據當前章節動態更新 sectionConfig
function updateSectionConfig() {
    sectionConfig[0].name = t('sectionIntro');
    
    const recData = getRecognitionData();
    for (let i = 0; i < 7; i++) {
        if (i < recData.length) {
            sectionConfig[i + 1].name = t('sectionLearning') + ' - ' + t(recData[i].hanziKey);
        } else {
            sectionConfig[i + 1].name = t('sectionLearning');
        }
    }
    
    sectionConfig[8].name = t('sectionWriting');
    sectionConfig[9].name = t('sectionStory');
    sectionConfig[10].name = t('sectionGames');
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
    updateSectionConfig();
    
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
    updateSectionConfig();
    
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
    
    // 更新 body 語言 class
    updateBodyLangClass();
    
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

// 引導角色自動隱藏計時器
let guideHideTimeout = null;

// 顯示引導角色
function showGuideCharacter(pageId) {
    // 移除舊的角色引導
    const oldGuide = document.querySelector('.guide-character-container');
    if (oldGuide) oldGuide.remove();
    if (guideHideTimeout) {
        clearTimeout(guideHideTimeout);
        guideHideTimeout = null;
    }
    
    // 只顯示在指定頁面
    const guidePages = ['levels', 'cats', 'poems', 'songs', 'chapters'];
    if (!guidePages.includes(pageId)) return;
    
    // 如果沒有選擇角色，不顯示
    if (!AppState.selectedChar) return;
    
    // 獲取角色圖片
    const charId = AppState.selectedChar.id;
    const charImg = charId ? 'assets/images/characters/' + charId + '.png' : 'assets/images/characters/人1.png';
    
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
        
        // 綁定角色懸停事件：碰到角色重新顯示對話框
        const character = guideContainer.querySelector('.guide-character');
        if (character) {
            character.addEventListener('mouseenter', () => {
                showGuideSpeech();
            });
            character.addEventListener('mouseleave', () => {
                scheduleHideGuideSpeech();
            });
        }
        
        // 添加動畫效果
        setTimeout(() => {
            guideContainer.classList.add('show');
        }, 50);
        
        // 15秒後自動隱藏對話框
        scheduleHideGuideSpeech();
    }
}

// 排程隱藏對話框
function scheduleHideGuideSpeech() {
    if (guideHideTimeout) clearTimeout(guideHideTimeout);
    guideHideTimeout = setTimeout(() => {
        hideGuideSpeech();
    }, 15000);
}

// 顯示對話框
function showGuideSpeech() {
    if (guideHideTimeout) {
        clearTimeout(guideHideTimeout);
        guideHideTimeout = null;
    }
    const bubble = document.querySelector('.guide-speech-bubble');
    if (bubble) {
        bubble.style.display = 'block';
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateY(0) scale(1)';
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
    const charImg = 'assets/images/characters/' + AppState.selectedChar.id + '.png';
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

    // 切換頁面時先隱藏並清除遊戲全螢幕層，避免遮蓋目標頁面
    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer) {
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'none';
    }
    
    // 清除可能殘留的遊戲完成彈窗與彩帶
    document.querySelectorAll('.game-complete-overlay, .game-confetti-piece').forEach(el => el.remove());
    
    // 更新角色圖片
    updateCharacterImages(pageId);
    
    // 顯示學習夥伴引導角色
    showGuideCharacter(pageId);
    
    if (pageId === 'intro') {
        updateIntroImage();
    }
    
    if (pageId === 'learning') {
        // 清空學習頁各容器，避免舊內容殘留導致渲染異常
        ['quizContainer', 'recognitionContainer', 'writingContainer', 'storyContainer'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = '';
                el.style.display = id === 'quizContainer' ? 'block' : 'none';
            }
        });
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
    1: {
        tw: 'assets/images/courseware/課程介紹頁更新版/第1課進入學習繁體按鈕.png',
        cn: 'assets/images/courseware/課程介紹頁更新版/第1課進入學習簡體按鈕.png'
    },
    5: {
        tw: 'assets/images/courseware/課程介紹頁更新版/第5課進入學習繁體按鈕.png',
        cn: 'assets/images/courseware/課程介紹頁更新版/第5課進入學習簡體按鈕.png'
    },
    7: {
        tw: 'assets/images/courseware/課程介紹頁更新版/第7課進入學習繁體按鈕.png',
        cn: 'assets/images/courseware/課程介紹頁更新版/第7課進入學習簡體按鈕.png'
    },
    11: {
        tw: 'assets/images/courseware/課程介紹頁更新版/進入學習繁體按鈕.png',
        cn: 'assets/images/courseware/課程介紹頁更新版/進入學習簡體按鈕.png'
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
        bg: { tw: 'assets/images/courseware/課件背景/課前提問繁體背景.png', cn: 'assets/images/courseware/課件背景/課前提問簡體背景.png' },
        logo: 'assets/images/courseware/課件logo按鈕/課前提問logo按鈕.png'
    },
    recognition: {
        bg: { tw: 'assets/images/courseware/課件背景/識圖繁體背景.png', cn: 'assets/images/courseware/課件背景/識圖簡體背景.png' },
        logo: 'assets/images/courseware/課件logo按鈕/識圖logo按鈕.png'
    },
    writing: {
        bg: { tw: 'assets/images/courseware/課件背景/識字書寫繁體背景.png', cn: 'assets/images/courseware/課件背景/識字書寫簡體背景.png' },
        logo: 'assets/images/courseware/課件logo按鈕/識字logo按鈕.png'
    },
    story: {
        bg: { tw: 'assets/images/courseware/課件背景/故事繪本繁體背景.png', cn: 'assets/images/courseware/課件背景/故事繪本簡體背景.png' },
        logo: 'assets/images/courseware/課件logo按鈕/遊戲繪本logo按鈕.png'
    },
    game: {
        bg: { tw: 'assets/images/courseware/課件背景/遊戲繁體背景.png', cn: 'assets/images/courseware/課件背景/遊戲簡體背景.png' },
        logo: 'assets/images/courseware/課件logo按鈕/課前提問logo按鈕.png'
    }
};

const coursewareTabs = [
    { key: 'quiz', y: 337.4, h: 90.7, twShort: 'assets/images/courseware/長短按鈕/課前提問繁體短按鈕.png', cnShort: 'assets/images/courseware/長短按鈕/課前提問簡體短按鈕.png', twLong: 'assets/images/courseware/長短按鈕/課前提問繁體長按鈕.png', cnLong: 'assets/images/courseware/長短按鈕/課前提問簡體長按鈕.png' },
    { key: 'recognition', y: 426.9, h: 90.7, twShort: 'assets/images/courseware/長短按鈕/識圖繁體短按鈕.png', cnShort: 'assets/images/courseware/長短按鈕/識圖簡體短按鈕.png', twLong: 'assets/images/courseware/長短按鈕/識圖繁體長按鈕.png', cnLong: 'assets/images/courseware/長短按鈕/識圖簡體長按鈕.png' },
    { key: 'writing', y: 516.4, h: 91.9, twShort: 'assets/images/courseware/長短按鈕/識字繁體短按鈕.png', cnShort: 'assets/images/courseware/長短按鈕/識字簡體短按鈕.png', twLong: 'assets/images/courseware/長短按鈕/識字繁體長按鈕.png', cnLong: 'assets/images/courseware/長短按鈕/識字簡體長按鈕.png' },
    { key: 'story', y: 607.1, h: 90.7, twShort: 'assets/images/courseware/長短按鈕/繪本繁體短按鈕.png', cnShort: 'assets/images/courseware/長短按鈕/繪本簡體短按鈕.png', twLong: 'assets/images/courseware/長短按鈕/繪本繁體長按鈕.png', cnLong: 'assets/images/courseware/長短按鈕/繪本簡體長按鈕.png', twShortActive: 'assets/images/courseware/長短按鈕/繪本繁體短按鈕active.png', cnShortActive: 'assets/images/courseware/長短按鈕/繪本簡體短按鈕active.png', twLongActive: 'assets/images/courseware/長短按鈕/繪本繁體長按鈕active.png', cnLongActive: 'assets/images/courseware/長短按鈕/繪本簡體長按鈕active.png' },
    { key: 'game', y: 696.6, h: 91.9, twShort: 'assets/images/courseware/長短按鈕/活動繁體短按鈕.png', cnShort: 'assets/images/courseware/長短按鈕/活動簡體短按鈕.png', twLong: 'assets/images/courseware/長短按鈕/活動繁體長按鈕.png', cnLong: 'assets/images/courseware/長短按鈕/活動簡體長按鈕.png' }
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
            // img src 路徑相對於 index.html，不需要 ../
            const shortSrc = getCoursewareTabSrc(tab, 'Short');
            const longSrc = getCoursewareTabSrc(tab, 'Long');
            // CSS 變數中的 url() 會相對於引用它的 CSS 檔案（css/learning-design.css）解析，
            // 因此需要加上 ../ 讓路徑回到專案根目錄的 assets/ 資料夾
            const shortSrcCss = '../' + shortSrc;
            const longSrcCss = '../' + longSrc;
            const onclick = `onclick="switchLearningModule('${tab.key}', true)"`;
            return `<div class="cw-tab ${active}" style="top:${tab.y}px;height:${tab.h}px;" ${onclick}>
                <div class="cw-tab-long" style="--tab-long-src:url('${longSrcCss}')"><img src="${longSrc}" alt=""></div>
                <div class="cw-tab-short" style="--tab-src:url('${shortSrcCss}')"><img src="${shortSrc}" alt=""></div>
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
    if (module === 'quiz') return quizState.currentIndex < getQuizData().length - 1;
    if (module === 'recognition') return recognitionState.currentIndex < getRecognitionData().length - 1;
    if (module === 'writing') return writingState.currentIndex < getWritingData().length - 1;
    if (module === 'story' && storyState.view === 'reader') {
        const book = getStoryBooks()[storyState.currentBookIndex];
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
        else if (storyState.currentBookIndex < getStoryBooks().length - 1) goToStory(storyState.currentBookIndex + 1);
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

    let showNavArrows = true;
    if (moduleKey === 'story') {
        showNavArrows = storyState.view !== 'selection';
    } else if (moduleKey === 'game') {
        showNavArrows = false;
    }
    const prevDisabled = coursewareCanPrev(moduleKey) ? '' : 'disabled';
    const nextDisabled = coursewareCanNext(moduleKey) ? '' : 'disabled';
    const isGameMenu = moduleKey === 'game' && content.includes('game-menu-buttons');

    const prevBtn = showNavArrows
        ? `<div class="cw-prev-btn ${prevDisabled}" onclick="coursewarePrev('${moduleKey}')"></div>`
        : '';
    const nextBtn = showNavArrows
        ? `<div class="cw-next-btn ${nextDisabled}" onclick="coursewareNext('${moduleKey}')"></div>`
        : '';
    const gameMenuNextArrow = (moduleKey === 'game' && gameState.currentActivity === 'menu')
        ? `<div class="cw-next-btn" onclick="goToUnitEnd()"></div>`
        : '';

    container.innerHTML = `
        <div class="cw-page cw-theme-${moduleKey}" data-module="${moduleKey}">
            <img class="cw-bg" src="${getCoursewareBgSrc(moduleKey)}" alt="">
            <img class="cw-back-logo" src="${cfg.logo}" onclick="goTo('chapters', event)" alt="返回">
            ${renderCoursewareTabs(moduleKey)}
            ${prevBtn}
            ${nextBtn}
            ${gameMenuNextArrow}
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
    1: '一家人', 2: '幼兒園', 3: '數字', 4: '顏色', 5: '家人（一）',
    6: '水果', 7: '動物（一）', 8: '季節', 9: '動物（三）', 10: '食物',

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
    
    // 如果是識圖部分，同步識圖索引並重新渲染
    if (index >= 1 && index <= 7) {
        const recData = getRecognitionData();
        if (index - 1 < recData.length) {
            recognitionState.currentIndex = index - 1;
            renderRecognition();
        }
    }
    
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
        // 根據當前章節識圖資料動態生成子導航
        const recData = getRecognitionData();
        const maxItems = Math.min(recData.length, 7);
        subNav.innerHTML = recData.slice(0, maxItems).map((item, i) =>
            `<button class="sub-nav-btn ${index === i + 1 ? 'active' : ''}" onclick="gotoSection(${i + 1})">${t(item.hanziKey)}</button>`
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
    { name: '靜夜思', videoId: 'ofZypMlVeLQ', cover: 'assets/images/poems/唐诗/静夜思.png' },
    { name: '憫農', videoId: 'ayEPQu5o_X4', cover: 'assets/images/poems/唐诗/悯农.png' },
    { name: '山村詠懷', videoId: 'bgUqwi39ozk', cover: 'assets/images/poems/唐诗/山村詠懷.png' },
    { name: '詠柳', videoId: 'WrngcrQHAkY', cover: 'assets/images/poems/唐诗/詠柳.png' },
    { name: '江南', videoId: '7nS5sXHPTMM', cover: 'assets/images/poems/唐诗/江南.png' },
    { name: '遊子吟', videoId: '81Q6wsX5gg8', cover: 'assets/images/poems/唐诗/遊子吟.png' },
    { name: '登鸛雀樓', videoId: 'z36Ib24Ggq0', cover: 'assets/images/poems/唐诗/登鹳雀楼.png' },
    { name: '江雪', videoId: '19VrhE3WpSE', cover: 'assets/images/poems/唐诗/江雪.png' },
    { name: '望廬山瀑布', videoId: 'KXJTo_SVyF8', cover: 'assets/images/poems/唐诗/望庐山瀑布.png' },
    { name: '黃鶴樓', videoId: 'lZG8gYtcDXM', cover: 'assets/images/poems/唐诗/黄鹤楼.png' },
    { name: '春曉', videoId: 'KpZkzQOdv0Q', cover: 'assets/images/poems/唐诗/春晓.png' },
    { name: '詠鵝', videoId: 't7q70yhQ3Ro', cover: 'assets/images/poems/唐诗/咏鹅.png' },
];

function goToPoemPlayer(index) {
    const poem = poemData[index];
    const container = document.getElementById('gameContainer');
    if (!container) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    container.innerHTML = `
        <div class="poem-player-page">
            <div class="poem-player-stage" style="--scale: ${scale}">
                <img class="poem-player-logo" src="assets/images/pages/第二頁元素更新版/綠色華字logo.png" alt="logo">
                <img class="poem-player-back" src="assets/images/pages/第四頁元素更新版/綠色返回logo.png" alt="返回" onclick="closePoemPlayer()">
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
    { id: 1, name: '上學歌', videoId: '', cover: 'assets/images/songs/兒歌/上學歌.png' },
    { id: 2, name: '天氣歌', videoId: '', cover: 'assets/images/songs/兒歌/天氣歌.png' },
];

const unitSongData = [
    // 上冊
    { id: 1, name: '一家人', videoId: '' },
    { id: 2, name: '幼兒園', videoId: '' },
    { id: 3, name: '數字', videoId: '' },
    { id: 4, name: '顏色', videoId: '' },
    { id: 5, name: '家人（一）', videoId: '' },
    { id: 6, name: '水果', videoId: '' },
    { id: 7, name: '動物（一）', videoId: '' },
    { id: 8, name: '季節', videoId: '' },
    { id: 9, name: '動物（三）', videoId: '' },
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
                <button class="song-volume-tab active" onclick="switchSongVolume(1, event)">${t('volumeUpper')}</button>
                <button class="song-volume-tab" onclick="switchSongVolume(2, event)">${t('volumeLower')}</button>
            </div>
            <div class="song-unit-grid" id="songUnitGridUpper">${upperCells}</div>
            <div class="song-unit-grid" id="songUnitGridLower" style="display:none;">${lowerCells}</div>
        </div>
    `;
    container.style.display = 'block';
}

function switchSongVolume(vol, evt) {
    document.querySelectorAll('.song-volume-tab').forEach(t => t.classList.remove('active'));
    if (evt && evt.target) evt.target.classList.add('active');
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

const storyBooksByChapter = {
    1: [
        {
            id: 'lesson1-story1',
            title: '故事一',
            cover: 'assets/images/stories/圖書封面/第1課-故事1繁體封面.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第1課-故事1繁體封面.png',
                cn: 'assets/images/stories/圖書封面/第1課-故事1簡體封面.png',
                width: 411.9,
                height: 587.3,
                x: 365.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 1.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 2.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 3.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 4.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 5.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 6.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 7.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 8.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 9.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 10.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 11.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 12.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 13.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 14.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 15.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/Picture 16.jpg'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/第1課-故事1問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/第1課-故事1問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/第1課-故事1問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/第1課-故事1問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/第1課-故事1問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事1/第1課-故事1問題3簡體.png'
                    }
                }
            ]
        },
        {
            id: 'lesson1-story2',
            title: '故事二',
            cover: 'assets/images/stories/圖書封面/第1課-故事2繁體封面.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第1課-故事2繁體封面.png',
                cn: 'assets/images/stories/圖書封面/第1課-故事2簡體封面.png',
                width: 389.2,
                height: 587.3,
                x: 776.7,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture a.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture b.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture c.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture d.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture e.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture f.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture g.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture h.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture i.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/Picture j.jpg'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/第1課-故事2問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/第1課-故事2問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/第1課-故事2問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/第1課-故事2問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/第1課-故事2問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事2/第1課-故事2問題3簡體.png'
                    }
                }
            ]
        },
        {
            id: 'lesson1-story3',
            title: '故事三',
            cover: 'assets/images/stories/圖書封面/第1課-故事3繁體封面.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第1課-故事3繁體封面.png',
                cn: 'assets/images/stories/圖書封面/第1課-故事3簡體封面.png',
                width: 389.2,
                height: 587.3,
                x: 1165.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 一.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 二.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 三.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 四.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 五.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 六.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 七.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 八.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 九.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 十.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 十一.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 十二.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 十三.jpg'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/Picture 十四.jpg'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/第1課-故事3問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/第1課-故事3問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/第1課-故事3問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/第1課-故事3問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/第1課-故事3問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第1課故事3/第1課-故事3問題3簡體.png'
                    }
                }
            ]
        }
    ],
    5: [
        {
            id: 'lesson5-story1',
            title: '故事一',
            cover: 'assets/images/stories/圖書封面/第5課-故事1封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第5課-故事1封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第5課-故事1封面簡體.png',
                width: 411.9,
                height: 587.3,
                x: 365.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page01_這就是我媽媽她真的很棒.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page02_媽媽是大廚師也是特技演員.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page03_媽媽是畫家也是最強壯的女人.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page04_媽媽是有魔法的園丁也是好心的仙子.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page05_媽媽歌聲像天使吼起來像獅子.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page06_媽媽像蝴蝶一樣美麗像沙發一樣舒適.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page07_媽媽像貓咪一樣溫柔像犀牛一樣強悍.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page08_媽媽是舞蹈家也是太空人.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page09_媽媽是電影明星也是大老闆.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page10_媽媽是超人媽媽逗我哈哈大笑.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page11_我愛媽媽.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/page12_她也愛我永遠愛我.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/第5課-故事1問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/第5課-故事1問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/第5課-故事1問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/第5課-故事1問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/第5課-故事1問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事1/第5課-故事1問題3簡體.png'
                    }
                }
            ]
        },
        {
            id: 'lesson5-story2',
            title: '故事二',
            cover: 'assets/images/stories/圖書封面/第5課-故事2封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第5課-故事2封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第5課-故事2封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 776.7,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page01_這就是我爸爸他真的很棒.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page02_我爸爸什麼都不怕連大野狼也不怕.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page03_他可以從月亮上跳過去還會走高空繩索.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page04_我爸爸吃得像馬一樣多游得像魚一樣快.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page05_他像大猩猩一樣強壯也像河馬一樣快樂.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page06_我爸爸像房子一樣高大像泰迪熊一樣柔軟.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page07_他像貓頭鹰一樣聰明有時候也會做傻事.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page08_我爸爸是偉大的舞蹈家也是了不起的歌唱家.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page09_他踢足球的技術一流也常常逗得我哈哈大笑.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page10_我愛他.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/page11_他也愛我永遠愛我.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/第5課-故事2問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/第5課-故事2問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/第5課-故事2問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/第5課-故事2問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/第5課-故事2問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事2/第5課-故事2問題3簡體.png'
                    }
                }
            ]
        },
        {
            id: 'lesson5-story3',
            title: '故事三',
            cover: 'assets/images/stories/圖書封面/第5課-故事3封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第5課-故事3封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第5課-故事3封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 1165.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page01_早上媽媽做早飯晚上爸爸陪踢球.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page02_你怎樣對待父母會像他們愛你一樣關心嗎.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page03_和好朋友吵架回家對父母發脾氣.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page04_難過時爸爸媽媽陪著你哭泣.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page05_可以有小情緒但不能發洩在父母身上.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page06_父母也會不開心偶爾有意見分歧.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page07_下雨送傘生病帶你去醫院闖禍幫你道歉.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page08_你的父母只屬於你只需關愛你的成長.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page09_不要攀比責怪父母生氣時想想他們也難受.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page10_有話對父母說他們心裡從不真責怪你.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page11_不敢說的話寫下來放在他們看得見的地方.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/page12_愛你這件事他們是認真的父母不是用來生氣的.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/第5課-故事3問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/第5課-故事3問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/第5課-故事3問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/第5課-故事3問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/第5課-故事3問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第5課故事3/第5課-故事3問題3簡體.png'
                    }
                }
            ]
        }
    ],
    7: [
        {
            id: 'lesson7-story1',
            title: '故事一',
            cover: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事1封面簡體.png',
                width: 411.9,
                height: 587.3,
                x: 365.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page01_小羊收到四只新鞋.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page02_小羊救掉进水的蚂蚁.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page03_蚂蚁乘小船出发.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page04_猩猩阿姨要当妈妈了.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page05_小羊送鞋给猩猩阿姨.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page06_松鼠采松果没篮子.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page07_小羊送鞋给松鼠.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/第7課-故事1問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/第7課-故事1問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/第7課-故事1問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/第7課-故事1問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/第7課-故事1問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/第7課-故事1問題3簡體.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story2',
            title: '故事二',
            cover: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事2封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 776.7,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page01_小老鼠第一天上幼兒園.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page02_做早操時小老鼠逃走.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page03_躲到向日葵下被發現.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page04_倉庫門打開被找到.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page05_吃午飯又溜到滑梯頂.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page06_長頸鹿老師又找到他.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page07_心裡有線牽著喜歡上幼兒園.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/第7課-故事2問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/第7課-故事2問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/第7課-故事2問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/第7課-故事2問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/第7課-故事2問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/第7課-故事2問題3簡體.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story3',
            title: '故事三',
            cover: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事3封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 1165.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page01_新年到小熊說我去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page02_小熊買了山楂片.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page03_山楂片沒響小猴去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page04_小猴進雜貨店買蠟燭.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page05_蠟燭沒響狐狸去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page06_狐狸找小男孩撿鞭炮.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page07_狐狸點燃鞭炮煙花滿天.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/第7課-故事3問題1繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/第7課-故事3問題1簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/第7課-故事3問題2繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/第7課-故事3問題2簡體.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/第7課-故事3問題3繁體.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/第7課-故事3問題3簡體.png'
                    }
                }
            ]
        }
    ],
    11: [
    {
        id: 'hands',
        title: '千變萬化的手',
        cover: 'assets/images/stories/圖書封面/book_cover_hands.png',
        card: {
            tw: 'assets/images/stories/故事繪本頁面更新版/故事卡片/11課故事一繁體.png',
            cn: 'assets/images/stories/故事繪本頁面更新版/故事卡片/11課故事一簡體.png',
            width: 411.9, height: 587.3, x: 365.4, y: 247.5
        },
        pages: [
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 1.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 2.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 3.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 4.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 5.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 6.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/11課故事1問題1繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/11課故事1問題1簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 7.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 8.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 9.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/11課故事1問題2繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/11課故事1問題2簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 10.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 11.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/Picture 12.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/11課故事1問題3繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/千變萬化的手/11課故事1問題3簡體.png' } }
        ]
    },
    {
        id: 'body',
        title: '我的身體',
        cover: 'assets/images/stories/圖書封面/book_cover_body.png',
        card: {
            tw: 'assets/images/stories/故事繪本頁面更新版/故事卡片/11課故事二繁體.png',
            cn: 'assets/images/stories/故事繪本頁面更新版/故事卡片/11課故事二簡體.png',
            width: 389.2, height: 587.3, x: 776.7, y: 247.5
        },
        pages: [
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture a.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture b.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture c.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題1繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題1簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture d.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題2繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題2簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture e.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture f.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture g.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題3繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題3簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture h.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture i.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture j.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/我的身體/Picture k.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題4繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/我的身體/11課故事2問題4簡體.png' } }
        ]
    },
    {
        id: 'eyes',
        title: '眼睛的故事',
        cover: 'assets/images/stories/圖書封面/book_cover_eyes.png',
        card: {
            tw: 'assets/images/stories/故事繪本頁面更新版/故事卡片/11課故事三繁體.png',
            cn: 'assets/images/stories/故事繪本頁面更新版/故事卡片/11課故事三簡體.png',
            width: 389.2, height: 587.3, x: 1165.4, y: 247.5
        },
        pages: [
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 一.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 二.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 三.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 四.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/11課故事3問題1繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/11課故事3問題1簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 五.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/11課故事3問題2繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/11課故事3問題2簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 六.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 七.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 八.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 九.jpg' },
            { type: 'question', image: { tw: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/11課故事3問題3繁體.png', cn: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/11課故事3問題3簡體.png' } },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 十.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 十一.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 十二.jpg' },
            { type: 'image', image: 'assets/images/stories/故事繪本頁面更新版/眼睛的故事/Picture 十三.jpg' }
        ]
    }
]
};

function getStoryBooks() {
    return storyBooksByChapter[AppState.currentChapter] || storyBooksByChapter[11];
}

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

    const booksHtml = getStoryBooks().map((book, index) => {
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

    const book = getStoryBooks()[storyState.currentBookIndex];
    const page = book.pages[storyState.currentPageIndex];
    const totalPages = book.pages.length;
    const currentPageNum = storyState.currentPageIndex + 1;

    let contentHtml = '';
    if (page.type === 'question') {
        const src = AppState.language === 'zh-CN' ? page.image.cn : page.image.tw;
        contentHtml = `<img class="story-reader-question" src="${src}" alt="" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'story-page-placeholder\\'><span class=\\'placeholder-icon\\'>🖼️</span><span>${t('pagePlaceholder')}</span></div>';">`;
    } else {
        contentHtml = `
            <img class="story-reader-card" src="assets/images/stories/故事繪本頁面更新版/故事頁面卡片.png" alt="">
            <img class="story-reader-image" src="${page.image}" alt="" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'story-page-placeholder\\'><span class=\\'placeholder-icon\\'>🖼️</span><span>${t('pagePlaceholder')}</span></div>';">
        `;
    }

    // 底部頁碼與圓點導航
    const dotsHtml = book.pages.map((p, i) => {
        const isActive = i === storyState.currentPageIndex;
        const isQuestion = p.type === 'question';
        const classes = ['story-reader-dot'];
        if (isActive) classes.push('active');
        if (isQuestion) classes.push('question');
        return `<div class="${classes.join(' ')}" onclick="goToStoryPage(${i})" title="第 ${i + 1} 頁"></div>`;
    }).join('');

    container.innerHTML = `
        <div class="story-page">
            <div class="story-reader">
                ${contentHtml}
                <div class="story-reader-nav">
                    <div class="story-reader-page-info">第 ${currentPageNum} / ${totalPages} 頁</div>
                    <div class="story-reader-dots">${dotsHtml}</div>
                </div>
            </div>
        </div>
    `;
    applyCoursewareShell('story');
}

function goToStoryPage(index) {
    if (storyState.currentBookIndex < 0 || storyState.currentBookIndex >= getStoryBooks().length) return;
    const book = getStoryBooks()[storyState.currentBookIndex];
    if (index < 0 || index >= book.pages.length) return;
    storyState.currentPageIndex = index;
    renderStoryReader();
}

function nextStoryPage() {
    const book = getStoryBooks()[storyState.currentBookIndex];
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

const gameDataByChapter = {
    7: [
        {
            id: 'lesson7-story1',
            title: '故事一',
            cover: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事1封面簡體.png',
                width: 411.9,
                height: 587.3,
                x: 365.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page01_小羊收到四只新鞋.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page02_小羊救掉进水的蚂蚁.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page03_蚂蚁乘小船出发.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page04_猩猩阿姨要当妈妈了.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page05_小羊送鞋给猩猩阿姨.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page06_松鼠采松果没篮子.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page07_小羊送鞋给松鼠.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story2',
            title: '故事二',
            cover: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事2封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 776.7,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page01_小老鼠第一天上幼兒園.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page02_做早操時小老鼠逃走.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page03_躲到向日葵下被發現.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page04_倉庫門打開被找到.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page05_吃午飯又溜到滑梯頂.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page06_長頸鹿老師又找到他.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page07_心裡有線牽著喜歡上幼兒園.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story3',
            title: '故事三',
            cover: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事3封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 1165.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page01_新年到小熊說我去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page02_小熊買了山楂片.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page03_山楂片沒響小猴去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page04_小猴進雜貨店買蠟燭.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page05_蠟燭沒響狐狸去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page06_狐狸找小男孩撿鞭炮.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page07_狐狸點燃鞭炮煙花滿天.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        }
    ],
    11: {
        matching: [
            { hanzi: '頭', simpleHanzi: '头', hanziKey: 'headChar', image: 'assets/images/courseware/課程介紹頁/real_head.png' },
            { hanzi: '耳', simpleHanzi: '耳', hanziKey: 'earChar', image: 'assets/images/courseware/課程介紹頁/real_ear.png' },
            { hanzi: '腳', simpleHanzi: '脚', hanziKey: 'footChar', image: 'assets/images/courseware/課程介紹頁/real_foot.png' },
            { hanzi: '鼻', simpleHanzi: '鼻', hanziKey: 'noseChar', image: 'assets/images/courseware/課程介紹頁/real_nose.png' },
            { hanzi: '眼', simpleHanzi: '眼', hanziKey: 'eyeChar', image: 'assets/images/courseware/課程介紹頁/real_eye.png' },
            { hanzi: '口', simpleHanzi: '口', hanziKey: 'mouthChar', image: 'assets/images/courseware/課程介紹頁/real_mouth.png' },
            { hanzi: '手', simpleHanzi: '手', hanziKey: 'handChar', image: 'assets/images/courseware/課程介紹頁/real_hand.png' }
        ],
        quiz: [
            {
                type: 'multi',
                question: { tw: 'gameQuizQ0', cn: 'gameQuizQ0', i18n: true },
                options: [
                    { tw: 'gameQuizQ0Opt0', cn: 'gameQuizQ0Opt0', key: '眼睛', i18n: true },
                    { tw: 'gameQuizQ0Opt1', cn: 'gameQuizQ0Opt1', key: '耳朵', i18n: true },
                    { tw: 'gameQuizQ0Opt2', cn: 'gameQuizQ0Opt2', key: '鼻子', i18n: true },
                    { tw: 'gameQuizQ0Opt3', cn: 'gameQuizQ0Opt3', key: '椅子', i18n: true }
                ],
                correct: [0, 1, 2]
            },
            {
                type: 'single',
                question: { tw: 'gameQuizQ1', cn: 'gameQuizQ1', i18n: true },
                options: [
                    { tw: 'gameQuizQ1Opt0', cn: 'gameQuizQ1Opt0', key: '嘴巴', i18n: true },
                    { tw: 'gameQuizQ1Opt1', cn: 'gameQuizQ1Opt1', key: '手', i18n: true },
                    { tw: 'gameQuizQ1Opt2', cn: 'gameQuizQ1Opt2', key: '眼睛', i18n: true },
                    { tw: 'gameQuizQ1Opt3', cn: 'gameQuizQ1Opt3', key: '耳朵', i18n: true }
                ],
                correct: 3
            },
            {
                type: 'single',
                question: { tw: 'gameQuizQ2', cn: 'gameQuizQ2', i18n: true },
                options: [
                    { tw: 'gameQuizQ2Opt0', cn: 'gameQuizQ2Opt0', key: '鼻子', i18n: true },
                    { tw: 'gameQuizQ2Opt1', cn: 'gameQuizQ2Opt1', key: '眼睛', i18n: true },
                    { tw: 'gameQuizQ2Opt2', cn: 'gameQuizQ2Opt2', key: '耳朵', i18n: true },
                    { tw: 'gameQuizQ2Opt3', cn: 'gameQuizQ2Opt3', key: '嘴巴', i18n: true }
                ],
                correct: 1
            },
            {
                type: 'single',
                question: { tw: 'gameQuizQ3', cn: 'gameQuizQ3', i18n: true },
                options: [
                    { tw: 'gameQuizQ3Opt0', cn: 'gameQuizQ3Opt0', key: '腳', i18n: true },
                    { tw: 'gameQuizQ3Opt1', cn: 'gameQuizQ3Opt1', key: '眼睛', i18n: true },
                    { tw: 'gameQuizQ3Opt2', cn: 'gameQuizQ3Opt2', key: '手', i18n: true },
                    { tw: 'gameQuizQ3Opt3', cn: 'gameQuizQ3Opt3', key: '耳朵', i18n: true }
                ],
                correct: 2
            }
        ],
        memory: [
            { hanzi: '頭', simpleHanzi: '头', hanziKey: 'headChar', image: 'assets/images/courseware/課程介紹頁/real_head.png' },
            { hanzi: '耳', simpleHanzi: '耳', hanziKey: 'earChar', image: 'assets/images/courseware/課程介紹頁/real_ear.png' },
            { hanzi: '腳', simpleHanzi: '脚', hanziKey: 'footChar', image: 'assets/images/courseware/課程介紹頁/real_foot.png' },
            { hanzi: '鼻', simpleHanzi: '鼻', hanziKey: 'noseChar', image: 'assets/images/courseware/課程介紹頁/real_nose.png' },
            { hanzi: '眼', simpleHanzi: '眼', hanziKey: 'eyeChar', image: 'assets/images/courseware/課程介紹頁/real_eye.png' },
            { hanzi: '口', simpleHanzi: '口', hanziKey: 'mouthChar', image: 'assets/images/courseware/課程介紹頁/real_mouth.png' },
            { hanzi: '手', simpleHanzi: '手', hanziKey: 'handChar', image: 'assets/images/courseware/課程介紹頁/real_hand.png' }
        ]
    },
    7: {
        pool: [
            { hanzi: '雞', simpleHanzi: '鸡', hanziKey: 'animalCharChick', image: 'lessons/第7課/第7課-識圖部分素材/animal_chick.png' },
            { hanzi: '羊', simpleHanzi: '羊', hanziKey: 'animalCharLamb', image: 'lessons/第7課/第7課-識圖部分素材/animal_lamb.png' },
            { hanzi: '牛', simpleHanzi: '牛', hanziKey: 'animalCharCalf', image: 'lessons/第7課/第7課-識圖部分素材/animal_calf.png' },
            { hanzi: '馬', simpleHanzi: '马', hanziKey: 'animalCharPony', image: 'lessons/第7課/第7課-識圖部分素材/animal_pony.png' },
            { hanzi: '兔', simpleHanzi: '兔', hanziKey: 'animalCharRabbit', image: 'lessons/第7課/第7課-識圖部分素材/animal_rabbit.png' },
            { hanzi: '貓', simpleHanzi: '猫', hanziKey: 'animalCharCat', image: 'lessons/第7課/第7課-識圖部分素材/animal_cat.png' },
            { hanzi: '狗', simpleHanzi: '狗', hanziKey: 'animalCharDog', image: 'lessons/第7課/第7課-識圖部分素材/animal_dog.png' },
            { hanzi: '豬', simpleHanzi: '猪', hanziKey: 'animalCharPig', image: 'lessons/第7課/第7課-識圖部分素材/animal_pig.png' },
            { hanzi: '鵝', simpleHanzi: '鹅', hanziKey: 'animalCharGoose', image: 'lessons/第7課/第7課-識圖部分素材/animal_goose.png' },
            { hanzi: '鴨', simpleHanzi: '鸭', hanziKey: 'animalCharDuck', image: 'lessons/第7課/第7課-識圖部分素材/animal_duck.png' },
            { hanzi: '蟲', simpleHanzi: '虫', hanziKey: 'animalCharBug', image: 'lessons/第7課/第7課-識圖部分素材/animal_bug.png' },
            { hanzi: '魚', simpleHanzi: '鱼', hanziKey: 'animalCharFish', image: 'lessons/第7課/第7課-識圖部分素材/animal_fish.png' },
            { hanzi: '鳥', simpleHanzi: '鸟', hanziKey: 'animalCharBird', image: 'lessons/第7課/第7課-識圖部分素材/animal_bird.png' },
            { hanzi: '象', simpleHanzi: '象', hanziKey: 'animalCharElephant', image: 'lessons/第7課/第7課-識圖部分素材/animal_elephant.png' },
            { hanzi: '虎', simpleHanzi: '虎', hanziKey: 'animalCharTiger', image: 'lessons/第7課/第7課-識圖部分素材/animal_tiger.png' }
        ]
    },
    1: {
        pool: [
            { hanzi: '一', simpleHanzi: '一', hanziKey: 'numberCharOne', image: 'lessons/第1課/第1課-識圖部分素材/num1.png' },
            { hanzi: '二', simpleHanzi: '二', hanziKey: 'numberCharTwo', image: 'lessons/第1課/第1課-識圖部分素材/num2.png' },
            { hanzi: '三', simpleHanzi: '三', hanziKey: 'numberCharThree', image: 'lessons/第1課/第1課-識圖部分素材/num3.png' },
            { hanzi: '四', simpleHanzi: '四', hanziKey: 'numberCharFour', image: 'lessons/第1課/第1課-識圖部分素材/num4.png' },
            { hanzi: '五', simpleHanzi: '五', hanziKey: 'numberCharFive', image: 'lessons/第1課/第1課-識圖部分素材/num5.png' },
            { hanzi: '六', simpleHanzi: '六', hanziKey: 'numberCharSix', image: 'lessons/第1課/第1課-識圖部分素材/num6.png' },
            { hanzi: '七', simpleHanzi: '七', hanziKey: 'numberCharSeven', image: 'lessons/第1課/第1課-識圖部分素材/num7.png' },
            { hanzi: '八', simpleHanzi: '八', hanziKey: 'numberCharEight', image: 'lessons/第1課/第1課-識圖部分素材/num8.png' },
            { hanzi: '九', simpleHanzi: '九', hanziKey: 'numberCharNine', image: 'lessons/第1課/第1課-識圖部分素材/num9.png' },
            { hanzi: '十', simpleHanzi: '十', hanziKey: 'numberCharTen', image: 'lessons/第1課/第1課-識圖部分素材/num10.png' }
        ]
    },
    5: {
        pool: [
            { hanzi: '大', simpleHanzi: '大', hanziKey: 'familyCharBig', image: 'lessons/第5課/第5課-識圖部分素材/fam_big.png' },
            { hanzi: '小', simpleHanzi: '小', hanziKey: 'familyCharSmall', image: 'lessons/第5課/第5課-識圖部分素材/fam_small.png' },
            { hanzi: '男', simpleHanzi: '男', hanziKey: 'familyCharMale', image: 'lessons/第5課/第5課-識圖部分素材/fam_boy.png' },
            { hanzi: '女', simpleHanzi: '女', hanziKey: 'familyCharFemale', image: 'lessons/第5課/第5課-識圖部分素材/fam_girl.png' },
            { hanzi: '媽', simpleHanzi: '妈', hanziKey: 'familyCharMom', image: 'lessons/第5課/第5課-識圖部分素材/fam_mom.png' },
            { hanzi: '爸', simpleHanzi: '爸', hanziKey: 'familyCharDad', image: 'lessons/第5課/第5課-識圖部分素材/fam_dad.png' },
            { hanzi: '哥', simpleHanzi: '哥', hanziKey: 'familyCharBrother', image: 'lessons/第5課/第5課-識圖部分素材/fam_brother.png' },
            { hanzi: '弟', simpleHanzi: '弟', hanziKey: 'familyCharYoungerBrother', image: 'lessons/第5課/第5課-識圖部分素材/fam_little_bro.png' },
            { hanzi: '姐', simpleHanzi: '姐', hanziKey: 'familyCharSister', image: 'lessons/第5課/第5課-識圖部分素材/fam_sister.png' },
            { hanzi: '妹', simpleHanzi: '妹', hanziKey: 'familyCharYoungerSister', image: 'lessons/第5課/第5課-識圖部分素材/fam_little_sis.png' },
            { hanzi: '我', simpleHanzi: '我', hanziKey: 'familyCharI', image: 'lessons/第5課/第5課-識圖部分素材/fam_me.png' },
            { hanzi: '你', simpleHanzi: '你', hanziKey: 'familyCharYou', image: 'lessons/第5課/第5課-識圖部分素材/fam_you.png' },
            { hanzi: '她', simpleHanzi: '她', hanziKey: 'familyCharShe', image: 'lessons/第5課/第5課-識圖部分素材/fam_she.png' },
            { hanzi: '他', simpleHanzi: '他', hanziKey: 'familyCharHe', image: 'lessons/第5課/第5課-識圖部分素材/fam_he.png' },
            { hanzi: '它', simpleHanzi: '它', hanziKey: 'familyCharIt', image: 'lessons/第5課/第5課-識圖部分素材/fam_it_beast.png' },
            { hanzi: '牠', simpleHanzi: '它', hanziKey: 'familyCharAnimalIt', image: 'lessons/第5課/第5課-識圖部分素材/fam_it_animal.png' }
        ]
    }
};

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function generateChapter7GameData() {
    const pool = gameDataByChapter[7].pool;

    // 配對：隨機抽 7 個動物
    const matching = shuffleArray(pool).slice(0, 7);

    // 翻牌：隨機抽 6 個動物
    const memory = shuffleArray(pool).slice(0, 6);

    // 選擇題：4 題單選，每題問「哪一個是某動物？」
    const quizAnimals = shuffleArray(pool).slice(0, 4);
    const quiz = quizAnimals.map(target => {
        const distractors = shuffleArray(pool.filter(a => a.hanzi !== target.hanzi)).slice(0, 3);
        const options = shuffleArray([target, ...distractors]);
        return {
            type: 'single',
            question: { tw: `哪一個是${target.hanzi}？`, cn: `哪一个是${target.simpleHanzi}？` },
            options: options.map(a => ({ tw: a.hanzi, cn: a.simpleHanzi, key: a.hanziKey, image: a.image })),
            correct: options.findIndex(a => a.hanzi === target.hanzi)
        };
    });

    return { matching, quiz, memory };
}

function generateChapter1GameData() {
    const pool = gameDataByChapter[1].pool;

    // 配對：隨機抽 7 個數字
    const matching = shuffleArray(pool).slice(0, 7);

    // 翻牌：隨機抽 6 個數字
    const memory = shuffleArray(pool).slice(0, 6);

    // 選擇題：4 題單選，每題問「哪一個是某數字？」
    const quizNumbers = shuffleArray(pool).slice(0, 4);
    const quiz = quizNumbers.map(target => {
        const distractors = shuffleArray(pool.filter(a => a.hanzi !== target.hanzi)).slice(0, 3);
        const options = shuffleArray([target, ...distractors]);
        return {
            type: 'single',
            question: { tw: `哪一個是${target.hanzi}？`, cn: `哪一个是${target.simpleHanzi}？` },
            options: options.map(a => ({ tw: a.hanzi, cn: a.simpleHanzi, key: a.hanziKey, image: a.image })),
            correct: options.findIndex(a => a.hanzi === target.hanzi)
        };
    });

    return { matching, quiz, memory };
}

function generateChapter9GameData() {
    const pool = gameDataByChapter[5].pool;

    // 配對：隨機抽 7 個字
    const matching = shuffleArray(pool).slice(0, 7);

    // 翻牌：隨機抽 6 個字
    const memory = shuffleArray(pool).slice(0, 6);

    // 選擇題：4 題單選，每題問「哪一個是某字？」
    const quizChars = shuffleArray(pool).slice(0, 4);
    const quiz = quizChars.map(target => {
        const distractors = shuffleArray(pool.filter(a => a.hanzi !== target.hanzi)).slice(0, 3);
        const options = shuffleArray([target, ...distractors]);
        return {
            type: 'single',
            question: { tw: `哪一個是${target.hanzi}？`, cn: `哪一个是${target.simpleHanzi}？` },
            options: options.map(a => ({ tw: a.hanzi, cn: a.simpleHanzi, key: a.hanziKey, image: a.image })),
            correct: options.findIndex(a => a.hanzi === target.hanzi)
        };
    });

    return { matching, quiz, memory };
}

function getGameData() {
    if (AppState.currentChapter === 7) {
        return generateChapter7GameData();
    }
    if (AppState.currentChapter === 1) {
        return generateChapter1GameData();
    }
    if (AppState.currentChapter === 5) {
        return generateChapter9GameData();
    }
    return gameDataByChapter[11];
}

let gameState = {
    currentActivity: 'menu',
    currentData: null,
    matching: { selectedImage: null, selectedText: null, matched: new Set(), matchedPairs: [], imageOrder: null, textOrder: null },
    quiz: { currentQ: 0, selected: new Set(), answered: false, correctCount: 0 },
    memory: { cards: [], flipped: [], matched: new Set(), canFlip: true, peekMode: false },
    score: 0
};

function initGame() {
    gameState.currentActivity = 'menu';
    gameState.currentData = getGameData();
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
    gameState.memory = { cards: [], flipped: [], matched: new Set(), canFlip: true, peekMode: false };
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
        { id: 'matching', src: `assets/images/games/遊戲頁面更新版/圖案匹配${suffix}按鈕.png`, w: 411.9, h: 587.3, x: 365.4, y: 247.5 },
        { id: 'quiz',     src: `assets/images/games/遊戲頁面更新版/文字選擇${suffix}按鈕.png`, w: 389.2, h: 587.3, x: 776.7, y: 247.5 },
        { id: 'memory',   src: `assets/images/games/遊戲頁面更新版/記憶翻牌${suffix}按鈕.png`, w: 389.2, h: 587.3, x: 1165.4, y: 247.5 }
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
    const data = gameState.currentData.matching;
    if (!gameState.matching.imageOrder) {
        gameState.matching.imageOrder = shuffleArray([...data]);
        gameState.matching.textOrder = shuffleArray([...data]);
    }
    const shuffledData = gameState.matching.imageOrder;
    const shuffledTexts = gameState.matching.textOrder;

    const imagesHtml = shuffledData.map((item, i) => `
        <div class="game-matching-image ${gameState.matching.matched.has(item.hanzi) ? 'matched' : ''}"
             data-hanzi="${item.hanzi}" data-side="image" data-idx="${i}"
             onclick="handleMatchingClick(this)">
            <img src="${item.image}" alt="${t(item.hanziKey || item.hanzi)}">
        </div>
    `).join('');

    const textsHtml = shuffledTexts.map((item, i) => `
        <div class="game-matching-text ${gameState.matching.matched.has(item.hanzi) ? 'matched' : ''}"
             data-hanzi="${item.hanzi}" data-side="text" data-idx="${i}"
             onclick="handleMatchingClick(this)">
            ${t(item.hanziKey || item.hanzi)}
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
            if (gameState.matching.matched.size === gameState.currentData.matching.length) {
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

function getGameQuizText(obj) {
    if (!obj) return '';
    if (typeof obj !== 'object') return String(obj);
    const lang = AppState.language === 'zh-CN' ? 'cn' : 'tw';
    const raw = obj[lang] || obj.tw || '';
    if (obj.i18n) return t(raw);
    return raw;
}

function renderQuizGame() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    const q = gameState.currentData.quiz[gameState.quiz.currentQ];

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
        if (opt.image) cls += ' image-card';
        const content = opt.image
            ? `<img src="${opt.image}" alt="${getGameQuizText(opt)}" class="game-quiz-img">`
            : `<span>${getGameQuizText(opt)}</span>`;
        return `<div class="${cls}" data-idx="${i}" onclick="handleQuizClick(${i})">${content}${mark}</div>`;
    }).join('');

    const multiHint = q.type === 'multi' ? `<div class="game-quiz-hint">${t('multiSelectHint')}</div>` : '';

    container.innerHTML = `
        <div class="game-page">
            <div class="game-quiz">
                <div class="game-quiz-question">${getGameQuizText(q.question)}</div>
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

    const q = gameState.currentData.quiz[gameState.quiz.currentQ];
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
                gameState.quiz.selected = new Set();
                gameState.quiz.answered = false;
                renderQuizGame();
            }, 1200);
        } else if (allCorrectSelected) {
            gameState.quiz.answered = true;
            gameState.score++;
            gameState.quiz.correctCount = (gameState.quiz.correctCount || 0) + 1;
            playCorrectSound();
            renderQuizGame();
            setTimeout(() => {
                if (gameState.quiz.currentQ < gameState.currentData.quiz.length - 1) {
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
        // Single select: must answer correctly to advance
        gameState.quiz.answered = true;
        if (idx === q.correct) {
            gameState.score++;
            gameState.quiz.correctCount = (gameState.quiz.correctCount || 0) + 1;
            playCorrectSound();
            renderQuizGame();
            setTimeout(() => {
                if (gameState.quiz.currentQ < gameState.currentData.quiz.length - 1) {
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
            playWrongSound();
            renderQuizGame();
            setTimeout(() => {
                gameState.quiz.selected = new Set();
                gameState.quiz.answered = false;
                renderQuizGame();
            }, 1200);
        }
    }
}

/* ---------- 活動3：記憶力翻牌子 ---------- */

function renderMemoryGame() {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    if (gameState.memory.cards.length === 0) {
        const pairs = shuffleArray([...gameState.currentData.memory]).slice(0, 6);
        const deck = [...pairs, ...pairs].map((item, i) => ({ ...item, id: i, displayHanzi: t(item.hanziKey || item.hanzi) })).sort(() => Math.random() - 0.5);
        gameState.memory.cards = deck;
    }

    const tops = [227.4, 442.9, 658.4];
    const peekMode = gameState.memory.peekMode;
    const gridHtml = gameState.memory.cards.map((card, i) => {
        const isFlipped = peekMode || gameState.memory.flipped.includes(i) || gameState.memory.matched.has(i);
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
                <button class="game-memory-peek-btn ${peekMode ? 'active' : ''}" onclick="toggleMemoryPeek()" title="${t('memoryPeekHint')}">⏰</button>
                <div class="game-memory-grid">${gridHtml}</div>
            </div>
            ${renderGameStars('memory', pairsMatched)}
        </div>
    `;
    applyCoursewareShell('game');
}

function toggleMemoryPeek() {
    const mem = gameState.memory;
    mem.peekMode = !mem.peekMode;
    renderMemoryGame();
}

function handleMemoryClick(idx) {
    const mem = gameState.memory;
    if (mem.peekMode) return;
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
                <img src="assets/images/courseware/第六頁/練習寫字環節卡片.png?v=2" alt="${t('writingPracticeTitle')}"
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
        const audio = new Audio('assets/audio/音效/correct_answer copy.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
    } catch(e) {}
}

function playWrongSound() {
    try {
        const audio = new Audio('assets/audio/音效/wrong_answer copy.mp3');
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
        // 故事繪本閱讀模式：左右鍵翻頁
        if (storyState.view === 'reader') {
            if (e.key === 'ArrowRight') nextStoryPage();
            if (e.key === 'ArrowLeft') prevStoryPage();
        } else {
            if (e.key === 'ArrowRight') nextSection();
            if (e.key === 'ArrowLeft') prevSection();
        }
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

const quizDataByChapter = {
    7: [
        {
            id: 'lesson7-story1',
            title: '故事一',
            cover: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事1封面簡體.png',
                width: 411.9,
                height: 587.3,
                x: 365.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page01_小羊收到四只新鞋.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page02_小羊救掉进水的蚂蚁.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page03_蚂蚁乘小船出发.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page04_猩猩阿姨要当妈妈了.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page05_小羊送鞋给猩猩阿姨.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page06_松鼠采松果没篮子.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page07_小羊送鞋给松鼠.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story2',
            title: '故事二',
            cover: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事2封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 776.7,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page01_小老鼠第一天上幼兒園.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page02_做早操時小老鼠逃走.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page03_躲到向日葵下被發現.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page04_倉庫門打開被找到.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page05_吃午飯又溜到滑梯頂.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page06_長頸鹿老師又找到他.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page07_心裡有線牽著喜歡上幼兒園.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story3',
            title: '故事三',
            cover: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事3封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 1165.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page01_新年到小熊說我去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page02_小熊買了山楂片.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page03_山楂片沒響小猴去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page04_小猴進雜貨店買蠟燭.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page05_蠟燭沒響狐狸去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page06_狐狸找小男孩撿鞭炮.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page07_狐狸點燃鞭炮煙花滿天.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        }
    ],
    11: [
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
    ],
    7: [
        {
            type: 'choice',
            mode: 'single',
            question: '抬頭看看天空，什麼動物會在天上飛呢？',
            options: [
                { icon: '🐦', label: '小鳥', correct: true },
                { icon: '🐟', label: '小魚', correct: false },
                { icon: '🐕', label: '小狗', correct: false },
                { icon: '🐱', label: '小貓', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '看看池塘裡，什麼動物會在水中游呢？',
            options: [
                { icon: '🐤', label: '小雞', correct: false },
                { icon: '🐠', label: '小魚', correct: true },
                { icon: '🐦', label: '小鳥', correct: false },
                { icon: '🐑', label: '小羊', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '草地上有隻小動物，牠正在吃小蟲子，是誰呢？',
            options: [
                { icon: '🐤', label: '小雞', correct: true },
                { icon: '🐄', label: '小牛', correct: false },
                { icon: '🐴', label: '小馬', correct: false },
                { icon: '🐷', label: '小豬', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '草原上有隻大動物，牠正在低頭吃草，是誰呢？',
            options: [
                { icon: '🐱', label: '小貓', correct: false },
                { icon: '🐕', label: '小狗', correct: false },
                { icon: '🐄', label: '小牛', correct: true },
                { icon: '🐤', label: '小雞', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '農場裡有隻圓滾滾的動物，牠胖胖的，是誰呢？',
            options: [
                { icon: '🐴', label: '小馬', correct: false },
                { icon: '🐷', label: '小豬', correct: true },
                { icon: '🐰', label: '小兔', correct: false },
                { icon: '🐦', label: '小鳥', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '森林裡有隻小動物，牠有長長的耳朵，是誰呢？',
            options: [
                { icon: '🐰', label: '小兔', correct: true },
                { icon: '🐱', label: '小貓', correct: false },
                { icon: '🐕', label: '小狗', correct: false },
                { icon: '🐤', label: '小雞', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '動物園裡有隻動物，牠有長長的鼻子，是誰呢？',
            options: [
                { icon: '🐷', label: '小豬', correct: false },
                { icon: '🐕', label: '小狗', correct: false },
                { icon: '🐘', label: '大象', correct: true },
                { icon: '🐰', label: '小兔', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '草原上有隻動物，牠頭上有尖尖的角，是誰呢？',
            options: [
                { icon: '🐴', label: '小馬', correct: false },
                { icon: '🐄', label: '小牛', correct: true },
                { icon: '🐱', label: '小貓', correct: false },
                { icon: '🐕', label: '小狗', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '農場裡有隻小動物，牠有翅膀，是誰呢？',
            options: [
                { icon: '🐤', label: '小雞', correct: true },
                { icon: '🐟', label: '小魚', correct: false },
                { icon: '🐄', label: '小牛', correct: false },
                { icon: '🐷', label: '小豬', correct: false }
            ]
        },
        {
            type: 'photo',
            image: 'lessons/第7課/第7課-課前提問素材/第7課-農場圖.jpg',
            imageSize: { width: 960, height: 960 },
            question: '農場裡有哪些動物呢？',
            buttons: ['小雞', '小羊', '小牛', '小馬', '小兔', '小貓', '小狗', '小豬', '鵝', '鴨', '蟲'],
            activeButton: '小雞',
            landmarks: [
                { target: '小雞', cx: 13.54, cy: 71.35, w: 26.04, h: 23.96 },
                { target: '小羊', cx: 46.88, cy: 69.27, w: 45.83, h: 30.21 },
                { target: '小牛', cx: 19.01, cy: 52.60, w: 36.98, h: 46.88 },
                { target: '小馬', cx: 84.90, cy: 42.97, w: 30.21, h: 66.15 },
                { target: '小兔', cx: 10.94, cy: 91.67, w: 21.88, h: 16.67 },
                { target: '小貓', cx: 33.85, cy: 90.89, w: 21.88, h: 18.23 },
                { target: '小狗', cx: 52.60, cy: 89.06, w: 21.88, h: 21.88 },
                { target: '小豬', cx: 80.73, cy: 91.15, w: 34.38, h: 17.71 },
                { target: '鵝',   cx: 82.29, cy: 75.00, w: 35.42, h: 41.67 },
                { target: '鴨',   cx: 50.78, cy: 45.83, w: 44.27, h: 20.83 },
                { target: '蟲',   cx: 48.70, cy: 16.41, w: 90.10, h: 24.48 }
            ]
        },
        {
            type: 'photo',
            image: 'lessons/第7課/第7課-課前提問素材/第7課-動物園圖.jpg',
            imageSize: { width: 1024, height: 1024 },
            question: '動物園裡有哪些動物呢？',
            buttons: ['大象', '老虎', '鳥', '魚'],
            activeButton: '大象',
            landmarks: [
                { target: '大象', cx: 21.00, cy: 36.62, w: 34.18, h: 42.00 },
                { target: '老虎', cx: 78.13, cy: 64.94, w: 35.16, h: 57.62 },
                { target: '鳥',   cx: 51.27, cy: 54.20, w: 18.55, h: 18.55 },
                { target: '魚',   cx: 21.48, cy: 82.52, w: 41.02, h: 28.32 }
            ]
        }
    ],
    5: [
        {
            type: 'choice',
            mode: 'single',
            question: '家裡比你大的男孩子是誰？',
            options: [
                { icon: '👦', label: '哥哥', correct: true },
                { icon: '👧', label: '妹妹', correct: false },
                { icon: '👩', label: '媽媽', correct: false },
                { icon: '👶', label: '嬰兒', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '家裡比你小的女孩子是誰？',
            options: [
                { icon: '👧', label: '姐姐', correct: false },
                { icon: '👦', label: '弟弟', correct: false },
                { icon: '👧', label: '妹妹', correct: true },
                { icon: '👴', label: '爺爺', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '看到朋友時，你會說什麼？',
            options: [
                { icon: '👋', label: '你好', correct: true },
                { icon: '👋', label: '我好', correct: false },
                { icon: '🐕', label: '牠好', correct: false },
                { icon: '👦', label: '他好', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '「她」用來稱呼誰？',
            options: [
                { icon: '👦', label: '男生', correct: false },
                { icon: '👧', label: '女生', correct: true },
                { icon: '🐕', label: '小狗', correct: false },
                { icon: '🌸', label: '花朵', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '「他」用來稱呼誰？',
            options: [
                { icon: '👧', label: '女生', correct: false },
                { icon: '👦', label: '男生', correct: true },
                { icon: '🐈', label: '小貓', correct: false },
                { icon: '🌳', label: '大樹', correct: false }
            ]
        }
    ],
    1: [
        {
            type: 'choice',
            mode: 'single',
            question: '你有多少個鼻子？',
            options: [
                { icon: '', label: '一', correct: true },
                { icon: '', label: '二', correct: false },
                { icon: '', label: '三', correct: false },
                { icon: '', label: '四', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '你有多少隻耳朵？',
            options: [
                { icon: '', label: '一', correct: false },
                { icon: '', label: '二', correct: true },
                { icon: '', label: '三', correct: false },
                { icon: '', label: '四', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '你有多少根手指？',
            options: [
                { icon: '', label: '五', correct: false },
                { icon: '', label: '八', correct: false },
                { icon: '', label: '十', correct: true },
                { icon: '', label: '二十', correct: false }
            ]
        },
        {
            type: 'choice',
            mode: 'single',
            question: '你有多少隻眼睛？',
            options: [
                { icon: '', label: '一', correct: false },
                { icon: '', label: '二', correct: true },
                { icon: '', label: '三', correct: false },
                { icon: '', label: '四', correct: false }
            ]
        },
        {
            type: 'photo',
            image: 'lessons/第1課/第1課-課前提問素材/fruit_shop_580x580.png',
            imageSize: { width: 580, height: 580 },
            question: '水果店裡有哪些數字呢？',
            buttons: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
            activeButton: '一',
            landmarks: [
                { target: '一', cx: 18.10, cy: 14.66, w: 25.86, h: 25.86 },
                { target: '二', cx: 50.00, cy: 14.66, w: 25.86, h: 25.86 },
                { target: '三', cx: 81.90, cy: 14.66, w: 25.86, h: 25.86 },
                { target: '四', cx: 34.14, cy: 38.79, w: 25.86, h: 25.86 },
                { target: '五', cx: 65.86, cy: 38.79, w: 25.86, h: 25.86 },
                { target: '六', cx: 18.10, cy: 62.93, w: 25.86, h: 25.86 },
                { target: '七', cx: 50.00, cy: 62.93, w: 25.86, h: 25.86 },
                { target: '八', cx: 81.90, cy: 62.93, w: 25.86, h: 25.86 },
                { target: '九', cx: 34.22, cy: 87.07, w: 25.86, h: 25.86 },
                { target: '十', cx: 65.95, cy: 87.07, w: 25.86, h: 25.86 }
            ]
        }
    ]
};

function getQuizData() {
    return quizDataByChapter[AppState.currentChapter] || quizDataByChapter[11];
}

function getQuizI18nKey(suffix) {
    const ch = AppState.currentChapter || 11;
    const prefix = ch === 11 ? 'quiz' : 'quiz' + ch;
    return prefix + suffix;
}

let quizState = {
    currentIndex: 0,
    scores: new Array(9).fill(false),
    selectedCards: new Set(),
    photoMarked: false,
    markers: [],
    photoProgress: {}
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
    quizState.scores = new Array(getQuizData().length).fill(false);
    quizState.selectedCards = new Set();
    quizState.photoMarked = false;
    quizState.markers = [];
    quizState.photoProgress = {};
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    const quizData = getQuizData();
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
    const quizData = getQuizData();
    q = quizData[quizState.currentIndex];
    const qi = quizState.currentIndex;
    const cardsHtml = q.options.map((opt, i) => {
        let stateClass = '';
        const isSelected = quizState.selectedCards.has(i);
        if (isSelected) {
            stateClass = opt.correct ? 'correct' : 'wrong';
        }
        const iconHtml = opt.icon ? `<div class="quiz-card-icon">${opt.icon}</div>` : '';
        return `
            <div class="quiz-card ${stateClass}" onclick="handleCardClick(${i}, ${opt.correct})">
                ${iconHtml}
                <div class="quiz-card-label">${t(getQuizI18nKey('Q' + qi + 'Opt' + i))}</div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="quiz-choice-mode">
            <div class="quiz-question">${t(getQuizI18nKey('Q' + qi))}</div>
            <div class="quiz-cards">${cardsHtml}</div>
        </div>
    `;
}

function renderPhotoQuestion(q) {
    const quizData = getQuizData();
    q = quizData[quizState.currentIndex];
    const qi = quizState.currentIndex;
    const found = quizState.photoProgress[qi] || new Set();
    const remaining = q.buttons.filter(btn => !found.has(btn));
    const activeButton = remaining.length > 0 ? remaining[0] : q.activeButton;
    const buttonsHtml = q.buttons.map((btn, i) => {
        const isActive = btn === activeButton;
        return `<div class="quiz-photo-btn ${isActive ? 'active' : ''}">${t(getQuizI18nKey('Q' + qi + 'Btn' + i))}</div>`;
    }).join('');
    
    const imgSrc = q.image || 'assets/images/courseware/真人圖片標記_11課身體.png';
    
    // 渲染所有已保存的標記
    const markersHtml = quizState.markers.map(m => {
        const w = m.unit === 'percent' ? `${m.w}%` : `${m.w}px`;
        const h = m.unit === 'percent' ? `${m.h}%` : `${m.h}px`;
        return `<div class="quiz-marker" style="width:${w};height:${h};left:${m.left}%;top:${m.top}%;"></div>`;
    }).join('');
    
    return `
        <div class="quiz-photo-mode">
            <div class="quiz-photo-question">${t(getQuizI18nKey('Q' + qi))}</div>
            <div class="quiz-photo-left">${buttonsHtml}</div>
            <div class="quiz-photo-area" id="photoArea" onclick="handlePhotoClick(event)">
                <img src="${imgSrc}" alt="${t('realPhoto')}">
                ${markersHtml}
            </div>
        </div>
    `;
}

function handleCardClick(index, isCorrect) {
    const q = getQuizData()[quizState.currentIndex];
    
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
    const q = getQuizData()[quizState.currentIndex];
    const area = document.getElementById('photoArea');
    if (!area || !q.landmarks || q.landmarks.length === 0) return;

    const areaRect = area.getBoundingClientRect();
    let xPct, yPct, thresholdCalc;

    if (q.imageSize) {
        // 新邏輯：動態圖片尺寸，object-fit: contain
        const cw = areaRect.width;
        const ch = areaRect.height;
        const iw = q.imageSize.width;
        const ih = q.imageSize.height;
        const containerRatio = cw / ch;
        const imageRatio = iw / ih;
        let displayW, displayH, offsetX, offsetY;
        if (imageRatio > containerRatio) {
            displayW = cw;
            displayH = cw / imageRatio;
            offsetX = 0;
            offsetY = (ch - displayH) / 2;
        } else {
            displayH = ch;
            displayW = ch * imageRatio;
            offsetX = (cw - displayW) / 2;
            offsetY = 0;
        }

        const xImg = event.clientX - areaRect.left - offsetX;
        const yImg = event.clientY - areaRect.top - offsetY;
        if (xImg < 0 || xImg > displayW || yImg < 0 || yImg > displayH) return;

        xPct = (xImg / displayW) * 100;
        yPct = (yImg / displayH) * 100;

        thresholdCalc = (lm) => {
            const halfWPct = lm.w / 2;
            const halfHPct = lm.h / 2;
            return halfWPct * halfWPct + halfHPct * halfHPct;
        };
    } else {
        // 舊邏輯：固定 580×580 圖片區域（單元11身體圖）
        const AREA_W = 750;
        const AREA_H = 580;
        const IMG_SIZE = 580;
        const IMG_OFFSET_X = 85;

        const scale = areaRect.width / AREA_W;
        const xDesign = (event.clientX - areaRect.left) / scale;
        const yDesign = (event.clientY - areaRect.top) / scale;

        const imgX = xDesign - IMG_OFFSET_X;
        const imgY = yDesign;
        if (imgX < 0 || imgX > IMG_SIZE || imgY < 0 || imgY > IMG_SIZE) return;

        xPct = (imgX / IMG_SIZE) * 100;
        yPct = (imgY / IMG_SIZE) * 100;

        thresholdCalc = (lm) => {
            const halfWPct = (lm.w / 2 / IMG_SIZE) * 100;
            const halfHPct = (lm.h / 2 / IMG_SIZE) * 100;
            return halfWPct * halfWPct + halfHPct * halfHPct;
        };
    }

    // 找到最近的標記中心點
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

    const threshold = thresholdCalc(nearest);
    const isCorrect = minDist <= threshold;

    if (!isCorrect) {
        playWrongSound();
        return;
    }

    // 多目標題型：檢查是否點到還沒找過的動物
    const isMultiTarget = q.landmarks.some(lm => lm.target);
    if (isMultiTarget) {
        const found = quizState.photoProgress[quizState.currentIndex] || new Set();
        if (found.has(nearest.target)) {
            // 已經找過了，不再重複計算
            return;
        }
        found.add(nearest.target);
        quizState.photoProgress[quizState.currentIndex] = found;
    }

    playCorrectSound();

    if (q.imageSize) {
        // 把標記轉回容器百分比，讓標記正確貼在圖片上
        const cw = areaRect.width;
        const ch = areaRect.height;
        const iw = q.imageSize.width;
        const ih = q.imageSize.height;
        const containerRatio = cw / ch;
        const imageRatio = iw / ih;
        let displayW, displayH, offsetX, offsetY;
        if (imageRatio > containerRatio) {
            displayW = cw;
            displayH = cw / imageRatio;
            offsetX = 0;
            offsetY = (ch - displayH) / 2;
        } else {
            displayH = ch;
            displayW = ch * imageRatio;
            offsetX = (cw - displayW) / 2;
            offsetY = 0;
        }

        const leftPct = (offsetX + (nearest.cx / 100) * displayW) / cw * 100;
        const topPct = (offsetY + (nearest.cy / 100) * displayH) / ch * 100;
        const wPct = (nearest.w / 100) * displayW / cw * 100;
        const hPct = (nearest.h / 100) * displayH / ch * 100;

        quizState.markers.push({
            left: leftPct,
            top: topPct,
            w: wPct,
            h: hPct,
            unit: 'percent'
        });
    } else {
        const AREA_W = 750;
        const AREA_H = 580;
        const IMG_SIZE = 580;
        const IMG_OFFSET_X = 85;

        const leftPct = ((nearest.cx / 100) * IMG_SIZE + IMG_OFFSET_X) / AREA_W * 100;
        const topPct = (nearest.cy / 100) * IMG_SIZE / AREA_H * 100;

        quizState.markers.push({
            left: leftPct,
            top: topPct,
            w: nearest.w,
            h: nearest.h
        });
    }

    // 多目標題型：尚未找完所有動物則停留在同一題
    if (isMultiTarget) {
        const found = quizState.photoProgress[quizState.currentIndex];
        if (found && found.size < q.buttons.length) {
            // 先短暫顯示本次標記圈，再清空並切換到下一個動物
            renderQuiz();
            setTimeout(() => {
                quizState.markers = [];
                renderQuiz();
            }, 1200);
            return;
        }
        // 全部完成，重置進度
        quizState.photoProgress[quizState.currentIndex] = new Set();
    }

    if (!quizState.scores[quizState.currentIndex]) {
        quizState.scores[quizState.currentIndex] = true;
    }

    renderQuiz();

    // 最後一題播放紙屑並清除標記
    if (quizState.currentIndex === getQuizData().length - 1) {
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
    if (quizState.currentIndex < getQuizData().length - 1) {
        quizState.photoProgress[quizState.currentIndex] = new Set();
        quizState.currentIndex++;
        quizState.selectedCards = new Set();
        quizState.photoMarked = false;
        quizState.markers = [];
        renderQuiz();
    }
}

function prevQuiz() {
    if (quizState.currentIndex > 0) {
        quizState.photoProgress[quizState.currentIndex] = new Set();
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

const recognitionDataByChapter = {
    7: [
        {
            id: 'lesson7-story1',
            title: '故事一',
            cover: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事1封面簡體.png',
                width: 411.9,
                height: 587.3,
                x: 365.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page01_小羊收到四只新鞋.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page02_小羊救掉进水的蚂蚁.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page03_蚂蚁乘小船出发.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page04_猩猩阿姨要当妈妈了.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page05_小羊送鞋给猩猩阿姨.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page06_松鼠采松果没篮子.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page07_小羊送鞋给松鼠.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story2',
            title: '故事二',
            cover: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事2封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 776.7,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page01_小老鼠第一天上幼兒園.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page02_做早操時小老鼠逃走.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page03_躲到向日葵下被發現.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page04_倉庫門打開被找到.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page05_吃午飯又溜到滑梯頂.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page06_長頸鹿老師又找到他.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page07_心裡有線牽著喜歡上幼兒園.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story3',
            title: '故事三',
            cover: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事3封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 1165.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page01_新年到小熊說我去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page02_小熊買了山楂片.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page03_山楂片沒響小猴去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page04_小猴進雜貨店買蠟燭.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page05_蠟燭沒響狐狸去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page06_狐狸找小男孩撿鞭炮.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page07_狐狸點燃鞭炮煙花滿天.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        }
    ],
    11: [
        { hanziKey: 'headChar', pinyin: 'tóu',   defKey: 'recDef1', color: '#FF6B6B', image: 'assets/images/courseware/課程介紹頁/real_head.png',  audio: 'assets/images/courseware/課程介紹頁/audio_tou.mp3' },
        { hanziKey: 'earChar', pinyin: 'ěr',    defKey: 'recDef2', color: '#4ECDC4', image: 'assets/images/courseware/課程介紹頁/real_ear.png',   audio: 'assets/images/courseware/課程介紹頁/audio_er.mp3' },
        { hanziKey: 'footChar', pinyin: 'jiǎo',  defKey: 'recDef3', color: '#45B7D1', image: 'assets/images/courseware/課程介紹頁/real_foot.png',  audio: 'assets/images/courseware/課程介紹頁/audio_jiao.mp3' },
        { hanziKey: 'noseChar', pinyin: 'bí',    defKey: 'recDef4', color: '#96CEB4', image: 'assets/images/courseware/課程介紹頁/real_nose.png',  audio: 'assets/images/courseware/課程介紹頁/audio_bi.mp3' },
        { hanziKey: 'eyeChar', pinyin: 'yǎn',   defKey: 'recDef5', color: '#FFEAA7', image: 'assets/images/courseware/課程介紹頁/real_eye.png',   audio: 'assets/images/courseware/課程介紹頁/audio_yan.mp3' },
        { hanziKey: 'mouthChar', pinyin: 'kǒu',   defKey: 'recDef6', color: '#DDA0DD', image: 'assets/images/courseware/課程介紹頁/real_mouth.png', audio: 'assets/images/courseware/課程介紹頁/audio_kou.mp3' },
        { hanziKey: 'handChar', pinyin: 'shǒu',  defKey: 'recDef7', color: '#98D8C8', image: 'assets/images/courseware/課程介紹頁/real_hand.png', audio: 'assets/images/courseware/課程介紹頁/audio_shou.mp3' }
    ],
    7: [
        { hanziKey: 'animalCharChick', pinyin: 'jī', defKey: 'recDefChick', color: '#FFD700', image: 'lessons/第7課/第7課-識圖部分素材/animal_chick.png', audio: 'lessons/第7課/第7課-識圖部分錄音/鸡.mp3' },
        { hanziKey: 'animalCharLamb', pinyin: 'yáng', defKey: 'recDefLamb', color: '#F5F5DC', image: 'lessons/第7課/第7課-識圖部分素材/animal_lamb.png', audio: 'lessons/第7課/第7課-識圖部分錄音/羊.mp3' },
        { hanziKey: 'animalCharCalf', pinyin: 'niú', defKey: 'recDefCalf', color: '#8B4513', image: 'lessons/第7課/第7課-識圖部分素材/animal_calf.png', audio: 'lessons/第7課/第7課-識圖部分錄音/牛.mp3' },
        { hanziKey: 'animalCharPony', pinyin: 'mǎ', defKey: 'recDefPony', color: '#A9A9A9', image: 'lessons/第7課/第7課-識圖部分素材/animal_pony.png', audio: 'lessons/第7課/第7課-識圖部分錄音/马.mp3' },
        { hanziKey: 'animalCharRabbit', pinyin: 'tù', defKey: 'recDefRabbit', color: '#FFB6C1', image: 'lessons/第7課/第7課-識圖部分素材/animal_rabbit.png', audio: 'lessons/第7課/第7課-識圖部分錄音/兔.mp3' },
        { hanziKey: 'animalCharCat', pinyin: 'māo', defKey: 'recDefCat', color: '#FFA500', image: 'lessons/第7課/第7課-識圖部分素材/animal_cat.png', audio: 'lessons/第7課/第7課-識圖部分錄音/猫.mp3' },
        { hanziKey: 'animalCharDog', pinyin: 'gǒu', defKey: 'recDefDog', color: '#D2691E', image: 'lessons/第7課/第7課-識圖部分素材/animal_dog.png', audio: 'lessons/第7課/第7課-識圖部分錄音/狗.mp3' },
        { hanziKey: 'animalCharPig', pinyin: 'zhū', defKey: 'recDefPig', color: '#FFC0CB', image: 'lessons/第7課/第7課-識圖部分素材/animal_pig.png', audio: 'lessons/第7課/第7課-識圖部分錄音/猪.mp3' },
        { hanziKey: 'animalCharGoose', pinyin: 'é', defKey: 'recDefGoose', color: '#E0E0E0', image: 'lessons/第7課/第7課-識圖部分素材/animal_goose.png', audio: 'lessons/第7課/第7課-識圖部分錄音/鹅.mp3' },
        { hanziKey: 'animalCharDuck', pinyin: 'yā', defKey: 'recDefDuck', color: '#FFFF00', image: 'lessons/第7課/第7課-識圖部分素材/animal_duck.png', audio: 'lessons/第7課/第7課-識圖部分錄音/鸭.mp3' },
        { hanziKey: 'animalCharBug', pinyin: 'chóng', defKey: 'recDefBug', color: '#98FB98', image: 'lessons/第7課/第7課-識圖部分素材/animal_bug.png', audio: 'lessons/第7課/第7課-識圖部分錄音/虫.mp3' },
        { hanziKey: 'animalCharFish', pinyin: 'yú', defKey: 'recDefFish', color: '#00CED1', image: 'lessons/第7課/第7課-識圖部分素材/animal_fish.png', audio: 'lessons/第7課/第7課-識圖部分錄音/鱼.mp3' },
        { hanziKey: 'animalCharBird', pinyin: 'niǎo', defKey: 'recDefBird', color: '#87CEEB', image: 'lessons/第7課/第7課-識圖部分素材/animal_bird.png', audio: 'lessons/第7課/第7課-識圖部分錄音/鸟.mp3' },
        { hanziKey: 'animalCharElephant', pinyin: 'xiàng', defKey: 'recDefElephant', color: '#708090', image: 'lessons/第7課/第7課-識圖部分素材/animal_elephant.png', audio: 'lessons/第7課/第7課-識圖部分錄音/象.mp3' },
        { hanziKey: 'animalCharTiger', pinyin: 'hǔ', defKey: 'recDefTiger', color: '#FF8C00', image: 'lessons/第7課/第7課-識圖部分素材/animal_tiger.png', audio: 'lessons/第7課/第7課-識圖部分錄音/虎.mp3' }
    ],
    5: [
        { hanziKey: 'familyCharBig', pinyin: 'dà', defKey: 'recDefFamilyBig', color: '#FF6B6B', image: 'lessons/第5課/第5課-識圖部分素材/fam_big.png', audio: 'lessons/第5課/第5課-識圖部分錄音/大.mp3' },
        { hanziKey: 'familyCharSmall', pinyin: 'xiǎo', defKey: 'recDefFamilySmall', color: '#4ECDC4', image: 'lessons/第5課/第5課-識圖部分素材/fam_small.png', audio: 'lessons/第5課/第5課-識圖部分錄音/小.mp3' },
        { hanziKey: 'familyCharMale', pinyin: 'nán', defKey: 'recDefFamilyMale', color: '#45B7D1', image: 'lessons/第5課/第5課-識圖部分素材/fam_boy.png', audio: 'lessons/第5課/第5課-識圖部分錄音/男.mp3' },
        { hanziKey: 'familyCharFemale', pinyin: 'nǚ', defKey: 'recDefFamilyFemale', color: '#96CEB4', image: 'lessons/第5課/第5課-識圖部分素材/fam_girl.png', audio: 'lessons/第5課/第5課-識圖部分錄音/女.mp3' },
        { hanziKey: 'familyCharMom', pinyin: 'mā', defKey: 'recDefFamilyMom', color: '#FFEAA7', image: 'lessons/第5課/第5課-識圖部分素材/fam_mom.png', audio: 'lessons/第5課/第5課-識圖部分錄音/妈.mp3' },
        { hanziKey: 'familyCharDad', pinyin: 'bà', defKey: 'recDefFamilyDad', color: '#DDA0DD', image: 'lessons/第5課/第5課-識圖部分素材/fam_dad.png', audio: 'lessons/第5課/第5課-識圖部分錄音/爸.mp3' },
        { hanziKey: 'familyCharBrother', pinyin: 'gē', defKey: 'recDefFamilyBrother', color: '#98D8C8', image: 'lessons/第5課/第5課-識圖部分素材/fam_brother.png', audio: 'lessons/第5課/第5課-識圖部分錄音/哥.mp3' },
        { hanziKey: 'familyCharYoungerBrother', pinyin: 'dì', defKey: 'recDefFamilyYoungerBrother', color: '#F7DC6F', image: 'lessons/第5課/第5課-識圖部分素材/fam_little_bro.png', audio: 'lessons/第5課/第5課-識圖部分錄音/弟.mp3' },
        { hanziKey: 'familyCharSister', pinyin: 'jiě', defKey: 'recDefFamilySister', color: '#BB8FCE', image: 'lessons/第5課/第5課-識圖部分素材/fam_sister.png', audio: 'lessons/第5課/第5課-識圖部分錄音/姐.mp3' },
        { hanziKey: 'familyCharYoungerSister', pinyin: 'mèi', defKey: 'recDefFamilyYoungerSister', color: '#85C1E9', image: 'lessons/第5課/第5課-識圖部分素材/fam_little_sis.png', audio: 'lessons/第5課/第5課-識圖部分錄音/妹.mp3' },
        { hanziKey: 'familyCharI', pinyin: 'wǒ', defKey: 'recDefFamilyI', color: '#F06292', image: 'lessons/第5課/第5課-識圖部分素材/fam_me.png', audio: 'lessons/第5課/第5課-識圖部分錄音/我.mp3' },
        { hanziKey: 'familyCharYou', pinyin: 'nǐ', defKey: 'recDefFamilyYou', color: '#FF8C00', image: 'lessons/第5課/第5課-識圖部分素材/fam_you.png', audio: 'lessons/第5課/第5課-識圖部分錄音/你.mp3' },
        { hanziKey: 'familyCharShe', pinyin: 'tā', defKey: 'recDefFamilyShe', color: '#66BB6A', image: 'lessons/第5課/第5課-識圖部分素材/fam_she.png', audio: 'lessons/第5課/第5課-識圖部分錄音/她.mp3' },
        { hanziKey: 'familyCharHe', pinyin: 'tā', defKey: 'recDefFamilyHe', color: '#42A5F5', image: 'lessons/第5課/第5課-識圖部分素材/fam_he.png', audio: 'lessons/第5課/第5課-識圖部分錄音/他.mp3' },
        { hanziKey: 'familyCharIt', pinyin: 'tā', defKey: 'recDefFamilyIt', color: '#AB47BC', image: 'lessons/第5課/第5課-識圖部分素材/fam_it_beast.png', audio: 'lessons/第5課/第5課-識圖部分錄音/它.mp3' },
        { hanziKey: 'familyCharAnimalIt', pinyin: 'tā', defKey: 'recDefFamilyAnimalIt', color: '#EF5350', image: 'lessons/第5課/第5課-識圖部分素材/fam_it_animal.png', audio: 'lessons/第5課/第5課-識圖部分錄音/牠.mp3' }
    ],
    1: [
        { hanziKey: 'numberCharOne', pinyin: 'yī', defKey: 'recDefOne', color: '#FF6B6B', image: 'lessons/第1課/第1課-識圖部分素材/num1.png', audio: 'lessons/第1課/第1課-識圖部分錄音/一.mp3' },
        { hanziKey: 'numberCharTwo', pinyin: 'èr', defKey: 'recDefTwo', color: '#4ECDC4', image: 'lessons/第1課/第1課-識圖部分素材/num2.png', audio: 'lessons/第1課/第1課-識圖部分錄音/二.mp3' },
        { hanziKey: 'numberCharThree', pinyin: 'sān', defKey: 'recDefThree', color: '#45B7D1', image: 'lessons/第1課/第1課-識圖部分素材/num3.png', audio: 'lessons/第1課/第1課-識圖部分錄音/三.mp3' },
        { hanziKey: 'numberCharFour', pinyin: 'sì', defKey: 'recDefFour', color: '#96CEB4', image: 'lessons/第1課/第1課-識圖部分素材/num4.png', audio: 'lessons/第1課/第1課-識圖部分錄音/四.mp3' },
        { hanziKey: 'numberCharFive', pinyin: 'wǔ', defKey: 'recDefFive', color: '#FFEAA7', image: 'lessons/第1課/第1課-識圖部分素材/num5.png', audio: 'lessons/第1課/第1課-識圖部分錄音/五.mp3' },
        { hanziKey: 'numberCharSix', pinyin: 'liù', defKey: 'recDefSix', color: '#DDA0DD', image: 'lessons/第1課/第1課-識圖部分素材/num6.png', audio: 'lessons/第1課/第1課-識圖部分錄音/六.mp3' },
        { hanziKey: 'numberCharSeven', pinyin: 'qī', defKey: 'recDefSeven', color: '#98D8C8', image: 'lessons/第1課/第1課-識圖部分素材/num7.png', audio: 'lessons/第1課/第1課-識圖部分錄音/七.mp3' },
        { hanziKey: 'numberCharEight', pinyin: 'bā', defKey: 'recDefEight', color: '#F7DC6F', image: 'lessons/第1課/第1課-識圖部分素材/num8.png', audio: 'lessons/第1課/第1課-識圖部分錄音/八.mp3' },
        { hanziKey: 'numberCharNine', pinyin: 'jiǔ', defKey: 'recDefNine', color: '#BB8FCE', image: 'lessons/第1課/第1課-識圖部分素材/num9.png', audio: 'lessons/第1課/第1課-識圖部分錄音/九.mp3' },
        { hanziKey: 'numberCharTen', pinyin: 'shí', defKey: 'recDefTen', color: '#85C1E9', image: 'lessons/第1課/第1課-識圖部分素材/num10.png', audio: 'lessons/第1課/第1課-識圖部分錄音/十.mp3' }
    ]
};

function getRecognitionData() {
    return recognitionDataByChapter[AppState.currentChapter] || recognitionDataByChapter[11];
}

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

    const data = getRecognitionData();
    const item = data[recognitionState.currentIndex];
    const hanzi = t(item.hanziKey);

    const html = `
        <div class="recognition-page">
            <!-- 上方詞彙圓圈 -->
            <div class="rec-word-nav">
                ${data.map((w, i) => `<button class="rec-word-btn ${i === recognitionState.currentIndex ? 'active' : ''}" onclick="goToRecognition(${i})">${t(w.hanziKey)}</button>`).join('')}
            </div>

            <!-- 左側圖片 -->
            <div class="rec-image-area">
                <img src="${item.image}" alt="${hanzi}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <div class="rec-image-fallback" style="background:${item.color}22;border:4px dashed ${item.color};">
                    <div style="text-align:center;">
                        <div style="font-size:120px;color:${item.color};font-weight:bold;">${hanzi}</div>
                        <div style="font-size:16px;color:#888;margin-top:10px;">${t('bodyPartDiagram')}</div>
                    </div>
                </div>
            </div>

            <!-- 右側文字 -->
            <div class="rec-text-area">
                <button class="rec-speaker" onclick="playPronunciation()" title="${t('playAudio')}">🔊</button>
                <div class="rec-pinyin">${item.pinyin}</div>
                <div class="rec-hanzi">${hanzi}</div>
                <div class="rec-definition">${t(item.defKey)}</div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    applyCoursewareShell('recognition');
}

let recCurrentAudio = null;

function playPronunciation() {
    const btn = document.querySelector('.rec-speaker');
    const item = getRecognitionData()[recognitionState.currentIndex];
    
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
    if (index >= 0 && index < getRecognitionData().length) {
        recognitionState.currentIndex = index;
        renderRecognition();
    }
}

function nextRecognition() {
    if (recognitionState.currentIndex < getRecognitionData().length - 1) {
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

function switchLearningModule(module, forceReset = false) {
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

    // 同步 sectionConfig 與頁面標題
    updateSectionConfig();
    const titleEl = document.getElementById('sectionTitle');
    if (titleEl) titleEl.textContent = sectionConfig[AppState.currentSection]?.name || '';
    if (learningPage) {
        learningPage.className = 'learning-page ' + (sectionConfig[AppState.currentSection]?.theme || 'theme-blue');
    }

    // 全部隱藏
    quizContainer.style.display = 'none';
    recognitionContainer.style.display = 'none';
    if (writingContainer) writingContainer.style.display = 'none';
    if (storyContainer) storyContainer.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'none';
    if (learnMain) learnMain.style.display = 'none';

    // 清除可能殘留的遊戲完成彈窗與彩帶
    document.querySelectorAll('.game-complete-overlay, .game-confetti-piece').forEach(el => el.remove());

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
            initQuiz();
            break;
        case 'recognition':
            recognitionContainer.style.display = 'block';
            if (learningPage) {
                learningPage.style.borderColor = '#0054a6';
            }
            initRecognition();
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

const writingDataByChapter = {
    7: [
        {
            id: 'lesson7-story1',
            title: '故事一',
            cover: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事1封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事1封面簡體.png',
                width: 411.9,
                height: 587.3,
                x: 365.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page01_小羊收到四只新鞋.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page02_小羊救掉进水的蚂蚁.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page03_蚂蚁乘小船出发.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page04_猩猩阿姨要当妈妈了.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page05_小羊送鞋给猩猩阿姨.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page06_松鼠采松果没篮子.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事1/page07_小羊送鞋给松鼠.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story2',
            title: '故事二',
            cover: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事2封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事2封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 776.7,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page01_小老鼠第一天上幼兒園.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page02_做早操時小老鼠逃走.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page03_躲到向日葵下被發現.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page04_倉庫門打開被找到.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page05_吃午飯又溜到滑梯頂.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page06_長頸鹿老師又找到他.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事2/page07_心裡有線牽著喜歡上幼兒園.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        },
        {
            id: 'lesson7-story3',
            title: '故事三',
            cover: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
            card: {
                tw: 'assets/images/stories/圖書封面/第7課-故事3封面繁體.png',
                cn: 'assets/images/stories/圖書封面/第7課-故事3封面簡體.png',
                width: 389.2,
                height: 587.3,
                x: 1165.4,
                y: 247.5
            },
            pages: [
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page01_新年到小熊說我去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page02_小熊買了山楂片.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page03_山楂片沒響小猴去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page04_小猴進雜貨店買蠟燭.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page05_蠟燭沒響狐狸去買.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page06_狐狸找小男孩撿鞭炮.png'
                },
                {
                    type: 'image',
                    image: 'assets/images/stories/故事繪本頁面更新版/第7課故事3/page07_狐狸點燃鞭炮煙花滿天.png'
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                },
                {
                    type: 'question',
                    image: {
                        tw: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png',
                        cn: 'assets/images/stories/故事繪本頁面更新版/placeholder-question.png'
                    }
                }
            ]
        }
    ],
    11: [
        { hanziKey: 'headChar', pinyin: 'tóu', animationTraditional: 'strokes/筆畫動畫/頭-繁體筆畫.mov', animationSimplified: 'strokes/筆畫動畫/頭-簡體筆畫.mov' },
        { hanziKey: 'earChar', pinyin: 'ěr', animationTraditional: 'strokes/筆畫動畫/耳-繁體簡體筆畫.mov', animationSimplified: 'strokes/筆畫動畫/耳-繁體簡體筆畫.mov' },
        { hanziKey: 'footChar', pinyin: 'jiǎo', animationTraditional: 'strokes/筆畫動畫/腳-繁體筆畫.mov', animationSimplified: 'strokes/筆畫動畫/腳-簡體筆畫.mov' },
        { hanziKey: 'noseChar', pinyin: 'bí', animationTraditional: 'strokes/筆畫動畫/鼻-繁體簡體.mov', animationSimplified: 'strokes/筆畫動畫/鼻-繁體簡體.mov' },
        { hanziKey: 'eyeChar', pinyin: 'yǎn', animationTraditional: 'strokes/筆畫動畫/眼-繁體簡體.mov', animationSimplified: 'strokes/筆畫動畫/眼-繁體簡體.mov' },
        { hanziKey: 'mouthChar', pinyin: 'kǒu', animationTraditional: 'strokes/筆畫動畫/口-繁體簡體.mov', animationSimplified: 'strokes/筆畫動畫/口-繁體簡體.mov' },
        { hanziKey: 'handChar', pinyin: 'shǒu', animationTraditional: 'strokes/筆畫動畫/手-繁體簡體.mov', animationSimplified: 'strokes/筆畫動畫/手-繁體簡體.mov' }
    ],
    7: [
        { hanziKey: 'animalCharChick', pinyin: 'jī', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-雞.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-鸡.gif', gifDuration: 24400 },
        { hanziKey: 'animalCharLamb', pinyin: 'yáng', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-羊.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-羊.gif', gifDuration: 9800 },
        { hanziKey: 'animalCharCalf', pinyin: 'niú', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-牛.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-牛.gif', gifDuration: 7300 },
        { hanziKey: 'animalCharPony', pinyin: 'mǎ', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-馬.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-马.gif', gifDuration: 14600 },
        { hanziKey: 'animalCharRabbit', pinyin: 'tù', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-兔.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-兔.gif', gifDuration: 12800 },
        { hanziKey: 'animalCharCat', pinyin: 'māo', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-貓.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-猫.gif', gifDuration: 22300 },
        { hanziKey: 'animalCharDog', pinyin: 'gǒu', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-狗.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-狗.gif', gifDuration: 12500 },
        { hanziKey: 'animalCharPig', pinyin: 'zhū', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-豬.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-猪.gif', gifDuration: 12500 },
        { hanziKey: 'animalCharGoose', pinyin: 'é', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-鵝.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-鹅.gif', gifDuration: 25000 },
        { hanziKey: 'animalCharDuck', pinyin: 'yā', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-鴨.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-鸭.gif', gifDuration: 21900 },
        { hanziKey: 'animalCharBug', pinyin: 'chóng', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-蟲.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-虫.gif', gifDuration: 25000 },
        { hanziKey: 'animalCharFish', pinyin: 'yú', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-魚.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-鱼.gif', gifDuration: 15500 },
        { hanziKey: 'animalCharBird', pinyin: 'niǎo', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-鳥.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-鸟.gif', gifDuration: 16000 },
        { hanziKey: 'animalCharElephant', pinyin: 'xiàng', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-象.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-象.gif', gifDuration: 17100 },
        { hanziKey: 'animalCharTiger', pinyin: 'hǔ', animationTraditional: 'lessons/第7課/第7課-識字部分gif/第7課-虎.gif', animationSimplified: 'lessons/第7課/第7課-識字部分gif/第7課-虎.gif', gifDuration: 12600 }
    ],
    1: [
        { hanziKey: 'numberCharOne', pinyin: 'yī', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-一.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-一.gif', gifDuration: 2800 },
        { hanziKey: 'numberCharTwo', pinyin: 'èr', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-二.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-二.gif', gifDuration: 4300 },
        { hanziKey: 'numberCharThree', pinyin: 'sān', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-三.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-三.gif', gifDuration: 5800 },
        { hanziKey: 'numberCharFour', pinyin: 'sì', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-四.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-四.gif', gifDuration: 9100 },
        { hanziKey: 'numberCharFive', pinyin: 'wǔ', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-五.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-五.gif', gifDuration: 7700 },
        { hanziKey: 'numberCharSix', pinyin: 'liù', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-六.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-六.gif', gifDuration: 6600 },
        { hanziKey: 'numberCharSeven', pinyin: 'qī', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-七.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-七.gif', gifDuration: 3900 },
        { hanziKey: 'numberCharEight', pinyin: 'bā', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-八.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-八.gif', gifDuration: 4000 },
        { hanziKey: 'numberCharNine', pinyin: 'jiǔ', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-九.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-九.gif', gifDuration: 5300 },
        { hanziKey: 'numberCharTen', pinyin: 'shí', animationTraditional: 'lessons/第1課/第1課-識字部分gif/第1課-十.gif', animationSimplified: 'lessons/第1課/第1課-識字部分gif/第1課-十.gif', gifDuration: 4600 }
    ],
    5: [
        { hanziKey: 'familyCharBig', pinyin: 'dà', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-大.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-大.gif', gifDuration: 5900 },
        { hanziKey: 'familyCharSmall', pinyin: 'xiǎo', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-小.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-小.gif', gifDuration: 5600 },
        { hanziKey: 'familyCharMale', pinyin: 'nán', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-男.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-男.gif', gifDuration: 11700 },
        { hanziKey: 'familyCharFemale', pinyin: 'nǚ', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-女.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-女.gif', gifDuration: 6300 },
        { hanziKey: 'familyCharMom', pinyin: 'mā', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-媽.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-妈.gif', gifDuration: 18700 },
        { hanziKey: 'familyCharDad', pinyin: 'bà', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-爸.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-爸.gif', gifDuration: 12600 },
        { hanziKey: 'familyCharBrother', pinyin: 'gē', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-哥.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-哥.gif', gifDuration: 14800 },
        { hanziKey: 'familyCharYoungerBrother', pinyin: 'dì', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-弟.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-弟.gif', gifDuration: 11800 },
        { hanziKey: 'familyCharSister', pinyin: 'jiě', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-姐.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-姐.gif', gifDuration: 12800 },
        { hanziKey: 'familyCharYoungerSister', pinyin: 'mèi', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-妹.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-妹.gif', gifDuration: 12900 },
        { hanziKey: 'familyCharI', pinyin: 'wǒ', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-我.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-我.gif', gifDuration: 11700 },
        { hanziKey: 'familyCharYou', pinyin: 'nǐ', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-你.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-你.gif', gifDuration: 10900 },
        { hanziKey: 'familyCharShe', pinyin: 'tā', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-她.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-她.gif', gifDuration: 11100 },
        { hanziKey: 'familyCharHe', pinyin: 'tā', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-他.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-他.gif', gifDuration: 9400 },
        { hanziKey: 'familyCharIt', pinyin: 'tā', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-它.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-它.gif', gifDuration: 8600 },
        { hanziKey: 'familyCharAnimalIt', pinyin: 'tā', animationTraditional: 'lessons/第5課/第5課-識字部分gif/第5課-牠.gif', animationSimplified: 'lessons/第5課/第5課-識字部分gif/第5課-它.gif', gifDuration: 12000 }
    ]
};

function getWritingData() {
    return writingDataByChapter[AppState.currentChapter] || writingDataByChapter[11];
}

let writingState = {
    currentIndex: 0,
    isAnimating: false,
    gifTimeout: null
};

function initWriting() {
    writingState.currentIndex = 0;
    writingState.isAnimating = false;
    if (writingState.gifTimeout) {
        clearTimeout(writingState.gifTimeout);
        writingState.gifTimeout = null;
    }
    renderWriting();
}

function renderWriting() {
    const container = document.getElementById('writingContainer');
    if (!container) return;

    const data = getWritingData();
    const item = data[writingState.currentIndex];
    const hanzi = t(item.hanziKey);
    const riceGridSvg = `<svg class="writing-rice-grid" viewBox="0 0 200 200" preserveAspectRatio="none">
        <line x1="100" y1="0" x2="100" y2="200" />
        <line x1="0" y1="100" x2="200" y2="100" />
        <line x1="0" y1="0" x2="200" y2="200" />
        <line x1="200" y1="0" x2="0" y2="200" />
    </svg>`;

    const html = `
        <div class="writing-page">
            <!-- 上方詞彙圓圈 -->
            <div class="writing-word-nav">
                ${data.map((w, i) =>
                    `<button class="writing-word-btn ${i === writingState.currentIndex ? 'active' : ''}" onclick="goToWriting(${i})">${t(w.hanziKey)}</button>`
                ).join('')}
            </div>

            <!-- 左邊筆順展示區域 -->
            <div class="writing-stroke-area">
                <div class="writing-model-box" id="writingModelBox">
                    ${riceGridSvg}
                    <div class="writing-model-char">${hanzi}</div>
                    <img 
                        id="writingStrokeGif"
                        class="writing-stroke-gif"
                        style="display:none;"
                        alt="${hanzi} 筆順"
                    >
                    <video 
                        id="writingStrokeVideo"
                        class="writing-stroke-video"
                        style="display:none;"
                        preload="auto"
                        autoplay
                        playsinline
                        muted
                        onended="hideWritingAnimation()"
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

function getWritingAnimationUrl(item) {
    const isSimplified = AppState.language === 'zh-CN';
    return isSimplified ? item.animationSimplified : item.animationTraditional;
}

function isGifUrl(url) {
    return url && url.toLowerCase().endsWith('.gif');
}

function hideWritingAnimation() {
    const video = document.getElementById('writingStrokeVideo');
    const gif = document.getElementById('writingStrokeGif');
    if (video) {
        video.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    }
    if (gif) {
        gif.style.display = 'none';
    }
    writingState.isAnimating = false;
}

function playWritingAnimation() {
    const item = getWritingData()[writingState.currentIndex];
    const url = getWritingAnimationUrl(item);

    if (!url) {
        console.error('找不到對應筆順動畫路徑');
        return;
    }

    // 如果正在播放，先停止並重置
    hideWritingAnimation();

    if (isGifUrl(url)) {
        const gif = document.getElementById('writingStrokeGif');
        if (!gif) {
            console.error('找不到 img 元素 #writingStrokeGif');
            return;
        }

        // 重新載入 GIF 確保從頭播放
        gif.src = url + '?t=' + Date.now();
        gif.style.display = 'block';
        writingState.isAnimating = true;

        // 播放一次後自動隱藏
        const duration = item.gifDuration || 3000;
        if (writingState.gifTimeout) {
            clearTimeout(writingState.gifTimeout);
        }
        writingState.gifTimeout = setTimeout(() => {
            hideWritingAnimation();
        }, duration);
    } else {
        const video = document.getElementById('writingStrokeVideo');
        if (!video) {
            console.error('找不到 video 元素 #writingStrokeVideo');
            return;
        }

        video.src = url;
        video.load();
        video.style.display = 'block';
        writingState.isAnimating = true;

        video.onloadeddata = function() {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.error('視頻播放失敗:', err);
                    hideWritingAnimation();
                });
            }
        };

        video.onerror = function() {
            console.error('視頻載入失敗:', url);
            hideWritingAnimation();
        };
    }
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
    if (writingState.currentIndex < getWritingData().length - 1) {
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
    if (index >= 0 && index < getWritingData().length) {
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
