package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Entity.Event;
import java.util.List;
import java.util.Optional;

public interface EventService {
    Event createEvent(Event event);
    List<Event> getAllEvents();
    Optional<Event> getEventById(Long id);
    Event updateEvent(Long id, Event updatedEvent);
    void deleteEvent(Long id);
}
