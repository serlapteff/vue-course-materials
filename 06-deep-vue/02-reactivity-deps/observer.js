// Класс "Зависимостей" для хранения зависимостей некоторой сущности
class Dep {
  // Текущая ГЛОБАЛЬНАЯ цель, у которой определяются зависимости
  static target;

  // Подписчики (зависимых). Список функций, aka watchers
  subs;

  constructor() {
    // Изначально нет подписчиков
    this.subs = [];
  }

  // Добавляем в список подписчиков текущую глобальную цель
  depend() {
    if (Dep.target && !this.subs.includes(Dep.target)) {
      this.subs.push(Dep.target);
    }
  }

  // Уведомляем всех подписчиков (триггерим все вотчеры)
  notify() {
    for (let i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i]();
    }
  }
}

// "Следитель" за реактивным объектом
class Observer {
  // Значение, реактивный объект данными
  value;
  // Зависимости
  dep;

  // На вход приходит объект, который в последующем станет реактивным
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    // Сохраняем "наблюдателя" в свойство '__ob__' реактивного объекта
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    // Рекурсивно проходимся по всем полям объекта и делаем их реактивными
    this.walk(value);
  }

  // Обходим все свойства объекта и делаем их реактивными
  // В полном решении требуется делать рекурсивно, учитывать разные типы свойств
  // Если свойство объекта - тоже объект, надо и ему создавать наблюдателя
  walk(obj) {
    // Перебираем свойства объекта
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      // Делаем это свойство реактивным
      defineReactive(obj, keys[i]);
    }
  }
}

// Функция делающая свойство объекта реактивным
function defineReactive(obj, key) {
  // Для каждого свойства имеем список его зависимостей
  const dep = new Dep();

  let val = obj[key];

  // Делаем свойство реактивным, устанавливая ему геттер и сеттер
  Object.defineProperty(obj, key, {
    get() {
      // При вызове геттера даём понять, что НЕЧТО зависит от этого свойства
      dep.depend();
      return val;
    },
    set(newVal) {
      val = newVal;
      // При вызове сеттера уведомляем всех подписчиков
      dep.notify();
    },
  });
}

// Функция, которая делает объект реактивным, добавляя ему НАБЛЮДАТЕЛЯ
function observe(value) {
  return new Observer(value);
}

// Наблюдатель, тот, кто делает работу при изменении значений, за которыми следят
class Watcher {
  // Функция получения отслеживаемого значения
  getter;
  // Значение отслеживаемого значения :)
  value;

  constructor(getter) {
    // Сохраняем функцию получения значения
    this.getter = getter;

    // Определяем, от кого зависит
    this.get();
  }

  // Сообщаем о том, что произошло обновление
  update() {
    this.value = this.getter();
  }

  // Получение отслеживаемое значения
  get() {
    // Функция получения - текущая ЦЕЛЬ наблюдения, поиска зависимостей
    Dep.target = this.update.bind(this);

    // Вызываем функцию получения значения
    this.update();
    // Теперь у всего, от чего зависит эта функция, будут вызваны геттеры
    // Так будет понятно, от чего эта функция зависит
    // Всему, от чего она зависит, она будет добавлена в список зависимостей (подписчиков)

    // Удаляем цель, больше она не нужна
    Dep.target = null;

    return this.value;
  }
}

// Не настоящий computed, нет кэширования
function createComputed(getter) {
  // Создаём вотчер на геттер
  const watcher = new Watcher(getter);
  // Создаём объект, получение значения которого триггерит вотчер
  const obj = {};
  Object.defineProperty(obj, 'value', {
    get() {
      return watcher.get();
    },
  });
  return obj;
}

module.exports = {
  Dep,
  Observer,
  observe,
  Watcher,
  createComputed,
};
