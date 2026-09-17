"use client";

import { useState } from "react";
import { ArrowLeft, CalendarDays, ChevronLeft, CirclePlay, Languages, Menu, Play, Search, UserRound, X } from "lucide-react";

type Page = "home" | "news" | "videos" | "articles" | "live" | "about" | "profile";
type Lang = "ar" | "en";

const stories = [
  { tag: "الشأن العام", date: "17 سبتمبر 2026", title: "رؤية جديدة للعمل العام تبدأ من المواطن", tone: "gold" },
  { tag: "اقتصاد", date: "15 سبتمبر 2026", title: "أولويات الاقتصاد الوطني في المرحلة المقبلة", tone: "blue" },
  { tag: "مجتمع", date: "12 سبتمبر 2026", title: "لقاء مفتوح للاستماع إلى قضايا الشباب", tone: "sand" },
];
const videos = [
  { duration: "12:48", title: "كلمة حول تطورات المشهد السياسي", label: "حديث الأسبوع" },
  { duration: "08:25", title: "حوار مباشر مع الشباب", label: "لقاءات" },
  { duration: "17:10", title: "كيف نبني مؤسسات أقوى؟", label: "رؤية ومواقف" },
];
const articles = [
  { date: "14 سبتمبر 2026", title: "الدولة التي نريدها: القانون أولًا", text: "رؤية لبناء دولة حديثة تحمي الحقوق وتفتح المجال أمام الكفاءة والمشاركة." },
  { date: "8 سبتمبر 2026", title: "الاقتصاد بين الأرقام وحياة الناس", text: "لماذا يجب أن تُقاس السياسات العامة بقدرتها على تحسين حياة المواطنين؟" },
  { date: "1 سبتمبر 2026", title: "الشباب شركاء لا جمهور", text: "الاستثمار الحقيقي يبدأ بإتاحة الفرصة لجيل جديد من القادة والمبدعين." },
];

export default function Home() {
  const [page, setPage] = useState<Page>("home");
  const [lang, setLang] = useState<Lang>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [isLive] = useState(false);
  const ar = lang === "ar";
  const go = (next: Page) => { setPage(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const nav: { id: Page; ar: string; en: string }[] = [
    { id: "home", ar: "الرئيسية", en: "Home" }, { id: "news", ar: "الأخبار", en: "News" }, { id: "videos", ar: "الفيديوهات", en: "Videos" }, { id: "articles", ar: "المقالات", en: "Articles" },
    ...(isLive ? [{ id: "live" as Page, ar: "مباشر", en: "Live" }] : []), { id: "about", ar: "من نحن", en: "About" },
  ];
  return <div dir={ar ? "rtl" : "ltr"} className="site-shell">
    <header className="topbar">
      <button className="brand" onClick={() => go("home")} aria-label="العودة للرئيسية"><span className="brand-mark">م</span><span><b>محمد رفعت</b><small>{ar ? "الموقع الرسمي" : "OFFICIAL WEBSITE"}</small></span></button>
      <nav className="desktop-nav" aria-label="التنقل الرئيسي">{nav.map((item) => <button key={item.id} onClick={() => go(item.id)} className={page === item.id ? "active" : ""}>{ar ? item.ar : item.en}</button>)}</nav>
      <div className="header-actions"><button className="icon-button" aria-label="بحث"><Search size={19} /></button><button className="lang-button" onClick={() => setLang(ar ? "en" : "ar")}><Languages size={18} /><span>{ar ? "EN" : "عربي"}</span></button>{signedIn ? <button className="account-button" onClick={() => go("profile")}><span className="avatar">م</span><span>{ar ? "محمد" : "Profile"}</span></button> : <LoginDialog onLogin={() => setSignedIn(true)} ar={ar} />}<button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    {menuOpen && <nav className="mobile-nav">{nav.map((item) => <button key={item.id} onClick={() => go(item.id)}>{ar ? item.ar : item.en}</button>)}</nav>}
    {page === "home" && <HomePage go={go} ar={ar} />}
    {page === "news" && <ListingPage eyebrow={ar ? "المركز الإعلامي" : "Media Center"} title={ar ? "آخر الأخبار" : "Latest News"}><NewsGrid go={go} /></ListingPage>}
    {page === "videos" && <ListingPage eyebrow={ar ? "شاهد واستمع" : "Watch & Listen"} title={ar ? "مكتبة الفيديو" : "Video Library"}><VideoGrid /></ListingPage>}
    {page === "articles" && <ListingPage eyebrow={ar ? "رؤى ومواقف" : "Ideas & Positions"} title={ar ? "المقالات" : "Articles"}><ArticleGrid /></ListingPage>}
    {page === "about" && <AboutPage />}{page === "profile" && <ProfilePage signedIn={signedIn} onLogout={() => { setSignedIn(false); go("home"); }} />}{page === "live" && <LivePage />}
    <footer><div className="footer-brand"><span className="brand-mark">م</span><div><b>محمد رفعت</b><p>صوت مسؤول.. وعمل من أجل الناس</p></div></div><div className="footer-links"><button onClick={() => go("news")}>الأخبار</button><button onClick={() => go("videos")}>الفيديوهات</button><button onClick={() => go("articles")}>المقالات</button><button onClick={() => go("about")}>عن محمد رفعت</button></div><div className="socials"><a href="https://youtube.com/@aboghazala_coffee" aria-label="يوتيوب">YT</a><a href="https://instagram.com/mohamedrefaat711" aria-label="إنستجرام">IG</a><a href="https://x.com/mo7ammad_ref3at" aria-label="إكس">X</a></div><p className="copyright">© 2026 محمد رفعت. جميع الحقوق محفوظة.</p></footer>
  </div>;
}

function LoginDialog({ onLogin, ar }: { onLogin: () => void; ar: boolean }) {
  const [open, setOpen] = useState(false);
  return <><button className="login-button" onClick={() => setOpen(true)}><UserRound size={18} />{ar ? "حسابي" : "My Account"}</button>{open && <div className="modal-backdrop" onClick={() => setOpen(false)}><section dir={ar ? "rtl" : "ltr"} className="login-dialog" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setOpen(false)} aria-label="إغلاق">×</button><h2>{ar ? "مرحبًا بك" : "Welcome"}</h2><p>{ar ? "سجّل الدخول لمتابعة المحتوى وحفظ تفضيلاتك." : "Sign in to manage your profile and preferences."}</p><div className="form-stack"><label>{ar ? "البريد الإلكتروني" : "Email"}<input type="email" placeholder="name@example.com" /></label><label>{ar ? "كلمة المرور" : "Password"}<input type="password" placeholder="••••••••" /></label><button onClick={() => { onLogin(); setOpen(false); }} className="primary-button">{ar ? "تسجيل الدخول" : "Sign in"}</button><p>{ar ? "ليس لديك حساب؟ إنشاء حساب جديد" : "New here? Create an account"}</p></div></section></div>}</>;
}
function HomePage({ go, ar }: { go: (p: Page) => void; ar: boolean }) { return <main><section className="hero"><img src="/hero-civic.png" alt="مشهد يعبر عن التواصل مع المواطنين والعمل العام" /><div className="hero-shade" /><div className="hero-content"><span className="kicker">{ar ? "الموقع الرسمي لمحمد رفعت" : "THE OFFICIAL WEBSITE OF MOHAMED REFAAT"}</span><h1>{ar ? <>وطنٌ يستحق<br /><em>مستقبلًا أفضل</em></> : <>A nation deserves<br /><em>a better future</em></>}</h1><p>{ar ? "نؤمن بأن السياسة مسؤولية، وأن صوت المواطن هو نقطة البداية لكل تغيير حقيقي." : "Politics is a responsibility, and citizens are the starting point for meaningful change."}</p><div className="hero-buttons"><button className="primary-button" onClick={() => go("about")}>{ar ? "تعرّف على الرؤية" : "Discover the vision"}<ArrowLeft size={18} /></button><button className="ghost-button" onClick={() => go("videos")}><CirclePlay size={20} />{ar ? "شاهد أحدث كلمة" : "Watch latest address"}</button></div></div><div className="hero-index"><b>01</b><span /><small>03</small></div></section><section className="ticker"><span>آخر الأخبار</span><p>محمد رفعت يؤكد: بناء الثقة يبدأ بالشفافية والمصارحة</p><time>منذ ساعتين</time></section><section className="section-wrap"><SectionHead eyebrow="آخر المستجدات" title="أخبار وتحركات" action="كل الأخبار" onClick={() => go("news")} /><NewsGrid go={go} /></section><section className="quote-band"><span>“</span><blockquote>غايتنا ليست مجرد إدارة الحاضر، بل صناعة مستقبل يليق بأحلام المصريين.</blockquote><small>محمد رفعت</small></section><section className="section-wrap"><SectionHead eyebrow="المرئيات" title="أحدث الفيديوهات" action="كل الفيديوهات" onClick={() => go("videos")} /><VideoGrid /></section><section className="articles-home"><div className="section-wrap"><SectionHead eyebrow="من القلم" title="رؤى ومقالات" action="كل المقالات" onClick={() => go("articles")} /><ArticleGrid /></div></section><section className="newsletter"><span>ابقَ على اطلاع</span><h2>صلك الجديد.. مباشرة</h2><p>اشترك لتصلك أهم الأخبار والمقالات والفعاليات.</p><div><input type="email" placeholder="البريد الإلكتروني" /><button>اشترك الآن</button></div></section></main>; }
function SectionHead({ eyebrow, title, action, onClick }: { eyebrow: string; title: string; action: string; onClick: () => void }) { return <div className="section-head"><div><span>{eyebrow}</span><h2>{title}</h2></div><button onClick={onClick}>{action}<ChevronLeft size={18} /></button></div>; }
function NewsGrid({ go }: { go: (p: Page) => void }) { return <div className="news-grid">{stories.map((s, i) => <article className={`news-card ${s.tone}`} key={s.title}><div className="news-visual"><span>0{i + 1}</span></div><div className="card-body"><span className="tag">{s.tag}</span><time><CalendarDays size={14} />{s.date}</time><h3>{s.title}</h3><button onClick={() => go("news")}>قراءة التفاصيل <ArrowLeft size={16} /></button></div></article>)}</div>; }
function VideoGrid() { return <div className="video-grid">{videos.map((v, i) => <article className="video-card" key={v.title}><div className={`video-cover video-${i + 1}`}><button aria-label="تشغيل الفيديو"><Play fill="currentColor" /></button><span>{v.duration}</span></div><small>{v.label}</small><h3>{v.title}</h3><p>شاهد الآن <ArrowLeft size={15} /></p></article>)}</div>; }
function ArticleGrid() { return <div className="article-grid">{articles.map((a, i) => <article key={a.title}><span className="article-no">0{i + 1}</span><time>{a.date}</time><h3>{a.title}</h3><p>{a.text}</p><button>اقرأ المقال <ArrowLeft size={16} /></button></article>)}</div>; }
function ListingPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <main><section className="page-hero"><span>{eyebrow}</span><h1>{title}</h1><p>تابع المواقف والفعاليات وأحدث ما نُشر عبر المنصة الرسمية.</p></section><section className="section-wrap listing-content">{children}</section></main>; }
function AboutPage() { return <main><section className="page-hero"><span>السيرة والرؤية</span><h1>عن محمد رفعت</h1><p>مسيرة تنطلق من الإيمان بالإنسان، وسياسة هدفها خدمة المجتمع.</p></section><section className="about-layout section-wrap"><div className="about-monogram">م ر</div><div><span className="kicker dark">رؤية للعمل العام</span><h2>السياسة التزام أخلاقي قبل أن تكون موقعًا</h2><p>يؤمن محمد رفعت بأن قوة الدولة تبدأ من مؤسسات تحترم القانون، واقتصاد يخدم الناس، ومجتمع يفتح المجال أمام الشباب والكفاءات.</p><p>هذا الموقع منصة رسمية لنشر الأخبار والمواقف والمقالات، وفتح نافذة مستمرة للتواصل مع الجمهور بشفافية ووضوح.</p><div className="values"><div><b>01</b><span>العدالة</span></div><div><b>02</b><span>الشفافية</span></div><div><b>03</b><span>المشاركة</span></div></div></div></section></main>; }
function ProfilePage({ signedIn, onLogout }: { signedIn: boolean; onLogout: () => void }) { return <main><section className="page-hero"><span>مساحتك الشخصية</span><h1>الملف الشخصي</h1></section><section className="profile-card section-wrap">{signedIn ? <><div className="profile-avatar">م</div><div><h2>مرحبًا، محمد</h2><p>يمكنك من هنا إدارة بيانات الحساب وتفضيلات الرسائل.</p><dl><div><dt>البريد الإلكتروني</dt><dd>mohamed@example.com</dd></div><div><dt>لغة التواصل</dt><dd>العربية</dd></div></dl><button className="outline-button" onClick={onLogout}>تسجيل الخروج</button></div></> : <div><h2>سجّل الدخول أولًا</h2><p>الملف الشخصي متاح للمستخدمين المسجلين.</p></div>}</section></main>; }
function LivePage() { return <main><section className="page-hero live"><span>على الهواء الآن</span><h1>البث المباشر</h1></section><section className="live-frame section-wrap"><div><Play size={42} /><p>سيظهر بث YouTube المباشر هنا تلقائيًا.</p></div></section></main>; }
