package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Les;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LesService {
    @Autowired
    LesRepository lr;
    @Autowired
    VertalingRepository vr;

    public void newLes() {

        Les les1 = new Les();
        les1.setNaam("vakantie");

        Vertaling vertaling = new Vertaling();
        vertaling.setPrimaryLanguage("xxx");
        vertaling.setTargetLanguage("yyy");

        vr.save(vertaling);
        les1.addVertaling(vertaling);
        lr.save(les1);


        System.out.println("ja");
    }

}
