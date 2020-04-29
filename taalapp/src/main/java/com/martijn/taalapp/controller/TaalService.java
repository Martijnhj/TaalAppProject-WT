package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Course;
import com.martijn.taalapp.domein.Les;
import com.martijn.taalapp.domein.Taal;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class TaalService {
    @Autowired
    TaalRepository tr;
    @Autowired
    CourseRepository cr;
    @Autowired
    CourseService cs;

    public Iterable<Taal> getTaalList() {
        try {
            Thread.sleep(300);
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

    public Taal getSpecificTaal(long id) {
        try {
            Thread.sleep(100); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return tr.findById(id).get();
    }

    public Iterable<Vertaling> getTestingSetTaal(int numberWords, long idTaal) {
        ArrayList<Vertaling> testSet = new ArrayList<>();
        Taal testTaal = tr.findById(idTaal).get();
        for(Course course: testTaal.getCourses()) {
            for(Les les: course.getLessen()) {
                for (Vertaling vertaling: les.getVertaling()) {
                    testSet.add(vertaling);
                }
            }
        }

        for (;testSet.size()>numberWords;) {
            int rand = (int)(Math.random()*testSet.size());
            testSet.remove(rand);
        }

        return testSet;

    }

    public Iterable<Vertaling> getTestingSetCourse(int numberWords, long idCourse) {
        ArrayList<Vertaling> testSet = new ArrayList<>();
        Course testCourse = cr.findById(idCourse).get();
            for(Les les: testCourse.getLessen()) {
                for (Vertaling vertaling: les.getVertaling()) {
                    testSet.add(vertaling);
                }
            }

        for (;testSet.size()>numberWords;) {
            int rand = (int)(Math.random()*testSet.size());
            System.out.println(rand);
            testSet.remove(rand);
        }

        return testSet;
    }

    public void newTaal(Taal taal) {
        tr.save(taal);
    }

    public void addCourseToTaal(long idTaal, Course course) {
        cr.save(course);
        tr.findById(idTaal).get().addCourse(course);
        tr.save(tr.findById(idTaal).get());
    }

    public void deleteTaal(long idTaal) {
        Iterable<Course> courseInTaal = getTaalCoursesLijst(idTaal);
        ArrayList<Long> idList = new ArrayList<>();

        for (Course course: courseInTaal) {
            idList.add(course.getId());
        }

        for(long idCourse: idList) {
            deleteCourseFromTaal(idTaal, idCourse);
        }

        tr.deleteById(idTaal);
    }

    public void deleteCourseFromTaal(long idTaal, long idCourse) {
        tr.findById(idTaal).get().removeCourse(cr.findById(idCourse).get());
        cs.deleteCourse(idCourse);
    }

    public void changeNaamTaal(long id, String newNaam) {
        tr.findById(id).get().setNaam(newNaam);

    }


}
