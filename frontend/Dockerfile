# Etapa 1: imagem base
FROM node:23-alpine

# Etapa 2: diretório de trabalho
WORKDIR /app

# Etapa 3: copiar arquivos de configuração
COPY package.json package-lock.json* ./

# Etapa 4: instalar dependências
RUN npm install

# Etapa 5: copiar restante do projeto
COPY . .

# Etapa 6: expor porta do Next.js
EXPOSE 3000

# Etapa 7: comando padrão
CMD ["npm", "run", "dev"]
