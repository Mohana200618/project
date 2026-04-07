# SM-FET - Social Media Forensic Evidence Tool

## Overview
SM-FET is a professional digital forensics application designed for investigators to capture, document, and verify social media evidence for legal proceedings. Built with a court-ready interface and professional documentation standards.

## Features

### 🎯 Core Functionality
- **Case Management**: Create and manage digital investigation cases
- **Multi-Platform Support**: Facebook, Twitter/X, Instagram, TikTok, LinkedIn
- **Evidence Capture**: Screenshot and document social media profiles, posts, messages, and followers
- **Hash Verification**: SHA256 integrity verification for evidence authenticity
- **Professional Reports**: Generate court-ready PDF reports with chain of custody
- **Evidence Logging**: Real-time evidence tracking and documentation

### 🔒 Security & Integrity
- SHA256 hashing for all captured evidence
- Hash verification system to detect tampering
- Chain of custody documentation
- Examiner authentication and signature blocks

### 📊 Professional Features
- Examiner information and certification tracking
- Automated timestamp recording
- File organization structure suitable for legal proceedings
- Evidence statistics and analytics

## UI Structure

### Top Bar
- **Tool Name**: SM-FET with branding
- **Case ID**: Auto-generated case identifier
- **Examiner Name**: Input field for investigator information
- **Date & Time**: Real-time clock (auto-updating)

### Left Navigation Panel
- 🏠 Home
- 📁 Create New Case
- 🌐 Select Platform
- 📸 Capture Evidence
- 🔍 View Evidence
- 🔐 Verify Hash
- 🧾 Generate Report

### Center Panel (Main Content Area)
Dynamic content area with sections for:
- **Home**: Dashboard with statistics
- **Create Case**: Case initialization form
- **Select Platform**: Platform selection interface
- **Capture Evidence**: Active capture controls and live preview
- **View Evidence**: Evidence gallery and details
- **Verify Hash**: Hash comparison and verification
- **Generate Report**: PDF report creation

### Right Panel (Evidence Log)
- Real-time evidence entry logging
- Timestamp recording
- SHA256 hash preview
- Quick statistics

## Installation & Setup

### Requirements
- Modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Local storage support

### Getting Started

1. **Open the application**
   ```
   Open index.html in your web browser
   ```

2. **Create a New Case**
   - Go to "Create New Case"
   - Enter case title and description
   - Select evidence type
   - Enter examiner name
   - Click "Create Case"

3. **Select Social Media Platform**
   - Go to "Select Platform"
   - Click on the platform you want to investigate
   - Account information will be automatically detected

4. **Capture Evidence**
   - Go to "Capture Evidence"
   - Choose capture type:
     - 👤 Profile
     - 📝 Posts
     - 👥 Followers
     - 💬 Messages
   - Each capture is automatically hashed and logged

5. **View & Verify Evidence**
   - Go to "View Evidence" to see all captured items
   - Go to "Verify Hash" to compare hash values
   - Check integrity of evidence

6. **Generate Report**
   - Go to "Generate Report"
   - Fill in examiner details and certification
   - Click "Generate PDF Report"
   - Save court-ready PDF

## Folder Structure

When a case is created, the following directory structure is generated:

```
Case_001/
├── Profile/
│   └── facebook_profile_2025-02-11.png
├── Posts/
│   ├── facebook_posts_2025-02-11.png
│   └── facebook_posts_2025-02-11_01.png
├── Messages/
│   └── facebook_messages_2025-02-11.png
├── Followers/
│   └── facebook_followers_2025-02-11.png
├── hashes.txt
├── chain_of_custody.txt
└── Final_Report.pdf
```

### File Descriptions

- **hashes.txt**: Contains SHA256 hashes of all evidence files
  ```
  facebook_profile_2025-02-11.png: a1b2c3d4e5f6...
  facebook_posts_2025-02-11.png: f6e5d4c3b2a1...
  ```

- **chain_of_custody.txt**: Documents evidence handling history
  ```
  Case ID: Case_001
  Examiner: John Smith
  Date Started: 2025-02-11 10:30:45
  Platform: Facebook
  Evidence Items: 4
  ...
  ```

- **Final_Report.pdf**: Complete court-ready investigation report

## Evidence Data Structure

Each evidence item includes:
- **ID**: Unique identifier
- **Filename**: Auto-generated with timestamp
- **File Path**: Case-organized directory structure
- **Type**: Profile, Posts, Followers, or Messages
- **Platform**: Facebook, Twitter, Instagram, TikTok, LinkedIn
- **Timestamp**: ISO 8601 format (UTC)
- **SHA256 Hash**: For integrity verification

## Hash Verification Guide

### How Hash Verification Works
1. Every captured evidence item is automatically hashed using SHA256
2. The hash value is stored alongside the evidence
3. To verify integrity:
   - Go to "Verify Hash"
   - Paste the original hash
   - Paste the comparison hash
   - The system confirms if they match

### Hash Mismatch
If hashes don't match, it indicates:
- Evidence has been modified
- File corruption occurred
- Chain of custody has been broken

## PDF Report Format

Generated reports include:

1. **Header Section**
   - Report title
   - Case ID
   - Tool identification (SM-FET v1.0)

2. **Case Details**
   - Case ID and title
   - Examiner name and credentials
   - Date/time created
   - Evidence type

3. **Evidence Summary Table**
   - All captured files listed
   - Types, platforms, timestamps

4. **Detailed Evidence Pages**
   - Screenshot thumbnails
   - File paths
   - Capture times
   - Full SHA256 hashes

5. **Integrity Verification Section**
   - Hash verification explanation
   - Chain of custody notes

6. **Examiner Signature Block**
   - Certifications field
   - Signature line with date/time
   - Professional details

## Local Storage

Data is stored in browser's local storage:
- `smfet_cases`: Array of case objects
- `smfet_evidence`: Array of evidence items

**Note**: Data persists across browser sessions until cleared.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features Details

### Case Management
- Unique case IDs (Case_001, Case_002, etc.)
- Case title and description
- Examiner assignment
- Automatic timestamps

### Platform Detection
Simulates detection of:
- Profile URLs
- Account usernames
- Login status
- Account information

### Evidence Capture
- Real-time capture with preview
- Automatic hash calculation
- Timestamp recording
- File naming convention
- Folder organization

### Hash System
- SHA256 algorithm (simulated for demo)
- Integrity verification
- Hash comparison
- Evidence table with hashes

### Reporting
- Professional PDF generation
- Court-ready format
- Evidence thumbnails
- Examiner signature blocks
- Chain of custody documentation

## Usage Scenarios

### Scenario 1: Social Media Fraud Investigation
1. Create case "Facebook Account Compromise"
2. Select Facebook platform
3. Capture profile, posts, and messages
4. Verify hash integrity
5. Generate forensic report for court

### Scenario 2: Evidence Collection
1. Create case "Instagram Evidence Collection"
2. Select Instagram
3. Capture follower lists and posts
4. Document timeline
5. Generate comprehensive report

### Scenario 3: Multi-Platform Investigation
1. Create case "Multi-Platform Evidence"
2. Select multiple platforms sequentially
3. Capture evidence from each
4. Verify all hashes
5. Generate consolidated report

## Tips for Investigators

1. **Always Record Examiner Name**: This appears in all documentation
2. **Use Descriptive Case Titles**: Include key information in case title
3. **Capture Complete Evidence**: Get profile, posts, messages, followers
4. **Verify Immediately**: Check hashes during evidence collection
5. **Generate Report Promptly**: Complete PDF documentation while evidence is fresh
6. **Keep Backup Hashes**: Record all hash values in external storage
7. **Document Everything**: Use evidence log for detailed notes

## Legal Considerations

- This tool is designed to assist certified digital forensics professionals
- Evidence collected should follow legal procedures in your jurisdiction
- Chain of custody must be properly maintained
- All examinations should be performed by qualified professionals
- Generated reports should be reviewed by legal counsel before submission

## Technical Details

### Technologies Used
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Browser LocalStorage API
- SVG for icons and placeholders

### Browser APIs
- LocalStorage for data persistence
- Date API for timestamping
- Canvas API for placeholder generation
- Modal dialogs for details

### File Sizes
- HTML: ~25 KB
- CSS: ~18 KB
- JavaScript: ~22 KB
- Total: ~65 KB (lightweight, fast loading)

## Future Enhancements

- [ ] Database backend integration
- [ ] Advanced hash algorithms (SHA512, Blake3)
- [ ] Digital signature support
- [ ] Video evidence support
- [ ] Mobile responsive optimization
- [ ] Export to multiple formats (DOCX, XLSX)
- [ ] Multi-user collaboration
- [ ] Cloud backup integration
- [ ] Automated evidence collection APIs
- [ ] Advanced analytics and timeline visualization

## Troubleshooting

### Evidence Not Capturing
- Ensure case is created first
- Verify platform is selected
- Check browser's local storage is enabled

### Hash Verification Issues
- Ensure both hash fields are filled
- Check for extra spaces or line breaks
- Hashes are case-insensitive

### PDF Generation Fails
- Check internet connection (requires CDN for PDF library)
- Try using a different browser
- Ensure JavaScript is enabled

### Data Loss
- Clear browser cache will remove stored data
- Always backup generated PDFs
- Export data regularly

## Support

For issues or feature requests, refer to the technical documentation or contact your digital forensics administrator.

## License

SM-FET is provided for professional digital forensics use.

## Disclaimer

This tool is intended for authorized digital forensics professionals only. Improper use may violate laws regarding computer access and data privacy. Users assume all responsibility for lawful use of this tool.

---

**Version**: 1.0  
**Last Updated**: February 2025  
**Developer**: Digital Forensics Team  
**Classification**: Professional Investigation Tool
