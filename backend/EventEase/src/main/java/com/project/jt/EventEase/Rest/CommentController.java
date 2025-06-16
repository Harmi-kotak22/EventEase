package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Dao.CommentDao;
import com.project.jt.EventEase.Dao.EventDao;
import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Entity.Comment;
import com.project.jt.EventEase.Entity.Event;
import com.project.jt.EventEase.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentDao commentDao;

    @Autowired
    private EventDao eventDao;

    @Autowired
    private StudentDao studentDao;

    // Get all comments for an event
    @GetMapping("/event/{eventId}")
    public List<Comment> getComments(@PathVariable Long eventId) {
        return commentDao.findByEventIdOrderByCreatedAtDesc(eventId);
    }

    // Admin or student can post a comment
    @PostMapping("/{eventId}")
    public Comment addComment(@PathVariable Long eventId,
                              Principal principal,
                              @RequestBody Map<String, String> body) {

        Event event = eventDao.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        String username = principal.getName();
        String text = body.get("text");
        boolean isAdmin = Boolean.parseBoolean(body.getOrDefault("admin", "false"));

        Comment comment = new Comment();
        comment.setEvent(event);
        comment.setText(text);
        comment.setAdmin(isAdmin);
        comment.setCreatedAt(LocalDateTime.now());

        if (!isAdmin) {
            Student student = studentDao.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
            comment.setStudent(student);
        }

        return commentDao.save(comment);
    }
}
