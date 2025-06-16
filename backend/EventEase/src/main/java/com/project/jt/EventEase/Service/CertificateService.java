package com.project.jt.EventEase.Service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
@Service
public class CertificateService {

    public byte[] generateCertificate(String name, String eventName) throws IOException {
        PDDocument doc = new PDDocument();
        PDPage page = new PDPage(PDRectangle.A4);
        doc.addPage(page);

        PDPageContentStream content = new PDPageContentStream(doc, page);
        content.beginText();
        content.setFont(PDType1Font.HELVETICA_BOLD, 24);
        content.newLineAtOffset(100, 700);
        content.showText("Certificate of Participation");
        content.endText();

        content.beginText();
        content.setFont(PDType1Font.HELVETICA, 16);
        content.newLineAtOffset(100, 650);
        content.showText("Awarded to: " + name);
        content.endText();

        content.beginText();
        content.setFont(PDType1Font.HELVETICA, 16);
        content.newLineAtOffset(100, 620);
        content.showText("For participating in event: " + eventName);
        content.endText();

        content.close();

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        doc.save(bos);
        doc.close();
        return bos.toByteArray();
    }
}
