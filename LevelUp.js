// ==UserScript==
// @name         Hordes.io Level Up UI (
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Just a addition for newbies!
// @author       2forU
// @match        *://hordes.io/play
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Variables
    let oldLevel = null;
    const levelSelector = '.progressBar.bgmana .left.svelte-i7i7g5';

    // Class detection by image source
    function getPlayerClass() {
        const classIcon = document.querySelector('.pclass.icon.border.black.bgc1.svelte-g292qg');
        if (!classIcon) return 'Unknown';

        const classSrc = classIcon.src;
        switch (true) {
            case classSrc.includes('1.avif'):
                return 'Mage';
            case classSrc.includes('2.avif'):
                return 'Archer';
            case classSrc.includes('3.avif'):
                return 'Shaman';
            case classSrc.includes('4.avif'):
                return 'Warrior';
            default:
                return 'Unknown';
        }
    }

    // Class bloodline based on player class
    function getBloodline(playerClass) {
        switch (playerClass) {
            case 'Mage': return 'Intelligence';
            case 'Archer': return 'Dexterity';
            case 'Shaman': return 'Wisdom';
            case 'Warrior': return 'Strength';
            default: return 'Unknown';
        }
    }

    // Check for level changes
    function checkLevel() {
        const levelElement = document.querySelector(levelSelector);
        if (levelElement) {
            const levelText = levelElement.innerText || levelElement.textContent;
            const currentLevel = parseInt(levelText.replace(/[^0-9]/g, ''), 10);

            if (!isNaN(currentLevel) && oldLevel !== null && currentLevel > oldLevel) {
                onLevelUp(currentLevel);
                oldLevel = currentLevel;
            } else if (oldLevel === null) {
                oldLevel = currentLevel;
            }
        }
    }

    // Handle level-up
    function onLevelUp(newLevel) {
        if (newLevel > 45) {
            return; // Do nothing if level is greater than 45
        }
        showLevelUpUI(newLevel);
    }

    // Show the modern level-up UI
    function showLevelUpUI(level) {
        const playerClass = getPlayerClass();
        const bloodline = getBloodline(playerClass);

        // Create the level-up overlay
        const overlay = document.createElement('div');
        overlay.id = 'levelUpOverlay';
        overlay.style = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(16, 19, 29, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #a6dcd5;
            font-family: 'hordes';
            font-size: 18px;
            opacity: 0;
            transition: opacity 0.4s ease;
            user-select: none;
        `;

        // Close UI on click outside the content
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay(overlay);
            }
        });

        // Level-up notification
        const levelUpText = document.createElement('h1');
        levelUpText.innerText = 'Level Up!';
        levelUpText.style = `
            font-size: 54px; /* Bigger font size for Level Up */
            color: var(--primary);
            text-shadow: 0px 0px 10px var(--primary);
            user-select: none;
        `;

        // Player information with class icon and level
        const playerInfo = document.createElement('div');
        playerInfo.innerHTML = `
            <img src="/data/ui/classes/1.avif?v=8816776" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 0px;">
            <span>${playerClass} Lv. ${level}</span>
        `;
        playerInfo.style = `
            display: flex;
            align-items: center;
            font-size: 24px; /* Smaller size for class/level */
            color: var(--secondary);
            user-select: none;
        `;

        // Stat gains
        const statInfo = document.createElement('div');
        statInfo.innerHTML = `
            +8 Health<br>
            +3 Stat points<br>
            +2 Stamina<br>
            +1 ${bloodline}<br>
            ${shouldShowSkillPoint(level) ? '+1 Skill point' : ''}
        `;
        statInfo.style = `
            font-size: 20px;
            margin-top: 10px;
            color: var(--health);
            user-select: none;
            text-align: center;
        `;

        // "Press screen to continue" text
        const pressContinueText = document.createElement('div');
        pressContinueText.innerText = 'Press screen to continue';
        pressContinueText.style = `
            font-size: 14px;
            margin-top: 5px;
            color: var(--secondary);
            user-select: none;
        `;

        // Append elements to overlay
        overlay.appendChild(levelUpText);
        overlay.appendChild(playerInfo);
        overlay.appendChild(statInfo);
        overlay.appendChild(pressContinueText);

        // Append overlay to body
        document.body.appendChild(overlay);

        // Animate fade-in
        setTimeout(() => {
            overlay.style.opacity = 1;
        }, 100);

        // Function to close overlay
        function closeOverlay(overlay) {
            overlay.style.opacity = 0;
            setTimeout(() => {
                overlay.remove();
            }, 400);
        }
    }

    // Determine if +1 skill point should be shown
    function shouldShowSkillPoint(level) {
        return (level % 2 === 1) && level <= 45; // Display skill point on odd levels only, up to level 45
    }

    // Check level changes every second
    setInterval(checkLevel, 1000);
})();
