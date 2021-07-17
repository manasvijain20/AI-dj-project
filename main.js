
billie = "";
olivia = "";
leftwrist_y_score = 0;
rightwrist_y_score = 0;
song1_status = "";
song2_status = "" 
function setup(){
    canvas = createCanvas(600,450);
    canvas.position(330,210);

    video = createCapture(VIDEO);
    video.hide();
    //video.size(500,500);
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose',gotPoses);

}
function draw(){
    image(video,0,0,600,450);
    fill("#ff0000");
    //billie elish
    song1_status = billie.isPlaying();
    //olivia rodrigo
    song2_status = olivia.isPlaying();

    if(rightwrist_y_score > 0.2 ){
        circle(rightWrist_x,rightWrist_y,20);
        olivia.stop();
        if (song1_status == false){
            billie.play();
            document.getElementById("song_name").innerHTML = "Billie Elish is playing";
        }
    }
    if(leftwrist_y_score > 0.2 ){
        circle(leftWrist_x,leftWrist_y,20);
        billie.stop();
        if (song1_status == false){
            olivia.play();
            document.getElementById("song_name").innerHTML = "Olivia Rodrigo is playing";
        }
    }
}


function modelloaded(){
    console.log("model is loaded");
}
function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        leftwrist_y_score = results[0].pose.keypoints[9].score;
        rightwrist_y_score = results[0].pose.keypoints[10].score;
        console.log("this is the score: "+leftwrist_y_score);
        leftWrist_y = results[0].pose.leftWrist.y ;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_x = results[0].pose.leftWrist.x ;
        console.log("wrist position" + leftWrist_y,rightWrist_y)
        rightWrist_x = results[0].pose.rightWrist.x;
    }
}
function preload(){
  billie = loadSound("billie.mp3");
  olivia = loadSound("olivia.mp3");
}
function play(){
    song.play();
}
