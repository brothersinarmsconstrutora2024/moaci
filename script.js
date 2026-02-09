// ===== SCROLL SUAVE PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== VALIDAÇÃO DO FORMULÁRIO =====
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const consent = document.querySelector("#consent").checked;

      if (!name || !email || !phone) {
        event.preventDefault();
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      if (!consent) {
        event.preventDefault();
        alert("Você precisa aceitar a Política de Privacidade para prosseguir.");
        return;
      }

      // Validação de e-mail simples
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        event.preventDefault();
        alert("Por favor, insira um e-mail válido.");
        return;
      }

      // Validação de telefone (mínimo 10 dígitos)
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        event.preventDefault();
        alert("Por favor, insira um telefone válido com DDD.");
        return;
      }

      // Se tudo ok, o formulário é enviado normalmente para o FormSubmit.co
      // Registrar evento no Google Analytics
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", {
          event_category: "Formulário",
          event_label: "Lead Planalto Paulista"
        });
      }
    });
  }
});

// ===== RASTREAMENTO DE EVENTOS GA NOS BOTÕES CTA =====
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".cta-btn").forEach(button => {
    button.addEventListener("click", function () {
      if (typeof gtag === "function") {
        gtag("event", "click", {
          event_category: "CTA",
          event_label: button.textContent.trim()
        });
      }
    });
  });
});

// ===== ANIMAÇÃO DE ENTRADA DO HERO =====
document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero-content h1");
  const heroSubtitle = document.querySelector(".hero-content h2");

  if (heroTitle && heroSubtitle) {
    heroTitle.style.opacity = "0";
    heroSubtitle.style.opacity = "0";

    setTimeout(() => {
      heroTitle.style.transition = "opacity 1.5s ease-in-out";
      heroTitle.style.opacity = "1";
    }, 300);

    setTimeout(() => {
      heroSubtitle.style.transition = "opacity 1.5s ease-in-out";
      heroSubtitle.style.opacity = "1";
    }, 800);
  }
});

// ===== RASTREAMENTO DO WHATSAPP =====
document.addEventListener("DOMContentLoaded", function () {
  const whatsappBtn = document.querySelector(".whatsapp-float");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
      if (typeof gtag === "function") {
        gtag("event", "click", {
          event_category: "WhatsApp",
          event_label: "Botão Flutuante"
        });
      }
    });
  }
});
