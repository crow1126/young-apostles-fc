import re

def update_css(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_target = """  /* Hero Section */
  .hero-section {
    min-height: 600px;
    padding: 2.25rem 0 2.5rem;
  }
  .hero-bg-image {
    object-position: center top !important;
  }
  .hero-headline {
    font-size: 1.75rem;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }
  .hero-subtitle {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .hero-content__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
  .hero-cta-row {
    flex-direction: column;
    width: 100%;
  }
  .btn-hero-primary, .btn-hero-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 1rem;
  }"""

    replacement = """  /* Hero Section Mobile Experience: Let the Photos Shine! */
  .hero-section {
    min-height: 85vh;
    min-height: 85dvh;
    display: flex;
    align-items: flex-end;
    padding: 1rem 0 1.5rem;
    position: relative;
  }
  .hero-bg-slide, .hero-bg-image {
    object-fit: cover !important;
    object-position: center 18% !important;
  }
  .hero-overlay {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.0) 0%,
      rgba(0, 0, 0, 0.0) 35%,
      rgba(3, 5, 12, 0.40) 55%,
      rgba(3, 5, 12, 0.82) 78%,
      rgba(3, 5, 12, 0.98) 100%
    ) !important;
  }
  .hero-content {
    width: 100%;
    padding: 0 0.85rem;
  }
  .hero-left {
    max-width: 100%;
    padding: 1.15rem 1.15rem !important;
    border-radius: 16px !important;
    background: linear-gradient(180deg, rgba(3, 6, 16, 0.65) 0%, rgba(3, 6, 16, 0.88) 100%) !important;
    backdrop-filter: blur(6px) !important;
    -webkit-backdrop-filter: blur(6px) !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5) !important;
  }
  .hero-slide-dots {
    margin-bottom: 0.6rem !important;
    padding: 4px 10px !important;
    gap: 6px !important;
  }
  .hero-headline {
    font-size: 1.35rem !important;
    line-height: 1.22 !important;
    margin-bottom: 0.5rem !important;
  }
  .hero-subtitle {
    font-size: 0.82rem !important;
    line-height: 1.45 !important;
    margin-bottom: 0.85rem !important;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .hero-content__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .hero-cta-row {
    flex-direction: column;
    width: 100%;
  }
  .btn-hero-primary, .btn-hero-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.7rem 1.1rem !important;
    font-size: 0.88rem !important;
  }"""

    # Normalize line endings
    content_norm = content.replace('\r\n', '\n')
    old_target_norm = old_target.replace('\r\n', '\n')
    replacement_norm = replacement.replace('\r\n', '\n')

    if old_target_norm in content_norm:
        new_content = content_norm.replace(old_target_norm, replacement_norm)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated mobile hero CSS in: {path}")
    else:
        print(f"Could not find target block in: {path}")

if __name__ == '__main__':
    update_css('css/styles.css')
    update_css('public/css/styles.css')
