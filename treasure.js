class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }
  
    static chooseClue(clueNumber) {
        switch (clueNumber) {
            case 1:
                return "线索 1: 传说中的神庙位于阴暗的森林中...";
            case 2:
                return "线索 2: 没有人敢靠近的湖泊隐藏着秘密...";
            default:
                throw new Error("无效的线索选择!");
        }
    }
  
    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("线索解码成功，它指向了一个神庙的位置...");
            }, 1500);
        });
    }
  
    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!location) {
                    reject("没有找到神庙的位置!");
                }
                resolve("在神庙里找到了一个古老的宝箱!");
            }, 2000);
        });
    }
  
    static solvePuzzle(puzzle) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!puzzle) {
                    reject("没有谜题可以解答!");
                }
                resolve("谜题解答成功! 宝箱打开了...");
            }, 1500);
        });
    }
  
    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("宝箱里藏着珍贵的宝藏!");
            }, 1000);
        });
    }
  
    static getImageForStep(step) {
        switch (step) {
            case 1: return "线索.png"; 
            case 2: return "神庙.png"; 
            case 3: return "宝箱.png"; 
            case 4: return "宝藏.png"; 
            default: return "";
        }
    }
  }
  
  async function findTreasureWithAsyncAwait() {
    const output = document.getElementById("output");
    const treasureImage = document.getElementById("treasureImage");
    const clueOptions = document.getElementById("clueOptions");
    const resetButton = document.getElementById("resetButton");
    const clue1Button = document.getElementById("clue1Button");
    const clue2Button = document.getElementById("clue2Button");
    const startButton = document.getElementById("startButton");
  
    output.textContent = ""; 
    treasureImage.style.display = "none"; 
    clueOptions.style.display = "none"; 
    resetButton.style.display = "none"; // 隐藏重置按钮
    startButton.style.display = "none"; // 隐藏开始按钮
    let animationDelay = 0;
    let currentStep = 0; // 跟踪当前步骤
  
    try {
        const clue = await TreasureMap.getInitialClue();
        displayMessage(output, clue, animationDelay);
        currentStep++; // 增加步骤计数
  
        clueOptions.style.display = "block";
  
        await new Promise((resolve) => {
            clue1Button.onclick = async () => {
                disableClueButtons(clue1Button, clue2Button); // 禁用按钮
                hideClueButtons(clue1Button, clue2Button); // 隐藏按钮
                const selectedClue = TreasureMap.chooseClue(1);
                await proceedWithClue(selectedClue, output, treasureImage, animationDelay, currentStep);
                resolve();
            };
            clue2Button.onclick = async () => {
                disableClueButtons(clue1Button, clue2Button); // 禁用按钮
                hideClueButtons(clue1Button, clue2Button); // 隐藏按钮
                const selectedClue = TreasureMap.chooseClue(2);
                await proceedWithClue(selectedClue, output, treasureImage, animationDelay, currentStep);
                resolve();
            };
        });
  
        resetButton.style.display = "block"; // 显示重置按钮
  
    } catch (error) {
        displayMessage(output, `任务失败: ${error}`, animationDelay);
    }
  }
  
  async function proceedWithClue(clue, output, treasureImage, animationDelay, currentStep) {
    treasureImage.style.display = "block"; 
    displayMessage(output, clue, animationDelay);
    treasureImage.src = TreasureMap.getImageForStep(1); 
  
    const location = await TreasureMap.decodeAncientScript(clue);
    displayMessage(output, location, animationDelay += 1.5);
    currentStep++;
  
    treasureImage.src = TreasureMap.getImageForStep(2); 
  
    const box = await TreasureMap.searchTemple(location);
    displayMessage(output, box, animationDelay += 2);
    currentStep++;
  
    treasureImage.src = TreasureMap.getImageForStep(3); 
  
    const puzzle = "解开这个谜题才能打开宝箱";
    const puzzleSolved = await TreasureMap.solvePuzzle(puzzle);
    displayMessage(output, puzzleSolved, animationDelay += 1.5);
    currentStep++;
  
    treasureImage.src = TreasureMap.getImageForStep(4); 
  
    const treasure = await TreasureMap.openTreasureBox();
    displayMessage(output, treasure, animationDelay += 1);
    currentStep++;
  }
  
  function displayMessage(output, message, delay) {
    output.innerHTML += `<span class="message" style="animation-delay: ${delay}s;">${message}</span>\n`;
  }
  
  function disableClueButtons(...buttons) {
    buttons.forEach(button => {
        button.disabled = true; // 禁用按钮
    });
  }
  
  function hideClueButtons(...buttons) {
    buttons.forEach(button => {
        button.style.display = "none"; // 隐藏按钮
    });
  }
  
  // 重置游戏的函数
  function resetGame() {
    const output = document.getElementById("output");
    const treasureImage = document.getElementById("treasureImage");
    const clueOptions = document.getElementById("clueOptions");
    const resetButton = document.getElementById("resetButton");
    const clue1Button = document.getElementById("clue1Button");
    const clue2Button = document.getElementById("clue2Button");
    const startButton = document.getElementById("startButton");
  
    output.textContent = "";
    treasureImage.style.display = "none";
    clueOptions.style.display = "none";
    resetButton.style.display = "none"; // 隐藏重置按钮
    startButton.style.display = "inline-block"; // 显示开始按钮
    clue1Button.style.display = "inline-block"; // 显示按钮
    clue2Button.style.display = "inline-block"; // 显示按钮
  }
  
  document.getElementById("startButton").addEventListener("click", findTreasureWithAsyncAwait);
  document.getElementById("resetButton").addEventListener("click", resetGame);
  