package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Les;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface LesRepository extends CrudRepository<Les, Long> {
}
