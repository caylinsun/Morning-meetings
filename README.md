# Morning Meetings dashboard

A compact five-market briefing for Caylin's CUHK MBA Money and Capital Markets course (FINA6010E).

The published dashboard covers stocks, foreign exchange, commodities, bonds and crypto. It includes two saved sets of instruments, dated source observations, performance comparisons, charts, vocabulary and related reading.

## Publishing

GitHub Pages publishes the static dashboard from the `dist` directory whenever the `main` branch is updated. The workflow is in `.github/workflows/pages.yml`.

Market figures are dated snapshots. The dashboard identifies its latest retrieval time and each instrument's own quote time; it is not a streaming market-data terminal.
