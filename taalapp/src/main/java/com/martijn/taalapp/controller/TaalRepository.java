package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Taal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface TaalRepository extends CrudRepository<Taal, Long> {
}
