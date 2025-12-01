# Grid Guide - Chrome Extension

A Chrome extension that visualizes grid column systems (Bootstrap, Tailwind, Commsult) on any webpage with customizable settings and responsive breakpoint support.

## Features

- 🎯 **Visualize Grid Systems**: Overlay grid columns on any webpage
- 🎨 **Customizable**: Set container width, columns, gutter, color, and opacity
- 📦 **Presets with Breakpoints**: Quick access to Bootstrap, Tailwind, and Commsult grid systems with responsive breakpoint configurations (XS, SM, MD, LG, XL)
- 🎨 **Advanced Color Picker**: HSL color control with fine-tuning sliders and quick color swatches
- 💾 **Save Configurations**: Save and load multiple custom grid configurations
- 📱 **Responsive**: Works on all screen sizes with automatic grid alignment
- 🚀 **Easy to Use**: Beautiful, intuitive interface with tabbed navigation

## Installation

1. **Clone or download this repository**

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `grid-guide` folder

## Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Configure your grid** (Configuration tab):
   - Enter container width (in pixels)
   - Set number of columns (1-24)
   - Set gutter width (spacing between columns)
   - Pick a color using the color picker:
     - Use quick color swatches, or
     - Enter hex color code, or
     - Fine-tune with HSL sliders (Hue, Saturation, Lightness)
   - Adjust opacity slider (10% - 100%)
   - Click "Launch Grid" to apply the overlay
3. **Use Presets** (Presets tab):
   - Choose from Bootstrap, Tailwind, or Commsult presets
   - Select a breakpoint (XS, SM, MD, LG, XL) to apply that specific responsive configuration
   - Each preset includes multiple breakpoint configurations automatically
4. **Save Configurations** (Configuration tab):
   - Enter a name for your configuration
   - Click "Save" to store it
   - Access saved configs from the "Saved" tab
5. **Clear Grid**: Click "Clear" to remove the grid overlay from the page

## File Structure

```
grid-guide/
├── manifest.json          # Extension manifest (Manifest V3)
├── popup.html            # Extension popup UI
├── popup.css             # Popup styles
├── popup.js              # Popup logic, storage, and preset configurations
├── content.js            # Content script for grid overlay injection
├── content.css           # Grid overlay styles
├── background.js         # Service worker
├── font.css              # Plus Jakarta Sans font definitions
├── variables.css         # CSS custom properties (colors, spacing, typography)
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── create-icons.html     # Icon generator tool (browser-based)
├── generate-icons.js     # Icon generator script (Node.js-based)
├── package.json          # Node.js package configuration
└── README.md            # This file
```

## Default Presets

All presets include multiple responsive breakpoints. Click any breakpoint button to apply that specific configuration:

### Bootstrap
- **Color**: Blue (#0d6efd)
- **Breakpoints**:
  - XS: 360px container, 12 columns, 16px gutter
  - SM: 540px container, 12 columns, 24px gutter
  - MD: 720px container, 12 columns, 24px gutter
  - LG: 960px container, 12 columns, 30px gutter
  - XL: 1140px container, 12 columns, 30px gutter

### Tailwind
- **Color**: Blue (#3b82f6)
- **Breakpoints**:
  - XS: 360px container, 12 columns, 16px gutter
  - SM: 640px container, 12 columns, 20px gutter
  - MD: 768px container, 12 columns, 24px gutter
  - LG: 1024px container, 12 columns, 32px gutter
  - XL: 1280px container, 12 columns, 32px gutter

### Commsult
- **Color**: Indigo (#3b3fea)
- **Breakpoints**:
  - XS: 327px container, 8 columns, 16px gutter
  - SM: 536px container, 8 columns, 16px gutter
  - MD: 672px container, 12 columns, 16px gutter
  - LG: 896px container, 12 columns, 24px gutter
  - XL: 1200px container, 12 columns, 24px gutter

## Development

The extension uses:
- **Manifest V3** (Chrome Extension API)
- **Chrome Storage API** for saving and loading grid configurations
- **Content Scripts** for injecting grid overlay into web pages
- **Service Worker** (background.js) for extension lifecycle management
- **Vanilla JavaScript** (no external dependencies required for the extension)
- **CSS Custom Properties** for consistent styling (variables.css)
- **Plus Jakarta Sans** font for the popup UI

### Technical Details

- Grid overlay uses `pointer-events: none` to not interfere with page interactions
- Grid automatically updates on window resize and scroll events
- Color picker supports both hex input and HSL fine-tuning
- Presets are stored as JavaScript objects with nested breakpoint configurations
- All saved configurations persist across browser sessions using Chrome Storage

## License

MIT License - feel free to use and modify as needed!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
