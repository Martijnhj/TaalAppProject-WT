package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Les;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface LesRepository extends CrudRepository<Les, Long> {

    //ArrayList<Long> find -> should try to get a list of vertaling id's dependant on the Lesson id

}
