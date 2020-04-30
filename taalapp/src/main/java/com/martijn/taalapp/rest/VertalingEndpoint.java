package com.martijn.taalapp.rest;


import com.martijn.taalapp.controller.VertalingService;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class VertalingEndpoint {
    @Autowired
    VertalingService vs;

    @GetMapping("/woorden")
    public Iterable<Vertaling> vb() {
        return vs.vertalingLijst();
    }

    @GetMapping(path="/G{id}")
    public Optional<Vertaling> getWoord(@PathVariable String id) {
        //id = id.replace("D","");
        return vs.findWoord(Long.parseLong(id));
    }

    @PostMapping("/addWoord")
    public void voegWoordToe(@RequestBody Vertaling vertaling) {
        vs.addVertaling(vertaling);
    }

    @DeleteMapping(path = "/D{id}")
    public String deleteWoord(@PathVariable String id) {
        vs.deleteVertaling(Long.parseLong(id));
        return "yes";
    }

    @PutMapping(path = "/C{id}")
    public void changeWoord(@PathVariable String id, @RequestBody Vertaling vertaling) {
        vs.updateWoord(Long.parseLong(id), vertaling);
    }


   /* @DeleteMapping(path = "/testingSomething")
    public String showIT(@RequestParam String woord1, @RequestParam String woord2 ) {
        System.out.println(woord1);
        System.out.println(woord2);
        return "gelukt";
    }


    @GetMapping("/proberen")
    public void proberen() {
        Iterable<Vertaling> iv = vs.zoekSpecifiekeInhoud(" ");
        for (Vertaling vertaling : iv) {
            System.out.println(vertaling.getPrimaryLanguage());
        }
    }*/
}

