// Modifying data

export default function (data, key) {
  switch (key) {
    case 'Survived':
      data.forEach(Survived);
      return data;
    case 'Age':
      data.forEach(Age);
      return data;
    case 'Embarked':
      data.forEach(Embarked);
      return data;
    default:
      break;
  }
}

// Helpers
function Survived(item) {
  if (item['Survived'] == '1') {
    item['Survived'] = 'Survived';
  }
  else if (item['Survived'] == '0') {
    item['Survived'] = 'Died';
  }
}

function Age(item) {
  if (item['Age'] >= '0' && item['Age'] <= '16') {
    item['Age'] = '0-16';
  }
  else if (item['Age'] >= '17' && item['Age'] <= '29') {
    item['Age'] = '17-29';
  }
  else if (item['Age'] >= '30' && item['Age'] <= '45') {
    item['Age'] = '30-45';
  }
  else if (item['Age'] >= '46' && item['Age'] <= '59') {
    item['Age'] = '46-59';
  }
  else if (item['Age'] >= '60' && item['Age'] <= '80') {
    item['Age'] = '60-80';
  }
  else {
    item['Age'] = 'NA';
  };
}

function Embarked(item) {
  if (item['Embarked'] == 'S' || item['Embarked'] == 'Southampton') {
    item['Embarked'] = 'Southampton';
  }
  else if (item['Embarked'] == 'C' || item['Embarked'] == 'Cherbourg') {
    item['Embarked'] = 'Cherbourg';
  }
  else if (item['Embarked'] == 'Q' || item['Embarked'] == 'Queenstown') {
    item['Embarked'] = 'Queenstown';
  }
  else {
    item['Embarked'] = 'N/A';
  };
}