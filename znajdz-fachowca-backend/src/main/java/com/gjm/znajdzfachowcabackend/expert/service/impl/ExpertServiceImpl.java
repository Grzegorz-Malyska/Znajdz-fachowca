package com.gjm.znajdzfachowcabackend.expert.service.impl;

import com.gjm.znajdzfachowcabackend.category.dao.CategoryRepository;
import com.gjm.znajdzfachowcabackend.category.entity.Category;
import com.gjm.znajdzfachowcabackend.expert.dao.ExpertMessageRepository;
import com.gjm.znajdzfachowcabackend.expert.dao.ExpertRepository;
import com.gjm.znajdzfachowcabackend.expert.entity.Expert;
import com.gjm.znajdzfachowcabackend.expert.entity.ExpertMessage;
import com.gjm.znajdzfachowcabackend.expert.service.ExpertService;
import com.gjm.znajdzfachowcabackend.rate.dao.RateRepository;
import com.gjm.znajdzfachowcabackend.rate.entity.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExpertServiceImpl implements ExpertService {
    private ExpertRepository expertRepository;
    private CategoryRepository categoryRepository;
    private RateRepository rateRepository;
    private ExpertMessageRepository expertMessageRepository;

    @Autowired
    public ExpertServiceImpl(ExpertRepository expertRepository, CategoryRepository categoryRepository, RateRepository rateRepository, ExpertMessageRepository expertMessageRepository) {
        this.expertRepository = expertRepository;
        this.categoryRepository = categoryRepository;
        this.rateRepository = rateRepository;
        this.expertMessageRepository = expertMessageRepository;
    }

    @Override
    public List<Expert> getExpertsByCityAndCategoryName(String city, String categoryName) {
        return categoryRepository.findCategoryByName(categoryName) == null
                ? Collections.emptyList()
                : expertRepository.findExpertsByCityAndCategories(city, Collections.singletonList(categoryRepository.findCategoryByName(categoryName)));
    }

    @Override
    public void addExpert(Expert expert) {
        if(expertRepository.findExpertByName(expert.getName()) != null) {
            throw new RuntimeException("Fachowiec o danej nazwie już istnieje!");
        }

        expert.setCategories(expert
                .getCategories()
                .stream()
                .map(c -> categoryRepository.findCategoryByName(c.getName()))
                .collect(Collectors.toList()));

        expertRepository.save(expert);
    }

    @Override
    public void rateExpert(String name, Rate rate) {
        checkIfExpertExists(name);
        Expert expert = expertRepository.findExpertByName(name);

        if(rateRepository.findRateByRaterName(rate.getRaterName()) != null) {
            throw new RuntimeException("Ocena, której właścicielem jest \"" + rate.getRaterName() + "\" już istnieje!");
        }

        rateRepository.save(rate);

        Rate savedRate = rateRepository.findRateByRaterName(rate.getRaterName());
        List<Rate> expertRates = expert.getRates();
        expertRates.add(savedRate);
        expert.setRates(expertRates);

        expertRepository.save(expert); // Update: ID stays the same
    }

    /**
     * Updates an existing expert.
     *
     * In newExpert you specify only these fields that you want to be updated.
     *
     * @param name name of existing expert to update
     * @param newExpert expert entity with new data
     */
    @Override
    public void updateExpertByName(String name, Expert newExpert) {
        Expert oldExpert = expertRepository.findExpertByName(name);

        if(oldExpert == null) {
            throw new RuntimeException("Fachowiec " + name + " nie istnieje!");
        }

        if(newExpert.getName() != null) {
            oldExpert.setName(newExpert.getName());
        }

        if(newExpert.getPassword() != null) {
            oldExpert.setPassword(newExpert.getPassword());
        }

        if(newExpert.getDescription() != null) {
            oldExpert.setDescription(newExpert.getDescription());
        }

        if(newExpert.getAddress() != null) {
            oldExpert.setAddress(newExpert.getAddress());
        }

        if(newExpert.getCity() != null) {
            oldExpert.setCity(newExpert.getCity());
        }

        if(newExpert.getPostCode() != null) {
            oldExpert.setPostCode(newExpert.getPostCode());
        }

        if(newExpert.getPhoneNumber() != null) {
            oldExpert.setPhoneNumber(newExpert.getPhoneNumber());
        }

        if(newExpert.getEmail() != null) {
            oldExpert.setEmail(newExpert.getEmail());
        }

        if(newExpert.getCategories() != null) {
            List<Category> newCategories = new LinkedList<>();

            for(Category c : newExpert.getCategories()) {
                newCategories.add(categoryRepository.findCategoryByName(c.getName()));
            }

            oldExpert.setCategories(newCategories);
        }

        if(newExpert.getImage() != null) {
            oldExpert.setImage(newExpert.getImage());
        }

        expertRepository.save(oldExpert);
    }

    @Override
    public Expert loginInExpert(String name, String password) {
        checkIfExpertExists(name);
        Expert expert = expertRepository.findExpertByName(name);

        if(!expert.getPassword().equals(password)) {
            throw new RuntimeException("Złe hasło!");
        }

        return expert;
    }

    @Override
    public void sendPrivateMessage(String name, ExpertMessage expertMessage) {
        checkIfExpertExists(name);
        Expert expert = expertRepository.findExpertByName(name);

        if(expertMessageRepository.findExpertMessageByContentAndSenderName(expertMessage.getContent(), expertMessage.getSenderName()) != null) {
            throw new RuntimeException("Wiadomość już istnieje!");
        }

        List<ExpertMessage> oldExpertMessages = expert.getExpertMessages();
        ExpertMessage savedExpertMessage = expertMessageRepository.save(expertMessage);

        oldExpertMessages.add(savedExpertMessage);

        expert.setExpertMessages(oldExpertMessages);
        expertRepository.save(expert);
    }

    @Override
    public void deletePrivateMessage(String expertName, ExpertMessage privateMessage) {
        checkIfExpertExists(expertName);
        Expert expert = expertRepository.findExpertByName(expertName);

//        checkIfExpertMessageExists(privateMessage);

        List<ExpertMessage> expertMessages = expert.getExpertMessages();
        for(int i = 0; i < expertMessages.size();i++) {
            ExpertMessage expertMessage = expertMessages.get(i);

            if(expertMessage.getContent().equals(privateMessage.getContent()) &&
                    expertMessage.getSenderName().equals(privateMessage.getSenderName())) {
                expertMessages.remove(expertMessage);
                expertMessageRepository.deleteById(expertMessage.getId());
                break;
            }
        }
        expert.setExpertMessages(expertMessages);

        expertRepository.save(expert);
    }

    private void checkIfExpertMessageExists(ExpertMessage privateMessage) {
        ExpertMessage expertMessage = findExpertMessageByContentAndSenderName(privateMessage.getContent(), privateMessage.getSenderName());
        System.out.println(expertMessage);

        if(expertMessage == null) {
            throw new RuntimeException("Wiadomość nie istnieje!");
        }
    }

    private void checkIfExpertExists(String name) {
        if(expertRepository.findExpertByName(name) == null) {
            throw new RuntimeException("Fachowiec " + name + " nie istnieje!");
        }
    }

    private ExpertMessage findExpertMessageByContentAndSenderName(String content, String senderName) {
        List<ExpertMessage> byContent = expertMessageRepository.findExpertMessagesByContent(content);
        List<ExpertMessage> bySenderName = expertMessageRepository.findExpertMessagesBySenderName(senderName);

        for(ExpertMessage msg : byContent) {
            if(bySenderName.contains(msg)) {
                return msg;
            }
        }

        return null;
    }
}
