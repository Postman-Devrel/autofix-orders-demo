# autofix-orders-demo

A tiny orders API (Node.js + Express) with an OpenAPI spec and a git-native Postman v3 collection.
It backs a blog post about Claude Code auto-fix fixing Postman CI failures.

- `src/server.js`: the API (`GET /health`, `GET /orders/{id}`) on port 3000
- `openapi.yaml`: the contract
- `postman/collections/orders`: contract tests (status, `orderId`, schema, response time)
- `postman/environments/ci.yaml`: `baseUrl` = http://localhost:3000
- `.github/workflows/api-contract-tests.yml`: runs the collection on every PR
- `captures/`: real Postman CLI output for three failure scenarios (branches `scenario-*`)

## Run locally

```bash
npm install
npm start &
postman collection run postman/collections/orders -e postman/environments/ci.yaml
```

## CI

Add a repository secret named `POSTMAN_API_KEY`. Update the team handle in `.github/CODEOWNERS`.
Install the Claude GitHub App on the repo, then enable auto-fix on a PR (for example `/autofix-pr`).

## Scenarios

| Branch | Mistake |
|---|---|
| `scenario-1-renamed-field` | Handler returns `order_id` instead of `orderId` |
| `scenario-2-contract-drift` | Handler adds `discountCode`, not in the spec |
| `scenario-3-flaky-threshold` | Response time threshold tightened to 200 ms; cold start is slow |
