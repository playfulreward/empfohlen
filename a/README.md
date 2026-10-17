# Same-site affiliate redirect

This package is for **Cloudflare Pages** (Pages Functions must be enabled). Upload the files with the same directory structure, including `functions/go.js`. Do not use a static-only hosting setup: `/go` needs server-side execution.

In Cloudflare Pages → Settings → Variables and Secrets, create `TRACKING_DESTINATION` as a **secret** and give it the full HTTPS affiliate link provided separately. Redeploy after adding it.

The button and reward cards point to `/go`, with tracking values forwarded from the landing page (`sub1`–`sub5`, aliases `s1`–`s5`, `ttclid`, and other existing query values). A visitor at `/?sub1=test&sub2=user` clicks `/go?sub1=test&sub2=user`; the server then issues a 302 to the configured destination with these values.

**Limit:** the original destination is absent from delivered HTML/JavaScript and browser hover status, but cannot be made impossible to discover: redirect `Location` response, DevTools network tab and the final address bar can reveal it. JavaScript obfuscation does not fix this.

Preserve other assets used by the original HTML (images, `analytics.js`, etc.) when deploying.
