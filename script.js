/**
 * BECAFE Rourkela - Modern Website Scripts
 * Clean, lightweight, dependency-free vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================
  // CONFIGURATION CONSTANTS
  // Easily editable by owner / developer
  // ==========================================
  const WHATSAPP_NUMBER = "8637252654";

  // Menu Data Structure
  // Verified items for CLASSICS are from official data.
  // Other categories are marked as clearly editable templates.
  const MENU_DATA = {
    classics: [
      {
        name: "Espresso Italiano",
        price: "M ₹59",
        desc: "Authentic single/double extraction with intense aroma and hazelnut-brown crema."
      },
      {
        name: "Espresso Americano",
        price: "M ₹89 · L ₹119",
        desc: "Bold shots of espresso softened with hot filtered water for a clean, rich cup."
      },
      {
        name: "Cappuccino",
        price: "M ₹99 · L ₹129",
        desc: "Equal balance of espresso, steamed whole milk, and dense micro-foam."
      },
      {
        name: "Cafe Latte",
        price: "M ₹109 · L ₹139",
        desc: "Silky steamed milk gently layered with rich espresso for a smooth daily sip."
      },
      {
        name: "Flat White",
        price: "M ₹109 · L ₹139",
        desc: "Double shot of rich espresso topped with flat, velvety steamed milk."
      },
      {
        name: "Cafe Mocha Special",
        price: "M ₹129 · L ₹159",
        desc: "Signature dark cocoa infused with espresso and velvety textured milk."
      }
    ],
    indulgence: [
      {
        name: "Caramel Macchiato",
        price: "M ₹139 · L ₹169",
        desc: "Fresh steamed milk marked with espresso and drizzled with artisan caramel."
      },
      {
        name: "Hazelnut Silk Latte",
        price: "M ₹139 · L ₹169",
        desc: "Our creamy latte infused with aromatic roasted hazelnut extracts."
      },
      {
        name: "Belgian Hot Chocolate",
        price: "M ₹149 · L ₹179",
        desc: "Thick, molten chocolate steamed with milk for pure dessert comfort."
      }
    ],
    iced: [
      {
        name: "Classic Iced Americano",
        price: "M ₹99 · L ₹129",
        desc: "Chilled espresso poured over crystal ice and crisp cold water."
      },
      {
        name: "Iced Caramel Latte",
        price: "M ₹139 · L ₹169",
        desc: "Espresso and chilled creamy milk swirled with sweet butter caramel."
      },
      {
        name: "Cold Brew On Tap",
        price: "M ₹129 · L ₹159",
        desc: "Steeped slowly over 16 hours for zero bitterness and sweet cocoa notes."
      }
    ],
    food: [
      {
        name: "Classic Cheese Toastie",
        price: "Add Actual Price",
        desc: "Crisp grilled sandwich stuffed with melted cheddar and mild herbs."
      },
      {
        name: "Paneer & Herb Panini",
        price: "Add Actual Price",
        desc: "Freshly pressed bread layered with spiced cottage cheese and green pesto."
      },
      {
        name: "Crispy Potato Wedges",
        price: "Add Actual Price",
        desc: "Golden tossed potato wedges seasoned with smoked paprika and café dip."
      }
    ],
    desserts: [
      {
        name: "Warm Fudgy Brownie",
        price: "Add Actual Price",
        desc: "Baked rich chocolate brownie served warm. Pair with an optional scoop of ice cream."
      },
      {
        name: "Classic Choco Lava",
        price: "Add Actual Price",
        desc: "Warm mini cake with a decadent melting molten chocolate center."
      },
      {
        name: "Affogato al Cafe",
        price: "Add Actual Price",
        desc: "A generous scoop of vanilla ice cream drowned in hot, freshly pulled espresso."
      }
    ]
  };

  // ==========================================
  // WHATSAPP URL BUILDER
  // ==========================================
  function openWhatsApp(customMessage) {
    if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "REPLACE_WITH_BECAFE_WHATSAPP_NUMBER") {
      alert("WhatsApp number is not configured yet. Please update script.js with Becafe's WhatsApp contact.");
      return;
    }
    const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
    const encodedText = encodeURIComponent(customMessage);
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  // ==========================================
  // DYNAMIC MENU RENDERING & TABS
  // ==========================================
  const menuGrid = document.getElementById("menuGrid");
  const tabButtons = document.querySelectorAll(".menu-tab");

  function renderCategory(categoryKey) {
    const items = MENU_DATA[categoryKey] || [];
    menuGrid.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "menu-item-card";

      card.innerHTML = `
        <div>
          <div class="item-header">
            <h3 class="item-name">${item.name}</h3>
            <span class="item-price">${item.price}</span>
          </div>
          <p class="item-desc">${item.desc}</p>
        </div>
        <div class="item-action-row">
          <button type="button" class="btn-item-order" data-order-name="${item.name}">
            Order on WhatsApp <span>→</span>
          </button>
        </div>
      `;
      menuGrid.appendChild(card);
    });

    // Attach click listeners to item order buttons
    menuGrid.querySelectorAll(".btn-item-order").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemName = btn.getAttribute("data-order-name");
        openWhatsApp(`Hi Becafe! I'd like to order: ${itemName}.`);
      });
    });
  }

  // Tab switcher
  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabButtons.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const category = tab.getAttribute("data-category");
      renderCategory(category);
    });
  });

  // Initial render: Classics
  renderCategory("classics");

  // ==========================================
  // GENERAL WHATSAPP BUTTON BINDINGS
  // ==========================================
  // General Inquiry Buttons
  document.querySelectorAll(".js-wa-general").forEach((btn) => {
    btn.addEventListener("click", () => {
      openWhatsApp("Hi Becafe! I'd like to ask about your menu and place an order.");
    });
  });

  // Event / Gathering Inquiry
  document.querySelectorAll(".js-wa-event").forEach((btn) => {
    btn.addEventListener("click", () => {
      openWhatsApp("Hi Becafe! I would like to inquire about hosting / bulk ordering for an upcoming gathering in Rourkela.");
    });
  });

  // Featured Pick Custom Orders
  document.querySelectorAll(".js-order-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-name") || "your featured specials";
      openWhatsApp(`Hi Becafe! I am interested in trying the ${productName}. Could you share more details?`);
    });
  });

  // ==========================================
  // STICKY HEADER SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // ==========================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    menuToggle.classList.toggle("is-active");
    navMenu.classList.toggle("open");
  });

  // Close mobile nav when clicking a link
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.classList.remove("is-active");
      navMenu.classList.remove("open");
    });
  });

  // ==========================================
  // SCROLL REVEAL OBSERVER
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // ==========================================
  // DYNAMIC FOOTER YEAR
  // ==========================================
  const yearSpan = document.getElementById("yearSpan");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
