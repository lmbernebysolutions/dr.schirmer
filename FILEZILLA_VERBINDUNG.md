# 🔌 FileZilla Verbindung - Schritt für Schritt

## Server-Daten

- **Host:** `access-5006346069.webspace-host.com`
- **Protokoll:** FTP oder SFTP (je nach Web.de Einstellung)
- **Port:** 
  - FTP: `21` (Standard)
  - SFTP: `22` (falls aktiviert)

---

## 📋 Schritt-für-Schritt Anleitung

### SCHRITT 1: FileZilla öffnen

1. Öffne **FileZilla Client**
2. Falls du FileZilla noch nicht hast: [Download hier](https://filezilla-project.org/download.php?type=client)

---

### SCHRITT 2: Site-Manager öffnen

**Option A: Über Menü**
- Klicke auf **"Datei"** → **"Site-Manager"**
- Oder: `Cmd+S` (Mac) / `Ctrl+S` (Windows)

**Option B: Über Symbolleiste**
- Klicke auf das **Ordner-Symbol** in der Symbolleiste

---

### SCHRITT 3: Neue Verbindung erstellen

1. Im Site-Manager klicke auf **"Neue Seite"** (oder `Cmd+N` / `Ctrl+N`)
2. Gib einen Namen ein, z.B.: **"Dr. Schirmer Web.de"**

---

### SCHRITT 4: Verbindungsdaten eingeben

Fülle folgende Felder aus:

| Feld | Wert |
|------|------|
| **Protokoll** | `FTP - File Transfer Protocol` (oder `SFTP` falls aktiviert) |
| **Host** | `access-5006346069.webspace-host.com` |
| **Port** | `21` (für FTP) oder `22` (für SFTP) |
| **Verschlüsselung** | `Nur bei explizitem TLS verwenden` (bei FTP) oder `Nur explizites FTP über TLS` |
| **Anmeldetyp** | `Normal` |
| **Benutzer** | *(Dein Web.de FTP-Username - siehe unten)* |
| **Passwort** | *(Dein Web.de FTP-Passwort - siehe unten)* |

---

### SCHRITT 5: FTP-Zugangsdaten finden

**Wo finde ich meine FTP-Daten?**

1. **Logge dich bei Web.de ein:**
   - Gehe zu: https://web.de/webhosting/
   - Oder: https://produkte.web.de/webhosting/

2. **Navigiere zu deinem Webspace:**
   - Klicke auf **"Webspace"** oder **"Mein Webspace"**
   - Wähle deinen Webspace aus

3. **FTP-Zugangsdaten finden:**
   - Suche nach **"FTP-Zugang"** oder **"FTP-Zugangsdaten"**
   - Dort findest du:
     - **FTP-Server:** `access-5006346069.webspace-host.com` ✅ (hast du schon)
     - **FTP-Benutzername:** (z.B. `web123456` oder ähnlich)
     - **FTP-Passwort:** (wird angezeigt oder musst du setzen)

4. **Falls Passwort fehlt:**
   - Klicke auf **"Passwort setzen"** oder **"Passwort ändern"**
   - Setze ein sicheres Passwort
   - **WICHTIG:** Notiere dir das Passwort!

---

### SCHRITT 6: Verbindung speichern

1. **Optional:** Aktiviere **"Passwort speichern"** (nur wenn sicher)
2. Klicke auf **"OK"** um die Verbindung zu speichern

---

### SCHRITT 7: Verbinden

1. Im Site-Manager: Wähle deine gespeicherte Verbindung aus
2. Klicke auf **"Verbinden"**
3. Oder: Doppelklick auf die Verbindung

---

### SCHRITT 8: Verbindung prüfen

**Bei erfolgreicher Verbindung siehst du:**

- **Links (Lokal):** Deine lokalen Dateien
- **Rechts (Remote):** Dateien auf dem Server
- **Unten:** Status "Verbindung erfolgreich" oder ähnlich

**Typische Server-Struktur:**
```
/ (Root)
├── htdocs/          ← HIER musst du die Dateien hochladen!
├── logs/
├── tmp/
└── ...
```

**WICHTIG:** Die Website-Dateien müssen in das **Web-Root-Verzeichnis**:
- Meist: `/htdocs/` oder `/www/` oder `/public_html/`
- Frage bei Web.de Support nach, falls unsicher!

---

## ⚠️ Häufige Probleme & Lösungen

### Problem: "Verbindung fehlgeschlagen" / "Connection refused"

**Lösungen:**
1. **Port prüfen:**
   - Versuche Port `21` (FTP)
   - Oder Port `22` (SFTP)
   - Oder Port `990` (FTPS)

2. **Verschlüsselung ändern:**
   - Versuche: `Nur bei explizitem TLS verwenden`
   - Oder: `Nur explizites FTP über TLS`
   - Oder: `Nur reines FTP verwenden` (unsicher, nur als Test)

3. **Passiv-Modus aktivieren:**
   - In FileZilla: **"Bearbeiten"** → **"Einstellungen"**
   - **"Verbindung"** → **"FTP"**
   - Aktiviere: **"Passiv-Modus"**

4. **Firewall prüfen:**
   - Stelle sicher, dass deine Firewall FileZilla erlaubt

---

### Problem: "530 Login incorrect"

**Lösungen:**
1. **Benutzername prüfen:**
   - Benutzername ist meist: `web` + Zahlen (z.B. `web123456`)
   - Oder: Deine Web.de E-Mail-Adresse
   - Prüfe in Web.de Webspace-Einstellungen

2. **Passwort prüfen:**
   - Passwort ist case-sensitive (Groß-/Kleinschreibung wichtig!)
   - Kopiere das Passwort direkt aus Web.de (keine Leerzeichen!)

3. **Passwort zurücksetzen:**
   - In Web.de Webspace-Einstellungen: Passwort zurücksetzen

---

### Problem: "550 Permission denied" (nach Upload)

**Lösung:**
- Dateiberechtigungen setzen (siehe `DEPLOYMENT_GUIDE.md`)
- `data/` Ordner: `755` oder `777`
- `data/content.json`: `666` oder `777`

---

## 🔒 Sicherheitshinweise

1. **Passwort nicht speichern** auf öffentlichen Computern
2. **SFTP bevorzugen** (falls verfügbar) - sicherer als FTP
3. **TLS-Verschlüsselung aktivieren** (falls verfügbar)

---

## 📞 Support

**Falls nichts funktioniert:**

1. **Web.de Support kontaktieren:**
   - Telefon: 0800 664 44 44 (kostenlos)
   - E-Mail: support@web.de
   - Live-Chat: https://web.de/webhosting/

2. **Frage nach:**
   - FTP-Zugangsdaten (Benutzername & Passwort)
   - Korrektem Port (21, 22, oder 990)
   - Web-Root-Verzeichnis (htdocs, www, oder public_html)
   - Ob SFTP aktiviert ist

---

## ✅ Checkliste vor dem Upload

- [ ] FileZilla installiert
- [ ] FTP-Zugangsdaten von Web.de erhalten
- [ ] Verbindung erfolgreich getestet
- [ ] Web-Root-Verzeichnis identifiziert (`/htdocs/` oder ähnlich)
- [ ] Lokaler `out/` Ordner bereit
- [ ] Deployment-Anleitung gelesen (`DEPLOYMENT_GUIDE.md`)

---

**Viel Erfolg! 🚀**

