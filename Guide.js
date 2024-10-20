// Guide.js - UI, CSS, and animations

// Inject CSS Styles for UI elements
const style = document.createElement('style');
style.textContent = `
  #levelUpOverlay {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 180px;
    background-color: rgba(16, 19, 29, 0.9);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 0;
    border: 1px solid #FF8C00;
    color: #a6dcd5;
    font-family: 'hordes', sans-serif;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translateY(20px);
    user-select: none;
  }

  /* Additional styles for the guide frame */
  #guideFrame {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    background-color: rgba(16, 19, 29, 0.95);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 0;
    border: 1px solid #FF8C00;
    color: #a6dcd5;
    font-family: 'hordes', sans-serif;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translate(-50%, -60%);
  }
  /* Add more CSS as needed for animations */
`;

document.head.appendChild(style);

// Function to show level-up UI
function showLevelUpUI(level) {
  const overlay = document.createElement('div');
  overlay.id = 'levelUpOverlay';
  // Further code to set up the level-up UI (e.g., text, icons, etc.)
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 1;
    overlay.style.transform = 'translateY(0)';
  }, 100);
}

// Function to show the guide frame
function showGuideFrame(level) {
  const guideFrame = document.createElement('div');
  guideFrame.id = 'guideFrame';
  // Additional guide frame setup (e.g., description, images, etc.)
  document.body.appendChild(guideFrame);

  setTimeout(() => {
    guideFrame.style.opacity = 1;
    guideFrame.style.transform = 'translate(-50%, -50%)';
  }, 100);
}

// Expose functions to the global scope
window.showLevelUpUI = showLevelUpUI;
window.showGuideFrame = showGuideFrame;
