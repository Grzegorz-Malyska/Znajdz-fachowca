package com.gjm.znajdzfachowcabackend.expert.controller;

import com.gjm.znajdzfachowcabackend.expert.dao.ExpertMessageRepository;
import com.gjm.znajdzfachowcabackend.expert.entity.Expert;
import com.gjm.znajdzfachowcabackend.expert.entity.ExpertMessage;
import com.gjm.znajdzfachowcabackend.expert.service.ExpertService;
import com.gjm.znajdzfachowcabackend.rate.entity.Rate;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ExpertController {
    private ExpertService expertService;

    @Autowired
    public ExpertController(ExpertService expertService) {
        this.expertService = expertService;
    }

    @GetMapping("/expert")
    public ResponseEntity getExpertsByCityAndCategoryName(
            @RequestParam("city") String city,
            @RequestParam("category") String category) {

        return ResponseEntity
                .ok(expertService.getExpertsByCityAndCategoryName(city, category));
    }

    @PostMapping("/expert")
    public ResponseEntity addExpert(@RequestBody Expert expert) {
        expertService.addExpert(expert);

        return ResponseEntity.ok("");
    }

    @PutMapping("/expert/{name}")
    public ResponseEntity rateExpert(@PathVariable("name") String name, @RequestBody Rate rate) {
        expertService.rateExpert(name, rate);

        return ResponseEntity.ok("");
    }

    @PostMapping("/expertLogin")
    public ResponseEntity loginIngExpert(@RequestBody LoginIngExpertDto loginIngExpertDto) {
        Expert expert = expertService.loginInExpert(loginIngExpertDto.getName(), loginIngExpertDto.getPassword());

        return ResponseEntity.ok(expert);
    }

    @PutMapping("/expert/update/{name}")
    public ResponseEntity updateExpertByName(@PathVariable("name") String name, @RequestBody Expert newExpert) {
        expertService.updateExpertByName(name, newExpert);

        return ResponseEntity.ok("");
    }

    @PostMapping("/expert/message/{name}")
    public ResponseEntity deletePrivateMessageFromExpert(@PathVariable("name") String name, @RequestBody ExpertMessage expertMessageToDelete) {
        expertService.deletePrivateMessage(name, expertMessageToDelete);

        return ResponseEntity.ok("");
    }

    @PostMapping("/expert/message/add/{name}")
    public ResponseEntity addPrivateMessageToExpert(@PathVariable("name") String name, @RequestBody ExpertMessage expertMessageToAdd) {
        expertService.sendPrivateMessage(name, expertMessageToAdd);

        return ResponseEntity.ok("");
    }
}

@Data
class LoginIngExpertDto {
    private String name;
    private String password;
}
