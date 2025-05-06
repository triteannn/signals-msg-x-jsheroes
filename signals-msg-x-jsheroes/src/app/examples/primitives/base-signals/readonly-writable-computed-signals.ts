import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  untracked,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

type Task = {
  id: string;
  description: string;
  done: boolean;
};

@Component({
  selector: 'app-readonly-writable-computed-signals',
  template: `
    <h2>Task Manager</h2>
    <p>Welcome, {{ user() }}!</p>

    <section class="flex items-center gap-2">
      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Task</mat-label>
        <input
          #newTaskDescriptionInput
          matInput
          type="text"
          [value]="newTaskDescription()"
          (input)="newTaskDescription.set(newTaskDescriptionInput.value)"
        />
      </mat-form-field>

      <button mat-stroked-button (click)="addTask()">Add Task</button>
    </section>

    <section>
      @if (tasks().length === 0) {
        <p>No tasks yet. Add one above.</p>
      } @else {
        @for (task of tasks(); track task.id) {
          <div class="flex items-center gap-2">
            <mat-checkbox
              [checked]="task.done"
              (change)="toggleTaskCompletion(task.id)"
            />
            <span [style.text-decoration]="task.done ? 'line-through' : 'none'">
              {{ task.description }}
            </span>
            <button mat-icon-button (click)="deleteTask(task.id)">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        }
      }
    </section>

    <hr />

    <p>Total Tasks: {{ tasks().length }}</p>
    <p>Completed: {{ completedCount() }}</p>
    <p>Incomplete: {{ incompleteCount() }}</p>

    @if (hasCompleted()) {
      <button mat-stroked-button (click)="clearCompleted()">
        Clear Completed
      </button>
    }

    @if (lastAddedTaskDescription()) {
      <p>
        Last added task description:
        <strong>{{ lastAddedTaskDescription() }}</strong>
      </p>
    }
  `,
  styles: `
    .flex.items-center.gap-2 {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    section {
      margin-bottom: 1rem;
    }
  `,
  imports: [
    MatInput,
    MatButtonModule,
    MatIcon,
    MatCheckbox,
    MatFormField,
    MatLabel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyWritableComputedSignalsComponent {
  private readonly _user = signal('Tudor');
  // Readonly signal for user's name
  protected readonly user = this._user.asReadonly();

  // Writable signals
  protected readonly tasks = signal<Task[]>([]);
  protected readonly newTaskDescription = signal('');
  protected readonly lastAddedTaskId = signal<string | null>(null, {
    equal: (taskId1, taskId2) => taskId1 === taskId2,
  });

  // Computed signals
  completedCount = computed(
    () => this.tasks().filter((task) => task.done).length
  );
  incompleteCount = computed(
    () => this.tasks().filter((task) => !task.done).length
  );
  hasCompleted = computed(() => this.completedCount() > 0);

  // Only depends reactively on lastAddedTaskId
  // Reads `tasks()` untracked to avoid recomputation on unrelated changes
  protected readonly lastAddedTaskDescription = computed(() => {
    console.log('[COMPUTED] lastAddedTaskDescription executed');
    const id = this.lastAddedTaskId();

    if (!id) return null;

    // We deliberately don't track tasks() here
    const tasks = untracked(this.tasks);

    const match = tasks.find((task) => task.id === id);
    return match ? match.description : null;
  });

  addTask(): void {
    const description = this.newTaskDescription().trim();

    if (!description) return;

    const id = crypto.randomUUID();

    // Will not trigger computed if ID doesn't change
    this.lastAddedTaskId.set(id);

    this.tasks.update((tasks) => [...tasks, { id, description, done: false }]);

    // after updating tasks list, reset input value through the signal
    this.newTaskDescription.set('');
  }

  toggleTaskCompletion(id: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  deleteTask(id: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  clearCompleted(): void {
    this.tasks.update((tasks) => tasks.filter((task) => !task.done));
  }
}
