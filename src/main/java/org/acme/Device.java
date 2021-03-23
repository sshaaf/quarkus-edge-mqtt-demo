package org.acme;

import java.util.Random;

public class DeviceData {

    private String deviceName = null;
    private double humidity = 0.0f;
    private double temp = 0.0f;

    private Random random = new Random();

    public DeviceData(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getTemp() {
        int min = -40;
        int max = 50;
        int randomInt = random.nextInt((min -max )+1);
        float temp = randomInt / 1000.00f;
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }
}
