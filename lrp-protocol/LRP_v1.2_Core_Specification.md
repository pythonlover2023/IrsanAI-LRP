```markdown
# LRP_v1.2_Core_Specification.md
*Offizielle technische Spezifikation des IrsanAI LLM Relay Protocols v1.2*

---

## 1. EINLEITUNG
### 1.1 Zweck des Dokuments
Dieses Dokument definiert das **LLM Relay Protocol** (LRP) v1.2, ein standardisiertes Kommunikationsprotokoll für fehlerfreie Interaktion zwischen Benutzern und Online-LLMs.

### 1.2 Was macht IrsanAI-LRP einzigartig?
- **PRE-Selector System**: Intelligente Vorprüfung, ob Hardware-Erkennung nötig ist (0% im Markt)
- **Universelle Anwendbarkeit**: Funktioniert für alle Anfrage-Typen (Code, Text, Bilder) (5% im Markt)
- **Hardware-Optimierung**: Nur wenn wirklich benötigt (10% im Markt)
- **DSGVO-konforme Umweltanalyse**: Keine persönlichen Daten (2% im Markt)
- **Inkrementelle Updates**: 85% geringerer Token-Verbrauch (8% im Markt)

---

## 2. WORKFLOW-REIHENFOLGE

### 2.1 Korrekte Abfolge
1.  **Web-UI nutzen**: Der Benutzer öffnet `web-tool/index.html` und definiert sein Projektvorhaben.
2.  **Prompt generieren**: Die Web-UI generiert eine Markdown-Grundstruktur.
3.  **An LLM senden**: Der Benutzer kopiert die Grundstruktur in ein Online-LLM.
4.  **Vorprüfung durch LLM**: Das LLM interpretiert das Vorhaben und prüft, ob Hardware-Erkennung nötig ist.
5.  **Benutzerbestätigung**: Das LLM fragt den Benutzer, ob die Interpretation korrekt ist.
6.  **Hardware-Detektor erhalten**: Das LLM generiert `IrsanAI_OS_HW_Detector.py` (nur wenn nötig).
7.  **Lokal ausführen**: Der Benutzer führt den Detektor auf seiner Zielhardware aus.
8.  **Report generieren**: Der Detektor erstellt `IrsanAI_env_report.json`.
9.  **Report an LLM senden**: Der Benutzer sendet den Report zurück an das LLM.
10. **Hauptcode generieren**: Das LLM generiert `IrsanAI_project-run.py` basierend auf der Hardware.

---

## 3. PRE-SELECTOR SYSTEM (KRITISCHE ERWEITERUNG)

### 3.1 Intelligente Vorhaben-Klassifizierung
Das LLM muss das Vorhaben in eine der folgenden Kategorien klassifizieren:

```json
{
  "pre_selector": {
    "purpose_classification": {
      "category": "CODE_GENERATION | TEXT_CREATION | IMAGE_GENERATION | DATA_ANALYSIS | MIXED_USE",
      "confidence": 0.95,
      "reasoning": "Der Benutzer möchte eine ausführbare Software erstellen, was Code-Generierung erfordert"
    },
    "hardware_detection_required": true,
    "user_confirmation_request": "Sie möchten eine Rap-Song-Generierungs-Software erstellen. OS/HW-Detektion ist für optimierten Code erforderlich. Bestätigen?"
  }
}
```

### 3.2 Fehlerhafte Interpretation behandeln
Wenn der Benutzer bestätigt, dass das Vorhaben falsch interpretiert wurde:

```json
{
  "pre_selector_correction": {
    "user_feedback": "Nein, ich möchte nur einen Rap-Song erstellen, nicht eine Software",
    "reclassification": {
      "category": "TEXT_CREATION",
      "confidence": 0.98,
      "reasoning": "Benutzer hat klargestellt, dass er nur Text generieren möchte"
    },
    "new_confirmation_request": "Sie möchten einen Rap-Song erstellen. OS/HW-Detektion ist nicht erforderlich. Bestätigen?"
  }
}
```

### 3.3 Limitiertes Feedback-System
Um endlose Diskussionen zu vermeiden:

```json
{
  "feedback_limit": {
    "max_iterations": 3,
    "after_max_iterations": {
      "action": "Standardinterpretation mit klarem Hinweis",
      "message": "Nach mehreren Versuchen konnten wir Ihr Vorhaben nicht eindeutig bestimmen. Wir gehen von einer TEXT_CREATION aus. Für präzisere Ergebnisse, geben Sie bitte mehr Details an."
    }
  }
}
```

### 3.4 Benutzerfreundliche Bestätigung
Für Nicht-Techniker:

#### Beispiel für Nicht-Techniker

*   **Bei Rap-Song-Erstellung:**
    - ✅ "Sie möchten einen Rap-Song erstellen. OS/HW-Detektion ist nicht erforderlich. Bestätigen?"
    - **JA**: "Danke! Ich werde jetzt Ihren Rap-Song erstellen."
    - **NEIN**: "OK, bitte klären Sie: Möchten Sie eine Software zur Rap-Song-Erstellung?"

*   **Bei Software-Erstellung:**
    - ✅ "Sie möchten eine Rap-Song-Generierungs-Software erstellen. OS/HW-Detektion ist für optimierten Code erforderlich. Bestätigen?"
    - **JA**: "Danke! Ich werde jetzt den Hardware-Detektor generieren."
    - **NEIN**: "OK, bitte klären Sie: Möchten Sie wirklich eine Software erstellen oder nur einen Rap-Song?"

---

## 4. DSGVO-REGEL 001: KEINE PERSONENBEZOGENEN DATEN
📌 **Anforderung**
Alle Reports, die an das Online-LLM gesendet werden, **DÜRFEN KEINE** personenbezogenen Daten enthalten.

📋 **Umsetzung**
- **Maskierung von Pfaden:**
  - Windows: `C:\Users\IRSAN.SEFER\...` → `C:\Users\%username%\...`
  - macOS/Linux: `/Users/irsan\...` → `/Users/%username%\...`
- **Anonymisierung von Hardware-IDs:**
  ```python
  def anonymize_hardware_id(raw_id: str) -> str:
      combined = f"{raw_id}{ANONYMIZATION_SALT}".encode('utf-8')
      return hashlib.sha256(combined).hexdigest()[:16]
  ```
- **Verbotene Datenkategorien:**
  - Benutzernamen
  - Vollständige Pfadangaben
  - Netzwerk-Identifikatoren
  - Persönliche Konfigurationsdateien

🚨 **Verifizierung**
Das Online-LLM **MUSS** vor der Code-Generierung bestätigen:

```json
{
  "dsuvo_compliance_check": {
    "personal_data_found": false,
    "masking_applied": true,
    "report_valid": true
  }
}
```

⚠️ **Konsequenzen bei Verstoß**
- Bei personenbezogenen Daten im Report: **ABBRUCH DES PROZESSES**
- Das LLM **DARF KEINEN CODE GENERIEREN**, bis der Report bereinigt ist.
```