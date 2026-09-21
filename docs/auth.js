// ============================================
// 登入與權限集中設定檔
// 新增帳號或調整權限只需修改 AUTH_CONFIG，無需改動其他程式碼。
// ============================================

const AUTH_CONFIG = {
    storageKey: 'dadi_auth_user',
    accounts: {
        dadi_teacher: { password: '8888', role: 'admin' },
        gsis_teacher: { password: '0000', role: 'gsis' }
    },
    roles: {
        // 管理員：開放所有權限，包括尚未完成（製作中）的教材
        admin: { all: true },
        // GSIS 老師：只開放幼稚園教材
        gsis: {
            // 唐詩：poemData 陣列 index（0靜夜思 4江南 5遊子吟 10春曉 11詠鵝）
            poems: [0, 4, 5, 10, 11],
            // 常用歌：'all' 全部開放，或改用 commonSongData 的 id 陣列
            commonSongs: 'all',
            // 單元歌：以 unitSongData 的 unit.tw 名稱對應
            unitSongs: ['數字', '家庭（一）', '動物（一）', '身體', '顏色', '節日'],
            // 教材：課程編號（1數字 5家庭（一） 7動物（一） 11身體 14顏色 18節日）
            chapters: [1, 5, 7, 11, 14, 18]
        }
    },
    // 課程 → 單元對照（僅供參考對應關係；實際權限以 roles.*.chapters 為準）
    chapterUnits: {
        1: '數字', 5: '家庭（一）', 7: '動物（一）', 11: '身體', 14: '顏色', 18: '節日'
    },
    // 已完成課程（其餘課程對管理員顯示「製作中」標籤）
    completedChapters: [1, 2, 5, 7, 8, 11, 12, 14, 15, 18, 19, 20]
};

// ============================================
// Auth API
// ============================================

const Auth = {
    login(username, password) {
        const account = AUTH_CONFIG.accounts[username];
        if (!account || account.password !== password) return null;
        const user = { username, role: account.role, loginAt: Date.now() };
        try {
            localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(user));
        } catch (e) { /* 私密模式等情況下寫入失敗，仍允許本次登入 */ }
        return user;
    },

    logout() {
        try {
            localStorage.removeItem(AUTH_CONFIG.storageKey);
        } catch (e) { /* ignore */ }
    },

    current() {
        let user = null;
        try {
            const raw = localStorage.getItem(AUTH_CONFIG.storageKey);
            if (raw) user = JSON.parse(raw);
        } catch (e) { user = null; }
        if (!user || !AUTH_CONFIG.accounts[user.username] || !user.role) {
            this.logout();
            return null;
        }
        return user;
    },

    isLoggedIn() {
        return this.current() !== null;
    },

    isAdmin() {
        const user = this.current();
        return !!user && (user.role === 'admin' || (AUTH_CONFIG.roles[user.role] && AUTH_CONFIG.roles[user.role].all === true));
    },

    _perms() {
        const user = this.current();
        if (!user) return null;
        const role = AUTH_CONFIG.roles[user.role];
        return role && role.all ? 'all' : role;
    },

    canAccessPoem(index) {
        const p = this._perms();
        if (p === 'all') return true;
        if (!p) return false;
        return Array.isArray(p.poems) && p.poems.includes(index);
    },

    canAccessCommonSong(id) {
        const p = this._perms();
        if (p === 'all') return true;
        if (!p) return false;
        if (p.commonSongs === 'all') return true;
        return Array.isArray(p.commonSongs) && p.commonSongs.includes(id);
    },

    canAccessUnitSong(unitTw) {
        const p = this._perms();
        if (p === 'all') return true;
        if (!p) return false;
        return Array.isArray(p.unitSongs) && p.unitSongs.includes(unitTw);
    },

    canAccessChapter(num) {
        const p = this._perms();
        if (p === 'all') return true;
        if (!p) return false;
        return Array.isArray(p.chapters) && p.chapters.includes(num);
    },

    isChapterInProgress(num) {
        return !AUTH_CONFIG.completedChapters.includes(num);
    },

    deny() {
        // 未登入：提示先登入，並把使用者帶到第二頁的登入區塊
        if (!this.isLoggedIn()) {
            if (typeof t === 'function') alert(t('loginRequired'));
            if (typeof redirectToLogin === 'function') redirectToLogin();
            return;
        }
        if (typeof t === 'function') {
            alert(t('noPermission'));
        } else {
            alert('您沒有權限使用此教材');
        }
    }
};
