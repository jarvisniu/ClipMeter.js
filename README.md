ClipMeter.js
============

measure animation efficiency

## Screenshot

![Meter.js]()

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

Constructor option list

- `align`: position of the meter, chossen from `"left"` or `"right"`
- `width`: width of the meter
- `height`: height of the meter
- `opacity`: opacity

Public methods:

- `start()` - record the start time
- `tick()` - record the end time
