import { TabSmallView } from "@/ui/atoms/TabSmallView"

type Props = {}

export const TabsContainer = (props: Props) => {
    return (
        <div style={{ display: 'flex', gap: '9px', paddingBlock: '10px', flexWrap: 'wrap' }}>
            <TabSmallView
                title="Container presentational pattern | javascript Patterns"
                urlText="https://javascriptpatterns.vercel.app"
                imgSrc="https://javascriptpatterns.vercel.app/logo.svg" />
            <TabSmallView
                title="Container presentational pattern | javascript Patterns"
                urlText="https://javascriptpatterns.vercel.app"
                imgSrc="https://javascriptpatterns.vercel.app/logo.svg" />
            <TabSmallView
                title="Container presentational pattern | javascript Patterns"
                urlText="https://javascriptpatterns.vercel.app"
                imgSrc="https://javascriptpatterns.vercel.app/logo.svg" />
            <TabSmallView
                title="Container presentational pattern | javascript Patterns"
                urlText="https://javascriptpatterns.vercel.app"
                imgSrc="https://javascriptpatterns.vercel.app/logo.svg" />
            <TabSmallView
                title="Container presentational pattern | javascript Patterns"
                urlText="https://javascriptpatterns.vercel.app"
                imgSrc="https://javascriptpatterns.vercel.app/logo.svg" />
            <TabSmallView
                title="Container presentational pattern | javascript Patterns"
                urlText="https://javascriptpatterns.vercel.app"
                imgSrc="https://javascriptpatterns.vercel.app/logo.svg" />
        </div>
    )
}