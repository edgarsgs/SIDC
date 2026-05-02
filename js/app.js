// Main Application Class
class SuiteApp {
    constructor() {
        this.modal = null;
        this.currentModule = null;
        this.modules = {
            'process-a': {
                name: 'Processo A',
                description: 'Análise de dados estruturados',
                jsFile: 'js/modules/processA.js'
            },
            'process-b': {
                name: 'Processo B',
                description: 'Geração de relatórios e métricas',
                jsFile: 'js/modules/processB.js'
            },
            'process-c': {
                name: 'Processo C',
                description: 'Transformação e sincronização de dados',
                jsFile: 'js/modules/processC.js'
            },
            'process-d': {
                name: 'Processo D',
                description: 'Validação e verificação de integridade',
                jsFile: 'js/modules/processD.js'
            },
            'process-e': {
                name: 'Processo E',
                description: 'Consolidação e agrupamento de informações',
                jsFile: 'js/modules/processE.js'
            },
            'process-f': {
                name: 'Processo F',
                description: 'Otimização e automação de workflows',
                jsFile: 'js/modules/processF.js'
            }
        };
        
        // Load favorites from local storage
        try {
            this.favorites = JSON.parse(localStorage.getItem('sidc_favorites')) || [];
        } catch (e) {
            console.warn('Erro ao carregar favoritos:', e);
            this.favorites = [];
        }
        this.toastTimeout = null;
        this.init();
    }

    init() {
        this.setupModal();
        this.setupNavigation();
        this.setupModuleCards();
        this.setupPwaPrompt();
        this.setupSearch();
        this.renderFavorites();
        this.createToastElement();
        this.setupStartButton();
    }

    createToastElement() {
        const toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.className = 'toast-container';
        document.body.appendChild(toast);
    }

    showToast(message) {
        const toast = document.getElementById('toastNotification');
        toast.textContent = message;
        toast.classList.add('show');
        
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    setupStartButton() {
        const startBtn = document.getElementById('startBtn');
        const appContent = document.getElementById('appContent');
        const footer = document.querySelector('.footer');
        const mainNav = document.getElementById('mainNav');
        const hero = document.getElementById('home');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                // Revelar conteúdo oculto
                appContent.classList.remove('hidden-initially');
                footer.classList.remove('hidden-initially');
                
                // Mostrar menu de navegação com fade
                mainNav.style.visibility = 'visible';
                mainNav.style.opacity = '1';
                
                // Transição suave para ocultar o Hero
                hero.style.opacity = '0';
                hero.style.transform = 'translateY(-20px)';
                hero.classList.remove('splash-screen');
                setTimeout(() => {
                    hero.style.display = 'none';
                }, 500);

                // Scroll suave para os módulos
                setTimeout(() => {
                    document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
                }, 100);
            });
        }
    }

    setupModal() {
        this.modal = {
            element: document.getElementById('processModal'),
            title: document.getElementById('modalTitle'),
            body: document.getElementById('modalBody'),
            closeBtn: document.getElementById('modalClose')
        };

        // Close modal on close button
        this.modal.closeBtn.addEventListener('click', () => this.closeModal());

        // Close modal on outside click
        this.modal.element.addEventListener('click', (e) => {
            if (e.target === this.modal.element) {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.element.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);

                // Se o link clicado for 'Sobre', abre o modal informativo
                if (targetId === 'about') {
                    this.openAboutModal();
                    return;
                }

                // Link de Feedback/Sugestões
                if (targetId === 'feedback') {
                    this.openFeedbackModal();
                    return;
                }
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupPwaPrompt() {
        this.deferredPrompt = null;
        const installBanner = document.getElementById('installBanner');
        const installBtn = document.getElementById('installPwaBtn');
        const closeBtn = document.getElementById('installBannerClose');

        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.deferredPrompt = event;
            if (installBanner) {
                installBanner.classList.remove('hidden');
            }
        });

        if (installBtn) {
            installBtn.addEventListener('click', async () => {
                if (!this.deferredPrompt) {
                    return;
                }
                this.deferredPrompt.prompt();
                const choiceResult = await this.deferredPrompt.userChoice;
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou a instalação do PWA.');
                } else {
                    console.log('Usuário recusou a instalação do PWA.');
                }
                this.deferredPrompt = null;
                if (installBanner) {
                    installBanner.classList.add('hidden');
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (installBanner) {
                    installBanner.classList.add('hidden');
                }
            });
        }

        window.addEventListener('appinstalled', () => {
            if (installBanner) {
                installBanner.classList.add('hidden');
            }
            console.log('PWA instalado com sucesso.');
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('moduleSearch');
        const mainGrid = document.getElementById('mainModulesGrid');
        const cards = mainGrid.querySelectorAll('.module-card');

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            
            cards.forEach(card => {
                const title = card.querySelector('.module-title').textContent.toLowerCase();
                const desc = card.querySelector('.module-description').textContent.toLowerCase();
                
                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    setupModuleCards() {
        const cards = document.querySelectorAll('.module-card');

        cards.forEach(card => {
            const moduleId = card.getAttribute('data-module');
            const btn = card.querySelector('.module-btn');
            const favBtn = card.querySelector('.favorite-btn');

            // Initialize star state
            if (this.favorites.includes(moduleId)) {
                favBtn.classList.add('is-favorite');
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openModule(moduleId);
            });

            favBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(moduleId);
            });

            // Also allow clicking on the card itself
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.module-btn') && !e.target.closest('.favorite-btn')) {
                    this.openModule(moduleId);
                }
            });
        });
    }

    toggleFavorite(moduleId) {
        const index = this.favorites.indexOf(moduleId);
        
        if (index === -1) {
            if (this.favorites.length >= 4) {
                this.showToast('Limite de 4 favoritos atingido');
                return;
            }
            this.favorites.push(moduleId);
        } else {
            this.favorites.splice(index, 1);
        }

        // Sincroniza todos os ícones de estrela para este módulo (grid principal e clones)
        const allModuleBtns = document.querySelectorAll(`.module-card[data-module="${moduleId}"] .favorite-btn`);
        allModuleBtns.forEach(btn => {
            if (this.favorites.includes(moduleId)) {
                btn.classList.add('is-favorite');
            } else {
                btn.classList.remove('is-favorite');
            }
        });

        localStorage.setItem('sidc_favorites', JSON.stringify(this.favorites));
        this.renderFavorites();
    }

    renderFavorites() {
        const favSection = document.getElementById('favoritesSection');
        const favGrid = document.getElementById('favoritesGrid');
        
        // Clear grid first to handle the "empty" state correctly
        favGrid.innerHTML = '';

        if (this.favorites.length === 0) {
            favSection.classList.remove('active');
            return;
        }

        favSection.classList.add('active');

        this.favorites.forEach(moduleId => {
            const originalCard = document.querySelector(`.module-card[data-module="${moduleId}"]`);
            if (originalCard) {
                const clone = originalCard.cloneNode(true);
                
                // Re-attach events to clone
                const btn = clone.querySelector('.module-btn');
                const favBtn = clone.querySelector('.favorite-btn');

                btn.addEventListener('click', () => this.openModule(moduleId));
                favBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleFavorite(moduleId);
                });
                clone.addEventListener('click', (e) => {
                    if (!e.target.closest('.module-btn') && !e.target.closest('.favorite-btn')) {
                        this.openModule(moduleId);
                    }
                });

                favGrid.appendChild(clone);
            }
        });
    }

    openModule(moduleId) {
        const module = this.modules[moduleId];

        if (!module) {
            console.error('Module not found:', moduleId);
            return;
        }

        this.currentModule = moduleId;

        // Update modal header
        this.modal.title.textContent = module.name;

        // Show loading state
        this.modal.body.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 24px; margin-bottom: 16px;">⏳</div>
                <p>Carregando ${module.name}...</p>
            </div>
        `;

        this.openModal();

        // Simulate loading the module JS file
        this.loadModule(moduleId, module);
    }

    loadModule(moduleId, module) {
        // This will be where you load the actual module JS file
        // For now, we'll show a placeholder
        
        setTimeout(() => {
            this.modal.body.innerHTML = `
                <div class="upload-container">
                    <div>
                        <h3 style="margin-bottom: 8px;">${module.name}</h3>
                        <p style="opacity: 0.7; font-size: 14px;">${module.description}</p>
                    </div>
                    
                    <div class="drop-zone" id="dropZone">
                        <div class="drop-zone-icon">📁</div>
                        <div class="drop-zone-content">
                            <p class="drop-zone-text">Arraste seu arquivo para aqui ou clique para selecionar</p>
                            <p class="drop-zone-hint">Formatos aceitos: Excel (.xlsx, .xls), CSV ou JSON</p>
                        </div>
                        <input type="file" id="fileUpload" class="file-input-hidden" accept=".xlsx,.xls,.csv,.json">
                    </div>

                    <div id="fileInfo" style="display: none; padding: 12px; background: var(--accent-light); border-radius: 8px; border-left: 4px solid var(--accent-color);">
                        <p style="font-size: 14px; font-weight: 600; color: var(--accent-color);">Arquivo selecionado:</p>
                        <p id="fileName" style="font-size: 14px;"></p>
                    </div>

                    <p style="margin-bottom: 16px; opacity: 0.7;">${module.description}</p>
                    
                    <button 
                        id="processModuleBtn"
                        disabled
                        style="
                            width: 100%;
                            padding: 12px 16px;
                            background-color: var(--accent-color);
                            color: white;
                            border: none;
                            border-radius: 6px;
                            font-weight: 600;
                            cursor: pointer;
                            font-size: 14px;
                            opacity: 0.5;
                            transition: all 0.2s;
                        "
                    >
                        Processar Arquivo
                    </button>
                </div>
            `;

            this.setupDragAndDrop();

            const processBtn = this.modal.body.querySelector('#processModuleBtn');
            if (processBtn) {
                processBtn.addEventListener('click', () => {
                    alert(`Módulo ${module.name} será implementado em breve com seu arquivo JS específico`);
                });
            }
        }, 500);
    }

    setupDragAndDrop() {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileUpload');
        const processBtn = document.getElementById('processModuleBtn');
        const fileInfo = document.getElementById('fileInfo');
        const fileNameDisplay = document.getElementById('fileName');

        const handleFiles = (files) => {
            if (files.length > 0) {
                const file = files[0];
                fileNameDisplay.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
                fileInfo.style.display = 'block';
                processBtn.disabled = false;
                processBtn.style.opacity = '1';
                dropZone.querySelector('.drop-zone-icon').textContent = '📄';
            }
        };

        dropZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }, false);
    }

    openAboutModal() {
        this.modal.title.textContent = 'Sobre a Plataforma';
        
        this.modal.body.innerHTML = `
            <div class="about-container" style="padding: var(--spacing-md); line-height: 1.8;">
                <div style="text-align: center; margin-bottom: var(--spacing-xl);">
                    <div style="font-size: 48px; margin-bottom: var(--spacing-sm);">⚙️</div>
                    <h3 style="font-size: 24px; color: var(--text-primary); margin-bottom: var(--spacing-xs);">Copiloto System Intelligence</h3>
                    <p style="color: var(--text-secondary); font-size: 14px;">Tecnologia a serviço da inteligência humana</p>
                </div>

                <div style="margin-bottom: var(--spacing-lg);">
                    <p style="font-size: 16px; color: var(--text-primary); margin-bottom: var(--spacing-md); text-align: justify;">
                        A <strong>Suite System Intelligence</strong> é um ecossistema de produtividade concebido por <strong>Nathalia Pereira dos Santos</strong>, desenhado para elevar o potencial analítico do time de <strong>Desenvolvimento de Canais</strong>.
                    </p>
                </div>

                <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-lg); background-color: var(--bg-secondary); border-radius: var(--radius-lg); border-left: 4px solid var(--accent-color);">
                    <h4 style="color: var(--accent-color); font-size: 18px; margin-bottom: var(--spacing-sm);">Nossa Visão: Humano + Tecnologia</h4>
                    <p style="font-size: 15px; color: var(--text-secondary); text-align: justify;">
                        Acreditamos que o valor está nas pessoas. Esta ferramenta foi criada para absorver a carga de tarefas mecânicas e repetitivas, devolvendo tempo para que cada profissional possa exercer seu papel estratégico com agilidade sem precedentes e precisão cirúrgica.
                    </p>
                </div>

                <div style="margin-bottom: var(--spacing-lg);">
                    <h4 style="color: var(--text-primary); font-size: 18px; margin-bottom: var(--spacing-sm);">Impacto Estratégico</h4>
                    <p style="font-size: 15px; color: var(--text-secondary); text-align: justify;">
                        Ao eliminar o erro humano em processos burocráticos, garantimos entregas robustas e de alto valor. A Suite SIDC transforma dados em insights, permitindo que nossa equipe lidere a inovação e o crescimento da companhia.
                    </p>
                </div>

                <div style="margin-top: var(--spacing-2xl); padding-top: var(--spacing-lg); border-top: 1px solid var(--border-color); text-align: center; opacity: 0.6; font-size: 12px;">
                    Versão 1.0.0 • 2026 • Suite SIDC • Todos os direitos reservados
                </div>
            </div>
        `;

        this.openModal();
    }

    openFeedbackModal() {
        this.modal.title.textContent = 'Canal de Melhoria Contínua';
        
        this.modal.body.innerHTML = `
            <div style="padding: var(--spacing-md);">
                <h3 style="margin-bottom: var(--spacing-sm); color: var(--text-primary);">Contribua com a Evolução</h3>
                <p style="margin-bottom: var(--spacing-lg); font-size: 14px; color: var(--text-secondary);">
                    Sua experiência operacional é fundamental. Utilize este canal para sugerir novos módulos, reportar inconsistências ou propor melhorias nos fluxos atuais.
                </p>
                
                <div style="background: var(--bg-secondary); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px;">Descrição da Sugestão:</label>
                    <textarea id="feedbackText" style="width: 100%; min-height: 120px; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); font-family: inherit; margin-bottom: 16px;" placeholder="Como podemos tornar seu trabalho mais ágil?"></textarea>
                    
                    <button id="sendFeedbackBtn" class="module-btn">Enviar Colaboração</button>
                </div>
                
                <p style="margin-top: 24px; font-size: 12px; opacity: 0.6; text-align: center;">
                    Todas as sugestões são analisadas tecnicamente para priorização no roadmap da Suite SIDC.
                </p>
            </div>
        `;

        const sendBtn = this.modal.body.querySelector('#sendFeedbackBtn');
        sendBtn.addEventListener('click', () => {
            this.showToast('Sugestão enviada com sucesso! Obrigado pela colaboração.');
            this.closeModal();
        });

        this.openModal();
    }

    openModal() {
        this.modal.element.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.element.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentModule = null;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.suiteApp = new SuiteApp();
});
