/**
 * Portfolio Interactive Scripts for Deepak V K
 * Senior Graphic Designer & AI Creative
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbar();
  initStatsCounter();
  initSkillBars();
  initTimelineTabs();
  initProjectFilters();
  initCaseStudyModal();
  initYTVideoModal();
  initContactForm();
  initTestimonials();
  initBackToTop();
  initCopyEmail();
});

/* --------------------------------------------------------------------------
   1. Dynamic Typewriter Effect for Hero Section
--------------------------------------------------------------------------- */
function initTypewriter() {
  const roleElement = document.getElementById('typing-text');
  if (!roleElement) return;

  const roles = [
    'Senior Graphic Designer',
    'Brand Identity Specialist',
    'Commercial Packaging Expert',
    'Generative AI Creative',
    '3D & Motion Visualizer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   2. Sticky Navbar & Scroll Spy
--------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Animated Stats Counter Numbers
--------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              stat.textContent = target + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = count + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('about');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   4. Skill Progress Bars Animation
--------------------------------------------------------------------------- */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = width;
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

/* --------------------------------------------------------------------------
   5. Work Experience & Education Tabs
--------------------------------------------------------------------------- */
function initTimelineTabs() {
  const tabButtons = document.querySelectorAll('.timeline-tab-btn');
  const panels = document.querySelectorAll('.timeline-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Project Filter Tabs
--------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Case Study Modal Viewer
--------------------------------------------------------------------------- */
const caseStudyData = {
  // Packaging Design (3 Projects)
  'agfix-ultra': {
    title: 'AgFIX® ULTRA – Hydrophilic Foam Silver Pad 10 Packaging',
    category: 'Commercial Medical Packaging & Prepress',
    image: 'assets/images/projects/project-agfix-ultra.jpg',
    client: 'Dynamic Techno Medicals Pvt. Ltd.',
    timeline: 'Commercial Production Run',
    role: 'Senior Packaging Designer',
    tools: 'Adobe Illustrator, Adobe Photoshop, CorelDraw, Prepress Production',
    desc: 'Led the commercial packaging design and prepress production for AgFIX® ULTRA Hydrophilic Foam Silver Pad 10. Designed clear technical infographics illustrating the 4-layer dressing structure (Non-Adherent PE Net, Antimicrobial Silver Net, Absorbent PU Foam, Breathable PU Film), dual-panel medical instructions, sterile EO regulatory compliance symbols, barcode formatting, and high-accuracy offset print dielines.',
    highlights: ['4-Layer Technical Structure Graphic', '100% Sterile EO & ISO 13485 Regulatory Compliance', 'Offset Print Calibration & Die-line Precision']
  },
  'dyna-net-fixator': {
    title: 'DYNA® – Tubular Elastic Net Fixator Packaging',
    category: 'Healthcare & Medical Device Packaging',
    image: 'assets/images/projects/project-dyna-net-fixator.jpg',
    client: 'Dynamic Techno Medicals Pvt. Ltd.',
    timeline: 'Retail Packaging Rollout',
    role: 'Senior Graphic & Packaging Designer',
    tools: 'Adobe Illustrator, Photoshop, Prepress Production, Carton Dielines',
    desc: 'Created the commercial retail hanging carton packaging for DYNA® Tubular Elastic Net Fixator. Features dynamic blue wave brand identity geometry, instructional arm application photo window, key clinical indication callouts, multi-language caution panels, and precise dieline engineering optimized for retail display and fast assembly.',
    highlights: ['Hanging Carton Dieline & Assembly Engineering', 'Ergonomic Brand Visual Wave Motif', 'Multi-Language Regulatory Labeling']
  },
  'newmom-baby-wipes': {
    title: 'new mom™ – Baby Wipes 4-Theme Packaging Collection',
    category: 'FMCG & Maternal Care Packaging',
    image: 'assets/images/projects/project-newmom-baby-wipes.jpg',
    client: 'Dynamic Techno Medicals Pvt. Ltd.',
    timeline: 'Product Line Redesign',
    role: 'Lead Packaging Designer & Visualizer',
    tools: 'Adobe Illustrator, Photoshop, Vector Illustration, Flexible Pouch Prepress',
    desc: 'Conceptualized and designed a collection of four distinct flexible pouch packaging themes for new mom™ Baby Wipes (72 Wipes). Crafted diverse custom visual styles—including modern vibrant geometric blocks, playful hand-drawn toy doodles, whimsical woodland animals, and gentle pastel botanical florals—paired with resealable moisture-lock flip-lid dielines and dermatological safety certification badges.',
    highlights: ['4 Distinct Pattern & Illustration Themes', 'Flexible Pouch Moisture-Lock Dieline Design', 'Pediatric & Dermatological Safety Badging']
  },

  // Marketing Collateral (3 Projects)
  'elnova-corset': {
    title: 'ELNOVA® – Surgical Lumbo Sacral Corset Promotional Brochure',
    category: 'Medical Marketing Collateral & Print Campaign',
    image: 'assets/images/projects/project-elnova-corset.jpg',
    client: 'Dynamic Techno Medicals Pvt. Ltd.',
    timeline: 'Product Launch Campaign',
    role: 'Lead Visual Designer & Art Director',
    tools: 'Adobe Photoshop, Adobe Illustrator, InDesign, High-End Retouching',
    desc: 'Crafted a premium double-sided marketing brochure for the ELNOVA® Surgical Lumbo Sacral Corset under the creative concept "The Secret Lies in the Power of Black — Rare, Elegant & Valuable like a Black Pearl". Designed high-contrast photorealistic oyster pearl imagery, physician endorsement badge (#1 Doctor Prescribed), anatomical 4-stay aluminium support callouts, and clean technical sizing specifications for clinicians and patients.',
    highlights: ['Luxury Conceptual Art Direction ("Black Pearl")', 'Anatomical Feature Infographics & Diagrams', 'B2B & Clinical Detailing Collateral']
  },
  'casting-solutions': {
    title: 'Dynamic® – Comprehensive Casting Solutions Product Brochure',
    category: 'Healthcare Catalog & Sales Collateral',
    image: 'assets/images/projects/project-casting-solutions.jpg',
    client: 'Dynamic Techno Medicals Pvt. Ltd.',
    timeline: 'Hospital & Clinical Sales Kit',
    role: 'Senior Graphic Designer',
    tools: 'Adobe InDesign, Illustrator, Photoshop, Prepress Production',
    desc: 'Engineered a modern, clean product suite brochure showcasing Dynamic’s full orthopedic casting line (Fiberglass Cast Tape, POP Bandage, Cast Padding, Cotton Stockinette, and Cast Shoe). Leveraged an angled geometric frame grid with patient lifestyle photography, diamond product showcase pods with cyan/teal brand accents, and clear institutional order specifications.',
    highlights: ['Multi-Product Orthopedic Portfolio Grid', 'Dynamic Angled Geometric Visual System', 'Complete Prepress Print Production Specs']
  },
  'dyna-crepe-bandage': {
    title: 'DYNA® – Knitted Crepe Bandage Product Collateral',
    category: 'Medical Sales Collateral & Clinical Infographics',
    image: 'assets/images/projects/project-dyna-crepe-bandage.jpg',
    client: 'Dynamic Techno Medicals Pvt. Ltd.',
    timeline: 'Retail & Hospital Detailing',
    role: 'Senior Graphic & Collateral Designer',
    tools: 'Adobe Illustrator, Photoshop, InDesign, Iconography Design',
    desc: 'Designed a high-impact promotional flyer and clinical sales sheet for DYNA® Knitted Crepe Bandage. Built around a signature dynamic yellow and cyan diagonal ribbon motif, the collateral highlights key clinical advantages through custom iconography—elastic compression, joint flexibility, breathable airflow, hook-and-loop closure, and multi-size roll specs.',
    highlights: ['Custom Clinical Feature Iconography Suite', 'High-Energy Yellow & Cyan Brand Motifs', 'Dual-Audience (Doctor & Patient) Clarity']
  },

  // AI & Motion (3 Projects)
  'cyberneon-ai': {
    title: 'CyberNeon 2142 - Generative AI Creative Ad Campaign',
    category: 'Generative AI & Motion Graphics',
    image: 'assets/images/projects/project-cyberneon-ai.jpg',
    client: 'NextGen Creative Studio',
    timeline: '3 Weeks',
    role: 'AI Prompt Engineer & Visual Director',
    tools: 'Midjourney v6, Runway Gen-3, Kling AI, Adobe Photoshop, After Effects',
    desc: 'Spearheaded an experimental high-fashion cyber campaign harnessing multimodal generative AI pipelines. Combined precise prompt engineering, style LoRAs, and Adobe Suite compositing to produce cinematic 8K billboards and interactive video billboards.',
    highlights: ['70% Faster Turnaround Time', 'Multimodal Image-to-Video Workflow', 'High Fashion Cyberpunk Direction']
  },
  'chroma-ai': {
    title: 'CHROMA - The Future is Liquid Generative Motion Campaign',
    category: 'Generative AI & Motion Graphics',
    image: 'assets/images/projects/project-chroma-ai.jpg',
    client: 'Chroma Gen-3 Cinema Labs',
    timeline: '3 Weeks',
    role: 'Generative AI Director & Motion Designer',
    tools: 'Runway Gen-3 Alpha, Midjourney v6, After Effects, Topaz Video AI',
    desc: 'Explored liquid chrome and atmospheric physics using multimodal AI models. Generated fluid metallic fashion wearables, dynamic neon lighting dunes, and fluid motion poster sequences scaled for 4K digital cinema screens.',
    highlights: ['Cinematic Liquid Physics Motion', 'Style Consistent Prompt Engineering', '4K Digital Motion Posters']
  },
  'neural-motion': {
    title: 'Neural Drift - Cybernetic Kinetic Key Visuals',
    category: 'Generative AI & Kinetic Visuals',
    image: 'assets/images/projects/project-neural-motion.jpg',
    client: 'Synapse Tech Global',
    timeline: '2 Weeks',
    role: 'Creative AI Visualizer',
    tools: 'Midjourney v6, Octane Render, After Effects, Adobe Photoshop',
    desc: 'Developed signature key art visual campaign for an advanced neural computing summit. Blended translucent synaptic particle streams, amber energy fibers, and kinetic motion loops for interactive web hero banners and conference projections.',
    highlights: ['Kinetic Energy Particle Visuals', 'Multi-layer CGI Compositing', 'Interactive Conference Hero Visuals']
  },

  // UI/UX Design (3 Projects)
  'pet-buddies-uiux': {
    title: 'Pet Buddies – Pet Adoption Website & Mobile Experience',
    category: 'UI/UX Design & Responsive Platform',
    image: 'assets/images/projects/project-pet-buddies-uiux.jpg',
    client: 'Google UX Design Professional Certificate Portfolio',
    timeline: '6 Weeks (End-to-End Study)',
    role: 'Lead UX Researcher & Product Designer',
    tools: 'Figma, Hand-Drawn Paper Sketches, Low-Fi & Hi-Fi Wireframes, Usability Testing',
    desc: 'Designed a comprehensive responsive website and mobile experience to streamline pet adoption for shelter animals under the concept "Pets Make Life Brighter — Same Buddies Everywhere". Conducted extensive user research, hand-drawn wireframes, low/high-fidelity interactive prototypes in Figma, and multi-device adoption flows featuring structured breed filters, shelter reach-out locations, and animal care resources.',
    highlights: ['End-to-End Google UX Certificate Case Study', 'Paper Sketches to Hi-Fi Multi-Device Figma Flows', 'Clear Pet Adoption Search & Shelter Connection UX']
  },
  'meals-people-uiux': {
    title: 'Meals People – Food Donation App & Responsive Website',
    category: 'Social Impact UI/UX Case Study',
    image: 'assets/images/projects/project-meals-people-uiux.jpg',
    client: 'Google UX Design Professional Certificate Portfolio',
    timeline: '6 Weeks (Research & Iteration)',
    role: 'Lead UI/UX Designer & Researcher',
    tools: 'Figma, Miro, Usability Testing, Multi-Breakpoint Responsive Design',
    desc: 'Created a social-impact mobile application and responsive web experience connecting food donors with families facing food insecurity ("Good Food Brighter Communities — Small Actions Big Change"). Performed rigorous before/after usability studies for homepage and donation screens to eliminate drop-off points, designing across mobile, tablet, and desktop breakpoints with empathetic visual storytelling.',
    highlights: ['Usability Study: Before & After Flow Optimization', 'Full Responsive Design across Mobile, Tablet & Desktop', 'Social Impact UX: Donating, Listing & Hunger Relief']
  },
  'cuisineio-uiux': {
    title: 'Cuisineio – Restaurant Ordering App & Mobile Experience',
    category: 'Mobile Product Design & Food Delivery UX',
    image: 'assets/images/projects/project-cuisineio-uiux.jpg',
    client: 'Google UX Design Professional Certificate Portfolio',
    timeline: '5 Weeks (Concept to Prototype)',
    role: 'Lead UI/UX & Interaction Designer',
    tools: 'Figma, Wireframing, User Flow Mapping, 3D Mobile Mockups, Prototyping',
    desc: 'Architected an end-to-end mobile food ordering and table reservation application for urban restaurants under the theme "Delight in Every Bite". Formulated complete information architecture and user flow diagrams, low-fidelity wireflows, initial hand-drawn wireframe sketches, and photorealistic 3D mobile presentation mockups with live map tracking and table-side dine-in ordering.',
    highlights: ['Complete Information Architecture & User Flow Diagram', 'Hand-Drawn Sketches to Low-Fi Wireflows & Hi-Fi UI', 'Dual-Mode Experience: Location Delivery & Table-Side Dine-in']
  },

  // 3D & Events (3 Projects)
  'royal-wedding-stage-3d': {
    title: 'Royal Heritage Wedding Stage – 3D Palace Stage & Mandap Visuals',
    category: '3D Spatial Design & Heritage Architecture',
    image: 'assets/images/projects/project-royal-wedding-stage-3d.jpg',
    client: 'Ranga Events & EmFactor Event Productions',
    timeline: '3 Weeks (Spatial Pre-visualization)',
    role: '3D Spatial & Event Stage Designer',
    tools: '3Ds Max, V-Ray, Adobe Photoshop, AutoCAD Stage Layouts',
    desc: 'Engineered photorealistic 3D spatial models and lighting simulations for a royal heritage wedding stage and mandap setup. Modeled intricate ornate Rajasthani jharokha arches with traditional jaali lattice patterns, tiered semicircular riser steps, luxury seating diwan, warm golden backlighting, and dynamic floral border uplighting presented in a luxury commemorative client album.',
    highlights: ['Photorealistic V-Ray Architectural Lighting', 'Intricate Traditional Jaali & Jharokha Modeling', '1:1 Scale Stage Elevation & Production Blueprint']
  },
  'rustic-wedding-decor-3d': {
    title: 'Rustic Botanical Wedding – 3D Stage, Entrance & Spatial Decor Visuals',
    category: '3D Event Design & Spatial Pre-visualization',
    image: 'assets/images/projects/project-rustic-wedding-decor-3d.jpg',
    client: 'EmFactor Events & Private Wedding Clients',
    timeline: '3 Weeks (Full Spatial Package)',
    role: '3D Graphic & Event Spatial Visualizer',
    tools: '3Ds Max, V-Ray, Adobe Photoshop, Texture Mapping, Lighting Calibration',
    desc: 'Created a complete 3D event pre-visualization suite for an outdoor/banquet rustic botanical wedding celebration. Modeled and textured natural wood-slat backdrop stages with hanging floral foliage, circular spotlighting, rustic entrance archways, custom monogram logo backdrops, and interactive pallet-wood "Memory Lane" photo display walls.',
    highlights: ['Multi-Zone 3D Event Visualization (Stage, Entrance, Gallery)', 'Natural Wood & Foliage Photorealistic Shader Texturing', 'Warm Ambient Lighting & Fairy Light Simulation']
  },
  'arena-concert-stage-3d': {
    title: 'Mega Arena Live Concert – 3D Stage Architecture & LED Truss Visuals',
    category: '3D Stage Architecture & Arena Visuals',
    image: 'assets/images/projects/project-arena-concert-stage-3d.jpg',
    client: 'BigTree Events / Live Concert Production',
    timeline: '4 Weeks (Production Staging)',
    role: 'Lead 3D Stage & Spatial Visualizer',
    tools: '3Ds Max, V-Ray, After Effects, Stage Truss Layouts, Large-Scale LED Calibration',
    desc: 'Architected a massive stadium-scale live concert stage featuring an iconic curved structural arch truss, high-resolution curved LED backdrop wall, integrated multi-tier lighting wings with kinetic neon light bars, extended center catwalk runway, and atmospheric stadium crowd simulations for high-profile music festival performances.',
    highlights: ['Curved Truss Architecture & Rigging Layout', 'Stadium-Scale Crowd & Atmospheric Haze Simulation', 'Integrated LED Screen & Dynamic Lighting Truss Visuals']
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('case-study-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.open-case-study');

  if (!modalBackdrop) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = caseStudyData[projectId];
      if (!data) return;

      document.getElementById('modal-img').src = data.image;
      document.getElementById('modal-tag').textContent = data.category;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-desc').textContent = data.desc;
      document.getElementById('modal-client').textContent = data.client;
      document.getElementById('modal-timeline').textContent = data.timeline;
      document.getElementById('modal-tools').textContent = data.tools;

      const highlightsContainer = document.getElementById('modal-highlights');
      highlightsContainer.innerHTML = '';
      data.highlights.forEach(hl => {
        const item = document.createElement('div');
        item.className = 'modal-hl-item';
        item.innerHTML = `<span class="modal-hl-label">Key Highlight</span><span class="modal-hl-val">${hl}</span>`;
        highlightsContainer.appendChild(item);
      });

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling (Sends directly to dvk555@gmail.com)
--------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // Loading state
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formsubmit.co/ajax/dvk555@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Inquiry from ${name || 'Client'}`
        })
      });

      if (response.ok) {
        submitBtn.innerHTML = `<span>Message Sent! ✓</span>`;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        showToast('Thank you! Your message has been sent to dvk555@gmail.com. We will get back to you within 24 hours.');
        form.reset();
      } else {
        throw new Error('Server responded with status ' + response.status);
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
      // Fallback: Mailto link to guarantee delivery to dvk555@gmail.com
      submitBtn.innerHTML = `<span>Message Sent! ✓</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      showToast('Thank you! Redirecting to email dvk555@gmail.com...');
      window.location.href = `mailto:dvk555@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
      form.reset();
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 4000);
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* --------------------------------------------------------------------------
   9. Testimonials Carousel / Indicator Dots
--------------------------------------------------------------------------- */
function initTestimonials() {
  const dots = document.querySelectorAll('.testimonial-dot');
  const cards = document.querySelectorAll('.testimonial-card');

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      if (window.innerWidth <= 768 && cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Back to Top Button
--------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   11. Copy Email to Clipboard
--------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'dvk555@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email dvk555@gmail.com copied to clipboard!');
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  });
}

/* --------------------------------------------------------------------------
   12. YouTube Video Popup Modal
--------------------------------------------------------------------------- */
function initYTVideoModal() {
  const modal   = document.getElementById('yt-video-modal');
  const iframe  = document.getElementById('yt-iframe');
  const titleEl = document.getElementById('yt-modal-title');
  const closeBtn = document.getElementById('yt-modal-close-btn');

  if (!modal || !iframe) return;

  // Open modal when any play-video-btn is clicked
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.play-video-btn');
    if (!btn) return;

    const embedSrc   = btn.dataset.embedSrc;
    const videoTitle = btn.dataset.videoTitle || '';

    if (!embedSrc) return;

    // Set title
    if (titleEl) titleEl.textContent = videoTitle;

    // Use the exact embed URL provided by YouTube, append autoplay
    iframe.src = embedSrc + '&autoplay=1';

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeYTModal() {
    modal.classList.remove('active');
    // Stop video by clearing src
    setTimeout(() => { iframe.src = ''; }, 320);
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeYTModal);

  // Click on backdrop (outside card) closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeYTModal();
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeYTModal();
    }
  });
}
