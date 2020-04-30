package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Les;
import com.martijn.taalapp.domein.Vertaling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LesService {
    @Autowired
    LesRepository lr;
    @Autowired
    VertalingRepository vr;

    /*public void newLes() {

        Les les1 = new Les();
        les1.setNaam("vakantie");

        Vertaling vertaling = new Vertaling();
        vertaling.setPrimaryLanguage("xxx");
        vertaling.setTargetLanguage("yyy");

        vr.save(vertaling);
        les1.addVertaling(vertaling);
        lr.save(les1);


        System.out.println("ja");
    }*/

    public Iterable<Les> getLesLijst() {
        try {
            Thread.sleep(150); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return lr.findAll();
    }

    public void newLes(Les les) {
        lr.save(les);
    }

    public Iterable<Vertaling> getLesVertalingenLijst(long id) {
        try {
            Thread.sleep(100); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return lr.findById(id).get().getVertaling();
    }

    public void addVertalingToLes(long id, Vertaling vertaling) {
        vr.save(vertaling);
        lr.findById(id).get().addVertaling(vertaling);
        lr.save(lr.findById(id).get());
    }

    public void removeVertalingFromLes(long idLes, long idVertaling){
        lr.findById(idLes).get().removeVertaling(vr.findById(idVertaling).get());
        vr.deleteById(idVertaling);
    }

    public void deleteLes(long id) {
        Iterable<Vertaling> vertalingenInLes = getLesVertalingenLijst(id);

        ArrayList<Long> idList = new ArrayList<Long>();

        for(Vertaling vertaling: vertalingenInLes) {
            idList.add(vertaling.getId());
        }

        for(long list : idList ) {
            removeVertalingFromLes(id, list);
        }

        lr.deleteById(id);
    }

    public void changeNameLes(long id, String newNaam) {
        lr.findById(id).get().setNaam(newNaam); //add to make sure this only happens when valid id is entered
    }

    public Les getSpecificLes(long id) {
        try {
            Thread.sleep(100); //wait for changes to be updated in the database. Better solution than initial delete idea
        } catch (InterruptedException ie) {

        }
        return lr.findById(id).get();
    }

}
