import { defineSiteComponentsConfig, Env, Site } from '@pingcap-inc/tidb-community-site-components'
import { Responsive } from '@pingcap-inc/tidb-community-ui'
import React from 'react'

console.log(Responsive)

defineSiteComponentsConfig({
  site: Site.others,
  env: Env.local
})

const ResponsivePreview = ({ breakpoint }) => {
  return (
    <Responsive>
      <div>
        <Responsive.Context.Consumer>
          {({ width }) => <pre>width = {width}</pre>}
        </Responsive.Context.Consumer>
        <Responsive.Conditional when={({ width }) => width < breakpoint}>
          <pre>when width &lt; {breakpoint}</pre>
        </Responsive.Conditional>
        <Responsive.Conditional when={({ width }) => width >= breakpoint}>
          <pre>when width >= {breakpoint}</pre>
        </Responsive.Conditional>
      </div>
    </Responsive>
  )
}

export default {
  title: 'responsive/Basic',
  component: ResponsivePreview
}

const Template = (args) => <ResponsivePreview {...args} />

export const Preview = Template.bind({})

Preview.args = {
  breakpoint: 500
}

