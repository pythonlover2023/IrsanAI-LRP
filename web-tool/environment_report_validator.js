/**
 * LRP v1.2 Compliance Validator (MVP-Version)
 * Überprüft die Konformität von LRP-Dokumenten mit der Core-Spezifikation
 */

function validateLRP(lrpText) {
    const errors = [];
    let complianceScore = 100;

    // 1. Prüfe Metadaten-Struktur
    if (!lrpText.includes('## METADATEN (MASCHINENLESBAR)')) {
        errors.push("Metadaten-Block fehlt");
        complianceScore -= 30;
    }

    // 2. Prüfe YAML-Struktur
    const yamlMatch = lrpText.match(/```yaml\n([\s\S]*?)\n```/);
    if (!yamlMatch) {
        errors.push("Ungültiges YAML-Format");
        complianceScore -= 25;
    } else {
        const yamlContent = yamlMatch[1];
        if (!yamlContent.includes('protocol_version: "1.2"')) {
            errors.push("Falsche Protokollversion");
            complianceScore -= 15;
        }
        if (!yamlContent.includes('task_id:')) {
            errors.push("task_id fehlt");
            complianceScore -= 10;
        }
    }

    // 3. Prüfe User-Request
    if (!lrpText.includes('## USER-REQUEST (KLASSISCHER PROMPT)')) {
        errors.push("User-Request-Block fehlt");
        complianceScore -= 20;
    }

    // 4. Prüfe LLM-Anweisungen
    if (!lrpText.includes('ANTWORTE AUF DEUTSCH')) {
        errors.push("Fehlende Sprachvorgabe");
        complianceScore -= 10;
    }

    return {
        isCompliant: complianceScore >= 80,
        complianceScore: Math.max(0, complianceScore),
        errors: errors
    };
}

/**
 * Validiert das aktuelle Dokument in der Web-UI
 */
function validateCurrentDocument() {
    const lrpText = document.getElementById('lrp-output').value;
    const result = validateLRP(lrpText);

    const statusElement = document.createElement('div');
    statusElement.style.marginTop = '10px';

    if (result.isCompliant) {
        statusElement.innerHTML = `<div class="validation-status" style="background: #d5f4e6; color: #27ae60;">
            ✅ VALIDIERUNG ERFOLGREICH: Compliance-Score ${result.complianceScore}%</div>`;
    } else {
        const errorList = result.errors.map(err => `<li>${err}</li>`).join('');
        statusElement.innerHTML = `<div class="validation-status" style="background: #f8e7e9; color: #e74c3c;">
            ❌ VALIDIERUNG FEHLGESCHLAGEN: Compliance-Score ${result.complianceScore}%<br>
            <ul style="margin: 5px 0;">${errorList}</ul></div>`;
    }

    const outputDiv = document.getElementById('output');
    const existingStatus = outputDiv.querySelector('.validation-status');
    if (existingStatus) existingStatus.remove();

    outputDiv.appendChild(statusElement);
}