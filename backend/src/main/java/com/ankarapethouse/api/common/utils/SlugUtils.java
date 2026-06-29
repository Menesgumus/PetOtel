package com.ankarapethouse.api.common.utils;

import java.text.Normalizer;
import java.util.Locale;

public class SlugUtils {
    public static String generateSlug(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }
        
        // 1. Turkish characters
        String slug = input.trim().toLowerCase(new Locale("tr", "TR"));
        slug = slug.replace("ç", "c")
                   .replace("ğ", "g")
                   .replace("ı", "i")
                   .replace("ö", "o")
                   .replace("ş", "s")
                   .replace("ü", "u");

        // 2. Normalize and remove accents
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD);
        slug = slug.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");

        // 3. Replace non-alphanumeric chars with hyphen
        slug = slug.replaceAll("[^a-z0-9]", "-");
        
        // 4. Collapse multiple hyphens
        slug = slug.replaceAll("-+", "-");
        
        // 5. Trim hyphens from edges
        slug = slug.replaceAll("^-|-$", "");

        return slug;
    }
}
