/**
 * Created by Administrator on 2017/6/2.
 */
(function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    if (canvas.getContext) {
        console.log('支持canvas');
    } else {
        console.log('不支持canvas');
    }

    canvas.width = 2000;
    canvas.height = 2000;

    canvas.onmousedown = canvasClick;
    canvas.onmouseup = stopdrag;
    canvas.onmouseout = stopdrag;
    canvas.onmousemove = drag;
    canvas.ondblclick = dblik;

    var angles = [];
    var select = -1;
    //把7个点的位置坐标和颜色存入一个数组
    var points = [
        {p: [{x: 0, y: 0}, {x: 200, y: 0}, {x: 100, y: 100}], color: "#caff67", click: false, drag: false, types: 3},
        {p: [{x: 0, y: 0}, {x: 100, y: 100}, {x: 0, y: 200}], color: "#67becf", click: false, drag: false, types: 3},
        {
            p: [{x: 200, y: 0}, {x: 200, y: 100}, {x: 150, y: 150}, {x: 150, y: 50}],
            color: "#ef3d61",
            click: false,
            drag: false,
            types: 4
        },
        {
            p: [{x: 150, y: 50}, {x: 150, y: 150}, {x: 100, y: 100}],
            color: "#f9f51a",
            click: false,
            drag: false,
            types: 3
        },
        {
            p: [{x: 100, y: 100}, {x: 150, y: 150}, {x: 100, y: 200}, {x: 50, y: 150}],
            color: "#a594c0",
            click: false,
            drag: false,
            types: 4
        },
        {
            p: [{x: 50, y: 150}, {x: 100, y: 200}, {x: 0, y: 200}],
            color: "#fa8ecc",
            click: false,
            drag: false,
            types: 3
        },
        {
            p: [{x: 200, y: 100}, {x: 200, y: 200}, {x: 100, y: 200}],
            color: "#f6ca29",
            click: false,
            drag: false,
            types: 3
        }
    ];
    var points2 = [
        {p: [{x: 0, y: 0}, {x: 200, y: 0}, {x: 100, y: 100}], color: "#caff67", click: false, drag: false, types: 3},
        {p: [{x: 0, y: 0}, {x: 100, y: 100}, {x: 0, y: 200}], color: "#67becf", click: false, drag: false, types: 3},
        {
            p: [{x: 200, y: 0}, {x: 200, y: 100}, {x: 150, y: 150}, {x: 150, y: 50}],
            color: "#ef3d61",
            click: false,
            drag: false,
            types: 4
        },
        {
            p: [{x: 150, y: 50}, {x: 150, y: 150}, {x: 100, y: 100}],
            color: "#f9f51a",
            click: false,
            drag: false,
            types: 3
        },
        {
            p: [{x: 100, y: 100}, {x: 150, y: 150}, {x: 100, y: 200}, {x: 50, y: 150}],
            color: "#a594c0",
            click: false,
            drag: false,
            types: 4
        },
        {
            p: [{x: 50, y: 150}, {x: 100, y: 200}, {x: 0, y: 200}],
            color: "#fa8ecc",
            click: false,
            drag: false,
            types: 3
        },
        {
            p: [{x: 200, y: 100}, {x: 200, y: 200}, {x: 100, y: 200}],
            color: "#f6ca29",
            click: false,
            drag: false,
            types: 3
        }
    ];

    function draw() {
        // 清除画布，准备绘制
        context.clearRect(0, 0, canvas.width, canvas.height);
        //遍历数组，以每个点为起点画图
        for (var i = 0; i < points.length; i++) {
            context.beginPath();
            context.moveTo(points[i].p[0].x, points[i].p[0].y);
            for (var j = 0; j < points[i].p.length; j++) {
                context.lineTo(points[i].p[j].x, points[i].p[j].y);
            }
            context.lineTo(points[i].p[0].x, points[i].p[0].y);
            context.strokeStyle = "black";
            context.lineWidth = "3";
            context.fillStyle = points[i].color;
            context.stroke();
            context.fill();
            context.closePath();
        }
    }

    draw();
    var isDragging = false;

    function canvasClick(e) {
        // 取得画布上被单击的点
        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;

        for (var i = 0; i < points.length; i++) {
            var flag = false;
            if (points[i].types == 3) {
                flag = anglecompult(points[i].p, clickX, clickY);
            } else if (points[i].types == 4) {
                flag = reactcompult(points[i].p, clickX, clickY);
            }
            if (flag == true) {
                isDragging = true;
                points[i].click = true;
                points[i].drag = true;
                select = i;
            } else {
                points[i].click = false;
                points[i].drag = false;
            }
        }

    }

    function dblik(e) {//双击一块转动45度角
        // 判断圆圈是否开始拖拽
        //if (isDragging == true) {
        // 判断拖拽对象是否存在

        // 取得鼠标位置
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;

        // 将圆圈移动到鼠标位置
        var changdu = points[select].p.length;

        var yuanX = points[select].p[0].x;
        var yuanY = points[select].p[0].y;

        var yuanX2 = points2[select].p[0].x;
        var yuanY2 = points2[select].p[0].y;
        var xianx;
        var xianx2;
        var xiany;
        var xiany2;
        var xiebian;
        for (var j = 1; j < changdu; j++) {
            xianx = (points[select].p[j].x - yuanX) * (Math.cos((2 * Math.PI / 360) * 45)) - (points[select].p[j].y - yuanY) * (Math.sin((2 * Math.PI / 360) * 45)) + yuanX;
            xiany = (points[select].p[j].x - yuanX) * (Math.sin((2 * Math.PI / 360) * 45)) + (points[select].p[j].y - yuanY) * (Math.cos((2 * Math.PI / 360) * 45)) + yuanY;
            points[select].p[j].x = xianx;
            points[select].p[j].y = xiany;

            xianx2 = (points2[select].p[j].x - yuanX2) * (Math.cos((2 * Math.PI / 360) * 45)) - (points2[select].p[j].y - yuanY2) * (Math.sin((2 * Math.PI / 360) * 45)) + yuanX2;
            xiany2 = (points2[select].p[j].x - yuanX2) * (Math.sin((2 * Math.PI / 360) * 45)) + (points2[select].p[j].y - yuanY2) * (Math.cos((2 * Math.PI / 360) * 45)) + yuanY2;
            points2[select].p[j].x = xianx2;
            points2[select].p[j].y = xiany2;
        }
        console.log(points[select].p);
        // 更新画布
        draw();

        //}
    }

    function drag(e) {
        // 判断圆圈是否开始拖拽
        if (isDragging == true) {
            // 判断拖拽对象是否存在

            // 取得鼠标位置
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;


            var changdu = points[select].p.length;

            var xx = x - points2[select].p[0].x;
            var yy = y - points2[select].p[0].y;
            for (var j = 0; j < changdu; j++) {//将图形拖动到鼠标相应位置
                points[select].p[j].x = points2[select].p[j].x + xx;
                points[select].p[j].y = points2[select].p[j].y + yy;
            }
            // 更新画布
            draw();

        }
    }

    function stopdrag() {
        isDragging = false;
    }

    function anglecompult(anglepostions, x, y) {//判断三角形内
        var first = anglepostions[0];
        var second = anglepostions[1];
        var third = anglepostions[2];

        var firstR = ((second.y - third.y) * (x - third.x) + (third.x - second.x) * (y - third.y)) / ((second.y - third.y) * (first.x - third.x) + (third.x - second.x) * (first.y - third.y));

        var secondR = ((third.y - first.y) * (x - third.x) + (first.x - third.x) * (y - third.y)) / ((second.y - third.y) * (first.x - third.x) + (third.x - second.x) * (first.y - third.y))

        var thirsR = 1 - firstR - secondR;

        if (firstR > 0 && firstR < 1 && secondR > 0 && secondR < 1 && thirsR > 0 && thirsR < 1) {
            return true;
        } else {
            return false;
        }
    }

    function reactcompult(reactpostions, x, y) {//判断鼠标是否在矩形区域内
        var xmin, xmax, ymin, ymax;
        xmin = xmax = reactpostions[0].x;
        ymin = ymax = reactpostions[0].y;
        for (var i = 0; i < reactpostions.length; i++) {
            if (reactpostions[i].x < xmin) {
                xmin = reactpostions[i].x;
            }
            if (reactpostions[i].x > xmax) {
                xmax = reactpostions[i].x;
            }
            if (reactpostions[i].y < ymin) {
                ymin = reactpostions[i].y;
            }
            if (reactpostions[i].y > ymax) {
                ymax = reactpostions[i].y;
            }
        }

        if (xmin < x && xmax > x && ymin < y && ymax > y) {
            return true;
        } else {
            return false;
        }
    }

})();
