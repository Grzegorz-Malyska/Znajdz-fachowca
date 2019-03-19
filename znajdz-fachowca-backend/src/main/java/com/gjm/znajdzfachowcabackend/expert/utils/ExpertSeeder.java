package com.gjm.znajdzfachowcabackend.expert.utils;

import com.gjm.znajdzfachowcabackend.category.dao.CategoryRepository;
import com.gjm.znajdzfachowcabackend.expert.dao.ExpertMessageRepository;
import com.gjm.znajdzfachowcabackend.expert.entity.Expert;
import com.gjm.znajdzfachowcabackend.expert.dao.ExpertRepository;
import com.gjm.znajdzfachowcabackend.expert.entity.ExpertMessage;
import com.gjm.znajdzfachowcabackend.rate.dao.RateRepository;
import com.gjm.znajdzfachowcabackend.rate.entity.Rate;
import com.sun.xml.internal.messaging.saaj.util.ByteOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Component
public class ExpertSeeder {
    private ExpertRepository expertRepository;
    private CategoryRepository categoryRepository;
    private RateRepository rateRepository;
    private ExpertMessageRepository expertMessageRepository;

    @Autowired
    public ExpertSeeder(ExpertRepository expertRepository, CategoryRepository categoryRepository, RateRepository rateRepository, ExpertMessageRepository expertMessageRepository) {
        this.expertRepository = expertRepository;
        this.categoryRepository = categoryRepository;
        this.rateRepository = rateRepository;
        this.expertMessageRepository = expertMessageRepository;
    }

    @PostConstruct
    public void seedDatabaseByCategories() {
        boolean seedAction = true;

        if(seedAction) {
            ExpertMessage expertMessage = new ExpertMessage();
            expertMessage.setContent("wiadomosc numer 1");
            expertMessage.setSenderName("gjm");
            expertMessageRepository.save(expertMessage);

            ExpertMessage expertMessage1 = new ExpertMessage();
            expertMessage1.setContent("wiadomosc numer 2");
            expertMessage1.setSenderName("blm");
            expertMessageRepository.save(expertMessage1);

            ExpertMessage expertMessage2 = new ExpertMessage();
            expertMessage2.setContent("wiadomosc numer 3");
            expertMessage2.setSenderName("mp");
            expertMessageRepository.save(expertMessage2);

            Rate rate = new Rate();
            rate.setDateOfAdd(LocalDate.now());
            rate.setDescription("opis dobrej oceny 4/5 gwiazdek");
            rate.setRate(4);
            rate.setRaterName("gjm");
            rateRepository.save(rate);

            Rate rate1 = new Rate();
            rate1.setDateOfAdd(LocalDate.of(2017, 5, 5));
            rate1.setDescription("opis zlej oceny 1/5 gwiazdek");
            rate1.setRate(1);
            rate1.setRaterName("liv");
            rateRepository.save(rate1);

            Rate rate2 = new Rate();
            rate2.setDateOfAdd(LocalDate.of(2016, 4, 4));
            rate2.setDescription("opis sredniej oceny 3/5 gwiazdek");
            rate2.setRate(3);
            rate2.setRaterName("mk");
            rateRepository.save(rate2);

            Expert expert = new Expert();

            String base64Image = null;
            try(ByteOutputStream bout = new ByteOutputStream();
                FileInputStream fin = new FileInputStream("gjm.jpg")) {
                bout.write(fin);

                base64Image = Base64.getEncoder().encodeToString(bout.getBytes());
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            expert.setAddress("Jana Lisa 35");
            expert.setCity("Lublin");
            expert.setPassword("321");
            expert.setDescription("Najlepszy fachowiec ever");
            expert.setEmail("gjm.official1@gmail.com");
            expert.setPhoneNumber("123455433");
            expert.setImage(base64Image);
            expert.setName("Grzegorz Małyska");
            expert.setPrivatePerson(true);
            expert.setPostCode("20-834");
            List<Rate> rates = new LinkedList<>();
            rateRepository.findAll().forEach(rates::add);
            expert.setRates(rates);

            expert.setCategories(new LinkedList<>(Arrays.asList(categoryRepository.findCategoryByName("okna"), categoryRepository.findCategoryByName("drzwi"))));
            expertRepository.save(expert);

            Expert expert1 = new Expert();

            expert1.setAddress("Pigwowa 35");
            expert1.setCity("Wrocław");
            expert1.setPassword("123");
            expert1.setDescription("Najgorszy fachowiec ever - do dupy");
            expert1.setEmail("blm@gmail.com");
            expert1.setPhoneNumber("827599444");
            expert1.setImage(base64Image);
            expert1.setName("Bartek Mitkowski");
            expert1.setPrivatePerson(true);
            expert1.setPostCode("18-123");
            expert1.setRates(Collections.emptyList());

            expert1.setCategories(new LinkedList<>(Collections.singletonList(categoryRepository.findCategoryByName("dachy"))));
            expertRepository.save(expert1);

            Expert expert2 = new Expert();

            expert2.setAddress("Rondo Dmowskiego");
            expert2.setCity("Warszawa");
            expert2.setPassword("dupa");
            expert2.setDescription("Najlepsza firma 4ever");
            expert2.setEmail("addiction@interia.pl");
            expert2.setPhoneNumber("987655400");
            expert2.setImage(base64Image);
            expert2.setName("Addiction company");
            expert2.setPrivatePerson(false);
            expert2.setPostCode("99-999");
            expert2.setRates(Collections.emptyList());
            expert2.setExpertMessages(new LinkedList<>(Arrays.asList(expertMessage, expertMessage1, expertMessage2)));

            expert2.setCategories(new LinkedList<>(Arrays.asList(categoryRepository.findCategoryByName("dachy"), categoryRepository.findCategoryByName("okna"), categoryRepository.findCategoryByName("drzwi"))));
            expertRepository.save(expert2);
        }
    }
}
