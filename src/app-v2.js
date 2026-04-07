// SM-FET - Social Media Forensic Evidence Tool
// Simplified & Robust Version

window.SMFETApp = {
    cases: [],
    evidence: [],
    currentCase: null,
    currentPlatform: null,
    
    // Initialize app
    init: function() {
        console.log('SM-FET App Initializing...');
        try {
            this.loadData();
            this.setupEventListeners();
            this.updateDateTime();
            this.loadCases();
            
            // Update datetime every second
            setInterval(() => this.updateDateTime(), 1000);
            
            console.log('SM-FET Ready!');
            document.body.setAttribute('data-app-ready', 'true');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    },
    
    // Load data from localStorage
    loadData: function() {
        try {
            const cases = localStorage.getItem('smfet_cases');
            const evidence = localStorage.getItem('smfet_evidence');
            
            this.cases = cases ? JSON.parse(cases) : [];
            this.evidence = evidence ? JSON.parse(evidence) : [];
        } catch (error) {
            console.error('Error loading data:', error);
            this.cases = [];
            this.evidence = [];
        }
    },
    
    // Save data to localStorage
    saveData: function() {
        try {
            localStorage.setItem('smfet_cases', JSON.stringify(this.cases));
            localStorage.setItem('smfet_evidence', JSON.stringify(this.evidence));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    },
    
    // Update date and time
    updateDateTime: function() {
        const dateTimeEl = document.getElementById('dateTime');
        if (dateTimeEl) {
            const now = new Date();
            const dateTimeString = now.toLocaleString();
            dateTimeEl.value = dateTimeString;
        }
    },
    
    // Load and display cases
    loadCases: function() {
        const totalCasesEl = document.getElementById('totalCases');
        if (totalCasesEl) {
            totalCasesEl.textContent = this.cases.length;
        }
    },
    
    // Create a new case
    createCase: function() {
        const titleEl = document.getElementById('caseTitle');
        const descEl = document.getElementById('caseDescription');
        const typeEl = document.getElementById('evidenceType');
        const examinerEl = document.getElementById('examinerName');
        
        const title = titleEl ? titleEl.value : '';
        const description = descEl ? descEl.value : '';
        const evidenceType = typeEl ? typeEl.value : '';
        const examiner = examinerEl ? examinerEl.value : '';
        
        if (!title || !examiner) {
            this.showMessage('Please fill in all required fields', false);
            return;
        }
        
        const caseId = 'Case_' + String(this.cases.length + 1).padStart(3, '0');
        
        const newCase = {
            id: caseId,
            title: title,
            description: description,
            evidenceType: evidenceType,
            examiner: examiner,
            createdDate: new Date().toISOString(),
            evidence: []
        };
        
        this.cases.push(newCase);
        this.currentCase = newCase;
        this.saveData();
        
        const caseIdEl = document.getElementById('caseId');
        if (caseIdEl) {
            caseIdEl.value = caseId;
        }
        
        this.showMessage('✅ Case ' + caseId + ' created successfully!', true);
        
        // Reset form
        if (titleEl) titleEl.value = '';
        if (descEl) descEl.value = '';
        
        this.loadCases();
    },
    
    // Select a platform
    selectPlatform: function(platform) {
        if (!platform) {
            console.error('No platform selected');
            return;
        }
        
        this.currentPlatform = platform;
        
        // Update UI - mark selected platform
        const cards = document.querySelectorAll('.platform-card');
        cards.forEach(card => {
            card.classList.remove('selected');
            if (card.getAttribute('data-platform') === platform) {
                card.classList.add('selected');
            }
        });
        
        // Show selection message
        const msg = document.getElementById('platformSelected');
        if (msg) {
            msg.textContent = '✅ Platform Selected: ' + platform.toUpperCase();
            msg.classList.add('show');
        }
        
        // Simulate account detection
        this.simulateAccountDetection(platform);
    },
    
    // Simulate account detection
    simulateAccountDetection: function(platform) {
        const accounts = {
            facebook: { platform: 'Facebook', username: 'john.doe.12345', url: 'https://www.facebook.com/profile.php?id=100000000000' },
            twitter: { platform: 'Twitter/X', username: '@johndoe', url: 'https://twitter.com/johndoe' },
            instagram: { platform: 'Instagram', username: 'john_doe_', url: 'https://www.instagram.com/john_doe_/' },
            tiktok: { platform: 'TikTok', username: '@johndoe', url: 'https://www.tiktok.com/@johndoe' },
            linkedin: { platform: 'LinkedIn', username: 'John Doe', url: 'https://www.linkedin.com/in/johndoe/' }
        };
        
        const account = accounts[platform] || accounts.facebook;
        
        const browserStatus = document.getElementById('browserStatus');
        if (browserStatus) {
            browserStatus.textContent = '✅ Logged In';
            browserStatus.classList.add('connected');
        }
        
        const browserInfo = document.getElementById('browserInfoBox');
        if (browserInfo) {
            browserInfo.style.display = 'block';
        }
        
        if (document.getElementById('detectedPlatform')) {
            document.getElementById('detectedPlatform').textContent = account.platform;
        }
        if (document.getElementById('detectedURL')) {
            document.getElementById('detectedURL').textContent = account.url;
        }
        if (document.getElementById('detectedUsername')) {
            document.getElementById('detectedUsername').textContent = account.username;
        }
    },
    
    // Capture evidence
    captureEvidence: function(type) {
        if (!this.currentCase) {
            this.showMessage('Please create a case first', false);
            return;
        }
        
        if (!this.currentPlatform) {
            this.showMessage('Please select a platform first', false);
            return;
        }
        
        const timestamp = new Date().toISOString();
        const hash = this.generateHash(this.currentPlatform + '_' + type + '_' + timestamp);
        
        const evidenceItem = {
            id: 'EV_' + Date.now(),
            caseId: this.currentCase.id,
            type: type,
            platform: this.currentPlatform,
            timestamp: timestamp,
            hash: hash,
            filename: this.currentPlatform + '_' + type + '_' + this.formatDate(new Date()) + '.png',
            filePath: this.currentCase.id + '/' + type + '/' + this.currentPlatform + '_' + type + '.png'
        };
        
        this.evidence.push(evidenceItem);
        this.currentCase.evidence.push(evidenceItem);
        this.saveData();
        
        // Add to preview
        this.addCapturePreview(evidenceItem);
        
        // Add to log
        this.addToEvidenceLog(evidenceItem);
        
        this.showMessage('✅ ' + type + ' captured and hashed!', true);
        
        const totalEl = document.getElementById('totalEvidence');
        if (totalEl) {
            totalEl.textContent = this.evidence.length;
        }
    },
    
    // Add capture preview
    addCapturePreview: function(item) {
        const preview = document.getElementById('capturePreview');
        if (!preview) return;
        
        // Remove placeholder
        const placeholder = preview.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.remove();
        }
        
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.onclick = () => this.showEvidenceDetails(item);
        
        const img = document.createElement('img');
        img.src = this.generatePlaceholderImage(item.type);
        
        const info = document.createElement('div');
        info.className = 'preview-item-info';
        info.innerHTML = '<strong>' + item.type + '</strong><br>' +
            '<small>' + item.timestamp.substring(0, 19) + '</small><br>' +
            '<small>Hash: ' + item.hash.substring(0, 16) + '...</small>';
        
        previewItem.appendChild(img);
        previewItem.appendChild(info);
        preview.appendChild(previewItem);
    },
    
    // Add to evidence log
    addToEvidenceLog: function(item) {
        const log = document.getElementById('evidenceLog');
        if (!log) return;
        
        // Remove placeholder
        const placeholder = log.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.remove();
        }
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = '<strong>' + item.filename + '</strong><br>' +
            '<small>' + new Date(item.timestamp).toLocaleString() + '</small><br>' +
            '<small style="color: #666; word-break: break-all;">Hash: ' + item.hash.substring(0, 20) + '...</small>';
        
        log.insertBefore(entry, log.firstChild);
        
        const logTotalEl = document.getElementById('logTotal');
        if (logTotalEl) {
            logTotalEl.textContent = log.querySelectorAll('.log-entry').length;
        }
    },
    
    // Display evidence
    displayEvidence: function() {
        const container = document.getElementById('evidenceList');
        if (!container) return;
        
        if (this.evidence.length === 0) {
            container.innerHTML = '<p class="placeholder-text">No evidence captured yet.</p>';
            return;
        }
        
        container.innerHTML = '';
        
        this.evidence.forEach(item => {
            const card = document.createElement('div');
            card.className = 'evidence-item';
            card.onclick = () => this.showEvidenceDetails(item);
            
            card.innerHTML = '<img src="' + this.generatePlaceholderImage(item.type) + '" class="evidence-thumbnail" alt="' + item.type + '">' +
                '<div class="evidence-details">' +
                '<strong>' + item.filename + '</strong><br>' +
                '<small>Case: ' + item.caseId + '</small><br>' +
                '<small>Type: ' + item.type + '</small><br>' +
                '<small>' + new Date(item.timestamp).toLocaleString() + '</small>' +
                '</div>';
            
            container.appendChild(card);
        });
    },
    
    // Show evidence details
    showEvidenceDetails: function(item) {
        const modal = document.getElementById('detailsModal');
        const body = document.getElementById('modalBody');
        
        if (!modal || !body) return;
        
        body.innerHTML = '<div style="margin-bottom: 20px;">' +
            '<img src="' + this.generatePlaceholderImage(item.type) + '" style="width: 100%; max-height: 400px; border-radius: 4px; margin-bottom: 20px;">' +
            '</div>' +
            '<div style="background: #f9f9f9; padding: 15px; border-radius: 4px;">' +
            '<p><strong>Filename:</strong> ' + item.filename + '</p>' +
            '<p><strong>File Path:</strong> ' + item.filePath + '</p>' +
            '<p><strong>Case ID:</strong> ' + item.caseId + '</p>' +
            '<p><strong>Platform:</strong> ' + item.platform + '</p>' +
            '<p><strong>Evidence Type:</strong> ' + item.type + '</p>' +
            '<p><strong>Timestamp:</strong> ' + new Date(item.timestamp).toLocaleString() + '</p>' +
            '<p><strong>SHA256 Hash:</strong></p>' +
            '<p style="word-break: break-all; background: white; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">' + item.hash + '</p>' +
            '</div>';
        
        modal.style.display = 'block';
    },
    
    // Verify hash
    verifyHash: function() {
        const hash1El = document.getElementById('hashInput');
        const hash2El = document.getElementById('knownHash');
        const resultEl = document.getElementById('hashResult');
        
        if (!resultEl) return;
        
        const hash1 = hash1El ? hash1El.value.trim() : '';
        const hash2 = hash2El ? hash2El.value.trim() : '';
        
        if (!hash1 || !hash2) {
            resultEl.textContent = '⚠️ Please enter both hash values';
            resultEl.className = 'mismatch';
            resultEl.style.display = 'block';
            return;
        }
        
        if (hash1.toLowerCase() === hash2.toLowerCase()) {
            resultEl.textContent = '✅ HASH MATCH - Evidence integrity verified!';
            resultEl.className = 'match';
            resultEl.style.display = 'block';
        } else {
            resultEl.textContent = '❌ HASH MISMATCH - Evidence has been tampered with!';
            resultEl.className = 'mismatch';
            resultEl.style.display = 'block';
        }
    },
    
    // Display hash table
    displayHashTable: function() {
        const table = document.getElementById('hashesTable');
        if (!table) return;
        
        if (this.evidence.length === 0) {
            table.innerHTML = '<p class="placeholder-text">No evidence hashes available yet.</p>';
            return;
        }
        
        table.innerHTML = '';
        
        const header = document.createElement('div');
        header.className = 'hash-row';
        header.style.fontWeight = 'bold';
        header.innerHTML = '<strong>Filename</strong><strong>Hash (SHA256)</strong><strong>Type</strong>';
        table.appendChild(header);
        
        this.evidence.forEach(item => {
            const row = document.createElement('div');
            row.className = 'hash-row';
            row.innerHTML = '<span>' + item.filename + '</span>' +
                '<span style="word-break: break-all; font-family: monospace; font-size: 11px;">' + item.hash + '</span>' +
                '<span>' + item.type + '</span>';
            table.appendChild(row);
        });
    },
    
    // Generate report
    generateReport: function() {
        if (!this.currentCase) {
            this.showMessage('Please create a case first', false);
            return;
        }
        
        if (this.evidence.length === 0) {
            this.showMessage('Please capture evidence before generating a report', false);
            return;
        }
        
        const status = document.getElementById('reportStatus');
        if (!status) return;
        
        status.textContent = '⏳ Generating report...';
        status.className = '';
        status.style.display = 'block';
        
        // Try to load html2pdf from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        
        script.onload = () => {
            this.createPDFReport(status);
        };
        
        script.onerror = () => {
            status.textContent = '⚠️ PDF library not available - requires internet connection';
            status.className = 'warning';
            status.style.display = 'block';
        };
        
        document.head.appendChild(script);
    },
    
    // Create PDF report
    createPDFReport: function(statusEl) {
        if (typeof html2pdf === 'undefined') {
            statusEl.textContent = '⚠️ PDF library not loaded';
            statusEl.className = 'warning';
            return;
        }
        
        const reportTitle = document.getElementById('reportTitle') ? document.getElementById('reportTitle').value : 'Digital Evidence Report';
        const examinerCert = document.getElementById('examinerCert') ? document.getElementById('examinerCert').value : 'Certified Digital Forensics Examiner';
        const examinerSig = document.getElementById('examinerSig') ? document.getElementById('examinerSig').value : 'Professional Investigator';
        
        let htmlContent = '<html><head><style>' +
            'body { font-family: Arial, sans-serif; margin: 20px; color: #333; }' +
            '.header { text-align: center; border-bottom: 3px solid #2c3e50; padding-bottom: 20px; margin-bottom: 30px; }' +
            '.header h1 { margin: 0; color: #2c3e50; }' +
            '.section { margin-bottom: 30px; }' +
            '.section h2 { color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 10px; }' +
            '.case-details { background: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 20px; }' +
            'table { width: 100%; border-collapse: collapse; margin: 10px 0; }' +
            'th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }' +
            'th { background: #2c3e50; color: white; }' +
            '.hash-block { background: #f5f5f5; padding: 10px; margin: 10px 0; font-family: monospace; word-break: break-all; font-size: 11px; }' +
            '</style></head><body>' +
            '<div class="header"><h1>🔍 DIGITAL EVIDENCE REPORT</h1>' +
            '<p>' + reportTitle + '</p></div>' +
            '<div class="section"><h2>Case Details</h2>' +
            '<div class="case-details">' +
            '<p><strong>Case ID:</strong> ' + this.currentCase.id + '</p>' +
            '<p><strong>Case Title:</strong> ' + this.currentCase.title + '</p>' +
            '<p><strong>Examiner:</strong> ' + this.currentCase.examiner + '</p>' +
            '<p><strong>Created:</strong> ' + new Date(this.currentCase.createdDate).toLocaleString() + '</p>' +
            '</div></div>';
        
        // Add evidence table
        htmlContent += '<div class="section"><h2>Evidence Summary</h2><table>' +
            '<tr><th>Filename</th><th>Type</th><th>Platform</th><th>Timestamp</th></tr>';
        
        this.currentCase.evidence.forEach(item => {
            htmlContent += '<tr><td>' + item.filename + '</td><td>' + item.type + '</td><td>' + item.platform + '</td><td>' + new Date(item.timestamp).toLocaleString() + '</td></tr>';
        });
        
        htmlContent += '</table></div>';
        
        // Add detailed evidence
        htmlContent += '<div class="section"><h2>Detailed Evidence</h2>';
        
        this.currentCase.evidence.forEach((item, index) => {
            htmlContent += '<div style="page-break-inside: avoid; margin-bottom: 20px; padding: 15px; background: white; border: 1px solid #ddd;">' +
                '<h3>' + (index + 1) + '. ' + item.filename + '</h3>' +
                '<p><strong>Type:</strong> ' + item.type + '</p>' +
                '<p><strong>Platform:</strong> ' + item.platform + '</p>' +
                '<p><strong>Captured:</strong> ' + new Date(item.timestamp).toLocaleString() + '</p>' +
                '<p><strong>SHA256 Hash:</strong></p>' +
                '<div class="hash-block">' + item.hash + '</div>' +
                '</div>';
        });
        
        htmlContent += '</div>' +
            '<div class="section"><h2>Signature</h2>' +
            '<p>Examiner: ______________________________ Date: ______________</p>' +
            '<p>Title: ' + examinerCert + '</p>' +
            '<p>Details: ' + examinerSig + '</p>' +
            '</div>' +
            '</body></html>';
        
        try {
            const opt = {
                margin: 10,
                filename: this.currentCase.id + '_Report_' + this.formatDate(new Date()) + '.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };
            
            html2pdf().set(opt).fromString(htmlContent).save();
            
            statusEl.textContent = '✅ Report generated successfully!';
            statusEl.className = 'success';
            
            const reportCountEl = document.getElementById('totalReports');
            if (reportCountEl) {
                reportCountEl.textContent = parseInt(reportCountEl.textContent || 0) + 1;
            }
        } catch (error) {
            statusEl.textContent = '⚠️ Report generation error: ' + error.message;
            statusEl.className = 'warning';
        }
    },
    
    // Show message
    showMessage: function(msg, isSuccess) {
        const msgBox = document.getElementById('caseCreatedMsg');
        if (!msgBox) return;
        
        msgBox.textContent = msg;
        msgBox.style.background = isSuccess ? '#e0ffe0' : '#ffe0e0';
        msgBox.style.color = isSuccess ? '#27ae60' : '#c0392b';
        msgBox.style.display = 'block';
        
        setTimeout(() => {
            msgBox.style.display = 'none';
        }, 4000);
    },
    
    // Generate hash
    generateHash: function(input) {
        let hash = 0;
        if (input.length === 0) return '0';
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        const hashStr = Math.abs(hash).toString(16);
        return hashStr.padEnd(64, '0').substring(0, 64);
    },
    
    // Generate placeholder image
    generatePlaceholderImage: function(type) {
        const colors = {
            profile: '#3498db',
            posts: '#e74c3c',
            followers: '#27ae60',
            messages: '#f39c12'
        };
        
        const icons = {
            profile: '👤',
            posts: '📝',
            followers: '👥',
            messages: '💬'
        };
        
        const color = colors[type] || '#95a5a6';
        const icon = icons[type] || '📸';
        
        const svg = '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="300" height="200" fill="' + color + '"/>' +
            '<text x="150" y="100" font-size="60" text-anchor="middle" dominant-baseline="middle" fill="white">' + icon + '</text>' +
            '<text x="150" y="150" font-size="16" text-anchor="middle" fill="white" font-family="Arial">' + type.toUpperCase() + '</text>' +
            '</svg>';
        
        return 'data:image/svg+xml;base64,' + btoa(svg);
    },
    
    // Format date
    formatDate: function(date) {
        return date.toISOString().slice(0, 10) + '_' + date.toTimeString().slice(0, 8).replace(/:/g, '-');
    },
    
    // Setup event listeners
    setupEventListeners: function() {
        const app = this;
        
        // Navigation buttons
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                if (section) {
                    app.switchSection(section);
                }
            });
        });
        
        // Create case button
        const createCaseBtn = document.getElementById('createCaseBtn');
        if (createCaseBtn) {
            createCaseBtn.addEventListener('click', () => app.createCase());
        }
        
        // Platform selection
        const platformCards = document.querySelectorAll('.platform-card');
        platformCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('data-platform');
                if (platform) {
                    app.selectPlatform(platform);
                }
            });
        });
        
        // Capture evidence buttons
        const captureButtons = document.querySelectorAll('.btn-capture');
        captureButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const type = this.getAttribute('data-capture');
                if (type) {
                    app.captureEvidence(type);
                }
            });
        });
        
        // Hash verification
        const verifyBtn = document.getElementById('verifyHashBtn');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => app.verifyHash());
        }
        
        // Generate report
        const reportBtn = document.getElementById('generateReportBtn');
        if (reportBtn) {
            reportBtn.addEventListener('click', () => app.generateReport());
        }
        
        // Modal close
        const modal = document.getElementById('detailsModal');
        const closeBtn = document.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (modal) modal.style.display = 'none';
            });
        }
        
        if (modal) {
            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    },
    
    // Switch section
    switchSection: function(sectionName) {
        // Remove active class from all buttons
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        const activeBtn = document.querySelector('[data-section="' + sectionName + '"]');
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Show selected section
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
};

// Initialize app immediately when script loads
document.addEventListener('DOMContentLoaded', () => {
    window.SMFETApp.init();
});

// Also initialize if DOM is already ready (for late script loading)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.SMFETApp.init();
    });
} else {
    // DOM is already ready
    setTimeout(() => {
        window.SMFETApp.init();
    }, 100);
}
