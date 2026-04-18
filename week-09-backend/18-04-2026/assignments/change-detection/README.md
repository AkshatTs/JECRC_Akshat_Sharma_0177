# Angular Change Detection Puzzle

This project demonstrates the mechanics of Angular's Change Detection strategies, specifically the interaction between `Default` and `OnPush` strategies within a component hierarchy.

## Assignment Answers (Theoretical Execution)

### a) Why does DashboardComponent not update its own view? (3 marks)
`DashboardComponent` is using the `OnPush` change detection strategy. Under `OnPush`, Angular only triggers a view update if the memory reference of the `@Input()` property changes. The `updateLocally()` method only mutates a property (`score`) inside the existing `userStats` object. Because the object's memory reference remains exactly the same, Angular assumes no changes occurred and skips updating the Dashboard view.

### b) Why does StatsComponent show the updated value? (3 marks)
`StatsComponent` is using the `Default` change detection strategy. Unlike `OnPush`, the Default strategy does not rely on object memory references; it checks all bound data on every single change detection cycle. Because the object was mutated, when the cycle runs, the `Default` strategy sees the new `score` value of 100 and updates the child view accordingly, even if the parent skipped its own update.

### c) How would you fix DashboardComponent without changing its strategy to Default? (4 marks)
To trigger an update in an `OnPush` component, we must provide a brand-new object reference rather than mutating the existing one. This can be achieved using the JavaScript spread operator to copy the old properties into a new object along with the updated score:

```typescript
updateFixed() {
  // Creates a completely new memory reference, which OnPush detects
  this.userStats = { ...this.userStats, score: 100 }; 
}




# ChangeDetection

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.