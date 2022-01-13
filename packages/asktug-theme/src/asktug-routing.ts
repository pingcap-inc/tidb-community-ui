export function routeTo (url: string) {
  // TODO: find a nicer entry
  const app = (window as any).Discourse._applicationInstances.values().next().value
  app.router.transitionTo(url)
}
