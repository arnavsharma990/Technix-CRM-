// T-CRM Platform - Enhanced JavaScript
// Complete script that adds modern interactions, charts, and animations

document.addEventListener("DOMContentLoaded", function() {
    // ----- GLOBAL INITIALIZATION -----
    // Initialize all components and features
    initNavigation();
    initToggleFeatures();
    initFormValidation();
    initCharts();
    initAnimations();
    initTabSystem();
    initPricingToggle();
    initTestimonialSlider();
    initScrollEffects();
    initNotificationSystem();
    initDarkModeToggle();
    
    // ----- NAVIGATION & HEADER -----
    function initNavigation() {
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      
      // Mobile menu toggle
      if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          navLinks.classList.toggle('active');
          document.body.classList.toggle('menu-open');
        });
      }
      
      // Sticky header
      const header = document.querySelector('.site-header');
      let lastScrollTop = 0;
      
      window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
          header.classList.add('scrolled');
          
          if (scrollTop > lastScrollTop) {
            header.classList.add('header-hidden');
          } else {
            header.classList.remove('header-hidden');
          }
        } else {
          header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
      });
      
      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
              mobileMenuToggle.classList.remove('active');
              navLinks.classList.remove('active');
              document.body.classList.remove('menu-open');
            }
            
            // Calculate header height for offset
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
              top: targetPosition - headerHeight,
              behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
              link.classList.remove('active');
            });
            this.classList.add('active');
          }
        });
      });
      
      // Set active nav link based on scroll position
      window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
          }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      });
    }
    
    // ----- FORM VALIDATION & HANDLING -----
    function initFormValidation() {
      // Demo form validation
      const demoForm = document.querySelector('.demo-form');
      
      if (demoForm) {
        const formGroups = demoForm.querySelectorAll('.form-group');
        
        // Add required attribute to all required fields
        formGroups.forEach(group => {
          const label = group.querySelector('.form-label');
          const input = group.querySelector('.form-input, .form-select');
          
          if (label && input && label.textContent.includes('*')) {
            input.setAttribute('required', 'true');
          }
        });
        
        // Real-time validation
        const inputs = demoForm.querySelectorAll('.form-input, .form-select');
        inputs.forEach(input => {
          input.addEventListener('blur', function() {
            validateInput(this);
          });
          
          input.addEventListener('input', function() {
            if (this.classList.contains('input-error')) {
              validateInput(this);
            }
          });
        });
        
        // Form submission
        demoForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          let isValid = true;
          
          // Validate all inputs
          inputs.forEach(input => {
            if (!validateInput(input)) {
              isValid = false;
            }
          });
          
          if (isValid) {
            simulateFormSubmission(this);
          }
        });
        
        // Input validation function
        function validateInput(input) {
          const parent = input.parentElement;
          clearError(input);
          
          // Required field validation
          if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, `This field is required`);
            return false;
          }
          
          // Email validation
          if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              showError(input, 'Please enter a valid email address');
              return false;
            }
          }
          
          // Phone validation (if present)
          if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
            if (!phoneRegex.test(input.value)) {
              showError(input, 'Please enter a valid phone number');
              return false;
            }
          }
          
          return true;
        }
        
        // Show error message
        function showError(input, message) {
          const parent = input.parentElement;
          
          // Create error element
          const errorElement = document.createElement('div');
          errorElement.className = 'error-message';
          errorElement.textContent = message;
          
          // Add error styles
          input.classList.add('input-error');
          parent.appendChild(errorElement);
          
          // Animate error appearance
          setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
          }, 10);
        }
        
        // Clear error message
        function clearError(input) {
          const parent = input.parentElement;
          const errorElement = parent.querySelector('.error-message');
          
          input.classList.remove('input-error');
          
          if (errorElement) {
            errorElement.style.opacity = '0';
            errorElement.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
              parent.removeChild(errorElement);
            }, 300);
          }
        }
        
        // Simulate form submission
        function simulateFormSubmission(form) {
          // Show loading state
          const submitButton = form.querySelector('button[type="submit"]');
          const originalText = submitButton.innerHTML;
          
          submitButton.disabled = true;
          submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
          
          // Simulate server request
          setTimeout(() => {
            // Hide form
            form.style.opacity = '0';
            form.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
              form.style.display = 'none';
              
              // Show success message
              const formContainer = document.querySelector('.demo-form-container');
              const successMessage = document.createElement('div');
              successMessage.className = 'success-message';
              successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Thank you for your interest!</h3>
                <p>We've received your request and will contact you within 24 hours to schedule your personalized demo.</p>
                <button class="back-button">Back to Form</button>
              `;
              
              formContainer.appendChild(successMessage);
              
              // Animate success message appearance
              setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
                
                // Add back button functionality
                const backButton = successMessage.querySelector('.back-button');
                backButton.addEventListener('click', () => {
                  // Hide success message
                  successMessage.style.opacity = '0';
                  successMessage.style.transform = 'translateY(-20px)';
                  
                  setTimeout(() => {
                    formContainer.removeChild(successMessage);
                    
                    // Show form again
                    form.style.display = 'block';
                    form.reset();
                    
                    setTimeout(() => {
                      form.style.opacity = '1';
                      form.style.transform = 'translateY(0)';
                      submitButton.disabled = false;
                      submitButton.innerHTML = originalText;
                    }, 10);
                  }, 300);
                });
              }, 10);
            }, 300);
          }, 1500);
        }
      }
      
      // Newsletter form validation
      const newsletterForm = document.querySelector('.newsletter-form');
      if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const emailInput = this.querySelector('input[type="email"]');
          const emailValue = emailInput.value.trim();
          
          if (!emailValue) {
            showToast('Please enter your email address', 'error');
            return;
          }
          
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailValue)) {
            showToast('Please enter a valid email address', 'error');
            return;
          }
          
          // Simulate subscription
          emailInput.value = '';
          showToast('Thank you for subscribing to our newsletter!', 'success');
        });
      }
    }
    
    // ----- CHARTS & DATA VISUALIZATION -----
    function initCharts() {
      // Only proceed if ApexCharts is loaded
      if (typeof ApexCharts === 'undefined') {
        console.warn('ApexCharts not loaded. Charts will not be initialized.');
        return;
      }
      
      // Sales Performance Chart
      const salesChartElement = document.getElementById('sales-chart');
      if (salesChartElement) {
        const salesChartOptions = {
          series: [
            {
              name: 'Revenue',
              data: [52000, 65000, 48000, 56000, 69000, 91000, 87000, 99000, 105000, 120000, 112000, 140000]
            },
            {
              name: 'Deals Closed',
              data: [18, 22, 17, 21, 26, 37, 31, 36, 42, 48, 43, 53]
            }
          ],
          chart: {
            type: 'area',
            height: 350,
            toolbar: {
              show: false
            },
            fontFamily: 'Poppins, sans-serif',
            zoom: {
              enabled: false
            }
          },
          colors: ['#0081cc', '#4fc08d'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 90, 100]
            }
          },
          grid: {
            borderColor: '#e0e0e0',
            row: {
              colors: ['transparent'],
              opacity: 0.5
            }
          },
          markers: {
            size: 4,
            hover: {
              size: 6
            }
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
              style: {
                colors: '#7c8798',
                fontSize: '12px'
              }
            }
          },
          yaxis: [
            {
              title: {
                text: 'Revenue ($)',
                style: {
                  color: '#0081cc'
                }
              },
              labels: {
                formatter: function(val) {
                  return '$' + (val / 1000) + 'k';
                },
                style: {
                  colors: '#7c8798'
                }
              }
            },
            {
              opposite: true,
              title: {
                text: 'Deals Closed',
                style: {
                  color: '#4fc08d'
                }
              },
              labels: {
                style: {
                  colors: '#7c8798'
                }
              }
            }
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function(value, { seriesIndex }) {
                return seriesIndex === 0 ? '$' + value.toLocaleString() : value;
              }
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right'
          },
          responsive: [
            {
              breakpoint: 768,
              options: {
                yaxis: {
                  show: false
                }
              }
            }
          ]
        };
        
        const salesChart = new ApexCharts(salesChartElement, salesChartOptions);
        salesChart.render();
      }
      
      // Lead Generation Chart
      const leadsChartElement = document.getElementById('leads-chart');
      if (leadsChartElement) {
        const leadsChartOptions = {
          series: [
            {
              name: 'New Leads',
              data: [840, 920, 880, 1100, 1250, 1400, 1650, 1500, 1750, 1856, 2000, 2150]
            },
            {
              name: 'Conversion Rate',
              data: [18, 19, 17, 21, 22, 22, 23, 21, 23, 24, 25, 26]
            }
          ],
          chart: {
            type: 'bar',
            height: 350,
            toolbar: {
              show: false
            },
            fontFamily: 'Poppins, sans-serif'
          },
          colors: ['#955cf7', '#ff8b26'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 4
            }
          },
          dataLabels: {
            enabled: false
          },
          grid: {
            borderColor: '#e0e0e0'
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
              style: {
                colors: '#7c8798',
                fontSize: '12px'
              }
            }
          },
          yaxis: [
            {
              title: {
                text: 'New Leads',
                style: {
                  color: '#955cf7'
                }
              },
              labels: {
                style: {
                  colors: '#7c8798'
                }
              }
            },
            {
              opposite: true,
              title: {
                text: 'Conversion Rate (%)',
                style: {
                  color: '#ff8b26'
                }
              },
              labels: {
                formatter: function(val) {
                  return val + '%';
                },
                style: {
                  colors: '#7c8798'
                }
              }
            }
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function(value, { seriesIndex }) {
                return seriesIndex === 0 ? value.toLocaleString() : value + '%';
              }
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right'
          }
        };
        
        const leadsChart = new ApexCharts(leadsChartElement, leadsChartOptions);
        leadsChart.render();
      }
      
      // Customer Retention Chart
      const customerChartElement = document.getElementById('customer-chart');
      if (customerChartElement) {
        const customerChartOptions = {
          series: [
            {
              name: 'Retention Rate',
              data: [73, 76, 79, 81, 83, 85, 86, 88, 90, 92, 93, 94]
            },
            {
              name: 'Customer Satisfaction',
              data: [4.1, 4.2, 4.3, 4.3, 4.4, 4.5, 4.5, 4.6, 4.7, 4.8, 4.8, 4.9]
            }
          ],
          chart: {
            type: 'line',
            height: 350,
            toolbar: {
              show: false
            },
            fontFamily: 'Poppins, sans-serif',
            dropShadow: {
              enabled: true,
              top: 5,
              left: 0,
              blur: 4,
              opacity: 0.1
            }
          },
          colors: ['#ff5d7a', '#2dce89'],
          stroke: {
            curve: 'smooth',
            width: [3, 3]
          },
          grid: {
            borderColor: '#e0e0e0',
            row: {
              colors: ['transparent'],
              opacity: 0.5
            }
          },
          markers: {
            size: 5,
            strokeWidth: 0,
            hover: {
              size: 7
            }
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
              style: {
                colors: '#7c8798',
                fontSize: '12px'
              }
            }
          },
          yaxis: [
            {
              title: {
                text: 'Retention Rate (%)',
                style: {
                  color: '#ff5d7a'
                }
              },
              labels: {
                formatter: function(val) {
                  return val + '%';
                },
                style: {
                  colors: '#7c8798'
                }
              },
              min: 70,
              max: 100
            },
            {
              opposite: true,
              title: {
                text: 'Customer Satisfaction (1-5)',
                style: {
                  color: '#2dce89'
                }
              },
              labels: {
                formatter: function(val) {
                  return val.toFixed(1);
                },
                style: {
                  colors: '#7c8798'
                }
              },
              min: 4,
              max: 5
            }
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function(value, { seriesIndex }) {
                return seriesIndex === 0 ? value + '%' : value.toFixed(1) + '/5';
              }
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right'
          }
        };
        
        const customerChart = new ApexCharts(customerChartElement, customerChartOptions);
        customerChart.render();
      }
    }
    
    // ----- TAB SYSTEM -----
    function initTabSystem() {
      const tabButtons = document.querySelectorAll('.tab-button');
      const tabContents = document.querySelectorAll('.tab-content');
      
      if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
          button.addEventListener('click', () => {
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activate clicked tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const activeContent = document.getElementById(`${tabId}-content`);
            
            if (activeContent) {
              activeContent.classList.add('active');
              
              // Trigger resize event for charts to properly render in tabs
              window.dispatchEvent(new Event('resize'));
            }
          });
        });
      }
    }
    
    // ----- PRICING TOGGLE -----
    function initPricingToggle() {
      const billingToggle = document.getElementById('billing-toggle');
      const monthlyAmounts = document.querySelectorAll('.amount.monthly');
      const annualAmounts = document.querySelectorAll('.amount.annual');
      
      if (billingToggle) {
        billingToggle.addEventListener('change', function() {
          if (this.checked) {
            // Annual pricing
            monthlyAmounts.forEach(el => el.style.display = 'none');
            annualAmounts.forEach(el => el.style.display = 'inline');
          } else {
            // Monthly pricing
            monthlyAmounts.forEach(el => el.style.display = 'inline');
            annualAmounts.forEach(el => el.style.display = 'none');
          }
        });
        
        // Set initial state
        if (billingToggle.checked) {
          monthlyAmounts.forEach(el => el.style.display = 'none');
          annualAmounts.forEach(el => el.style.display = 'inline');
        } else {
          monthlyAmounts.forEach(el => el.style.display = 'inline');
          annualAmounts.forEach(el => el.style.display = 'none');
        }
      }
    }
    
    // ----- TESTIMONIAL SLIDER -----
    function initTestimonialSlider() {
      const testimonialSlider = document.querySelector('.testimonials-slider');
      const testimonialCards = document.querySelectorAll('.testimonial-card');
      const dotsContainer = document.querySelector('.nav-dots');
      const dots = document.querySelectorAll('.dot');
      const prevButton = document.querySelector('.nav-button.prev');
      const nextButton = document.querySelector('.nav-button.next');
      
      if (testimonialSlider && testimonialCards.length > 0) {
        let currentSlide = 0;
        const totalSlides = testimonialCards.length;
        
        // Function to update slider
        function updateSlider() {
          // Hide all slides
          testimonialCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(50px)';
            card.style.zIndex = '0';
            
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          });
          
          // Show current slide
          setTimeout(() => {
            testimonialCards[currentSlide].style.display = 'block';
            
            setTimeout(() => {
              testimonialCards[currentSlide].style.opacity = '1';
              testimonialCards[currentSlide].style.transform = 'translateX(0)';
              testimonialCards[currentSlide].style.zIndex = '1';
            }, 50);
          }, 300);
          
          // Update dots
          dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
          });
        }
        
        // Initialize slider controls
        if (prevButton && nextButton) {
          // Previous button
          prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
          });
          
          // Next button
          nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
          });
          
          // Dot navigation
          dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
              currentSlide = index;
              updateSlider();
            });
          });
          
          // Auto-advance slider every 6 seconds
          let slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
          }, 6000);
          
          // Pause auto-advance on hover
          testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
          });
          
          // Resume auto-advance when mouse leaves
          testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
              currentSlide = (currentSlide + 1) % totalSlides;
              updateSlider();
            }, 6000);
          });
        }
      }
    }
    
    // ----- ANIMATIONS -----
    function initAnimations() {
      // Animate elements when they come into view
      const animatableElements = document.querySelectorAll('.section-header, .hero-text-wrapper, .feature-card, .pricing-card, .testimonial-card, .demo-wrapper');
      
      // Intersection Observer for animations
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            animationObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Observe all animatable elements
      animatableElements.forEach(element => {
        animationObserver.observe(element);
      });
      
      // Feature card hover effects
      const featureCards = document.querySelectorAll('.feature-card');
      featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
          this.classList.remove('hover');
        });
      });
      
      // Add "animated" class to visible elements on load
      setTimeout(() => {
        document.querySelectorAll('.hero-text-wrapper, .hero-image-wrapper').forEach(el => {
          el.classList.add('animated');
        });
      }, 100);
      
      // Add counter animation to metrics
      const metricValues = document.querySelectorAll('.metric-value');
      
      metricValues.forEach(metricValue => {
        const finalValue = metricValue.textContent;
        let prefix = '';
        let suffix = '';
        let targetNumber = 0;
        
        // Extract numeric value and any prefix/suffix
        if (finalValue.includes('$')) {
          prefix = '$';
          targetNumber = parseFloat(finalValue.replace(/[$,]/g, ''));
        } else if (finalValue.includes('%')) {
          suffix = '%';
          targetNumber = parseFloat(finalValue.replace('%', ''));
        } else if (finalValue.includes('/')) {
          const parts = finalValue.split('/');
          targetNumber = parseFloat(parts[0]);
          suffix = '/' + parts[1];
        } else {
          targetNumber = parseFloat(finalValue.replace(/,/g, ''));
        }
        
        // Set starting value
        metricValue.textContent = prefix + '0' + suffix;
        metricValue.setAttribute('data-target', targetNumber);
        metricValue.setAttribute('data-prefix', prefix);
        metricValue.setAttribute('data-suffix', suffix);
      });
      
      // Animate metrics when they come into view
      const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateMetric(entry.target);
            metricsObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      metricValues.forEach(metric => {
        metricsObserver.observe(metric);
      });
      
      function animateMetric(metricElement) {
        const target = parseFloat(metricElement.getAttribute('data-target'));
        const prefix = metricElement.getAttribute('data-prefix');
        const suffix = metricElement.getAttribute('data-suffix');
        const duration = 2000; // Animation duration in ms
        const frameDuration = 16; // ~60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        const formatter = new Intl.NumberFormat();
        
        const animate = () => {
          frame++;
          const progress = frame / totalFrames;
          const currentValue = Math.round(target * Math.min(progress, 1));
          
          // Format with commas for thousands
          const formattedValue = formatter.format(currentValue);
          
          metricElement.textContent = prefix + formattedValue + suffix;
          
          if (frame < totalFrames) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }
    }
    
    // ----- SCROLL EFFECTS -----
    function initScrollEffects() {
      // Parallax effect on hero image
      const heroImage = document.querySelector('.hero-image-wrapper');
      const floatingCards = document.querySelectorAll('.floating-card');
      
      if (heroImage) {
        window.addEventListener('scroll', () => {
          const scrollValue = window.scrollY;
          if (scrollValue < 1000) { // Only apply effect near the top of the page
            heroImage.style.transform = `translateY(${scrollValue * 0.08}px)`;
            
            if (floatingCards.length > 0) {
              floatingCards[0].style.transform = `translate(-5%, ${-10 + scrollValue * 0.05}px)`;
              if (floatingCards[1]) {
                floatingCards[1].style.transform = `translate(5%, ${20 - scrollValue * 0.07}px)`;
              }
            }
          }
        });
      }
      
      // Add scroll indicator on hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<span></span><span></span><span></span>';
        heroSection.appendChild(scrollIndicator);
        
        // Scroll indicator click goes to features section
        scrollIndicator.addEventListener('click', () => {
          const featuresSection = document.querySelector('#features');
          if (featuresSection) {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const targetPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
              top: targetPosition - headerHeight,
              behavior: 'smooth'
            });
          }
        });
      }
    }
    
    // ----- TOGGLE FEATURES & UI ELEMENTS -----
    function initToggleFeatures() {
      // Feature comparison toggle
      const comparisonToggles = document.querySelectorAll('.comparison-toggle');
      
      comparisonToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
          const toggleContainer = this.closest('.comparison-toggles');
          const comparisonTable = document.querySelector('.comparison-table');
          
          // Update active toggle
          toggleContainer.querySelectorAll('.comparison-toggle').forEach(t => {
            t.classList.remove('active');
          });
          this.classList.add('active');
          
          // Show corresponding features
          const featureType = this.getAttribute('data-features');
          
          if (comparisonTable) {
            comparisonTable.setAttribute('data-active-view', featureType);
            
            // Animate changes
            const featureRows = comparisonTable.querySelectorAll('tr[data-feature-type]');
            
            featureRows.forEach(row => {
              if (featureType === 'all' || row.getAttribute('data-feature-type') === featureType) {
                row.style.display = 'table-row';
                setTimeout(() => {
                  row.style.opacity = '1';
                  row.style.transform = 'translateY(0)';
                }, 50);
              } else {
                row.style.opacity = '0';
                row.style.transform = 'translateY(10px)';
                setTimeout(() => {
                  row.style.display = 'none';
                }, 300);
              }
            });
          }
        });
      });
    }
    
    // ----- NOTIFICATION SYSTEM -----
    function initNotificationSystem() {
      // Toast notification system
      window.showToast = function(message, type = 'info', duration = 3500) {
        const toastContainer = document.querySelector('.toast-container');
        
        // Create toast container if it doesn't exist
        if (!toastContainer) {
          const newToastContainer = document.createElement('div');
          newToastContainer.className = 'toast-container';
          document.body.appendChild(newToastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        toast.innerHTML = `
          <div class="toast-icon"><i class="fas fa-${icon}"></i></div>
          <div class="toast-message">${message}</div>
          <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to container
        document.querySelector('.toast-container').appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
          toast.classList.add('show');
        }, 10);
        
        // Setup close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
          removeToast(toast);
        });
        
        // Auto remove after duration
        setTimeout(() => {
          removeToast(toast);
        }, duration);
        
        function removeToast(toastElement) {
          toastElement.classList.remove('show');
          
          // Remove from DOM after animation
          setTimeout(() => {
            if (toastElement.parentNode) {
              toastElement.parentNode.removeChild(toastElement);
            }
          }, 300);
        }
      };
    }
    
    // ----- DARK MODE TOGGLE -----
    function initDarkModeToggle() {
      const darkModeToggle = document.getElementById('dark-mode-toggle');
      const htmlElement = document.documentElement;
      
      if (darkModeToggle) {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
          htmlElement.classList.add('dark-mode');
          darkModeToggle.checked = true;
        }
        
        // Handle theme toggle
        darkModeToggle.addEventListener('change', function() {
          if (this.checked) {
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
          } else {
            htmlElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
          }
          
          // Update charts for better visibility in dark mode
          if (typeof ApexCharts !== 'undefined') {
            ApexCharts.getAllCharts().forEach(chart => {
              chart.updateOptions({
                chart: {
                  background: this.checked ? '#1a202c' : '#fff'
                },
                theme: {
                  mode: this.checked ? 'dark' : 'light'
                },
                grid: {
                  borderColor: this.checked ? '#2d3748' : '#e0e0e0'
                },
                xaxis: {
                  labels: {
                    style: {
                      colors: this.checked ? '#cbd5e0' : '#7c8798'
                    }
                  }
                }
              }, false, true);
            });
          }
        });
      }
    }
  });