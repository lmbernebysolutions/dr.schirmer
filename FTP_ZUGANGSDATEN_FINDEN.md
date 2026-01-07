# 🔍 FTP-Zugangsdaten finden - Web.de

## Du hast bereits:
- ✅ **Host:** `access-5006346069.webspace-host.com`
- ✅ **Passwort**

## Du brauchst noch:
- ❓ **FTP-Benutzername**
- ❓ **Port** (meist 21)
- ❓ **Protokoll** (FTP oder SFTP)

---

## 📋 Schritt 1: Web.de Login

1. Gehe zu: **https://web.de/webhosting/**
2. Oder: **https://produkte.web.de/webhosting/**
3. **Logge dich ein** mit deinem Web.de Account

---

## 📋 Schritt 2: FTP-Zugangsdaten finden

### Option A: Über Webspace-Verwaltung

1. Nach dem Login: Klicke auf **"Webspace"** oder **"Mein Webspace"**
2. Wähle deinen Webspace aus (falls mehrere vorhanden)
3. Suche nach:
   - **"FTP-Zugang"**
   - **"FTP-Zugangsdaten"**
   - **"FTP-Einstellungen"**
   - **"Datei-Manager"** → dort findest du auch FTP-Daten

4. Dort solltest du sehen:
   - **FTP-Server:** `access-5006346069.webspace-host.com` ✅
   - **FTP-Benutzername:** `web123456` oder ähnlich ← **DAS BRAUCHST DU!**
   - **FTP-Passwort:** (wird angezeigt oder du hast es schon)

### Option B: Über E-Mail-Einstellungen

1. Gehe zu: **"E-Mail"** → **"Einstellungen"**
2. Suche nach **"FTP"** oder **"Webspace"**
3. Dort findest du die FTP-Zugangsdaten

### Option C: Über Support

Falls du die Daten nicht findest:
1. Kontaktiere Web.de Support:
   - **Telefon:** 0800 664 44 44 (kostenlos)
   - **E-Mail:** support@web.de
   - **Live-Chat:** https://web.de/webhosting/

2. **Frage nach:**
   - "Ich brauche meine FTP-Zugangsdaten für den Webspace `access-5006346069.webspace-host.com`"
   - "Was ist mein FTP-Benutzername?"
   - "Welcher Port wird verwendet? (21, 22, oder 990)"

---

## 🔧 Standard-Werte (zum Testen)

Falls du die Daten nicht findest, kannst du diese Standard-Werte testen:

### FTP-Benutzername (häufige Varianten):
- `web` + Zahlen (z.B. `web5006346069`)
- Deine Web.de E-Mail-Adresse (ohne @web.de)
- `ftp` + Zahlen
- Die Nummer aus dem Host: `5006346069`

### Port:
- **21** (Standard FTP) ← **Versuche zuerst!**
- **22** (SFTP)
- **990** (FTPS)

### Protokoll:
- **FTP** (Port 21) ← **Versuche zuerst!**
- **SFTP** (Port 22)

---

## 🧪 Test-Verbindung in FileZilla

### Versuch 1: Standard FTP

```
Protokoll: FTP - File Transfer Protocol
Host: access-5006346069.webspace-host.com
Port: 21
Verschlüsselung: Nur bei explizitem TLS verwenden
Anmeldetyp: Normal
Benutzer: web5006346069  (oder deine E-Mail ohne @web.de)
Passwort: [Dein Passwort]
```

### Versuch 2: Mit E-Mail als Benutzername

```
Benutzer: deine-email@web.de  (komplett mit @web.de)
```

### Versuch 3: SFTP (falls FTP nicht funktioniert)

```
Protokoll: SFTP - SSH File Transfer Protocol
Port: 22
Benutzer: [wie oben]
```

---

## ⚠️ Wichtig

1. **Benutzername ist meist:**
   - `web` + die Nummer aus dem Host
   - Beispiel: Host `access-5006346069` → Benutzername könnte `web5006346069` sein

2. **Passwort:**
   - Case-sensitive (Groß-/Kleinschreibung wichtig!)
   - Keine Leerzeichen am Anfang/Ende

3. **Port 21 ist Standard:**
   - Versuche zuerst Port 21
   - Falls das nicht funktioniert, versuche 22 (SFTP)

---

## ✅ Wenn Verbindung erfolgreich

Nach erfolgreicher Verbindung:
1. Navigiere zum **Web-Root-Verzeichnis**
2. Meist: `/htdocs/` oder `/www/` oder `/public_html/`
3. Dort lade die Dateien aus dem `out/` Ordner hoch

---

## 📞 Falls nichts funktioniert

**Web.de Support kontaktieren:**
- **Telefon:** 0800 664 44 44 (kostenlos, Mo-Fr 8-20 Uhr)
- **E-Mail:** support@web.de
- **Live-Chat:** https://web.de/webhosting/

**Sage ihnen:**
- "Ich brauche meine FTP-Zugangsdaten"
- "Host: access-5006346069.webspace-host.com"
- "Was ist mein FTP-Benutzername und welcher Port?"

---

**Viel Erfolg! 🚀**

