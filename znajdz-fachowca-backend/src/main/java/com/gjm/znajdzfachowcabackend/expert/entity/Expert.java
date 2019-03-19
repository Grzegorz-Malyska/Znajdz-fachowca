package com.gjm.znajdzfachowcabackend.expert.entity;

import com.gjm.znajdzfachowcabackend.category.entity.Category;
import com.gjm.znajdzfachowcabackend.rate.entity.Rate;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
public class Expert implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String image;           // in base64

    @ManyToMany
    private List<Category> categories;

    private String name;
    private String password;

    private String description;
    private String address;     // street + houseNumber
    private String city;
    private String postCode;
    private String phoneNumber;
    private String email;
    private boolean privatePerson;

    @ManyToMany
    private List<Rate> rates;

    @ManyToMany
    private List<ExpertMessage> expertMessages;
}
