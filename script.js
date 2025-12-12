// Navegação Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.menu-navegacao');
const navLinks = document.querySelectorAll('.menu-navegacao a');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu
            .classList
            .toggle('active');

        // Animação do hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Fechar menu ao clicar em um link
if (hamburger && navMenu && navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu
                .classList
                .remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Side Nav - Alternar Conteúdo
const conteudos = {
    historia: {
        titulo: "Almir Rogério",
        subtitulo: "Contabilidade e Desenvolvimento local",
        descricao: "Cearense e formado em Administração, abriu sua empresa de contabilidade em 200" +
                "7. O que começou como um sonho virou um negócio, que hoje é referência na regi" +
                "ão graças ao seu trabalho e dedicação."
    },
    apresentacao: {
        titulo: "Almir Rogério",
        subtitulo: "Contabilidade e Desenvolvimento local",
        descricao: "Almir Rogério dos Santos, conhecido como Almir da Exatus, é contador, empreend" +
                "edor e candidato a deputado. Carrega 25 anos de atuação em gestão" +
                " e contabilidade, formando uma história guiada por dedicação, ética, compromis" +
                "so e um olhar firme para fazer a diferença em São Paulo."
    },
    perfil: {
        titulo: "Almir Rogério",
        subtitulo: "Empresário e Contador",
        descricao: "Proprietário da Exatus Contabilidade, referência em gestão empresarial e consu" +
                "ltoria. Ao longo da carreira, ajudou centenas de empresas a crescerem. Sua exp" +
                "eriência em gestão e negócios o preparou para entender as reais necessidades d" +
                "e quem empreende e de quem trabalha."
    },
    trajetoria: {
        titulo: "Almir Rogério",
        subtitulo: "Compromisso com São Paulo",
        descricao: "Desde 2007, Almir Rogério dos Santos, tem se dedicado a transformar a vida de " +
                "empreendedores e trabalhadores por meio da contabilidade. Com uma trajetória m" +
                "arcada por ética, compromisso e paixão pelo que faz, Almir construiu a Exatus " +
                "Contabilidade, uma empresa que é referência em Bertioga."
    }
};

const sideNavLinks = document.querySelectorAll('.side-nav a');
const titulo = document.getElementById('titulo');
const subtitulo = document.getElementById('subtitulo');
const descricao = document.getElementById('desc');

sideNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active de todos
        sideNavLinks.forEach(l => l.parentElement.classList.remove('active'));

        // Adiciona active no clicado
        this
            .parentElement
            .classList
            .add('active');

        // Pega o conteúdo correspondente
        const tipo = this.getAttribute('data-conteudo');
        const conteudo = conteudos[tipo];

        // Atualiza o conteúdo com fade
        descricao.style.opacity = '0';

        setTimeout(() => {
            titulo.textContent = conteudo.titulo;
            subtitulo.textContent = conteudo.subtitulo;
            descricao.textContent = conteudo.descricao;
            descricao.style.opacity = '1';
        }, 300);
    });
});

// Scroll para seções
document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target
                    .getBoundingClientRect()
                    .top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({top: offsetPosition, behavior: 'smooth'});
            }
        });
    });

// Header com efeito de scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    }

    // Ocultar/mostrar header ao rolar
    if (currentScroll > lastScroll && currentScroll > 300) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Adicionar animação aos cards
const animatedElements = document.querySelectorAll(
    '.cartao-projeto, .vantagem-card, .verba-item, .instituto-oferece li'
);
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animação das barras de crescimento
const timelineBars = document.querySelectorAll('.timeline-item .bar');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}, {threshold: 0.5});

timelineBars.forEach(bar => {
    timelineObserver.observe(bar);
});

// Contador animado
const animateCounter = (element, target, duration) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math
                .floor(current)
                .toLocaleString('pt-BR');
        }
    }, 16);
};

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
            entry
                .target
                .classList
                .add('animated');
            animateCounter(entry.target, target, 2000);
        }
    });
}, {threshold: 0.5});

document
    .querySelectorAll('.timeline-item .number')
    .forEach(num => {
        numberObserver.observe(num);
    });

// Animar número de satisfação
const satisfactionNumber = document.querySelector('.numero-estatistica');
if (satisfactionNumber) {
    const satisfactionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry
                    .target
                    .classList
                    .add('animated');
                let current = 0;
                const target = 98;
                const timer = setInterval(() => {
                    current += 1;
                    entry.target.textContent = current + '%';
                    if (current >= target) {
                        clearInterval(timer);
                    }
                }, 20);
            }
        });
    }, {threshold: 0.5});

    satisfactionObserver.observe(satisfactionNumber);
}

// codigo do formulário de contato com AJAX para não redirecionar
$(function () {
    $("form#formularioContato").submit(function (e) {
        e.preventDefault();
        var form = this;
        $.ajax({
            url: $(form).attr('action'),
            method: 'POST',
            data: $(form).serialize(),
            dataType: 'json',
            headers: {
                'Accept': 'application/json'
            },
            success: function () {
                $("#popupSucessoFormulario").fadeIn(300);
                setTimeout(function () {
                    $("#popupSucessoFormulario").fadeOut(300);
                }, 2500);
                form.reset();
            },
            error: function () {
                alert("Erro ao enviar o formulário.");
            }
        });
    });
});

function showError(input, message) {
    removeError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.3rem';
    errorDiv.textContent = message;
    input
        .parentElement
        .appendChild(errorDiv);
    input.style.borderBottomColor = '#e74c3c';
}

function removeError(input) {
    const errorDiv = input
        .parentElement
        .querySelector('.error-message');
    if (errorDiv) 
        errorDiv.remove();
    input.style.borderBottomColor = '#ddd';
}

// Parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.fundo-apresentacao');
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Hover nos cards
document
    .querySelectorAll('.cartao-projeto, .vantagem-card')
    .forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

// Scroll reveal para seções
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, {threshold: 0.1});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.8s ease';
    sectionObserver.observe(section);
});

// Carregamento inicial
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Classe active baseada na seção visível
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry
                .target
                .getAttribute('id');
            navLinks.forEach(link => {
                link
                    .classList
                    .remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--secondary)';
                } else {
                    link.style.color = 'var(--dark-gray)';
                }
            });
        }
    });
}, {threshold: 0.5});

sections.forEach(section => {
    navObserver.observe(section);
});

// Prevenir links sem destino
document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });

// Slideshow automático de fotos - Executar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.img-perfil');
    const totalSlides = slides.length;

    console.log('Total de slides encontrados:', totalSlides);

    function showSlide(index) {
        console.log('Mostrando slide:', index);
        slides.forEach((slide, i) => {
            if (i === index) {
                slide
                    .classList
                    .add('active');
            } else {
                slide
                    .classList
                    .remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Iniciar slideshow
    if (slides.length > 0) {
        showSlide(0);

        // Mudança automática a cada 6 segundos
        const autoSlide = setInterval(nextSlide, 6000);
        console.log('Auto-slide iniciado');

        // Botões de navegação
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        console.log('Prev button:', prevBtn);
        console.log('Next button:', nextBtn);

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Prev button clicado');
                prevSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Next button clicado');
                nextSlide();
            });
        }
    } else {
        console.log('Nenhum slide encontrado!');
    }
});

