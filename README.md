Tempo Reporter
==============

Parse JIRA Tempo CSV export as Project Name, Hours, Rate and Subtotal. Useful for ivoicing from these exports.

## Setup
1. Clone project
1. `$ cd tempo-reporter`
1. `$ npm install`

## Usage
1. Export JIRA Tempo report as CSV and save it into the project folder
1. Rename it as `report.csv`
1. Run `node main.js --rate=1` (enter your rate)
1. See the `results.csv` generated
1. Open the CSV file and copy-paste wherever needed (Google Sheets, Excel, etc.)
