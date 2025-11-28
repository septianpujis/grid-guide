// Grid overlay state
let gridOverlay = null;
let currentConfig = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showGrid') {
    showGrid(message.config);
    sendResponse({ success: true });
  } else if (message.action === 'hideGrid') {
    hideGrid();
    sendResponse({ success: true });
  }
  return true;
});

function showGrid(config) {
  // Remove existing grid if any
  hideGrid();
  
  currentConfig = config;
  
  // Create overlay container
  gridOverlay = document.createElement('div');
  gridOverlay.id = 'grid-guide-overlay';
  gridOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999999;
  `;
  
  // Create grid container
  const gridContainer = document.createElement('div');
  gridContainer.className = 'grid-guide-container';
  
  const maxWidth = config.containerWidth;
  const columns = config.columns;
  const gutter = config.gutter;
  const color = config.color;
  const opacity = config.opacity;
  
  // Calculate column width
  const totalGutterWidth = gutter * (columns - 1);
  const availableWidth = maxWidth - totalGutterWidth;
  const columnWidth = availableWidth / columns;
  
  // Set container styles
  gridContainer.style.cssText = `
    width: 100%;
    max-width: ${maxWidth}px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    gap: ${gutter}px;
    box-sizing: border-box;
  `;
  
  // Create columns
  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.className = 'grid-guide-column';
    column.style.cssText = `
      flex: 0 0 ${columnWidth}px;
      height: 100%;
      background: ${color};
      opacity: ${opacity};
      border-left: 1px solid ${color};
      border-right: 1px solid ${color};
      box-sizing: border-box;
    `;
    gridContainer.appendChild(column);
  }
  
  gridOverlay.appendChild(gridContainer);
  document.body.appendChild(gridOverlay);
  
  // Handle window resize
  window.addEventListener('resize', updateGrid);
  
  // Handle scroll to keep grid aligned
  window.addEventListener('scroll', updateGrid);
}

function updateGrid() {
  if (!gridOverlay || !currentConfig) return;
  
  // Recreate grid on resize to maintain proper alignment
  showGrid(currentConfig);
}

function hideGrid() {
  if (gridOverlay) {
    gridOverlay.remove();
    gridOverlay = null;
    currentConfig = null;
  }
  
  // Remove event listeners
  window.removeEventListener('resize', updateGrid);
  window.removeEventListener('scroll', updateGrid);
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  hideGrid();
});

