package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class VertalingService {
    @Autowired
    VertalingRepository vr;

    //=> CURRENTLY NOTHING USED BECAUSE ALL DEALT IN LESSERVICE

    public void addVertaling(Vertaling vertaling) {
        vr.save(vertaling);
    }

    public Iterable<Vertaling> vertalingLijst() {
        try {
            Thread.sleep(100); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return vr.findAll();
    }

    public void deleteVertaling(long id) {
        vr.deleteById(id);
    }

    public Optional<Vertaling> findWoord(long id) {
        return vr.findById(id); //add check to make sure it only returns if it is here.
    }

    public void updateWoord(long id, Vertaling vertaling) {
        //vr.save(vertaling); -> uitzoeken of je ook gewoon vertaling kan saven over een bestaande vertaling in de DB!!!!
        vr.findById(id).get().setPrimaryLanguage(vertaling.getPrimaryLanguage());
        vr.findById(id).get().setTargetLanguage(vertaling.getTargetLanguage());
    }

    /*public Iterable<Vertaling> zoekSpecifiekeInhoud(String string) {
        return vr.findByTargetLanguageContaining(string);
    }*/




}
