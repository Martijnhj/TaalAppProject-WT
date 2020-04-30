package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Course;
import com.martijn.taalapp.domein.Les;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class CourseService {
    @Autowired
    CourseRepository cr;
    @Autowired
    LesRepository lr;
    @Autowired
    LesService ls;

    public Iterable<Course> getCourseList() {
        try {
            Thread.sleep(200); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return cr.findAll();
    }

    public Iterable<Les> getCourseLessenLijst(long id) {
        try {
            Thread.sleep(100); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return cr.findById(id).get().getLessen();
    }

    public Course getSpecificCourse(long id) {
        try {
            Thread.sleep(100); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return cr.findById(id).get();
    }

    public void newCourse(Course course) {
        cr.save(course);
    }

    public void addLessonToCourse(long idCourse, Les les) {
        lr.save(les);
        cr.findById(idCourse).get().addLessen(les);
        cr.save(cr.findById(idCourse).get());
    }

    public void deleteCourse(long id) {
        Iterable<Les> lesInCourse = getCourseLessenLijst(id);

        ArrayList<Long> idList = new ArrayList<>();

        for(Les les: lesInCourse) {
            idList.add(les.getId());
        }

        for(long idLesson: idList) {
            deleteLesFromCourse(id, idLesson);
        }

        cr.deleteById(id);
    }

    public void deleteLesFromCourse(long idCourse, long idLes) {
        cr.findById(idCourse).get().removeLessen(lr.findById(idLes).get());
        ls.deleteLes(idLes);
    }

    public void changeNameCourse(long idCourse, String newName) {
        cr.findById(idCourse).get().setNaam(newName);
    }


    //DELETE FUNCTION REFERENCES IN A LOOP THE LESSERVICE FUNCTION DELETING THE VERTALINGEN.
    //DELETE LESSON INSIDE A COURSE
    //CHANGE NAME OF COURSE

}
