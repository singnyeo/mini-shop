var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
const { db } = require('../utils/db');

// 파일 업로드시 uploads 폴더로 저장되도록 설정
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: uploadDir });

// GET /documents - DB document 에 있는 리스트 가져오기
router.get('/', async (req, res, next) => {
    const docs = await db.document.findMany({
        orderBy: { createdAt: 'desc' },
    });

    res.json({ requestTime: req.requestTime, documents: docs });
});

// POST /documents/upload - 파일 업로드
router.post('/upload', upload.single('file'), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, filename } = req.file;
    const extension = path.extname(originalname);
    const newFileName = filename + extension;
    const newFilePath = path.join(uploadDir, newFileName);
    fs.renameSync(req.file.path, newFilePath);

    const file = await db.document.create({
        data: {
            filename: originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            url: `/documents/files/${newFileName}`,
        },
    });

    res.json({ message: 'OK', file });
});

router.get('/download/:id', async (req, res, next) => {
    const doc = await db.document.findUnique({ where: { id: Number(req.params.id) } });
    if (!doc) {
        return res.status(404).json({ error: 'File not found' });
    }
    const filePath = path.resolve('uploads', doc.url.split('/').pop());
    res.download(filePath, doc.filename);
});

router.delete('/:id', async (req, res, next) => {
    const doc = await db.document.findUnique({ where: { id: Number(req.params.id) } });
    if (!doc) {
        return res.status(404).json({ error: 'File not found' });
    }
    const filePath = path.resolve('uploads', doc.url.split('/').pop());

    try {
        await db.document.delete({ where: { id: Number(req.params.id) } });
        await fs.promises.unlink(filePath);
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

module.exports = router;