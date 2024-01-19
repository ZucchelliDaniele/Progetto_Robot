"use strict"
/*
 *fork from (https://github.com/bobboteck/JoyStick)
 */

let StickStatus =
{
    xPosition: 0,
    yPosition: 0,
    x: 0,
    y: 0,
};

var deadZoneValue = 20

var change_theme_color_button_value = 0
export var movedX
export var movedY
export var X = 0
export var Y = 0
var height
var width
var pressed
var JoystickSwapStatus = true //true leftJoystick false Right Joystick
var degrees
var radiants
var magnitude
var rotationLeft = 0
var rotationRight = 0
export var Fr 
export var Bl
export var Fl 
export var Br
var differenceIntExtCircle = 2/3
var Joy
var TriggerSwapStatus = true //true left Trigger false Right Trigger
var leftTriggerValue = 0
var rightTriggerValue = 0
var JoystickOrTrigger = true //true use joystick to calculate magnitude false use triggers to calculate magnitude
var internalFillColor
var internalLineWidth
var internalStrokeColor
var externalLineWidth
var externalStrokeColor
var autoReturnToCenter
var canvas
var objContainer
var context
/**
 * @desc Principal object that draw a joystick, you only need to initialize the object and suggest the HTML container
 * @costructor
 * @param container {String} - HTML object that contains the Joystick
 * @param parameters (optional) - object with following keys:
 *  title {String} (optional) - The ID of canvas (Default value is 'joystick')
 *  width {Int} (optional) - The width of canvas, if not specified is setted at width of container object (Default value is the width of container object)
 *  height {Int} (optional) - The height of canvas, if not specified is setted at height of container object (Default value is the height of container object)
 *  internalFillColor {String} (optional) - Internal color of Stick (Default value is '#00AA00')
 *  internalLineWidth {Int} (optional) - Border width of Stick (Default value is 2)
 *  internalStrokeColor {String}(optional) - Border color of Stick (Default value is '#003300')
 *  externalLineWidth {Int} (optional) - External reference circonference width (Default value is 2)
 *  externalStrokeColor {String} (optional) - External reference circonference color (Default value is '#008000')
 *  autoReturnToCenter {Bool} (optional) - Sets the behavior of the stick, whether or not, it should return to zero position when released (Default value is True and return to zero)
 * @param callback {StickStatus} - 
 */
var JoyStick = (function(container, parameters, callback, classname)
{
    parameters = parameters || {};
    var title = (typeof parameters.title === "undefined" ? "joystick" : parameters.title),
        width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
        if(height > width) {
            width = width / 1.1
        }
        else {
            if(width > 300) {
                width = 300
            }
            else {
                width = width / 3
            }
        }
        if(document.getElementById("joy3Div").clientWidth - 20 < width) {
            width = document.getElementById("joy3Div").clientWidth -20
        }
        height = width
        internalFillColor = (typeof parameters.internalFillColor === "undefined" ? "#125097" : parameters.internalFillColor),
        internalLineWidth = (typeof parameters.internalLineWidth === "undefined" ? 2 : parameters.internalLineWidth),
        internalStrokeColor = (typeof parameters.internalStrokeColor === "undefined" ? "#7fb4f0" : parameters.internalStrokeColor),
        externalLineWidth = (typeof parameters.externalLineWidth === "undefined" ? 2 : parameters.externalLineWidth),
        externalStrokeColor = (typeof parameters.externalStrokeColor ===  "undefined" ? "#004dc9" : parameters.externalStrokeColor),
        autoReturnToCenter = (typeof parameters.autoReturnToCenter === "undefined" ? true : parameters.autoReturnToCenter);

    callback = callback || function(StickStatus) {};

    // Create Canvas element and add it in the Container object
    objContainer = document.getElementById(container);
    
    // Fixing Unable to preventDefault inside passive event listener due to target being treated as passive in Chrome [Thanks to https://github.com/artisticfox8 for this suggestion]
    objContainer.style.touchAction = "none";

    canvas = document.createElement("canvas");
    canvas.id = title;
    canvas.className = classname //ZONE CENTER
    if(width === 0) { width = objContainer.clientWidth; }
    if(height === 0) { height = objContainer.clientHeight; }
    canvas.width = width;
    canvas.height = height;
    objContainer.appendChild(canvas);
    context=canvas.getContext("2d");

    pressed = 0; // Bool - 1=Yes - 0=No
    var circumference = 2 * Math.PI;
    var internalRadius = (canvas.width-((canvas.width/2)+10))/2;
    var maxMoveStick = internalRadius + 5;
    var externalRadius = internalRadius + 30;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var directionHorizontalLimitPos = canvas.width / 10;
    var directionHorizontalLimitNeg = directionHorizontalLimitPos * -1;
    var directionVerticalLimitPos = canvas.height / 10;
    var directionVerticalLimitNeg = directionVerticalLimitPos * -1;
    // Used to save current position of stick
    movedX=centerX;
    movedY=centerY;

    // Check if the device support the touch or not
    if("ontouchstart" in document.documentElement)
    {
        canvas.addEventListener("touchstart", onTouchStart, false);
        document.addEventListener("touchmove", onTouchMove, false);
        document.addEventListener("touchend", onTouchEnd, false);
    }
    else
    {
        canvas.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mousemove", onMouseMove, false);
        document.addEventListener("mouseup", onMouseUp, false);
    }
    // Draw the object
    drawExternal();
    drawInternal();

    /******************************************************
     * Private methods
     *****************************************************/

    /**
     * @desc Draw the external circle used as reference position
     */
    function drawExternal()
    {
        context.beginPath();
        context.arc(centerX, centerY, externalRadius, 0, circumference, false);
        context.lineWidth = externalLineWidth;
        context.strokeStyle = externalStrokeColor;
        context.stroke();
    }

    /**
     * @desc Draw the internal stick in the current position the user have moved it
     */
    function drawInternal()
    {
        context.beginPath();
        if(movedX<internalRadius) { movedX=maxMoveStick; }
        if((movedX+internalRadius) > canvas.width) { movedX = canvas.width-(maxMoveStick); }
        if(movedY<internalRadius) { movedY=maxMoveStick; }
        if((movedY+internalRadius) > canvas.height) { movedY = canvas.height-(maxMoveStick); }
        context.arc(movedX, movedY, externalRadius * differenceIntExtCircle, 0, circumference, false);
        // create radial gradient
        var grd = context.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
        // Light color
        grd.addColorStop(0, internalFillColor);
        // Dark color
        grd.addColorStop(1, internalStrokeColor);
        context.fillStyle = grd;
        context.fill();
        context.lineWidth = internalLineWidth;
        context.strokeStyle = internalStrokeColor;
        context.stroke();
    }

    /**
     * @desc Events for manage touch
     */
    function onTouchStart(event) 
    {
        pressed = 1;
    }

    function onTouchMove(event)
    {
        if(pressed === 1 && event.targetTouches[0].target === canvas)
        {
            movedX = event.targetTouches[0].pageX;
            movedY = event.targetTouches[0].pageY;
            // Manage offset
            if(canvas.offsetParent.tagName.toUpperCase() === "BODY")
            {
                movedX -= canvas.offsetLeft;
                movedY -= canvas.offsetTop;
            }
            else
            {
                movedX -= canvas.offsetParent.offsetLeft;
                movedY -= canvas.offsetParent.offsetTop;
            }
            // Delete canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Redraw object
            drawExternal();
            drawInternal();

            // Set attribute of callback
            StickStatus.xPosition = movedX;
            StickStatus.yPosition = movedY;
            StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
            StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
            callback(StickStatus);
        }
    } 

    function onTouchEnd(event) 
    {
        pressed = 0;
        // If required reset position store variable
        if(autoReturnToCenter)
        {
            movedX = centerX;
            movedY = centerY;
        }
        // Delete canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw object
        drawExternal();
        drawInternal();

        // Set attribute of callback
        StickStatus.xPosition = movedX;
        StickStatus.yPosition = movedY;
        StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
        StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
        callback(StickStatus);
    }

    /**
     * @desc Events for manage mouse
     */
    function onMouseDown(event) 
    {
        pressed = 1;
    }

    /* To simplify this code there was a new experimental feature here: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX , but it present only in Mouse case not metod presents in Touch case :-( */
    function onMouseMove(event) 
    {
        if(pressed === 1)
        {
            movedX = event.pageX;
            movedY = event.pageY;
            // Manage offset
            if(canvas.offsetParent.tagName.toUpperCase() == "BODY")
            {
                movedX -= canvas.offsetLeft;
                movedY -= canvas.offsetTop;
            }
            else
            {
                movedX -= canvas.offsetParent.offsetLeft;
                movedY -= canvas.offsetParent.offsetTop;
            }
            // Delete canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Redraw object
            drawExternal();
            drawInternal();

            // Set attribute of callback
            StickStatus.xPosition = movedX;
            StickStatus.yPosition = movedY;
            StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
            StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
            callback(StickStatus);
        }
    }

    function onMouseUp(event) 
    {
        pressed = 0;
        // If required reset position store variable
        if(autoReturnToCenter)
        {
            movedX = centerX;
            movedY = centerY;
        }
        // Delete canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw object
        drawExternal();
        drawInternal();

        // Set attribute of callback
        StickStatus.xPosition = movedX;
        StickStatus.yPosition = movedY;
        StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
        StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
        callback(StickStatus);
    }
    /******************************************************
     * Public methods
     *****************************************************/

    /**
     * @desc The width of canvas
     * @return Number of pixel width 
     */
    this.GetWidth = function () 
    {
        return canvas.width;
    };

    this.updateCircle = function (event)
    {
        // Delete canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Redraw object
        drawExternal();
        drawInternal();

        // Set attribute of callback
        StickStatus.xPosition = movedX;
        StickStatus.yPosition = movedY;
        StickStatus.x = (100*((movedX - centerX)/maxMoveStick)).toFixed();
        StickStatus.y = ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
        callback(StickStatus);
    }

    /**
     * @desc The height of canvas
     * @return Number of pixel height
     */
    this.GetHeight = function () 
    {
        return canvas.height;
    };

    /**
     * @desc The X position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    this.GetPosX = function ()
    {
        return movedX;
    };

    /**
     * @desc The Y position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    this.GetPosY = function ()
    {
        return movedY;
    };

    /**
     * @desc Normalizzed value of X move of stick
     * @return Integer from -100 to +100
     */
    this.GetX = function ()
    {
        if(((100*((movedX - centerX)/maxMoveStick)).toFixed())>100) return 100
        else if(((100*((movedX - centerX)/maxMoveStick)).toFixed())<-100) return -100
        else return (100*((movedX - centerX)/maxMoveStick)).toFixed();
    };

    /**
     * @desc Normalizzed value of Y move of stick
     * @return Integer from -100 to +100
     */
    this.GetY = function ()
    {
        if((((100*((movedY - centerY)/maxMoveStick))*-1).toFixed())>100) return 100
        else if((((100*((movedY - centerY)/maxMoveStick))*-1).toFixed())<-100) return -100
        else return ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
    };
});

export function createJoystick(classname) {
    Joy = new JoyStick('joy3Div', "", "", classname);
    updateJoystickColor()
    if (window.location.pathname.includes("input.html")) {
        var joyX = document.getElementById("joyX");
        var joyY = document.getElementById("joyY");
        setInterval(function(){ joyX.value=Joy.GetX(); });
        setInterval(function(){ joyY.value=Joy.GetY(); });
    }
    setInterval(function(){
        degrees = calcAngleDegrees(Joy.GetX(), Joy.GetY())
        radiants = calcAngleDegrees(Joy.GetX(), Joy.GetY()) / 180.0 * Math.PI
        if(TriggerSwapStatus && JoystickOrTrigger==false) {
            magnitude= leftTriggerValue - rightTriggerValue
            if(Joy.GetY()==0 && Joy.GetX() == 0 && magnitude > 0) radiants = 1/2 * Math.PI // this establish that if i don't move the joystick and i use the triggers to change magnitude the radiants sets to 1/2π
            if(Joy.GetY()==0 && Joy.GetX() == 0 && magnitude < 0) {
                radiants = 3/2 * Math.PI // this establish that if i don't move the joystick and i use the triggers to change magnitude the radiants sets to 1/2π
                magnitude = -magnitude
            }
        }
        else if(!TriggerSwapStatus && JoystickOrTrigger==false) {
            magnitude= rightTriggerValue -leftTriggerValue
            console.log(magnitude)
            if(Joy.GetY()==0 && Joy.GetX() == 0 && magnitude > 0) radiants = 1/2 * Math.PI // this establish that if i don't move the joystick and i use the triggers to change magnitude the radiants sets to 1/2π
            if(Joy.GetY()==0 && Joy.GetX() == 0 && magnitude < 0) {
                radiants = 3/2 * Math.PI // this establish that if i don't move the joystick and i use the triggers to change magnitude the radiants sets to 1/2π
                magnitude = -magnitude
            }
        }
        if(JoystickOrTrigger==true || pressed == 1){
            magnitude = Math.sqrt( Joy.GetX() ** 2.0 + Joy.GetY() ** 2.0 ) / 100
        }
        if(magnitude>1) magnitude = 1
        if(rotationLeft == 1) {
            if(TriggerSwapStatus && JoystickOrTrigger==false) {
                magnitude= leftTriggerValue - rightTriggerValue
            }
            else if(!TriggerSwapStatus && JoystickOrTrigger==false) {
                magnitude= rightTriggerValue -leftTriggerValue
            }
            else magnitude = 1
            Fl = -1 * magnitude
            Bl = -1 * magnitude
            Fr = 1 * magnitude
            Br = 1 * magnitude
        }
        else if(rotationRight == 1) {
            if(TriggerSwapStatus && JoystickOrTrigger==false) {
                magnitude= leftTriggerValue - rightTriggerValue
            }
            else if(!TriggerSwapStatus && JoystickOrTrigger==false) {
                magnitude= rightTriggerValue -leftTriggerValue
            }
            else magnitude = 1
            Fl = 1 * magnitude
            Bl = 1 * magnitude
            Fr = -1 * magnitude
            Br = -1 * magnitude
        }
        else {
            Fr = Math.round((Math.sin((radiants - (1/4) * Math.PI).toFixed(5))) * 100000 * magnitude) / 100000
            Bl = Math.round((Math.sin((radiants - (1/4) * Math.PI).toFixed(5))) * 100000 * magnitude) / 100000
            Fl = Math.round((Math.sin((radiants + (1/4) * Math.PI).toFixed(5))) * 100000 * magnitude) / 100000
            Br = Math.round((Math.sin((radiants + (1/4) * Math.PI).toFixed(5))) * 100000 * magnitude) / 100000
        }
        if (window.location.pathname.includes("input.html")) {
            document.getElementById("degrees").innerHTML= degrees
            document.getElementById("radiant").innerHTML= radiants
            document.getElementById("magnitude").innerHTML= magnitude
            document.getElementById("FR-BL").innerHTML = Fr
            document.getElementById("FL-BR").innerHTML = Fl
        }
        updateJoystickColor()
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setInterval(function(){X = Joy.GetX()});
    setInterval(function(){Y = Joy.GetY()});
});

// Function to update gamepad state and log changes
function updateGamepadState() {
  // Get the first connected gamepad (you can loop through gamepads if multiple are connected)
  const gamepad = navigator.getGamepads()[0];

  if (gamepad) {

    // Compare button values and update HTML elements
    for (let i = 0; i < gamepad.buttons.length; i++) {
        const buttonValue = gamepad.buttons[i].value;
        if (window.location.pathname.includes("input.html")) {
            document.getElementById(`B${i}`).value = 0;
            document.getElementById(`B${i}`).value = buttonValue;
        }
        if(i==10 && buttonValue==1 && JoystickSwapStatus == false) {
            SwapJoystick()
        }
        if(i==11 && buttonValue==1 && JoystickSwapStatus == true) {
            SwapJoystick()
        }
        if(i==4 && buttonValue==1 && TriggerSwapStatus == false) {
            SwapTrigger()
        }
        if(i==5 && buttonValue==1 && TriggerSwapStatus == true) {
            SwapTrigger()
        }
        if(i==4 && buttonValue==1|| i==5 && buttonValue==1) {
            JoystickOrTrigger=false
        }
        if(i==9 && buttonValue==1 && change_theme_color_button_value == 0) {
            change_theme_color()
            change_theme_color_button_value = 1
        }
        if(i==9 && buttonValue==0 && change_theme_color_button_value == 1) {
            change_theme_color_button_value = 0
        }
        if(i==10 && buttonValue==1|| i==11 && buttonValue==1) {
            JoystickOrTrigger=true
        }
        if(i==14 && buttonValue==1) { 
            rotationLeft = 1
        }
        if(i==14 && buttonValue==0) {
            rotationLeft = 0
        }
        if(i==15 && buttonValue==1) {
            rotationRight = 1
        }
        if(i==15 && buttonValue==0) {
            rotationRight = 0
        }
        // if(buttonValue==1) console.log(i)
        leftTriggerValue = gamepad.buttons[6].value
        rightTriggerValue = gamepad.buttons[7].value
    }


    // Read analog values of left and right joysticks
    const leftStickX = gamepad.axes[0];
    const leftStickY = gamepad.axes[1];
    const rightStickX = gamepad.axes[2];
    const rightStickY = gamepad.axes[3];

    // Update HTML elements with analog values
    if (window.location.pathname.includes("input.html")) {
        document.getElementById("LeftStickX").value = leftStickX;
        document.getElementById("LeftStickY").value = -leftStickY;
        document.getElementById("RightStickX").value = rightStickX;
        document.getElementById("RightStickY").value = -rightStickY;
    }

    var valueX
    var valueY

    if(JoystickSwapStatus) {
        valueX = leftStickX
        valueY = leftStickY
    }
    else {
        valueX = rightStickX
        valueY = rightStickY
    }

    if((Math.abs(valueY*100)>deadZoneValue && Math.abs(valueX*100)>deadZoneValue) || pressed == 0) {
        if(Math.abs(valueX*100)>deadZoneValue) movedX = (height/2)+(valueX * (height/4));
        else movedX = (height/2)
        if(Math.abs(valueY*100)>deadZoneValue) movedY = (height/2)+(valueY * (height/4));
        else movedY = (height/2)
        Joy.updateCircle()
    }
  }

  // Request the next frame
  requestAnimationFrame(updateGamepadState);
}

// Listen for gamepad connections
window.addEventListener("gamepadconnected", (e) => {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length
  );

  if (window.location.pathname.includes("input.html")) {
    document.getElementById("GamepadStatus").innerHTML="Gamepad connected at index"+ e.gamepad.index+": "+ e.gamepad.id+". "+  e.gamepad.buttons.length +" buttons, "+e.gamepad.axes.length+" axes."
  }

  // Start updating gamepad state
  updateGamepadState();
});

// Listen for gamepad disconnections
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(
    "Gamepad disconnected from index %d: %s",
    e.gamepad.index,
    e.gamepad.id
  );
  if (window.location.pathname.includes("input.html")) {
    document.getElementById("GamepadStatus").innerHTML= "Gamepad disconnected from index "+e.gamepad.index+": "+e.gamepad.id
  }
});

function SwapJoystick() {
        if(JoystickSwapStatus) {
            JoystickSwapStatus=false
            if (window.location.pathname.includes("input.html")) {
                document.getElementById("JoyStickSwap").innerText = "LeftStick"
            }
        }
        else {
            JoystickSwapStatus = true
            if (window.location.pathname.includes("input.html")) {
                document.getElementById("JoyStickSwap").innerText = "RightStick"
            }
        }
}

function SwapTrigger() {
    if(TriggerSwapStatus) {
        TriggerSwapStatus=false
    }
    else {
        TriggerSwapStatus = true
    }
}

function calcAngleDegrees(x, y) {
    if((Math.atan2(y, x) * 180) / Math.PI <0) return (Math.atan2(y, x) * 180) / Math.PI +360
    else return (Math.atan2(y, x) * 180) / Math.PI
  }

function changeInternalDiff(value) {
    if(value > 0 && value < 1) {
        differenceIntExtCircle = value
        Joy.updateCircle()
    }
}

function updateJoystickColor() {
    if (localStorage.theme === 'dark') {
        internalFillColor = "#125097"
        internalStrokeColor = "#7fb4f0"
        externalStrokeColor = "#004dc9"
    } else{
        internalFillColor = "#971231"
        internalStrokeColor = "#f07fa7"
        externalStrokeColor = "#c70032"
    }
    Joy.updateCircle()
}