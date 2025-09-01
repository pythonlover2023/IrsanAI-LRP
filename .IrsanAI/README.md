# .IrsanAI Verzeichnis

Dieses Verzeichnis wird zur Laufzeit befüllt und sollte im GitHub-Repository **NUR** folgende Dateien enthalten:

- `.gitkeep` - Leere Datei zur Erhaltung der Verzeichnisstruktur
- `README.md` - Diese Datei

## Wichtige Hinweise

- **NIEMALS** manuell Dateien in dieses Verzeichnis hinzufügen.
- Alle Inhalte werden automatisch bei der Ausführung generiert:
  - `IrsanAI_OS_HW_Detector.py`
  - `IrsanAI_project-run.py`
  - `IrsanAI_report.json`
- Dieses Verzeichnis ist wichtig für die Funktionalität des IrsanAI-LRP Systems.

### DSGVO-Konformität

- Alle personenbezogenen Daten werden maskiert oder anonymisiert.
- Benutzernamen in Pfaden werden durch `%username%` ersetzt.
- Hardware-IDs werden mit SHA-256 gehasht.
- Es werden keine personenbezogenen Daten gespeichert.
