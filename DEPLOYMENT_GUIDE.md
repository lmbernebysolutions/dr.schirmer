# 🚀 Deployment-Anleitung: Dr. Schirmer Website auf Web.de

## ✅ Production-Ready Prüfung - ABGESCHLOSSEN

### Build-Status
- ✅ Build erfolgreich (`npm run export`)
- ✅ Alle statischen Dateien generiert
- ✅ PHP-Datei vorhanden: `out/api/save_data.php`
- ✅ JSON-Datei vorhanden: `out/data/content.json`
- ✅ Alle Bilder und Assets vorhanden
- ✅ Keine Linter-Fehler

### Wichtige Dateien im `out/` Ordner:
- ✅ `index.html` - Hauptseite
- ✅ `api/save_data.php` - PHP Backend für CMS
- ✅ `data/content.json` - CMS Daten
- ✅ `.htaccess` - Apache Konfiguration (muss geprüft werden)
- ✅ Alle Seiten: `/impressum/`, `/datenschutz/`, `/admin-panel/`
- ✅ Alle Bilder in `/images/`

---

## 📋 SCHRITT-FÜR-SCHRITT: FileZilla Upload

### VORBEREITUNG

1. **FileZilla öffnen**
   - Stelle sicher, dass FileZilla installiert ist
   - Verbinde dich mit deinem Web.de FTP-Server

2. **FTP-Verbindungsdaten bereithalten:**
   - Host: (von Web.de bereitgestellt, z.B. `ftp.web.de` oder IP)
   - Benutzername: (dein Web.de FTP-User)
   - Passwort: (dein Web.de FTP-Passwort)
   - Port: 21 (Standard FTP) oder 22 (SFTP)

---

### SCHRITT 1: Verbindung herstellen

1. Öffne FileZilla
2. Klicke auf **"Datei" → "Site-Manager"** (oder `Cmd+S` / `Ctrl+S`)
3. Klicke auf **"Neue Seite"**
4. Fülle die Verbindungsdaten aus:
   - **Protokoll:** FTP oder SFTP (je nach Web.de Einstellung)
   - **Host:** Dein Web.de FTP-Host
   - **Port:** 21 (FTP) oder 22 (SFTP)
   - **Verschlüsselung:** "Nur bei explizitem TLS verwenden" (bei FTP) oder "Nur explizites FTP über TLS"
   - **Anmeldetyp:** Normal
   - **Benutzer:** Dein FTP-Username
   - **Passwort:** Dein FTP-Passwort
5. Klicke auf **"Verbinden"**

---

### SCHRITT 2: Zielverzeichnis finden

1. Nach erfolgreicher Verbindung siehst du:
   - **Links:** Lokale Dateien (dein Computer)
   - **Rechts:** Server-Dateien (Web.de Server)

2. **WICHTIG:** Finde das richtige Verzeichnis auf dem Server:
   - Meist: `/` oder `/htdocs/` oder `/www/` oder `/public_html/`
   - Das ist das **Web-Root-Verzeichnis** (wo die Website erreichbar sein soll)
   - Frage bei Web.de Support nach, falls unsicher!

3. **Navigiere auf dem Server** zu diesem Web-Root-Verzeichnis

---

### SCHRITT 3: Lokalen `out/` Ordner öffnen

1. **Links in FileZilla:** Navigiere zu:
   ```
   /Users/lennardmeyer/Berneby Solutions/Code-Space/Extern/Dr Schirmer/Dr.Schirmer/out
   ```

2. Du solltest jetzt sehen:
   - `index.html`
   - `api/` Ordner
   - `data/` Ordner
   - `images/` Ordner
   - `.htaccess` Datei
   - etc.

---

### SCHRITT 4: Alle Dateien hochladen

**WICHTIG:** Lade ALLE Dateien und Ordner aus `out/` hoch!

1. **Markiere ALLE Dateien und Ordner** im `out/` Ordner:
   - `Cmd+A` (Mac) oder `Ctrl+A` (Windows)

2. **Ziehe die Dateien** vom linken Fenster (lokal) ins rechte Fenster (Server)
   - Oder: Rechtsklick → "Hochladen"

3. **Warte bis Upload abgeschlossen ist**
   - Kann je nach Internetgeschwindigkeit einige Minuten dauern
   - Prüfe die Statusleiste unten in FileZilla

4. **Stelle sicher, dass folgende Struktur auf dem Server existiert:**
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

---

### SCHRITT 5: Dateiberechtigungen setzen (KRITISCH!)

**Ohne korrekte Berechtigungen funktioniert das CMS nicht!**

#### 5.1: Ordner `data/` Berechtigungen setzen

1. **Rechtsklick** auf den Ordner `data/` auf dem Server
2. Wähle **"Dateiberechtigungen"** oder **"Berechtigungen ändern"**
3. Setze folgende Werte:
   - **Numerisch:** `755` oder `777`
   - **Oder manuell:**
     - ✅ Besitzer: Lesen, Schreiben, Ausführen
     - ✅ Gruppe: Lesen, Ausführen
     - ✅ Öffentlich: Lesen, Ausführen
4. ✅ **"Rekursiv auf Unterverzeichnisse anwenden"** aktivieren
5. Klicke **"OK"**

#### 5.2: Datei `data/content.json` Berechtigungen setzen

1. **Rechtsklick** auf `data/content.json` auf dem Server
2. Wähle **"Dateiberechtigungen"**
3. Setze folgende Werte:
   - **Numerisch:** `666` oder `777`
   - **Oder manuell:**
     - ✅ Besitzer: Lesen, Schreiben
     - ✅ Gruppe: Lesen, Schreiben
     - ✅ Öffentlich: Lesen, Schreiben
4. Klicke **"OK"**

#### 5.3: PHP-Datei `api/save_data.php` Berechtigungen setzen

1. **Rechtsklick** auf `api/save_data.php` auf dem Server
2. Wähle **"Dateiberechtigungen"**
3. Setze folgende Werte:
   - **Numerisch:** `644` oder `755`
   - **Oder manuell:**
     - ✅ Besitzer: Lesen, Schreiben, Ausführen
     - ✅ Gruppe: Lesen, Ausführen
     - ✅ Öffentlich: Lesen, Ausführen
4. Klicke **"OK"**

#### 5.4: `.htaccess` Datei Berechtigungen (falls vorhanden)

1. **Rechtsklick** auf `.htaccess` auf dem Server
2. Wähle **"Dateiberechtigungen"**
3. Setze: **`644`**
4. Klicke **"OK"**

---

### SCHRITT 6: PHP-Funktionalität prüfen

1. **Öffne einen Browser**
2. Gehe zu: `https://deine-domain.de/api/save_data.php`
3. **Erwartetes Ergebnis:**
   - ✅ Wenn PHP funktioniert: JSON-Fehlermeldung (normal, da GET nicht erlaubt)
   - ❌ Wenn PHP NICHT funktioniert: Datei wird heruntergeladen oder Quellcode wird angezeigt

4. **Falls PHP nicht funktioniert:**
   - Kontaktiere Web.de Support
   - Frage nach PHP-Aktivierung
   - Prüfe ob PHP-Version aktiviert ist (mindestens PHP 7.4)

---

### SCHRITT 7: Website testen

1. **Öffne die Website:**
   - `https://deine-domain.de/`
   - Oder: `https://deine-domain.de/index.html`

2. **Prüfe folgende Seiten:**
   - ✅ Startseite lädt
   - ✅ `/impressum/` funktioniert
   - ✅ `/datenschutz/` funktioniert
   - ✅ `/admin-panel/` funktioniert
   - ✅ Bilder werden angezeigt
   - ✅ Navigation funktioniert

3. **Teste das CMS:**
   - Gehe zu `/admin-panel/`
   - Passwort: `password123`
   - Versuche eine Alert-Text zu ändern
   - Klicke "Speichern"
   - Prüfe ob die Änderung gespeichert wurde

---

## 🔧 TROUBLESHOOTING

### Problem: "403 Forbidden" oder "Permission Denied"
**Lösung:** Dateiberechtigungen prüfen (Schritt 5)

### Problem: PHP-Datei wird heruntergeladen statt ausgeführt
**Lösung:** 
- PHP ist nicht aktiviert → Web.de Support kontaktieren
- `.htaccess` prüfen (muss PHP-Handler enthalten)

### Problem: CMS speichert nicht
**Lösung:**
- `data/content.json` Berechtigungen auf `666` oder `777` setzen
- `data/` Ordner Berechtigungen auf `755` oder `777` setzen
- Browser-Konsole prüfen (F12) auf Fehler

### Problem: Bilder werden nicht angezeigt
**Lösung:**
- Prüfe ob `images/` Ordner vollständig hochgeladen wurde
- Prüfe Pfade in Browser-Konsole (F12)

### Problem: 404 Fehler auf Unterseiten
**Lösung:**
- Prüfe ob `.htaccess` hochgeladen wurde
- Prüfe ob alle Ordner (`impressum/`, `datenschutz/`, etc.) vorhanden sind

---

## 📝 CHECKLISTE NACH DEM UPLOAD

- [ ] Alle Dateien aus `out/` hochgeladen
- [ ] `data/` Ordner Berechtigungen: `755` oder `777`
- [ ] `data/content.json` Berechtigungen: `666` oder `777`
- [ ] `api/save_data.php` Berechtigungen: `644` oder `755`
- [ ] `.htaccess` vorhanden und Berechtigungen: `644`
- [ ] Website lädt im Browser
- [ ] Alle Seiten funktionieren
- [ ] Bilder werden angezeigt
- [ ] Admin-Panel funktioniert (Login mit `password123`)
- [ ] CMS speichert Änderungen erfolgreich
- [ ] PHP funktioniert (siehe Schritt 6)

---

## 🎉 FERTIG!

Wenn alle Punkte der Checkliste erfüllt sind, ist die Website live und einsatzbereit!

**WICHTIG:** Speichere diese Anleitung für zukünftige Updates!

