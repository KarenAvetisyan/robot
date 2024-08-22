document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                el = el.trim()
                if (all) {
                return [...document.querySelectorAll(el)]
                } else {
                return document.querySelector(el)
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }
        /* Easy on scroll event listener  */
        const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
        }
        
        // бургер
        on('click', '.js-burger', function(e){
                select('.js-burger').classList.toggle('clicked');
                select('nav').classList.toggle('show');
                select('.nav__overlay').classList.toggle('show');
        })
        on('click', '.nav__overlay, .nav__link',  function(e){
                e.preventDefault();
                select('.js-burger').classList.remove('clicked');
                select('nav').classList.remove('show');
                select('.nav__overlay').classList.remove('show');
        }, true)
        // якоря 
        on('click', '.scrollTo', function(e) {
                if (select(this.hash)) {
                        e.preventDefault();
                        const href = e.target.getAttribute("href");
                        const offsetTop = select(href).offsetTop - 70;
                
                        scroll({
                                top: offsetTop,
                                behavior: "smooth"
                        });
                }
        }, true)
        new Swiper(".feedbackSwiper", {
                slidesPerView: 2,
                spaceBetween: 42,
                pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                },
                breakpoints: {
                        300: {
                          slidesPerView: 1,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 42,
                        }
                      },
        });

        // observer, анимация на скролле 
        const inViewport = (element, observer) => {
        element.forEach(entry => {
                entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
                element.forEach(item => {
                if(item.target.classList.contains('is-inViewport') && !item.target.classList.contains('watched')){
                item.target.classList.add("watched");
                }
                })
        });
        };
        let ioConfiguration = {
        rootMargin: '0% 0% 0% 0%',
        threshold: 0.2
        };
        const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
        const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
        ELs_inViewport.forEach(EL => {
        Obs.observe(EL, obsOptions);
        });

        // MODAL 
        document.addEventListener('click', function (e) {
                if (!e.target.matches('[data-show-modal]')) return;
                else{
                e.preventDefault();
                var modal = document.querySelectorAll('#'+e.target.dataset.id);
                Array.prototype.forEach.call(modal, function (el) {
                        el.classList.add('active');
                });
                }
        });
        document.addEventListener('click', function (e) {
                if (!e.target.matches('[data-close-modal]')) return;
                else{
                e.target.closest('.modal').classList.remove('active');
                }
        });
        
        //DROPDOWN 
        HTMLElement.prototype.slideToggle = function(duration, callback) {
                if (this.clientHeight === 0) {
                _s(this, duration, callback, true);
                this.parentNode.classList.add('is-open')
                } else {
                _s(this, duration, callback);
                this.parentNode.classList.remove('is-open')
                }
        };
        function _s(el, duration, callback, isDown) {
        
                if (typeof duration === 'undefined') duration = 400;
                if (typeof isDown === 'undefined') isDown = false;
        
                el.style.overflow = "hidden";
                if (isDown) el.style.display = "block";
        
                var elStyles        = window.getComputedStyle(el);
        
                var elHeight        = parseFloat(elStyles.getPropertyValue('height'));
                var elPaddingTop    = parseFloat(elStyles.getPropertyValue('padding-top'));
                var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
                var elMarginTop     = parseFloat(elStyles.getPropertyValue('margin-top'));
                var elMarginBottom  = parseFloat(elStyles.getPropertyValue('margin-bottom'));
        
                var stepHeight        = elHeight        / duration;
                var stepPaddingTop    = elPaddingTop    / duration;
                var stepPaddingBottom = elPaddingBottom / duration;
                var stepMarginTop     = elMarginTop     / duration;
                var stepMarginBottom  = elMarginBottom  / duration;
        
                var start;
        
                function step(timestamp) {
        
                if (start === undefined) start = timestamp;
        
                var elapsed = timestamp - start;
        
                if (isDown) {
                el.style.height        = (stepHeight        * elapsed) + "px";
                el.style.paddingTop    = (stepPaddingTop    * elapsed) + "px";
                el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
                el.style.marginTop     = (stepMarginTop     * elapsed) + "px";
                el.style.marginBottom  = (stepMarginBottom  * elapsed) + "px";
                } else {
                el.style.height        = elHeight        - (stepHeight        * elapsed) + "px";
                el.style.paddingTop    = elPaddingTop    - (stepPaddingTop    * elapsed) + "px";
                el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
                el.style.marginTop     = elMarginTop     - (stepMarginTop     * elapsed) + "px";
                el.style.marginBottom  = elMarginBottom  - (stepMarginBottom  * elapsed) + "px";
                }
        
                if (elapsed >= duration) {
                el.style.height        = "";
                el.style.paddingTop    = "";
                el.style.paddingBottom = "";
                el.style.marginTop     = "";
                el.style.marginBottom  = "";
                el.style.overflow      = "";
                if (!isDown) el.style.display = "none";
                if (typeof callback === 'function') callback();
                } else {
                window.requestAnimationFrame(step);
                }
                }
        
                window.requestAnimationFrame(step);
        }
        document.addEventListener("click", function(e){
                if(!e.target.classList.contains('drop-head')){
                }
                else {
                var nextPanel = e.target.nextElementSibling;
                nextPanel.slideToggle(200);
                }
        })

})
