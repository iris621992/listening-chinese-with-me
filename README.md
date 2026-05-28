# Listening Chinese With Me (website tĩnh)

Website này dùng **Markdown + script build đơn giản** (không framework phức tạp).

## Chạy website

```bash
npm run build
npm run serve
```

Mở: `http://localhost:8080`

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
- ghi chú ngữ pháp

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
