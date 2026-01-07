# ⚡ QUICK DEPLOY - Schnellübersicht

## 📦 Was wird hochgeladen?
- **Ordner:** `out/` (komplett)
- **Größe:** ~(wird beim Upload angezeigt)
- **Dateien:** Alle Dateien und Unterordner

## 🎯 3-Schritte-Prozess

### 1️⃣ UPLOAD
- FileZilla öffnen
- Mit Web.de FTP verbinden
- **Kompletten `out/` Ordner** auf Server hochladen

### 2️⃣ BEREchtigungen
Nach Upload in FileZilla:

| Datei/Ordner | Berechtigung | Wichtig! |
|-------------|--------------|----------|
| `data/` Ordner | **755** oder **777** | ✅ KRITISCH |
| `data/content.json` | **666** oder **777** | ✅ KRITISCH |
| `api/save_data.php` | **644** oder **755** | ✅ Wichtig |
| `.htaccess` | **644** | Optional |

**Wie setzen?**
- Rechtsklick → "Dateiberechtigungen"
- Numerisch eingeben (z.B. `755`)
- Bei Ordnern: "Rekursiv" aktivieren

### 3️⃣ TEST
1. Website öffnen: `https://deine-domain.de/`
2. Admin-Panel testen: `/admin-panel/` (Passwort: `password123`)
3. CMS testen: Alert-Text ändern und speichern

## ⚠️ WICHTIGSTE PUNKTE

1. **ALLE Dateien aus `out/` hochladen** (nicht nur einzelne!)
2. **Berechtigungen MÜSSEN gesetzt werden** - sonst funktioniert CMS nicht!
3. **PHP muss auf Server aktiviert sein** - bei Problemen Web.de Support kontaktieren

## 🆘 Bei Problemen

- **403 Fehler** → Berechtigungen prüfen
- **PHP wird nicht ausgeführt** → Web.de Support kontaktieren
- **CMS speichert nicht** → `data/content.json` auf `666` setzen

---

**Vollständige Anleitung:** Siehe `DEPLOYMENT_GUIDE.md`

