# CONVENTIONS.md

## 共通

- 回答は日本語
- 変更は最小限
- UIを大きく変更しない
- .envを編集しない
- Secretを編集しない
- 本番操作を行わない

## Next.js

- TypeScript strict前提
- Server ComponentとClient Componentを分離
- Supabase認証を簡略化しない
- 修正後は build確認

## Playwright

- waitForTimeout禁止
- data-testid優先
- テストを無理に通す修正は禁止
- 実装側かテスト側か先に判断する
