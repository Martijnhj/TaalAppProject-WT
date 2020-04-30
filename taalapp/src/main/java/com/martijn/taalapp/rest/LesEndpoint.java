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
        return ls.getLesVertalingenLijst(Long.parseLong(id));
    }

    @GetMapping("/specificLesVars{id}")
    public Les getSpecificLes(@PathVariable String id) {
        return ls.getSpecificLes(Long.parseLong(id));
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

    @PutMapping("/changeLessonName{newNaam}in{id}")
    public void changeLessonName(@PathVariable String id, @PathVariable String newNaam) {
        ls.changeNameLes(Long.parseLong(id), newNaam);
    }


}
