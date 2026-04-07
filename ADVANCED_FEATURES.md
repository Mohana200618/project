# SM-FET Advanced Features & PDF Report Guide

## PDF Report Generation

### Report Components

The generated PDF includes the following professional sections:

#### 1. Header Section
- **Title**: "DIGITAL EVIDENCE REPORT"
- **Subtitle**: User-defined report title
- **Tool Identification**: "SM-FET - Social Media Forensic Evidence Tool"
- **Branding**: Professional appearance suitable for court submission

#### 2. Case Details Section
Displays comprehensive case information:
```
Case ID:            Case_001
Case Title:         Facebook Account Unauthorized Access
Examiner:           John Smith
Date Created:       2025-02-11 10:30:45
Description:        Investigation into compromised Facebook account
Evidence Type:      Social Media Profile
```

#### 3. Evidence Captured Table
Summary table listing all captured items:
```
┌──────────────────────────┬─────────┬──────────┬────────────────────┐
│ Filename                 │ Type    │ Platform │ Timestamp          │
├──────────────────────────┼─────────┼──────────┼────────────────────┤
│ facebook_profile_...     │ Profile │ Facebook │ 2025-02-11 10:30:45│
│ facebook_posts_...       │ Posts   │ Facebook │ 2025-02-11 10:31:00│
│ facebook_messages_...    │ Messages│ Facebook │ 2025-02-11 10:40:00│
│ facebook_followers_...   │ Followers│Facebook │ 2025-02-11 10:50:00│
└──────────────────────────┴─────────┴──────────┴────────────────────┘
```

#### 4. Detailed Evidence Pages
For each captured item:
- Full-size screenshot image
- File information (name, path, type)
- Capture timestamp
- Complete SHA256 hash (full 64-character value)
- Integrity verification note

Example:
```
1. facebook_profile_2025-02-11_10-30-45.png
   [SCREENSHOT IMAGE]
   
Type: Profile
Platform: Facebook
File Path: Case_001/Profile/facebook_profile_2025-02-11_10-30-45.png
Captured: 2025-02-11 10:30:45
SHA256 Hash: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
Verification: This hash was calculated using SHA256 algorithm to ensure 
              evidence integrity and chain of custody.
```

#### 5. Integrity Verification Section
Explains:
- Hash verification process
- Chain of custody importance
- Method of integrity checking
- What hash matches mean for evidence validity

```
INTEGRITY VERIFICATION

All evidence items have been captured using SM-FET and their integrity 
verified through SHA256 hashing. Each item's hash value is recorded above 
and can be used to verify that the evidence has not been modified since 
capture.

SHA256 provides:
- Cryptographic verification of file content
- Detection of any alterations or tampering
- Audit trail for evidence handling
- Compliance with forensic standards
```

#### 6. Examiner Signature Block
Professional signature section with:
- Examiner name (pre-filled from case)
- Professional title/certification
- License number field
- Signature line
- Date and time fields
- Professional details/notes

```
EXAMINER INFORMATION

Name: John Smith                          License #: __________________
Title: Certified Digital Forensics Examiner
Signature: _________________________________ Date: ____________________
Time: ____________________

PROFESSIONAL DETAILS:
Certified by: Digital Forensics Board
Experience: 8+ years in digital investigations
Specialization: Social Media Forensics
Contact: j.smith@agency.gov

[Additional certification notes here]
```

#### 7. Footer Information
- Report generation timestamp (UTC)
- SM-FET version number
- File classification
- Footer on every page

---

## Advanced Hash Features

### SHA256 Implementation

SM-FET uses SHA256 for all hash calculations:

**Why SHA256?**
- Industry standard for digital forensics
- 256-bit security strength
- One-way function (cannot reverse)
- Widely accepted in courts
- Collision-resistant

**Hash Properties:**
```
Input:  facebook_profile_2025-02-11_10-30-45.png
Output: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
Length: Always 64 hexadecimal characters (256 bits)
```

### Hash Verification Process

#### Manual Verification Steps:
1. **Capture** - Evidence is automatically hashed during capture
2. **Record** - Hash is stored in hashes.txt and case_metadata.json
3. **Verify** - Go to "Verify Hash" section
4. **Compare** - Paste original hash and comparison hash
5. **Validate** - System confirms match/mismatch

#### What Hashes Prove:
✅ **Match** = Evidence has NOT been modified
❌ **Mismatch** = Evidence HAS been altered OR corrupted

### Hash Storage
Hashes are stored in three locations:
1. **Live Preview** - Shown in Evidence Log (right panel)
2. **hashes.txt** - Complete inventory file
3. **case_metadata.json** - Structured data format
4. **Evidence Details** - Associated with each item
5. **PDF Report** - Included in final report

---

## Case Management Features

### Case Structure

Each case is independent with:

```javascript
{
  "id": "Case_001",                    // Unique identifier
  "title": "Case title",               // Investigation name
  "description": "Details...",         // Investigation description
  "examiner": "John Smith",            // Lead investigator
  "createdDate": "2025-02-11T...",    // ISO 8601 timestamp
  "evidenceType": "Social Media",      // Type of evidence
  "evidence": [                        // Array of evidence items
    {
      "id": "EV_1707557445000",
      "caseId": "Case_001",
      "type": "profile",               // profile/posts/messages/followers
      "platform": "facebook",          // Platform name
      "timestamp": "2025-02-11T...",  // Capture time
      "hash": "a1b2c3d4e5f6...",      // SHA256 hash
      "filename": "facebook_profile...",
      "filePath": "Case_001/Profile/..."
    }
  ]
}
```

### Case Operations

#### Create Case
- Auto-generates Case_001, Case_002, etc.
- Stores in browser LocalStorage
- Associates examiner name
- Records creation timestamp

#### Update Case
- Add evidence items during investigation
- All captures linked to case ID
- Evidence count updated automatically

#### View Cases
- List shows on Home section
- Quick statistics displayed
- Total case count tracked

#### Export Case
- Evidence exported via PDF report
- All documentation included
- Case data in case_metadata.json

---

## Evidence Management

### Evidence Types

#### Profile Evidence
**What it captures:**
- Account profile image
- Display name
- Biography/description
- Account verification status
- Profile URL
- Join date
- Follower count

#### Posts Evidence
**What it captures:**
- Post content
- Post timestamp
- Like/reaction counts
- Comment counts
- Shares/retweets
- Media attachments
- Editing history

#### Messages Evidence
**What it captures:**
- Conversation history
- Message timestamps
- Participant names
- Message content
- Attachments
- Read status
- Message reactions

#### Followers Evidence
**What it captures:**
- Follower list
- Follower count
- Following list
- Following count
- Mutual followers
- Account links
- Follower profiles

### Evidence Lifecycle

```
CAPTURE → HASH → VERIFY → STORE → LOG → REPORT → ARCHIVE
   ↓        ↓       ↓        ↓       ↓       ↓         ↓
 Take    SHA256  Compare   File   Record  PDF     Backup
Screen   Value   Values   Path   Details Report   Media
shot
```

---

## Platform-Specific Features

### Facebook
- Account profiles
- Public/private posts
- Friend connections (followers)
- Messenger conversations
- Group memberships
- Photo albums
- Timeline events

### Twitter/X
- Profile information
- Tweets and retweets
- Mentions and replies
- Direct messages
- Followers list
- Following list
- Trending topics
- Lists and collections

### Instagram
- Profile image
- Bio information
- Posts and carousel
- Stories (screenshot based)
- Direct messages
- Followers/Following
- Hashtags used
- Tagged locations

### TikTok
- User profile
- Video content
- Duets and stitches
- Comments
- Followers
- Following
- Liked videos
- Download information

### LinkedIn
- Professional profile
- Work history
- Education
- Skills and endorsements
- Connections
- Messages
- Posts and articles
- Activity feeds

---

## Professional Features

### Chain of Custody

SM-FET automatically documents:

1. **Initial Capture**
   - Date and time of capture
   - Examiner name
   - Platform and account details

2. **Hash Generation**
   - SHA256 value calculated
   - Timestamp recorded
   - Verification performed

3. **Evidence Storage**
   - File path recorded
   - Storage location documented
   - Backup location noted

4. **Report Generation**
   - Report creation time
   - Examiner certification
   - Number of pages
   - Evidence items included

### Integrity Assurance

**File Hash Verification:**
- Original file hashed at capture
- Hash stored immediately
- Any modification detected
- Court-admissible evidence

**Chain of Custody Documentation:**
- Complete handling history
- Timestamp of each action
- Examiner responsible
- No gaps in documentation

**Evidence Authenticity:**
- Time-stamped captures
- Hash-verified files
- Documented procedures
- Professional standards

---

## Statistics & Reporting

### Live Statistics

The Home section displays:
- **Total Cases**: Number of investigations
- **Total Evidence Items**: Number of captures
- **Reports Generated**: Number of PDFs created

### Evidence Log Statistics (Right Panel)
- **Total Items**: Count of all evidence
- **Last Updated**: Most recent action time

### Case Statistics (Stored)
- Files per type (profile, posts, messages, followers)
- Total file count
- Total file size
- Evidence distribution
- Platform breakdown

---

## Data Storage & Security

### LocalStorage Structure
```javascript
// All cases stored under this key
localStorage['smfet_cases'] = JSON.stringify([...])

// All evidence items stored under this key
localStorage['smfet_evidence'] = JSON.stringify([...])
```

### Data Persistence
- Data survives page refresh
- Data survives browser restart
- Data deleted only when cache is cleared
- Backup to external storage recommended

### Security Considerations

**Current Implementation (Demo):**
- Browser LocalStorage (not encrypted)
- Local file system storage
- Limited access control

**For Production Implementation:**
- Use encrypted storage
- Implement access control
- Add authentication
- Use database backend
- Enable audit logging
- Regular backups to secure media
- Disk encryption

---

## PDF Report Customization

### Fields You Can Customize

In "Generate Report" section:

1. **Report Title**
   - Default: (empty - case title used)
   - Custom example: "Digital Evidence Report - Facebook Investigation"

2. **Examiner Certification**
   - Default: Digital Forensics Examiner
   - Custom example: "Certified Digital Forensics Examiner (CDFE), License #12345"

3. **Examiner Signature Block**
   - Your professional details
   - Agency information
   - Credentials summary
   - Contact information

### Report Output
- **Format**: PDF (Adobe compatible)
- **Pages**: Auto-calculated based on evidence count
- **Filename**: Case_001_Report_2025-02-11_10-30-45.pdf
- **Size**: ~1-5 MB depending on images
- **Quality**: High-resolution (suitable for printing)

---

## Advanced Workflows

### Workflow 1: Complex Multi-Platform Investigation
```
1. Create Case: "Social Media Impersonation Investigation"
2. Select Facebook → Capture Profile, Posts, Messages, Followers
3. Select Twitter → Capture Posts, Followers
4. Select Instagram → Capture Profile, Posts
5. Go to Verify Hash → Check all hashes
6. View Evidence → Review all captures
7. Generate Report → Create comprehensive PDF
```

### Workflow 2: Evidence Comparison
```
1. Create two cases (same account, different dates)
2. Case A: Capture original account state
3. Case B: Capture account at later date
4. Compare evidence side-by-side
5. Document changes in descriptions
6. Generate separate reports for timeline
```

### Workflow 3: Legal Submission
```
1. Complete investigation case
2. Generate PDF report
3. Export case_metadata.json
4. Create folder structure with all evidence
5. Include hashes.txt and chain_of_custody.txt
6. Burn to write-once media (CD/DVD)
7. Create backup copy
8. Submit to court with documentation
```

---

## Troubleshooting Advanced Features

### PDF Generation Issues
**Problem**: PDF won't download
**Solution**: 
- Check internet connection (CDN required)
- Try different browser
- Disable popup blockers
- Wait 10 seconds and try again

### Hash Verification Issues
**Problem**: Hashes don't match even though they should
**Solution**:
- Check for extra spaces or line breaks
- Verify both hashes are complete (64 characters)
- Check capitalization (SHA256 is case-insensitive)
- Refresh page and try again

### Evidence Display Issues
**Problem**: Captured evidence doesn't appear
**Solution**:
- Ensure case was created successfully
- Check case ID is displayed in top bar
- Verify platform is selected
- Check right panel Evidence Log
- Refresh page if needed

### Report Generation Issues
**Problem**: PDF appears blank or incomplete
**Solution**:
- Ensure you have captured evidence
- Wait for all images to load
- Check browser console (F12) for errors
- Try generating again
- Use a different browser

---

## Best Practices

### ✅ Do's
- ✓ Always create case before capturing
- ✓ Select platform before capturing
- ✓ Capture all evidence types
- ✓ Verify hashes before report
- ✓ Fill in examiner details
- ✓ Save PDF reports
- ✓ Document special circumstances
- ✓ Keep case descriptions detailed

### ❌ Don'ts
- ✗ Don't skip evidence types
- ✗ Don't ignore hash mismatches
- ✗ Don't delete evidence logs
- ✗ Don't modify filenames
- ✗ Don't mix cases
- ✗ Don't clear browser data until backed up
- ✗ Don't share report without approval
- ✗ Don't leave examiner field empty

---

## Future Enhancements

Planned features for future versions:

- [ ] Real screenshot capture from browser
- [ ] Multiple hash algorithms (SHA512, Blake3)
- [ ] Digital signatures on reports
- [ ] Video evidence support
- [ ] Cloud storage integration
- [ ] Multi-user collaboration
- [ ] Advanced timeline visualization
- [ ] Automated evidence extraction
- [ ] OCR text extraction
- [ ] Database backend

---

**SM-FET v1.0 - Professional Digital Forensics Tool**

For support and updates, maintain documentation files and follow best practices outlined in this guide.
