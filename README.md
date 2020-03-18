# Notes

- New Scoring Session
- Show and link ActiveScoringSession on frontpage
- Fail to create event if active event is existing
- Disable button on saving...
- Show loader...
- Save scoringSessionId on device? (Some override if person reinstalls app.. (tap 7 times, get question: "Do you want to take over this?"))

```javascript
// Put around routing stack
<Suspense fallback={<Spinner />}>
```

```javascript
// lazy import routes?
const Home = lazy(() => import('./pages/Home'));
```

- use "whyDidYouUpdate" and Profiler heavily!
- Check in \_Archived/tisdagsgolfen-hasura-react-apollo for react-cache usage
