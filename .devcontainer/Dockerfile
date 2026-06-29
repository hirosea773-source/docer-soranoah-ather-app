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
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# uvをインストール (rootで実行し、システム全体で利用可能にする)
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
RUN cp /root/.local/bin/uv /usr/local/bin/uv

# PATHにuvを追加（すべてのユーザーが利用できるように）
ENV PATH="/usr/local/bin:${PATH}"

# Aiderのインストールはnodeユーザーで行う
USER node
# nodeユーザーのPATHに~/.local/binを追加（uv tool installのターゲット）
ENV PATH="/home/node/.local/bin:${PATH}"
RUN uv tool install --python 3.12 aider-chat

# Playwrightとその依存ライブラリのインストールはrootユーザーで行う
USER root
RUN npx playwright install-deps chromium
RUN npx playwright install chromium

RUN chown -R node:node /home/node/.cache

WORKDIR /workspaces/app
USER node
