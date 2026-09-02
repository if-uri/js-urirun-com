# Doctor repair checklist

- Source issue: https://github.com/subactor/doctor-agent/issues/98
- Correlation ID: `33155385219`
- [x] Add the missing repository `Makefile`.
- [x] Reuse the package build and JavaScript syntax-check contracts.
- [x] Expose the fleet and OneDev `verify` entry points and run all declared gates.
- [x] Expose the networkless OneDev `doctor-env` gate for source, artifact,
      manifest, Node, and npm validation.
