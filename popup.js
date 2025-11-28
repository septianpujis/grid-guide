// Preset configurations
const presets = {
  bootstrap: {
    color: '#0d6efd',
    opacity: 0.3,
    breakpoints: {
      xs: { label: 'XS', containerWidth: 360, columns: 12, gutter: 16 },
      sm: { label: 'SM', containerWidth: 540, columns: 12, gutter: 24 },
      md: { label: 'MD', containerWidth: 720, columns: 12, gutter: 24 },
      lg: { label: 'LG', containerWidth: 960, columns: 12, gutter: 30 },
      xl: { label: 'XL', containerWidth: 1140, columns: 12, gutter: 30 }
    }
  },
  tailwind: {
    color: '#3b82f6',
    opacity: 0.3,
    breakpoints: {
      xs: { label: 'XS', containerWidth: 360, columns: 12, gutter: 16 },
      sm: { label: 'SM', containerWidth: 640, columns: 12, gutter: 20 },
      md: { label: 'MD', containerWidth: 768, columns: 12, gutter: 24 },
      lg: { label: 'LG', containerWidth: 1024, columns: 12, gutter: 32 },
      xl: { label: 'XL', containerWidth: 1280, columns: 12, gutter: 32 }
    }
  }
};

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const containerWidthInput = document.getElementById('container-width');
const columnsInput = document.getElementById('columns');
const gutterInput = document.getElementById('gutter');
const colorText = document.getElementById('color-text');
const colorHue = document.getElementById('color-hue');
const colorSaturation = document.getElementById('color-saturation');
const colorLightness = document.getElementById('color-lightness');
const hueValueLabel = document.getElementById('hue-value');
const saturationValueLabel = document.getElementById('saturation-value');
const lightnessValueLabel = document.getElementById('lightness-value');
const colorPreview = document.getElementById('color-preview');
const colorSwatches = document.querySelectorAll('.color-swatch');
const opacityInput = document.getElementById('opacity');
const opacityValue = document.getElementById('opacity-value');
const launchBtn = document.getElementById('launch-btn');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const configNameInput = document.getElementById('config-name');
const savedConfigsContainer = document.getElementById('saved-configs');
const breakpointButtons = document.querySelectorAll('.breakpoint-btn');
let selectedColor = '#3b82f6';

// Tab switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Update active states
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(t => t.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Load saved configs when switching to saved tab
    if (tabName === 'saved') {
      loadSavedConfigs();
    }
  });
});

// Color picker logic
function normalizeHex(value) {
  if (!value) return null;
  let hex = value.trim();
  if (!hex.startsWith('#')) {
    hex = `#${hex}`;
  }
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    return hex.toUpperCase();
  }
  return null;
}

function hexToHSL(hex) {
  let r = 0, g = 0, b = 0;
  if (hex) {
    r = parseInt(hex.substr(1, 2), 16) / 255;
    g = parseInt(hex.substr(3, 2), 16) / 255;
    b = parseInt(hex.substr(5, 2), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToHex(h, s, l) {
  const hue = h / 360;
  const sat = s / 100;
  const lig = l / 100;

  if (sat === 0) {
    const val = Math.round(lig * 255).toString(16).padStart(2, '0');
    return `#${val}${val}${val}`.toUpperCase();
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = lig < 0.5 ? lig * (1 + sat) : lig + sat - lig * sat;
  const p = 2 * lig - q;

  const r = hue2rgb(p, q, hue + 1 / 3);
  const g = hue2rgb(p, q, hue);
  const b = hue2rgb(p, q, hue - 1 / 3);

  return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`.toUpperCase();
}

function updateSliderLabels() {
  hueValueLabel.textContent = `${colorHue.value}°`;
  saturationValueLabel.textContent = `${colorSaturation.value}%`;
  lightnessValueLabel.textContent = `${colorLightness.value}%`;
}

function setColor(hex, updateSliders = true) {
  const validHex = normalizeHex(hex) || selectedColor;
  selectedColor = validHex;
  colorPreview.style.background = selectedColor;
  colorText.value = selectedColor;

  if (updateSliders) {
    const { h, s, l } = hexToHSL(selectedColor);
    colorHue.value = h;
    colorSaturation.value = s;
    colorLightness.value = l;
    updateSliderLabels();
  }
}

function handleSliderChange() {
  const hex = hslToHex(
    parseInt(colorHue.value, 10),
    parseInt(colorSaturation.value, 10),
    parseInt(colorLightness.value, 10)
  );
  setColor(hex, false);
  updateSliderLabels();
}

[colorHue, colorSaturation, colorLightness].forEach(input => {
  input.addEventListener('input', handleSliderChange);
});

colorText.addEventListener('input', (e) => {
  const normalized = normalizeHex(e.target.value);
  if (normalized) {
    setColor(normalized);
  }
});

colorSwatches.forEach(btn => {
  btn.addEventListener('click', () => setColor(btn.dataset.color));
});

// Opacity slider
opacityInput.addEventListener('input', (e) => {
  const value = Math.round(e.target.value * 100);
  opacityValue.textContent = `${value}%`;
});

// Preset selection
breakpointButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const presetKey = button.closest('.preset-card')?.dataset?.preset;
    const breakpointKey = button.dataset.breakpoint;
    applyPreset(presetKey, breakpointKey);
  });
});

function applyPreset(presetKey, breakpointKey) {
  const framework = presets[presetKey];
  if (!framework) return;
  const breakpointConfig = framework.breakpoints[breakpointKey];
  if (!breakpointConfig) return;

  containerWidthInput.value = breakpointConfig.containerWidth;
  columnsInput.value = breakpointConfig.columns;
  gutterInput.value = breakpointConfig.gutter;
  setColor(breakpointConfig.color || framework.color);

  const opacityValueToUse = typeof breakpointConfig.opacity === 'number'
    ? breakpointConfig.opacity
    : framework.opacity;
  opacityInput.value = opacityValueToUse;
  opacityValue.textContent = `${Math.round(opacityValueToUse * 100)}%`;

  document.querySelector('[data-tab="config"]').click();
}

// Launch grid
launchBtn.addEventListener('click', async () => {
  const config = getCurrentConfig();
  
  // Get active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Send message to content script
  chrome.tabs.sendMessage(tab.id, {
    action: 'showGrid',
    config: config
  });
  
  // Close popup
  window.close();
});

// Clear grid
clearBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, {
    action: 'hideGrid'
  });
  
  window.close();
});

// Save configuration
saveBtn.addEventListener('click', () => {
  const name = configNameInput.value.trim();
  if (!name) {
    alert('Please enter a configuration name');
    return;
  }
  
  const config = getCurrentConfig();
  config.name = name;
  
  // Load existing saved configs
  chrome.storage.local.get(['savedConfigs'], (result) => {
    const savedConfigs = result.savedConfigs || [];
    savedConfigs.push(config);
    
    chrome.storage.local.set({ savedConfigs }, () => {
      configNameInput.value = '';
      alert('Configuration saved!');
      // Switch to saved tab to show the new config
      document.querySelector('[data-tab="saved"]').click();
    });
  });
});

// Load saved configurations
function loadSavedConfigs() {
  chrome.storage.local.get(['savedConfigs'], (result) => {
    const savedConfigs = result.savedConfigs || [];
    
    if (savedConfigs.length === 0) {
      savedConfigsContainer.innerHTML = '<p class="empty-state">No saved configurations yet</p>';
      return;
    }
    
    savedConfigsContainer.innerHTML = savedConfigs.map((config, index) => `
      <div class="config-item">
        <div class="config-info">
          <div class="config-name">${escapeHtml(config.name)}</div>
          <div class="config-details">
            ${config.containerWidth}px • ${config.columns} cols • ${config.gutter}px gutter
          </div>
        </div>
        <div class="config-actions">
          <button class="config-btn load" data-index="${index}">Load</button>
          <button class="config-btn delete" data-index="${index}">Delete</button>
        </div>
      </div>
    `).join('');
    
    // Add event listeners
    savedConfigsContainer.querySelectorAll('.config-btn.load').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        loadConfig(savedConfigs[index]);
      });
    });
    
    savedConfigsContainer.querySelectorAll('.config-btn.delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        deleteConfig(index);
      });
    });
  });
}

function loadConfig(config) {
  containerWidthInput.value = config.containerWidth;
  columnsInput.value = config.columns;
  gutterInput.value = config.gutter;
  setColor(config.color);
  opacityInput.value = config.opacity;
  opacityValue.textContent = `${Math.round(config.opacity * 100)}%`;
  
  // Switch to config tab
  document.querySelector('[data-tab="config"]').click();
}

function deleteConfig(index) {
  chrome.storage.local.get(['savedConfigs'], (result) => {
    const savedConfigs = result.savedConfigs || [];
    savedConfigs.splice(index, 1);
    
    chrome.storage.local.set({ savedConfigs }, () => {
      loadSavedConfigs();
    });
  });
}

function getCurrentConfig() {
  return {
    containerWidth: parseInt(containerWidthInput.value) || 1200,
    columns: parseInt(columnsInput.value) || 12,
    gutter: parseInt(gutterInput.value) || 30,
    color: selectedColor || '#3b82f6',
    opacity: parseFloat(opacityInput.value) || 0.3
  };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize
setColor(selectedColor);
loadSavedConfigs();

