<template>
	<div id="app">
        <div class="first">
            <div id="bg" class="banner" style="height: 728px;">
            </div>
		    <canvas id="canvas"></canvas>
        </div>
	</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import Dots from './Dots.js'

export default {
  data() {
    return {
    }
  },
  //实例初始化最之前，无法获取到data里的数据
  beforeCreate(){ 
  	
  	
  },  
  //在挂载开始之前被调用
  beforeMount(){
  }, 
  //已成功挂载，相当ready()
  mounted(){
    var Main = function () {

        var dotsArr = [],
            dotsNum = 0,
            maxDotsNum = 0,
            overNum = 0, // 超出最大数量的点的数量
            dotsDistance = 250, // 点之间产生连线的最大距离

            bg = document.getElementById('bg'),
            canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),

            width = parseInt(document.documentElement.clientWidth),
            height = parseInt(document.documentElement.clientHeight),
            area = width * height, // canvas区域面积
            cssText = 'width: '+width+'px; height: '+height+'px;';

        // 设置背景和canvas的宽高
        bg.setAttribute('style', cssText);
        canvas.setAttribute('style', cssText);
        canvas.width = (width * 2).toString();
        canvas.height = (height * 2).toString();

        // 更具canvas面积动态确定初始化点的数量和最大数量
        dotsNum = parseInt(area / 3000);
        maxDotsNum = dotsNum * 2;

        //生成点
        for (var i = 0; i < dotsNum; i ++) {
            var dot = new Dots();
            dotsArr.push(dot);
            dot.init(canvas);
        }

        //鼠标事件
        document.addEventListener('click', createDot);
        function createDot(e) {
            var tx = e.pageX,
                ty = e.pageY;
            if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {

                for (var i = 0; i < 5; i ++) {
                    var dot = new Dots();
                    dotsArr.push(dot);
                    dotsNum += 1;
                    dot.init(canvas, tx, ty);
                }
            }
        };
        document.addEventListener('mousemove', moveDot);
        function moveDot(e) {

            var tx = e.pageX,
                ty = e.pageY;
            if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
                dot.mouseDot(tx, ty);
            }
        };

        //动画与连线
        var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
        requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

        function animateUpdate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

            // 更新点的位置 数量超出最大值时舍弃旧的点
            if (dotsNum > maxDotsNum) {
                overNum = dotsNum - maxDotsNum;
            }

            for (var i = overNum; i < dotsNum; i ++) {
                dotsArr[i].update();
            }

            // 绘制连线
            for (var i = overNum; i < dotsNum; i ++) {
                for (var j = i + 1; j < dotsNum; j ++) {
                    var tx = dotsArr[i].x - dotsArr[j].x,
                        ty = dotsArr[i].y - dotsArr[j].y,
                        s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
                    if (s < dotsDistance) {
                        ctx.beginPath();
                        ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
                        ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
                        ctx.strokeStyle = 'rgba(255,255,255,'+(dotsDistance-s)/dotsDistance+')';
                        ctx.strokeWidth = 1;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }

            requestAnimFrame(animateUpdate);
        }
    }();
  },
  //相关操作事件
  methods: {
	 click:  function() {
        console.log('123');
     }
  }
}
</script>

<style lang="less">
#bg {
	// background: url('../../../assets/img/wooma_01.png') no-repeat;
	background-size: cover;
	background-position: center center;
}
#canvas{
	position: absolute;
	top: 0;
	left: 0;
    // z-index: -1;
}

.main-nav {
    display: inline-block;
    margin-right: 30px;
    line-height: 50px;
    z-index: 3;
}
.main-nav .main-nav-link {
    display: inline-block;
    margin: 0 30px;
    color: #fff;
}
.v-m {
	vertical-align: middle;
}
.text-center {
	text-align: center;
}
.m-t-xxxl {
	margin-top: 100px;
}
.banner {
	position: relative;
    width: 100%;
}
.header {
    position: relative;
    width: 100%;
    height: 70px;
    color: #fff;
    z-index: 10000;
}
.first {
    background: url('../../../assets/img/bg.png') no-repeat;
}
</style>
