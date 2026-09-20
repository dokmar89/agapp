# Age-verification flow prototype

A Next.js prototype exploring a multi-step age-verification experience.

**Status:** Legacy/parallel PassProve implementation retained for reference; not presented as the canonical production release.

## Scope

- UI steps for bank identity, face/document scan, another device and repeated verification.
- Verification-result presentation.
- API, monitoring, notification and queue helper modules.

## Technology

Next.js, React, TypeScript, Tailwind CSS.

## Architecture and source map

- `app/` — Next.js routes
- `components/` — verification-step UI
- `lib/` — integration/helper modules
- `age-verification-page.tsx` — verification page source

## Local development

Requires Node.js and npm. From the repository root:

```sh
npm install
npm run dev
```

Build command declared by this checkout: `npm run build`.

These are the repository scripts, not a claim of a passing build. Dependency installation, build and live integrations were not executed during the documentation review.

## Configuration and limitations

Method names describe available screens, not verified provider contracts or certification. Review helper modules and dependency completeness before attempting backend integration. Use synthetic test data only.

## Documentation next steps

Capture screenshots using synthetic data, document a reproducible test run, and record which integrations have been verified. Keep credentials and deployment-specific configuration outside version control.
