# 🔐 Dateiberechtigungen setzen - Schritt für Schritt

## ⚠️ WICHTIG: Ohne diese Berechtigungen funktioniert das CMS NICHT!

---

## 📋 SCHRITT 1: Ordner `data/` Berechtigungen

1. **Rechts in FileZilla (Server):** Finde den Ordner `data/`
2. **Rechtsklick** auf `data/` Ordner
3. **"Dateiberechtigungen"** oder **"Berechtigungen ändern"** klicken
4. **Numerisch eingeben:** `755` oder `777`
5. ✅ **"Rekursiv auf Unterverzeichnisse anwenden"** aktivieren (wichtig!)
6. **"OK"** klicken

---

## 📋 SCHRITT 2: Datei `data/content.json` Berechtigungen

1. **Rechts in FileZilla (Server):** Finde die Datei `data/content.json`
2. **Rechtsklick** auf `content.json`
3. **"Dateiberechtigungen"** klicken
4. **Numerisch eingeben:** `666` oder `777`
5. **"OK"** klicken

**Warum?** Das CMS muss in diese Datei schreiben können!

---

## 📋 SCHRITT 3: PHP-Datei `api/save_data.php` Berechtigungen

1. **Rechts in FileZilla (Server):** Finde die Datei `api/save_data.php`
2. **Rechtsklick** auf `save_data.php`
3. **"Dateiberechtigungen"** klicken
4. **Numerisch eingeben:** `644` oder `755`
5. **"OK"** klicken

---

## 📋 SCHRITT 4: `.htaccess` Berechtigungen (optional)

1. **Rechts in FileZilla (Server):** Finde die Datei `.htaccess`
2. **Rechtsklick** auf `.htaccess`
3. **"Dateiberechtigungen"** klicken
4. **Numerisch eingeben:** `644`
5. **"OK"** klicken

---

## ✅ Checkliste

Nach dem Setzen der Berechtigungen:

- [ ] `data/` Ordner: **755** oder **777** ✅
- [ ] `data/content.json`: **666** oder **777** ✅
- [ ] `api/save_data.php`: **644** oder **755** ✅
- [ ] `.htaccess`: **644** ✅

---

## 🧪 Testen

1. **Website öffnen:** `https://access-5006346069.webspace-host.com/`
2. **Admin-Panel öffnen:** `/admin-panel/`
3. **Passwort eingeben:** `password123`
4. **Alert-Text ändern** und **"Speichern"** klicken
5. **Prüfe:** Wurde die Änderung gespeichert?

**Falls CMS nicht speichert:**
- Berechtigungen nochmal prüfen
- `data/content.json` muss **666** oder **777** haben
- `data/` Ordner muss **755** oder **777** haben

---

## 📊 Übersichtstabelle

| Datei/Ordner | Berechtigung | Warum? |
|-------------|--------------|--------|
| `data/` Ordner | **755** oder **777** | PHP muss hineinschreiben können |
| `data/content.json` | **666** oder **777** | CMS muss Datei ändern können |
| `api/save_data.php` | **644** oder **755** | PHP-Script muss ausführbar sein |
| `.htaccess` | **644** | Apache muss lesen können |

---

## 🆘 Falls Probleme

**"Permission denied" Fehler:**
- Berechtigungen nochmal prüfen
- Versuche **777** statt **755** (weniger sicher, aber funktioniert immer)

**CMS speichert nicht:**
- `data/content.json` auf **777** setzen
- Browser-Cache leeren (F5 oder Cmd+Shift+R)

---

**Das war's! 🚀**

