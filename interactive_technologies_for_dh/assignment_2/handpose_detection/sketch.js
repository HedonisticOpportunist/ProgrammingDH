/*
Code modified from https://editor.p5js.org/ml5/sketches/QGH3dwJ1A. 
*/

// Commonly used variables. 
let handPose;
let video;
let hands = [];

async function setup() {
  // Initialize the handPose model.
  handPose = await ml5.handPose();
  createCanvas(640, 480);

  // Create the webcam video and hide it.
  video = createCapture(VIDEO);
  video.size(800, 680);
  video.hide();

  // Start detecting hands from the webcam video.
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video.
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill("#5459AC"); // Funky retro colour.
      noStroke();
      ellipse(keypoint.x, keypoint.y, 10, 10); // Draw an ellipse for each keypoint.
    }
  }
}

function gotHands(results) {
  // Save the output to the hands array.
  hands = results;
}
