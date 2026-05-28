# Listening Chinese With Me (website tĩnh)

Website này dùng **Markdown + script build đơn giản** (không framework phức tạp).

## Chạy website trên máy của bạn

```bash
npm install
npm run build
npm run serve
```

Mở: `http://localhost:8080`

## Tự động deploy lên GitHub Pages

Dự án đã có sẵn workflow: `.github/workflows/deploy-pages.yml`.

Workflow sẽ tự động:
- chạy `npm install`
- chạy `npm run build`
- lấy thư mục `dist/` để deploy lên GitHub Pages

Workflow chạy khi:
- có commit mới vào nhánh `main`
- hoặc bạn bấm chạy tay trong tab **Actions** (`workflow_dispatch`)

### Cách bật GitHub Pages trong Settings (nếu repo chưa bật)

1. Vào repo trên GitHub → **Settings**.
2. Chọn mục **Pages** (menu bên trái).
3. Ở phần **Build and deployment**:
   - **Source**: chọn **GitHub Actions**.
4. Vào tab **Actions**, chờ workflow `Deploy static site to GitHub Pages` chạy xong.
5. Quay lại **Settings → Pages** để thấy link website public.

> Mẹo: Nếu vừa bật Pages mà chưa có link, hãy chờ 1-3 phút rồi refresh lại trang Pages.

## Thêm bài học mới (siêu đơn giản)

### 1) Tạo file mới trong `content/lessons/`
Ví dụ: `content/lessons/hsk1-self-intro.md`

### 2) Dán mẫu bên dưới và sửa nội dung

```md
---
title: Tự giới thiệu cơ bản (HSK1)
slug: hsk1-self-intro
hsk: HSK 1
youtube: https://www.youtube.com/watch?v=VIDEO_ID
summary: Bài nghe tự giới thiệu ngắn, dễ nghe cho người mới.
---

## chinese
(văn bản tiếng Trung)

## pinyin
(phiên âm pinyin)

## vietnamese
(nghĩa tiếng Việt)

## english
(nghĩa tiếng Anh)

## vocabulary
- từ/cụm từ: nghĩa

## grammar_notes
- Tên cấu trúc tiếng Trung
- EN: giải thích ngắn gọn bằng tiếng Anh đơn giản (ưu tiên đặt trước)
- VI: giải thích bằng tiếng Việt (đặt sau EN)
- Example: ví dụ tiếng Trung trong bài
- Meaning: nghĩa tiếng Anh ngắn gọn của ví dụ

## video_description
- nội dung mô tả video YouTube

## pinned_comment
- nội dung bình luận ghim

## thumbnail_idea
- ý tưởng thumbnail

## image_timeline
- mốc thời gian hình ảnh theo video
```

> Lưu ý: Script build sẽ báo lỗi nếu thiếu bất kỳ phần nào ở trên.
> Với `grammar_notes`, nên ưu tiên **EN trước, VI sau** để phù hợp người học quốc tế.

### 3) Build lại

```bash
npm run build
```

## Cấu trúc chính

- `content/lessons/`: bài học Markdown
- `scripts/build.mjs`: build Markdown thành website tĩnh
- `src/assets/css/style.css`: giao diện (ưu tiên đọc tốt trên điện thoại)
- `templates/base.html`: khung HTML chung
- `dist/`: kết quả build để deploy
