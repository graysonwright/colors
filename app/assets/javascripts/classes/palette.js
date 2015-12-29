"use strict";

class Palette {
  constructor(canvas) {
    this.canvas = canvas;
  }

  setPixel(imageData, pixelIndex, rgbColor) {
    var dataIndex = pixelIndex * 4;

    imageData.data[dataIndex] = rgbColor.red;
    imageData.data[dataIndex + 1] = rgbColor.green;
    imageData.data[dataIndex + 2] = rgbColor.blue;
    imageData.data[dataIndex + 3] = 255;
  }

  draw() {
    var context = canvas.getContext("2d");
    var imageData = context.createImageData(canvas.width, canvas.height);
    var saturation = 1;

    for(var yIndex = 0; yIndex < canvas.height; yIndex += 1) {
      for(var xIndex = 0; xIndex < canvas.width; xIndex += 1) {
        var lightness = xIndex / canvas.width;
        var hue = yIndex / canvas.height;

        var pixelIndex = (yIndex * canvas.width) + xIndex;

        var hslColor = new ColorHSL(hue, saturation, lightness);
        var rgbColor = hslColor.toRGB();

        this.setPixel(imageData, pixelIndex, rgbColor);
      }
    }

    context.putImageData(imageData, 0, 0);
  }

  onSelect(callback) {
    $(this.canvas).on("mousedown", function(e) {
      this.sendSelection(e, callback);
    }.bind(this));

    $(this.canvas).on("mousemove", function(e){
      if(e.buttons) { this.sendSelection(e, callback); }
    }.bind(this));
  }

  sendSelection(e, callback) {
    var x = Math.floor(e.offsetX / e.target.clientWidth * e.target.width);
    var y = Math.floor(e.offsetY / e.target.clientHeight * e.target.height);
    var data = this.canvas.getContext("2d").getImageData(x, y, 1, 1).data;
    var rgb_color = new ColorRGB(data[0], data[1], data[2]);

    callback(rgb_color)
  }
}
