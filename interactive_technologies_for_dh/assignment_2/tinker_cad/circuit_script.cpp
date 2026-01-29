// Variables 
int buttonPin = 12;
int ledPin = 13;
int buttonState = 0; 

void setup()
{
  // pinMode(LED_BUILTIN, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop()
{
  buttonState = digitalRead(buttonPin); 
  
  if (buttonState == LOW) 
  {
    digitalWrite(ledPin, HIGH);
  }
  else 
  {
    digitalWrite(ledPin, LOW);
  }
}
