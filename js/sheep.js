// var sheep = document.getElementsByClassName('sheep')[0];
// var num = 0;
// var go = 0;
// var sheepAnimate = setInterval(function () {
//     num += 107;
//     if(num == 856) {
//         num = 0;
//     }
//     sheep.style.backgroundPositionX = -num + 'px';
// },100)
// var sheepForward = setInterval(function () {
//     go = sheep.offsetLeft - 25;
//     if(go <= -107) {
//         clearInterval(sheepAnimate);
//         clearInterval(sheepForward);
//     }
//     sheep.style.left = go + 'px';
// },100)

(function () {
    var obj = {
        sheepNum : 0,
        sheepRun : 0,
        stage : document.getElementsByClassName('stage')[0],
        speed : 5,
        frenquency: 80,
        maxSheep: 3,
    }

    function SheepOriginC (data) {
        this.sheep = document.createElement('div');
        data.stage.appendChild(this.sheep);
        this.sheep.className = 'sheep';
        this.sheepNum = data.sheepNum;
        this.sheepRun = data.sheepRun;
        this.speedOrgin = data.speed;
        this.speed = data.speed;
        this.frenquency = Math.floor(Math.random()*data.frenquency) + 20;
        this.top = 0;
        this.sheepWidth = this.sheep.offsetWidth;
    }
    init();
    function init() {

        createSheep()
        // 生产小羊
        function createSheep() {
            var timer = setInterval(function() {
                var sheepN = obj.stage.children.length;
                if (sheepN < obj.maxSheep){
                    var SheepOrigin = new SheepOriginC(obj);
                    sheepRunning(SheepOrigin);
                }else {
                    return false;
                }
            },1500)
        }
        function sheepRunning (SheepOrigin) {
            // 自身动作
            var sheepAnimate = setInterval(function () {
                SheepOrigin.sheepNum += SheepOrigin.sheepWidth;
                if(SheepOrigin.sheepNum == (8*SheepOrigin.sheepWidth)) {
                    SheepOrigin.sheepNum = 0;
                }
                SheepOrigin.sheep.style.backgroundPositionX = -SheepOrigin.sheepNum + 'px';
                SheepOrigin.sheep.style.backgroundPositionY = SheepOrigin.top + 'px';
            },SheepOrigin.frenquency)
            // 向前移动
            var sheepForward = setInterval(function () {
                SheepOrigin.sheepRun = SheepOrigin.sheep.offsetLeft - SheepOrigin.speed;
                if(SheepOrigin.sheepRun <= -SheepOrigin.sheepWidth) {
                    clearInterval(sheepAnimate);
                    clearInterval(sheepForward);
                }
                SheepOrigin.sheep.style.left = SheepOrigin.sheepRun + 'px';
            },SheepOrigin.frenquency)
            // 拖拽小羊
            SheepOrigin.sheep.addEventListener('mousedown', function (e) {
                var event = event || e;
                SheepOrigin.top = -80;
                SheepOrigin.speed = 0;
                SheepOrigin.x = event.pageX;
                SheepOrigin.y = event.pageY;
                document.addEventListener('mousemove',sheepMove);
                function sheepMove (e) {
                    var event = event || e;
                    SheepOrigin.sheep.style.left = SheepOrigin.sheep.offsetLeft + (event.pageX - SheepOrigin.x) + 'px'
                    SheepOrigin.sheep.style.top = SheepOrigin.sheep.offsetTop + (event.pageY - SheepOrigin.y) + 'px'
                    SheepOrigin.x = event.pageX;
                    SheepOrigin.y = event.pageY;
                }
                this.addEventListener('mouseup',function(e) {
                    SheepOrigin.top = 0;
                    SheepOrigin.speed = SheepOrigin.speedOrgin;
                    document.removeEventListener('mousemove',sheepMove);
                })
            })
        }
    }
})()