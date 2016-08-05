/**
 * Created by MyPC on 2016/8/5.
 */
$(function(){
    /*初始化 开始*/
    var ball_dom = $('#ball');//球的dom
    var baffle_dom = $('#baffle');//挡板
    var area_dom = $('#area');//墙壁
    //球
    var ball = {
        'x':parseInt(ball_dom.css('left').slice(0,-2)),//x坐标
        'y':parseInt(ball_dom.css('top').slice(0,-2)),//y坐标
        'width':parseInt(ball_dom.css('width').slice(0,-2)),//球的宽
        'height':parseInt(ball_dom.css('height').slice(0,-2)),//球的高
        'speedX':Math.round(Math.random()*4)+1,//x轴方向的速度 1-5的随机数
        'speedY':Math.round(Math.random()*4)+1,//y轴方向的速度 1-5的随机数
        'timer':function(){
            //定时器
        }
    };
    //挡板
    var baffle = {
        'x':parseInt(baffle_dom.css('left').slice(0,-2)),//x坐标
        'width':parseInt(baffle_dom.css('width').slice(0,-2)),//挡板宽
        'height':parseInt(baffle_dom.css('height').slice(0,-2)),//挡板高
        'step':3 //一次移动的步长
    };
    //墙壁
    var area = {
        'width':parseInt(area_dom.css('width').slice(0,-2)),//墙壁宽
        'height':parseInt(area_dom.css('height').slice(0,-2))//墙壁高
    };
    //控制者
    var controller = {
        'timer':'',
        'isLive':true,//是否存活
        'init':function(){
            var that = this;
            //监听按钮事件
            $('#startBtn').on('click',function(){
                that.startTimer();
            });
            $('#endBtn').on('click',function(){
                that.endTimer();
            });
        },
        'startTimer':function(){
            var inThis = this;
            this.timer = setInterval(function(){
                //变化球的位置
                ball.x += ball.speedX;
                ball.y += ball.speedY;
                //判断球的位置
                if(inThis.isHitBaffle()){
                    ball.speedY = -1*ball.speedY;
                }
                var ret = inthis.isHitArea();
                if(ret){
                    switch(ret){
                        case 'up':
                            //上面的墙
                            ball.speedY = -1*ball.speedY;
                            break;
                        case 'left':
                            ball.speedX = -1*ball.speedX;
                            break;
                        case 'right':
                            ball.speedX = -1*ball.speedX;
                            break;
                        case 'down':
                            //输了，球落地
                            inThis.isLive = false;
                            break;
                        default:
                            break;
                    }
                }
                //重画球
                ball_dom.css('left',ball.x+'px');
                ball_dom.css('top',ball.y+'px');
                //判断游戏是否继续
                if(!inThis.isLive){
                    console.log('Game Over...');
                }
            },100);
        },
        'endTimer':function(){
            clearInterval(this.timer);
        },
        'isHitArea':function(){
            //是不是碰到墙壁
            if(ball.y <= 0){
                //碰到了上边墙壁
                return 'up';
            }
            if((ball.y >= area.height)&&((ball.x<baffle.x)||(ball.x>baffle.x+baffle.width))){
                //下面墙壁
                return 'down';
            }
            if(ball.x <= 0){
                //左边
                return 'left';
            }
            if(ball.x >= area.width){
                //右边
                return 'right';
            }
            //没有碰到
            return false;
        },
        'isHitBaffle':function(){
            //是不是碰到挡板
            if((ball.y+ball.height>=area.height-baffle.height)&&(ball.x>=baffle.x)&&(ball.x<=baffle.x+baffle.width)){
                //球在挡板下面，并且球的x在挡板上
                return true;
            }else{
                return false;
            }
        }
    };
    /*初始化 结束*/
    controller.init();
});