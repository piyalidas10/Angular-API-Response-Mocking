# Angular-API-Response-Mocking
In DEV and ST, API requests and responses are stubbed using CSV-based mock data.
> In DEV and ST environments, external API requests and responses are stubbed using CSV-based mock data instead of live integrations.
> In DEV and ST, API requests and responses are stubbed using CSV-based mock data.

Using CSV mock data from the public/ (or assets/) folder in Angular 19 to simulate API responses is a solid approach for DEV/ST environments. Here’s a production-style way to do it cleanly.

## 🚀 How It Works
```
Component → Service → HttpClient → ✅ Interceptor
                                  ↳ Return CSV mock (DEV/ST)
                                  ↳ Call real API (PROD)
```

✅ 1. Project Structure

Place your CSV inside the public assets folder:
```
src/
 ├── app/
public/   ✅ (Angular default static folder)
 │    └── mocks/
 │         └── users.csv
```
✅ 2. Sample CSV (users.csv)
```
id,name,email
1,John Doe,john@example.com
2,Jane Smith,jane@example.com
```

## 🧠 Pro Insight

👉 A mini mock server inside Angular

👉 Used in real companies for:
- Microfrontend isolation
- Contract testing
- Backend-independent UI dev

## 🧠 Architecture Insight

This approach gives you:

- 🔄 Zero change in services/components
- 🧪 Full control over test scenarios
- ⚡ Instant switching (mock ↔ real API)
- 🐳 Works perfectly in Docker/local setups
- 🔌 Great for microfrontend + contract testing

## ✅ Summary
- Interceptor captures API calls
- Maps API → CSV file
- Converts CSV → JSON
- Returns fake HttpResponse
- Controlled via environment flag