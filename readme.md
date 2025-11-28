# Grid Guide - Chrome Extension

A Chrome extension that visualizes grid column systems (Bootstrap, Tailwind, Bulma, Foundation) on any webpage with customizable settings.

## Features

- 🎯 **Visualize Grid Systems**: Overlay grid columns on any webpage
- 🎨 **Customizable**: Set container width, columns, gutter, color, and opacity
- 📦 **Presets**: Quick access to Bootstrap, Tailwind, Bulma, and Foundation grid systems
- 💾 **Save Configurations**: Save and load multiple grid configurations
- 📱 **Responsive**: Works on all screen sizes
- 🚀 **Easy to Use**: Beautiful, intuitive interface

## Installation

1. **Clone or download this repository**

2. **Generate Icons** (if not already present):
   - Open `create-icons.html` in your browser
   - Click "Generate All Icons"
   - Download each icon size and save them in the `icons/` folder as:
     - `icon16.png`
     - `icon48.png`
     - `icon128.png`

3. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `grid-guide` folder

## Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Configure your grid**:
   - Enter container width (in pixels)
   - Set number of columns (1-24)
   - Set gutter width (spacing between columns)
   - Pick a color for the grid lines
   - Adjust opacity
3. **Click "Launch Grid"** to apply the grid overlay to the current page
4. **Use Presets**: Switch to the "Presets" tab to quickly apply Bootstrap, Tailwind, Bulma, or Foundation grid systems
5. **Save Configurations**: Enter a name and click "Save" to store your custom grid settings
6. **Clear Grid**: Click "Clear" to remove the grid overlay

## File Structure

```
grid-guide/
├── manifest.json          # Extension manifest
├── popup.html            # Extension popup UI
├── popup.css             # Popup styles
├── popup.js              # Popup logic and storage
├── content.js            # Content script for grid overlay
├── content.css           # Grid overlay styles
├── background.js         # Service worker
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── create-icons.html     # Icon generator tool
└── README.md            # This file
```

## Default Presets

- **Bootstrap**: 12 columns, 30px gutter, 1200px container, Blue (#0d6efd)
- **Tailwind**: 12 columns, 24px gutter, 1280px container, Blue (#3b82f6)
- **Bulma**: 12 columns, 24px gutter, 1408px container, Teal (#00d1b2)
- **Foundation**: 12 columns, 30px gutter, 1200px container, Blue (#1779ba)

## Development

The extension uses:
- **Manifest V3** (Chrome Extension API)
- **Chrome Storage API** for saving configurations
- **Content Scripts** for injecting grid overlay
- **Vanilla JavaScript** (no dependencies)

## License

MIT License - feel free to use and modify as needed!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
