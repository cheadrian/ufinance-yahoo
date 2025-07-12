# V 1.2.2
- Drop support for the uFinance dark mode in favor of the standard one
- Drop collection of the proposes through the Firebase firestore
- Fix openrouter API checking
- Drop StockTwits widget support
- Add Stock Analysis and trim the link list

# V 1.2.1
- Fix dark mode on new interface
- Fix hidden uFinance app at load
- Rename extension because of the trademark issue

# V 1.2.0

- Ask for review
- Ask A.I. using Open Router:
  - Selectable chat model from Open Router list
  - Using user API key
  - Collect data from the page and send to the LLM model
  - Option to send context or not
  - Continue conversation
  - Add card in menu
- Optimize loading and stability
- Remove unnecessary comments and console.log
- Load only shortcuts without search for commodities or indexes
- Add new relevant links:
  - https://www.bing.com/search?showconv=1&sendquery=1&seltone=c&q=TICKER
  - https://www.bing.com/search?q=TICKER
  - https://chat.openai.com/
  - https://bard.google.com/chat
  - https://decodeinvesting.com/financial_analyst/TICKER/chat/lima
  - https://claude.ai/
  - https://tradestie.com/apps/stockmarket/TICKER-analysis/
  - https://www.reddit.com/search/?q=TICKER
  - https://whalewisdom.com/stock/TICKER
- Remove unresponsive built-in URL shortcut:
  - https://www.earningswhispers.com/sentiment/TICKER
- Update javascript libraries:
  - Vue.js
  - Jquery.js
  - Stocktwits.js
  - Firebase.js
- Add grouping by category
- Add notes box
- Remove Polyfill.js
- Remove unnecessary files
- Make aspect compact
- Update Earnings Whispers sentiment link to stock page
- Update Twitter icon to X
- Modify the extension name by adding Yahoo Finance Upgraded
- Modify hide button to icon
- Fix dark theme when search ticker
- Update compatibility for the new version of Yahoo Finance website
  - Add CSS selectors for dark theme on newer version
  - Disable invert colors on chart that is dark by default

# V 1.1.1

- Delete http://sec.report, as it is unresponsive;
- Fix conversation contrast
- Increase contrast in other areas
- Added proposed links