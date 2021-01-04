// Просто объект с данными
const { observe, createComputed } = require('./observer');

const data = {
  firstName: 'Alice',
  lastName: 'Smith',
  trash: 'some trash',
}

// Делаем объект реактивным, добавляя ему НАБЛЮДАТЕЛЯ
observe(data);

// Полное имя (вычисляемое свойство)
const fullName = createComputed(() => {
  // console.log('Compute FullName');
  return `${data.firstName} ${data.lastName}`;
});

// Полное имя с префиксом (вычисляемое свойство, зависящее от вычисляемого свойства)
const fullNameWithPrefix = createComputed(() => {
  // console.log('Compute FullNameWithPrefix');
  return `The ${fullName.value}`;
});

console.log('> Initial Value');
console.log(JSON.stringify(data));
console.log('\n');

console.log('> Computed');
console.log(`FullName: ${fullName.value}`);
console.log(`FullNameWithPrefix: ${fullNameWithPrefix.value}`);
console.log('\n');

console.log('> Let\'s change firstName\n');
data.firstName = 'Bob';

console.log('> Let\'s change trash\n');
data.trash = 'new trash';

console.log('New Value');
console.log(JSON.stringify(data), '\n');

console.log('Computed');
console.log(`FullName: ${fullName.value}`);
console.log(`FullNameWithPrefix: ${fullNameWithPrefix.value}`);

