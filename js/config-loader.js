/**
 * InForce - Premium Smartphone Parts Shop
 * Configuration Loader
 * 
 * This script loads and parses the configuration from a text file
 * and populates the website with the data.
 */

class ConfigLoader {
    constructor() {
        this.configData = null;
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.searchResults = [];
        window.configLoader = this; // Make available globally
    }

    /**
     * Load the configuration from the text file
     */
    async loadConfig() {
        try {
            const response = await fetch('config.txt');
            if (!response.ok) {
                throw new Error(`Failed to load configuration: ${response.status} ${response.statusText}`);
            }
            
            const text = await response.text();
            this.configData = this.parseConfig(text);
            
            // Apply the configuration to the website
            this.applyConfig();
        } catch (error) {
            console.error('Error loading configuration:', error);
            
            // Show error message and fallback to defaults
            this.showLoadingError();
            this.setDefaultConfig();
            this.applyConfig();
        }
    }

    /**
     * Show error message if config fails to load
     */
    showLoadingError() {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <div class="container">
                <p>Не удалось загрузить конфигурацию сайта. Используются данные по умолчанию.</p>
            </div>
        `;
        
        document.body.insertBefore(errorMessage, document.querySelector('main'));
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMessage.style.opacity = '0';
            setTimeout(() => {
                errorMessage.remove();
            }, 500);
        }, 5000);
    }

    /**
     * Set default configuration if loading fails
     */
    setDefaultConfig() {
        this.configData = {
            services: [
                {
                    icon: 'fas fa-mobile-alt',
                    title: 'Ремонт смартфонов',
                    description: 'Профессиональный ремонт смартфонов любой сложности с гарантией на выполненные работы.'
                },
                {
                    icon: 'fas fa-tools',
                    title: 'Замена запчастей',
                    description: 'Быстрая и качественная замена дисплеев, аккумуляторов, разъемов и других компонентов.'
                },
                {
                    icon: 'fas fa-diagnoses',
                    title: 'Диагностика устройств',
                    description: 'Точная диагностика неисправностей вашего устройства с использованием профессионального оборудования.'
                },
                {
                    icon: 'fas fa-shield-alt',
                    title: 'Установка защиты',
                    description: 'Профессиональная установка защитных стекол и плёнок с гарантией качества.'
                }
            ],
            products: [
                {
                    category: 'Дисплеи',
                    name: 'Дисплей для iPhone 12',
                    brand: 'Apple',
                    price: '12 500',
                    compatibility: 'iPhone 12, iPhone 12 Pro',
                    avitoLink: ''
                },
                {
                    category: 'Дисплеи',
                    name: 'Дисплей для Samsung A52',
                    brand: 'Samsung',
                    price: '9 700',
                    compatibility: 'Samsung Galaxy A52, A52s',
                    avitoLink: ''
                },
                {
                    category: 'Дисплеи',
                    name: 'Дисплей для Xiaomi Redmi Note 10',
                    brand: 'Xiaomi',
                    price: '8 200',
                    compatibility: 'Xiaomi Redmi Note 10, Note 10 Pro',
                    avitoLink: ''
                },
                {
                    category: 'Аккумуляторы',
                    name: 'Аккумулятор для iPhone 13',
                    brand: 'Apple',
                    price: '5 900',
                    compatibility: 'iPhone 13, iPhone 13 Pro',
                    avitoLink: ''
                },
                {
                    category: 'Аккумуляторы',
                    name: 'Аккумулятор для Samsung S21',
                    brand: 'Samsung',
                    price: '4 200',
                    compatibility: 'Samsung Galaxy S21',
                    avitoLink: ''
                },
                {
                    category: 'Аккумуляторы',
                    name: 'Аккумулятор для Huawei P40',
                    brand: 'Huawei',
                    price: '3 800',
                    compatibility: 'Huawei P40, P40 Pro',
                    avitoLink: ''
                },
                {
                    category: 'Камеры',
                    name: 'Основная камера для iPhone 12',
                    brand: 'Apple',
                    price: '8 500',
                    compatibility: 'iPhone 12',
                    avitoLink: ''
                },
                {
                    category: 'Камеры',
                    name: 'Основная камера для Xiaomi Mi 11',
                    brand: 'Xiaomi',
                    price: '7 800',
                    compatibility: 'Xiaomi Mi 11',
                    avitoLink: ''
                },
                {
                    category: 'Разъемы',
                    name: 'Разъем зарядки для Huawei P40',
                    brand: 'Huawei',
                    price: '2 300',
                    compatibility: 'Huawei P40, P40 Pro',
                    avitoLink: ''
                },
                {
                    category: 'Разъемы',
                    name: 'Разъем зарядки для iPhone 12',
                    brand: 'Apple',
                    price: '3 200',
                    compatibility: 'iPhone 12, 12 Pro, 12 Pro Max',
                    avitoLink: ''
                }
            ],
            categories: ['Дисплеи', 'Аккумуляторы', 'Камеры', 'Разъемы'],
            features: [
                {
                    icon: 'fas fa-check-circle',
                    title: 'Качественные запчасти',
                    description: 'Мы работаем только с проверенными поставщиками, предлагая оригинальные или высококачественные совместимые запчасти.'
                },
                {
                    icon: 'fas fa-user-shield',
                    title: 'Гарантия на все работы',
                    description: 'Предоставляем гарантию на все выполненные работы и установленные запчасти сроком до 6 месяцев.'
                },
                {
                    icon: 'fas fa-bolt',
                    title: 'Быстрый ремонт',
                    description: 'Большинство ремонтов выполняется в течение 1-2 часов, что позволяет вам получить устройство обратно в тот же день.'
                },
                {
                    icon: 'fas fa-money-bill-wave',
                    title: 'Доступные цены',
                    description: 'Мы предлагаем конкурентные цены на все услуги и запчасти без ущерба для качества.'
                }
            ],
            workingHours: 'Пн-Пт: 10:00 - 20:00<br>Сб: 10:00 - 18:00<br>Вс: Выходной',
            socialLinks: {
                vk: 'https://vk.com/inforce_parts',
                telegram: 'https://t.me/inforce_parts',
                whatsapp: 'https://wa.me/79770922791'
            }
        };
    }

    /**
     * Parse the configuration text into a structured object
     * @param {string} configText - The raw text from the config file
     * @returns {Object} - Structured configuration object
     */
    parseConfig(configText) {
        const config = {
            siteConfig: {
                heroImage: 'assets/images/photos/hero-phone.jpg',
                mapCoordinates: '55.753414, 52.428531',
                mapZoom: 15,
                enable3DEffects: false,
                enableProductRotation: false,
                primaryColor: '#396AFC',
                secondaryColor: '#05D6D9',
                accentColor: '#F5B14C',
                textBlurOpacity: 0.75,
                textBlurIntensity: 10
            },
            services: [],
            products: [],
            categories: [],
            features: [],
            workingHours: '',
            socialLinks: {}
        };

        // Split the text into sections based on [SECTION_NAME] markers
        const sections = configText.split(/\[([A-Z_]+)\]/g);
        
        let currentSection = null;
        
        sections.forEach((section, index) => {
            section = section.trim();
            if (index % 2 === 1) {
                // This is a section name
                currentSection = section;
            } else if (section && currentSection) {
                // This is section content
                const lines = section.split('\n').filter(line => line.trim());
                
                switch (currentSection) {
                    case 'SITE_CONFIG':
                        lines.forEach(line => {
                            const parts = line.split('=').map(part => part.trim());
                            if (parts.length === 2) {
                                const [key, value] = parts;
                                // Convert boolean string values to actual boolean
                                if (value === 'true' || value === 'false') {
                                    config.siteConfig[this.camelCase(key)] = value === 'true';
                                } 
                                // Convert numeric string values to actual numbers
                                else if (!isNaN(value) && value.trim() !== '') {
                                    config.siteConfig[this.camelCase(key)] = Number(value);
                                } 
                                else {
                                    config.siteConfig[this.camelCase(key)] = value;
                                }
                            }
                        });
                        break;
                        
                    case 'SERVICES':
                        lines.forEach(line => {
                            const parts = line.split('|').map(part => part.trim());
                            if (parts.length >= 3) {
                                config.services.push({
                                    icon: parts[0],
                                    title: parts[1],
                                    description: parts[2]
                                });
                            }
                        });
                        break;
                        
                    case 'PRODUCTS':
                        lines.forEach(line => {
                            const parts = line.split('|').map(part => part.trim());
                            if (parts.length >= 6) {
                                const product = {
                                    category: parts[0],
                                    name: parts[1],
                                    brand: parts[2],
                                    price: parts[3],
                                    compatibility: parts[4],
                                    mainImage: parts[5],
                                    additionalImages: parts[6] ? parts[6].split(',').map(img => img.trim()) : [],
                                    description: parts[7] || 'Качественная запчасть для вашего устройства. Полная совместимость с указанными моделями.',
                                    avitoLink: parts[8] || ''
                                };
                                config.products.push(product);
                                
                                // Add category if not already in the list
                                if (!config.categories.includes(parts[0])) {
                                    config.categories.push(parts[0]);
                                }
                            }
                        });
                        break;

                    case 'FEATURES':
                        lines.forEach(line => {
                            const parts = line.split('|').map(part => part.trim());
                            if (parts.length >= 3) {
                                config.features.push({
                                    icon: parts[0],
                                    title: parts[1],
                                    description: parts[2]
                                });
                            }
                        });
                        break;
                        
                    case 'WORKING_HOURS':
                        config.workingHours = lines.join('<br>');
                        break;
                        
                    case 'SOCIAL_LINKS':
                        lines.forEach(line => {
                            const parts = line.split('=').map(part => part.trim());
                            if (parts.length === 2) {
                                config.socialLinks[parts[0]] = parts[1];
                            }
                        });
                        break;
                }
            }
        });
        
        return config;
    }

    /**
     * Apply the loaded configuration to the website
     */
    applyConfig() {
        if (!this.configData) return;
        
        // Hide loading overlay once the config is applied
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
        
        // Populate services
        this.populateServices();
        
        // Populate products and categories
        this.populateProducts();
        this.populateCategories();
        
        // Create product modal for details
        this.createProductModal();
        
        // Create featured products slider
        this.createProductSlider();
        
        // Populate features
        this.populateFeatures();
        
        // Set working hours
        this.setWorkingHours();
        
        // Set social links
        this.setSocialLinks();
        
        // Update the hero image
        this.updateHeroImage();
        
        // Add search functionality
        this.initSearch();

        this.initLazyLoad();

        // Make ConfigLoader instance available globally for other scripts
        window.configLoader = this;
    }
    
    /**
     * Update hero image with a realistic phone from config
     */
    updateHeroImage() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage && this.configData && this.configData.siteConfig) {
            // Use configured hero image path or default
            const heroImagePath = this.configData.siteConfig.heroImage || 'assets/images/photos/hero-phone.jpg';
            
            heroImage.innerHTML = `
                <div class="hero-phone">
                    <img src="${heroImagePath}" alt="Смартфон с деталями" class="phone-image ${this.configData.siteConfig.enableProductRotation ? 'animated-float' : ''}" />
                </div>
            `;
        }
    }
    
    /**
     * Initialize search functionality
     */
    initSearch() {
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        
        if (!searchForm || !searchInput) return;
        
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();
            
            if (query.length < 2) return;
            
            // Search through products
            if (this.configData.products) {
                const results = this.configData.products.filter(product => 
                    product.name.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.compatibility.toLowerCase().includes(query)
                );
                
                this.showSearchResults(results, query);
            }
        });
    }
    
    /**
     * Show search results
     * @param {Array} results - Search results
     * @param {string} query - Search query
     */
    showSearchResults(results, query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        // Show results count
        const resultsHeader = document.createElement('div');
        resultsHeader.className = 'results-header';
        resultsHeader.innerHTML = `
            <h3>Результаты поиска для "${query}"</h3>
            <p>${results.length} ${results.length === 1 ? 'товар найден' : 
                results.length > 1 && results.length < 5 ? 'товара найдено' : 'товаров найдено'}</p>
            <button class="close-results-btn"><i class="fas fa-times"></i></button>
        `;
        
        searchResults.appendChild(resultsHeader);
        
        // Add close button functionality
        const closeBtn = resultsHeader.querySelector('.close-results-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                searchResults.classList.remove('active');
                setTimeout(() => {
                    searchResults.innerHTML = '';
                }, 300);
            });
        }
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <div class="empty-results">
                    <i class="fas fa-search"></i>
                    <p>По вашему запросу ничего не найдено.<br>Попробуйте изменить запрос.</p>
                </div>
            `;
            searchResults.appendChild(noResults);
        } else {
            // Show results
            const resultsGrid = document.createElement('div');
            resultsGrid.className = 'results-grid';
            
            results.forEach(product => {
                const resultCard = document.createElement('div');
                resultCard.className = 'result-card';
                resultCard.innerHTML = `
                    <div class="result-image">
                        ${this.getProductSvgIcon(product.category, product.brand)}
                    </div>
                    <div class="result-details">
                        <h4>${product.name}</h4>
                        <div class="result-category">${product.category}</div>
                        <div class="result-price">${product.price} ₽</div>
                    </div>
                `;
                
                // Add click event to show product details
                resultCard.addEventListener('click', () => {
                    this.showProductDetails(product);
                    searchResults.classList.remove('active');
                });
                
                resultsGrid.appendChild(resultCard);
            });
            
            searchResults.appendChild(resultsGrid);
        }
        
        // Show results panel with animation
        searchResults.classList.add('active');
        
        // Scroll to results
        searchResults.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Populate the services section
     */
    populateServices() {
        const servicesContainer = document.getElementById('services-container');
        if (!servicesContainer || !this.configData.services) return;
        
        // Clear skeleton loaders
        servicesContainer.innerHTML = '';
        
        // Create service cards
        this.configData.services.forEach((service, index) => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card fade-up';
            serviceCard.classList.add(`delay-${index % 5 + 1}`);
            
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            
            servicesContainer.appendChild(serviceCard);
        });
    }

    /**
     * Populate the categories filter
     */
    populateCategories() {
        const categoriesFilter = document.getElementById('categories-filter');
        if (!categoriesFilter || !this.configData.categories) return;
        
        // Clear everything except the "All" button
        categoriesFilter.innerHTML = '';
        
        // Add the "All" button
        const allButton = document.createElement('button');
        allButton.className = 'category-btn active';
        allButton.setAttribute('data-category', 'all');
        allButton.textContent = 'Все';
        categoriesFilter.appendChild(allButton);
        
        // Create category buttons
        this.configData.categories.forEach(category => {
            const categoryBtn = document.createElement('button');
            categoryBtn.className = 'category-btn';
            categoryBtn.setAttribute('data-category', category);
            categoryBtn.textContent = category;
            
            categoriesFilter.appendChild(categoryBtn);
        });
        // Add click event listeners to category buttons
        const categoryButtons = categoriesFilter.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active from all
                categoryButtons.forEach(b => b.classList.remove('active'));
                // Add active to this one
                btn.classList.add('active');
                // Call filter
                this.filterProducts(btn.getAttribute('data-category'));
            });
        });

    }

    /**
     * Populate the products section
     */
    populateProducts() {
        const productsContainer = document.getElementById('products-container');
        if (!productsContainer || !this.configData.products) return;

        productsContainer.innerHTML = '';
        this.productsPerPage = 8;
        this.currentPage = 0;

        // создаём отдельный контейнер под кнопку
        let loadMoreContainer = document.getElementById('load-more-container');
        if (!loadMoreContainer) {
            loadMoreContainer = document.createElement('div');
            loadMoreContainer.id = 'load-more-container';
            productsContainer.parentNode.appendChild(loadMoreContainer);
        }
        loadMoreContainer.innerHTML = '';

        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.textContent = 'Показать ещё';
        loadMoreBtn.className = 'btn btn-primary load-more-btn';
        loadMoreBtn.addEventListener('click', () => this.loadNextProducts());

        loadMoreContainer.appendChild(loadMoreBtn);

        this.loadNextProducts();
    }



    loadNextProducts() {
        const productsContainer = document.getElementById('products-container');
        const start = this.currentPage * this.productsPerPage;
        const end = start + this.productsPerPage;
        const productsToShow = this.configData.products.slice(start, end);

        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card fade-up';
            productCard.setAttribute('data-category', product.category);
            productCard.setAttribute('tabindex', '0');

            productCard.innerHTML = `
    <span class="product-brand">${product.brand}</span>
    <div class="product-image">
        <div class="product-image-wrap">
            ${this.getProductSvgIcon(product.category, product.brand, product.mainImage)}
        </div>
    </div>
    <div class="product-details">
        <h3>${product.name}</h3>
        <div class="product-price">${product.price} ₽</div>
        <div class="product-compatibility">Совместимость: ${product.compatibility}</div>
        <div class="product-actions">
            <button class="product-details-btn">Подробнее</button>
        </div>
    </div>  
            `;


            productCard.querySelector('.product-details-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.showProductDetails(product);
            });

            productsContainer.appendChild(productCard);
        });

        this.currentPage++;
        this.initLazyLoad(); // подключаем ленивую загрузку
        if (end >= this.configData.products.length) {
            const btn = document.querySelector('#load-more-container .load-more-btn');
            if (btn) btn.style.display = 'none';
        }
    }


    /**
     * Add 3D tilt effect to product card if enabled in config
     * @param {HTMLElement} card - The product card element
     */
    add3DEffect(card) {
        const cardImage = card.querySelector('.product-3d-wrap');
        const cardElement = card.querySelector('.product-3d-element');
        
        if (!cardImage || !cardElement) return;
        
        // Check if 3D effects are enabled in site config
        if (this.configData && this.configData.siteConfig && this.configData.siteConfig.enable3DEffects === false) {
            // Add simple hover effect instead of 3D tilt
            cardImage.addEventListener('mouseenter', () => {
                cardElement.style.transform = 'scale3d(1.05, 1.05, 1.05)';
            });
            
            cardImage.addEventListener('mouseleave', () => {
                cardElement.style.transform = 'scale3d(1, 1, 1)';
            });
            
            return;
        }
        
        // Variables for the effect
        let bounds;
        let mouseX = 0;
        let mouseY = 0;
        
        // Add event listeners
        cardImage.addEventListener('mouseenter', handleMouseEnter);
        cardImage.addEventListener('mousemove', handleMouseMove);
        cardImage.addEventListener('mouseleave', handleMouseLeave);
        
        // Touch support
        cardImage.addEventListener('touchstart', handleTouchStart);
        cardImage.addEventListener('touchmove', handleTouchMove);
        cardImage.addEventListener('touchend', handleTouchEnd);
        
        // Event handlers
        function handleMouseEnter(e) {
            bounds = cardImage.getBoundingClientRect();
            cardElement.style.transition = 'none';
        }
        
        function handleMouseMove(e) {
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const percentX = (mouseX - centerX) / centerX;
            const percentY = (mouseY - centerY) / centerY;
            
            const maxRotate = 0; // Maximum rotation in degrees
            
            cardElement.style.transform = `
                rotateX(${-percentY * maxRotate}deg) 
                rotateY(${percentX * maxRotate}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        }
        
        function handleMouseLeave() {
            cardElement.style.transition = 'transform 0.5s ease-out';
            cardElement.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
        
        // Touch handlers
        function handleTouchStart(e) {
            if (e.touches.length > 0) {
                bounds = cardImage.getBoundingClientRect();
                cardElement.style.transition = 'none';
                
                mouseX = e.touches[0].clientX - bounds.left;
                mouseY = e.touches[0].clientY - bounds.top;
            }
        }
        
        function handleTouchMove(e) {
            if (e.touches.length > 0) {
                e.preventDefault();
                
                const touchX = e.touches[0].clientX - bounds.left;
                const touchY = e.touches[0].clientY - bounds.top;
                
                const centerX = bounds.width / 2;
                const centerY = bounds.height / 2;
                
                const percentX = (touchX - centerX) / centerX;
                const percentY = (touchY - centerY) / centerY;
                
                const maxRotate = 0;
                
                cardElement.style.transform = `
                    rotateX(${-percentY * maxRotate}deg) 
                    rotateY(${percentX * maxRotate}deg)
                    scale3d(1.05, 1.05, 1.05)
                `;
            }
        }
        
        function handleTouchEnd() {
            cardElement.style.transition = 'transform 0.5s ease-out';
            cardElement.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    }

    addSliderControls(card, totalSlides) {
        if (totalSlides <= 1) return;
    
        const sliderTrack = card.querySelector('.product-slider-track');
        const prevBtn = card.querySelector('.slider-nav.prev');
        const nextBtn = card.querySelector('.slider-nav.next');
        let currentSlide = 0;
    
        const updatePosition = () => {
            const translateX = currentSlide * (-100 / totalSlides);
            sliderTrack.style.transform = `translateX(${translateX}%)`;
        };
    
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = Math.max(0, currentSlide - 1);
            updatePosition();
        });
    
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = Math.min(totalSlides - 1, currentSlide + 1);
            updatePosition();
        });
    }
    
    /**
     * Create modal for product details
     */
    createProductModal() {
        const modal = document.createElement('div');
        modal.id = 'product-details-modal';
        modal.className = 'product-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="product-modal-backdrop"></div>
            <div class="product-modal-content">
                <button class="product-modal-close">&times;</button>
                <div class="product-modal-body">
                    <div class="product-modal-image"></div>
                    <div class="product-modal-info">
                        <h2 class="product-modal-title"></h2>
                        <div class="product-modal-brand"></div>
                        <div class="product-modal-price"></div>
                        <div class="product-modal-compatibility"></div>
                        <div class="product-modal-description"></div>
                        <div class="product-modal-features"></div>
                        <div class="product-modal-cta"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for closing the modal
        const closeBtn = modal.querySelector('.product-modal-close');
        const backdrop = modal.querySelector('.product-modal-backdrop');
        
        closeBtn.addEventListener('click', () => this.closeProductModal());
        backdrop.addEventListener('click', () => this.closeProductModal());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeProductModal();
            }
        });
    }
    
    /**
     * Show product details in modal
     * @param {Object} product - Product data
     */
    showProductDetails(product) {
        const modal = document.getElementById('product-details-modal');
        if (!modal) return;
    
        const title = modal.querySelector('.product-modal-title');
        const brand = modal.querySelector('.product-modal-brand');
        const price = modal.querySelector('.product-modal-price');
        const compatibility = modal.querySelector('.product-modal-compatibility');
        const description = modal.querySelector('.product-modal-description');
        const image = modal.querySelector('.product-modal-image');
    
        title.textContent = product.name;
        brand.innerHTML = `<strong>Бренд:</strong> ${product.brand}`;
        price.innerHTML = `<strong>Цена:</strong> <span class="highlight">${product.price} ₽</span>`;
        compatibility.innerHTML = `<strong>Совместимость:</strong> ${product.compatibility}`;
        
        description.innerHTML = `
            <div class="description-scroll">
                <p>${product.description}</p>
            </div>
        `;
    
        const images = [product.mainImage, ...product.additionalImages];
        let sliderHTML = '';
        if (images.length > 1) {
            sliderHTML = `
                <div class="product-slider">
                    <div class="product-slider-track" style="width: ${images.length * 100}%">
                        ${images.map(img => `
                            <div class="product-slider-slide" style="width: ${100 / images.length}%">
                                <img src="${img}" alt="${product.name}" class="product-image-svg" />
                            </div>
                        `).join('')}
                    </div>
                    <button class="slider-nav prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="slider-nav next"><i class="fas fa-chevron-right"></i></button>
                </div>
            `;
        } else {
            sliderHTML = this.getProductSvgIcon(product.category, product.brand, product.mainImage);
        }
        image.innerHTML = sliderHTML;
    
        if (images.length > 1) {
            this.addSliderControls(modal.querySelector('.product-modal-image'), images.length);
        }
    
        const ctaContainer = modal.querySelector('.product-modal-cta');
        ctaContainer.innerHTML = `
            <a href="${product.avitoLink || '#'}" class="btn btn-primary" ${product.avitoLink ? '' : 'disabled'}>Заказать через Авито</a>
            <button class="btn btn-secondary modal-close-btn">Закрыть</button>
        `;
    
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close product details modal
     */
    closeProductModal() {
        const modal = document.getElementById('product-details-modal');
        if (!modal) return;
        
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    /**
     * Get product image based on product data
     * @param {string} category - Product category
     * @param {string} brand - Product brand (optional)
     * @param {string} customImage - Custom image path from config (optional)
     * @returns {string} - Image HTML
     */
    getProductSvgIcon(category, brand = '', customImage = '') {
        if (customImage) {
            return `<img data-src="${customImage}" alt="${category} ${brand}" />`;
        }

        // стандартные иконки из старого кода
        const brandLower = brand ? brand.toLowerCase().replace(/\s+/g, '_') : '';
        switch (category) {
            case 'Дисплеи':
                if (brandLower.includes('iphone') || brandLower.includes('apple'))
                    return `<img data-src="assets/images/products/iphone_display.jpg" alt="Дисплей ${brand}" />`;
                if (brandLower.includes('samsung'))
                    return `<img data-src="assets/images/products/samsung_display.jpg" alt="Дисплей ${brand}" />`;
                return `<img data-src="assets/images/products/display.jpg" alt="Дисплей" />`;
            case 'Аккумуляторы':
                if (brandLower.includes('iphone') || brandLower.includes('apple'))
                    return `<img data-src="assets/images/products/iphone_battery.jpg" alt="Аккумулятор ${brand}" />`;
                if (brandLower.includes('samsung'))
                    return `<img data-src="assets/images/products/samsung_battery.jpg" alt="Аккумулятор ${brand}" />`;
                return `<img data-src="assets/images/products/battery.jpg" alt="Аккумулятор" />`;
            case 'Камеры':
                return `<img data-src="assets/images/products/camera.jpg" alt="Камера" />`;
            case 'Разъемы':
                return `<img data-src="assets/images/products/connector.jpg" alt="Разъем" />`;
            default:
                return `<img data-src="assets/images/hero_phone.jpg" alt="Запчасть" />`;
        }
    }

    initLazyLoad() {
        const lazyImages = document.querySelectorAll('.product-card img:not([src])');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });

        lazyImages.forEach(img => observer.observe(img));
    }



    /**
     * Create product slider for featured products
     */
    createProductSlider() {
        const sliderContainer = document.getElementById('featured-slider');
        if (!sliderContainer || !this.configData.products) return;
        
        // Clear placeholder
        sliderContainer.innerHTML = '';
        
        // Get featured products (for simplicity, just take the first from each category)
        const featuredProducts = [];
        const categories = [...new Set(this.configData.products.map(p => p.category))];
        
        categories.forEach(category => {
            const productsInCategory = this.configData.products.filter(p => p.category === category);
            if (productsInCategory.length > 0) {
                featuredProducts.push(productsInCategory[0]);
            }
        });
        
        // Only proceed if we have featured products
        if (featuredProducts.length === 0) return;
        
        // Set total slides
        this.totalSlides = featuredProducts.length;
        
        // Create slider structure
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';
        
        const sliderTrack = document.createElement('div');
        sliderTrack.className = 'slider-track';
        sliderTrack.style.width = `${this.totalSlides * 100}%`;
        
        // Create slides
        featuredProducts.forEach((product, index) => {
            const slide = document.createElement('div');
            slide.className = 'slider-slide';
            slide.style.width = `${100 / this.totalSlides}%`;
            
            slide.innerHTML = `
                <div class="slide-image">
                    ${this.getProductSvgIcon(product.category, product.brand)}
                </div>
                <div class="slide-info">
                    <h3>${product.name}</h3>
                    <div class="slide-price">${product.price} ₽</div>
                    <div class="slide-compatibility">Совместимость: ${product.compatibility}</div>
                    <button class="slide-btn">Подробнее</button>
                </div>
            `;
            
            // Add click event to show product details
            slide.addEventListener('click', () => {
                this.showProductDetails(product);
            });
            
            // Add to track
            sliderTrack.appendChild(slide);
        });
        
        // Add slider track to wrapper
        sliderWrapper.appendChild(sliderTrack);
        
        // Create navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateSlider('prev');
        });
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateSlider('next');
        });
        
        // Add navigation buttons and wrapper to container
        sliderContainer.appendChild(prevBtn);
        sliderContainer.appendChild(sliderWrapper);
        sliderContainer.appendChild(nextBtn);
        
        // Add touch support
        this.addSliderTouchSupport(sliderTrack);
        
        // Initial position
        this.updateSliderPosition();
    }
    
    /**
     * Navigate slider in given direction
     * @param {string} direction - Direction ('prev' or 'next')
     */
    navigateSlider(direction) {
        if (direction === 'prev') {
            this.currentSlide = Math.max(0, this.currentSlide - 1);
        } else if (direction === 'next') {
            this.currentSlide = Math.min(this.totalSlides - 1, this.currentSlide + 1);
        }
        
        this.updateSliderPosition();
    }
    
    /**
     * Update slider position based on current slide
     */
    updateSliderPosition() {
        const sliderTrack = document.querySelector('.slider-track');
        if (!sliderTrack) return;
        
        const translateX = this.currentSlide * (-100 / this.totalSlides);
        sliderTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    /**
     * Add touch support for slider
     * @param {HTMLElement} sliderTrack - The slider track element
     */
    addSliderTouchSupport(sliderTrack) {
        if (!sliderTrack) return;
        
        let startX, endX;
        const threshold = 50; // Minimum drag distance to change slide
        
        sliderTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderTrack.addEventListener('touchmove', (e) => {
            if (!startX) return;
            
            // Prevent scrolling the page while swiping
            e.preventDefault();
            
            endX = e.touches[0].clientX;
            
            // Calculate the distance swiped
            const diffX = startX - endX;
            
            // Calculate temporary position for smooth drag
            const translateX = this.currentSlide * (-100 / this.totalSlides) - (diffX / sliderTrack.offsetWidth) * 100;
            
            // Apply temporary transform
            sliderTrack.style.transform = `translateX(${translateX}%)`;
        });
        
        sliderTrack.addEventListener('touchend', (e) => {
            if (!startX || !endX) {
                startX = null;
                endX = null;
                return;
            }
            
            const diffX = startX - endX;
            
            // Change slide if the swipe is significant
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swiped left, go to next
                    this.navigateSlider('next');
                } else {
                    // Swiped right, go to previous
                    this.navigateSlider('prev');
                }
            } else {
                // Not a significant swipe, reset position
                this.updateSliderPosition();
            }
            
            startX = null;
            endX = null;
        });
    }

    /**
     * Filter products by category
     * @param {string} category - The category to filter by
     */
    filterProducts(category) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    /**
     * Populate the features in the about section
     */
    populateFeatures() {
        const featuresContainer = document.getElementById('features-container');
        if (!featuresContainer || !this.configData.features) return;
        
        // Clear skeleton loaders
        featuresContainer.innerHTML = '';
        
        // Create feature items
        this.configData.features.forEach((feature, index) => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item fade-right';
            featureItem.classList.add(`delay-${index % 5 + 1}`);
            
            featureItem.innerHTML = `
                <div class="feature-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <div class="feature-content">
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            `;
            
            featuresContainer.appendChild(featureItem);
        });
    }

    /**
     * Set working hours
     */
    setWorkingHours() {
        const workingHoursElement = document.getElementById('working-hours');
        if (workingHoursElement && this.configData.workingHours) {
            workingHoursElement.innerHTML = this.configData.workingHours;
        }
    }

    /**
     * Set social links
     */
    setSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        if (socialLinks.length > 0 && this.configData.socialLinks) {
            // VK
            if (this.configData.socialLinks.vk) {
                const vkLink = document.querySelector('.social-link:nth-child(1)');
                if (vkLink) vkLink.href = this.configData.socialLinks.vk;
            }
            
            // Telegram
            if (this.configData.socialLinks.telegram) {
                const telegramLink = document.querySelector('.social-link:nth-child(2)');
                if (telegramLink) telegramLink.href = this.configData.socialLinks.telegram;
            }
            
            // WhatsApp
            if (this.configData.socialLinks.whatsapp) {
                const whatsappLink = document.querySelector('.social-link:nth-child(3)');
                if (whatsappLink) whatsappLink.href = this.configData.socialLinks.whatsapp;
            }
        }
        
        // Update footer links too
        const footerLinks = document.querySelectorAll('.footer-links a');
        if (footerLinks.length > 0 && this.configData.socialLinks) {
            // VK link in footer
            const footerVkLink = document.querySelector('.footer-links a i.fa-vk');
            if (footerVkLink && this.configData.socialLinks.vk) {
                footerVkLink.parentElement.href = this.configData.socialLinks.vk;
            }
            
            // Telegram link in footer
            const footerTelegramLink = document.querySelector('.footer-links a i.fa-telegram');
            if (footerTelegramLink && this.configData.socialLinks.telegram) {
                footerTelegramLink.parentElement.href = this.configData.socialLinks.telegram;
            }
            
            // WhatsApp link in footer
            const footerWhatsappLink = document.querySelector('.footer-links a i.fa-whatsapp');
            if (footerWhatsappLink && this.configData.socialLinks.whatsapp) {
                footerWhatsappLink.parentElement.href = this.configData.socialLinks.whatsapp;
            }
        }
    }

    /**
     * Convert a string to camelCase
     * @param {string} str - String to convert
     * @returns {string} - camelCase string
     */
    camelCase(str) {
        return str.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase());
    }
}

// Initialize the config loader when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const configLoader = new ConfigLoader();
    configLoader.loadConfig();
});
