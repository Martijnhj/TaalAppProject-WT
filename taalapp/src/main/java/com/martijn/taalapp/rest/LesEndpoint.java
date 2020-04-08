package com.martijn.taalapp.rest;


import com.martijn.taalapp.controller.LesService;
import com.martijn.taalapp.controller.VertalingService;
import com.martijn.taalapp.domein.Les;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LesEndpoint {
    @Autowired
    LesService ls;


    /*@PostMapping("/vertalingToevoegen")
    public void vertalingToevoegen(@RequestBody Vertaling vertaling) {

    }*/

    @PostMapping("/lesMaken")
    public void lesMaken() {
        ls.newLes();
    }

}
