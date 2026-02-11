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

// ===== FORMULÁRIO DE CONTATO (AJAX + SEÇÃO DE AGRADECIMENTO) =====
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact-form");
  const mainContent = document.querySelector("#main-content");
  const thankYouSection = document.querySelector("#thank-you-section");
  const thankYouBtn = document.querySelector(".thank-you-btn");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const consent = document.querySelector("#consent").checked;

      if (!name || !email || !phone) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      if (!consent) {
        alert("Você precisa aceitar a Política de Privacidade para prosseguir.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
      }

      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        alert("Por favor, insira um telefone válido com DDD.");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      try {
        const formData = new FormData(form);
        const dataObj = Object.fromEntries(formData.entries());
        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataObj)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success === true) {
          if (typeof gtag === "function") {
            gtag("event", "generate_lead", {
              event_category: "Formulário",
              event_label: "Lead Planalto Paulista"
            });
          }
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          if (mainContent) mainContent.classList.add("hidden");
          if (thankYouSection) {
            thankYouSection.classList.add("visible");
            thankYouSection.setAttribute("aria-hidden", "false");
          }
          const whatsappFloat = document.querySelector(".whatsapp-float");
          if (whatsappFloat) whatsappFloat.style.display = "none";
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          throw new Error(data.message || "Erro ao enviar");
        }
      } catch (err) {
        alert("Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  if (thankYouBtn && mainContent && thankYouSection) {
    thankYouBtn.addEventListener("click", function (e) {
      e.preventDefault();
      mainContent.classList.remove("hidden");
      thankYouSection.classList.remove("visible");
      thankYouSection.setAttribute("aria-hidden", "true");
      const whatsappFloat = document.querySelector(".whatsapp-float");
      if (whatsappFloat) whatsappFloat.style.display = "";
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
