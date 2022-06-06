/* Coordenadas para o canvas*/

let newBase = [320, 285, 440, 285];
let newColumn = [390, 285, 390, 55];
let newColumnExtend = [310, 55, 390, 55];
let newColumnExtend2 = [310, 70, 310, 55];
let newHead = [10, 92, 20, 0, 2 * Math.PI];
let newBody = [310, 170, 310, 115];
let leftEye = [301, 87, 5, 0, 2 * Math.PI];
let rightEye = [318, 87, 5, 0, 2 * Math.PI];
let nose = [310, 95, 1.5, 0, 2 * Math.PI];
let scar = [323, 76, 295, 103];
let upperLip = [310, 82, 18, 0, 1 * Math.PI];
let teethLine = [310, 85, 20, 0, 1 * Math.PI];
let teeth = [295, 94, 295, 105];
let body = [305, 100, 4, 60];
let leftLeg = [312, 170, 295, 225];
let rightLeg = [307, 170, 325, 225];
let leftArm = [313, 125, 292, 140];
let rightArm = [306, 125, 327, 140];

function callFunc(func, piece) {
    func(piece);
}

function drawLines(piece, wich) {
    let pieceCoordinate = piece;

    if (wich == "teeth") {
        pencil.lineWidth = 0.6;
        for (let j = 0; j <= 6; j++) {
            pencil.beginPath();
            pencil.moveTo(pieceCoordinate[0], pieceCoordinate[1]);
            pencil.lineTo(pieceCoordinate[2], pieceCoordinate[3]);
            pencil.closePath();
            pencil.stroke();
            pieceCoordinate[0] = pieceCoordinate[0] + 5;
            pieceCoordinate[1] = pieceCoordinate[1] + 2;
            pieceCoordinate[2] = pieceCoordinate[0];
            pieceCoordinate[3] = pieceCoordinate[3] + 2;
            if (j >= 3) {
                pieceCoordinate[1] = pieceCoordinate[1] - 4;
                pieceCoordinate[3] = pieceCoordinate[3] - 4;
            }
        }
    } else {
        pencil.lineWidth = 2;

        pencil.beginPath();
        pencil.moveTo(pieceCoordinate[0], pieceCoordinate[1]);
        pencil.lineTo(pieceCoordinate[2], pieceCoordinate[3]);
        pencil.closePath();
        pencil.stroke();
    }
}

function drawLineX(piece, func, nextPiece) {
    let pieceCoord = piece;
    let initPointX = pieceCoord[0];
    pencil.lineWidth = 5;
    pencil.lineCap = "round";
    pencil.lineJoin = "round";
    pencil.strokeStyle = "aliceblue";
    pencil.shadowColor = "black";
    pencil.shadowBlur = 3;

    let draw = setInterval(() => {
        if (initPointX < pieceCoord[2]) {
            pencil.beginPath();
            pencil.moveTo(initPointX, pieceCoord[1]);
            pencil.lineTo(initPointX + 5, pieceCoord[3]);
            pencil.closePath();
            pencil.stroke();
            initPointX += 5;
        } else if (initPointX == pieceCoord[2]) {
            clearInterval(draw);
            if (func != undefined && nextPiece != undefined)
                callFunc(func, nextPiece);
        }
    }, 30);
}

function drawLineY(piece, wich, func, nextPiece) {
    let pieceCoord = piece;
    let initPointY = pieceCoord[1];
    pencil.lineCap = "round";
    pencil.lineJoin = "round";
    if (wich == "body") {
        pencil.lineWidth = 4;
    } else {
        pencil.lineWidth = 5;
    }

    let draw = setInterval(() => {
        if (initPointY > pieceCoord[3]) {
            pencil.beginPath();
            pencil.moveTo(pieceCoord[0], initPointY);
            pencil.lineTo(pieceCoord[2], initPointY - 5);
            pencil.closePath();
            pencil.stroke();
            initPointY -= 5;
        } else if (initPointY >= pieceCoord[3]) {
            if (func != undefined && nextPiece != undefined)
                callFunc(func, nextPiece);
            clearInterval(draw);
        }
    }, 20);
}

function drawCircles(piece, style) {
    let pieceCoord = piece;

    pencil.beginPath();
    pencil.arc(
        pieceCoord[0],
        pieceCoord[1],
        pieceCoord[2],
        pieceCoord[3],
        pieceCoord[4]
    );

    if (style == "fill") {
        pencil.fill();
    } else {
        pencil.lineWidth = 0.5;
        pencil.stroke();
    }
}

const drawHead = () => {
    let pieceCoord = newHead;
    pencil.lineWidth = 2.5;
    pencil.fillStyle = "black";
    pencil.strokeStyle = "black";
    pencil.shadowColor = "darkred";
    pencil.shadowBlur = 2;

    let draw = setInterval(() => {
        if (pieceCoord[0] <= 310) {
            pencil.clearRect(pieceCoord[0] - 36, pieceCoord[1] - 24, 45, 48);
            pencil.beginPath();
            pencil.arc(
                pieceCoord[0],
                pieceCoord[1],
                pieceCoord[2],
                pieceCoord[3],
                pieceCoord[4]
            );

            pieceCoord[0] += 10;

            pencil.stroke();
        } else {
            clearInterval(draw);
            drawCircles(leftEye, "fill");
            drawCircles(rightEye, "fill");
            drawCircles(nose, "fill");
            drawCircles(upperLip, "stroke");
            drawCircles(teethLine, "stroke");
            drawLines(teeth, "teeth");
            drawLines(scar, "scar");
        }
    }, 15);
};

function drawLeftDiagonals(piece, wich) {
    let pieceCoord = piece;
    let initPointX = pieceCoord[0];
    let initPointY = pieceCoord[1];
    pencil.lineWidth = 3;
    pencil.shadowBlur = 1;

    let draw = setInterval(() => {
        if (initPointX > pieceCoord[2] && initPointY < pieceCoord[3]) {
            pencil.beginPath();
            pencil.moveTo(initPointX, initPointY);
            pencil.lineTo(initPointX, initPointY);
            pencil.closePath();
            pencil.stroke();
            if (wich == "legs") {
                initPointX += 0.5;
                initPointY += 1.5;
            } else {
                initPointY += 0.5;
                initPointX += 1;
            }
        } else {
            clearInterval(draw);
        }
    }, 5);
}

function drawRightDiagonals(piece, wich) {
    let pieceCoord = piece;
    let initPointX = pieceCoord[0];
    let initPointY = pieceCoord[1];
    pencil.lineWidth = 3;

    let draw = setInterval(() => {
        if (initPointX < pieceCoord[2] && initPointY < pieceCoord[3]) {
            pencil.beginPath();
            pencil.moveTo(initPointX, initPointY);
            pencil.lineTo(initPointX, initPointY);
            pencil.closePath();
            pencil.stroke();
            if (wich == "legs") {
                initPointX -= 0.5;
                initPointY += 1.5;
            } else {
                initPointY += 0.5;
                initPointX -= 1;
            }
        } else {
            clearInterval(draw);
        }
    }, 5);
}
