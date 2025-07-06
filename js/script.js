    //меню бургер
    window.addEventListener('DOMContentLoaded', () => {
      const burger = document.getElementById('burger');
      const nav = document.querySelector('.nav');
      const header = document.querySelector('.site-header');
    
      burger.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
      });
    
      // Закрити меню, якщо клік поза header
      document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
          nav.classList.remove('active');
        }
      });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
      const buttons = document.querySelectorAll('.children-tab-button');
      const contents = document.querySelectorAll('.children-tab-content');
  
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
  
          btn.classList.add('active');
          const tabId = btn.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
        });
      });
    });
  
  
    document.addEventListener('DOMContentLoaded', () => {
      const buttons = document.querySelectorAll('.tab-button');
      const contents = document.querySelectorAll('.tabs-content');
  
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          // Відключити всі кнопки і контент
          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
  
          // Активувати натиснуту кнопку та відповідний контент
          btn.classList.add('active');
          const tabId = btn.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
        });
      });
    });
  
  
    const track = document.querySelector('.carousel-track');
    let slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    const visibleSlidesCount = 3;
    let currentIndex = visibleSlidesCount; // стартуємо зі слайда №3 (після клонів)
    let isTransitioning = false;
    
    function cloneSlides() {
      // Клонуємо останні visibleSlidesCount слайдів в початок
      for (let i = slides.length - visibleSlidesCount; i < slides.length; i++) {
        const clone = slides[i].cloneNode(true);
        clone.classList.add('clone');
        track.insertBefore(clone, track.firstChild);
      }
      // Клонуємо перші visibleSlidesCount слайдів в кінець
      for (let i = 0; i < visibleSlidesCount; i++) {
        const clone = slides[i].cloneNode(true);
        clone.classList.add('clone');
        track.appendChild(clone);
      }
      slides = Array.from(track.children);
      track.style.width = `${slideWidth * slides.length}px`;
    }
    
    function setTrackPosition(index, animate = true) {
      if (animate) {
        track.style.transition = 'transform 0.5s ease';
      } else {
        track.style.transition = 'none';
      }
      track.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    
    cloneSlides();
    setTrackPosition(currentIndex, false);
    
    nextButton.addEventListener('click', () => {
      if (isTransitioning) return;
      if (currentIndex >= slides.length - visibleSlidesCount) return;
    
      isTransitioning = true;
      currentIndex++;
      setTrackPosition(currentIndex);
    });
    
    prevButton.addEventListener('click', () => {
      if (isTransitioning) return;
      if (currentIndex <= 0) return;
    
      isTransitioning = true;
      currentIndex--;
      setTrackPosition(currentIndex);
    });
    
    track.addEventListener('transitionend', () => {
      // Якщо дійшли до клонів у кінці
      if (currentIndex === slides.length - visibleSlidesCount) {
        currentIndex = visibleSlidesCount;
        setTrackPosition(currentIndex, false);
      }
      // Якщо дійшли до клонів на початку
      if (currentIndex === visibleSlidesCount - 1) {
        currentIndex = slides.length - (visibleSlidesCount * 2);
        setTrackPosition(currentIndex, false);
      }
      isTransitioning = false;
    });