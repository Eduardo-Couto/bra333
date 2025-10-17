# Hub Premium da Flotilha Wingfoil

Aplicativo web premium em modo claro para membros da flotilha de wingfoil. Este repositório contém os arquivos estáticos (`index.html`, `styles.css` e `script.js`).

## Tutorial: Publicando o site sem domínio próprio

A seguir estão dois caminhos simples para colocar o site no ar gratuitamente ou com baixo custo, sem necessidade de registrar um domínio agora.

### Opção 1: GitHub Pages (gratuito)

1. **Criar um repositório no GitHub**
   - Acesse [github.com/new](https://github.com/new) e crie um repositório público chamado, por exemplo, `flotilha-wingfoil`.
   - Não adicione README ou arquivos automáticos (você fará o upload manualmente).
2. **Enviar os arquivos do projeto**
   - No seu computador, faça o clone do repositório recém-criado:
     ```bash
     git clone https://github.com/<seu-usuario>/flotilha-wingfoil.git
     ```
   - Copie os arquivos `index.html`, `styles.css`, `script.js` e `README.md` para dentro da pasta clonada.
   - Faça commit e push:
     ```bash
     git add .
     git commit -m "Publica site da flotilha"
     git push origin main
     ```
3. **Ativar o GitHub Pages**
   - No repositório, acesse **Settings › Pages**.
   - Em **Build and deployment**, escolha **Deploy from a branch**.
   - Selecione a branch `main` e a pasta `/ (root)`.
   - Salve; o GitHub gerará uma URL do tipo `https://<seu-usuario>.github.io/flotilha-wingfoil/`.
4. **Atualizar o site**
   - Qualquer alteração enviada para a branch `main` será publicada automaticamente.

### Opção 2: Amazon S3 + AWS Amplify Hosting (nível gratuito)

1. **Criar conta AWS ou usar uma existente**
   - Faça login em [aws.amazon.com](https://aws.amazon.com/).
2. **Configurar um bucket S3 para o site**
   - Abra o serviço **S3**, crie um bucket com nome único (ex.: `flotilha-wingfoil-site`).
   - Desmarque "Block all public access" e confirme a alteração, pois o site precisa ser público.
   - Após criar o bucket, vá em **Properties › Static website hosting** e habilite; defina `index.html` como documento de índice.
3. **Enviar os arquivos**
   - Faça upload de `index.html`, `styles.css`, `script.js` e quaisquer assets.
   - Atualize as permissões para permitir leitura pública (use o botão **Make public** ou configure uma bucket policy básica de leitura).
4. **(Opcional) Distribuir via AWS Amplify Hosting**
   - Acesse o serviço **AWS Amplify**.
   - Clique em **New app › Host web app** e conecte-se ao seu repositório GitHub.
   - Selecione o repositório e branch com o projeto. Amplify fará o build e disponibilizará uma URL `https://main.<id>.amplifyapp.com`.
5. **Atualizar o site**
   - Ao enviar novos commits para a branch conectada, o Amplify publica automaticamente as atualizações.

> **Dica:** Enquanto não houver domínio próprio, compartilhe a URL gerada pelo GitHub Pages ou pelo Amplify com os membros. Quando decidir registrar um domínio, você poderá apontá-lo facilmente para essas hospedagens.

## Desenvolvimento local

1. Clone o repositório:
   ```bash
   git clone https://github.com/<seu-usuario>/bra333.git
   cd bra333
   ```
2. Abra `index.html` em seu navegador preferido. Não é necessário servidor adicional.

## Estrutura

```
├── index.html   # Estrutura principal da aplicação web
├── styles.css   # Estilos em modo claro premium
├── script.js    # Interações e filtros dinâmicos
└── README.md    # Este guia
```

## Licença

Defina aqui a licença desejada para o projeto (ex.: MIT, Apache 2.0 ou outra).
