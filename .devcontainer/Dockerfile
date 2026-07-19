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
# Codex CLIをイメージへ固定してインストールする
RUN npm install -g @openai/codex
# Playwrightとその依存ライブラリのインストールはrootユーザーで行う
USER root
RUN npx playwright install-deps chromium
RUN npx playwright install chromium

RUN mkdir -p /home/node/.cache \
    && chown -R node:node /home/node/.cache

# Cline用named volumeのマウント先を事前作成する
RUN mkdir -p \
    /home/node/.cline \
    /home/node/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev \
    && chown -R node:node \
    /home/node/.cline \
    /home/node/.vscode-server

WORKDIR /workspaces/app
USER node
