#!/bin/bash
cd /home/bongani/Projects/debt-review-exit-platform
echo "=== use client count ==="
grep -c '"use client"' src/app/(site)/eligibility/page.tsx
echo "=== default exports / function / metadata ==="
grep -n 'export default\|function EligibilityPage\|export const metadata' src/app/(site)/eligibility/page.tsx
echo "=== other eligibility pages ==="
find src -path "*eligibility*" -name "*.tsx"
