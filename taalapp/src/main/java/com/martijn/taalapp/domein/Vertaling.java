package com.martijn.taalapp.domein;


import javax.persistence.*;

@Entity
public class Vertaling {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String primaryLanguage;
    private String targetLanguage;
    private int wordScore;

    //@ManyToOne
    //Les les;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPrimaryLanguage() {
        return primaryLanguage;
    }

    public void setPrimaryLanguage(String primaryLanguage) {
        this.primaryLanguage = primaryLanguage;
    }

    public String getTargetLanguage() {
        return targetLanguage;
    }

    public void setTargetLanguage(String targetLanguage) {
        this.targetLanguage = targetLanguage;
    }

    public int getWordScore() {
        return wordScore;
    }

    public void setWordScore(int wordScore) {
        this.wordScore = wordScore;
    }
}
