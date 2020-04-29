package com.martijn.taalapp.rest;

import com.martijn.taalapp.controller.TaalService;
import com.martijn.taalapp.domein.Course;
import com.martijn.taalapp.domein.Taal;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TaalEndpoint {
    @Autowired
    TaalService ts;

    @GetMapping("/taalLijst")
    public Iterable<Taal> getTaalLijst() {
        return ts.getTaalList();
    }

    @GetMapping("/taalCoursesLijst{id}")
    public Iterable<Course> getTaalCoursesLijst(@PathVariable String id){
        return ts.getTaalCoursesLijst(Long.parseLong(id));
    }

    @GetMapping("/specificTaalVars{id}")
    public Taal getSpecificTaal(@PathVariable String id) {
        return ts.getSpecificTaal(Long.parseLong(id));
    }

    @GetMapping("/testTaal{numberWords}in{idTaal}")
    public Iterable<Vertaling> getTestingSetTaal(@PathVariable String numberWords, @PathVariable String idTaal) {
        return ts.getTestingSetTaal(Integer.parseInt(numberWords), Long.parseLong(idTaal));
    }

    @GetMapping("/testCourse{numberWords}in{idCourse}")
    public Iterable<Vertaling> getTestingSetCourse(@PathVariable String numberWords, @PathVariable String idCourse) {
        return ts.getTestingSetCourse(Integer.parseInt(numberWords), Long.parseLong(idCourse));
    }

    @PostMapping("/taalMaken")
    public void taalMaken(@RequestBody Taal taal) {
        ts.newTaal(taal);
    }

    @PostMapping("/courseToevoegen{id}")
    public void addCourse(@PathVariable String id, @RequestBody Course course) {
        ts.addCourseToTaal(Long.parseLong(id), course);
    }

    @DeleteMapping("/deleteTaal{id}")
    public void deleteTaal(@PathVariable String id) {
        ts.deleteTaal(Long.parseLong(id));
    }

    @DeleteMapping("/deleteCourse{idCourse}binnen{idTaal}")
    public void deleteCourseBinnenTaal(@PathVariable String idCourse, @PathVariable String idTaal) {
        ts.deleteCourseFromTaal(Long.parseLong(idTaal), Long.parseLong(idCourse));
    }

    @PutMapping("/changeTaalName{newNaam}in{id}")
    public void changeTaalName(@PathVariable String id, @PathVariable String newNaam) {
        ts.changeNaamTaal(Long.parseLong(id), newNaam);
    }
}
