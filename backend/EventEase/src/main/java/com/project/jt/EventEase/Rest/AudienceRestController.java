package com.project.jt.EventEase.Rest;
import com.project.jt.EventEase.Entity.Audience;
import com.project.jt.EventEase.Service.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/audiences")
public class AudienceRestController {

    private AudienceService audienceService;
    private final PasswordEncoder passwordEncoder;

    @Autowired

    public AudienceRestController(AudienceService audienceService,PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.audienceService = audienceService;
    }

    @PostMapping
    public Audience createAudience(@RequestBody Audience audience) {
        audience.setPassword(passwordEncoder.encode(audience.getPassword()));

        return audienceService.saveAudience(audience);
    }

    @GetMapping
    public List<Audience> getAllAudiences() {
        return audienceService.getAllAudiences();
    }

    @GetMapping("/{id}")
    public Optional<Audience> getAudienceById(@PathVariable Long id) {
        return audienceService.getAudienceById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteAudience(@PathVariable Long id) {
        audienceService.deleteAudience(id);
        return "Audience deleted successfully";
    }
}
