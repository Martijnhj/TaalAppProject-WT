package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Course;
import com.martijn.taalapp.domein.Taal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TaalService {
    @Autowired
    TaalRepository tr;
    @Autowired
    CourseRepository cr;

    public Iterable<Taal> getTaalList() {
        try {
            Thread.sleep(100);
        } catch (InterruptedException ie) {

        }
        return tr.findAll();
    }

    public Iterable<Course> getTaalCoursesLijst(long id) {
        try {
            Thread.sleep(100);
        } catch (InterruptedException ie) {

        }
        return tr.findById(id).get().getCourses();
    }

    public void newTaal(Taal taal) {
        tr.save(taal);
    }

    public void addCourseToTaal(long idTaal, Course course) {
        cr.save(course);
        tr.findById(idTaal).get().addCourse(course);
        tr.save(tr.findById(idTaal).get());
    }


}
