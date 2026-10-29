package com.url.shortner.controller;

import com.url.shortner.dtos.ClickEventDTO;
import com.url.shortner.dtos.UrlMappingDTO;
import com.url.shortner.models.User;
import com.url.shortner.services.UrlMappingService;
import com.url.shortner.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {
    private UrlMappingService urlMappingService;
    private UserService userService;

    //{"originalUrl" : "https://example.com"}

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String, String> request, Principal principal) {

        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDTO urlMappingDTO = urlMappingService.createShortenUrl(originalUrl, user);
        return ResponseEntity.ok(urlMappingDTO);
    }


    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<List<UrlMappingDTO>> getAllUrls(Principal principal) {
        User user =  userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }



    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                        @RequestParam("startDate") String startDate,
                                                        @RequestParam("endDate") String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        // 2024-12-01T00:00:00
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<ClickEventDTO> clickEventsDTOS = urlMappingService.getClickEventsByDate(shortUrl, start, end);

        return ResponseEntity.ok(clickEventsDTOS);
    }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                        @RequestParam("startDate") String startDate,
                                                        @RequestParam("endDate") String endDate) {
        User user = userService.findByUsername(principal.getName());
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        // 2024-12-01
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        Map<LocalDate, Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user, start, end);

        return ResponseEntity.ok(totalClicks);
    }

    }
