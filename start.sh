#!/bin/bash

# 获取脚本所在的目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 尝试设置 fnm 环境（如果已安装）
if command -v fnm &> /dev/null; then
  eval "$(fnm env --use-on-cd --shell bash)"
fi

# 切换到脚本所在目录
cd "$SCRIPT_DIR" || { echo "无法切换到目录 $SCRIPT_DIR"; exit 1; }

# 获取传入的第一个参数
action="${1:-preview}" # 如果没有传入参数，默认值为 'preview'

# 根据参数执行相应的 pnpm 命令
if [[ "$action" == "dev" ]]; then
  echo "执行 pnpm dev..."
  pnpm dev
elif [[ "$action" == "preview" ]]; then
  echo "执行 pnpm preview..."
  pnpm preview
else
  echo "无效参数: $action"
  echo "用法: $0 [preview|dev]"
  echo "      如果不传参数，默认执行 preview"
  exit 1
fi
