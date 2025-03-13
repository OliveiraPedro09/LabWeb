# Usa a imagem oficial do Node.js como base
FROM node:18

# Cria um usuário seguro
RUN useradd --create-home --shell /bin/bash appuser

# Define o diretório de trabalho
WORKDIR /app

# Cria a pasta onde o banco será salvo
RUN mkdir -p /app/data && chown -R appuser:appuser /app

# Copia apenas os arquivos essenciais primeiro
COPY package.json package-lock.json ./

# Instala as dependências sem criar cache desnecessário
RUN npm ci --only=production

# Copia o restante dos arquivos do projeto
COPY . .

# Muda para o usuário seguro
USER appuser

# Expõe a porta usada pelo servidor
EXPOSE 3000

# Comando padrão para rodar a aplicação
CMD ["node", "index.js"]
