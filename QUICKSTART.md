# SM-FET Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Open SM-FET
1. Open `index.html` in your web browser
2. You should see the professional forensic interface with:
   - Red and dark blue header
   - Left navigation panel
   - Central content area
   - Right evidence log panel

### Step 2: Create Your First Case
1. Click **📁 Create New Case** in the left menu
2. Fill in the form:
   - **Case Title**: "Facebook Account Investigation"
   - **Case Description**: "Investigation into unauthorized account access"
   - **Evidence Type**: Select "Social Media Profile"
   - **Examiner Name** (top bar): "John Smith"
3. Click **Create Case**
4. You should see: ✅ Case Case_001 created successfully!

### Step 3: Select a Platform
1. Click **🌐 Select Platform** in the left menu
2. Click on **Facebook** card
3. You should see:
   - ✅ Browser Status: Connected
   - Account information populated
   - Platform detected automatically

### Step 4: Capture Evidence
1. Click **📸 Capture Evidence** in the left menu
2. You should see four capture buttons:
   - 👤 Capture Profile
   - 📝 Capture Posts
   - 👥 Capture Followers
   - 💬 Capture Messages
3. Click **👤 Capture Profile**
4. A screenshot will appear in "Live Capture Preview"
5. Click the screenshot to see details (including SHA256 hash)
6. Repeat for Posts, Followers, and Messages

### Step 5: View Captured Evidence
1. Click **🔍 View Evidence** in the left menu
2. You'll see all captured items in a grid
3. Click any item to see:
   - Full screenshot
   - Complete file information
   - SHA256 hash
   - File path

### Step 6: Verify Hash Integrity
1. Click **🔐 Verify Hash** in the left menu
2. Two options:
   - **Hash Verification**: Paste hash values to compare
   - **Evidence Hashes**: View all hashes in a table

**To test hash verification:**
1. Go to **View Evidence** and click an item
2. Copy the SHA256 hash
3. Go back to **Verify Hash**
4. Paste the same hash in both fields
5. Click **Verify Hash**
6. You should see: ✅ HASH MATCH - Evidence integrity verified!

### Step 7: Generate Court-Ready Report
1. Click **🧾 Generate Report** in the left menu
2. Fill in optional fields:
   - Report Title: "Digital Evidence Report - Facebook Investigation"
   - Examiner Certification: "Certified Digital Forensics Examiner"
   - Examiner Details: Your professional information
3. Click **Generate PDF Report**
4. A PDF will download with:
   - All case details
   - Evidence screenshots
   - SHA256 hashes
   - Signature block
   - Professional formatting

---

## 📊 Understanding the Interface

### Top Bar (Red Header)
```
🔍 SM-FET                          Case ID: Case_001  Examiner: John Smith  Date & Time: 2/11/2025 10:30:45
Social Media Forensic Evidence Tool
```

### Left Navigation (Dark Blue Panel)
- Active section is highlighted in red
- Click any button to switch sections
- Current section shown in center

### Center Area (White/Light Blue)
- Dynamic content changes based on selected section
- Forms, previews, and details appear here
- Responsive to your actions

### Right Panel (White)
- 📋 Evidence Log: Real-time log entries
- Shows newest evidence at top
- Displays timestamps and hash previews
- Quick statistics

---

## 🎯 Common Workflows

### Workflow 1: Single Platform Investigation
```
1. Create Case → 2. Select Platform → 3. Capture Evidence → 
4. Verify Hashes → 5. Generate Report
```

### Workflow 2: Multi-Platform Investigation
```
1. Create Case → 2. Capture from Platform A → 
3. Select Platform B → 4. Capture from Platform B → 
5. Select Platform C → 6. Capture from Platform C → 
7. Verify All Hashes → 8. Generate Report
```

### Workflow 3: Evidence Review
```
1. Click View Evidence → 2. Click specific item → 
3. Review all details and hash → 4. Go to Verify Hash → 
5. Confirm integrity
```

---

## 💡 Pro Tips

### Tip 1: Capture Everything
Don't skip evidence types. Capture:
- ✅ Profile (account info)
- ✅ Posts (content history)
- ✅ Messages (communications)
- ✅ Followers (connections)

### Tip 2: Verify Before Report
Always verify hashes before generating the report:
1. All captures should show in Evidence Log (right panel)
2. Go to **Verify Hash** section
3. Check hashes table
4. Ensure no mismatches

### Tip 3: Use Descriptive Titles
Case titles should be specific:
- ✅ Good: "Facebook Account @john_doe Unauthorized Access - 2025-02-11"
- ❌ Poor: "Facebook Investigation"

### Tip 4: Examiner Name Matters
The examiner name appears in:
- All evidence log entries
- PDF report
- Chain of custody (in exported folder)

### Tip 5: Document Everything
Use case description for notes:
- Account URL
- Discovery method
- Initial findings
- Any special circumstances

---

## ✅ Verification Checklist

Before generating a report, verify:

- [ ] Case created with title and description
- [ ] Examiner name entered in top bar
- [ ] Platform selected
- [ ] Evidence captured from all needed sources
- [ ] All hashes verified (no mismatches)
- [ ] Evidence visible in "View Evidence"
- [ ] Evidence Log shows all items on right panel
- [ ] PDF report details filled in
- [ ] Generated PDF downloaded successfully

---

## 📁 Where's My Data?

### Browser Storage
- All cases and evidence stored in browser's LocalStorage
- Data persists until you clear cache
- Each case gets a unique ID (Case_001, Case_002, etc.)

### Backup Data
- Always download and save your PDF reports
- Export case details regularly
- Keep backups on external drives

### Evidence Organization
When you implement the full system with actual files, structure will be:
```
Case_001/
├── Profile/
├── Posts/
├── Messages/
├── Followers/
├── hashes.txt
├── chain_of_custody.txt
└── Final_Report.pdf
```

---

## 🔍 Features Overview

| Feature | Section | Purpose |
|---------|---------|---------|
| Case Management | Create New Case | Initialize investigation |
| Platform Selection | Select Platform | Choose social media source |
| Evidence Capture | Capture Evidence | Screenshot and hash evidence |
| Evidence Review | View Evidence | Examine captured items |
| Hash Verification | Verify Hash | Ensure evidence integrity |
| Report Generation | Generate Report | Create court-ready PDF |
| Evidence Log | Right Panel | Real-time capture tracking |

---

## ❓ FAQ

### Q: Can I create multiple cases?
**A:** Yes! Click "Create New Case" multiple times. Each gets a unique ID (Case_001, Case_002, etc.)

### Q: What if I make a mistake?
**A:** Clear your browser cache and start fresh. Or create a new case with a different title.

### Q: Can I switch between platforms?
**A:** Yes! Just click "Select Platform" and choose a different one. You can capture evidence from multiple platforms in the same case.

### Q: Are the screenshots real?
**A:** These are placeholder screenshots for demonstration. In actual use, you would capture real screenshots from the target accounts.

### Q: Can I modify evidence after capture?
**A:** The hash system would detect any changes. For demonstration, all hashes are pre-calculated and matching ensures data integrity.

### Q: How do I export everything?
**A:** 
- Generate and download the PDF report
- Take screenshots of your Evidence Log
- Write down important case numbers
- Share PDF with relevant parties

### Q: Is my data secure?
**A:** Data is stored in browser LocalStorage. For real forensic use:
- Use encrypted drives
- Restrict access to authorized personnel
- Maintain chain of custody documentation
- Back up to secure media

---

## 🎓 Learning Path

1. **First Time**: Follow Step-by-step guide above
2. **Explore**: Try creating multiple cases
3. **Practice**: Capture evidence from all platforms
4. **Verify**: Use hash verification on all items
5. **Report**: Generate a complete PDF report
6. **Advanced**: Review Case Structure documentation

---

## 🛠️ Troubleshooting

### Issue: Nothing appears after clicking button
**Solution**: 
- Make sure JavaScript is enabled
- Refresh the page (F5)
- Try a different browser

### Issue: Evidence not showing
**Solution**:
- Verify case is created
- Verify platform is selected
- Check "Capture Evidence" section for errors

### Issue: PDF won't generate
**Solution**:
- Ensure internet connection (CDN needed)
- Try again in 5 seconds
- Use a different browser
- Check browser console for errors (F12)

### Issue: Hash verification says mismatch
**Solution**:
- Check for extra spaces or line breaks
- Copy-paste carefully
- Refresh and try again

---

## 📞 Support

For detailed information, see:
- **General Info**: README.md
- **Case Structure**: CASE_STRUCTURE.md
- **Code**: src/app.js (JavaScript logic)
- **Styling**: src/styles.css (Visual appearance)

---

**Start your first investigation now! 🔍**

1. Open index.html
2. Follow the 7 steps above
3. Generate your first report
4. You're now using SM-FET!

---

Version: 1.0 | Last Updated: February 2025
