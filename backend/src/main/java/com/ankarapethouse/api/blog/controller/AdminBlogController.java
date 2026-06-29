package com.ankarapethouse.api.blog.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/blog")
public class AdminBlogController {
    @GetMapping
    public String getAdminBlogs() {
        return "Admin Blog Placeholder";
    }
}
