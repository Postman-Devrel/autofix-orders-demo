## API test rules

- A failing Postman test is evidence about the API. Assume the code is wrong first.
- Don't weaken or delete an assertion, raise a threshold, or loosen a schema
  to make a run pass.
- If the test itself looks wrong, stop and explain why in a PR comment instead
  of editing it.
- Changes under postman/collections/ and openapi.yaml need human review.
