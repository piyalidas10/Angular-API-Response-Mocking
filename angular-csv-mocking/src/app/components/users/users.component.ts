import { Component } from '@angular/core';
import { MockApiService } from '../../shared/mock-api.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: any[] = [];
  columns: string[] = [];
  loading = false;
  error = '';

  constructor(private api: MockApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.api.getResource<any[]>('users').subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
        if (res.length) {
          this.columns = Object.keys(res[0]); // preserves CSV order
        }
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
}
