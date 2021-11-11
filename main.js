song = null;
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
slw = 0;
srw = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (srw > 0.2) {
        
        circle(rwx, rwy, 20);

        if (rwy > 0 && rwy <= 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        } else if (rwy > 100 && rwy <= 200) {
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        } else if (rwy > 200 && rwy <= 300) {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        } else if (rwy > 300 && rwy <= 400) {
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        } else if (rwy > 400 && rwy <= 500) {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }


    if (slw > 0.2) {
        circle(lwx, lwy, 20);
        InNumberlwy = Number(lwy);
        removeDecimals = floor(InNumberlwy);
        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Posenet initialized")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        slw = results[0].pose.keypoints[9].score;
        srw = results[0].pose.keypoints[10].score;

        console.log("score left wrist = " + slw + ", score right wrist = " + srw);

        //left wrist
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("lwx = " + lwx + " lwy = " + lwy + ".");

        //right wrist
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log("rwx = " + rwx + " rwy = " + rwy + ".");
    }

}