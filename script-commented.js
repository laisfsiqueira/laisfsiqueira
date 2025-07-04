// ===== AGUARDA O CARREGAMENTO COMPLETO DO DOM =====
// Este evento garante que todo o HTML foi carregado antes de executar o JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIÁVEIS GLOBAIS =====
    // Seleção de elementos do DOM que serão usados em várias funções
    const body = document.body; // Elemento body da página
    const header = document.querySelector('.header'); // Cabeçalho da página
    const hamburger = document.querySelector('.hamburger'); // Menu hamburger para mobile
    const navMenu = document.querySelector('.nav-menu'); // Menu de navegação
    const navLinks = document.querySelectorAll('.nav-link'); // Todos os links de navegação
    const fontSizeBtn = document.getElementById('font-size-btn'); // Botão de controle de fonte
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); // Botão de alternância de tema
    const skillItems = document.querySelectorAll('.skill-item'); // Todos os itens de habilidades
    const contactForm = document.getElementById('contactForm'); // Formulário de contato
    const backToTopBtn = document.getElementById('back-to-top'); // Botão voltar ao topo
    
    // Variáveis de estado para controlar funcionalidades
    let isLargeFont = false; // Controla se a fonte está aumentada
    let isDarkTheme = true; // Controla se o tema escuro está ativo
    
    // ===== INICIALIZAÇÃO =====
    // Chama a função principal que inicializa todas as funcionalidades
    init();
    
    // Função principal de inicialização
    function init() {
        setupEventListeners(); // Configura todos os event listeners
        setupScrollEffects(); // Configura efeitos de scroll
        setupSkillsAnimation(); // Configura animação das habilidades
        setupTypingEffect(); // Configura efeito de digitação
        setupParticleEffect(); // Configura efeito de partículas
        setupSmoothScrolling(); // Configura scroll suave
        loadUserPreferences(); // Carrega preferências salvas do usuário
        setupFormValidation(); // Configura validação do formulário
        setupCursorEffect(); // Configura cursor personalizado
        setupScrollProgress(); // Configura barra de progresso do scroll
        setupBackToTop(); // Configura botão voltar ao topo
    }
    
    // ===== EVENT LISTENERS =====
    // Função que configura todos os ouvintes de eventos
    function setupEventListeners() {
        // Event listener para o menu hamburger
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Event listeners para os links de navegação
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Previne o comportamento padrão do link
                const targetId = link.getAttribute('href'); // Obtém o ID da seção alvo
                const targetSection = document.querySelector(targetId); // Seleciona a seção alvo
                
                // Se a seção existe, faz scroll suave até ela
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth', // Scroll suave
                        block: 'start' // Alinha ao topo
                    });
                }
                
                // Fecha o menu mobile se estiver aberto
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Event listeners para controles de acessibilidade
        fontSizeBtn.addEventListener('click', toggleFontSize); // Botão de fonte
        themeToggleBtn.addEventListener('click', toggleTheme); // Botão de tema
        
        // Event listener para scroll da página (efeitos no header)
        window.addEventListener('scroll', handleHeaderScroll);
        
        // Event listener para redimensionamento da janela
        window.addEventListener('resize', handleResize);
        
        // Event listener para atalhos de teclado
        document.addEventListener('keydown', handleKeyboardShortcuts);
    }
    
    // ===== MENU MOBILE =====
    // Função que alterna a visibilidade do menu mobile
    function toggleMobileMenu() {
        hamburger.classList.toggle('active'); // Anima o ícone hamburger
        navMenu.classList.toggle('active'); // Mostra/esconde o menu
        // Controla o overflow do body para prevenir scroll quando menu está aberto
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // ===== ACESSIBILIDADE =====
    // Função que alterna o tamanho da fonte
    function toggleFontSize() {
        isLargeFont = !isLargeFont; // Inverte o estado
        body.classList.toggle('font-large', isLargeFont); // Aplica/remove classe CSS
        
        // Atualiza o ícone do botão (mantém o mesmo ícone neste caso)
        const icon = fontSizeBtn.querySelector('i');
        icon.className = isLargeFont ? 'fas fa-text-height' : 'fas fa-text-height';
        
        // Salva a preferência no localStorage
        localStorage.setItem('largeFont', isLargeFont);
        
        // Mostra feedback visual para o usuário
        showNotification(isLargeFont ? 'Fonte aumentada' : 'Fonte normal');
    }
    
    // Função que alterna entre tema claro e escuro
    function toggleTheme() {
        isDarkTheme = !isDarkTheme; // Inverte o estado do tema
        body.classList.toggle('light-theme', !isDarkTheme); // Aplica/remove classe CSS
        
        // Atualiza o ícone do botão baseado no tema atual
        const icon = themeToggleBtn.querySelector('i');
        icon.className = isDarkTheme ? 'fas fa-moon' : 'fas fa-sun';
        
        // Salva a preferência no localStorage
        localStorage.setItem('darkTheme', isDarkTheme);
        
        // Mostra feedback visual para o usuário
        showNotification(isDarkTheme ? 'Tema escuro ativado' : 'Tema claro ativado');
    }
    
    // Função que carrega as preferências salvas do usuário
    function loadUserPreferences() {
        // Recupera preferências do localStorage
        const savedFontSize = localStorage.getItem('largeFont');
        const savedTheme = localStorage.getItem('darkTheme');
        
        // Aplica fonte grande se estava salva como true
        if (savedFontSize === 'true') {
            toggleFontSize();
        }
        
        // Aplica tema claro se estava salvo como false
        if (savedTheme === 'false') {
            toggleTheme();
        }
    }
    
    // ===== EFEITOS DE SCROLL =====
    // Função que configura animações baseadas em scroll
    function setupScrollEffects() {
        // Opções para o Intersection Observer
        const observerOptions = {
            threshold: 0.1, // Dispara quando 10% do elemento está visível
            rootMargin: '0px 0px -50px 0px' // Margem negativa na parte inferior
        };
        
        // Cria o observer que detecta quando elementos entram na viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Se o elemento está visível, anima sua entrada
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'; // Torna visível
                    entry.target.style.transform = 'translateY(0)'; // Move para posição normal
                }
            });
        }, observerOptions);
        
        // Observa todas as seções para animação de entrada
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            // Define estado inicial (invisível e deslocado)
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section); // Adiciona ao observer
        });
    }
    
    // Função que manipula efeitos do header baseados no scroll
    function handleHeaderScroll() {
        const scrollY = window.scrollY; // Posição atual do scroll
        
        // Muda a aparência do header quando usuário faz scroll
        if (scrollY > 100) {
            // Header mais opaco quando scrollado
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(30px)';
        } else {
            // Header transparente no topo
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        }
    }
    
    // ===== ANIMAÇÃO DAS SKILLS =====
    // Função que configura a animação das habilidades
    function setupSkillsAnimation() {
        // Observer específico para a seção de skills
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills(); // Inicia animação das skills
                    skillsObserver.unobserve(entry.target); // Para de observar após animar
                }
            });
        }, { threshold: 0.5 }); // Dispara quando 50% da seção está visível
        
        // Observa a seção de skills
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }
    
    // Função que anima os itens de habilidades
    function animateSkills() {
        skillItems.forEach((skill, index) => {
            // Anima cada skill com delay baseado no índice
            setTimeout(() => {
                skill.style.opacity = '1'; // Torna visível
                skill.style.transform = 'translateY(0) scale(1)'; // Posição e escala normais
                // Aplica animação CSS com delay escalonado
                skill.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
            }, index * 100); // Delay de 100ms entre cada item
        });
    }
    
    // ===== EFEITO DE DIGITAÇÃO =====
    // Função que cria efeito de máquina de escrever no subtítulo
    function setupTypingEffect() {
        const subtitle = document.querySelector('.welcome-subtitle');
        if (!subtitle) return; // Sai se elemento não existe
        
        const text = subtitle.textContent; // Texto original
        subtitle.textContent = ''; // Limpa o texto
        subtitle.style.borderRight = '2px solid #00d4ff'; // Adiciona cursor piscante
        
        let i = 0; // Contador de caracteres
        // Função recursiva que "digita" o texto
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i); // Adiciona próximo caractere
                i++;
                setTimeout(typeWriter, 100); // Chama novamente após 100ms
            } else {
                // Quando termina, faz o cursor piscar
                setInterval(() => {
                    subtitle.style.borderRight = subtitle.style.borderRight === 'none' 
                        ? '2px solid #00d4ff' 
                        : 'none';
                }, 500); // Pisca a cada 500ms
            }
        };
        
        // Inicia o efeito após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // ===== EFEITO DE PARTÍCULAS =====
    // Função que cria animação de partículas na seção home
    function setupParticleEffect() {
        const homeSection = document.querySelector('.home-section');
        if (!homeSection) return; // Sai se elemento não existe
        
        // Cria elemento canvas para desenhar as partículas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d'); // Contexto 2D para desenho
        
        // Estiliza o canvas
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none'; // Não interfere com cliques
        canvas.style.zIndex = '0'; // Fica atrás do conteúdo
        
        homeSection.appendChild(canvas); // Adiciona à seção
        
        // Função que redimensiona o canvas
        function resizeCanvas() {
            canvas.width = homeSection.offsetWidth;
            canvas.height = homeSection.offsetHeight;
        }
        
        resizeCanvas(); // Redimensiona inicialmente
        window.addEventListener('resize', resizeCanvas); // Redimensiona quando janela muda
        
        const particles = []; // Array para armazenar partículas
        const particleCount = 50; // Número de partículas
        
        // Classe que define uma partícula
        class Particle {
            constructor() {
                // Posição aleatória inicial
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Velocidade aleatória
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                // Tamanho e opacidade aleatórios
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            // Atualiza posição da partícula
            update() {
                this.x += this.vx; // Move horizontalmente
                this.y += this.vy; // Move verticalmente
                
                // Inverte direção se bater nas bordas
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            // Desenha a partícula
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Círculo
                ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`; // Cor azul com opacidade
                ctx.fill();
            }
        }
        
        // Cria todas as partículas
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Função de animação principal
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa canvas
            
            // Atualiza e desenha cada partícula
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Conecta partículas próximas com linhas
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    // Calcula distância entre partículas
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Se estão próximas, desenha linha conectora
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Opacidade da linha baseada na distância
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate); // Continua a animação
        }
        
        animate(); // Inicia a animação
    }
    
    // ===== SCROLL SUAVE =====
    // Função placeholder - scroll suave já implementado nos event listeners
    function setupSmoothScrolling() {
        // Funcionalidade já implementada nos event listeners dos links
    }
    
    // ===== VALIDAÇÃO DO FORMULÁRIO =====
    // Função que configura validação e envio do formulário
    function setupFormValidation() {
        if (!contactForm) return; // Sai se formulário não existe
        
        // Event listener para envio do formulário
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne envio padrão
            
            // Obtém dados do formulário
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validação simples dos campos
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            // Validação do formato do email
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido!', 'error');
                return;
            }
            
            // Simula processo de envio
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML; // Salva texto original
            
            // Muda botão para estado de carregamento
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simula delay de envio
            setTimeout(() => {
                // Muda para estado de sucesso
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                showNotification('Mensagem enviada com sucesso!', 'success');
                contactForm.reset(); // Limpa formulário
                
                // Restaura botão após 2 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 2000);
        });
    }
    
    // Função que valida formato de email
    function isValidEmail(email) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/; // Regex para email
        return emailRegex.test(email);
    }
    
    // ===== EFEITO DO CURSOR =====
    // Função que cria cursor personalizado
    function setupCursorEffect() {
        // Cria elemento do cursor personalizado
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        
        document.body.appendChild(cursor); // Adiciona à página
        
        // Segue o movimento do mouse
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px'; // Centraliza horizontalmente
            cursor.style.top = e.clientY - 10 + 'px'; // Centraliza verticalmente
        });
        
        // Efeito hover em elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .skill-item');
        interactiveElements.forEach(el => {
            // Aumenta cursor ao passar sobre elemento
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(0, 212, 255, 0.8)';
            });
            
            // Volta ao normal ao sair do elemento
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 212, 255, 0.5)';
            });
        });
    }
    
    // ===== BARRA DE PROGRESSO DO SCROLL =====
    // Função que cria barra de progresso baseada no scroll
    function setupScrollProgress() {
        // Cria elemento da barra de progresso
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00d4ff, #0f3460);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar); // Adiciona à página
        
        // Atualiza largura da barra baseada no scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset; // Posição atual do scroll
            const docHeight = document.body.scrollHeight - window.innerHeight; // Altura total scrollável
            const scrollPercent = (scrollTop / docHeight) * 100; // Porcentagem scrollada
            
            progressBar.style.width = scrollPercent + '%'; // Atualiza largura
        });
    }
    
    // ===== BOTÃO VOLTAR AO TOPO =====
    // Função que configura o botão de voltar ao topo
    function setupBackToTop() {
        if (!backToTopBtn) return; // Sai se botão não existe
        
        // Mostra/oculta botão baseado na posição do scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible'); // Mostra botão
            } else {
                backToTopBtn.classList.remove('visible'); // Esconde botão
            }
        });
        
        // Funcionalidade de voltar ao topo
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0, // Vai para o topo
                behavior: 'smooth' // Scroll suave
            });
            
            // Efeito visual de feedback
            backToTopBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backToTopBtn.style.transform = ''; // Volta ao normal
            }, 150);
        });
        
        // Efeito hover com mouse
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = ''; // Volta ao normal
        });
    }
    
    // ===== ATALHOS DE TECLADO =====
    // Função que manipula atalhos de teclado
    function handleKeyboardShortcuts(e) {
        // Ctrl + D para alternar tema
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault(); // Previne ação padrão do navegador
            toggleTheme();
        }
        
        // Ctrl + + para aumentar fonte
        if (e.ctrlKey && e.key === '+') {
            e.preventDefault();
            if (!isLargeFont) toggleFontSize();
        }
        
        // Ctrl + - para diminuir fonte
        if (e.ctrlKey && e.key === '-') {
            e.preventDefault();
            if (isLargeFont) toggleFontSize();
        }
        
        // Escape para fechar menu mobile
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // ===== REDIMENSIONAMENTO =====
    // Função que manipula redimensionamento da janela
    function handleResize() {
        // Fecha menu mobile se a tela ficar grande
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // ===== NOTIFICAÇÕES =====
    // Função que exibe notificações para o usuário
    function showNotification(message, type = 'info') {
        // Cria elemento da notificação
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#00d4ff'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            font-weight: 500;
        `;
        
        notification.textContent = message; // Define texto
        document.body.appendChild(notification); // Adiciona à página
        
        // Anima entrada da notificação
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove notificação após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)'; // Anima saída
            setTimeout(() => {
                document.body.removeChild(notification); // Remove do DOM
            }, 300);
        }, 3000);
    }
    
    // ===== EASTER EGGS =====
    // Array para armazenar sequência de teclas do código Konami
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    // Event listener para detectar código Konami
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code); // Adiciona tecla pressionada
        
        // Mantém apenas as últimas teclas necessárias
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift(); // Remove primeira tecla
        }
        
        // Verifica se sequência está correta
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg(); // Ativa easter egg
            konamiCode = []; // Reseta sequência
        }
    });
    
    // Função que ativa o easter egg
    function activateEasterEgg() {
        showNotification('🎉 Código Konami ativado! Você encontrou o Easter Egg!', 'success');
        
        // Efeito especial de cores
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Adiciona CSS para efeito rainbow
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Remove efeito após 4 segundos
        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 4000);
    }
    
    // ===== PERFORMANCE =====
    // Função debounce para otimizar eventos frequentes
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplica debounce aos eventos de scroll e resize para melhor performance
    window.addEventListener('scroll', debounce(handleHeaderScroll, 10));
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // ===== MENSAGEM DE BOAS-VINDAS =====
    // Exibe informações do projeto no console para desenvolvedores
    console.log(`
    🎨 Portfólio de Laís Fátima Siqueira
    ====================================
    
    Recursos implementados:
    ✅ Design responsivo
    ✅ Tema claro/escuro
    ✅ Controle de fonte
    ✅ Animações suaves
    ✅ Efeito de partículas
    ✅ Validação de formulário
    ✅ Atalhos de teclado
    ✅ Easter eggs
    ✅ Cursor personalizado
    ✅ Barra de progresso
    
    Atalhos:
    Ctrl + D: Alternar tema
    Ctrl + +: Aumentar fonte
    Ctrl + -: Diminuir fonte
    Escape: Fechar menu
    
    Desenvolvido com ❤️ e JavaScript
    `);
}); // Fim do event listener DOMContentLoaded

