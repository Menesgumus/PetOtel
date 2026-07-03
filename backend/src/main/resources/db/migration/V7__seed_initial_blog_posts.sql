-- V7: Seed initial blog posts
-- Idempotent: INSERT ... ON CONFLICT (slug) DO UPDATE

INSERT INTO blog_posts (id, title, slug, summary, content, seo_title, seo_description, status, published_at, created_at, updated_at)
VALUES
  (
    uuid_generate_v4(),
    'Kedilerin Mırlamasının Sebepleri',
    'kedilerin-mirlamasinin-sebepleri',
    'Kedilerin mırlaması çoğu zaman huzur ve güven duygusuyla ilişkilidir, ancak her zaman tek bir anlama gelmez.',
    E'Kedilerin mırlaması, onları seven herkesin en çok merak ettiği davranışlardan biridir. Çoğu zaman huzurlu, mutlu ve güvende hissettiklerinde mırlarlar. Ancak mırlama her zaman sadece "mutluluk" anlamına gelmez.\n\n## Kediler neden mırlar?\n\nKediler mırlayarak hem kendilerini rahatlatabilir hem de çevreleriyle iletişim kurabilir. Özellikle sevildiklerinde, sakin bir ortamda dinlenirken veya güvendikleri bir kişinin yanında olduklarında mırlama davranışı daha sık görülür.\n\n## Mırlama her zaman mutluluk belirtisi midir?\n\nGenellikle olumlu bir davranış gibi düşünülse de bazı kediler stres, ağrı veya huzursuzluk yaşadıklarında da mırlayabilir. Bu nedenle mırlamayı tek başına değil, kedinizin genel davranışlarıyla birlikte değerlendirmek daha doğru olur.\n\n## Hangi durumlarda dikkat edilmeli?\n\nKediniz normalden farklı davranıyorsa, iştahı azaldıysa, saklanıyorsa, halsizse veya mırlama ile birlikte huzursuz görünüyorsa bir veteriner hekime danışmanız daha güvenli olur.\n\n## Sonuç\n\nMırlama çoğu zaman kedinizin kendini rahat ve güvende hissettiğini gösteren güzel bir davranıştır. Yine de her kedinin karakteri farklıdır. Kedinizin beden dilini, alışkanlıklarını ve günlük rutinini gözlemlemek onu daha iyi anlamanıza yardımcı olur.',
    'Kedilerin Mırlamasının Sebepleri | Ankara Pet House',
    'Kediler neden mırlar? Mutluluk, rahatlama, iletişim ve stres gibi farklı sebeplerle ortaya çıkan mırlama davranışını sade şekilde anlattık.',
    'PUBLISHED',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Kedilerin Doğum Öncesi Hazırlığı, Doğum Zamanı ve Doğum Sonrası Nasıl Olmalıdır?',
    'kedilerin-dogum-oncesi-hazirligi-dogum-zamani-ve-dogum-sonrasi',
    'Kedilerde doğum süreci öncesi hazırlık, sakin bir alan oluşturmak ve anneyi dikkatle gözlemlemekle başlar.',
    E'Kedilerde doğum süreci, anne kedinin rahat, sakin ve güvenli bir ortamda olması gereken hassas bir dönemdir. Bu süreçte en önemli nokta, anne kediyi gereksiz yere strese sokmadan gözlemlemek ve ihtiyaç duyduğunda veteriner desteği almaktır.\n\n## Doğum öncesi hazırlık nasıl yapılmalı?\n\nDoğum yaklaşırken anne kedi daha sakin, korunaklı ve sessiz bir alan arayabilir. Bu dönemde ona temiz, sıcak ve rahat bir doğum alanı hazırlamak faydalı olur.\n\nHazırlık için dikkat edilebilecekler:\n\n- Sessiz ve sakin bir alan seçmek\n- Temiz battaniye veya havlu hazırlamak\n- Mama ve suya kolay ulaşmasını sağlamak\n- Anne kediyi sık sık yer değiştirmeye zorlamamak\n- Gerektiğinde ulaşılabilecek veteriner bilgisini hazır tutmak\n\n## Doğum zamanı nelere dikkat edilmeli?\n\nDoğum sırasında anne kediler genellikle içgüdüsel olarak ne yapacaklarını bilirler. Bu nedenle panik yapmadan, uzaktan ve sakin şekilde gözlemlemek önemlidir.\n\nAnne kediyi sürekli ellemek, yavrulara gereksiz müdahale etmek veya ortamı kalabalıklaştırmak stresi artırabilir. Ancak uzun süren zorlanma, aşırı halsizlik, kanama veya doğumun ilerlememesi gibi durumlarda vakit kaybetmeden veteriner hekime danışılmalıdır.\n\n## Doğum sonrası bakım nasıl olmalı?\n\nDoğumdan sonra anne kedi ve yavruların sakin bir ortamda kalması gerekir. Anne kedinin mama ve su ihtiyacı artabilir. Yavruların annelerini emip emmediği ve ortamın sıcaklığı düzenli olarak kontrol edilmelidir.\n\nDoğum sonrası dönemde dikkat edilebilecekler:\n\n- Anne ve yavruları rahatsız etmemek\n- Alanı temiz ve sıcak tutmak\n- Anne kedinin beslenmesini desteklemek\n- Yavruların emme durumunu gözlemlemek\n- Olağan dışı durumlarda veteriner desteği almak\n\n## Sonuç\n\nKedilerde doğum süreci doğal ilerleyebilen bir dönemdir, ancak dikkatli gözlem çok önemlidir. Anne kedinin rahat hissettiği güvenli bir alan oluşturmak ve beklenmedik durumlarda veteriner hekime danışmak en doğru yaklaşımdır.',
    'Kedilerde Doğum Öncesi ve Sonrası Hazırlık',
    'Kedilerde doğum öncesi hazırlık, doğum zamanı ve doğum sonrası dikkat edilmesi gerekenleri sade ve anlaşılır şekilde anlattık.',
    'PUBLISHED',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Kediler Neden İdrarını ya da Dışkısını Kum Kabının Dışına Yapar?',
    'kediler-neden-kum-kabinin-disina-yapar',
    'Kedilerin kum kabı dışına tuvalet yapması davranışsal, çevresel ya da sağlıkla ilgili birçok nedenden kaynaklanabilir.',
    E'Kedilerin idrarını ya da dışkısını kum kabının dışına yapması, kedi sahipleri için endişe verici bir durum olabilir. Bu davranış bazen kum kabı düzeniyle, bazen stresle, bazen de sağlık sorunlarıyla ilişkili olabilir.\n\n## Kum kabı temizliği önemli mi?\n\nEvet. Kediler temizliğe önem veren canlılardır. Kum kabı kirliyse, kötü kokuyorsa veya uzun süre temizlenmediyse kullanmak istemeyebilirler. Bu nedenle kum kabının düzenli temizlenmesi çok önemlidir.\n\n## Kum kabının yeri etkili olabilir mi?\n\nKum kabı çok gürültülü, kalabalık veya kedinin kendini güvende hissetmediği bir yerdeyse kedi farklı alanlara tuvalet yapabilir. Kum kabının sakin, kolay ulaşılabilir ve kedinin rahat hissedebileceği bir yerde olması gerekir.\n\n## Stres ve değişiklikler bu davranışı tetikler mi?\n\nEvet. Eve yeni bir hayvan gelmesi, taşınma, misafir yoğunluğu, mama değişikliği, ev düzeninin değişmesi veya kedinin rutinindeki farklılıklar stres oluşturabilir. Bazı kediler bu stresi tuvalet alışkanlığındaki değişikliklerle gösterebilir.\n\n## Sağlık sorunu olabilir mi?\n\nKediniz özellikle idrarını kum kabı dışına yapıyorsa, sık sık tuvalete gidiyorsa, zorlanıyorsa, miyavlıyorsa veya idrarında kan fark ediyorsanız bu durum sağlıkla ilgili olabilir. Bu gibi belirtilerde veteriner hekime danışmak gerekir.\n\n## Ne yapılabilir?\n\nÖncelikle kum kabının temizliği, konumu, kum tipi ve kedinizin günlük rutini gözden geçirilmelidir. Ani başlayan, tekrarlayan veya başka belirtilerle birlikte görülen durumlarda ise veteriner kontrolü ihmal edilmemelidir.\n\n## Sonuç\n\nKum kabı dışına tuvalet yapma davranışı kedinizin size bir şey anlatma şekli olabilir. Temizlik, ortam, stres ve sağlık ihtimallerini birlikte değerlendirmek en doğru yaklaşımdır.',
    'Kediler Neden Kum Kabının Dışına Tuvalet Yapar?',
    'Kedilerin idrarını veya dışkısını kum kabı dışına yapmasının olası nedenlerini ve dikkat edilmesi gerekenleri anlattık.',
    'PUBLISHED',
    NOW(),
    NOW(),
    NOW()
  )
ON CONFLICT (slug)
DO UPDATE SET
  title        = EXCLUDED.title,
  summary      = EXCLUDED.summary,
  content      = EXCLUDED.content,
  seo_title    = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  status       = EXCLUDED.status,
  published_at = CASE WHEN blog_posts.published_at IS NULL THEN NOW() ELSE blog_posts.published_at END,
  updated_at   = NOW()
WHERE blog_posts.deleted_at IS NULL;
