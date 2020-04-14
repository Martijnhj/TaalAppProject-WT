package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CourseService {
    @Autowired
    CourseRepository cr;

    public Iterable<Course> getCourseList() {
        return cr.findAll();
    }

    public void newCourse(Course course) {
        cr.save(course);
    }


}
