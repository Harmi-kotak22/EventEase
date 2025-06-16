package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Dao.EventDao;
import com.project.jt.EventEase.Entity.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventDao eventDao;

    @Override
    @Transactional
    public Event createEvent(Event event) {
        return eventDao.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventDao.findAll();
    }

    @Override
    public Optional<Event> getEventById(Long id) {
        return eventDao.findById(id);
    }

    @Override
    public Event updateEvent(Long id, Event updatedEvent) {
        return eventDao.findById(id).map(event -> {
            if(updatedEvent.getEventName()!=null) {
                event.setEventName(updatedEvent.getEventName());
            }
            if(updatedEvent.getDescription()!=null) {
                event.setDescription(updatedEvent.getDescription());
            }
            if(updatedEvent.getVenue()!=null) {
                event.setVenue(updatedEvent.getVenue());
            }
            if(updatedEvent.getEventDate()!=null) {
                event.setEventDate(updatedEvent.getEventDate());
            }
            if(updatedEvent.getEventTime()!=null) {
                event.setEventTime(updatedEvent.getEventTime());
            }
            return eventDao.save(event);
        }).orElse(null);
    }

    @Override
    public void deleteEvent(Long id) {
        eventDao.deleteById(id);
    }
}
