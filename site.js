const galleryRoot = document.querySelector("[data-screenshot-gallery]");

if (galleryRoot) {
  const mobileGalleryMedia = window.matchMedia("(max-width: 900px)");
  const activeImage = galleryRoot.querySelector("[data-screenshot-active-image]");
  const activeLabel = galleryRoot.querySelector("[data-screenshot-active-label]");
  const activeTitle = galleryRoot.querySelector("[data-screenshot-active-title]");
  const activeDescription = galleryRoot.querySelector("[data-screenshot-active-description]");
  const activeSupport = galleryRoot.querySelector("[data-screenshot-active-support]");
  const openButton = galleryRoot.querySelector("[data-screenshot-open]");
  const thumbButtons = Array.from(galleryRoot.querySelectorAll("[data-screenshot-thumb]"));

  const modal = document.querySelector("[data-screenshot-modal]");
  const modalImage = modal?.querySelector("[data-screenshot-modal-image]");
  const modalTitle = modal?.querySelector("[data-screenshot-modal-title]");
  const modalCloseButtons = modal ? Array.from(modal.querySelectorAll("[data-screenshot-close]")) : [];

  function getActiveThumb() {
    return thumbButtons.find((thumbButton) => thumbButton.classList.contains("is-active")) || thumbButtons[0] || null;
  }

  function setActiveThumb(button) {
    if (!button) {
      return;
    }

    thumbButtons.forEach((thumbButton) => {
      const isActive = thumbButton === button;
      thumbButton.classList.toggle("is-active", isActive);
      thumbButton.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    activeImage.src = button.dataset.image;
    activeImage.alt = button.dataset.alt || "";
    activeLabel.textContent = button.dataset.label || "";
    activeTitle.textContent = button.dataset.title || "";
    activeDescription.textContent = button.dataset.description || "";
    activeSupport.textContent = button.dataset.support || "";
  }

  function openModal(button = null) {
    if (!modal || !modalImage || !modalTitle) {
      return;
    }

    const modalSource = button || getActiveThumb();

    modal.hidden = false;
    modalImage.src = modalSource?.dataset?.image || activeImage.src;
    modalImage.alt = modalSource?.dataset?.alt || activeImage.alt;
    modalTitle.textContent = modalSource?.dataset?.title || activeTitle.textContent;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) {
      return;
    }

    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  thumbButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (mobileGalleryMedia.matches) {
        openModal(button);
        return;
      }

      setActiveThumb(button);
    });
  });

  openButton?.addEventListener("click", () => openModal());
  modalCloseButtons.forEach((button) => button.addEventListener("click", closeModal));
  modal?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });
}
