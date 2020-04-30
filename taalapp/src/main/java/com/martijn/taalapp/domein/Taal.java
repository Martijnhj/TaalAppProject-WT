package com.martijn.taalapp.domein;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Taal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String naam;
    //private image something for country flag

    @OneToMany
    private List<Course> courses = new ArrayList<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public void addCourse(Course course) {
        this.courses.add(course);
    }

    public void removeCourse(Course course) {
        this.courses.remove(course);
    }
}
