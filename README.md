# voizzit-sc-pkg-updater
Hardened REST API to trigger voizit-sc-* package updates.

## Endpoints

### `POST /v1/update`
Body (JSON):
```json
{
  "pkgs": [],
}
```

## Run
```bash
npm i
npm run start
```