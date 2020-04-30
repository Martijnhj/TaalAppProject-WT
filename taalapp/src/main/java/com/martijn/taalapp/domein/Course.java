package com.martijn.taalapp.domein;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String naam;

    @OneToMany
    private List<Les> lessen = new ArrayList<>();

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

    public List<Les> getLessen() {
        return lessen;
    }

    public void setLessen(List<Les> lessen) {
        this.lessen = lessen;
    }

    public void addLessen(Les les) {
        this.lessen.add(les);
    }

    public void removeLessen(Les les) {
        this.lessen.remove(les);
    }

}
