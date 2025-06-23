import type { Meta, StoryObj } from '@storybook/react';
import { Providers } from '../../lib/providers';
import { UserInfo } from '../deso/user-info';
import { Timestamp } from '../deso/timestamp';
import { PostImage } from '../deso/post-image';
import { PostText } from '../deso/post-text';
import { PostCardProps } from '../deso/post-card';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY } from '../../lib/constants';
import { successHandlers } from '../../lib/mocks/msw-handlers';
import { FeedList } from '../deso/feed-list';
import { FollowButton } from '../deso/follow-button';
import { MessageButton } from '../deso/message-button';
import { ProfileStat } from '../deso/profile-stat';
import { ProfileActions } from '../deso/profile-actions';
import { UsernameDisplay } from '../deso/username-display';
import { Logo } from '../deso/logo';
import { SearchBar } from '../deso/search-bar';
import { UserMenu } from '../deso/user-menu';

const articleMarkdownHeadline = `# The Future of AI and Crypto`

const articleMarkdown = `

The economics of the internet are already changing. As the open web collapses into a prompt bar, we have to wonder: Will AI lead to an open internet or a maze of new paywalls? And who will control it, big centralized companies or broad communities of users?

That’s where crypto comes in.

The reality that crypto can help build better AI systems, and vice versa, isn’t new — but opportunities have often been poorly defined. So in this post, the a16z crypto team shares 11 use cases at the intersection of crypto and AI to help kickstart conversations about what’s possible, what challenges are left to solve, and more — grounded in technology already being built today.

We share six of them below — check out the full post for all 11 AI x crypto crossovers.

![AI_Agents-1_R2.jpg](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ed2572a-0c6e-4112-ae36-c5a28c304f8f_1920x1080.jpeg)

## 1. Persistent data and context in AI interactions

_by Scott Duke Kominers_

> Generative AI thrives on data, but for many applications, context — the state and background information relevant to an interaction — is equally, if not more, important.

Ideally, any AI system would remember, for example, the kinds of projects you’re working on, your communication style, and your preferred programming languages. But in practice, users often have to reestablish this context across different applications and even across different interactions within a single application — like when you launch a new ChatGPT or Claude shell.

With blockchains, AI systems could enable key context elements to exist as persistent digital assets, which can be loaded in at the start of a session and transferred across platforms. In fact, blockchains are potentially the only solution to this problem that is both forwards-compatible and that also establishes a commitment to interoperability.

The ability to share this context layer would allow AI systems to understand our preferences immediately, and to fine-tune and optimize our experience. Enabling AI to reference persistent onchain context also creates the possibility of new and better marketplace interactions around prompts and information modules.

## 2. Forwards-compatible proof-of-personhood

![AI_Agents-3_R2.jpg](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53315f4a-c2b9-429d-bd21-45173fef7410_1920x1080.jpeg)

_by Jay Drain Jr. and Scott Duke Kominers_

> From X feed comment armies to bots on dating apps, pervasive AI agents are blurring the lines of reality. In this environment, proof of personhood becomes essential infrastructure. Crypto provides an elegant solution.

One way to prove you’re human is through digital IDs. But digital IDs — which encompass all of the things a person can use to verify their identity — are centralized. The value of decentralization here is clear: Users, not platform gatekeepers, would control their own identities, making them more secure and censorship-resistant, able to verify their humanity in a privacy-preserving and credibly neutral way.

Decentralized proof of personhood (or PoP) can serve as a reusable base layer across any platform, including ones that don’t exist yet. In other words, blockchain-based PoP is forwards compatible because it offers portability and permissionless accessibility.

Proof of personhood isn’t just about banning bots, it’s about establishing clear boundaries between AI agents and networks of humans. It enables users and applications to distinguish between human and machine interactions, creating space for better, safer, and more authentic digital experiences.

## 3. Decentralized Physical Infrastructure (DePIN) for AI

_by Guy Wuollet_

![AI_Agents-4_R2.jpg](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F717376d6-ab99-4bf8-9aae-707b7184e07a_1920x1080.jpeg)

> AI may be a digital service, but its advancement is increasingly bottlenecked by physical infrastructure. Decentralized Physical Infrastructure Networks (DePIN) can help democratize access to the compute infrastructure underlying AI innovation, making it cheaper, more resilient, and more resistant to censorship.

Two of the biggest barriers to AI advancement have been energy and access to chips. Decentralized energy can help make more power available, but builders are also using DePIN to aggregate unused chips from gaming PCs, data centers, and other sources. These computers come together to form a permissionless compute marketplace, which is important as it levels the playing field for building new AI products.

Other use cases include distributed training and fine tuning of LLMs, and networks for model inference, potentially leading to much lower costs because they use otherwise latent compute. Decentralized training and inference also provide censorship resistance, ensuring that developers don’t get de-platformed by hyperscalars — large-scale, centralized cloud service providers that offer massively scalable computing infrastructure.

Centralization of AI models among a handful of companies is a persistent concern; decentralized networks can help create more cost effective, more censorship resistant, and more scalable AI.

![AI_Agents-7_R2.jpg](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F717376d6-ab99-4bf8-9aae-707b7184e07a_1920x1080.jpeg)

## 4. Micropayments that support revenue sharing

_by Liz Harkavy_

> AI agents and tools like ChatGPT promise a convenient new way to navigate the digital world. But they’re also destabilizing the economics of the open internet. Blockchains can help realign incentives, and help us avoid an increasingly closed internet, with more paywalls and fewer content creators.

AI agents and tools like ChatGPT promise a convenient new way to navigate the digital world. But they’re also destabilizing the economics of the open internet. Blockchains can help realign incentives, and help us avoid an increasingly closed internet, with more paywalls and fewer content creators.

Perhaps the most promising (though technically complex) solution is to build a system of revenue sharing into the architecture of the web. When an AI-driven action leads to a sale, the content sources that informed that decision should receive a cut. The affiliate marketing ecosystem already does attribution tracking and revenue-sharing like this; a more sophisticated version could automatically track and reward all contributors in the chain of information. Blockchains can obviously play a role in tracking that chain of provenance.

But a system like this requires new infrastructure with other features — like micropayment systems capable of handling tiny transactions across many sources, attribution protocols that fairly value different kinds of contributions, and governance models that ensure transparency and equity. Blockchains can enable all of these through mechanisms like nanopayments split across multiple data providers; smart contracts that allow for enforceable retroactive payments triggered by completed transactions; and the distribution of complex and programmable payment splits.

As these emerging technologies mature, they can create a new economic model for media that captures the full chain of value creation — from creators to platforms to users.

![AI_Agents-10_R2.jpg](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7fe60fa7-0739-4fa2-8472-f5555c5b8869_1920x1080.jpeg)

## 5. Privacy-preserving ads that are tailored, not creepy

_by Matt Gleason_

> What if ads we see every day were… helpful? Crypto offers the opportunity to reimagine how advertising works.

What if ads we see every day were… helpful? Crypto offers the opportunity to reimagine how advertising works.

Personalized AI agents, paired with blockchains, can close the distance between irrelevant and uncanny, delivering ads based on user-defined preferences. But importantly, they can do this without globally exposing user data and while compensating users who share data or engage with ads directly. Some technological requirements here include low-fee digital payments, privacy-preserving data verification, and new incentive models.

Rethinking ads through the lens of crypto and AI can finally make ads more useful — tailored without being creepy, and in a way that benefits everyone: unlocking new incentive structures that are more sustainable and aligned, and providing more ways to discover and navigate users’ digital worlds.

All of this would make ad space more valuable, not less. It could also unseat today’s deeply entrenched, extractive ad economy — and replace it with something more human-centric: a system where users are treated as participants, not products.

read more

![AI_Agents-9_R2.jpg](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa542ad99-686d-401a-b29b-83e3c22d8d3f_1920x1080.jpeg)

## 6. Webcrawlers that help compensate content creators

_by Carra Wu_

> Today, the AI agent with the best product-market fit isn’t an agent for coding or for entertainment. It’s the webcrawler.

Today, the AI agent with the best product-market fit isn’t an agent for coding or for entertainment. It’s the webcrawler.

By some estimates, nearly half of all internet traffic now originates from non-human sources. Bots routinely flout the niceties of robots.txt — a file that is supposed to inform automated web crawlers whether they are welcome on a site, but in practice has very little authority — and use the data they extract to power the defensibility of some of the biggest tech companies on the planet.

Worse still, websites end up footing the bill for these uninvited guests, paying to serve bandwidth and CPU resources to what can feel like an endless tide of faceless scrapers. In response, companies like Cloudflare and other CDNs (content delivery networks) provide blocking services. It’s a patchwork of services that shouldn’t need to exist.

So what if, instead of paying CDNs to outright block anyone who seems like they might be a bot, we meet somewhere in the middle? Instead of freeloading off of a system meant to drive human traffic to sites, AI bots could pay for the right to collect data. This is where blockchains come in: In this scenario, every webcrawler agent would have some crypto, and it could engage in an onchain negotiation with the “bouncer” agent or paywall protocol of each website via x402. (The challenge, of course, is that the robots.txt system, also known as the Robots Exclusion Standard, has been entrenched in the way internet companies have done business since the 1990s. It would take large-scale group coordination to overcome this).

But humans, in a separate lane, could prove their humanity through World ID, and gain access to content for free. In this way, content creators and website owners could be compensated for their contributions to large AI datasets at the point of collection, and humans could continue to enjoy an internet where information wants to be free.

read more


See more use cases — what’s in the works, what’s possible, and what opportunities are still up for grabs for builders — in the full post.

— _a16z crypto editorial team_

_You’re receiving this newsletter because you signed up for it on our websites, at an event, or elsewhere (you can opt out any time using the ‘unsubscribe’ link below). This newsletter is provided for informational purposes only, and should NOT be relied upon as legal, business, investment, or tax advice. This newsletter may link to other websites or other information obtained from third-party sources — a16z has not independently verified nor makes any representations about the current or enduring accuracy of such information. Furthermore, the content is not directed at nor intended for use by any investors or prospective investors in any a16z funds. Please see a16z.com/disclosures for additional important details, including link to list of investments._

`;

const sampleComments: PostCardProps[] = [
    {
      publicKey: DEFAULT_PUBLIC_KEY,
      postContent: 'Great analysis. The shift in the AI is really telling.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      actions: { comments: 2, likes: 15, reposts: 1, diamonds: 1, diamondValue: '($0.05)', quotes: 0, views: 500 },
    },
    {
      publicKey: OTHER_PUBLIC_KEY,
      postContent: "Thanks for breaking this down. I hadn't seen the implications of AI in crypto.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      actions: { comments: 0, likes: 8, reposts: 0, diamonds: 0, diamondValue: '($0.00)', quotes: 0, views: 300 },
    },
    {
      publicKey: DEFAULT_PUBLIC_KEY,
      postContent: 'Great post!',
      timestamp: new Date(),
      actions: { comments: 0, likes: 8, reposts: 0, diamonds: 0, diamondValue: '($0.00)', quotes: 0, views: 300 },
    },
    {
      publicKey: OTHER_PUBLIC_KEY,
      postContent: 'I agree. This is a great post.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      actions: { comments: 0, likes: 8, reposts: 0, diamonds: 0, diamondValue: '($0.00)', quotes: 0, views: 300 },
    },
  ];


const SubstackLayout = () => {
  return (
    <div className="bg-background text-foreground w-full h-screen border border-border rounded-xl bg-clip-border overflow-scroll relative">

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo width={100} height={32} />
            </div>
            
            {/* Search Bar */}
            <div className="flex flex-1 gap-4 max-w-sm items-center">
              <SearchBar
                placeholder="Search..."
                size="md"
                className="w-full"
              />
              {/* User Menu */}
              <UserMenu 
                variant="compact"
                currentUser={{
                  publicKey: DEFAULT_PUBLIC_KEY,
                  profile: {
                    username: 'testuser',
                    profilePic: 'https://picsum.photos/200/300',
                    isVerified: true,
                    publicKey: DEFAULT_PUBLIC_KEY,
                    description: 'A mock user profile.',
                  },
                }} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mb-12 w-full">
        <header className="mb-8 w-full flex justify-between">
          <UserInfo publicKey="BC1YLjDmr185njjDoYLGkUTagzLvcfgxrtKVc5SdBBXCCaWXkM6LXfP" showVerification={true}>
            <div className="flex items-center gap-2">
              <ProfileStat variant="followers" count={32430} /> • 
              <Timestamp timestamp={new Date('2025-06-20T12:00:00Z')} className="text-sm text-muted-foreground" /></div>
          </UserInfo>
          <div className="flex items-center gap-2">
            <ProfileActions />
            <MessageButton />
            <FollowButton /> 
          </div>
        </header>

        <article>
          <PostImage images={['https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88f45b35-0a21-4473-9d6b-e8f59f3848f0_1920x1080.jpeg']} className="my-8" withModal={false} />
          <PostText text={articleMarkdownHeadline} variant="rich" className="mb-6" />
          <PostText text={articleMarkdown} variant="rich" />
        </article>
        
        <section className="mt-6 mx-auto w-full border-t pt-6">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <FeedList posts={sampleComments} className="border-none p-0 w-full" />
        </section>

        {/* <section className="mt-12 text-center border-t pt-12">
          <h2 className="text-2xl font-bold mb-2">Subscribe to The Bulwark</h2>
          <p className="text-muted-foreground mb-6">Unlock this post and more by subscribing.</p>
          <PostImage
              images={['https://picsum.photos/seed/substack-unlock/1200/800']}
              variant="unlockable"
              blurhash="LGF5?xYk^6#M@-5c,1J5@[or[Q6."
              onUnlock={() => alert('Unlock clicked!')}
          />
        </section> */}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Examples/Substack',
  component: SubstackLayout,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: successHandlers,
    },
  },
};

export default meta;

export const ExampleArticle: StoryObj = {
  render: () => <SubstackLayout />,
}; 