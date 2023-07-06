# 👾 Galaga Game Engine

![Galaga - game logo](./images/galaga-game-logo.png)

![react&. - team logo](./images/by-react-and-dot.png)

## Структура директорий

```text
game/
├── core/
│   ├── Canvas.ts // Обертка над HTMLCanvasElement
│   ├── Collider.ts // Обнаружение столкновений объектов
│   ├── KeyboardController.ts // Обработка нажатий клавиш на клавиатуре
│   └── GameLoop.ts // Класс игрового цикла
├── game-object/ 
│   ├── components/ Компоненты инкапсулирующие отдельную функциональность игрового объекта
│   │   └── ... 
│   ├── GameObject.ts // Базовый класс игрового объекта
│   └── Player.ts // Класс игрока
├── scenes/
│   ├── SceneManager.ts // Управлеине переключением текущей сцены
│   └── ... // Конкретные игровые сцены
├── utils/
│   ├── GameObjectCollection.ts // Управление коллекциями игровых объектов (обход элементов, добавление, удаление)
│   └── Vector2.ts Вектор для упращения математических оппераций с позицией объекта
└── GalagaGame.ts
```

## Игровой цикл

Класс `GameLoop` определяет основной игровой цикл. Внутри игрового цикла переодически вызываются методы:

1. `update(dt)` обновления состояния игры, включая расчет физики и обработку пользовательского ввода;
2. `render(dt)` отображение игровго состояния на `canvas`;

где dt - это delta time это разница во времени между двумя последовательными кадрами игры, которая позволяет отрисовывать каждый кадр не привязываясь к FPS.

Соответственно объекты состояние которых изменяется во время игрвого цикла должны реализовывать общий интерфейс

```typescript
interface GameLoopUpdatableInterface {
  update(dt: number): void
  render(dt: number): void
}
```

## Игровой объект

Класс GameObject является общим для всех игровых объектов: игрока, врага, снаряда и др. Логика отдельных частей игрового объекта инкапсулируется в компонентах.

```typescript
/**
 * Общий интерфейс компонента ирового объекта
*/
interface GameObjectComponent {
  update(gameObject: GameObject, dt: number): void;
}

/**
 * Интерфейс компонента игрового объекта 
 * реализующего отображение на canvas
*/
interface GraphicComponent {
  render(gameObject: GameObject, dt: number): void;
}

/**
 * Интерфейс игрового объекта
*/
interface GameObjectInterface {
  position: Vector2
  size: Size
  update(dt: number): void
  render(dt: number): void
  collideWith(other: GameObject): boolean
  collideWithWall(canvasSize: Size)
}
```

### Представление GameObject на canvas

![game object](./images/game-object.png)

## Сцена

В классе SceneManager определяются основные сцены, а также реализация переключения между сценами.

### Конкретная сцена

```typescript
interface SceneInterface {
  /**
   * Инициализация игровых объектов, спрайтов и др. вызывается 
   * после создания сцены. 
   * Также инициализация может происходить 
   * внутри конструктора класса сцены в зависимости 
   * от контекста.
   */
  init(): void;


  // Сооветственно методы реализующие общий интерфейс 
  // игрового цикла
  update(dt: number): void;
  render(dt: number): void;
}

```

## Источники

1. [Найстром P. Шаблоны игрового программирования](https://vk.com/wall-54530371_171497)
2. [Разработка игр на JavaScript (доступ через VPN)](https://dou.ua/lenta/articles/javascript-gamedev/)
