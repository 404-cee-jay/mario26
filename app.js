const gravity = 0.5;
    const jumpForce = -10;
    const moveSpeed = 2.5;
    const enemySpeed = 1.0;

    //game state

    let gameState= {

        score: 0,
        level: 1,
        lives: 3,
        gameRunning: true,
        keys:{}
    }


    // Player object 

    let player ={

        element: document.getElementById('mario'),
        x: 50,
        y: 300,
        width: 20,
        height: 20,
        velocityX: 0,
        velocityY: 0,
        grounded : false,
        big: false,
        bigTimer: 0
    }

    // game objects array

    let gameObjects = {
        platforms: [],
        enemies: [],
        coins: [],
        supriseBlocks: [],
        pipes: [],
    }


    // levels

    const levels = [
        { 
            platforms: [
                {x: 0, y: 350, width: 400, height: 50, type:'ground'},
                {x: 500, y: 360, width: 300, height: 40, type:'ground'},
                {x: 200, y: 280, width: 60, height: 20, type:'floating'},
                {x: 300, y: 240, width: 100, height: 20, type:'floating'},
                {x: 600, y: 240, width: 100, height: 20, type:'floating'},

            ],
            enemies: [
                {x: 550, y: 330, width: 20, height: 20, type:'brown'},
                {x: 650, y: 330, width: 20, height: 20, type:'brown'},
            ],

            coins: [
                 {x: 220, y:260 },
                  {x: 220, y:260 },
            ],
            supriseBlocks: [
                {x: 250, y: 260, width: 20, height: 20, type:'coin'},
                {x: 350, y: 220, width: 20, height: 20, type:'coin'},
            ],
            pipes: [
                {x: 700, y: 310},
            ]
        },

    //level 2 

    { 
            platforms: [
                {x: 0, y: 350, width: 400, height: 50, type:'blue'},
                {x: 500, y: 360, width: 300, height: 40, type:'blue'},
                {x: 200, y: 280, width: 60, height: 20, type:'blue'},
                {x: 300, y: 240, width: 100, height: 20, type:'blue'},
                {x: 600, y: 240, width: 100, height: 20, type:'blue'},

            ],
            enemies: [
                {x: 550, y: 330, width: 20, height: 20, type:'purple'},
                {x: 650, y: 330, width: 20, height: 20, type:'purple'},
            ],

            coins: [
                 {x: 220, y:260 },
                  {x: 220, y:260 },
            ],
            supriseBlocks: [
                {x: 250, y: 260, width: 20, height: 20, type:'coin'},
                {x: 350, y: 220, width: 20, height: 20, type:'mushroom'},
            ],
            pipes: [
                {x: 700, y: 310},
            ]
        },



    ]


    function initGame() {
        loadLevel(gameState.level);
        gameLoop();
    }

    function loadLevel(levelIndex){
        if (levelIndex >= levels.length) {
            return;
        }
    }
        //clearLevel()

        const level = levels[levelIndex];
        const gameArea = document.getElementById('game-area');

        player.x = 50;
        player.y = 300;
        player.velocityX = 0;
        player.velocityY = 0;
        player.grounded = false;
        player.big = false;
        player.bigTimer = 0;
        player.element.className =''
        updateElementPosition(player.element, player.x, player.y);


        //create platform

        level.platforms.forEach((platformData, index) => {
            const platform = createElement('div', `platform ${platformData.type}`,{
                left: platformData.x + 'px',
                top: platformData.y + 'px',
                width: platformData.width + 'px',
                height: platformData.height + 'px',
            });

            gameArea.appendChild(platform);
            gameObjects.platforms.push({
                element: platform,
                ...platformData,
                id: 'platform-' + index
            });


            });

        //create enemies

        level.enemies.forEach((enemy => {
            const enemyElement = document.createElement('div');
            enemyElement.className = `enemy ${enemy.type}`;
            enemyElement.style.left = enemy.x + 'px';
            enemyElement.style.top = enemy.y + 'px';
            gameArea.appendChild(enemyElement);
        }));

        //create coins

        level.coins.forEach((coin => {
            const coinElement = document.createElement('div');
            coinElement.className = 'coin';
            coinElement.style.left = coin.x + 'px';
            coinElement.style.top = coin.y + 'px';
            gameArea.appendChild(coinElement);
        }));

        //create suprise blocks

        level.supriseBlocks.forEach((supriseBlock => {
            const supriseBlockElement = document.createElement('div');
            supriseBlockElement.className = `suprise-block ${supriseBlock.type}`;
            supriseBlockElement.style.left = supriseBlock.x + 'px';
            supriseBlockElement.style.top = supriseBlock.y + 'px';
            gameArea.appendChild(supriseBlockElement);
        }));

        //create pipes

        level.pipes.forEach((pipe => {
            const pipeElement = document.createElement('div');
            pipeElement.className = `pipe`;
            pipeElement.style.left = pipe.x + 'px';
            pipeElement.style.top = pipe.y + 'px';
            gameArea.appendChild(pipeElement);
        }));
 

    function updateElementPosition(element, x, y){
        element.style.left = x + 'px';
        element.style.top = y + 'px';
    }

    function createElement(type, className, styles = {}){
        const element = document.createElement('div');
        element.className = className;
        Object.assign(element.style, styles);
        return element;
    }

    //start game

    initGame();
