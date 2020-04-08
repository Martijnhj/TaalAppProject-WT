package com.martijn.taalapp.rest;


import com.martijn.taalapp.controller.LesService;
import com.martijn.taalapp.controller.VertalingService;
import com.martijn.taalapp.domein.Les;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LesEndpoint {
    @Autowired
    LesService ls;


    /*@PostMapping("/vertalingToevoegen")
    public void vertalingToevoegen(@RequestBody Vertaling vertaling) {

    }*/

    @GetMapping("/lesLijst")
    public Iterable<Les> getLestLijst() {
        return ls.getLesLijst();
    }

    @GetMapping("/lesVertalingen{id}")
    public Iterable<Vertaling> getLesVertalingenLijst(@PathVariable String id) {
        try {
            Thread.sleep(100); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }

        return ls.getLesVertalingenLijst(Long.parseLong(id));
    }

    @PostMapping("/lesMaken")
    public void lesMaken(@RequestBody Les les) {
        ls.newLes(les);
    }

    @PostMapping("/vertalingToevoegen{id}")
    public void vertalingToevoegen(@PathVariable String id, @RequestBody Vertaling vertaling) {
        ls.addVertalingToLes(Long.parseLong(id), vertaling);
    }

    @DeleteMapping("/deleteVertaling{idLes}en{idVertaling}")
    public void vertalingVerwijderenVanLes(@PathVariable String idLes, @PathVariable String idVertaling) {
        ls.removeVertalingFromLes(Long.parseLong(idLes), Long.parseLong(idVertaling));
    }

    @DeleteMapping("/deleteLesson{id}")
    public void deleteLesson(@PathVariable String id){
        ls.deleteLes(Long.parseLong(id));
    }



}
