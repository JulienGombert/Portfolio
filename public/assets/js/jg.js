function isOverflown({
    clientWidth, clientHeight, scrollWidth, scrollHeight
  }) {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  }
  
  function isVisible(parent, child) {
    return !(
      (child.offsetLeft - parent.offsetLeft >= parent.offsetWidth)
      || (child.offsetTop - parent.offsetTop >= parent.offsetHeight)
    );
  }
  
  function init() {
    const page = document.querySelector('[data-main-page]');
    const header = document.querySelector('[data-header]');
    const topbar = document.querySelector('[data-topbar]');
    const nav = header.querySelector('[data-nav]');
    const navItems = nav.querySelectorAll('[data-nav-item]');
    const mobileNavList = document.querySelector('[data-mobile-nav-list]');
    const mobileNavItems = document.querySelectorAll('[data-mobile-nav-item]');
    const mobileNavTriggers = document.querySelectorAll('[data-mobile-nav-trigger]');
    const mobileNavOverlay = document.querySelector('[data-mobile-nav-overlay]');
  
    // Resize Observer checking whether to show mobile nav button based on if a nav element is overflowing
    const showMobileNavButton = () => {
      const navHidden = getComputedStyle(nav, null).display === 'none';
      if (navHidden) {
        mobileNavItems.forEach((item) => {
          item.classList.add('is-visible');
        });
      }
  
      const resizeObserver = new window.ResizeObserver((entries) => {
        for (const entry of entries) {
          header.classList.toggle('has-mobile-button', isOverflown(nav));
          navItems.forEach((item) => {
            const navItems = Array.from(mobileNavItems);
            const matchingNavItem = navItems.find(el => el.dataset.mobileNavItem === item.dataset.navItem);
  
            matchingNavItem.classList.toggle('is-visible', !isVisible(nav, item));
          });
        }
      });
  
      resizeObserver.observe(nav);
    };
  
    // Mobile nav button open/close
    mobileNavTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        mobileNavTriggers.forEach((trigger) => trigger.classList.toggle('is-active'));
        document.body.classList.toggle('is-mobilenav-open');
      });
    });
  
    // Mobile nav overlay close
    mobileNavOverlay.addEventListener('click', () => {
      mobileNavTriggers.forEach((trigger) => {
        trigger.classList.remove('is-active');
      });
      document.body.classList.remove('is-mobilenav-open');
    });
  
    showMobileNavButton();
  }
  
  init();



  // neuomorphic
  $('a.emboss').on('mousedown', function(){
    $(this).addClass('emboss-press');
  }).on('mouseup', function() {
    $(this).removeClass('emboss-press');
  });
  // end neuomorphic