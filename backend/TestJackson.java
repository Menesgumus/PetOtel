import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
public class TestJackson {
    public static class Req {
        private UUID coverImageId;
        public UUID getCoverImageId() { return coverImageId; }
        public void setCoverImageId(UUID coverImageId) { this.coverImageId = coverImageId; }
    }
    public static void main(String[] args) throws Exception {
        String json = "{\"coverImageId\": \"af203fd9-986f-40a7-a583-4b9cd4a244f0\"}";
        ObjectMapper mapper = new ObjectMapper();
        Req req = mapper.readValue(json, Req.class);
        System.out.println("Parsed: " + req.getCoverImageId());
    }
}
