const fs = require('fs');
const readline = require('readline');

const databaseFile = 'database.json';

function createRecord(record) {

  const records = readDatabase();

  records.push(record);


  writeDatabase(records);

  console.log('Record created successfully.');
}

function readRecords() {
  
  const records = readDatabase();

  
  console.log('Records:');
  records.forEach((record, index) => {
    console.log(`${index + 1}. ${JSON.stringify(record)}`);
  });
}


function updateRecord(index, updatedRecord) {

  const records = readDatabase();

  if (index < 1 || index > records.length) {
    console.log('Invalid record index.');
    return;
  }

  
  records[index - 1] = updatedRecord;

  
  writeDatabase(records);

  console.log('Record updated successfully.');
}


function deleteRecord(index) {

  const records = readDatabase();

  
  if (index < 1 || index > records.length) {
    console.log('Invalid record index.');
    return;
  }

  records.splice(index - 1, 1);

  
  writeDatabase(records);

  console.log('Record deleted successfully.');
}


function readDatabase() {
  if (!fs.existsSync(databaseFile)) {
    
    return [];
  }

  
  const data = fs.readFileSync(databaseFile, 'utf8');

  
  return JSON.parse(data);
}


function writeDatabase(records) {
  
  const data = JSON.stringify(records, null, 2);

  
  fs.writeFileSync(databaseFile, data);
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function displayMenu() {
  console.log('\n--- CRUD Operations ---');
  console.log('1. Create a record');
  console.log('2. Read all records');
  console.log('3. Update a record');
  console.log('4. Delete a record');
  console.log('5. Exit');

  rl.question('Enter your choice (1-5): ', (choice) => {
    switch (choice) {
      case '1':
        rl.question('Enter the record to create: ', (record) => {
          createRecord(record);
          displayMenu();
        });
        break;
      case '2':
        readRecords();
        displayMenu();
        break;
      case '3':
        rl.question('Enter the index of the record to update: ', (index) => {
          rl.question('Enter the updated record: ', (record) => {
            updateRecord(parseInt(index), record);
            displayMenu();
          });
        });
        break;
      case '4':
        rl.question('Enter the index of the record to delete: ', (index) => {
          deleteRecord(parseInt(index));
          displayMenu();
        });
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 5.');
        displayMenu();
    }
  });
}

displayMenu();