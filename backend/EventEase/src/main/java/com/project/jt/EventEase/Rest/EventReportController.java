package com.project.jt.EventEase.Rest;

import com.project.jt.EventEase.Service.EventReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event-reports")
@CrossOrigin(origins = "http://localhost:3000")
public class EventReportController {

    @Autowired
    private EventReportService eventReportService;

    @GetMapping("/{eventId}/report")
    public ResponseEntity<byte[]> downloadEventReport(@PathVariable Long eventId) {
        byte[] pdfBytes = eventReportService.generateReportForEvent(eventId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("event-report-" + eventId + ".pdf")
                .build());
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}