package org.acme;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;


import org.eclipse.microprofile.reactive.messaging.Outgoing;



@ApplicationScoped
public class TempGenerator {

    Device esp8266 = new Device("ESP8266-01");


    @Outgoing("device-temp")
    public Multi<String> generate() {
        return Multi.createFrom().ticks().every(Duration.ofMillis(500))
                .onOverflow().drop()
                .map(tick -> {
                    String data = esp8266.toString();
                    System.out.println(data);
                    return data;
                });
    }

}
