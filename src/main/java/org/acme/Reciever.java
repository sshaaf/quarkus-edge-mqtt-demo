package org.acme;
import jakarta.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;

import io.smallrye.reactive.messaging.annotations.Broadcast;

@ApplicationScoped
public class Reciever {

    @Incoming("devices")
    @Outgoing("my-data-stream")
    @Broadcast
    public String process(byte[] data) {
        String d = new String(data);
        System.out.println("Receiving readings: " + d);
        return d;
    }

}
