/*
Code modified from https://editor.p5js.org/ml5/sketches/hMN9GdrO3 
*/

// Commonly used variables.
let video;
let bodyPose;
let poses = [];
let connections;

async function setup() {
  // Load the bodyPose model.
  bodyPose = await ml5.bodyPose();
  createCanvas(640, 480);

  // Create the webcam video and hide it.
  video = createCapture(VIDEO);
  video.size(800, 680);
  video.hide();

  // Start detecting pose from the webcam video.
  bodyPose.detectStart(video, gotPoses);

  // Get the skeleton connection information.
  connections = bodyPose.getSkeleton();
}

function draw() {
  // Draw the webcam video.
  image(video, 0, 0, width, height);

  // Draw the skeleton connections.
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];

      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke("#F78D60"); // Orange color for connections.
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points.
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1.
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

function gotPoses(results) {
  // Save the output to the poses array.
  poses = results;
}
