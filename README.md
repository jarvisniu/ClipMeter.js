ClipMeter.js
============

Measure animation FPS and frame-time usage

This project is similar to mrdoob's [stats.js](https://github.com/mrdoob/stats.js).
But I extended it to show the usage of every frame time.

## Screenshot

![Meter.js](https://rawgit.com/jarvisniu/ClipMeter.js/master/screenshot.png)

## Usage

```JavaScript
var clipMeter = new ClipMeter();

function tick() {
    clipMeter.start();

    for (var i = 0; i < 1e6; i++)
    	i = i + 1;

    clipMeter.tick();

	setTimeout(tick, 1000 / 60);
}

tick();
```

## API

constructor options

- `align`: position of the meter, chossen from `"left"` or `"right"`
- `width`: width of the meter
- `height`: height of the meter
- `opacity`: opacity

public methods

- `start()` - record the start time
- `tick()` - record the end time

## License

MIT
