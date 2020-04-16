package com.martijn.taalapp.rest;

import com.martijn.taalapp.controller.TaalService;
import com.martijn.taalapp.domein.Course;
import com.martijn.taalapp.domein.Taal;
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

    @PostMapping("/taalMaken")
    public void taalMaken(@RequestBody Taal taal) {
        ts.newTaal(taal);
    }

    @PostMapping("/courseToevoegen{id}")
    public void addCourse(@PathVariable String id, @RequestBody Course course) {
        ts.addCourseToTaal(Long.parseLong(id), course);
    }
}
