# angular-csv-mocking

## 🔥 Key Idea
- Extract API name from URL
- Use same name to load CSV
- Example: /api/users → users.csv

```
publics/mocks/
   users.csv     → /api/users
   orders.csv    → /api/orders
   products.csv  → /api/products
```   

## API Calls
```
GET /api/users       → users.csv (all)
GET /api/users/1     → filtered
GET /api/orders      → orders.csv
```
Angular cannot list files inside assets/ dynamically

👉 So this works ONLY if:

CSV filename matches API name

## 🧠 Pro Insight

What you built now is basically:

👉 A mini mock server inside Angular

👉 Used in real companies for:
- Microfrontend isolation
- Contract testing
- Backend-independent UI dev

## UI to edit mock data live
```
UI (edit table) ⇄ localStorage ⇄ Interceptor ⇄ API response
```
👉 Edit data in UI → API instantly reflects changes   
👉 No backend needed 
👉 Works in DEV/ST perfectly

## 🧪 Usage Examples (Very Important)
**✅ 1. Get all users**
```
this.api.getResource<any[]>('users').subscribe(res => this.users = res);
```

**✅ 2. Get user by ID**
```
this.api.getResource<any>('users', { id: 1 }).subscribe(res => console.log(res));
```
👉 Calls: GET /api/users/1

**✅ 3. Query params (filtering)**
```
this.api.getResource<any[]>('users', {
  params: { role: 'admin' }
});
```
👉 Calls: GET /api/users?role=admin

**✅ 4. Create user**
```
this.api.createResource('users', {
  name: 'New User',
  email: 'test@test.com'
});
```

**✅ 5. Update user**
```
this.api.updateResource('users', 1, {
  name: 'Updated Name'
});
```

**✅ 6. Delete user**
```
this.api.deleteResource('users', 1);
```

## 🧠 Why This Is “Fully Dynamic”
| Feature                | Supported |
| ---------------------- | --------- |
| Multiple APIs          | ✅         |
| ID-based routes        | ✅         |
| Query params           | ✅         |
| CRUD operations        | ✅         |
| Works with interceptor | ✅         |
| Works with real API    | ✅         |

## 🧠 Architecture
```
publics/mocks/
   ├── users.csv
   ├── orders.csv

↓ (auto-discovery)

Mock Engine
   ├── Reads CSV files
   ├── Converts → JSON
   ├── Maps filename → API route

↓
Interceptor
   ├── Intercepts /api/*
   ├── Dynamically resolves CSV
   ├── Returns response
```

## CSV Naming Convention
```
users.csv     → GET /api/users
orders.csv    → GET /api/orders
products.csv  → GET /api/products
```
