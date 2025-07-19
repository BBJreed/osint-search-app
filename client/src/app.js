import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('google');

  const osintTools = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    shodan: 'https://www.shodan.io/search?query=',
    censys: 'https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=',
    wayback: 'https://web.archive.org/web/*/',
    whois: 'https://whois.net/whois/',
    virustotal: 'https://www.virustotal.com/gui/search/',
    pipl: 'https://pipl.com/search/?q=',
    hunter: 'https://hunter.io/search/',
    linkedin: 'https://www.linkedin.com/search/results/all/?keywords=',
    twitter: 'https://twitter.com/search?q=',
    reddit: 'https://www.reddit.com/search/?q=',
    github: 'https://github.com/search?q=',
    pastebin: 'https://pastebin.com/search?h=',
    intelx: 'https://intelx.io/?s=',
    dehashed: 'https://www.dehashed.com/search?query=',
    haveibeenpwned: 'https://haveibeenpwned.com/unifiedsearch/'
  };

  const handleSearch = (tool) => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }
    
    let searchUrl = osintTools[tool] + encodeURIComponent(searchTerm);
    window.open(searchUrl, '_blank');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchType);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔍 OSINT Search Platform</h1>
        <p>Professional OSINT Investigation Toolkit</p>
        
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter search term (email, domain, username, IP, etc.)"
            className="search-input"
          />
          
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            className="search-select"
          >
            <option value="google">Google Search</option>
            <option value="duckduckgo">DuckDuckGo</option>
            <option value="shodan">Shodan (IoT/Infrastructure)</option>
            <option value="censys">Censys (Internet Scanning)</option>
            <option value="wayback">Wayback Machine</option>
            <option value="whois">WHOIS Lookup</option>
            <option value="virustotal">VirusTotal</option>
            <option value="pipl">Pipl (People Search)</option>
            <option value="hunter">Hunter.io (Email)</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter/X</option>
            <option value="reddit">Reddit</option>
            <option value="github">GitHub</option>
            <option value="pastebin">Pastebin</option>
            <option value="intelx">Intelligence X</option>
            <option value="dehashed">DeHashed</option>
            <option value="haveibeenpwned">Have I Been Pwned</option>
          </select>
          
          <button 
            onClick={() => handleSearch(searchType)}
            className="search-button"
          >
            Search
          </button>
        </div>

        <div className="quick-tools">
          <h3>🚀 Quick OSINT Tools</h3>
          <div className="tools-grid">
            <button onClick={() => handleSearch('shodan')} className="tool-btn">
              📡 Shodan
            </button>
            <button onClick={() => handleSearch('wayback')} className="tool-btn">
              🕰️ Wayback
            </button>
            <button onClick={() => handleSearch('whois')} className="tool-btn">
              🌐 WHOIS
            </button>
            <button onClick={() => handleSearch('virustotal')} className="tool-btn">
              🛡️ VirusTotal
            </button>
            <button onClick={() => handleSearch('hunter')} className="tool-btn">
              📧 Hunter.io
            </button>
            <button onClick={() => handleSearch('dehashed')} className="tool-btn">
              🔓 DeHashed
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
