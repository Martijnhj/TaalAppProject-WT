package com.martijn.taalapp.rest;

import com.martijn.taalapp.controller.CourseService;
import com.martijn.taalapp.domein.Course;
import com.martijn.taalapp.domein.Les;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CourseEndpoint {
    @Autowired
    CourseService cs;

    @GetMapping("/courseLijst")
    public Iterable<Course> getCourseList() {
        return cs.getCourseList();
    }

    @GetMapping("/courseLessenLijst{id}")
    public Iterable<Les> getCourseLessenLijst(@PathVariable String id) {
        return cs.getCourseLessenLijst(Long.parseLong(id));
    }

    @GetMapping("/specificCourseVars{id}")
    public Course getSpecificCourse(@PathVariable String id) {
        return cs.getSpecificCourse(Long.parseLong(id));
    }

    @PostMapping("/courseMaken")
    public void addCourse(@RequestBody Course course) {
        cs.newCourse(course);
    }

    @PostMapping("/lesToevoegen{id}")
    public void addLesson(@PathVariable String id, @RequestBody Les les) {
        cs.addLessonToCourse(Long.parseLong(id), les);
    }

    @DeleteMapping("/deleteCourse{id}")
    public void deleteCourse(@PathVariable String id) {
        cs.deleteCourse(Long.parseLong(id));
    }

    @DeleteMapping("/deleteLes{idLes}binnen{idCourse}")
    public void deleteLessonFromCourse(@PathVariable String idLes, @PathVariable String idCourse) {
        cs.deleteLesFromCourse(Long.parseLong(idCourse), Long.parseLong(idLes));
    }

    @PutMapping("/changeCourseName{newNaam}in{id}")
    public void changeCourseName(@PathVariable String id, @PathVariable String newNaam){
        cs.changeNameCourse(Long.parseLong(id), newNaam);
    }


}
