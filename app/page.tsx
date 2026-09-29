"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  ChevronLeft,
  Eye,
  EyeOff,
  Languages,
  Maximize,
  Menu,
  Moon,
  Play,
  Search,
  Settings,
  Sun,
  UserRound,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Page =
  | "home"
  | "articles"
  | "article"
  | "videos"
  | "all-videos"
  | "video"
  | "short"
  | "about"
  | "auth"
  | "profile"
  | "admin";
type Lang = "ar" | "en";
type HeroSlide = {
  id: number;
  type: string;
  title: string;
  text: string;
  cta: string;
  page: "video" | "article" | "about" | "videos" | "articles";
  mediaType: "image" | "video";
  media: string;
  poster: string;
};
type SiteSettings = {
  siteName: string;
  siteSubtitle: string;
  tagline: string;
  description: string;
  accent: string;
  background: string;
  foreground: string;
  logo: string;
  stickyHeader: boolean;
  showArticles: boolean;
  showVideos: boolean;
  showAbout: boolean;
  facebook: string;
  x: string;
  instagram: string;
  youtube: string;
  heroTitle: string;
  heroText: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  liveEnabled: boolean;
  liveUrl: string;
  liveSchedule: string;
  aboutTitle: string;
  aboutBio: string;
};
const defaultSettings: SiteSettings = {
  siteName: "فنجان قهوة",
  siteSubtitle: "مع أبوغزالة",
  tagline: "صوت حر يبحث عن الكرامة والإنسانية",
  description: "منصة سياسية وإعلامية مستقلة",
  accent: "hsl(36 72% 54%)",
  background: "hsl(30 12% 4%)",
  foreground: "hsl(35 20% 92%)",
  logo: "./logo-mark.png",
  stickyHeader: true,
  showArticles: true,
  showVideos: true,
  showAbout: true,
  facebook: "https://www.facebook.com/mo7amad.ref3at",
  x: "https://x.com/mo7ammad_ref3at",
  instagram: "https://www.instagram.com/mo7amad.ref3at/",
  youtube: "https://www.youtube.com/@mohamadaboughazala",
  heroTitle: "الكلمة الحية لا تموت",
  heroText: "صوت حر يبحث عن الكرامة والإنسانية.",
  footerText: "صوت حر يبحث عن الكرامة والإنسانية.",
  seoTitle: "فنجان قهوة مع أبوغزالة",
  seoDescription:
    "منصة فنجان قهوة مع أبوغزالة للمقالات والفيديوهات والتحليلات السياسية والاقتصادية.",
  liveEnabled: false,
  liveUrl: "",
  liveSchedule: "الأربعاء 9:00 مساءً",
  aboutTitle: "محمد رفعت أبوغزالة",
  aboutBio: "صحفي مصري حر يبحث عن الكرامة والإنسانية.",
};
const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    type: "فيديو جديد",
    title: "كيف نقرأ المشهد السياسي بعيدًا عن الضجيج؟",
    text: "تحليل مبسط يضع الخبر في سياقه ويبحث عما وراء العناوين.",
    cta: "شاهد الآن",
    page: "video",
    mediaType: "video",
    media: "./videos-page-intro.mp4",
    poster: "./videos-page-intro-poster.jpg",
  },
  {
    id: 2,
    type: "مقال مختار",
    title: "الدولة التي نريدها: القانون أولًا",
    text: "كرامة الإنسان لا تُصان بالشعارات، بل بمؤسسات عادلة تحمي حقه.",
    cta: "اقرأ الآن",
    page: "article",
    mediaType: "image",
    media: "./politics-parliament.png",
    poster: "./politics-parliament.png",
  },
  {
    id: 3,
    type: "فنجان قهوة مع أبوغزالة",
    title: "الكلمة الحية لا تموت",
    text: "صوت حر يبحث عن الكرامة والإنسانية.",
    cta: "اكتشف المنصة",
    page: "about",
    mediaType: "image",
    media: "./about-studio.png",
    poster: "./about-studio.png",
  },
];
const articles = [
  {
    id: 1,
    category: "رؤية سياسية",
    date: "20 سبتمبر 2026",
    title: "الدولة التي نريدها: القانون أولًا",
    excerpt: "لماذا تبدأ كرامة المواطن من مؤسسات عادلة لا تفرّق بين الناس؟",
  },
  {
    id: 2,
    category: "اقتصاد",
    date: "18 سبتمبر 2026",
    title: "الأرقام لا تكفي وحدها",
    excerpt: "قراءة الاقتصاد من حياة الناس لا من البيانات المجردة.",
  },
  {
    id: 3,
    category: "مجتمع",
    date: "15 سبتمبر 2026",
    title: "الشباب شركاء لا جمهور",
    excerpt: "المشاركة الحقيقية تبدأ بإتاحة المساحة لجيل جديد.",
  },
  {
    id: 4,
    category: "رأي",
    date: "11 سبتمبر 2026",
    title: "حين يصبح الصمت موقفًا",
    excerpt: "الكلمة الحرة مسؤولية، والسكوت عن الظلم ليس حيادًا.",
  },
  {
    id: 5,
    category: "تاريخ",
    date: "7 سبتمبر 2026",
    title: "ما الذي تعلمناه من التحولات الكبرى؟",
    excerpt: "دروس سياسية لا ينبغي أن تضيع من الذاكرة العامة.",
  },
  {
    id: 6,
    category: "عربي",
    date: "2 سبتمبر 2026",
    title: "وطن واحد وقضايا مترابطة",
    excerpt: "مصير الشعوب العربية أقرب مما توحي به الحدود.",
  },
];
const videos = [
  {
    id: 1,
    duration: "12:48",
    title: "كيف نقرأ المشهد السياسي؟",
    category: "تحليل سياسي",
  },
  {
    id: 2,
    duration: "08:25",
    title: "الاقتصاد بين الأرقام وحياة الناس",
    category: "اقتصاد",
  },
  {
    id: 3,
    duration: "17:10",
    title: "لماذا تحتاج المنطقة إلى صوت حر؟",
    category: "قضايا عربية",
  },
  {
    id: 4,
    duration: "06:32",
    title: "رسالة إلى المصريين في الخارج",
    category: "رسائل",
  },
  {
    id: 5,
    duration: "11:04",
    title: "التعليم قضية أمن قومي",
    category: "مجتمع",
  },
  {
    id: 6,
    duration: "09:41",
    title: "الخبر وما وراء الخبر",
    category: "تحليل",
  },
];
const videoAssets = [
  { src: "./video-politics.mp4", poster: "./politics-parliament.png" },
  { src: "./video-economy.mp4", poster: "./economy-port.png" },
  { src: "./video-palestine.mp4", poster: "./palestine-story.png" },
  { src: "./political-preview.mp4", poster: "./political-studio.png" },
  { src: "./video-politics.mp4", poster: "./politics-parliament.png" },
  { src: "./video-economy.mp4", poster: "./economy-port.png" },
];
const articleImages = [
  "./politics-parliament.png",
  "./economy-port.png",
  "./palestine-story.png",
  "./about-studio.png",
  "./political-studio.png",
  "./political-short.png",
];
const shorts = [
  "قصة في دقيقة",
  "رقم ومعنى",
  "موقف لا يُنسى",
  "من قلب الحدث",
  "رسالة سريعة",
  "سؤال اليوم",
];

export default function Home() {
  const [page, setPage] = useState<Page>("home"),
    [lang, setLang] = useState<Lang>("ar"),
    [menu, setMenu] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [signedIn, setSignedIn] = useState(false),
    [signedEmail, setSignedEmail] = useState(""),
    [theme, setTheme] = useState<"dark" | "light">("dark"),
    [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings),
    [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const t = localStorage.getItem("mr-theme") as "dark" | "light" | null;
    if (t) setTheme(t);
    setSignedIn(localStorage.getItem("mr-session") === "1");
    setSignedEmail(localStorage.getItem("mr-current-user") || "");
    try {
      const s = localStorage.getItem("mr-site-settings");
      if (s) {
        const next = { ...defaultSettings, ...JSON.parse(s) };
        setSiteSettings(next);
        document.title = next.seoTitle;
      }
    } catch {}
  }, []);
  const go = (p: Page) => {
    setPage(p);
    setMenu(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleTheme = () => {
    const n = theme === "dark" ? "light" : "dark";
    setTheme(n);
    localStorage.setItem("mr-theme", n);
  };
  const ar = lang === "ar";
  const nav = [
    { id: "home" as Page, ar: "الرئيسية", en: "Home", show: true },
    {
      id: "articles" as Page,
      ar: "المقالات",
      en: "Articles",
      show: siteSettings.showArticles,
    },
    {
      id: "videos" as Page,
      ar: "الفيديوهات",
      en: "Videos",
      show: siteSettings.showVideos,
    },
    {
      id: "about" as Page,
      ar: "من نحن",
      en: "About",
      show: siteSettings.showAbout,
    },
    { id: "admin" as Page, ar: "لوحة الإدارة", en: "Admin", show: true },
  ].filter((n) => n.show);
  const style = {
    "--gold": siteSettings.accent,
    "--bg": siteSettings.background,
    "--text": siteSettings.foreground,
  } as React.CSSProperties;
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`site ${theme}`}
      style={style}
    >
      <header
        className={`header ${siteSettings.stickyHeader ? "" : "not-sticky"}`}
      >
        <button className="logo-button" onClick={() => go("home")}>
          <img src={siteSettings.logo} alt={siteSettings.siteName} />
          <span>
            <b>{ar ? siteSettings.siteName : "Coffee Talk"}</b>
            <small>{ar ? siteSettings.siteSubtitle : "with Aboughazala"}</small>
          </span>
        </button>
        <nav className="desktop-nav">
          {nav.map((n) => (
            <button
              key={n.id}
              className={page === n.id ? "active" : ""}
              onClick={() => go(n.id)}
            >
              {ar ? n.ar : n.en}
            </button>
          ))}
        </nav>
        <div className="header-tools">
          <button
            aria-label={ar ? "بحث" : "Search"}
            onClick={() => setSearchOpen(true)}
          >
            <Search />
          </button>
          <button
            className="language-switch"
            aria-label="اللغة"
            onClick={() => setLang(ar ? "en" : "ar")}
          >
            <Languages />
            <span>{ar ? "EN" : "عربي"}</span>
          </button>
          <button aria-label={ar ? "المظهر" : "Theme"} onClick={toggleTheme}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button
            className="profile-link"
            onClick={() => go(signedIn ? "profile" : "auth")}
          >
            <UserRound />
            <span>
              {signedIn ? (ar ? "حسابي" : "Profile") : ar ? "دخول" : "Login"}
            </span>
          </button>
          <button className="menu-button" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menu && (
        <nav className="mobile-nav">
          {nav.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}>
              {ar ? n.ar : n.en}
            </button>
          ))}
        </nav>
      )}
      {searchOpen && (
        <SearchPanel onClose={() => setSearchOpen(false)} go={go} />
      )}
      <VisualEditor
        page={page}
        active={editMode}
        onClose={() => setEditMode(false)}
      />
      {page === "home" && <HomePage go={go} ar={ar} settings={siteSettings} />}{" "}
      {page === "articles" && <ArticlesPage go={go} />}{" "}
      {page === "article" && <ArticlePage go={go} />}{" "}
      {page === "videos" && <VideosPage go={go} />}{" "}
      {page === "all-videos" && <AllVideosPage go={go} />}{" "}
      {page === "video" && <VideoWatch go={go} />}{" "}
      {page === "short" && <ShortWatch go={go} />}{" "}
      {page === "about" && <AboutPage />}{" "}
      {page === "admin" && (
        <AdminPage
          settings={siteSettings}
          onStartEdit={() => {
            setEditMode(true);
            setPage("home");
          }}
          onApply={(next) => {
            setSiteSettings(next);
            localStorage.setItem("mr-site-settings", JSON.stringify(next));
            document.title = next.seoTitle;
          }}
        />
      )}{" "}
      {page === "auth" && (
        <AuthPage
          onLogin={(email) => {
            localStorage.setItem("mr-session", "1");
            localStorage.setItem("mr-current-user", email);
            setSignedEmail(email);
            setSignedIn(true);
            go("profile");
          }}
        />
      )}{" "}
      {page === "profile" && (
        <ProfilePage
          email={signedEmail}
          onLogout={() => {
            localStorage.removeItem("mr-session");
            localStorage.removeItem("mr-current-user");
            setSignedEmail("");
            setSignedIn(false);
            go("home");
          }}
        />
      )}
      <Footer go={go} />
    </div>
  );
}

function VisualEditor({
  page,
  active,
  onClose,
}: {
  page: Page;
  active: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const root = document.querySelector(".site");
    if (!root || page === "admin") return;
    const saved = JSON.parse(localStorage.getItem("mr-visual-content") || "{}");
    const draft = JSON.parse(
      localStorage.getItem("mr-visual-draft") || JSON.stringify(saved),
    );
    const data = active ? draft : saved;
    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>(
        "main h1,main h2,main h3,main p,main small,main blockquote,main button,main img,main video,header b,header small,footer h2,footer p,footer button,footer img",
      ),
    );
    const cleanups: (() => void)[] = [];
    nodes.forEach((el, index) => {
      const key = `${page}:${el.tagName.toLowerCase()}:${index}`;
      el.dataset.veKey = key;
      const value = data[key];
      if (value?.hidden) el.style.display = "none";
      if (value?.text !== undefined && !["IMG", "VIDEO"].includes(el.tagName))
        el.textContent = value.text;
      if (
        value?.src &&
        (el instanceof HTMLImageElement || el instanceof HTMLVideoElement)
      )
        el.src = value.src;
      if (!active) return;
      el.classList.add("visual-editable");
      const click = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        const mouse = event as MouseEvent;
        const current = JSON.parse(
          localStorage.getItem("mr-visual-draft") || JSON.stringify(saved),
        );
        if (mouse.altKey) {
          current[key] = { ...(current[key] || {}), hidden: true };
          localStorage.setItem("mr-visual-draft", JSON.stringify(current));
          el.style.display = "none";
          return;
        }
        if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = el instanceof HTMLVideoElement ? "video/*" : "image/*";
          input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const src = String(reader.result);
              el.src = src;
              const next = JSON.parse(
                localStorage.getItem("mr-visual-draft") || "{}",
              );
              next[key] = { ...(next[key] || {}), src };
              localStorage.setItem("mr-visual-draft", JSON.stringify(next));
            };
            reader.readAsDataURL(file);
          };
          input.click();
          return;
        }
        el.contentEditable = "true";
        el.focus();
      };
      const blur = () => {
        if (el.contentEditable !== "true") return;
        const next = JSON.parse(
          localStorage.getItem("mr-visual-draft") || "{}",
        );
        next[key] = { ...(next[key] || {}), text: el.textContent || "" };
        localStorage.setItem("mr-visual-draft", JSON.stringify(next));
        el.contentEditable = "false";
      };
      el.addEventListener("click", click, true);
      el.addEventListener("blur", blur, true);
      cleanups.push(() => {
        el.removeEventListener("click", click, true);
        el.removeEventListener("blur", blur, true);
        el.classList.remove("visual-editable");
        el.contentEditable = "false";
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [page, active]);
  if (!active || page === "admin") return null;
  const publish = () => {
    localStorage.setItem(
      "mr-visual-content",
      localStorage.getItem("mr-visual-draft") || "{}",
    );
    onClose();
  };
  const cancel = () => {
    localStorage.removeItem("mr-visual-draft");
    onClose();
    location.reload();
  };
  return (
    <div className="visual-editor-bar" data-no-edit>
      <b>وضع تحرير الموقع بالكامل</b>
      <span>
        اضغط على أي نص لتعديله، وعلى أي صورة أو فيديو لاستبداله. Alt + ضغط
        لإخفاء العنصر.
      </span>
      <button onClick={publish}>اعتماد التعديلات</button>
      <button onClick={cancel}>إلغاء</button>
    </div>
  );
}

function HomePage({
  go,
  ar,
  settings,
}: {
  go: (p: Page) => void;
  ar: boolean;
  settings: SiteSettings;
}) {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [heroDraft, setHeroDraft] = useState<HeroSlide>({
    ...defaultHeroSlides[0],
    id: 0,
  });
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mr-hero-slides");
      if (saved) setHeroSlides(JSON.parse(saved));
    } catch {}
  }, []);
  const saveHero = () => {
    const next = heroDraft.id
      ? heroSlides.map((x) => (x.id === heroDraft.id ? heroDraft : x))
      : [...heroSlides, { ...heroDraft, id: Date.now() }];
    setHeroSlides(next);
    localStorage.setItem("mr-hero-slides", JSON.stringify(next));
    setHeroDraft({ ...defaultHeroSlides[0], id: 0 });
  };
  const removeHero = (id: number) => {
    const next = heroSlides.filter((x) => x.id !== id);
    setHeroSlides(next);
    localStorage.setItem("mr-hero-slides", JSON.stringify(next));
  };
  const heroMedia = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setHeroDraft({
        ...heroDraft,
        media: String(reader.result),
        poster:
          heroDraft.mediaType === "image"
            ? String(reader.result)
            : heroDraft.poster,
      });
    reader.readAsDataURL(file);
  };
  const [slides, setSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mr-hero-slides");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length) setSlides(parsed);
      }
    } catch {}
  }, []);
  const [slide, setSlide] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setSlide((v) => (v + 1) % Math.max(slides.length, 1));
      setCycle((v) => v + 1);
    }, 6500);
    return () => clearInterval(t);
  }, [slides.length]);
  useEffect(() => {
    if (slide >= slides.length && slides.length) setSlide(0);
  }, [slide, slides.length]);
  const s = slides[slide] || defaultHeroSlides[0];
  const media = s;
  return (
    <main>
      <section className={`hero-carousel slide-${slide}`}>
        {media.mediaType === "video" ? (
          <video
            key={media.media}
            className="hero-media"
            autoPlay
            muted
            loop
            playsInline
            poster={media.poster}
          >
            <source src={media.media} type="video/mp4" />
          </video>
        ) : (
          <img
            key={media.media}
            className="hero-media"
            src={media.media}
            alt={s.title}
          />
        )}
        <div className="hero-brand">
          <img
            src="./logo-wordmark-transparent.png"
            alt="فنجان قهوة مع أبوغزالة"
          />
        </div>
        <div className="hero-art">
          <span>{String(slide + 1).padStart(2, "0")}</span>
          <div className="orbit" />
        </div>
        <div className="hero-copy" key={`${s.id}-${cycle}`} aria-live="polite">
          <div className="bulletin-label"><span>موجز</span><b>{s.type}</b></div>
          <div className="bulletin-text">
            <h1>{s.title}</h1>
            <p>{s.text}</p>
            <button className="gold-button" onClick={() => go(s.page)}>
              {s.cta}
              <ArrowLeft />
            </button>
          </div>
        </div>
        <div className="slide-dots">
          {slides.map((_, i) => (
            <button
              aria-label={`المشهد ${i + 1}`}
              key={i}
              className={slide === i ? "active" : ""}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>
      <section className="staggered section">
        <FeatureCard
          no="01"
          image="./politics-parliament.png"
          title="أهم المقالات"
          text="حين يصبح الصمت موقفًا"
          action="اقرأ الآن"
          onClick={() => go("article")}
        />
        <FeatureCard
          no="02"
          image="./about-studio.png"
          title="البث القادم"
          text="الأربعاء · 9:00 مساءً"
          action="ذكّرني"
          icon={<Bell />}
        />
        <article className="feature-card video-feature">
          <HoverVideo
            src="./video-politics.mp4"
            poster="./politics-parliament.png"
          />
          <span>الفيديو المختار</span>
          <h3>الخبر وما وراء الخبر</h3>
          <button
            onClick={() => {
              localStorage.setItem("mr-video-index", "0");
              go("video");
            }}
          >
            شاهد الآن <ArrowLeft />
          </button>
        </article>
      </section>
      <section className="section dark-section">
        <SectionTitle
          label="لقطات سريعة"
          title="Shorts"
          action="كل الفيديوهات"
          onClick={() => go("all-videos")}
        />
        <ShortGrid go={go} />
      </section>
      <section className="section spotlight">
        <button
          className="landscape-player"
          onClick={() => {
            localStorage.setItem("mr-video-index", "1");
            go("video");
          }}
        >
          <HoverVideo src="./video-economy.mp4" poster="./economy-port.png" />
          <Play />
          <span>08:25</span>
        </button>
        <div>
          <span className="eyebrow">فيديو الأسبوع</span>
          <h2>الاقتصاد بين الأرقام وحياة الناس</h2>
          <p>
            حلقة تحليلية تربط السياسة بالاقتصاد وحياة الناس، وتبحث عن المعنى خلف
            التفاصيل اليومية.
          </p>
          <button
            className="gold-button"
            onClick={() => {
              localStorage.setItem("mr-video-index", "1");
              go("video");
            }}
          >
            شاهد الآن <ArrowLeft />
          </button>
        </div>
      </section>
      <section className="manifesto">
        <img
          src="./logo-wordmark-transparent.png"
          alt="فنجان قهوة مع أبوغزالة"
        />
        <blockquote>
          «الحرية لا تُمنح للصامتين، والكرامة لا يحميها إلا من يرفض الذل.»
        </blockquote>
      </section>
    </main>
  );
}
function FeatureCard({
  no,
  title,
  text,
  action,
  onClick,
  icon,
  image,
}: {
  no: string;
  title: string;
  text: string;
  action: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  image?: string;
}) {
  return (
    <article className="feature-card">
      {image && <img className="feature-bg" src={image} alt="" />}
      <span className="card-number">{no}</span>
      {icon}
      <small>{title}</small>
      <h3>{text}</h3>
      <button onClick={onClick}>
        {action}
        <ArrowLeft />
      </button>
    </article>
  );
}
function SectionTitle({
  label,
  title,
  action,
  onClick,
}: {
  label: string;
  title: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      {action && (
        <button onClick={onClick}>
          {action}
          <ChevronLeft />
        </button>
      )}
    </div>
  );
}
function HoverVideo({ src, poster }: { src: string; poster: string }) {
  const play = (e: React.MouseEvent<HTMLVideoElement>) =>
      e.currentTarget.play().catch(() => {}),
    stop = (e: React.MouseEvent<HTMLVideoElement>) => {
      e.currentTarget.pause();
      e.currentTarget.currentTime = 0;
    };
  return (
    <video
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
function ShortGrid({ go }: { go: (p: Page) => void }) {
  return (
    <div className="short-grid">
      {shorts.slice(0, 4).map((s, i) => (
        <button
          key={s}
          className={`short-card short-${i}`}
          onClick={() => go("short")}
        >
          <HoverVideo
            src={
              i % 2 ? "./video-palestine.mp4" : "./political-short-preview.mp4"
            }
            poster={i % 2 ? "./palestine-story.png" : "./political-short.png"}
          />
          <span className="play">
            <Play />
          </span>
          <b>{s}</b>
          <small>00:{24 + i * 7}</small>
        </button>
      ))}
    </div>
  );
}

function ArticlesPage({ go }: { go: (p: Page) => void }) {
  const [cat, setCat] = useState("الكل");
  const cats = ["الكل", "رؤية سياسية", "اقتصاد", "مجتمع", "رأي", "تاريخ"];
  const list =
    cat === "الكل" ? articles : articles.filter((a) => a.category === cat);
  return (
    <main>
      <ArticleShowcase go={go} />
      <section className="section">
        <div className="filters">
          {cats.map((c) => (
            <button
              className={cat === c ? "active" : ""}
              key={c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="article-grid">
          {list.map((a, i) => (
            <article key={a.id}>
              <div className="article-cover">
                <img
                  src={articleImages[i % articleImages.length]}
                  alt={a.title}
                  loading="lazy"
                />
                <span>0{i + 1}</span>
              </div>
              <small>
                {a.category} · {a.date}
              </small>
              <h2>{a.title}</h2>
              <p>{a.excerpt}</p>
              <button onClick={() => go("article")}>
                اقرأ المزيد <ArrowLeft />
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="memory">
        <span>🕰️ من الذاكرة السياسية</span>
        <h2>حدث غيّر المنطقة.. وما الذي حدث بعده؟</h2>
        <p>
          قسم يجمع الصورة والفيديو والمقال ليعيد قراءة اللحظة وتأثيرها حتى
          اليوم.
        </p>
        <button onClick={() => go("article")}>
          افتح الملف <ArrowLeft />
        </button>
      </section>
    </main>
  );
}
function ArticleShowcase({ go }: { go: (p: Page) => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % articles.length), 4500);
    return () => clearInterval(t);
  }, []);
  const a = articles[i];
  return (
    <section className="article-showcase">
      <img key={articleImages[i]} src={articleImages[i]} alt={a.title} />
      <div className="article-showcase-copy" key={a.id}>
        <span>
          {a.category} · {a.date}
        </span>
        <h1>{a.title}</h1>
        <p>{a.excerpt}</p>
        <button className="gold-button" onClick={() => go("article")}>
          اقرأ المقال <ArrowLeft />
        </button>
      </div>
      <div className="article-showcase-nav">
        {articles.map((_, n) => (
          <button
            aria-label={`المقال ${n + 1}`}
            className={n === i ? "active" : ""}
            onClick={() => setI(n)}
            key={n}
          />
        ))}
      </div>
    </section>
  );
}
function EditorialHero({
  title,
  line,
  ticker,
}: {
  title: string;
  line: string;
  ticker: string[];
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ticker.length), 3500);
    return () => clearInterval(t);
  }, [ticker.length]);
  return (
    <section className="editorial-hero">
      <span className="eyebrow">فنجان قهوة مع أبوغزالة</span>
      <h1>{title}</h1>
      <p>{line}</p>
      <div className="headline-ticker">
        <b>الأحدث</b>
        <span key={i}>{ticker[i]}</span>
      </div>
    </section>
  );
}
function ArticlePage({ go }: { go: (p: Page) => void }) {
  return (
    <main className="reading-page">
      <button className="close-page" onClick={() => go("articles")}>
        <X />
      </button>
      <header>
        <span>رؤية سياسية · 20 سبتمبر 2026</span>
        <h1>الدولة التي نريدها: القانون أولًا</h1>
        <p>لماذا تبدأ كرامة المواطن من مؤسسات عادلة لا تفرّق بين الناس؟</p>
      </header>
      <article>
        <p className="lead">
          ليست الدولة القوية هي التي ترفع صوتها أكثر، بل التي يشعر المواطن فيها
          أن حقه لا يحتاج إلى واسطة، وأن القانون لا يعرف اسمًا أو منصبًا.
        </p>
        <p>
          هذه مساحة القراءة الكاملة للمقال. صُممت لتمنح النص الأولوية: سطور
          مريحة، عناوين واضحة، وهوامش واسعة تقلل التشتيت. عند ربط لوحة الإدارة
          سيُنشر المحتوى والصور والاقتباسات من داخلها مباشرة.
        </p>
        <h2>الإنسان هو معيار النجاح</h2>
        <p>
          لا تُقاس السياسات العامة بحجم ما تعلنه، وإنما بما تغيّره فعليًا في
          حياة الناس.
        </p>
        <blockquote>
          قيمة الإنسان بما يطلب ويسعى إليه، لا بما يدرك فقط.
        </blockquote>
      </article>
    </main>
  );
}

function VideosPage({ go }: { go: (p: Page) => void }) {
  const [cat, setCat] = useState("الكل");
  const openVideo = (i: number) => {
    localStorage.setItem("mr-video-index", String(i));
    go("video");
  };
  return (
    <main>
      <section className="video-hero">
        <div className="video-intro">
          <video
            autoPlay
            muted
            playsInline
            poster="./videos-page-intro-poster.jpg"
          >
            <source src="./videos-page-intro.mp4" type="video/mp4" />
          </video>
          <div className="video-intro-copy">
            <img src="./logo-mark.png" alt="فنجان قهوة" />
            <span>فنجان قهوة مع أبوغزالة</span>
            <h1>السياسة والاقتصاد ببساطة</h1>
            <p>محتوى يضع الخبر في سياقه ويربط القرار بحياة الناس.</p>
          </div>
        </div>
        <div className="floating-shorts">
          {shorts.slice(0, 5).map((s, i) => (
            <button
              key={s}
              className={`float-${i}`}
              onClick={() => go("short")}
            >
              <HoverVideo
                src={
                  i % 2
                    ? "./video-palestine.mp4"
                    : "./political-short-preview.mp4"
                }
                poster={
                  i % 2 ? "./palestine-story.png" : "./political-short.png"
                }
              />
              <Play />
              <span>{s}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionTitle
          label="فيديوهات قصيرة"
          title="Shorts"
          action="المزيد"
          onClick={() => go("all-videos")}
        />
        <ShortGrid go={go} />
      </section>
      <section className="section dark-section">
        <SectionTitle
          label="الحلقات والحوارات"
          title="الفيديوهات الكاملة"
          action="المزيد"
          onClick={() => go("all-videos")}
        />
        <div className="filters">
          {["الكل", "سياسة", "اقتصاد", "مجتمع", "قضايا عربية"].map((c) => (
            <button
              className={cat === c ? "active" : ""}
              key={c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="video-grid">
          {videos.map((v, i) => (
            <article key={v.id} onClick={() => openVideo(i)}>
              <div className={`video-cover cover-${i}`}>
                <HoverVideo
                  src={videoAssets[i].src}
                  poster={videoAssets[i].poster}
                />
                <Play />
                <span>{v.duration}</span>
              </div>
              <small>{v.category}</small>
              <h3>{v.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
function AllVideosPage({ go }: { go: (p: Page) => void }) {
  const [cat, setCat] = useState("الكل");
  const list =
    cat === "الكل" ? videos : videos.filter((v) => v.category.includes(cat));
  const open = (i: number) => {
    localStorage.setItem("mr-video-index", String(i));
    go("video");
  };
  return (
    <main className="all-videos">
      <EditorialHero
        title="كل الفيديوهات"
        line="مرتبة من الأحدث إلى الأقدم"
        ticker={videos.map((v) => v.title)}
      />
      <section className="section">
        <div className="filters">
          {["الكل", "سياسة", "اقتصاد", "مجتمع", "قضايا عربية"].map((c) => (
            <button
              className={cat === c ? "active" : ""}
              onClick={() => setCat(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="video-grid">
          {list.map((v) => {
            const i = videos.findIndex((x) => x.id === v.id);
            return (
              <article key={v.id} onClick={() => open(i)}>
                <div className="video-cover">
                  <HoverVideo
                    src={videoAssets[i].src}
                    poster={videoAssets[i].poster}
                  />
                  <Play />
                  <span>{v.duration}</span>
                </div>
                <small>{v.category}</small>
                <h3>{v.title}</h3>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
function VideoWatch({ go }: { go: (p: Page) => void }) {
  const [selected, setSelected] = useState(() => {
      if (typeof window === "undefined") return 0;
      const n = Number(localStorage.getItem("mr-video-index"));
      return Number.isFinite(n) && n >= 0 && n < videos.length ? n : 0;
    }),
    [muted, setMuted] = useState(false);
  const choose = (i: number) => {
    setSelected(i);
    localStorage.setItem("mr-video-index", String(i));
  };
  const item = videos[selected],
    asset = videoAssets[selected];
  const full = () => {
    const el = document.getElementById(
      "main-player",
    ) as HTMLVideoElement | null;
    el?.requestFullscreen?.();
  };
  return (
    <main className="watch-page">
      <button className="back" onClick={() => go("videos")}>
        <ArrowRight /> العودة للفيديوهات
      </button>
      <div className="watch-layout">
        <div>
          <div className="main-video">
            <video
              id="main-player"
              key={`${asset.src}-${selected}`}
              controls
              autoPlay
              muted={muted}
              poster={asset.poster}
            >
              <source src={asset.src} type="video/mp4" />
            </video>
            <div className="player-actions">
              <button onClick={() => setMuted(!muted)}>
                {muted ? <VolumeX /> : <Volume2 />}
                <span>{muted ? "تشغيل الصوت" : "كتم الصوت"}</span>
              </button>
              <button onClick={full}>
                <Maximize />
                <span>ملء الشاشة</span>
              </button>
            </div>
          </div>
          <h1>{item.title}</h1>
          <p>تحليل مبسط يربط الأحداث بسياقها السياسي والاقتصادي.</p>
        </div>
        <aside>
          {videos.map((v, i) => (
            <button
              className={selected === i ? "active" : ""}
              onClick={() => choose(i)}
              key={v.id}
            >
              <span>
                <img src={videoAssets[i].poster} alt={v.title} />
                <Play />
              </span>
              <b>{v.title}</b>
              <small>{v.duration}</small>
            </button>
          ))}
        </aside>
      </div>
    </main>
  );
}
function ShortWatch({ go }: { go: (p: Page) => void }) {
  return (
    <main className="short-watch">
      <button className="side-logo" onClick={() => go("videos")}>
        <img src="./logo-mark.png" alt="العودة" />
      </button>
      <div className="vertical-video">
        <video controls loop playsInline poster="./political-short.png">
          <source src="./political-short-preview.mp4" type="video/mp4" />
        </video>
      </div>
      <button className="side-logo" onClick={() => go("videos")}>
        <img src="./logo-mark.png" alt="العودة" />
      </button>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-cinema">
        <img src="./about-studio.png" alt="استوديو فنجان قهوة" />
        <div className="about-overlay">
          <img className="about-logo" src="./logo-mark.png" alt="فنجان قهوة" />
          <span>صحفي مصري حر</span>
          <h1>
            محمد رفعت
            <br />
            أبوغزالة
          </h1>
          <p>
            يبحث عن الكرامة والإنسانية، ويدرك أن قيمته بما يطلب ويسعى إليه لا
            بما يدرك.
          </p>
        </div>
      </section>
      <section className="about-cards section">
        <article>
          <img src="./politics-parliament.png" alt="الصحافة والسياسة" />
          <div>
            <small>المهنة</small>
            <h2>صحفي ومنشئ محتوى رقمي</h2>
            <p>
              صحفي لدى قناة الشرق، يتابع الملفات السياسية والاقتصادية وقضايا
              الإنسان.
            </p>
          </div>
        </article>
        <article>
          <img src="./economy-port.png" alt="الاقتصاد وحياة الناس" />
          <div>
            <small>الرؤية</small>
            <h2>الإنسان قبل الأرقام</h2>
            <p>
              إيمان بأن السياسة والاقتصاد يجب أن يُقاسا بتأثيرهما الحقيقي على
              حياة المواطنين.
            </p>
          </div>
        </article>
        <article>
          <img src="./palestine-story.png" alt="القضايا العربية" />
          <div>
            <small>الحلم</small>
            <h2>أمة واحدة ووطن قوي</h2>
            <p>
              تطربه الكلمات الحية، ويعشق زمن الفرسان وأخلاقهم ويسعى لعودته مرة
              أخرى.
            </p>
          </div>
        </article>
      </section>
      <section className="bio-facts section">
        <h2>نبذة مختصرة</h2>
        <dl>
          <div>
            <dt>مكان المنشأ</dt>
            <dd>دمياط — مصر</dd>
          </div>
          <div>
            <dt>تاريخ الميلاد</dt>
            <dd>1 يوليو 1981</dd>
          </div>
          <div>
            <dt>الدراسة</dt>
            <dd>مدرسة دمياط الثانوية العسكرية</dd>
          </div>
          <div>
            <dt>الجامعة</dt>
            <dd>
              قسم اللغة العربية والدراسات الإسلامية — كلية التربية، جامعة دمياط
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

function AuthPage({ onLogin }: { onLogin: (email: string) => void }) {
  const [show, setShow] = useState(false),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("أدخل بريدًا إلكترونيًا صحيحًا");
    if (password.length < 6)
      return setError("كلمة المرور يجب ألا تقل عن 6 أحرف");
    onLogin(email.trim().toLowerCase());
  };
  return (
    <main className="auth-page">
      <section className="auth-visual">
        <img src="./logo-mark.png" alt="فنجان قهوة" />
        <h1>
          حوّل صوتك
          <br />
          إلى أثر
        </h1>
        <div className="wave">
          {Array.from({ length: 20 }).map((_, i) => (
            <i key={i} />
          ))}
        </div>
      </section>
      <section className="auth-form">
        <div>
          <span className="eyebrow">مرحبًا بعودتك</span>
          <h2>تسجيل الدخول</h2>
          <p>ادخل إلى حسابك واحفظ المحتوى الذي يهمك.</p>
          <form onSubmit={submit}>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
              placeholder="name@example.com"
            />
            <label htmlFor="password">كلمة المرور</label>
            <div className="password-field">
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {error && (
              <div className="error-pill">
                <i />
                {error}
              </div>
            )}
            <button className="login-submit">تسجيل الدخول</button>
          </form>
          <div className="divider">
            <span>أو</span>
          </div>
          <button className="google-button">
            G&nbsp;&nbsp; المتابعة باستخدام Google
          </button>
          <div className="auth-links">
            <a href="#">نسيت كلمة المرور؟</a>
            <a href="#">إنشاء حساب جديد</a>
          </div>
        </div>
      </section>
    </main>
  );
}

type ProfileData = {
  name: string;
  username: string;
  bio: string;
  image: string;
  email: string;
};
function ProfilePage({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  const key = `mr-profile-${email || "guest"}`;
  const initial: ProfileData = {
    name: email ? email.split("@")[0] : "المستخدم",
    username: email ? `@${email.split("@")[0]}` : "@user",
    bio: "أضف نبذة قصيرة عنك من زر تعديل الحساب.",
    image: "./logo-mark.png",
    email,
  };
  const [data, setData] = useState<ProfileData>(initial),
    [draft, setDraft] = useState<ProfileData>(initial);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      const next = saved ? { ...initial, ...JSON.parse(saved) } : initial;
      setData(next);
      setDraft(next);
    } catch {}
  }, [key]);
  const save = () => {
    setData(draft);
    localStorage.setItem(key, JSON.stringify(draft));
  };
  const chooseImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft({ ...draft, image: String(reader.result) });
    reader.readAsDataURL(file);
  };
  return (
    <main className="profile-page">
      <section className="profile-head">
        <div className="profile-photo">
          <img src={data.image} alt="صورة الحساب" />
          <label>
            تغيير الصورة
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const next = { ...data, image: String(reader.result) };
                  setData(next);
                  setDraft(next);
                  localStorage.setItem(key, JSON.stringify(next));
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>
        <div className="profile-info">
          <div className="profile-name">
            <div>
              <h1>{data.name}</h1>
              <span>{data.username}</span>
            </div>
            <EditProfile
              draft={draft}
              setDraft={setDraft}
              save={save}
              chooseImage={chooseImage}
            />
            <button aria-label="الإعدادات">
              <Settings />
            </button>
          </div>
          <p>{data.bio}</p>
          <dl className="account-details">
            <div>
              <dt>البريد الإلكتروني</dt>
              <dd>{data.email}</dd>
            </div>
            <div>
              <dt>نوع الحساب</dt>
              <dd>حساب مستخدم</dd>
            </div>
            <div>
              <dt>حالة الحساب</dt>
              <dd>نشط</dd>
            </div>
          </dl>
        </div>
      </section>
      <button className="logout" onClick={onLogout}>
        تسجيل الخروج
      </button>
    </main>
  );
}
function EditProfile({
  draft,
  setDraft,
  save,
  chooseImage,
}: {
  draft: ProfileData;
  setDraft: React.Dispatch<React.SetStateAction<ProfileData>>;
  save: () => void;
  chooseImage: (file?: File) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="edit-profile">تعديل الملف</button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="edit-dialog">
        <DialogHeader>
          <DialogTitle>تعديل الملف الشخصي</DialogTitle>
          <DialogDescription>
            هذه البيانات تخص الحساب المسجل فقط.
          </DialogDescription>
        </DialogHeader>
        <label>
          صورة الحساب
          <img
            className="profile-preview"
            src={draft.image}
            alt="معاينة صورة الحساب"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => chooseImage(e.target.files?.[0])}
          />
        </label>
        <label>
          الاسم
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
        </label>
        <label>
          اسم المستخدم
          <input
            value={draft.username}
            onChange={(e) => setDraft({ ...draft, username: e.target.value })}
          />
        </label>
        <label>
          نبذة
          <textarea
            rows={4}
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          />
        </label>
        <button className="gold-button" onClick={save}>
          حفظ التغييرات
        </button>
      </DialogContent>
    </Dialog>
  );
}
function SettingsDashboard({
  tabs,
  tab,
  setTab,
  draft,
  setDraft,
  apply,
  reset,
  preview,
  setPreview,
  notice,
  onStartEdit,
}: {
  tabs: string[];
  tab: string;
  setTab: (x: string) => void;
  draft: SiteSettings;
  setDraft: React.Dispatch<React.SetStateAction<SiteSettings>>;
  apply: () => void;
  reset: () => void;
  preview: boolean;
  setPreview: (x: boolean) => void;
  notice: string;
  onStartEdit: () => void;
}) {
  const field = (label: string, key: keyof SiteSettings, multi = false) => (
    <label>
      {label}
      {multi ? (
        <textarea
          rows={4}
          value={String(draft[key])}
          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
        />
      ) : (
        <input
          value={String(draft[key])}
          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
        />
      )}
    </label>
  );
  const toggle = (label: string, key: keyof SiteSettings) => (
    <label className="setting-toggle">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={Boolean(draft[key])}
        onChange={(e) => setDraft({ ...draft, [key]: e.target.checked })}
      />
      <i />
    </label>
  );
  const logoUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft({ ...draft, logo: String(reader.result) });
    reader.readAsDataURL(file);
  };
  const exportSettings = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" }),
    );
    a.download = "fengan-qahwa-settings.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const content = () => {
    switch (tab) {
      case "نظرة عامة":
        return (
          <>
            <h2>مركز التحكم</h2>
            <p>
              عدّل هوية الموقع وشكله وأقسامه من مكان واحد، ثم راجع النتيجة في
              المعاينة قبل تطبيقها.
            </p>
            <div className="settings-cards">
              <article>
                <b>11</b>
                <span>مجموعة إعدادات</span>
              </article>
              <article>
                <b>مباشرة</b>
                <span>معاينة فورية</span>
              </article>
              <article>
                <b>محفوظ</b>
                <span>على هذا الجهاز</span>
              </article>
            </div>
          </>
        );
      case "الهوية العامة":
        return (
          <>
            <h2>الهوية العامة</h2>
            <div className="settings-grid">
              {field("اسم الموقع", "siteName")}
              {field("السطر المكمّل للاسم", "siteSubtitle")}
              {field("الجملة التعريفية", "tagline")}
              {field("وصف المنصة", "description", true)}
            </div>
            <label className="settings-upload">
              شعار الموقع
              <input
                type="file"
                accept="image/*"
                onChange={(e) => logoUpload(e.target.files?.[0])}
              />
              <span>اختر صورة من جهازك</span>
            </label>
          </>
        );
      case "الألوان والخطوط":
        return (
          <>
            <h2>الألوان والخطوط</h2>
            <p>استخدم صيغة HSL أو HEX. تظهر النتيجة فورًا في المعاينة.</p>
            <div className="settings-grid">
              {field("اللون الرئيسي", "accent")}
              {field("لون الخلفية", "background")}
              {field("لون النص", "foreground")}
            </div>
            <div className="color-swatches">
              <i style={{ background: draft.accent }} />
              <i style={{ background: draft.background }} />
              <i style={{ background: draft.foreground }} />
            </div>
          </>
        );
      case "الهيدر والقوائم":
        return (
          <>
            <h2>الهيدر والقوائم</h2>
            {toggle("تثبيت الهيدر أثناء التمرير", "stickyHeader")}
            {toggle("إظهار المقالات", "showArticles")}
            {toggle("إظهار الفيديوهات", "showVideos")}
            {toggle("إظهار من نحن", "showAbout")}
          </>
        );
      case "الصفحة الرئيسية":
        return (
          <>
            <h2>الصفحة الرئيسية</h2>
            {field("عنوان المشهد التعريفي", "heroTitle")}
            {field("النص التعريفي", "heroText", true)}
            {field("نص الفوتر", "footerText", true)}
          </>
        );
      case "المستطيل الرئيسي":
        return (
          <>
            <h2>مشاهد المستطيل الرئيسي</h2>
            <p>
              أضف مشهدًا جديدًا أو عدّل كل كلمة وصورة وفيديو وزر داخل المشهد.
            </p>
            <div className="hero-admin-form">
              <label>
                نوع المحتوى
                <input
                  value={heroDraft.type}
                  onChange={(e) =>
                    setHeroDraft({ ...heroDraft, type: e.target.value })
                  }
                />
              </label>
              <label>
                العنوان
                <input
                  value={heroDraft.title}
                  onChange={(e) =>
                    setHeroDraft({ ...heroDraft, title: e.target.value })
                  }
                />
              </label>
              <label>
                النص
                <textarea
                  rows={3}
                  value={heroDraft.text}
                  onChange={(e) =>
                    setHeroDraft({ ...heroDraft, text: e.target.value })
                  }
                />
              </label>
              <div className="settings-grid">
                <label>
                  نص الزر
                  <input
                    value={heroDraft.cta}
                    onChange={(e) =>
                      setHeroDraft({ ...heroDraft, cta: e.target.value })
                    }
                  />
                </label>
                <label>
                  وجهة الزر
                  <select
                    value={heroDraft.page}
                    onChange={(e) =>
                      setHeroDraft({
                        ...heroDraft,
                        page: e.target.value as HeroSlide["page"],
                      })
                    }
                  >
                    <option value="video">مشاهدة فيديو</option>
                    <option value="videos">صفحة الفيديوهات</option>
                    <option value="article">قراءة مقال</option>
                    <option value="articles">صفحة المقالات</option>
                    <option value="about">من نحن</option>
                  </select>
                </label>
                <label>
                  نوع الخلفية
                  <select
                    value={heroDraft.mediaType}
                    onChange={(e) =>
                      setHeroDraft({
                        ...heroDraft,
                        mediaType: e.target.value as "image" | "video",
                      })
                    }
                  >
                    <option value="image">صورة</option>
                    <option value="video">فيديو</option>
                  </select>
                </label>
                <label>
                  الصورة أو الفيديو
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => heroMedia(e.target.files?.[0])}
                  />
                </label>
              </div>
              <button className="gold-button" type="button" onClick={saveHero}>
                {heroDraft.id ? "حفظ التعديل" : "إضافة المشهد"}
              </button>
            </div>
            <div className="hero-admin-list">
              {heroSlides.map((item, index) => (
                <article key={item.id}>
                  {item.mediaType === "video" ? (
                    <video src={item.media} muted />
                  ) : (
                    <img src={item.media} alt="" />
                  )}
                  <div>
                    <small>المشهد {index + 1}</small>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <button onClick={() => setHeroDraft(item)}>تعديل</button>
                  <button
                    className="delete"
                    onClick={() => removeHero(item.id)}
                  >
                    حذف
                  </button>
                </article>
              ))}
            </div>
          </>
        );
      case "صفحات المحتوى":
        return (
          <>
            <h2>صفحات المحتوى</h2>
            <p>
              تحكم في ظهور الصفحات، ولإضافة المواد أو تعديلها أو حذفها انتقل إلى
              «إدارة المحتوى».
            </p>
            {toggle("صفحة المقالات", "showArticles")}
            {toggle("صفحة الفيديوهات", "showVideos")}
            {toggle("صفحة من نحن", "showAbout")}
          </>
        );
      case "البث المباشر":
        return (
          <>
            <h2>البث المباشر</h2>
            {toggle("إظهار البث المباشر عند تفعيله", "liveEnabled")}
            {field("رابط بث YouTube", "liveUrl")}
            {field("موعد البث القادم", "liveSchedule")}
          </>
        );
      case "روابط التواصل":
        return (
          <>
            <h2>روابط التواصل</h2>
            <div className="settings-grid">
              {field("Facebook", "facebook")}
              {field("X / Twitter", "x")}
              {field("Instagram", "instagram")}
              {field("YouTube", "youtube")}
            </div>
          </>
        );
      case "SEO والمشاركة":
        return (
          <>
            <h2>SEO والمشاركة</h2>
            {field("عنوان تبويب المتصفح", "seoTitle")}
            {field("وصف محركات البحث", "seoDescription", true)}
          </>
        );
      case "إعدادات متقدمة":
        return (
          <>
            <h2>إعدادات متقدمة</h2>
            {field("عنوان صفحة من نحن", "aboutTitle")}
            {field("النبذة المختصرة", "aboutBio", true)}
            <div className="danger-actions">
              <button onClick={exportSettings}>تصدير نسخة الإعدادات</button>
              <button onClick={reset}>استعادة القيم الافتراضية</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  const previewSite = (
    <div
      className="preview-site"
      style={
        {
          "--preview-accent": draft.accent,
          "--preview-bg": draft.background,
          "--preview-text": draft.foreground,
        } as React.CSSProperties
      }
    >
      <div className="preview-head">
        <img src={draft.logo} alt="" />
        <b>
          {draft.siteName} <small>{draft.siteSubtitle}</small>
        </b>
        <span>
          الرئيسية　{draft.showArticles && "المقالات　"}
          {draft.showVideos && "الفيديوهات　"}
        </span>
      </div>
      <div className="preview-hero">
        <small>{draft.tagline}</small>
        <h3>{draft.heroTitle}</h3>
        <p>{draft.heroText}</p>
        <button>اكتشف المنصة</button>
      </div>
      <div className="preview-boxes">
        <i />
        <i />
        <i />
      </div>
      <footer>{draft.footerText}</footer>
    </div>
  );
  return (
    <main className="settings-dashboard">
      <header>
        <div>
          <span className="eyebrow">لوحة الإدارة</span>
          <h1>إعدادات الموقع</h1>
        </div>
        <div className="settings-top-actions">
          <button onClick={onStartEdit}>تحرير الموقع بالكامل</button>
          <button onClick={() => setPreview(true)}>معاينة كاملة</button>
          <button className="gold-button" onClick={apply}>
            تطبيق التغييرات
          </button>
        </div>
      </header>
      {notice && <p className="admin-notice">{notice}</p>}
      <nav className="admin-main-nav">
        {tabs.map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </nav>
      <section className="settings-layout">
        <aside className="settings-sidebar">
          {tabs.map((x) => (
            <button
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </aside>
        <div className="settings-editor">{content()}</div>
        <aside className="settings-preview">
          <span>معاينة مباشرة</span>
          {previewSite}
        </aside>
      </section>
      {preview && (
        <div
          className="settings-preview-overlay"
          onClick={() => setPreview(false)}
        >
          <button aria-label="إغلاق">
            <X />
          </button>
          <div onClick={(e) => e.stopPropagation()}>{previewSite}</div>
        </div>
      )}
    </main>
  );
}
function AdminPage({
  settings,
  onApply,
  onStartEdit,
}: {
  settings: SiteSettings;
  onApply: (next: SiteSettings) => void;
  onStartEdit: () => void;
}) {
  type Section =
    "الرئيسية" | "المقالات" | "الفيديوهات" | "البث المباشر" | "الصور";
  type Item = {
    id: number;
    section: Section;
    title: string;
    category: string;
    summary: string;
  };
  const sections: Section[] = [
    "الرئيسية",
    "المقالات",
    "الفيديوهات",
    "البث المباشر",
    "الصور",
  ];
  const defaults: Item[] = [
    {
      id: 1,
      section: "الفيديوهات",
      title: "كيف نقرأ المشهد السياسي؟",
      category: "سياسة",
      summary: "تحليل مبسط للخبر وما وراءه.",
    },
    {
      id: 2,
      section: "المقالات",
      title: "الدولة التي نريدها",
      category: "رؤية سياسية",
      summary: "القانون والكرامة وبناء المؤسسات.",
    },
  ];
  const adminTabs = [
    "نظرة عامة",
    "الهوية العامة",
    "الألوان والخطوط",
    "الهيدر والقوائم",
    "الصفحة الرئيسية",
    "المستطيل الرئيسي",
    "صفحات المحتوى",
    "البث المباشر",
    "روابط التواصل",
    "SEO والمشاركة",
    "إدارة المحتوى",
    "إعدادات متقدمة",
  ];
  const [section, setSection] = useState<Section>("الرئيسية"),
    [items, setItems] = useState<Item[]>(defaults),
    [form, setForm] = useState({ title: "", category: "", summary: "" }),
    [editing, setEditing] = useState<number | null>(null),
    [pageEdit, setPageEdit] = useState(false),
    [notice, setNotice] = useState(""),
    [adminTab, setAdminTab] = useState("نظرة عامة"),
    [draft, setDraft] = useState<SiteSettings>(settings),
    [preview, setPreview] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mr-admin-content");
      if (saved)
        setItems(
          JSON.parse(saved).filter((item: Item) => item.section !== "القضايا"),
        );
    } catch {}
  }, []);
  const saveItems = (next: Item[]) => {
    setItems(next);
    localStorage.setItem("mr-admin-content", JSON.stringify(next));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return setNotice("اكتب عنوان المادة أولًا");
    if (editing !== null) {
      saveItems(
        items.map((x) => (x.id === editing ? { ...x, ...form, section } : x)),
      );
      setNotice("تم تعديل المادة");
    } else {
      saveItems([{ id: Date.now(), section, ...form }, ...items]);
      setNotice("تمت إضافة المادة");
    }
    setEditing(null);
    setForm({ title: "", category: "", summary: "" });
  };
  const edit = (item: Item) => {
    setSection(item.section);
    setEditing(item.id);
    setForm({
      title: item.title,
      category: item.category,
      summary: item.summary,
    });
    window.scrollTo({ top: 360, behavior: "smooth" });
  };
  const remove = (id: number) => saveItems(items.filter((x) => x.id !== id));
  const visible =
    section === "الرئيسية" ? items : items.filter((x) => x.section === section);
  if (adminTab !== "إدارة المحتوى")
    return (
      <SettingsDashboard
        tabs={adminTabs}
        tab={adminTab}
        setTab={setAdminTab}
        draft={draft}
        setDraft={setDraft}
        apply={() => {
          onApply(draft);
          setNotice("تم تطبيق الإعدادات على الموقع");
        }}
        reset={() => setDraft(defaultSettings)}
        preview={preview}
        setPreview={setPreview}
        notice={notice}
        onStartEdit={onStartEdit}
      />
    );
  return (
    <main className="admin-page">
      <section className="admin-heading">
        <span className="eyebrow">إدارة فنجان قهوة</span>
        <h1>إدارة المحتوى</h1>
        <p>
          اختر القسم، ثم أضف أو عدّل أو احذف المحتوى. جميع الأدوات تعمل وتحفظ
          محليًا في هذه المرحلة.
        </p>
      </section>
      <nav className="admin-main-nav">
        {adminTabs.map((x) => (
          <button
            className={adminTab === x ? "active" : ""}
            onClick={() => setAdminTab(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </nav>
      <section className="admin-stats">
        <article>
          <b>{items.length}</b>
          <span>إجمالي المواد</span>
        </article>
        <article>
          <b>{items.filter((x) => x.section === "الفيديوهات").length}</b>
          <span>فيديوهات</span>
        </article>
        <article>
          <b>{items.filter((x) => x.section === "المقالات").length}</b>
          <span>مقالات</span>
        </article>
      </section>
      <section className="admin-section-tabs">
        {sections.map((x) => (
          <button
            className={section === x ? "active" : ""}
            onClick={() => {
              setSection(x);
              setEditing(null);
              setForm({ title: "", category: "", summary: "" });
            }}
            key={x}
          >
            {x}
          </button>
        ))}
      </section>
      <section className="admin-workspace">
        <aside>
          <h3>{section}</h3>
          <button className="active" onClick={() => setPageEdit(!pageEdit)}>
            تحرير الصفحة كاملة
          </button>
          <button
            onClick={() => {
              setEditing(null);
              setForm({ title: "", category: "", summary: "" });
            }}
          >
            إضافة محتوى
          </button>
          <button>ترتيب الظهور</button>
          <button>إعدادات القسم</button>
        </aside>
        <div className="admin-editor">
          {pageEdit && (
            <div className="page-editor">
              <div>
                <span className="eyebrow">تحرير الصفحة كاملة</span>
                <h2>إعدادات صفحة {section}</h2>
              </div>
              <label>
                عنوان الصفحة
                <input defaultValue={section} />
              </label>
              <label>
                الوصف الرئيسي
                <textarea
                  rows={3}
                  defaultValue={`محتوى قسم ${section} في منصة فنجان قهوة`}
                />
              </label>
              <label className="upload-box">
                خلفية الصفحة
                <input type="file" accept="image/*,video/*" />
                <span>اختر صورة أو فيديو للخلفية</span>
              </label>
              <button
                className="gold-button"
                onClick={() => {
                  setPageEdit(false);
                  setNotice("تم حفظ إعدادات الصفحة");
                }}
              >
                حفظ الصفحة
              </button>
            </div>
          )}
          <h2>
            {editing !== null ? "تعديل المادة" : "إضافة مادة جديدة"} — {section}
          </h2>
          <form onSubmit={submit}>
            <label>
              العنوان
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="عنوان واضح وجذاب"
              />
            </label>
            <div className="admin-row">
              <label>
                القسم
                <input value={section} disabled />
              </label>
              <label>
                التصنيف
                <input
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  placeholder="سياسة، اقتصاد، مصر..."
                />
              </label>
            </div>
            <label>
              الوصف
              <textarea
                rows={4}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                placeholder="ملخص قصير للمادة"
              />
            </label>
            <label className="upload-box">
              الصورة أو الفيديو
              <input type="file" accept="image/*,video/*" />
              <span>اختر ملفًا من جهازك</span>
            </label>
            {notice && <p className="admin-notice">{notice}</p>}
            <div className="admin-actions">
              <button className="gold-button">
                {editing !== null ? "حفظ التعديل" : "إضافة ونشر"}
              </button>
              {editing !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({ title: "", category: "", summary: "" });
                  }}
                >
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
      <section className="admin-content">
        <h2>محتوى {section}</h2>
        {visible.length === 0 && <p>لا يوجد محتوى في هذا القسم بعد.</p>}
        {visible.map((item) => (
          <article key={item.id}>
            <span>{item.section}</span>
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.category} — {item.summary}
              </p>
            </div>
            <div className="admin-item-actions">
              <button onClick={() => edit(item)}>تعديل</button>
              <button onClick={() => remove(item.id)}>حذف</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
function SocialIcon({
  type,
}: {
  type: "facebook" | "x" | "instagram" | "youtube";
}) {
  if (type === "facebook")
    return (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path
          fill="currentColor"
          d="M14 8h3V4.5c-.5-.1-2.2-.2-4.1-.2-4 0-6.7 2.4-6.7 6.9V15H2v4h4.2v10h5.1V19h4.2l.7-4h-4.9v-3.4c0-1.2.3-2 2.7-2V8Z"
          transform="scale(.78) translate(3 -1)"
        />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  if (type === "youtube")
    return (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path
          d="M21 8.2c-.2-1.4-1-2.3-2.4-2.5C16.5 5.4 14.3 5.3 12 5.3s-4.5.1-6.6.4C4 5.9 3.2 6.8 3 8.2c-.2 1.2-.3 2.5-.3 3.8s.1 2.6.3 3.8c.2 1.4 1 2.3 2.4 2.5 2.1.3 4.3.4 6.6.4s4.5-.1 6.6-.4c1.4-.2 2.2-1.1 2.4-2.5.2-1.2.3-2.5.3-3.8s-.1-2.6-.3-3.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path
        d="M5 4 19 20M19 4 5 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    </svg>
  );
}
function SearchPanel({
  onClose,
  go,
}: {
  onClose: () => void;
  go: (p: Page) => void;
}) {
  const [q, setQ] = useState("");
  const results = [
    ...articles.map((a) => ({ title: a.title, page: "article" as Page })),
    ...videos.map((v) => ({ title: v.title, page: "video" as Page })),
  ].filter((x) => x.title.includes(q));
  return (
    <div className="search-overlay">
      <button className="search-close" onClick={onClose}>
        <X />
      </button>
      <div>
        <span>ابحث في الموقع</span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="اكتب كلمة البحث..."
        />
        <section>
          {q &&
            results.slice(0, 7).map((r) => (
              <button key={r.title} onClick={() => go(r.page)}>
                {r.title}
                <ArrowLeft />
              </button>
            ))}
        </section>
      </div>
    </div>
  );
}
function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer>
      <div className="footer-brand">
        <img src="./logo-mark.png" alt="فنجان قهوة" />
        <div>
          <h2>فنجان قهوة</h2>
          <p>مع أبوغزالة — صوت حر يبحث عن الكرامة والإنسانية.</p>
        </div>
      </div>
      <nav>
        <button onClick={() => go("articles")}>المقالات</button>
        <button onClick={() => go("videos")}>الفيديوهات</button>
        <button onClick={() => go("about")}>من نحن</button>
      </nav>
      <div className="social">
        <a
          href="https://www.facebook.com/mo7amad.ref3at"
          target="_blank"
          aria-label="فيسبوك"
        >
          <SocialIcon type="facebook" />
        </a>
        <a
          href="https://x.com/mo7ammad_ref3at"
          target="_blank"
          aria-label="إكس"
        >
          <SocialIcon type="x" />
        </a>
        <a
          href="https://www.instagram.com/mo7amad.ref3at/"
          target="_blank"
          aria-label="إنستجرام"
        >
          <SocialIcon type="instagram" />
        </a>
        <a
          href="https://www.youtube.com/@mohamadaboughazala"
          target="_blank"
          aria-label="يوتيوب"
        >
          <SocialIcon type="youtube" />
        </a>
      </div>
      <p className="copyright">
        © 2026 فنجان قهوة مع أبوغزالة. جميع الحقوق محفوظة.
      </p>
    </footer>
  );
}
