const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const copyEmailButton = document.getElementById("copyEmail");
const toast = document.getElementById("toast");
const year = document.getElementById("year");

let toastTimer = null;

function setMenuOpen(isOpen) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.classList.toggle("hidden", !isOpen);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 1600);
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!expanded);
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const link = target.closest("a[href^='#']");
  if (link) {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const section = document.querySelector(href);
    if (!(section instanceof HTMLElement)) return;

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    history.pushState(null, "", href);
  }
});

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.getAttribute("data-email") || "";
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied");
    } catch {
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      showToast("Email copied");
    }
  });
}

document.querySelectorAll("[data-placeholder-link]").forEach((element) => {
  if (!(element instanceof HTMLAnchorElement)) return;
  element.addEventListener("click", (event) => {
    event.preventDefault();
    const label = element.getAttribute("data-placeholder-link") || "Link";
    showToast(`${label} link not set yet`);
  });
});
