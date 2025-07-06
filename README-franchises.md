# Call of Duty Franchises Section - Standalone

This is a complete, standalone implementation of the Call of Duty franchises section that you can easily copy and integrate into any project.

## 📁 Files Included

1. **franchises-standalone.html** - Complete HTML structure
2. **franchises-standalone.css** - All CSS styles (fully responsive)
3. **franchises-standalone.js** - JavaScript functionality with GSAP animations
4. **README-franchises.md** - This documentation file

## 🚀 Features

### ✨ **Premium Design Elements**
- **Hero Section** with animated particles and gradient backgrounds
- **Interactive Stats Dashboard** with animated counters
- **Filter Navigation** with smooth transitions
- **Premium Franchise Cards** with hover effects and detailed information
- **Featured Showcase** with advanced animations
- **Timeline Section** showing franchise evolution

### 🎯 **Interactive Features**
- **Filter System** - Filter franchises by status (All, Active, Legacy, Live Service)
- **Hover Effects** - Cards lift and show additional visual effects
- **Animated Counters** - Stats numbers count up on scroll
- **Responsive Design** - Works perfectly on all devices

### 🎨 **Advanced Animations**
- **GSAP ScrollTrigger** animations
- **Staggered card animations**
- **Particle effects**
- **Smooth transitions**
- **Hover micro-interactions**

## 📱 **Fully Responsive**
- **Desktop** - Full grid layout with all features
- **Tablet** - Optimized layout for medium screens
- **Mobile** - Single column layout with touch-friendly interactions

## 🛠 **How to Use**

### **Option 1: Use as Standalone Page**
1. Download all 3 files
2. Open `franchises-standalone.html` in your browser
3. Customize the content and styling as needed

### **Option 2: Integrate into Existing Project**
1. Copy the HTML content from `franchises-standalone.html` (inside the `<div id="franchisesPage">`)
2. Copy the CSS from `franchises-standalone.css` (everything after the reset styles)
3. Copy the JavaScript from `franchises-standalone.js`
4. Make sure to include GSAP and ScrollTrigger libraries

## 📦 **Dependencies**

The section requires these external libraries:
```html
<!-- GSAP for animations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
```

## 🎨 **Customization**

### **Change Images**
Replace the Pexels URLs in the `franchiseData` array with your own images:
```javascript
image: "your-image-url-here.jpg"
```

### **Modify Content**
Update the franchise data in the `franchiseData` array:
```javascript
{
  title: "Your Game Title",
  subtitle: "Your Subtitle",
  description: "Your description...",
  // ... other properties
}
```

### **Customize Colors**
The main brand color is `#fb5607` (orange). Search and replace this in the CSS file to change the theme color.

### **Add More Franchises**
Simply add more objects to the `franchiseData` array and they'll automatically appear in the grid and timeline.

## 🎯 **Browser Support**
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📝 **Notes**
- Images are currently using Pexels stock photos
- All animations are optimized for performance
- The code is well-commented for easy understanding
- Fully responsive design works on all screen sizes

## 🔧 **Troubleshooting**
- Make sure GSAP libraries are loaded before the main script
- Check browser console for any JavaScript errors
- Ensure all file paths are correct

---

**Ready to use!** 🚀 Just copy the files and start customizing!