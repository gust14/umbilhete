# UmBilhete 📝

> Um gerador de bilhetes diários personalizados, criado para espalhar inspiração e, principalmente, para ser um playground de aprendizado no consumo de APIs e na resolução de desafios reais de desenvolvimento front-end.

---

## ✨ Sobre o Projeto

A ideia do **UmBilhete** nasceu de um conceito simples, o objetivo principal aqui foi a **jornada de aprendizado**. Queria explorar na prática como consumir múltiplas APIs, lidar com seus dados, contornar limitações e, no final, empacotar tudo em uma experiência de usuário (UX/UI) incrível e totalmente client-side (sem backend!).

## 🚀 Funcionalidades

* **Personalização Dupla:** Receba um conselho aleatório e o horóscopo do dia específico para o seu signo.
* **Consumo de Múltiplas APIs:** Utiliza a `Advice Slip API` para conselhos e a `Aztro API` para horóscopos.
* **Suporte Bilíngue (PT/EN):** Interface e conteúdo totalmente traduzíveis com um clique.
* **Tradução em Tempo Real:** As mensagens das APIs (que vêm em inglês) são traduzidas para português "on-the-fly" usando uma terceira API.
* **Cooldown de 24 Horas:** Para tornar a experiência diária e especial, o usuário só pode gerar um bilhete a cada 24 horas, com o controle feito via `localStorage`.
* **Download e Compartilhamento:** Baixe o bilhete como uma imagem (`.png`) para compartilhar nas redes sociais ou envie diretamente para o WhatsApp.
* **Design Responsivo:** Experiência fluida e otimizada tanto para desktop quanto para dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído do zero, focando em tecnologias essenciais do front-end:

* **HTML5** (Estruturação semântica e tags de SEO)
* **CSS3** (Animações, Flexbox, Media Queries para responsividade)
* **JavaScript (Vanilla JS)** (Manipulação do DOM, lógica, chamadas assíncronas)

**APIs Consumidas:**

* **Advice Slip API:** Para os conselhos aleatórios.
* **Aztro API:** Para o horóscopo diário.
* **MyMemory Translation API:** Para a tradução em tempo real.
* **html2canvas:** Biblioteca para a funcionalidade de download de imagem.

## 🏃‍♀️ Como Executar o Projeto

Como o projeto é 100% client-side, você não precisa de nenhuma instalação complexa.

1.  Clone ou baixe este repositório:
    ```bash
    git clone [https://github.com/gust14/umbilhete.git](https://github.com/gust14/umbilhete.git)
    ```
2.  Navegue até a pasta do projeto.
3.  Abra o arquivo `index.html` diretamente no seu navegador. E pronto! ✨

---

## 🧠 Desafios e Soluções: Uma Jornada de Aprendizado com APIs

Esta é a parte mais legal do projeto! Cada desafio foi uma oportunidade de aprender algo novo.

### 1. Desafio: Conteúdo Inconsistente da Primeira API

* **O Problema:** A ideia inicial era usar apenas a `Advice Slip API`. Porém, ela retornava mensagens de todos os tipos, incluindo piadas e conselhos muito aleatórios, o que quebrava o clima "inspirador" do projeto.
* **A Solução:** Em vez de tentar filtrar o conteúdo (o que seria ineficiente e complexo), decidi **transformar a limitação em um recurso**. Mantive a aleatoriedade do conselho e adicionei uma segunda API, a `Aztro API`, para trazer uma mensagem de horóscopo direcionada e sempre relevante ao tema astrológico. O bilhete ficou muito mais rico!

### 2. Desafio: Múltiplas APIs, um Único Idioma (Inglês)

* **O Problema:** Tanto a API de conselhos quanto a de horóscopo retornavam dados apenas em inglês. Como oferecer uma experiência em português?
* **A Solução:** Implementei uma camada de tradução client-side. Criei uma função reutilizável `translateText()` que chama uma terceira API, a `MyMemory`, para traduzir os textos para português. A função também inclui um *fallback*: se a API de tradução falhar, ela exibe o texto original em inglês para não quebrar a aplicação.

### 3. Desafio: Performance com Múltiplas Chamadas de Rede

* **O Problema:** Para gerar um bilhete, eu precisava chamar a API de conselho, a de horóscopo e, potencialmente, duas vezes a de tradução. Fazer isso em sequência deixaria o usuário esperando um bom tempo.
* **A Solução:** Otimização com `Promise.all()`. As chamadas para as APIs de conselho e horóscopo são independentes, então elas são disparadas em paralelo usando `Promise.all`. Isso reduz drasticamente o tempo de espera, pois o tempo total passa a ser o da chamada mais lenta, e não a soma de todas elas. Uma grande vitória para a UX!

### 4. Desafio: Persistência de Dados sem Banco de Dados

* **O Problema:** Como implementar a regra de "um bilhete por dia" sem ter um backend ou um banco de dados para salvar o histórico do usuário?
* **A Solução:** Utilizei a `localStorage` do navegador. Ao gerar um bilhete com sucesso, salvo um `timestamp` (a data e hora atuais) no navegador do usuário. Antes de permitir uma nova geração, o código verifica se já se passaram 24 horas desde o último timestamp salvo. Simples, eficaz e 100% client-side.

### 5. Desafio: Coerência Visual em Diferentes Sistemas

* **O Problema:** Os ícones de bandeira (🇧🇷/🇺🇸) não apareciam em alguns sistemas operacionais (principalmente Windows), mostrando apenas as letras "BR" e "US".
* **A Solução:** Descobri que isso é um problema de renderização de fontes do sistema. Para garantir a consistência visual para todos, adicionei a fonte `Noto Color Emoji` do Google Fonts ao projeto. Ao forçar o uso de uma fonte de emojis robusta, garantimos que todos vejam os ícones como planejado.

## 🔮 Próximos Passos

O aprendizado nunca para! Algumas ideias para o futuro:

- [ ] Permitir que o usuário escolha entre diferentes temas de bilhete (clássico, moderno, etc.).
- [ ] Adicionar mais informações da `Aztro API`, como o "mood do dia" e a "cor da sorte".
- [ ] Criar animações de compartilhamento mais elaboradas.

## 💬 Contato

Feito com muito carinho e muitas abas de documentação abertas! Se curtiu o projeto, me encontre no [LinkedIn](https://www.linkedin.com/in/gustavo-solf/) ou dê uma olhada nos meus outros projetos no [GitHub](https://github.com/gust14).