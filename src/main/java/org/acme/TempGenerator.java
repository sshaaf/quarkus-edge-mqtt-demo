package org.acme;

import java.util.concurrent.TimeUnit;

import javax.enterprise.context.ApplicationScoped;

import io.reactivex.BackpressureStrategy;
import org.eclipse.microprofile.reactive.messaging.Outgoing;

import io.reactivex.Flowable;

@ApplicationScoped
public class TempGenerator {

    Device esp8266 = new Device("ESP8266-01");

    @Outgoing("device-temp")
    public Flowable<String> generate() {
        return Flowable.interval(2, TimeUnit.SECONDS)
                .onBackpressureDrop()
                .map(t -> {
                    String data = esp8266.toString();
                    System.out.println(data);
                    return data;
                });
    }

}
