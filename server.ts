import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Persistent JSON Storage Path
const DB_FILE = path.join(process.cwd(), 'server_database.json');

interface DatabaseSchema {
  communitySurveys: any[];
  professionalSurveys: any[];
  contactMessages: any[];
  donations: any[];
  visits: any[];
  lastUpdated: string;
}

// Helper to read database with error recovery
function readDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        communitySurveys: Array.isArray(parsed.communitySurveys) ? parsed.communitySurveys : [],
        professionalSurveys: Array.isArray(parsed.professionalSurveys) ? parsed.professionalSurveys : [],
        contactMessages: Array.isArray(parsed.contactMessages) ? parsed.contactMessages : [],
        donations: Array.isArray(parsed.donations) ? parsed.donations : [],
        visits: Array.isArray(parsed.visits) ? parsed.visits : [],
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('[Database] Failed to read database file, initializing fallback:', err);
  }
  return {
    communitySurveys: [],
    professionalSurveys: [],
    contactMessages: [],
    donations: [],
    visits: [],
    lastUpdated: new Date().toISOString(),
  };
}

// Helper to write database atomically
function writeDatabase(db: DatabaseSchema): boolean {
  try {
    db.lastUpdated = new Date().toISOString();
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('[Database] Failed to write database file:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // --------------------------------------------------------------------------
  // API Endpoints: Health, Surveys, Messages, Donations, Traffic
  // --------------------------------------------------------------------------

  // 1. Health check
  app.get('/api/health', (req, res) => {
    const db = readDatabase();
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      communitySurveysCount: db.communitySurveys.length,
      professionalSurveysCount: db.professionalSurveys.length,
      contactMessagesCount: db.contactMessages.length,
      donationsCount: db.donations.length,
      visitsCount: db.visits.length,
    });
  });

  // 2. Full Admin Data Fetch
  app.get('/api/admin/data', (req, res) => {
    try {
      const db = readDatabase();
      res.json({
        success: true,
        data: db,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Admin Bidirectional Sync / Bulk Merge
  app.post('/api/admin/sync', (req, res) => {
    try {
      const payload = req.body || {};
      const db = readDatabase();

      // Merge Community Surveys
      if (Array.isArray(payload.communitySurveys)) {
        const commMap = new Map<string, any>();
        db.communitySurveys.forEach(s => s && s.id && commMap.set(s.id, s));
        payload.communitySurveys.forEach(s => s && s.id && commMap.set(s.id, s));
        db.communitySurveys = Array.from(commMap.values()).sort(
          (a, b) => new Date(b.submittedAt || b.submitted_at || 0).getTime() - new Date(a.submittedAt || a.submitted_at || 0).getTime()
        );
      }

      // Merge Professional Surveys
      if (Array.isArray(payload.professionalSurveys)) {
        const profMap = new Map<string, any>();
        db.professionalSurveys.forEach(s => s && s.id && profMap.set(s.id, s));
        payload.professionalSurveys.forEach(s => s && s.id && profMap.set(s.id, s));
        db.professionalSurveys = Array.from(profMap.values()).sort(
          (a, b) => new Date(b.submittedAt || b.submitted_at || 0).getTime() - new Date(a.submittedAt || a.submitted_at || 0).getTime()
        );
      }

      // Merge Contact Messages
      if (Array.isArray(payload.contactMessages)) {
        const msgMap = new Map<string, any>();
        db.contactMessages.forEach(m => m && m.id && msgMap.set(m.id, m));
        payload.contactMessages.forEach(m => m && m.id && msgMap.set(m.id, m));
        db.contactMessages = Array.from(msgMap.values()).sort(
          (a, b) => new Date(b.submittedAt || b.submitted_at || 0).getTime() - new Date(a.submittedAt || a.submitted_at || 0).getTime()
        );
      }

      // Merge Donations
      if (Array.isArray(payload.donations)) {
        const donMap = new Map<string, any>();
        db.donations.forEach(d => d && d.id && donMap.set(d.id, d));
        payload.donations.forEach(d => d && d.id && donMap.set(d.id, d));
        db.donations = Array.from(donMap.values()).sort(
          (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        );
      }

      // Merge Visits
      if (Array.isArray(payload.visits)) {
        const visMap = new Map<string, any>();
        db.visits.forEach(v => v && v.id && visMap.set(v.id, v));
        payload.visits.forEach(v => v && v.id && visMap.set(v.id, v));
        db.visits = Array.from(visMap.values())
          .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime())
          .slice(0, 5000);
      }

      writeDatabase(db);
      res.json({
        success: true,
        message: 'Successfully synchronized data with server database.',
        data: db,
      });
    } catch (err: any) {
      console.error('[API Sync Error]', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Community Surveys (Public POST & Admin GET)
  app.get('/api/surveys/community', (req, res) => {
    const db = readDatabase();
    res.json({ success: true, data: db.communitySurveys });
  });

  app.post('/api/surveys/community', (req, res) => {
    try {
      const record = req.body;
      if (!record || typeof record !== 'object') {
        return res.status(400).json({ success: false, error: 'Invalid survey data' });
      }

      const id = record.id || `comm-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
      const newRecord = {
        ...record,
        id,
        submittedAt: record.submittedAt || new Date().toISOString(),
      };

      const db = readDatabase();
      const existingIdx = db.communitySurveys.findIndex(s => s.id === id);
      if (existingIdx >= 0) {
        db.communitySurveys[existingIdx] = newRecord;
      } else {
        db.communitySurveys.unshift(newRecord);
      }

      writeDatabase(db);
      console.log(`[Database] Stored community survey ${id}. Total count: ${db.communitySurveys.length}`);
      res.json({ success: true, id, total: db.communitySurveys.length });
    } catch (err: any) {
      console.error('[API Error /api/surveys/community]', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/surveys/community/:id', (req, res) => {
    try {
      const { id } = req.params;
      const db = readDatabase();
      db.communitySurveys = db.communitySurveys.filter(s => s.id !== id);
      writeDatabase(db);
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Professional Surveys (Public POST & Admin GET)
  app.get('/api/surveys/professional', (req, res) => {
    const db = readDatabase();
    res.json({ success: true, data: db.professionalSurveys });
  });

  app.post('/api/surveys/professional', (req, res) => {
    try {
      const record = req.body;
      if (!record || typeof record !== 'object') {
        return res.status(400).json({ success: false, error: 'Invalid survey data' });
      }

      const id = record.id || `prof-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
      const newRecord = {
        ...record,
        id,
        submittedAt: record.submittedAt || new Date().toISOString(),
      };

      const db = readDatabase();
      const existingIdx = db.professionalSurveys.findIndex(s => s.id === id);
      if (existingIdx >= 0) {
        db.professionalSurveys[existingIdx] = newRecord;
      } else {
        db.professionalSurveys.unshift(newRecord);
      }

      writeDatabase(db);
      console.log(`[Database] Stored professional survey ${id}. Total count: ${db.professionalSurveys.length}`);
      res.json({ success: true, id, total: db.professionalSurveys.length });
    } catch (err: any) {
      console.error('[API Error /api/surveys/professional]', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/surveys/professional/:id', (req, res) => {
    try {
      const { id } = req.params;
      const db = readDatabase();
      db.professionalSurveys = db.professionalSurveys.filter(s => s.id !== id);
      writeDatabase(db);
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Contact Messages
  app.get('/api/contact', (req, res) => {
    const db = readDatabase();
    res.json({ success: true, data: db.contactMessages });
  });

  app.post('/api/contact', (req, res) => {
    try {
      const record = req.body;
      const id = record.id || `msg-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
      const newRecord = {
        ...record,
        id,
        submittedAt: record.submittedAt || new Date().toISOString(),
        status: record.status || 'Unread',
      };

      const db = readDatabase();
      db.contactMessages.unshift(newRecord);
      writeDatabase(db);
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. Donations
  app.get('/api/donations', (req, res) => {
    const db = readDatabase();
    res.json({ success: true, data: db.donations });
  });

  app.post('/api/donations', (req, res) => {
    try {
      const record = req.body;
      const id = record.id || `don-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
      const newRecord = {
        ...record,
        id,
        date: record.date || new Date().toISOString(),
      };

      const db = readDatabase();
      const existingIdx = db.donations.findIndex(d => d.id === id);
      if (existingIdx >= 0) {
        db.donations[existingIdx] = newRecord;
      } else {
        db.donations.unshift(newRecord);
      }
      writeDatabase(db);
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. Site Visits
  app.get('/api/visits', (req, res) => {
    const db = readDatabase();
    res.json({ success: true, data: db.visits });
  });

  app.post('/api/visits', (req, res) => {
    try {
      const record = req.body;
      const id = record.id || `vis-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
      const newRecord = {
        ...record,
        id,
        timestamp: record.timestamp || new Date().toISOString(),
      };

      const db = readDatabase();
      db.visits.unshift(newRecord);
      if (db.visits.length > 5000) {
        db.visits = db.visits.slice(0, 5000);
      }
      writeDatabase(db);
      console.log(`[Database] Recorded visit on ${newRecord.path || '/'}. Total visits: ${db.visits.length}`);
      res.json({ success: true, id, total: db.visits.length });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/visits', (req, res) => {
    try {
      const db = readDatabase();
      db.visits = [];
      writeDatabase(db);
      res.json({ success: true, message: 'All site visits cleared' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
