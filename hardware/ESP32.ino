#include <Arduino.h>
#include <WiFi.h>
#include <WiFiManager.h>
#include <EmonLib.h>
#include <WebServer.h>  // Troquei para WebServer do ESP32
#include <ArduinoJson.h>

const int relayPin1 = 27; 
const int relayPin2 = 26; 
const int buttonPin = 13; 
bool lastButtonState = HIGH; 
bool relayState1 = LOW; 
bool relayState2 = LOW; 
unsigned long lastDebounceTime = 0; 
unsigned long debounceDelay = 50; 
const int sensorPin = 34; 

EnergyMonitor emon1;  
unsigned long lastReadTime = 0; 
unsigned long startTime = 0;  // Para controlar o tempo de estabilização.

String deviceID = "ESP32_001";  // ID gerado para o ESP

// Instancia o servidor web
WebServer server(80);

void setup() {
  Serial.begin(115200);
  pinMode(relayPin1, OUTPUT);
  pinMode(relayPin2, OUTPUT);
  digitalWrite(relayPin1, relayState1);
  digitalWrite(relayPin2, relayState2); 
  pinMode(buttonPin, INPUT_PULLUP);

  // Inicializa o WiFiManager
  WiFiManager wifiManager;
  wifiManager.autoConnect("ESP32_AccessPoint");

  Serial.print("Conectado a Wi-Fi: ");
  Serial.println(WiFi.localIP());

  // Inicializa o sensor de corrente
  emon1.current(sensorPin, 50.0);

  startTime = millis();  // Inicia o contador de estabilização

  // Definindo as rotas do servidor Web

  // Rota 1: Retorna o ID e IP do ESP32
  server.on("/id", HTTP_GET, [](){
    String json = "{\"id\":\"" + deviceID + "\", \"ip\":\"" + WiFi.localIP().toString() + "\"}";
    server.send(200, "application/json", json);
  });

  // Rota 2: Retorna as 30 últimas leituras de consumo
  server.on("/leitura", HTTP_GET, [](){
    StaticJsonDocument<1024> doc;
    for (int i = 0; i < 30; i++) {
      // Exemplo de leitura de energia (aqui estamos usando valores fictícios para simulação)
      unsigned long timestamp = millis();
      float consumo = random(50, 150);  // Consumo fictício de 50 a 150W
      JsonObject leitura = doc.createNestedObject();
      leitura["timestamp"] = timestamp;
      leitura["consumo"] = consumo;
    }
    
    String response;
    serializeJson(doc, response);
    server.send(200, "application/json", response);
  });

  // Rota 3: Liga/desliga os relés
  server.on("/rele/1", HTTP_POST, [](){
    String state = server.arg("state");
    if (state == "on") {
      relayState1 = HIGH;
      digitalWrite(relayPin1, relayState1);
    } else if (state == "off") {
      relayState1 = LOW;
      digitalWrite(relayPin1, relayState1);
    }
    server.send(200, "text/plain", "Relay 1 is now " + state);
  });

  server.on("/rele/2", HTTP_POST, [](){
    String state = server.arg("state");
    if (state == "on") {
      relayState2 = HIGH;
      digitalWrite(relayPin2, relayState2);
    } else if (state == "off") {
      relayState2 = LOW;
      digitalWrite(relayPin2, relayState2);
    }
    server.send(200, "text/plain", "Relay 2 is now " + state);
  });

  // Inicia o servidor
  server.begin();
}

void loop() {
  // Lógica de botão para alternar relé
  bool reading = digitalRead(buttonPin);
  if (reading != lastButtonState) {
    lastDebounceTime = millis(); 
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading == LOW && lastButtonState == HIGH) {
      relayState1 = !relayState1;
      relayState2 = !relayState2;
      digitalWrite(relayPin1, relayState1);
      digitalWrite(relayPin2, relayState2);
      Serial.println("Relays toggled");
    }
  }
  lastButtonState = reading;

  // Leitura de corrente
  if (millis() - lastReadTime > 1000) {
    lastReadTime = millis();
    double Irms = emon1.calcIrms(1480);  // Exemplo de cálculo
    Serial.print("Corrente RMS: ");
    Serial.println(Irms);
  }

  server.handleClient(); // Certifique-se de chamar o servidor a cada loop
}
