/**
 * ClipMeter.js - Measure animation FPS and frame-time usage
 * Jarvis Niu - https://github.com/jarvisniu/ClipMeter.js
 */
 
var global = window || this;

global.ClipMeter = function(options) {

    options = options || {};

    var align = options.align || "right";
    var width = options.width || 80;
    var height = options.height || 40;
    var opacity = options.opacity || 0.9;

    var minTransTime = 750;  // in second

    // styles
    var BORDER = "#363",
        BG = "#040",
        FILL = "#080",
        STROKE = "#8F8";

    var self = this;
    var dom = document.createElement("canvas");
    var context = dom.getContext("2d");

    // Chart
    var heights = [];
    var heightSum = 0;
    var startTime = 0;
    var tickTime = 0;

    // Usage
    var prevUsagePercent = -1;
    var prevUsageTime = 0;

    // FPS
    var prevStartTime = -1;
    var frameTimes = [];
    var frameTimeSum = 0;
    var prevFps = -1;
    var prevFpsTime = 0;

    this.fps = 0;

    init();

    this.start = function() {
        prevStartTime = startTime;
        startTime = performance.now();

        var frameDelta = startTime - prevStartTime;
        frameTimeSum += frameDelta;
        frameTimes.push(frameDelta);
        if (frameTimes.length > width) {
            frameTimeSum -= frameTimes[0];
            frameTimes.shift();
        }
    };

    this.tick = function() {
        tickTime = performance.now();
        if (prevStartTime > -1) {
            deltaTime = tickTime - startTime;
            var frametime = startTime - prevStartTime;
            var h = height * (deltaTime / frametime);
            heights.push(h);
            heightSum += h;
            if (heights.length > width) {
                heightSum -= heights[0];
                heights.shift();
            }
            render();
        }
    };

    function init() {
        dom.width = width;
        dom.height = height;
        dom.style.width = width + "px";
        dom.style.height = height + "px";
        dom.style.border = "solid 2px " + BORDER;

        dom.style.position = "absolute";
        dom.style[align] = "8px";
        dom.style.top = "8px";
        dom.style.opacity = opacity;

        context.font = "10px Verdana";
        context.textBaseline = "top";

        document.body.appendChild(dom);
    }

    function render() {
        var len = heights.length,
            x, y, now = performance.now();

        // clear canvas
        context.fillStyle = BG;
        context.fillRect(0, 0, width, height);

        // draw chart fill
        context.strokeStyle = FILL;
        context.beginPath();
        for (var i = 0; i < len; i++) {
            x = width - len + i + 0.5;
            context.moveTo(x, height);
            context.lineTo(x, height - heights[i] );
        }
        context.stroke();

        // draw chart stroke
        context.strokeStyle = STROKE;
        context.beginPath();
        for (i = 0; i < len; i++) {
            x = width - len + i + 0.5;
            y = height - heights[i];
            if (i > 0) 
                context.lineTo(x, y);
            else
                context.moveTo(x, y);
        }
        context.stroke();

        // draw usage percent
        if (width > 31) {
            context.fillStyle = STROKE;
            context.textAlign = "right";
            if (now - prevUsageTime > minTransTime) {
                prevUsagePercent = Math.floor(heightSum / len / height * 100);
                prevUsageTime = now;
            }
            if (prevUsagePercent > -1)
            	context.fillText(prevUsagePercent + "%", width - 2, 0);
        }

        // draw FPS
        if (width > 74) {
            self.fps = Math.floor(1000 / frameTimeSum * frameTimes.length);
            context.textAlign = "left";
            if (now - prevFpsTime >  minTransTime) {
                prevFps = self.fps;
                prevFpsTime = now;
            }
            if (prevFps > -1) context.fillText(prevFps + "FPS", 2, 0);
        }
    }
}
