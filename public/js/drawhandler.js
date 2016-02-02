window.onload = function() {
  var socket = io();
  var canvas = document.getElementById('whiteboard');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#f00";

    var onMouseDown = function (event) {

      event.preventDefault();

      var coords = getCursorPosition(event);
      var x = coords.x;
      var y = coords.y;

      ctx.fillRect(x,y,100,100);
      ctx.clearRect(x+20,y+20,60,60);
      ctx.strokeRect(x+25,y+25,50,50);
      socket.emit(
        'newrectangle',
        {
          x: x, y: y
        }
      );

    };

    canvas.addEventListener(
      'mousedown',
      onMouseDown,
      false
    );

  }
  function getCursorPosition(event) {

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    return {x : x, y : y}

  }
};

