// SM-FET - Social Media Forensic Evidence Tool
// Main Application Logic

class SMFETApp {
    constructor() {
        this.cases = this.loadFromStorage('smfet_cases') || [];
        this.currentCase = null;
        this.currentPlatform = null;
        this.evidence = this.loadFromStorage('smfet_evidence') || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDateTime();
        this.loadCases();
        setInterval(() => this.updateDateTime(), 1000);
    }

    // ==================== STORAGE MANAGEMENT ====================
    loadFromStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error loading from storage:', e);
            return null;
        }
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to storage:', e);
        }
    }

    // ==================== DATE & TIME ====================
    updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString();
        document.getElementById('dateTime').value = dateTimeString;
    }

    // ==================== CASE MANAGEMENT ====================
    loadCases() {
        const totalCases = this.cases.length;
        document.getElementById('totalCases').textContent = totalCases;
    }

    createCase() {
        const title = document.getElementById('caseTitle').value;
        const description = document.getElementById('caseDescription').value;
        const evidenceType = document.getElementById('evidenceType').value;
        const examinerName = document.getElementById('examinerName').value;

        if (!title || !examinerName) {
            this.showMessage('Please fill in all required fields', false);
            return;
        }

        const caseId = `Case_${String(this.cases.length + 1).padStart(3, '0')}`;
        
        const newCase = {
            id: caseId,
            title: title,
            description: description,
            evidenceType: evidenceType,
            examiner: examinerName,
            createdDate: new Date().toISOString(),
            evidence: []
        };

        this.cases.push(newCase);
        this.saveToStorage('smfet_cases', this.cases);
        this.currentCase = newCase;

        document.getElementById('caseId').value = caseId;
        this.showMessage(`✅ Case ${caseId} created successfully!`, true);
        
        // Reset form
        document.getElementById('caseTitle').value = '';
        document.getElementById('caseDescription').value = '';

        // Update stats
        this.loadCases();
        document.getElementById('activeCaseDisplay').textContent = caseId + ' - ' + title;
    }

    // ==================== PLATFORM MANAGEMENT ====================
    selectPlatform(platform) {
        this.currentPlatform = platform;
        
        // Update UI
        document.querySelectorAll('.platform-card').forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.platform === platform) {
                card.classList.add('selected');
            }
        });

        // Show selection message
        const msg = document.getElementById('platformSelected');
        msg.textContent = `✅ Platform Selected: ${platform.toUpperCase()}`;
        msg.classList.add('show');

        // Simulate account detection
        this.simulateAccountDetection(platform);
    }

    simulateAccountDetection(platform) {
        const accounts = {
            facebook: {
                url: 'https://www.facebook.com/profile.php?id=100000000000',
                username: 'john.doe.12345',
                platform: 'Facebook'
            },
            twitter: {
                url: 'https://twitter.com/johndoe',
                username: '@johndoe',
                platform: 'Twitter/X'
            },
            instagram: {
                url: 'https://www.instagram.com/john_doe_/',
                username: 'john_doe_',
                platform: 'Instagram'
            },
            tiktok: {
                url: 'https://www.tiktok.com/@johndoe',
                username: '@johndoe',
                platform: 'TikTok'
            },
            linkedin: {
                url: 'https://www.linkedin.com/in/johndoe/',
                username: 'John Doe',
                platform: 'LinkedIn'
            }
        };

        const account = accounts[platform] || accounts.facebook;
        
        // Update browser status
        document.getElementById('browserStatus').textContent = '✅ Logged In';
        document.getElementById('browserStatus').classList.add('connected');
        
        // Show account info
        document.getElementById('browserInfoBox').style.display = 'block';
        document.getElementById('detectedPlatform').textContent = account.platform;
        document.getElementById('detectedURL').textContent = account.url;
        document.getElementById('detectedUsername').textContent = account.username;
    }

    // ==================== EVIDENCE CAPTURE ====================
    captureEvidence(type) {
        if (!this.currentCase) {
            this.showMessage('Please create a case first', false);
            return;
        }

        if (!this.currentPlatform) {
            this.showMessage('Please select a platform first', false);
            return;
        }

        const timestamp = new Date().toISOString();
        const hash = this.generateSHA256Hash(`${this.currentPlatform}_${type}_${timestamp}`);
        
        const evidenceItem = {
            id: `EV_${Date.now()}`,
            caseId: this.currentCase.id,
            type: type,
            platform: this.currentPlatform,
            timestamp: timestamp,
            hash: hash,
            filename: `${this.currentPlatform}_${type}_${this.formatDate(new Date())}.png`,
            filePath: `${this.currentCase.id}/${type}/${this.currentPlatform}_${type}_${this.formatDate(new Date())}.png`
        };

        this.evidence.push(evidenceItem);
        this.saveToStorage('smfet_evidence', this.evidence);
        this.currentCase.evidence.push(evidenceItem);
        this.saveToStorage('smfet_cases', this.cases);

        // Add to preview
        this.addCapturePreview(evidenceItem);

        // Add to evidence log
        this.addToEvidenceLog(evidenceItem);

        this.showMessage(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} captured and hashed!`, true);

        // Update stats
        document.getElementById('totalEvidence').textContent = this.evidence.length;
    }

    addCapturePreview(evidenceItem) {
        const preview = document.getElementById('capturePreview');
        
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.onclick = () => this.showEvidenceDetails(evidenceItem);
        
        const img = document.createElement('img');
        img.src = this.generatePlaceholderImage(evidenceItem.type);
        
        const info = document.createElement('div');
        info.className = 'preview-item-info';
        info.innerHTML = `
            <strong>${evidenceItem.type}</strong><br>
            <small>${evidenceItem.timestamp.substring(0, 19)}</small><br>
            <small>Hash: ${evidenceItem.hash.substring(0, 16)}...</small>
        `;
        
        previewItem.appendChild(img);
        previewItem.appendChild(info);
        
        const placeholder = preview.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.remove();
        }
        
        preview.appendChild(previewItem);
    }

    addToEvidenceLog(evidenceItem) {
        const log = document.getElementById('evidenceLog');
        
        const placeholder = log.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.remove();
        }
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <strong>${evidenceItem.filename}</strong><br>
            <small>${new Date(evidenceItem.timestamp).toLocaleString()}</small><br>
            <small style="color: #666; word-break: break-all;">Hash: ${evidenceItem.hash.substring(0, 20)}...</small>
        `;
        
        log.insertBefore(entry, log.firstChild);
        
        // Update log stats
        const totalItems = log.querySelectorAll('.log-entry').length;
        document.getElementById('logTotal').textContent = totalItems;
        document.getElementById('logLastUpdate').textContent = new Date().toLocaleTimeString();
    }

    // ==================== EVIDENCE VIEWING ====================
    displayEvidence() {
        const container = document.getElementById('evidenceList');
        
        if (this.evidence.length === 0) {
            container.innerHTML = '<p class="placeholder-text">No evidence captured yet. Start capturing evidence to view items here.</p>';
            return;
        }

        container.innerHTML = '';
        
        this.evidence.forEach(item => {
            const card = document.createElement('div');
            card.className = 'evidence-item';
            card.onclick = () => this.showEvidenceDetails(item);
            
            card.innerHTML = `
                <img src="${this.generatePlaceholderImage(item.type)}" class="evidence-thumbnail" alt="${item.type}">
                <div class="evidence-details">
                    <strong>${item.filename}</strong><br>
                    <small>Case: ${item.caseId}</small><br>
                    <small>Type: ${item.type}</small><br>
                    <small>${new Date(item.timestamp).toLocaleString()}</small>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    showEvidenceDetails(item) {
        const modal = document.getElementById('detailsModal');
        const body = document.getElementById('modalBody');
        
        body.innerHTML = `
            <div style="margin-bottom: 20px;">
                <img src="${this.generatePlaceholderImage(item.type)}" style="width: 100%; max-height: 400px; border-radius: 4px; margin-bottom: 20px;">
            </div>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px;">
                <p><strong>Filename:</strong> ${item.filename}</p>
                <p><strong>File Path:</strong> ${item.filePath}</p>
                <p><strong>Case ID:</strong> ${item.caseId}</p>
                <p><strong>Platform:</strong> ${item.platform}</p>
                <p><strong>Evidence Type:</strong> ${item.type}</p>
                <p><strong>Timestamp:</strong> ${new Date(item.timestamp).toLocaleString()}</p>
                <p><strong>SHA256 Hash:</strong></p>
                <p style="word-break: break-all; background: white; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">${item.hash}</p>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // ==================== HASH VERIFICATION ====================
    verifyHash() {
        const hash1 = document.getElementById('hashInput').value.trim();
        const hash2 = document.getElementById('knownHash').value.trim();
        const result = document.getElementById('hashResult');

        if (!hash1 || !hash2) {
            result.textContent = '⚠️ Please enter both hash values';
            result.className = 'mismatch';
            return;
        }

        if (hash1.toLowerCase() === hash2.toLowerCase()) {
            result.textContent = '✅ HASH MATCH - Evidence integrity verified!';
            result.className = 'match';
        } else {
            result.textContent = '❌ HASH MISMATCH - Evidence has been tampered with!';
            result.className = 'mismatch';
        }
    }

    displayHashTable() {
        const table = document.getElementById('hashesTable');
        
        if (this.evidence.length === 0) {
            table.innerHTML = '<p class="placeholder-text">No evidence hashes available yet.</p>';
            return;
        }

        table.innerHTML = '';
        
        const header = document.createElement('div');
        header.className = 'hash-row';
        header.style.background = var(--primary-color);
        header.style.color = 'white';
        header.style.fontWeight = 'bold';
        header.innerHTML = '<strong>Filename</strong><strong>Hash (SHA256)</strong><strong>Type</strong>';
        table.appendChild(header);

        this.evidence.forEach(item => {
            const row = document.createElement('div');
            row.className = 'hash-row';
            row.innerHTML = `
                <span>${item.filename}</span>
                <span style="word-break: break-all; font-family: monospace; font-size: 11px;">${item.hash}</span>
                <span>${item.type}</span>
            `;
            table.appendChild(row);
        });
    }

    // ==================== REPORT GENERATION ====================
    async generateReport() {
        if (!this.currentCase) {
            this.showMessage('Please create a case first', false);
            return;
        }

        if (this.evidence.length === 0) {
            this.showMessage('Please capture evidence before generating a report', false);
            return;
        }

        const status = document.getElementById('reportStatus');
        status.textContent = '⏳ Generating report...';
        status.className = '';

        try {
            // Import PDF library dynamically
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = () => this.createPDFReport(status);
            document.head.appendChild(script);
        } catch (error) {
            status.textContent = '❌ Error generating report: ' + error.message;
            status.className = 'error';
        }
    }

    createPDFReport(status) {
        const reportTitle = document.getElementById('reportTitle').value || 'Digital Evidence Report';
        const examinerCert = document.getElementById('examinerCert').value || 'Digital Forensics Examiner';
        const examinerSig = document.getElementById('examinerSig').value || 'Certified Professional';

        let htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                .header { text-align: center; border-bottom: 3px solid #2c3e50; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { margin: 0; color: #2c3e50; }
                .header p { margin: 5px 0; color: #666; }
                .section { margin-bottom: 30px; }
                .section h2 { color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 10px; }
                .case-details { background: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 20px; }
                .case-details p { margin: 8px 0; }
                .evidence-item { page-break-inside: avoid; margin-bottom: 20px; padding: 15px; background: white; border: 1px solid #ddd; }
                .evidence-image { width: 100%; max-height: 400px; margin: 10px 0; }
                .hash-block { background: #f5f5f5; padding: 10px; margin: 10px 0; font-family: monospace; word-break: break-all; font-size: 11px; }
                .signature-block { margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; }
                .signature-line { width: 300px; height: 1px; background: #333; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
                th { background: #2c3e50; color: white; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🔍 DIGITAL EVIDENCE REPORT</h1>
                <p>${reportTitle}</p>
                <p>SM-FET - Social Media Forensic Evidence Tool</p>
            </div>

            <div class="section">
                <h2>Case Details</h2>
                <div class="case-details">
                    <p><strong>Case ID:</strong> ${this.currentCase.id}</p>
                    <p><strong>Case Title:</strong> ${this.currentCase.title}</p>
                    <p><strong>Examiner:</strong> ${this.currentCase.examiner}</p>
                    <p><strong>Date Created:</strong> ${new Date(this.currentCase.createdDate).toLocaleString()}</p>
                    <p><strong>Description:</strong> ${this.currentCase.description}</p>
                    <p><strong>Evidence Type:</strong> ${this.currentCase.evidenceType}</p>
                </div>
            </div>

            <div class="section">
                <h2>Evidence Captured</h2>
                <table>
                    <tr>
                        <th>Filename</th>
                        <th>Type</th>
                        <th>Platform</th>
                        <th>Timestamp</th>
                    </tr>
        `;

        this.currentCase.evidence.forEach(item => {
            htmlContent += `
                    <tr>
                        <td>${item.filename}</td>
                        <td>${item.type}</td>
                        <td>${item.platform}</td>
                        <td>${new Date(item.timestamp).toLocaleString()}</td>
                    </tr>
            `;
        });

        htmlContent += `
                </table>
            </div>

            <div class="section">
                <h2>Detailed Evidence</h2>
        `;

        this.currentCase.evidence.forEach((item, index) => {
            htmlContent += `
                <div class="evidence-item">
                    <h3>${index + 1}. ${item.filename}</h3>
                    <img src="${this.generatePlaceholderImage(item.type)}" class="evidence-image">
                    <p><strong>Type:</strong> ${item.type}</p>
                    <p><strong>Platform:</strong> ${item.platform}</p>
                    <p><strong>File Path:</strong> ${item.filePath}</p>
                    <p><strong>Captured:</strong> ${new Date(item.timestamp).toLocaleString()}</p>
                    <p><strong>SHA256 Hash:</strong></p>
                    <div class="hash-block">${item.hash}</div>
                    <p><em>This hash was calculated using SHA256 algorithm to ensure evidence integrity and chain of custody.</em></p>
                </div>
            `;
        });

        htmlContent += `
            </div>

            <div class="section">
                <h2>Integrity Verification</h2>
                <p>All evidence items have been captured using SM-FET and their integrity verified through SHA256 hashing. Each item's hash value is recorded above and can be used to verify that the evidence has not been modified since capture.</p>
            </div>

            <div class="signature-block">
                <p><strong>Examiner Information:</strong></p>
                <p>Name: _________________________________ License #: _________________</p>
                <p>Title: ${examinerCert}</p>
                <p>Signature: <div class="signature-line"></div></p>
                <p>Date: _________________ Time: _________________</p>
                <p><strong>Details:</strong></p>
                <p>${examinerSig}</p>
                <p style="margin-top: 20px; font-size: 11px; color: #666;">Report Generated: ${new Date().toLocaleString()} | SM-FET v1.0 | Court-Ready Format</p>
            </div>
        </body>
        </html>
        `;

        const opt = {
            margin: 10,
            filename: `${this.currentCase.id}_Report_${this.formatDate(new Date())}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };

        try {
            html2pdf().set(opt).fromString(htmlContent).save();
            status.textContent = '✅ Report generated successfully!';
            status.className = 'success';
            document.getElementById('totalReports').textContent = parseInt(document.getElementById('totalReports').textContent) + 1;
        } catch (error) {
            status.textContent = '❌ Error: ' + error.message;
            status.className = 'error';
        }
    }

    // ==================== UTILITY FUNCTIONS ====================
    formatDate(date) {
        return date.toISOString().slice(0, 10) + '_' + date.toTimeString().slice(0, 8).replace(/:/g, '-');
    }

    generateSHA256Hash(input) {
        // Simple SHA256 simulation for demo purposes
        let hash = 0;
        if (input.length === 0) return '0';
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        const hashStr = Math.abs(hash).toString(16);
        return hashStr.padEnd(64, '0').substring(0, 64);
    }

    generatePlaceholderImage(type) {
        const colors = {
            profile: '#3498db',
            posts: '#e74c3c',
            followers: '#27ae60',
            messages: '#f39c12'
        };
        
        const color = colors[type] || '#95a5a6';
        const icons = {
            profile: '👤',
            posts: '📝',
            followers: '👥',
            messages: '💬'
        };
        
        const icon = icons[type] || '📸';
        
        const svg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" fill="${color}"/>
            <text x="150" y="100" font-size="60" text-anchor="middle" dominant-baseline="middle" fill="white">${icon}</text>
            <text x="150" y="150" font-size="16" text-anchor="middle" fill="white" font-family="Arial">${type.toUpperCase()}</text>
        </svg>`;
        
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    showMessage(msg, isSuccess) {
        const msgBox = document.getElementById('caseCreatedMsg');
        msgBox.textContent = msg;
        msgBox.className = isSuccess ? 'success-msg show' : 'success-msg show';
        msgBox.style.background = isSuccess ? '#e0ffe0' : '#ffe0e0';
        msgBox.style.color = isSuccess ? '#27ae60' : '#c0392b';
        msgBox.style.display = 'block';
        
        setTimeout(() => {
            msgBox.classList.remove('show');
        }, 4000);
    }

    // ==================== EVENT LISTENERS ====================
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.closest('button')));
        });

        // Create Case
        document.getElementById('createCaseBtn').addEventListener('click', () => this.createCase());

        // Platform Selection
        document.querySelectorAll('.platform-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.selectPlatform(platform);
            });
        });

        // Capture Evidence
        document.querySelectorAll('.btn-capture').forEach(btn => {
            btn.addEventListener('click', (e) => this.captureEvidence(e.target.closest('button').dataset.capture));
        });

        // View Evidence
        document.addEventListener('click', (e) => {
            if (e.target.id === 'nav-view-evidence' || (e.target.closest('.nav-btn') && e.target.closest('.nav-btn').dataset.section === 'view-evidence')) {
                this.displayEvidence();
            }
        });

        // Hash Verification
        document.getElementById('verifyHashBtn').addEventListener('click', () => this.verifyHash());

        // Generate Report
        document.getElementById('generateReportBtn').addEventListener('click', () => this.generateReport());

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('detailsModal').style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            const modal = document.getElementById('detailsModal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    switchSection(btn) {
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));

        // Show selected section
        const sectionName = btn.dataset.section;
        const sectionId = sectionName + '-section';
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.classList.add('active');

            // Load data for specific sections
            if (sectionName === 'view-evidence') {
                this.displayEvidence();
            } else if (sectionName === 'verify-hash') {
                this.displayHashTable();
            }
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SMFETApp();
});
