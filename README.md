# Listening Chinese With Me - Website tĩnh

Đây là phiên bản đầu tiên của website tĩnh, tối ưu cho người không chuyên lập trình.

## 1) Cấu trúc thư mục

- `content/lessons/`: chứa bài học dạng Markdown (bạn sẽ sửa ở đây nhiều nhất)
- `templates/`: mẫu HTML chung
- `src/assets/css/`: màu sắc + giao diện
- `scripts/build.mjs`: script build trang tĩnh
- `dist/`: website đã build xong để upload/deploy
- `tools/srt/`: chỗ để mở rộng công cụ tạo phụ đề SRT sau này
- `tools/content-dashboard/`: chỗ để mở rộng bảng quản lý nội dung video

## 2) Cách chạy lần đầu

```bash
npm run build
npm run serve
```

Mở trình duyệt tại: `http://localhost:8080`

## 3) Cách thêm bài học mới (rất đơn giản)

### Bước 1: Tạo file mới trong `content/lessons/`
Ví dụ: `content/lessons/hsk1-self-intro.md`

### Bước 2: Dán mẫu này

```md
---
title: Tự giới thiệu cơ bản (HSK1)
slug: hsk1-self-intro
hsk: HSK 1
youtube: https://www.youtube.com/watch?v=VIDEO_ID
summary: Bài nghe tự giới thiệu ngắn.
---

## Chinese
(đặt bài tiếng Trung ở đây)

## Pinyin
(đặt pinyin ở đây)

## Vietnamese
(nghĩa tiếng Việt)

## English
(nghĩa tiếng Anh)

## Main Vocabulary
- từ 1: nghĩa
- từ 2: nghĩa

## Grammar Notes
- ghi chú ngữ pháp 1
- ghi chú ngữ pháp 2
```

### Bước 3: Build lại website

```bash
npm run build
```

## 4) Chỉnh màu/giao diện

Sửa file: `src/assets/css/style.css`

## 5) Định hướng mở rộng

- `tools/srt/`: sau này có thể thêm script tạo `.srt` từ nội dung Markdown.
- `tools/content-dashboard/`: có thể thêm app nhỏ để quản lý lịch đăng video + trạng thái sản xuất.
