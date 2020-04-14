package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface CourseRepository extends CrudRepository<Course, Long> {
}
