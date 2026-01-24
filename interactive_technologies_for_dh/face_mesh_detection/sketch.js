/*
Code modified from https://editor.p5js.org/ml5/sketches/lCurUW1TT 
*/

// Commonly used variables.
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 2, refineLandmarks: true, flipHorizontal: true };

async function setup() {
  // Initialize the faceMesh model.
  faceMesh = await ml5.faceMesh(options);
  createCanvas(640, 480);

  // Create the webcam video and hide it.
  video = createCapture(VIDEO);
  video.size(800, 680);
  video.hide();

  // Start detecting faces from the webcam video.
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video.
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill("#000080"); // Spooky face colour.
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

function gotFaces(results) {
  // Save the output to the faces array.
  faces = results;
}
