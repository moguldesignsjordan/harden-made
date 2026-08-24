// FULL APP.JSX: UPDATED WITH CUSTOM CROWN LOGO (/222.png)

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Star,
  Home,
  Building,
  Truck,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Check,
  ArrowRight,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Heart,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";

import emailjs from "@emailjs/browser";

/* ---------------------------------------------------------
   Utility to convert a File → FileList (for hidden fields)
--------------------------------------------------------- */
/* ---------------------------------------------------------
   Portfolio: real completed jobs, grouped so visitors can
   jump straight to the room they care about.
--------------------------------------------------------- */
const PORTFOLIO_FILTERS = ["All", "Kitchens", "Bathrooms", "Bedrooms", "Living"];

const PORTFOLIO = [
  {
    src: "/portfolio/green-kitchen.jpg",
    category: "Kitchens",
    title: "Full Kitchen Detail",
    caption:
      "Sage cabinetry hand-wiped, quartz polished streak-free, and stainless buffed to a even finish.",
  },
  {
    src: "/portfolio/great-room-living.jpg",
    category: "Living",
    title: "Great Room Reset",
    caption:
      "Leather conditioned, cushions squared, and travertine floors cleaned wall to wall.",
  },
  {
    src: "/portfolio/canopy-bed-master.jpg",
    category: "Bedrooms",
    title: "Master Suite Turndown",
    caption:
      "Crisp linens, styled pillows, and a fresh towel presentation ready for check-in.",
  },
  {
    src: "/portfolio/tiled-walk-in-shower.jpg",
    category: "Bathrooms",
    title: "Herringbone Walk-In Shower",
    caption:
      "Grout lines scrubbed, glass and matte black fixtures left spot-free.",
  },
  {
    src: "/portfolio/double-vanity-suite.jpg",
    category: "Bathrooms",
    title: "Double Vanity Suite",
    caption:
      "Quartz counters cleared and polished, mirrors streak-free, amenities restocked.",
  },
  {
    src: "/portfolio/master-suite-wide.jpg",
    category: "Bedrooms",
    title: "Master Suite, Full View",
    caption:
      "Wide-plank floors cleaned, rug reset, and every surface dusted top-down.",
  },
  {
    src: "/portfolio/desert-view-bedroom.jpg",
    category: "Bedrooms",
    title: "Desert View Guest Room",
    caption:
      "Windows cleaned inside and out so the view is the first thing guests notice.",
  },
  {
    src: "/portfolio/soaking-tub-bath.jpg",
    category: "Bathrooms",
    title: "Soaking Tub Surround",
    caption:
      "Tile deck degreased, tub detailed, and hardware polished to a clean shine.",
  },
  {
    src: "/portfolio/king-suite-turndown.jpg",
    category: "Bedrooms",
    title: "King Suite Turnover",
    caption:
      "Hotel-style bed make with pressed linens and a rolled towel set.",
  },
  {
    src: "/portfolio/master-suite-sitting-area.jpg",
    category: "Bedrooms",
    title: "Suite Sitting Area",
    caption:
      "Leather chairs wiped, glass doors cleaned, and floors detailed edge to edge.",
  },
  {
    src: "/portfolio/guest-bath-vanity.jpg",
    category: "Bathrooms",
    title: "Guest Bath Detail",
    caption:
      "Vanity staged, mirror and fixtures polished, and supplies fully restocked.",
  },
  {
    src: "/portfolio/multi-bed-guest-room.jpg",
    category: "Bedrooms",
    title: "Multi-Bed Guest Room",
    caption:
      "Three beds made to the same standard, carpet vacuumed in clean lines.",
  },
  {
    src: "/portfolio/spa-shower-nook.jpg",
    category: "Bathrooms",
    title: "Spa Shower & Nook",
    caption:
      "Patterned floor tile deep cleaned and the shelving nook fully restyled.",
  },
  {
    src: "/portfolio/wood-headboard-guest-room.jpg",
    category: "Bedrooms",
    title: "Guest Room Turnover",
    caption:
      "Bed dressed, bench squared to the frame, and the rug reset straight.",
  },
  {
    src: "/portfolio/desert-art-bedroom.jpg",
    category: "Bedrooms",
    title: "Accent Wall Bedroom",
    caption:
      "Fresh linens, dusted art, and floors cleaned under and around the frame.",
  },
  {
    src: "/portfolio/powder-room-detail.jpg",
    category: "Bathrooms",
    title: "Powder Room",
    caption:
      "Small space, same standard: sanitized, restocked, and styled.",
  },
  {
    src: "/portfolio/queen-guest-room.jpg",
    category: "Bedrooms",
    title: "Queen Guest Room",
    caption:
      "Bed made, nightstands cleared, and blinds dusted slat by slat.",
  },
];

function createFileList(file) {
  if (!file) return null;
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files;
}

/* ---------------------------------------------------------
   Theme: persists the visitor's choice, and falls back to
   whatever their OS is set to the first time they land here.
--------------------------------------------------------- */
function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem("hm-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Private browsing can throw on access; fall through to the OS setting.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("hm-theme", theme);
    } catch {
      // Not being able to remember the choice is not worth breaking over.
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}

/* ---------------------------------------------------------
   Theme toggle button
--------------------------------------------------------- */
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full border border-hairline text-accent hover:bg-accent hover:text-accent-fg hover:border-accent transition-all duration-300"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const form = useRef();

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    message: "",
  });

  // File input references for EmailJS hidden fields
  const fileInput1Ref = useRef(null);
  const fileInput2Ref = useRef(null);
  const fileInput3Ref = useRef(null);

  // For UI preview
  const [fileNames, setFileNames] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Gallery: active category filter and the photo open in the lightbox.
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visiblePhotos =
    galleryFilter === "All"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === galleryFilter);

  const photoCount = visiblePhotos.length;

  const closeLightbox = () => setLightboxIndex(null);
  const stepLightbox = useCallback(
    (delta) =>
      setLightboxIndex((i) =>
        i === null ? i : (i + delta + photoCount) % photoCount
      ),
    [photoCount]
  );

  // Arrow keys and Escape drive the lightbox once it is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, stepLightbox]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------------------------------------------------------
     SINGLE UPLOAD BOX → Assign files to 3 hidden inputs
  --------------------------------------------------------- */
  const handleUnifiedFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 3);

    // update preview
    setFileNames(selectedFiles.map((f) => f.name));

    // assign each file into hidden EmailJS-compatible fields
    if (fileInput1Ref.current)
      fileInput1Ref.current.files = createFileList(selectedFiles[0]);
    if (fileInput2Ref.current)
      fileInput2Ref.current.files = createFileList(selectedFiles[1]);
    if (fileInput3Ref.current)
      fileInput3Ref.current.files = createFileList(selectedFiles[2]);
  };

  /* ---------------------------------------------------------
     EMAILJS SUBMIT
  --------------------------------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const SERVICE_ID = "service_bwvsmh2";
    const TEMPLATE_ID = "template_wnvkyo3";
    const PUBLIC_KEY = "R8kPJcOdTEon5BjkC";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");

        // Reset text inputs
        setFormData({
          user_name: "",
          user_phone: "",
          message: "",
        });

        // Reset UI previews
        setFileNames([]);

        // Clear hidden EmailJS file inputs
        if (fileInput1Ref.current) fileInput1Ref.current.value = "";
        if (fileInput2Ref.current) fileInput2Ref.current.value = "";
        if (fileInput3Ref.current) fileInput3Ref.current.value = "";

        setTimeout(() => setSubmitStatus(null), 4000);
      })
      .catch((error) => {
        console.error("Email failed:", error);
        setIsSubmitting(false);
        alert("Email send failed. Double check EmailJS settings.");
      });
  };

  return (
    <div className="min-h-screen bg-base text-ink font-sans selection:bg-accent selection:text-accent-fg">

      {/* =========================================================
         NAVIGATION
      ========================================================= */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-base/95 backdrop-blur-md border-b border-accent/20 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            {/* UPDATED: Custom Logo Image */}
            <img 
              src="/222.png" 
              alt="Harden Made Crown" 
              className="w-11 h-11 object-contain" 
            />
            <div className="text-2xl font-serif font-bold tracking-wider">
              HARDEN<span className="text-accent">MADE</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "About", "Gallery", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                {item}
              </button>
            ))}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-fg rounded-full transition-all duration-300 uppercase text-xs font-bold tracking-widest"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button className="text-accent" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-elevated border-b border-accent/20 py-6 px-6 flex flex-col gap-4 shadow-2xl">
            {["Services", "About", "Gallery", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-lg font-serif hover:text-accent"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-2 w-full py-3 bg-accent text-accent-fg font-bold rounded"
            >
              BOOK NOW
            </button>
          </div>
        )}
      </nav>

      {/* =========================================================
         HERO
      ========================================================= */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background photo */}
        <img
          src="/portfolio/green-kitchen.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Readability overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-base/90 via-base/75 to-base"></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-[128px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[128px] opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mx-auto w-32 h-32 md:w-48 md:h-48 mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-accent/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
            
            {/* UPDATED: Custom Logo Image (Larger) */}
            <img 
              src="/222.png" 
              alt="Harden Made Crown" 
              className="w-60 h-60 md:w-60 md:h-60 object-contain" 
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Excellence{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
              Delivered
            </span>
          </h1>

          <p className="text-ink-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
         "Experience an exceptional standard of clean. Professional cleaning services tailored to your lifestyle"
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative px-8 py-4 bg-accent text-accent-fg font-bold tracking-widest uppercase rounded-sm hover:shadow-[0_0_20px_rgba(232,126,161,0.4)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Quote{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="px-8 py-4 border border-hairline hover:bg-elevated font-bold tracking-widest uppercase rounded-sm transition-all duration-300"
            >
              View Services
            </button>
          </div>
        </div>
      </section>

{/* =========================================================
   SERVICES
========================================================= */}
<section id="services" className="py-24 bg-surface">
  <div className="container mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-3">
        What We Do
      </h2>
      <h3 className="text-4xl font-serif font-bold text-ink">
        Exceed Expectations
      </h3>
      <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
    </div>

    {/* CENTERED GRID WRAPPER */}
    <div className="flex justify-center">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {[
          {
            icon: <Home size={40} />,
            title: "Turnover / Vacation Rental Cleaning",
            desc: "Detailed turnover cleaning between guests to ensure your rental is spotless, refreshed, and guest-ready.",
          },
          {
            icon: <Home size={40} />,
            title: "Residential Cleaning",
            desc: "Routine or deep home cleaning designed to keep your space fresh, organized, and beautifully maintained.",
          },
          {
            icon: <Truck size={40} />,
            title: "Move-In / Move-Out Deep Cleaning",
            desc: "Top-to-bottom deep cleaning to prepare homes for new occupants or ensure a flawless move-out.",
          },
          {
            icon: <Building size={40} />,
            title: "Commercial Cleaning",
            desc: "Professional cleaning for offices and commercial spaces, including restrooms, common areas, and workspaces.",
          },
               {
            icon: <Home size={40} />,
            title: "Custom Build Your Own ",
            desc: "Build your own custom cleaning package.",
          },
        ].map((service, idx) => (
          <div
            key={idx}
            className="group p-8 border border-accent/10 bg-elevated
                       hover:bg-elevated hover:border-accent/40
                       transition-all duration-300 rounded-xl relative overflow-hidden"
          >
            {/* Accent Bar */}
            <div className="absolute top-0 left-0 w-1 bg-accent h-0 group-hover:h-full transition-all duration-500"></div>

            {/* Icon */}
            <div className="text-accent mb-6">{service.icon}</div>

            {/* Content */}
            <h4 className="text-2xl font-serif mb-4 text-ink">
              {service.title}
            </h4>
            <p className="text-ink-muted leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* =========================================================
         ABOUT
      ========================================================= */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-base"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-accent"></div>

                <div className="bg-elevated p-10 rounded-lg border border-hairline shadow-2xl">
                  <Sparkles className="text-accent w-12 h-12 mb-6" />
                  <h3 className="text-3xl font-serif mb-6 leading-snug">
                    "We believe that a clean environment creates a clear mind."
                  </h3>
                  <p className="text-ink-muted italic">– The Harden Made Team</p>
                </div>

                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-accent"></div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-3">
                Why Choose Us
              </h2>
              <h3 className="text-4xl font-serif font-bold mb-8">
                The Harden Made Standard
              </h3>
              <p className="text-ink-muted mb-8 leading-relaxed">
                We don’t just clean. We elevate the environment around you.
              </p>

              <div className="space-y-4">
                {[
                  "Professional & Background-Checked Staff",
                  "Eco-Friendly Products Available",
                  "100% Satisfaction Guarantee",
                  "Customized Cleaning Plans",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Check size={16} />
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         GALLERY
      ========================================================= */}
      <section id="gallery" className="py-24 bg-elevated border-t border-accent/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-3">
              Our Work
            </h2>
            <h3 className="text-4xl font-serif font-bold">See the Difference</h3>
            <p className="text-ink-muted mt-4 max-w-2xl mx-auto">
              Real homes we've turned over across the East Valley — every photo
              below is our own finished work, not a stock image.
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {PORTFOLIO_FILTERS.map((label) => {
              const count =
                label === "All"
                  ? PORTFOLIO.length
                  : PORTFOLIO.filter((p) => p.category === label).length;
              const active = galleryFilter === label;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setGalleryFilter(label);
                    setLightboxIndex(null);
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                    active
                      ? "bg-accent text-accent-fg border-accent"
                      : "border-hairline text-ink-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {label}
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Photo grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePhotos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-accent/20 hover:border-accent transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <img
                  src={photo.src}
                  alt={photo.title + " — " + photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Caption panel: always legible on mobile, reveals on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block mb-2 px-2.5 py-1 rounded-full bg-accent/90 text-accent-fg text-[10px] font-bold uppercase tracking-widest">
                    {photo.category}
                  </span>
                  <h4 className="text-white font-serif text-xl font-bold leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-white/80 text-sm mt-1 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    {photo.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-ink-muted mt-12">
            Want your place to look like this?{" "}
            <button
              onClick={() => scrollToSection("contact")}
              className="text-accent font-bold hover:underline"
            >
              Get a free quote
            </button>
          </p>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && visiblePhotos[lightboxIndex] && (
          <div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={visiblePhotos[lightboxIndex].title}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(-1);
              }}
              className="absolute left-3 sm:left-8 text-white/60 hover:text-white p-3"
              aria-label="Previous photo"
            >
              <ArrowRight size={32} className="rotate-180" />
            </button>

            <figure
              className="max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={visiblePhotos[lightboxIndex].src}
                alt={visiblePhotos[lightboxIndex].title}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
              <figcaption className="mt-5 text-center max-w-xl">
                <h4 className="text-white font-serif text-2xl font-bold">
                  {visiblePhotos[lightboxIndex].title}
                </h4>
                <p className="text-white/70 mt-2">
                  {visiblePhotos[lightboxIndex].caption}
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-3">
                  {lightboxIndex + 1} / {visiblePhotos.length}
                </p>
              </figcaption>
            </figure>

            <button
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(1);
              }}
              className="absolute right-3 sm:right-8 text-white/60 hover:text-white p-3"
              aria-label="Next photo"
            >
              <ArrowRight size={32} />
            </button>
          </div>
        )}
      </section>

      {/* =========================================================
         CONTACT
      ========================================================= */}
      <section id="contact" className="py-24 bg-surface border-t border-accent/20">
        <div className="container mx-auto px-6 text-center">

          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Ready for a fresh start?
            </h2>
            <p className="text-xl text-ink-muted mb-12">
              Reach out today for a free consultation and quote.
            </p>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-elevated rounded-lg border border-hairline">
                <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
                <h4 className="font-bold mb-2">Call Us</h4>
                <p className="text-ink-muted">(602) 721-1009</p>
              </div>

              <div className="p-6 bg-elevated rounded-lg border border-hairline">
                <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
                <h4 className="font-bold mb-2">Email Us</h4>
                <p className="text-ink-muted">info@hardenmade.com</p>
              </div>

              <div className="p-6 bg-elevated rounded-lg border border-hairline">
                <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
                <h4 className="font-bold mb-2">Service Area</h4>
                <p className="text-ink-muted">East Valley</p>
              </div>
            </div>

            {/* FORM */}
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="bg-elevated p-8 rounded-xl border border-accent/10 text-left max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* SUCCESS OVERLAY */}
              {submitStatus === "success" && (
                <div className="absolute inset-0 bg-elevated/95 flex flex-col items-center justify-center z-20">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-ink-muted">
                    Your request has been delivered to our team.
                  </p>
                </div>
              )}

              {/* NAME + PHONE */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink-subtle mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className="w-full bg-base border border-gray-700 rounded p-3 text-ink focus:border-accent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink-subtle mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="user_phone"
                    required
                    value={formData.user_phone}
                    onChange={handleInputChange}
                    className="w-full bg-base border border-gray-700 rounded p-3 text-ink focus:border-accent"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-ink-subtle mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-base border border-gray-700 rounded p-3 text-ink focus:border-accent h-32"
                  placeholder="Tell us about your cleaning needs..."
                ></textarea>
              </div>

              {/* =======================================================
                 ONE UPLOAD BOX → MULTIPLE EMAILJS FILE ATTACHMENTS
              ======================================================= */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-widest text-ink-subtle mb-4">
                  Upload Photos (Optional)
                </label>

                {/* ONE Visual Upload Box */}
                <label className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer group block">
                  <Upload className="w-8 h-8 text-ink-subtle group-hover:text-accent mx-auto mb-2" />
                  <span className="text-ink-muted text-sm group-hover:text-ink">
                    {fileNames.length > 0
                      ? `${fileNames.length} file(s) selected`
                      : "Click to upload up to 3 images"}
                  </span>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleUnifiedFileUpload}
                  />
                </label>

                {/* Name Previews */}
                {fileNames.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {fileNames.map((name, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-ink-muted bg-base p-2 rounded border border-gray-800"
                      >
                        <ImageIcon size={14} /> {name}
                      </div>
                    ))}
                  </div>
                )}

                {/* Hidden EmailJS inputs */}
                <input
                  type="file"
                  name="my_file1"
                  ref={fileInput1Ref}
                  className="hidden"
                />
                <input
                  type="file"
                  name="my_file2"
                  ref={fileInput2Ref}
                  className="hidden"
                />
                <input
                  type="file"
                  name="my_file3"
                  ref={fileInput3Ref}
                  className="hidden"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent text-accent-fg font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  "Send Request"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================
         FOOTER
      ========================================================= */}
      <footer className="py-12 bg-surface text-center text-ink-subtle text-sm border-t border-hairline">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <p className="mb-4">&copy; 2026 Harden Made LLC. All Rights Reserved.</p>

          <div className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:text-ink">
            <span>Created with</span>
            <Heart className="text-red-500 fill-red-500 animate-pulse" size={14} />
            <span>by</span>

            <a
              href="https://moguldesignagency.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-elevated px-4 py-2 rounded-full border border-accent/20 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(232,126,161,0.3)] transition-all duration-300"
            >
              <img
                src="/Lightbulb.png"
                alt="Mogul Design Agency"
                className="w-4 h-4 object-contain group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out"
              />
              <span className="font-bold uppercase tracking-wider text-xs text-accent">
                Mogul Design Agency
              </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}