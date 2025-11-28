// Background service worker for Grid Guide extension

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Grid Guide extension installed');
    // Initialize storage with empty saved configs
    chrome.storage.local.set({ savedConfigs: [] });
  }
});

// Handle extension icon click (optional - can show popup instead)
chrome.action.onClicked.addListener((tab) => {
  // This is handled by the popup, but we can add additional logic here if needed
});

