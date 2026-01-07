# 📤 Upload-Schritte - Jetzt geht's los!

## ✅ Status: Verbunden!
- **Host:** `access-5006346069.webspace-host.com`
- **Benutzer:** `u80385670`
- **Protokoll:** SFTP

---

## 📋 SCHRITT 1: Web-Root-Verzeichnis finden

**Aktuell siehst du:** Root-Verzeichnis `/` mit Ordnern wie `css`, `fonts`, `images`, `js`, `logs`

**Das Web-Root ist wahrscheinlich:**
- ✅ **Bereits im Root** (`/`) - wenn dort `index.html` liegt, bist du richtig!
- Oder: `/htdocs/` oder `/www/` oder `/public_html/`

**Prüfe:**
1. Siehst du `index.html` im aktuellen Verzeichnis? → **Dann bist du richtig!**
2. Falls nicht: Doppelklick auf `htdocs` oder `www` (falls vorhanden)

---

## 📋 SCHRITT 2: Lokalen `out/` Ordner öffnen

**Links in FileZilla (Lokale Dateien):**

1. Navigiere zu:
   ```
   /Users/lennardmeyer/Berneby Solutions/Code-Space/Extern/Dr Schirmer/Dr.Schirmer/out
   ```

2. **Du solltest sehen:**
   - `index.html`
   - `api/` Ordner
   - `data/` Ordner
   - `images/` Ordner
   - `.htaccess`
   - `impressum/`, `datenschutz/`, `admin-panel/` Ordner
   - `_next/` Ordner
   - etc.

---

## 📋 SCHRITT 3: Alte Dateien sichern (optional, aber empfohlen)

**Falls bereits Dateien auf dem Server sind:**

1. **Rechts (Server):** Markiere alle vorhandenen Dateien
2. **Rechtsklick** → **"Umbenennen"** oder erstelle einen Backup-Ordner
3. Oder: Verschiebe sie in einen `backup/` Ordner

**Oder:** Überschreibe direkt (neue Website ersetzt alte)

---

## 📋 SCHRITT 4: Alle Dateien hochladen

### Option A: Kompletter Upload (empfohlen)

1. **Links (Lokal):** Markiere ALLE Dateien und Ordner im `out/` Ordner
   - `Cmd+A` (Mac) oder `Ctrl+A` (Windows)

2. **Ziehe die Dateien** vom linken Fenster ins rechte Fenster (Server)
   - Oder: Rechtsklick → **"Hochladen"**

3. **Warte bis Upload abgeschlossen ist**
   - Status siehst du unten in FileZilla
   - Kann einige Minuten dauern (je nach Internetgeschwindigkeit)

### Option B: Schrittweise Upload

1. **Zuerst wichtige Dateien:**
   - `index.html`
   - `.htaccess`
   - `api/` Ordner (mit `save_data.php`)
   - `data/` Ordner (mit `content.json`)

2. **Dann Rest:**
   - `images/` Ordner
   - `impressum/`, `datenschutz/`, `admin-panel/` Ordner
   - `_next/` Ordner

---

## 📋 SCHRITT 5: Dateiberechtigungen setzen (KRITISCH!)

**Ohne korrekte Berechtigungen funktioniert das CMS nicht!**

### 5.1: Ordner `data/` Berechtigungen

1. **Rechts (Server):** Rechtsklick auf `data/` Ordner
2. **"Dateiberechtigungen"** oder **"Berechtigungen ändern"**
3. Setze: **`755`** oder **`777`**
4. ✅ **"Rekursiv auf Unterverzeichnisse anwenden"** aktivieren
5. **"OK"** klicken

### 5.2: Datei `data/content.json` Berechtigungen

1. **Rechts (Server):** Rechtsklick auf `data/content.json`
2. **"Dateiberechtigungen"**
3. Setze: **`666`** oder **`777`**
4. **"OK"** klicken

### 5.3: PHP-Datei `api/save_data.php` Berechtigungen

1. **Rechts (Server):** Rechtsklick auf `api/save_data.php`
2. **"Dateiberechtigungen"**
3. Setze: **`644`** oder **`755`**
4. **"OK"** klicken

### 5.4: `.htaccess` Berechtigungen

1. **Rechts (Server):** Rechtsklick auf `.htaccess`
2. **"Dateiberechtigungen"**
3. Setze: **`644`**
4. **"OK"** klicken

---

## 📋 SCHRITT 6: Struktur prüfen

**Auf dem Server sollte jetzt folgende Struktur sein:**

```
/ (Web-Root)
├── index.html
├── .htaccess
├── api/
│   └── save_data.php
├── data/
│   └── content.json
├── images/
│   └── (alle Bilder)
├── impressum/
├── datenschutz/
├── admin-panel/
└── _next/
```

**Prüfe:**
- ✅ `index.html` vorhanden?
- ✅ `api/save_data.php` vorhanden?
- ✅ `data/content.json` vorhanden?
- ✅ `images/` Ordner mit Bildern vorhanden?

---

## 📋 SCHRITT 7: Website testen

1. **Öffne Browser**
2. Gehe zu: `https://access-5006346069.webspace-host.com/`
   - Oder: Deine Domain (falls eingerichtet)

3. **Prüfe:**
   - ✅ Startseite lädt?
   - ✅ Bilder werden angezeigt?
   - ✅ Navigation funktioniert?
   - ✅ `/impressum/` funktioniert?
   - ✅ `/datenschutz/` funktioniert?

---

## 📋 SCHRITT 8: CMS testen

1. **Gehe zu:** `/admin-panel/`
2. **Passwort eingeben:** `password123`
3. **Teste:**
   - Alert-Text ändern
   - "Speichern" klicken
   - Prüfe ob Änderung gespeichert wurde

**Falls CMS nicht speichert:**
- Berechtigungen nochmal prüfen (Schritt 5)
- `data/content.json` muss `666` oder `777` haben
- `data/` Ordner muss `755` oder `777` haben

---

## ⚠️ Wichtige Hinweise

1. **Upload-Dauer:**
   - ~35 MB Daten
   - Kann 5-15 Minuten dauern (je nach Internetgeschwindigkeit)
   - Nicht unterbrechen!

2. **Berechtigungen sind KRITISCH:**
   - Ohne korrekte Berechtigungen funktioniert CMS nicht
   - Immer prüfen nach Upload!

3. **PHP muss aktiviert sein:**
   - Falls `/api/save_data.php` nicht funktioniert → Web.de Support kontaktieren

---

## ✅ Checkliste

- [ ] Alle Dateien aus `out/` hochgeladen
- [ ] `data/` Ordner Berechtigungen: `755` oder `777`
- [ ] `data/content.json` Berechtigungen: `666` oder `777`
- [ ] `api/save_data.php` Berechtigungen: `644` oder `755`
- [ ] `.htaccess` Berechtigungen: `644`
- [ ] Website lädt im Browser
- [ ] Alle Seiten funktionieren
- [ ] Bilder werden angezeigt
- [ ] Admin-Panel funktioniert (Login: `password123`)
- [ ] CMS speichert Änderungen

---

**Viel Erfolg! 🚀**

