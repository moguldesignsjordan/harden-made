import React, { useState, useEffect, useRef } from 'react';
import { Crown, Star, Home, Building, Truck, Phone, Mail, MapPin, Menu, X, Check, ArrowRight, Sparkles, Upload, Image as ImageIcon, Heart, Loader2 } from 'lucide-react';

// --- STEP 1: UNCOMMENT THIS LINE LOCALLY AFTER RUNNING: npm install @emailjs/browser ---
// import emailjs from '@emailjs/browser';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Reference for EmailJS to access the form directly
  const form = useRef();

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    user_name: '', // Changed to match common EmailJS template defaults
    user_phone: '',
    message: ''
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // --- FORM HANDLERS ---
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(newFiles);
    }
  };

  // Handle Form Submission via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // ------------------------------------------------------------------
    // PASTE YOUR API KEYS HERE
    // ------------------------------------------------------------------
    const SERVICE_ID = 'YOUR_SERVICE_ID';   // Example: 'service_x8s7v2a'
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Example: 'template_92d7v2a'
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Example: 'user_Kj2...' or 'vA92...'
    // ------------------------------------------------------------------

    // --- STEP 2: UNCOMMENT THIS BLOCK LOCALLY TO ENABLE EMAIL SENDING ---
    /*
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log("Email sent successfully:", result.text);
          setIsSubmitting(false);
          setSubmitStatus('success');
          
          // Reset form
          setFormData({ user_name: '', user_phone: '', message: '' });
          setFiles([]);
          
          // Clear success message after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
          console.error("Email failed:", error.text);
          setIsSubmitting(false);
          alert("Failed to send message. Please check your internet connection and API keys.");
      });
    */

    // --- REMOVE THIS SIMULATION BLOCK WHEN USING REAL EMAILS ---
    console.log("Simulating EmailJS send...", formData);
    setTimeout(() => {
       setIsSubmitting(false);
       setSubmitStatus('success');
       setFormData({ user_name: '', user_phone: '', message: '' });
       setFiles([]);
       setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
    // ----------------------------------------------------------
  };

  return (
    <div className="min-h-screen bg-[#120516] text-white font-sans selection:bg-[#e87ea1] selection:text-[#120516]">
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#120516]/95 backdrop-blur-md border-b border-[#e87ea1]/20 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo Text */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Crown className="w-8 h-8 text-[#e87ea1]" />
            <div className="text-2xl font-serif font-bold tracking-wider">
              HARDEN<span className="text-[#e87ea1]">MADE</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Gallery', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm uppercase tracking-widest hover:text-[#e87ea1] transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 border border-[#e87ea1] text-[#e87ea1] hover:bg-[#e87ea1] hover:text-[#120516] rounded-full transition-all duration-300 uppercase text-xs font-bold tracking-widest"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#e87ea1]" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#1e0b24] border-b border-[#e87ea1]/20 py-6 px-6 flex flex-col gap-4 shadow-2xl">
            {['Services', 'About', 'Gallery', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-lg font-serif hover:text-[#e87ea1]"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-2 w-full py-3 bg-[#e87ea1] text-[#120516] font-bold rounded"
            >
              BOOK NOW
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e87ea1] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          
          {/* Logo Placeholder */}
          <div className="mx-auto w-32 h-32 md:w-48 md:h-48 mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-[#e87ea1]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <Crown className="w-20 h-20 md:w-32 md:h-32 text-[#e87ea1] drop-shadow-[0_0_15px_rgba(232,126,161,0.5)]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Excellence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e87ea1] to-white">Delivered</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Experience a royal standard of clean. Professional residential and commercial cleaning services tailored to your lifestyle.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 bg-[#e87ea1] text-[#120516] font-bold tracking-widest uppercase overflow-hidden rounded-sm hover:shadow-[0_0_20px_rgba(232,126,161,0.4)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 border border-white/20 hover:bg-white/5 font-bold tracking-widest uppercase rounded-sm transition-all duration-300"
            >
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#180a1e]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#e87ea1] uppercase tracking-widest text-sm font-bold mb-3">What We Do</h2>
            <h3 className="text-4xl font-serif font-bold">Our Royal Services</h3>
            <div className="w-24 h-1 bg-[#e87ea1] mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Home size={40} />,
                title: "Residential Cleaning",
                desc: "Keep your castle pristine with our deep cleaning, standard maintenance, and organizational services tailored for homes."
              },
              {
                icon: <Building size={40} />,
                title: "Commercial Spaces",
                desc: "Impress your clients with a spotless office. We handle desks, common areas, restrooms, and floors with executive care."
              },
              {
                icon: <Truck size={40} />,
                title: "Move-In / Move-Out",
                desc: "Moving is stressful enough. Let us handle the cleaning to ensure you get your deposit back or walk into a fresh start."
              }
            ].map((service, idx) => (
              <div key={idx} className="group p-8 border border-[#e87ea1]/10 bg-[#1e0b24] hover:bg-[#250d2c] hover:border-[#e87ea1]/40 transition-all duration-300 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#e87ea1] group-hover:h-full transition-all duration-500"></div>
                <div className="text-[#e87ea1] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-serif mb-4">{service.title}</h4>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#120516]">
           {/* Subtle pattern overlay could go here */}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-[#e87ea1]"></div>
                <div className="bg-[#1e0b24] p-10 rounded-lg border border-white/5 shadow-2xl">
                  <Sparkles className="text-[#e87ea1] w-12 h-12 mb-6" />
                  <h3 className="text-3xl font-serif mb-6 leading-snug">
                    "We believe that a clean environment creates a clear mind."
                  </h3>
                  <p className="text-gray-400 italic">- The Harden Made Team</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-[#e87ea1]"></div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-[#e87ea1] uppercase tracking-widest text-sm font-bold mb-3">Why Choose Us</h2>
              <h3 className="text-4xl font-serif font-bold mb-8">The Harden Made Standard</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We are not just cleaners; we are caretakers of your space. Our team is dedicated to delivering excellence in every corner, crevice, and surface.
              </p>

              <div className="space-y-4">
                {[
                  "Professional & Background-Checked Staff",
                  "Eco-Friendly Cleaning Products Available",
                  "100% Satisfaction Guarantee",
                  "Customized Cleaning Plans"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e87ea1]/10 flex items-center justify-center text-[#e87ea1]">
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

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-[#1e0b24] border-t border-[#e87ea1]/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#e87ea1] uppercase tracking-widest text-sm font-bold mb-3">Our Work</h2>
            <h3 className="text-4xl font-serif font-bold">See the Difference</h3>
            <div className="w-24 h-1 bg-[#e87ea1] mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative aspect-[4/3] bg-[#120516] rounded-xl overflow-hidden border border-[#e87ea1]/20 hover:border-[#e87ea1] transition-all duration-300">
                {/* Placeholder Content - Replace with <img src="your-image.jpg" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-[#e87ea1] mb-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-gray-500 text-sm group-hover:text-[#e87ea1] transition-colors">Add Project Image {item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#180a1e] border-t border-[#e87ea1]/20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">Ready for a fresh start?</h2>
            <p className="text-xl text-gray-400 mb-12">
              Reach out today for a free consultation and quote.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-[#1e0b24] rounded-lg border border-white/5 flex flex-col items-center hover:border-[#e87ea1]/50 transition-colors">
                <Phone className="w-8 h-8 text-[#e87ea1] mb-4" />
                <h4 className="font-bold mb-2">Call Us</h4>
                <p className="text-gray-400">(555) 123-4567</p>
              </div>
              <div className="p-6 bg-[#1e0b24] rounded-lg border border-white/5 flex flex-col items-center hover:border-[#e87ea1]/50 transition-colors">
                <Mail className="w-8 h-8 text-[#e87ea1] mb-4" />
                <h4 className="font-bold mb-2">Email Us</h4>
                <p className="text-gray-400">info@hardenmade.com</p>
              </div>
              <div className="p-6 bg-[#1e0b24] rounded-lg border border-white/5 flex flex-col items-center hover:border-[#e87ea1]/50 transition-colors">
                <MapPin className="w-8 h-8 text-[#e87ea1] mb-4" />
                <h4 className="font-bold mb-2">Service Area</h4>
                <p className="text-gray-400">Phoenix Metropolitan Area</p>
              </div>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="bg-[#1e0b24] p-8 rounded-xl border border-[#e87ea1]/10 text-left max-w-2xl mx-auto relative overflow-hidden">
              {submitStatus === 'success' && (
                <div className="absolute inset-0 bg-[#1e0b24]/95 flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We'll get back to you shortly.</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                  <input 
                    type="text" 
                    name="user_name" 
                    value={formData.user_name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#120516] border border-gray-700 rounded p-3 text-white focus:border-[#e87ea1] focus:outline-none transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#120516] border border-gray-700 rounded p-3 text-white focus:border-[#e87ea1] focus:outline-none transition-colors" 
                    placeholder="(555) 000-0000" 
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#120516] border border-gray-700 rounded p-3 text-white focus:border-[#e87ea1] focus:outline-none transition-colors h-32" 
                  placeholder="Tell us about your cleaning needs..."
                ></textarea>
              </div>

              {/* Image Upload Field */}
              <div className="mb-8">
                 <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Upload Photos (Optional)</label>
                 <label className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-[#e87ea1] hover:bg-[#1e0b24] transition-all cursor-pointer group block relative">
                    <Upload className="w-8 h-8 text-gray-500 group-hover:text-[#e87ea1] mx-auto mb-2 transition-colors" />
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                      {files.length > 0 ? `${files.length} file(s) selected` : "Click to upload images of your space"}
                    </span>
                    {/* IMPORTANT: EmailJS file input needs a name attribute to attach */}
                    <input 
                      type="file" 
                      name="my_file"
                      className="hidden" 
                      multiple 
                      accept="image/*"
                      onChange={handleFileChange} 
                    />
                 </label>
                 
                 {/* File Preview List */}
                 {files.length > 0 && (
                   <div className="mt-3 space-y-2">
                     {files.map((file, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-xs text-gray-400 bg-[#120516] p-2 rounded border border-gray-800">
                         <ImageIcon size={14} />
                         <span className="truncate">{file.name}</span>
                       </div>
                     ))}
                   </div>
                 )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-[#e87ea1] text-[#120516] font-bold uppercase tracking-widest hover:bg-white transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Sending...
                  </>
                ) : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-center text-gray-600 text-sm border-t border-[#1e0b24]">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <p className="mb-4">&copy; 2025 Harden Made LLC. All Rights Reserved.</p>
          
          {/* Mogul Design Agency Credit */}
          <div className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:text-white">
            <span>Created with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            
            <a href="https://moguldesignagency.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1e0b24] px-4 py-2 rounded-full border border-[#e87ea1]/20 group-hover:border-[#e87ea1] group-hover:shadow-[0_0_15px_rgba(232,126,161,0.3)] transition-all duration-300">
               {/* Updated with user logo path */}
               <img src="/Lightbulb.png" alt="Mogul Design Agency" className="w-4 h-4 object-contain group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
               <span className="font-bold uppercase tracking-wider text-xs text-[#e87ea1]">Mogul Design Agency</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}