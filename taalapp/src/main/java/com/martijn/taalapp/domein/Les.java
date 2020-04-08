package com.martijn.taalapp.domein;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Les {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String naam;

    @OneToMany
    private List<Vertaling> vertaling = new ArrayList<>();




    //foreign key: id van vertaling bij elke vertaling object in list
    //many to many: koppel tabel. een object met een id, en een id van les die gekoppeld is aan id van woord. Hiermee kan dus extra eigenschappen aan verbintenis

    public void addVertaling(Vertaling vertaling) {
        this.vertaling.add(vertaling);
    }

    public void removeVertaling(Vertaling vertaling) {
        this.vertaling.remove(vertaling);
    }

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

    public List<Vertaling> getVertaling() {
        return vertaling;
    }

    public void setVertaling(List<Vertaling> vertaling) {
        this.vertaling = vertaling;
    }
}
