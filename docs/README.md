# 华翠金楼 - Chinese Learning App for International Children

An interactive web application prototype designed for teachers to teach Chinese to international children.

## Features

### 🦁 Welcome Page
- Animated lion mascot greeting users with "nǐ hǎo"
- Diverse children characters representing international students
- Beautiful Hong Kong-inspired cityscape background
- Animated clouds and signboards

### 👧 Character Selection
- 9 unique character avatars to choose from
- Students can enter their name
- Visual selection with hover effects

### 📚 Level Selection
- Three levels: 幼儿园 (Kindergarten), 小学 (Primary), 中学 (Secondary)
- Cute lion mascot representation for each level

### 🎯 Category Selection
- 课件 (Courseware) - Interactive learning materials
- 唐诗 (Tang Poems) - 12 classic Chinese poems
- 儿歌 (Children's Songs) - 12 popular children's songs

### 🎵 Video Content
- Grid selection for poems and songs
- Video player interface with placeholder for embedded videos
- Back navigation to return to selection pages

### 📖 Courseware - 22 Chapters
Organized into two volumes:
- **上册 (Volume 1)**: Chapters 1-11
- **下册 (Volume 2)**: Chapters 12-22

Each chapter includes:
1. **课前提问** (Pre-class Questions) - Interactive Q&A
2. **识图** (Picture Recognition) - Body parts learning with clickable diagram
3. **识字** (Character Learning) - Writing practice with drawing canvas
4. **故事绘本** (Story Book) - Animated story pages
5. **活动** (Activities) - Educational games

### ✏️ Interactive Features

#### Drawing Canvas
- Practice writing Chinese characters
- Stroke order animation
- Clear and check functions
- Touch support for tablets

#### Games
- **Matching Game**: Match body parts with images
- **Memory Game**: Card flipping memory challenge
- **Puzzle Game**: Drag and drop puzzle pieces

### 🔊 Audio Features
- Sound effects for interactions
- Character pronunciation using Web Speech API
- Correct answer celebration sounds

## Design Elements

### Color Palette
- **Primary Yellow**: #FFC107 (Lion mascot, buttons)
- **Primary Green**: #4CAF50 (Success, navigation)
- **Primary Blue**: #2196F3 (Backgrounds, interactive elements)
- **Primary Pink**: #E91E63 (Courseware, activities)
- **Light Blue**: #87CEEB (Sky background)

### Typography
- Chinese: Noto Sans SC
- Display: Zcool KuaiLe (for fun elements)

### Animations
- Lion waving animation
- Floating clouds
- Bouncing characters
- Page transitions
- Celebration effects

## Technical Details

### Technologies Used
- HTML5 Canvas for drawing
- CSS3 Animations and Transitions
- Vanilla JavaScript (no frameworks required)
- Web Speech API for pronunciation
- Web Audio API for sound effects

### Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Design
- Desktop: Full experience
- Tablet: Optimized touch interactions
- Mobile: Simplified layout with all features

## How to Use

1. Open `index.html` in a modern web browser
2. Click "开始学习" (Start Learning) to begin
3. Select a character and enter name
4. Choose a level (Kindergarten recommended for beginners)
5. Select content type:
   - Watch poems or songs videos
   - Or explore courseware chapters
6. In courseware, navigate through 5 sections using bottom navigation
7. Try interactive elements:
   - Click body parts to learn names
   - Draw characters on the canvas
   - Play educational games

## Keyboard Navigation

When in learning mode:
- **Arrow Right/Down**: Next section
- **Arrow Left/Up**: Previous section

## File Structure

```
webapp/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── app.js          # Interactive functionality
└── README.md       # This file
```

## Future Enhancements

- Add actual video content
- Implement user progress tracking
- Add more chapters and content
- Create teacher dashboard
- Add multiplayer games
- Implement speech recognition for pronunciation practice
- Add AR features for character recognition

## Credits

Designed and developed for 华翠金楼 (Wah Chui Kam Lau) Chinese Education Platform.

Mascot: Cute lion representing strength and friendliness in learning.

---

*Made with ❤️ for children learning Chinese*
