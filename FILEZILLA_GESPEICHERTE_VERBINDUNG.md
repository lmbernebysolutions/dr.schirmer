# 🔍 Gespeicherte FileZilla-Verbindung finden

## Du warst schonmal verbunden? Perfekt!

FileZilla speichert Verbindungen. So findest du sie:

---

## 📋 Methode 1: Site-Manager prüfen

1. **FileZilla öffnen**
2. **"Datei"** → **"Site-Manager"** (oder `Cmd+S` / `Ctrl+S`)
3. **Dort siehst du alle gespeicherten Verbindungen:**
   - Suche nach einer Verbindung mit `access-5006346069` oder `webspace-host`
   - **Klicke darauf** → Alle Daten werden angezeigt!

4. **Falls Verbindung gefunden:**
   - Klicke auf **"Verbinden"**
   - Oder: Notiere dir die Daten (Benutzername, Port, etc.)

---

## 📋 Methode 2: Verbindungsdaten auslesen

### In FileZilla Site-Manager:

1. Wähle die gespeicherte Verbindung aus
2. **Alle Felder werden angezeigt:**
   - **Host:** `access-5006346069.webspace-host.com`
   - **Port:** (meist 21 oder 22)
   - **Protokoll:** (FTP oder SFTP)
   - **Benutzer:** ← **HIER steht dein Benutzername!**
   - **Passwort:** (wird als Punkte angezeigt, aber ist gespeichert)

3. **Notiere dir:**
   - Benutzername
   - Port
   - Protokoll

---

## 📋 Methode 3: Schnellverbindung verwenden

Falls keine Verbindung gespeichert ist:

1. In FileZilla: **"Datei"** → **"Schnellverbindung"** (oder `Cmd+L` / `Ctrl+L`)
2. Oder: Oben in der Symbolleiste das **"Schnellverbindung"** Feld

3. **Eingeben:**
   ```
   Host: access-5006346069.webspace-host.com
   Benutzername: [versuche verschiedene Varianten - siehe unten]
   Passwort: [Dein Passwort]
   Port: 21
   ```

---

## 🧪 Benutzername-Varianten zum Testen

Falls der Benutzername wirklich der Host ist (ungewöhnlich, aber möglich):

### Variante 1: Kompletter Host
```
Benutzer: access-5006346069.webspace-host.com
```

### Variante 2: Nur die Nummer
```
Benutzer: 5006346069
```

### Variante 3: Web + Nummer
```
Benutzer: web5006346069
```

### Variante 4: Access + Nummer
```
Benutzer: access5006346069
```

### Variante 5: Ohne Domain
```
Benutzer: access-5006346069
```

---

## 🔧 FileZilla-Verbindungslog prüfen

Falls du die Verbindung nicht findest, prüfe das Log:

1. In FileZilla: **"Ansicht"** → **"Nachrichtenprotokoll"** (oder `Cmd+2` / `Ctrl+2`)
2. **Scrolle nach oben** zu deiner letzten erfolgreichen Verbindung
3. **Dort siehst du:**
   - `220 Welcome to ...` (Server-Antwort)
   - `USER [benutzername]` ← **HIER steht dein Benutzername!**
   - `331 Password required` (Passwort erforderlich)

---

## 📋 Schnelltest: Alle Varianten durchprobieren

Erstelle mehrere Verbindungen im Site-Manager und teste:

### Test 1:
```
Host: access-5006346069.webspace-host.com
Port: 21
Benutzer: access-5006346069.webspace-host.com
Passwort: [Dein Passwort]
```

### Test 2:
```
Host: access-5006346069.webspace-host.com
Port: 21
Benutzer: 5006346069
Passwort: [Dein Passwort]
```

### Test 3:
```
Host: access-5006346069.webspace-host.com
Port: 21
Benutzer: web5006346069
Passwort: [Dein Passwort]
```

### Test 4: SFTP (Port 22)
```
Host: access-5006346069.webspace-host.com
Port: 22
Protokoll: SFTP
Benutzer: [eine der Varianten oben]
Passwort: [Dein Passwort]
```

---

## ✅ Wenn Verbindung erfolgreich

1. **Speichere die Verbindung:**
   - Im Site-Manager: **"OK"** klicken
   - Oder: Bei Schnellverbindung: **"Speichern"** klicken

2. **Navigiere zum Web-Root:**
   - Meist: `/htdocs/` oder `/www/` oder `/public_html/`
   - Oder: Root-Verzeichnis `/` (wenn nur ein Ordner sichtbar ist)

3. **Lade Dateien hoch:**
   - Aus lokalem `out/` Ordner
   - In Server-Verzeichnis ziehen

---

## 💡 Tipp

Falls du die Verbindung schonmal hattest:
- **FileZilla speichert Passwörter** (wenn du es erlaubt hast)
- **Site-Manager** zeigt alle gespeicherten Verbindungen
- **Nachrichtenprotokoll** zeigt historische Verbindungen

---

**Viel Erfolg! 🚀**

