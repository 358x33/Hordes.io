(function() {
    'use strict';

    // Variables
    let oldLevel = null;
    const levelSelector = '.progressBar.bgmana .left.svelte-i7i7g5';

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
        showLevelUpUI(newLevel);
    }

    // Show the minimalistic level-up UI
    function showLevelUpUI(level) {
        const overlay = document.createElement('div');
        overlay.id = 'levelUpOverlay';
        overlay.style = `
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
            border-radius: 0; /* Removed UI corner */
            border: 1px solid #FF8C00;
            color: #a6dcd5;
            font-family: 'hordes', sans-serif;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.4s ease, transform 0.4s ease;
            transform: translateY(20px);
            user-select: none;
        `;

        setTimeout(() => {
            overlay.style.opacity = 1;
            overlay.style.transform = 'translateY(0)';
        }, 100);

        const title = document.createElement('h1');
        title.innerText = 'Level Up!';
        title.style = `
            font-size: 16px;
            color: var(--primary);
            text-shadow: 0px 0px 5px var(--primary);
            margin: 0;
        `;

        const description = document.createElement('p');
        description.innerText = `You reached level ${level}!`;
        description.style = `
            font-size: 10px;
            margin: 5px 0;
            color: #A6DCD5;
            text-align: center;
        `;

        const bookIcon = document.createElement('img');
        bookIcon.src = '/data/ui/icons/book.svg?v=8816776';
        bookIcon.style = `
            width: 30px;
            height: 30px;
            margin: 5px 0;
        `;

        const button = document.createElement('button');
        button.innerText = 'See what\'s new!';
        button.style = `
            padding: 5px 10px;
            font-size: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 5px;
            user-select: none;
        `;
        button.addEventListener('click', () => {
            showGuideFrame(level);
            closeOverlay(overlay);
        });

        overlay.appendChild(bookIcon);
        overlay.appendChild(title);
        overlay.appendChild(description);
        overlay.appendChild(button);

        document.body.appendChild(overlay);

        function closeOverlay(overlay) {
            overlay.style.opacity = 0;
            overlay.style.transform = 'translateY(20px)';
            setTimeout(() => {
                overlay.remove();
            }, 400);
        }
    }

    function showGuideFrame(level) {
        const guideFrame = document.createElement('div');
        guideFrame.id = 'guideFrame';
        guideFrame.style = `
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
            border-radius: 0; /* Removed UI corner */
            border: 1px solid #FF8C00;
            color: #a6dcd5;
            font-family: 'hordes', sans-serif;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.4s ease, transform 0.4s ease;
            transform: translate(-50%, -60%);
        `;

        setTimeout(() => {
            guideFrame.style.opacity = 1;
            guideFrame.style.transform = 'translate(-50%, -50%)';
        }, 100);

        const header = document.createElement('div');
        header.style = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        `;

        const bookIcon = document.createElement('img');
        bookIcon.src = '/data/ui/icons/book.svg?v=8816776';
        bookIcon.style = `
            width: 24px;
            height: 24px;
            margin-right: 10px;
        `;

        const title = document.createElement('h1');
        title.innerText = 'Guide';
        title.style = `
            font-size: 18px;
            color: var(--primary);
            text-shadow: 0px 0px 5px var(--primary);
            margin: 0;
            flex-grow: 1;
        `;

        const closeButton = document.createElement('button');
        closeButton.innerText = 'X';
        closeButton.style = `
            font-size: 18px;
            background-color: transparent;
            color: white;
            border: none;
            cursor: pointer;
            user-select: none;
        `;
        closeButton.addEventListener('click', () => closeGuideFrame(guideFrame));

        header.appendChild(bookIcon);
        header.appendChild(title);
        header.appendChild(closeButton);

        const mainDescription = document.createElement('p');
        mainDescription.innerText = "We will guide you towards the game! We gonna teach you all the knowledge, and slowly progress towards the endgame. And say what features you have unlocked!";
        mainDescription.style = `
            font-size: 12px;
            margin-top: 15px;
            color: #A6DCD5;
        `;

        const specificDescription = document.createElement('div');

        // Show only the features unlocked at the current level
        if (level === 2) {
            const level2Text = document.createElement('p');
            level2Text.innerHTML = `Mages deal very heavy large scale Area of Effect damage, while also providing utility through slowing targets with their <span style="color: #FFA500;">ice-based magic</span>.`;
            level2Text.style = `
                font-size: 12px;
                margin-top: 10px;
            `;

            const bloodlineIcon = document.createElement('img');
            bloodlineIcon.src = '/data/ui/skills/8.avif?v=8816776';
            bloodlineIcon.style = `
                width: 30px;
                height: 30px;
                margin-top: 10px;
            `;

            const bloodlineText = document.createElement('p');
            bloodlineText.innerHTML = `As a <span style="color: #FFA500;">Mage</span>, you're supposed to run intelligence, since it's your bloodline. Mage -- <span style="color: #FFA500;">orange color</span>, Bloodline skill buffs permanently:<br><br>
            For 1 Intelligence gain <span style="color: #FFA500;">0.4 Minimum Damage</span>.<br>
            For 1 Intelligence gain <span style="color: #FFA500;">0.4 Maximum Damage</span>.`;
            bloodlineText.style = `
                font-size: 12px;
                margin-top: 10px;
            `;

            specificDescription.appendChild(level2Text);
            specificDescription.appendChild(bloodlineIcon);
            specificDescription.appendChild(bloodlineText);
        } else if (level === 3) {
            const level3Text = document.createElement('p');
            level3Text.innerHTML = `+1 Skill point. New Skill unlocked! <span style="color: #FFA500;">Chilling Radiance</span>`;
            level3Text.style = `
                font-size: 12px;
                margin-top: 10px;
                color: #FFA500;
            `;

            const chillingRadianceIcon = document.createElement('img');
            chillingRadianceIcon.src = '/data/ui/skills/14.avif?v=8816776';
            chillingRadianceIcon.style = `
                width: 30px;
                height: 30px;
                margin-top: 10px;
            `;

            const chillingRadianceText = document.createElement('p');
            chillingRadianceText.innerHTML = `
            <strong>Chilling Radiance</strong> is a debuff skill that the <span style="color: #FFA500;">Mage</span> can cast. <br><br>
            "Emit a chilling shockwave of ice around you, damaging and freezing enemies. Increases the critical hit chance of some of your spells."
            <br><br>
            Tier 1 Information:<br>
            - Costs <span style="color: #FFA500;">4MP</span> to cast<br>
            - Duration: <span style="color: #FFA500;">6 seconds</span><br>
            - Range: <span style="color: #FFA500;">8 meters</span><br>
            - Increases crit of Ice Bolt by <span style="color: #FFA500;">1%</span><br>
            - Increases crit of Icicle Orb by <span style="color: #FFA500;">1.5%</span><br>
            - Damage multiplier per tick: <span style="color: #FFA500;">0.18x</span> (total <span style="color: #FFA500;">0.72x</span> over 4 ticks)<br><br>
            Damage done depends on your stats and gear (Min-Max damage stats), then multiplied by the damage multiplier and reduced by the target's defense.`;
            chillingRadianceText.style = `
                font-size: 12px;
                margin-top: 10px;
            `;

            specificDescription.appendChild(level3Text);
            specificDescription.appendChild(chillingRadianceIcon);
            specificDescription.appendChild(chillingRadianceText);
        } else if (level === 4) {
            const level4Text = document.createElement('p');
            level4Text.innerHTML = `A new skill unlocked! <span style="color: #FFA500;">Shatterfrost!</span>`;
            level4Text.style = `
                font-size: 12px;
                margin-top: 10px;
                color: #FFA500;
            `;

            const ShatterfrostIcon = document.createElement('img');
            ShatterfrostIcon.src = '/data/ui/skills/51.avif?v=8816776';
            ShatterfrostIcon.style = `
                width: 30px;
                height: 30px;
                margin-top: 10px;
            `;

            const ShatterfrostText = document.createElement('p');
            ShatterfrostText.innerHTML = `
            <strong>Shatterfrost</strong> is a offensive <span style="color: #FFA500;">Skill</span> that <span style="color: #FFA500;">Mage</span> can cast. <br><br>
            "Hurls a heavy fragment of frost at your target for massive amounts of damage. Deals extra damage to targets deep frozen by Ice Bolt."
            <br><br>
            Tier 1 Information:<br>
            - Costs <span style="color: #FFA500;">3MP</span> to cast<br>
            - Cooldown: <span style="color: #FFA500;">10 seconds</span><br>
            - Range: <span style="color: #FFA500;">30 meters</span><br>
           
            Damage done depends on your stats and gear (Min-Max damage stats), then multiplied by the damage multiplier on each damage/heal skill and lastly calculated by target's defense.`;
            ShatterfrostText.style = `
                font-size: 12px;
                margin-top: 10px;
            `;

            specificDescription.appendChild(level4Text);
            specificDescription.appendChild(ShatterfrostIcon);
            specificDescription.appendChild(ShatterfrostText);
        }

        guideFrame.appendChild(header);
        guideFrame.appendChild(mainDescription);
        guideFrame.appendChild(specificDescription);

        document.body.appendChild(guideFrame);
    }

    function closeGuideFrame(guideFrame) {
        guideFrame.style.opacity = 0;
        guideFrame.style.transform = 'translate(-50%, -60%)';
        setTimeout(() => {
            guideFrame.remove();
        }, 400);
    }

    // Check for level changes every 3 seconds
    setInterval(checkLevel, 3000);
})();
