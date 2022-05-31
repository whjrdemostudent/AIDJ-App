song1 = "";
song2 = "";
leftWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1status = "";
song2status = "";
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("song1.mp3");
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on(pose, gotposes)

    video = createCapture(VIDEO)
    video.hide()
}

function modelLoaded() {
    console.log("poseNet has been initialized.")
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
    }

}

function draw() {
    image(video, 0, 0, 600, 500)
    song1status = song1.isPlaying()
    song2status = song2.isPlaying()

    fill("red");
    stroke("blue");

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20)
        song1.stop()
        if(song2status == false){
            song2.play()
            document.getElementById("song").innerHTML = "playing song 1"
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20)
        song2.stop()
        if(song1status == false){
            song1.play()
            document.getElementById("song").innerHTML = "playing song 2"
        }
    }
}

function play() {
    song.play();
    song.setVolume(1)
    song.rate(1)
}