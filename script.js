document.addEventListener('DOMContentLoaded', () => {
    // --- DICIONÁRIOS E DADOS ---
    const translations = {
        pt: {
            title: "UmBilhete - Seu Recado Diário Personalizado", main_title: "Comece seu dia com uma mensagem especial!",
            name_label: "✏️ Seu nome", name_placeholder: "Como podemos te chamar?",
            birthdate_label: "🎂 Sua data de nascimento", main_button: "Pegar meu bilhete! ✨",
            main_button_loading: "Gerando...", download_button: "Baixar Imagem 📥",
            whatsapp_button: "Compartilhar no WhatsApp", back_button: "Voltar",
            modal_title: "Seu bilhete de amanhã já está sendo escrito!", modal_greeting: "Olá",
            modal_message: "Você já pegou sua mensagem especial hoje. Volte amanhã para uma nova inspiração.",
            countdown_prefix: "Próximo bilhete em:", countdown_ready: "Você já pode pegar um novo bilhete!",
            modal_button: "Entendido! 👍", alert_missing_fields: "Por favor, preencha os campos destacados!"
        },
        en: {
            title: "UmBilhete - Your Daily Personalized Message", main_title: "Start your day with a special message!",
            name_label: "✏️ Your name", name_placeholder: "What can we call you?",
            birthdate_label: "🎂 Your date of birth", main_button: "Get my ticket! ✨",
            main_button_loading: "Generating...", download_button: "Download Image 📥",
            whatsapp_button: "Share on WhatsApp", back_button: "Back",
            modal_title: "Tomorrow's ticket is already being written!", modal_greeting: "Hello",
            modal_message: "You already got your special message today. Come back tomorrow for a new dose of inspiration.",
            countdown_prefix: "Next ticket in:", countdown_ready: "You can now get a new ticket!",
            modal_button: "Got it! 👍", alert_missing_fields: "Please, fill in the highlighted fields!"
        }
    };
    const zodiacData = {
        capricornio: { pt: { name: 'Capricórnio', trait: 'persistente, responsável e disciplinada' }, en: { name: 'Capricorn', trait: 'persistent, responsible, and disciplined' } },
        aquario: { pt: { name: 'Aquário', trait: 'original, independente e humanitária' }, en: { name: 'Aquarius', trait: 'original, independent, and humanitarian' } },
        peixes: { pt: { name: 'Peixes', trait: 'sonhadora, empática e intuitiva' }, en: { name: 'Pisces', trait: 'dreamy, empathetic, and intuitive' } },
        aries: { pt: { name: 'Áries', trait: 'corajosa, pioneira e cheia de energia' }, en: { name: 'Aries', trait: 'courageous, pioneering, and full of energy' } },
        touro: { pt: { name: 'Touro', trait: 'confiável, prática e que valoriza a segurança' }, en: { name: 'Taurus', trait: 'reliable, practical, and security-loving' } },
        gemeos: { pt: { name: 'Gêmeos', trait: 'comunicativa, curiosa e versátil' }, en: { name: 'Gemini', trait: 'communicative, curious, and versatile' } },
        cancer: { pt: { name: 'Câncer', trait: 'emocional, protetora e com forte intuição' }, en: { name: 'Cancer', trait: 'emotional, protective, and highly intuitive' } },
        leao: { pt: { name: 'Leão', trait: 'criativa, generosa e muito leal' }, en: { name: 'Leo', trait: 'creative, generous, and very loyal' } },
        virgem: { pt: { name: 'Virgem', trait: 'perfeccionista, analítica e muito prestativa' }, en: { name: 'Virgo', trait: 'perfectionist, analytical, and very helpful' } },
        libra: { pt: { name: 'Libra', trait: 'diplomática, charmosa e que busca o equilíbrio' }, en: { name: 'Libra', trait: 'diplomatic, charming, and harmony-seeking' } },
        escorpiao: { pt: { name: 'Escorpião', trait: 'intensa, determinada e cheia de paixão' }, en: { name: 'Scorpio', trait: 'intense, determined, and full of passion' } },
        sagitario: { pt: { name: 'Sagitário', trait: 'aventureira, otimista e que ama a liberdade' }, en: { name: 'Sagittarius', trait: 'adventurous, optimistic, and freedom-loving' } }
    };

    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    const langSwitcher = document.getElementById('lang-switcher');
    const telaInicial = document.getElementById('tela-inicial');
    const telaBilhete = document.getElementById('tela-bilhete');
    const modalAviso = document.getElementById('modal-aviso');
    const nomeInput = document.getElementById('nome-input');
    const dataNascimentoInput = document.getElementById('data-nascimento-input');
    const pegarBilheteBtn = document.getElementById('pegar-bilhete-btn');
    const bilheteHeader = document.getElementById('bilhete-header');
    const bilheteMensagem = document.getElementById('bilhete-mensagem');
    const bilheteHoroscopo = document.getElementById('bilhete-horoscopo');
    const bilheteParaBaixar = document.getElementById('bilhete-para-baixar');
    const baixarBtn = document.getElementById('baixar-btn');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const voltarBtn = document.getElementById('voltar-btn');
    const modalMensagem = document.getElementById('modal-mensagem');
    const contadorElement = document.getElementById('contador');
    const fecharModalBtn = document.getElementById('fechar-modal-btn');
    const errorMessage = document.getElementById('error-message');
    
    // --- VARIÁVEIS DE ESTADO ---
    let countdownInterval;
    let currentLang = 'pt';
    let isTicketGenerated = false;
    let ticketGeneratedData = { name: null, signoKey: null, advice: null, horoscope: null };

    // --- FUNÇÕES ---

    const translateText = async (text) => {
        if (currentLang === 'en' || !text) return text;
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt-br`);
            const data = await response.json();
            return data.responseData.translatedText || text;
        } catch (error) {
            console.error("Translation API Error:", error);
            return text;
        }
    };

    const fetchAdvice = async () => {
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            return data.slip.advice;
        } catch (error) {
            console.error("Advice API Error:", error);
            return "Always look on the bright side of life.";
        }
    };

    const fetchHoroscope = async (signoKey) => {
        const signNameEn = zodiacData[signoKey].en.name.toLowerCase();
        try {
            const response = await fetch(`https://aztro.sameerkumar.website/?sign=${signNameEn}&day=today`, { method: 'POST' });
            const data = await response.json();
            return data.description;
        } catch (error) {
            console.error("Horoscope API Error:", error);
            return "Today is a great day to plan your next great adventure!";
        }
    };

    const updateTicketUI = async () => {
        if (!isTicketGenerated) return;
        const { name, signoKey, advice, horoscope } = ticketGeneratedData;
        const signoInfo = zodiacData[signoKey][currentLang];
        
        bilheteHeader.textContent = currentLang === 'pt'
            ? `Oii ${name}, vi que você é do signo de ${signoInfo.name}, uma pessoa ${signoInfo.trait}. Seus recados de hoje são:`
            : `Hi ${name}, I see you're a ${signoInfo.name}, a person who is ${signoInfo.trait}. Here are your messages for today:`;
        
        const [translatedAdvice, translatedHoroscope] = await Promise.all([
            translateText(advice),
            translateText(horoscope)
        ]);
        
        bilheteMensagem.textContent = `"${translatedAdvice}"`;
        bilheteHoroscopo.textContent = `Astrologia: ${translatedHoroscope}`;
        
        const fullMessage = `✨ Meu bilhete do dia:\n\nConselho: "${translatedAdvice}"\n\nHoróscopo: "${translatedHoroscope}"\n\nPegue o seu também no UmBilhete!`;
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
    };

    const setLanguage = (lang) => {
        currentLang = lang;
        langSwitcher.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        
        const dict = translations[lang];
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if(dict[key]) {
                if (el.id === 'error-message' && !el.textContent) return;
                el.textContent = dict[key];
            }
        });
        document.querySelectorAll('[data-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-key-placeholder');
            if (dict[key]) el.placeholder = dict[key];
        });
        document.title = dict.title;

        if (isTicketGenerated) {
            updateTicketUI();
        }
    };

    const getSignoKey = (data) => {
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        if ((mes == 1 && dia >= 21) || (mes == 2 && dia <= 18)) return 'aquario';
        if ((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) return 'peixes';
        if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 20)) return 'aries';
        if ((mes == 4 && dia >= 21) || (mes == 5 && dia <= 20)) return 'touro';
        if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) return 'gemeos';
        if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 22)) return 'cancer';
        if ((mes == 7 && dia >= 23) || (mes == 8 && dia <= 22)) return 'leao';
        if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) return 'virgem';
        if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) return 'libra';
        if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) return 'escorpiao';
        if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 21)) return 'sagitario';
        return 'capricornio';
    };

    const showAvisoModal = () => {
        const nomeSalvo = localStorage.getItem('umbilhete_nome') || 'Pessoa incrível';
        const dict = translations[currentLang];
        modalMensagem.textContent = `${dict.modal_greeting}, ${nomeSalvo}! ✨ ${dict.modal_message}`;
        modalAviso.classList.add('ativo');

        const timestampSalvo = parseInt(localStorage.getItem('umbilhete_timestamp'));
        const proximoBilheteTime = timestampSalvo + 24 * 60 * 60 * 1000;

        countdownInterval = setInterval(() => {
            const agora = Date.now();
            const tempoRestante = proximoBilheteTime - agora;

            if (tempoRestante <= 0) {
                clearInterval(countdownInterval);
                contadorElement.textContent = dict.countdown_ready;
                return;
            }

            const h = Math.floor(tempoRestante / (1000 * 60 * 60));
            const m = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((tempoRestante % (1000 * 60)) / 1000);
            contadorElement.textContent = `${dict.countdown_prefix} ${h}h ${m}m ${s}s`;
        }, 1000);
    };

    // --- EVENT LISTENERS ---
    langSwitcher.addEventListener('click', () => {
        setLanguage(currentLang === 'pt' ? 'en' : 'pt');
    });

    pegarBilheteBtn.addEventListener('click', async () => {
        const nome = nomeInput.value.trim();
        const dataNascimento = dataNascimentoInput.value;
        const dict = translations[currentLang];

        nomeInput.classList.remove('error');
        dataNascimentoInput.classList.remove('error');
        errorMessage.textContent = '';
        if (!nome || !dataNascimento) {
            if (!nome) nomeInput.classList.add('error');
            if (!dataNascimento) dataNascimentoInput.classList.add('error');
            errorMessage.textContent = dict.alert_missing_fields;
            return;
        }

        const timestampSalvo = localStorage.getItem('umbilhete_timestamp');
        const agora = Date.now();
        if (timestampSalvo && (agora - timestampSalvo < 24 * 60 * 60 * 1000)) {
            showAvisoModal();
            return;
        }

        pegarBilheteBtn.textContent = dict.main_button_loading;
        pegarBilheteBtn.disabled = true;

        const signoKey = getSignoKey(new Date(dataNascimento + 'T00:00:00'));
        
        const [adviceResult, horoscopeResult] = await Promise.all([
            fetchAdvice(),
            fetchHoroscope(signoKey)
        ]);

        ticketGeneratedData = { name: nome, signoKey, advice: adviceResult, horoscope: horoscopeResult };
        isTicketGenerated = true;

        await updateTicketUI();
        
        localStorage.setItem('umbilhete_timestamp', Date.now());
        localStorage.setItem('umbilhete_nome', nome);

        telaInicial.classList.remove('ativa');
        telaBilhete.classList.add('ativa');
        
        pegarBilheteBtn.textContent = dict.main_button;
        pegarBilheteBtn.disabled = false;
    });

    baixarBtn.addEventListener('click', () => {
        html2canvas(bilheteParaBaixar, { 
            backgroundColor: "#fff9e6", scale: 2, useCORS: true 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'umbilhete.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error("Erro ao gerar imagem:", err);
            alert("Desculpe, ocorreu um erro ao tentar baixar a imagem.");
        });
    });
    
    voltarBtn.addEventListener('click', () => {
        telaBilhete.classList.remove('ativa');
        telaInicial.classList.add('ativa');
        isTicketGenerated = false;
        ticketGeneratedData = { name: null, signoKey: null, advice: null, horoscope: null };
    });

    fecharModalBtn.addEventListener('click', () => {
        modalAviso.classList.remove('ativo');
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });

    setLanguage('pt');
});