

# Fix: Docker Build Failure — package-lock.json out of sync

## Problem
The Coolify deployment fails at `npm ci` because `dompurify`, `@types/dompurify`, and `@types/trusted-types` (a dependency of dompurify) are listed in `package.json` but missing from `package-lock.json`. `npm ci` requires exact sync between the two files.

This happened because Lovable uses `bun` internally (evidenced by `bun.lock` / `bun.lockb`) and doesn't update `package-lock.json` when adding new dependencies. The `dompurify` package was added to `package.json` but never recorded in the npm lock file.

## Fix

**`Dockerfile`** — Change `npm ci` to `npm install` so it can resolve missing packages:

```dockerfile
RUN npm install --ignore-scripts
```

This is the simplest, most reliable fix. `npm install` will generate/update the lock file in-place during the build, resolving the missing entries. The `--ignore-scripts` flag is kept for security.

Alternatively, we could regenerate `package-lock.json` but since Lovable manages dependencies with bun, this mismatch will likely recur. Using `npm install` in the Dockerfile is the permanent solution.

## Files Changed
| File | Change |
|------|--------|
| `Dockerfile` | `npm ci` → `npm install` (line 14) |

One line change. No other files affected.

