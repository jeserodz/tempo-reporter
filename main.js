const csv = require('csv/lib/sync');
const fs = require('fs');
const yargs = require('yargs');
const { groupBy, chain } = require('lodash');

const RATE = parseFloat(yargs.argv.rate) || 1;

const file = fs.readFileSync('./report.csv');

const data = groupBy(csv.parse(file, { columns: true }), 'Project Name');

const projects = Object.keys(data);

const accumulated = chain(projects)
  .map(project => {
    return data[project].reduce((accumulated, workItem) => ({
      'Project Name': workItem['Project Name'],
      'Hours': (accumulated['Hours'] || 0) + parseFloat(workItem['Billed Hours']),
    }), {});
  })
  .map(project => ({
    ...project,
    'Hours': Math.round(project['Hours'] * 100) / 100,
  }))
  .map(project => ({
    ...project,
    'Rate': RATE,
    'Subtotal': Math.round(project['Hours'] * RATE * 100) / 100
  }))
  .sortBy('Hours')
  .reverse()
  .value();
  
const results = csv.stringify(accumulated, { header: true });

fs.writeFileSync('./results.csv', results);
