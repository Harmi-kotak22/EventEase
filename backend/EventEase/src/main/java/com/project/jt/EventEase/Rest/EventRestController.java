package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Entity.ClubAdmin;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Service.ClubAdminService;
import com.project.jt.EventEase.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/events", produces = "application/json")
public class EventRestController {

    @Autowired
    private EventService eventService;

    @Autowired
    private ClubAdminService clubAdminService;

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the logged-in user's username

        // Fetch user details
        ClubAdmin clubAdmin = clubAdminService.findClubAdminByUsername(username);
        if (clubAdmin == null) {
            throw new RuntimeException("Only Club Admins are allowed to create events.");
        }

        // Assign the clubAdmin to the event
        event.setClubAdmin(clubAdmin);

        return eventService.createEvent(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }

    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return "Event deleted successfully!";
    }
}
