package com.martijn.taalapp.rest;

import com.martijn.taalapp.controller.CourseService;
import com.martijn.taalapp.domein.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseEndpoint {
    @Autowired
    CourseService cs;

    @GetMapping("/courseLijst")
    public Iterable<Course> getCourseList() {
        return cs.getCourseList();
    }

    @PostMapping("/courseMaken")
    public void addCourse(@RequestBody Course course) {
        cs.newCourse(course);
    }
}
