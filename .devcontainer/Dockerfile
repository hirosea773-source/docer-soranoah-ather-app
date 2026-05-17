FROM mcr.microsoft.com/devcontainers/javascript-node:22

# 必要ツール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    sudo \
    lsof \
    iproute2 \
    docker.io \
    && apt-get clean
# Supabase CLI
RUN curl -fsSL https://supabase.com/install.sh | sh

# PATH追加
ENV PATH="/root/.local/bin:${PATH}"

# 作業ディレクトリ
WORKDIR /workspaces/app