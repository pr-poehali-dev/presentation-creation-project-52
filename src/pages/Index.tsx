import Icon from "@/components/ui/icon";
import { useState } from "react";
import pptxgen from "pptxgenjs";

const PHOTOS = [
  "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/27f78297-7bf6-4d99-ab16-22b37a00dce8.png",
  "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/f9e58939-3a5a-410d-98e8-780d3ae3d2c7.png",
  "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/202b6c1f-842c-43c1-8737-492d6932c839.png",
  "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/e6ea51be-29ae-4f3e-a321-6dfdaa4a0264.png",
];

const HERO = PHOTOS[0];

const specs = [
  { label: "Площадь", value: "179,08 м²" },
  { label: "Жилая", value: "90 м²" },
  { label: "Кухня-гостиная", value: "60 м²" },
  { label: "Этаж", value: "10 из 14" },
  { label: "Комнат", value: "4" },
  { label: "Санузлы", value: "3 (в каждой спальне)" },
  { label: "Тип сделки", value: "Свободная продажа" },
  { label: "Стиль ремонта", value: "Неодеко" },
];

const advantages = [
  {
    icon: "Eye",
    title: "Видовая квартира",
    desc: "Панорамный вид на Парк Победы, Триумфальные ворота и Москва-Сити",
  },
  {
    icon: "Sparkles",
    title: "Премиальный ремонт",
    desc: "Дизайнерская отделка от застройщика в стиле Неодеко, никто не жил",
  },
  {
    icon: "Home",
    title: "Три мастер-спальни",
    desc: "Каждая со своим санузлом и гардеробной",
  },
  {
    icon: "Building2",
    title: "Victory Park Residences",
    desc: "Фитнес, бассейн, wellness, детский сад, закрытая территория",
  },
];

const rooms: { name: string; size: string; x: number; y: number; w: number; h: number }[] = [
  { name: "Кухня-гостиная", size: "60 м²", x: 8, y: 8, w: 54, h: 44 },
  { name: "Мастер-спальня", size: "26 м²", x: 64, y: 8, w: 28, h: 30 },
  { name: "Гардероб", size: "6 м²", x: 64, y: 40, w: 14, h: 12 },
  { name: "С/у", size: "6 м²", x: 80, y: 40, w: 12, h: 12 },
  { name: "Спальня 2", size: "22 м²", x: 8, y: 54, w: 26, h: 30 },
  { name: "С/у 2", size: "5 м²", x: 36, y: 54, w: 12, h: 14 },
  { name: "Гард. 2", size: "5 м²", x: 36, y: 70, w: 12, h: 14 },
  { name: "Спальня 3", size: "20 м²", x: 50, y: 54, w: 26, h: 30 },
  { name: "С/у 3", size: "5 м²", x: 78, y: 54, w: 14, h: 14 },
  { name: "Холл", size: "12 м²", x: 78, y: 70, w: 14, h: 14 },
];

export default function Index() {
  const [active, setActive] = useState(0);

  const [generating, setGenerating] = useState(false);

  const handleDownloadPptx = async () => {
    setGenerating(true);
    try {
      const urlToBase64 = async (url: string): Promise<string> => {
        try {
          const res = await fetch(url, { mode: "cors" });
          const blob = await res.blob();
          return await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch {
          return "";
        }
      };

      const pptx = new pptxgen();
      pptx.layout = "LAYOUT_WIDE";
      pptx.title = "Victory Park Residences — 4-комнатная квартира";

      const ALL_PHOTOS = [
        ...PHOTOS,
        "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/4547b25b-e005-40bc-9b2d-9ac26ed3286a.png",
        "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/fb81af11-edae-428c-af78-e006195d9cd7.png",
        "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/1ae1bb6e-ce89-4634-b606-0253ce943144.png",
        "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/d79c305f-331f-472f-a39a-4ba1950b60a9.png",
        "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/e618b959-05fc-4b46-a5c8-fdd4796ff45a.png",
      ];

      const photosB64 = await Promise.all(ALL_PHOTOS.map(urlToBase64));
      const heroB64 = photosB64[0];

      // Slide 1 — Title
      const s1 = pptx.addSlide();
      s1.background = { color: "1A1A1A" };
      if (heroB64)
        s1.addImage({ data: heroB64, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: "cover", w: 13.33, h: 7.5 } });
      s1.addShape("rect", { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: "000000", transparency: 50 }, line: { color: "000000", width: 0 } });
      s1.addText("VICTORY PARK RESIDENCES", { x: 0.6, y: 0.5, w: 12, h: 0.4, fontSize: 12, color: "FFFFFF", fontFace: "Calibri", charSpacing: 6 });
      s1.addText("4-комнатная квартира", { x: 0.6, y: 4.5, w: 12, h: 1.2, fontSize: 54, color: "FFFFFF", fontFace: "Cambria" });
      s1.addText("179,08 м²  ·  10/14 этаж  ·  Стиль Неодеко", { x: 0.6, y: 5.7, w: 12, h: 0.6, fontSize: 22, color: "DDDDDD", fontFace: "Cambria" });
      s1.addText("Москва · напротив Парка Победы", { x: 0.6, y: 6.5, w: 12, h: 0.4, fontSize: 14, color: "AAAAAA", fontFace: "Calibri", charSpacing: 4 });

      // Slide 2 — About
      const s2 = pptx.addSlide();
      s2.background = { color: "FAFAF8" };
      s2.addText("Об объекте", { x: 0.6, y: 0.4, w: 12, h: 0.4, fontSize: 11, color: "8B8B7A", fontFace: "Calibri", charSpacing: 6 });
      s2.addText("Редкий видовой лот в одном из самых престижных комплексов Москвы", { x: 0.6, y: 0.9, w: 12, h: 1.2, fontSize: 32, color: "1A1A1A", fontFace: "Cambria" });
      s2.addText(
        "Уникальная 4-комнатная квартира 180 м² на 10 этаже корпуса 2 Victory Park Residences с панорамным видом на Парк Победы и центр Москвы. Лучшее расположение по видовому потенциалу — Музей и Монумент Победы, Храм Георгия Победоносца, Триумфальные ворота, Москва-Сити.\n\nДом сдан, акт приёма-передачи подписан, в квартире никто не проживал. Премиальная дизайнерская отделка от застройщика в стиле Неодеко: натуральные материалы, современные инженерные решения, панорамные окна.\n\nПланировка: просторная кухня-гостиная 60 м², три мастер-спальни с собственными санузлами и гардеробными.",
        { x: 0.6, y: 2.4, w: 12, h: 4.5, fontSize: 16, color: "555555", fontFace: "Calibri", lineSpacingMultiple: 1.4 }
      );

      // Slide 3 — Specs
      const s3 = pptx.addSlide();
      s3.background = { color: "F2F1EC" };
      s3.addText("Параметры", { x: 0.6, y: 0.4, w: 12, h: 0.4, fontSize: 11, color: "8B8B7A", fontFace: "Calibri", charSpacing: 6 });
      s3.addText("Технические характеристики", { x: 0.6, y: 0.9, w: 12, h: 0.8, fontSize: 32, color: "1A1A1A", fontFace: "Cambria" });
      const cols = 4;
      const cellW = 3.0;
      const cellH = 1.4;
      const startX = 0.6;
      const startY = 2.4;
      specs.forEach((s, i) => {
        const cx = startX + (i % cols) * cellW;
        const cy = startY + Math.floor(i / cols) * cellH;
        s3.addShape("rect", { x: cx, y: cy, w: cellW - 0.1, h: cellH - 0.1, fill: { color: "FFFFFF" }, line: { color: "E0E0D8", width: 0.5 } });
        s3.addText(s.label.toUpperCase(), { x: cx + 0.2, y: cy + 0.15, w: cellW - 0.4, h: 0.3, fontSize: 9, color: "999999", fontFace: "Calibri", charSpacing: 4 });
        s3.addText(s.value, { x: cx + 0.2, y: cy + 0.5, w: cellW - 0.4, h: 0.7, fontSize: 22, color: "1A1A1A", fontFace: "Cambria" });
      });

      // Slide 4 — Advantages
      const s4 = pptx.addSlide();
      s4.background = { color: "FAFAF8" };
      s4.addText("Преимущества", { x: 0.6, y: 0.4, w: 12, h: 0.4, fontSize: 11, color: "8B8B7A", fontFace: "Calibri", charSpacing: 6 });
      s4.addText("Что делает объект особенным", { x: 0.6, y: 0.9, w: 12, h: 0.8, fontSize: 32, color: "1A1A1A", fontFace: "Cambria" });
      advantages.forEach((a, i) => {
        const cx = 0.6 + (i % 2) * 6.2;
        const cy = 2.3 + Math.floor(i / 2) * 2.2;
        s4.addShape("rect", { x: cx, y: cy, w: 6.0, h: 2.0, fill: { color: "FFFFFF" }, line: { color: "E5E5DD", width: 0.5 } });
        s4.addText(a.title, { x: cx + 0.3, y: cy + 0.3, w: 5.4, h: 0.5, fontSize: 18, bold: true, color: "1A1A1A", fontFace: "Cambria" });
        s4.addText(a.desc, { x: cx + 0.3, y: cy + 0.85, w: 5.4, h: 1.0, fontSize: 13, color: "777777", fontFace: "Calibri" });
      });

      // Photo slides
      const photoTitles = [
        "Фасад комплекса",
        "Триумфальные ворота",
        "Храм Георгия Победоносца",
        "Образец интерьера",
        "Памятник героям Первой мировой войны",
        "Вид из квартиры",
        "Кухня-гостиная 60 м²",
        "Мастер-спальня",
        "Ванная комната",
      ];
      photosB64.forEach((data, i) => {
        if (!data) return;
        const sp = pptx.addSlide();
        sp.background = { color: "1A1A1A" };
        sp.addImage({ data, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: "contain", w: 13.33, h: 7.5 } });
        sp.addText(photoTitles[i] || `Фото ${i + 1}`, {
          x: 0.6, y: 6.8, w: 12, h: 0.5, fontSize: 14, color: "FFFFFF", fontFace: "Calibri", charSpacing: 4,
        });
      });

      // Contact slide
      const sc = pptx.addSlide();
      sc.background = { color: "1A1A1A" };
      sc.addText("Контакты", { x: 0.6, y: 0.5, w: 12, h: 0.4, fontSize: 11, color: "8B8B7A", fontFace: "Calibri", charSpacing: 6 });
      sc.addText("Янина", { x: 0.6, y: 1.2, w: 12, h: 1.0, fontSize: 48, color: "FFFFFF", fontFace: "Cambria" });
      sc.addText("Эксперт по элитной недвижимости", { x: 0.6, y: 2.4, w: 12, h: 0.5, fontSize: 16, color: "AAAAAA", fontFace: "Calibri" });
      sc.addText("Телефон    +7 (967) 119-88-13", { x: 0.6, y: 3.8, w: 12, h: 0.5, fontSize: 18, color: "FFFFFF", fontFace: "Calibri" });
      sc.addText("Почта         yanina.pro.invest@bk.ru", { x: 0.6, y: 4.4, w: 12, h: 0.5, fontSize: 18, color: "FFFFFF", fontFace: "Calibri" });
      sc.addText("Telegram   @Nelyubovna", { x: 0.6, y: 5.0, w: 12, h: 0.5, fontSize: 18, color: "FFFFFF", fontFace: "Calibri" });
      sc.addText("Victory Park Residences · Корпус 2 · Москва", { x: 0.6, y: 6.8, w: 12, h: 0.4, fontSize: 11, color: "777777", fontFace: "Calibri", charSpacing: 4 });

      await pptx.writeFile({ fileName: "Victory-Park-Residences.pptx" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* FLOATING DOWNLOAD BUTTON */}
      <button
        onClick={handleDownloadPptx}
        disabled={generating}
        className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-6 py-4 shadow-2xl hover:bg-stone-800 transition-colors flex items-center gap-3 disabled:opacity-50"
      >
        <Icon name={generating ? "Loader" : "Presentation"} size={18} className={generating ? "animate-spin" : ""} />
        <span className="text-xs tracking-widest uppercase">
          {generating ? "Создаю..." : "Скачать PowerPoint"}
        </span>
      </button>

      {/* HERO */}
      <section className="print-hero relative h-[92vh] min-h-[600px] overflow-hidden">
        <img
          src={HERO}
          alt="Victory Park Residences"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
          <span className="text-white/70 text-xs tracking-[0.2em] uppercase font-light">
            Victory Park Residences · Корпус 2
          </span>
          <span className="bg-white/10 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full border border-white/20">
            Свободная продажа
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <div className="max-w-5xl">
            <p className="text-white/60 text-xs tracking-widest uppercase mb-3">
              Москва · напротив Парка Победы
            </p>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 font-light"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              4-комнатная квартира<br />
              <span className="text-white/70">179,08 м² · 10/14 этаж</span>
            </h1>
            <div className="flex items-end gap-8 flex-wrap">
              <div>
                <p className="text-white/50 text-xs tracking-wider uppercase mb-1">Стиль</p>
                <p
                  className="text-3xl md:text-4xl text-white font-light"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  Неодеко
                </p>
              </div>
              <div className="w-px h-12 bg-white/20 hidden md:block" />
              <div>
                <p className="text-white/50 text-xs tracking-wider uppercase mb-1">Состояние</p>
                <p
                  className="text-xl text-white font-light"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  Готова к заселению
                </p>
              </div>
              <a
                href="#contact"
                className="ml-auto bg-white text-stone-900 px-8 py-4 text-xs tracking-widest uppercase hover:bg-white/90 transition-colors"
              >
                Связаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-5">Фотографии</p>
        <h2
          className="text-3xl md:text-4xl mb-12 font-light"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Объект и окружение
        </h2>
        <div className="bg-stone-200 mb-4" style={{ aspectRatio: "16/10" }}>
          <img
            src={PHOTOS[active]}
            alt={`Фото ${active + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {PHOTOS.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`aspect-[4/3] overflow-hidden border-2 transition-all ${
                active === i ? "border-stone-900" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`Превью ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* DESCRIPTION + ADVANTAGES */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-5">Об объекте</p>
            <h2
              className="text-3xl md:text-4xl leading-snug mb-6 font-light"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              Редкий видовой лот в одном из самых престижных комплексов Москвы
            </h2>
            <p className="text-stone-500 leading-relaxed text-base">
              Уникальная 4-комнатная квартира 180 м² на 10 этаже корпуса 2 Victory Park Residences
              с панорамным видом на Парк Победы и центр Москвы. Лучшее расположение по
              видовому потенциалу — Музей и Монумент Победы, Храм Георгия Победоносца,
              Триумфальные ворота, Москва-Сити.
            </p>
            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-stone-500 leading-relaxed text-base">
                Дом сдан, акт приёма-передачи подписан, в квартире никто не проживал.
                Премиальная дизайнерская отделка от застройщика в стиле Неодеко: натуральные
                материалы, современные инженерные решения, панорамные окна.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-stone-500 leading-relaxed text-base">
                Планировка: просторная кухня-гостиная 60 м², три мастер-спальни с собственными
                санузлами и гардеробными. Дополнительно в продаже три машино-места одним блоком
                (50 млн ₽, не входит в стоимость квартиры).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-5 bg-white border border-stone-200 hover:border-stone-400 transition-colors"
              >
                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={18} className="text-stone-500" />
                </div>
                <div>
                  <p className="text-base font-medium mb-1">{item.title}</p>
                  <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-5">Параметры</p>
          <h2
            className="text-3xl md:text-4xl mb-12 font-light"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Технические характеристики
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-300">
            {specs.map((s) => (
              <div key={s.label} className="bg-stone-100 p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">{s.label}</p>
                <p
                  className="text-2xl md:text-3xl text-stone-900 font-light"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOOR PLAN */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-5">Планировка</p>
        <h2
          className="text-3xl md:text-4xl mb-12 font-light"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Схема расположения комнат
        </h2>
        <div className="bg-white border border-stone-200 p-8 md:p-12">
          <div className="relative w-full max-w-3xl mx-auto" style={{ paddingBottom: "62%" }}>
            <svg
              viewBox="0 0 100 92"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6"
                y="6"
                width="88"
                height="80"
                fill="none"
                stroke="#C5C0B8"
                strokeWidth="0.8"
              />
              {rooms.map((r) => (
                <g key={r.name}>
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    fill="#F8F7F4"
                    stroke="#C5C0B8"
                    strokeWidth="0.4"
                  />
                  <text
                    x={r.x + r.w / 2}
                    y={r.y + r.h / 2 - 1}
                    textAnchor="middle"
                    fontSize="2.4"
                    fill="#555"
                    fontFamily="Georgia, serif"
                  >
                    {r.name}
                  </text>
                  <text
                    x={r.x + r.w / 2}
                    y={r.y + r.h / 2 + 4}
                    textAnchor="middle"
                    fontSize="2.2"
                    fill="#999"
                    fontFamily="sans-serif"
                  >
                    {r.size}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="text-center text-xs text-stone-400 mt-4 tracking-wider">
            Схема носит иллюстративный характер · Уточняйте у риэлтора
          </p>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-5">Расположение</p>
          <h2
            className="text-3xl md:text-4xl mb-12 font-light"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Адрес и инфраструктура
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white overflow-hidden" style={{ height: "420px" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.508%2C55.733&z=15&pt=37.508,55.733,pm2rdm"
                width="100%"
                height="100%"
                frameBorder={0}
                title="Карта объекта"
                className="block"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white p-6 border border-stone-200">
                <p className="text-xs uppercase tracking-wider text-stone-400 mb-2">Адрес</p>
                <p
                  className="text-lg font-light leading-tight"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  Victory Park Residences
                </p>
                <p className="text-sm text-stone-400 mt-1">
                  Напротив Парка Победы, Москва
                </p>
              </div>
              {[
                { icon: "Landmark", label: "Кремль", value: "15 минут" },
                { icon: "Building", label: "Москва-Сити", value: "15 минут" },
                { icon: "TreePine", label: "Парк Победы", value: "Через дорогу" },
                { icon: "Car", label: "Рублёвка", value: "Быстрый выезд" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white p-5 border border-stone-200 flex items-center gap-4"
                >
                  <div className="w-9 h-9 bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={16} className="text-stone-500" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-stone-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-5">Контакты</p>
        <h2
          className="text-3xl md:text-4xl mb-12 font-light"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Ваш риэлтор
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <div className="bg-white border border-stone-200 p-8">
            <div className="flex items-center gap-5 mb-7">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={28} className="text-stone-400" />
              </div>
              <div>
                <p className="text-xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>
                  Янина
                </p>
                <p className="text-sm text-stone-400">Эксперт по элитной недвижимости</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "+7 (967) 119-88-13" },
                { icon: "Mail", label: "yanina.pro.invest@bk.ru" },
                { icon: "MessageCircle", label: "Telegram: @Nelyubovna" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <Icon name={c.icon} size={16} className="text-stone-400" />
                  <span className="text-sm text-stone-600">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-stone-900 p-8 flex flex-col justify-between">
            <div>
              <p
                className="text-xl text-white mb-3 font-light"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                Записаться на просмотр
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                Организуем показ в удобное для вас время. Ответим на все вопросы об объекте
                и о машино-местах.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <p className="text-white text-sm">+7 (967) 119-88-13</p>
              <p className="text-white text-sm">yanina.pro.invest@bk.ru</p>
              <p className="text-white text-sm">@Nelyubovna</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA PHOTOS — каждое отдельно */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-5">
            Дополнительные фото
          </p>
          <h2
            className="text-3xl md:text-4xl mb-12 font-light"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Виды и интерьер
          </h2>

          <div className="space-y-12">
            {[
              {
                src: "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/4547b25b-e005-40bc-9b2d-9ac26ed3286a.png",
                title: "Памятник героям Первой мировой войны",
                desc: "Вид рядом с жилым комплексом",
              },
              {
                src: "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/fb81af11-edae-428c-af78-e006195d9cd7.png",
                title: "Панорамное окно с видом на Храм Георгия Победоносца",
                desc: "Вид из квартиры на Парк Победы",
              },
              {
                src: "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/1ae1bb6e-ce89-4634-b606-0253ce943144.png",
                title: "Кухня-гостиная 60 м²",
                desc: "Просторная зона с панорамным остеклением",
              },
              {
                src: "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/d79c305f-331f-472f-a39a-4ba1950b60a9.png",
                title: "Мастер-спальня",
                desc: "Светлая комната с панорамным окном",
              },
              {
                src: "https://cdn.poehali.dev/projects/603ba905-8b0a-4a95-9eb7-081add793bbb/bucket/e618b959-05fc-4b46-a5c8-fdd4796ff45a.png",
                title: "Ванная комната",
                desc: "Натуральный мрамор, отдельностоящая ванна, две раковины",
              },
            ].map((p, i) => (
              <figure key={p.src} className="bg-white">
                <div className="overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <figcaption className="p-6 md:p-8 flex justify-between items-end gap-4 flex-wrap">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                      Фото {String(i + 1).padStart(2, "0")}
                    </p>
                    <p
                      className="text-2xl font-light"
                      style={{ fontFamily: "'Cormorant', serif" }}
                    >
                      {p.title}
                    </p>
                  </div>
                  <p className="text-sm text-stone-500">{p.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-400 tracking-wider">
            Victory Park Residences · Корпус 2 · Москва
          </p>
          <p className="text-xs text-stone-300">
            Информация носит ознакомительный характер и не является публичной офертой
          </p>
        </div>
      </footer>
    </div>
  );
}