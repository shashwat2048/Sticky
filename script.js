document.addEventListener("DOMContentLoaded", () => {
    const character = document.querySelector(".character");
    const leftArm = document.querySelector(".leftArm");
    const rightArm = document.querySelector(".rightArm");
    const leftLeg = document.querySelector(".leftLeg");
    const rightLeg = document.querySelector(".rightLeg");
    const charBody = document.querySelector(".body");
    const charHead = document.querySelector(".head");
    let positionX = 50; 
    let isJumping = false;
    let speed = 5; 
    let keys = {};

    const bgMusic = document.getElementById("backgroundMusic");
    bgMusic.volume = 0.5; 

    const jump = new Audio("jump.mp3");
    const flip = new Audio("flip.mp3");
    const kill = new Audio("kill.mp3");
    const legStand = new Audio("legstand.mp3");
    const walk = new Audio("walking.mp3");
    const down = new Audio("down.mp3");
    const yog = new Audio("yoga.mp3");
    const atten = new Audio("attention.mp3");
    const splits = new Audio("split.mp3");

    document.addEventListener("keydown", (event) => {
        keys[event.key] = true;
        bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
    });

    document.addEventListener("keyup", (event) => {
        keys[event.key] = false;
        if (event.key === " ") {
            normalPosition();
        }
    });

    function updateCharacter() {
        if (keys["ArrowRight"] && !isJumping) {
            normalPosition();
            moveRight();
        } 
        if (keys["ArrowLeft"] && !isJumping) {
            normalPosition();
            moveLeft();
        } 
        if (keys["Shift"]) {
            normalPosition();
            kartWheel();
        }
        if (keys["ArrowUp"] && !isJumping) {
            charjump();
        }
        if (keys["ArrowDown"]) {
            normalPosition();
            headStand();
        }
        if (keys["r"]) {
            reset();
        }
        if (keys["d"]) {
            normalPosition();
            underground();
        }
        if (keys[" "]) {
            hurt();
        }
        if (keys["s"]) {
            normalPosition();
            slipt(); 
        }
        if (keys["w"]) {
            normalPosition();
            yoga();
        }
        if (keys["q"]) {
            normalPosition();
            leftLegStand();
        }
        if (keys["e"]) {
            normalPosition();
            rightLegStand();
        }
        if (keys["a"]) {
            normalPosition();
            attention();
        }
        if (positionX >= 575 || positionX <= -5) {
            let wallHit = new Audio("wallHit.mp3");
            wallHit.play();
            positionX = positionX >= 575 ? 530 : 45;
        }

        character.style.left = `${positionX}px`;
        if (keys["ArrowRight"] || keys["ArrowLeft"]) {
            if (walk.paused) {
                walk.loop = true;
                walk.play();
            }
        } else {
            if (!walk.paused) {
                walk.pause();
                walk.currentTime = 0;
            }
        }

        requestAnimationFrame(updateCharacter);
    }

    updateCharacter(); 

    function charjump(){
        isJumping = true;
        jump.play();
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "translateY(-100px)";
        leftArm.style.transition = "transform 0.3s ease-in-out";
        rightArm.style.transition = "transform 0.3s ease-in-out";
        leftArm.style.transform = "rotate(-60deg)";
        rightArm.style.transform = "rotate(60deg)";
        leftArm.style.top = "20px";
        rightArm.style.top = "20px";
        leftLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transition = "transform 0.3s ease-in-out";
        leftLeg.style.transform = "rotate(0deg)";
        rightLeg.style.transform = "rotate(0deg)";

        setTimeout(() => {
            normalPosition();
            setTimeout(() => {
                isJumping = false;
                jump.pause();
                jump.currentTime = 0;
            }, 300);
        }, 300);
    }

    function headStand(){
        character.style.transition = "transform 0.4s ease-out";
        character.style.transform = "rotate(180deg) translateY(20px)";
        flip.play();
        leftArm.style.transition = "transform 0.4s ease-out";
        leftArm.style.transform = "rotate(80deg)";
        leftArm.style.top = "-10px";
        rightArm.style.transition = "transform 0.4s ease-out";
        rightArm.style.transform = "rotate(-80deg)";
        rightArm.style.top = "-10px";
    }

    function normalPosition(){
        character.style.transition = "transform 0.3s ease-in";
        character.style.transform = "translateY(0) rotate(0deg)";
        leftArm.style.transition = "transform 0.3s ease-in-out";
        rightArm.style.transition = "transform 0.3s ease-out";
        leftArm.style.transform = "rotate(30deg)";
        rightArm.style.transform = "rotate(-30deg)";
        leftArm.style.top = "18px";
        rightArm.style.top = "18px";
        leftLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transition = "transform 0.3s ease-in-out";
        leftLeg.style.transform = "rotate(20deg)";
        rightLeg.style.transform = "rotate(-20deg)";
        rightArm.style.transition = "transform 0.3s ease-out";
        rightArm.style.right = "-15px";
        rightArm.style.left = "10px";
        rightArm.style.top = "18px";
        leftArm.style.transition = "transform 0.3s ease-out";
        leftArm.style.left = "-15px";
        leftArm.style.right = "10px";
        leftArm.style.top = "18px";
        rightLeg.style.top = "40px";
        leftLeg.style.top = "40px";
        leftLeg.style.left = "0px";
        rightLeg.style.right = "0px";
        charBody.style.margin = "0px";
        charHead.style.backgroundColor = "black";
    }

    function kartWheel(){
        let spin = new Audio("spin.mp3");
        spin.play();
        character.style.transition = "transform 0.4s ease-out";
        character.style.transform = "rotate(360deg)";
        setTimeout(() => {
            character.style.transition = "none";
            character.style.transform = "rotate(0deg)";
        }, 400);
    }

    function reset(){
        positionX = 50;
        character.style.left = `${positionX}px`;
        normalPosition();
    }

    function underground(){
        down.play();
        leftArm.style.transition = "transform 0.4s ease-out";
        leftArm.style.transform = "rotate(80deg)";
        leftArm.style.top = "-10px";
        rightArm.style.transition = "transform 0.4s ease-out";
        rightArm.style.transform = "rotate(-80deg)";
        rightArm.style.top = "-10px";
        character.style.transition = "transform 0.6s ease-out";
        character.style.transform = "translateY(100px)";
    }

    function moveRight(){
        positionX += speed;
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "rotate(30deg)";
        rightArm.style.transition = "transform 0.3s ease-out";
        rightArm.style.left = "-14px";
        rightArm.style.top = "30px";
        leftLeg.style.left = `9px`;
    }

    function moveLeft(){
        positionX -= speed;
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "rotate(-30deg)";
        leftArm.style.transition = "transform 0.3s ease-out";
        leftArm.style.left = "14px";
        leftArm.style.top = "30px";
        rightLeg.style.right = `9px`;
    }

    function slipt(){
        splits.play();
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "translateY(12px)";
        leftArm.style.transition = "transform 0.3s ease-in-out";
        rightArm.style.transition = "transform 0.3s ease-in-out";
        leftArm.style.transform = "rotate(0deg)";
        rightArm.style.transform = "rotate(0deg)";
        leftLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transition = "transform 0.3s ease-in-out";
        leftLeg.style.transform = "rotate(90deg)";
        rightLeg.style.transform = "rotate(-90deg)";
        rightLeg.style.top = "30px";
        leftLeg.style.top = "30px";
        leftLeg.style.left = "-5px";
        rightLeg.style.right = "-5px";
    }

    function yoga(){
        yog.play();
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "translateY(12px)";
        leftArm.style.transition = "transform 0.3s ease-in-out";
        rightArm.style.transition = "transform 0.3s ease-in-out";
        leftArm.style.transform = "rotate(-60deg)";
        rightArm.style.transform = "rotate(60deg)";
        leftLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transition = "transform 0.3s ease-in-out";
        leftLeg.style.transform = "rotate(45deg)";
        rightLeg.style.transform = "rotate(-45deg)";
        rightLeg.style.top = "30px";
        leftLeg.style.top = "30px";
        leftLeg.style.left = "10px";
        rightLeg.style.right = "10px";
        rightArm.style.top = "25px";
        leftArm.style.top = "25px";
        leftArm.style.right = "9px";
        leftArm.style.left = "-14px";
        rightArm.style.right = "-14px";
        rightArm.style.left = "9px";
    }

    function hurt(){
        kill.play();
        charBody.style.margin = "10px";
        charHead.style.backgroundColor = "red";
    }

    function leftLegStand(){
        legStand.play();
        normalPosition();
        leftArm.style.transition = "transform 0.3s ease-in-out";
        rightArm.style.transition = "transform 0.3s ease-in-out";
        leftArm.style.transform = "rotate(0deg)";
        rightArm.style.transform = "rotate(0deg)";
        leftArm.style.top = "20px";
        rightArm.style.top = "20px";
        leftLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transition = "transform 0.3s ease-in-out";
        leftLeg.style.transform = "rotate(0deg)";
        rightLeg.style.transform = "rotate(-90deg)";
        rightLeg.style.top = "28px";
        rightLeg.style.right = "-5px";
        leftLeg.style.left = "5px";
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "translateY(-10px)";
    }

    function rightLegStand(){
        legStand.play();
        normalPosition();
        leftArm.style.transition = "transform 0.3s ease-in-out";
        rightArm.style.transition = "transform 0.3s ease-in-out";
        leftArm.style.transform = "rotate(0deg)";
        rightArm.style.transform = "rotate(0deg)";
        leftArm.style.top = "20px";
        rightArm.style.top = "20px";
        leftLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transform = "rotate(0deg)";
        leftLeg.style.transform = "rotate(90deg)";
        leftLeg.style.top = "28px";
        leftLeg.style.left = "-5px";
        rightLeg.style.right = "5px";
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "translateY(-10px)";
    }

    function attention(){
        atten.play();
        normalPosition();
        leftArm.style.transition = "transform 0.3s ease-in-out";
        rightArm.style.transition = "transform 0.3s ease-in-out";
        leftArm.style.transform = "rotate(-90deg)";
        rightArm.style.transform = "rotate(90deg)";
        leftArm.style.top = "25px";
        rightArm.style.top = "25px";
        leftLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transition = "transform 0.3s ease-in-out";
        rightLeg.style.transform = "rotate(0deg)";
        leftLeg.style.transform = "rotate(0deg)";
        leftLeg.style.left = "4px";
        rightLeg.style.right = "4px";
        character.style.transition = "transform 0.3s ease-out";
        character.style.transform = "translateY(-10px)";
        leftArm.style.left = "-10px";
        rightArm.style.left = "5px";
    }
});
