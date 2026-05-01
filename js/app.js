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
        this.init();
    }

    init() {
        this.setupModal();
        this.setupNavigation();
        this.setupModuleCards();
        this.setupPwaPrompt();
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
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                // Get the target section
                const targetId = link.getAttribute('href').substring(1);
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

    setupModuleCards() {
        const cards = document.querySelectorAll('.module-card');

        cards.forEach(card => {
            const moduleId = card.getAttribute('data-module');
            const btn = card.querySelector('.module-btn');

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModule(moduleId);
            });

            // Also allow clicking on the card itself
            card.addEventListener('click', (e) => {
                if (e.target !== btn && !e.target.closest('.module-btn')) {
                    this.openModule(moduleId);
                }
            });
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
                <div style="padding: 20px;">
                    <h3 style="margin-bottom: 16px;">${module.name}</h3>
                    <p style="margin-bottom: 16px; opacity: 0.7;">${module.description}</p>
                    
                    <div style="margin: 24px 0; padding: 16px; background-color: var(--bg-secondary); border-radius: 8px;">
                        <p style="font-size: 14px; opacity: 0.7; margin-bottom: 8px;">Status:</p>
                        <p style="font-weight: 600; color: var(--success-color);">✓ Pronto para upload de arquivo</p>
                    </div>

                    <div style="margin-top: 24px;">
                        <label for="fileUpload" style="display: block; margin-bottom: 8px; font-weight: 500;">
                            Selecione um arquivo:
                        </label>
                        <input 
                            type="file" 
                            id="fileUpload" 
                            accept=".xlsx,.xls,.csv,.json" 
                            style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;"
                        >
                        <p style="font-size: 12px; opacity: 0.6; margin-top: 8px;">
                            Formatos aceitos: Excel, CSV, JSON
                        </p>
                    </div>

                    <button 
                        id="processModuleBtn"
                        style="
                            width: 100%; 
                            margin-top: 24px; 
                            padding: 12px 16px;
                            background-color: var(--accent-color);
                            color: white;
                            border: none;
                            border-radius: 6px;
                            font-weight: 600;
                            cursor: pointer;
                            font-size: 14px;
                        "
                    >
                        Processar Arquivo
                    </button>
                </div>
            `;

            const processBtn = this.modal.body.querySelector('#processModuleBtn');
            if (processBtn) {
                processBtn.addEventListener('click', () => {
                    alert(`Módulo ${module.name} será implementado em breve com seu arquivo JS específico`);
                });
            }
        }, 500);
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
