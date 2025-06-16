/**
 * Constants for DeSo UI components
 */

// Default user for stories and examples
// export const DEFAULT_PUBLIC_KEY = 'BC1YLiyVGzb756j5UoWd8oSEQ4s7R4fRWbWqPtUJ6hgVwk69HYdpnLg';
// export const DEFAULT_USERNAME = 'wintercounter';

export const DEFAULT_PUBLIC_KEY = 'BC1YLjSGY3DETtVTsiDVkobtvfDDtMuTjFoG1rmSagtWPzHyEZ3BKuB';
export const DEFAULT_USERNAME = 'DeSocialWorld';

// A known public key for fetching live data in stories
export const LIVE_PUBLIC_KEY = 'BC1YLjSGY3DETtVTsiDVkobtvfDDtMuTjFoG1rmSagtWPzHyEZ3BKuB';

// Common public keys for testing (can be expanded later)
export const TEST_PUBLIC_KEYS = {
  mossified: DEFAULT_PUBLIC_KEY,
  wintercounter: DEFAULT_PUBLIC_KEY,
} as const; 

// Sample text for stories


export const simpleText = `Check out this post! #DeSo is a decentralized social network. 
You can find more info at https://www.deso.org.
Follow @deso for updates.
`;

export const richText = `## This is a Rich Text Post

This post demonstrates the rich text capabilities of the PostText component.

### Features
- **Bold Text**
- *Italic Text*
- [Links](https://deso.org)
- Headings

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

> This is a blockquote. It's a great way to highlight a quote from another source.
`;

export const longSimpleText = `This is a longer simple text to demonstrate the truncation feature. 
#DeSo is building a user-owned internet. Learn more at https://deso.org.
Follow @deso for the latest news and updates on the future of social media.
This text should be long enough to be clamped by our custom hook.
Let's add another line to be sure.
And one more for good measure.
`;

export const longRichText = `# The Art of Crafting Engaging Blog Content

Welcome to an exploration of how to create compelling blog posts that captivate readers and keep them coming back for more. In this article, we'll dive into the strategies, tools, and techniques that make content stand out in a crowded digital landscape.

## Why Engaging Content Matters

In 2025, the internet is flooded with information. According to recent estimates, over 7 million blog posts are published daily. So, how do you ensure your content rises above the noise? The answer lies in crafting posts that are **informative**, **entertaining**, and **visually appealing**.

> "Content is king, but engagement is queen, and she rules the house."  
> — Mari Smith

### Key Elements of a Great Blog Post

To create content that resonates, focus on these core components:

1. **A Captivating Headline**: Your title should grab attention and promise value. Tools like [CoSchedule's Headline Analyzer](https://coschedule.com/headline-analyzer) can help refine your headlines.
2. **Strong Opening**: Hook readers in the first paragraph with a question, statistic, or anecdote.
3. **Clear Structure**: Use headings, lists, and short paragraphs for readability.
4. **Actionable Insights**: Provide practical tips or takeaways readers can apply.
5. **Visual Appeal**: Incorporate images, code snippets, or tables to break up text.

## Structuring Your Content

A well-organized post guides readers smoothly from introduction to conclusion. Here's a suggested structure:

### Introduction
Set the stage with a problem or question your post will address. For example, this article began by highlighting the challenge of standing out online.

### Body
Break the main content into sections with descriptive subheadings. Use Markdown features to enhance clarity:

- **Unordered Lists** for tips or features:
  - Keep sentences concise.
  - Use active voice for energy.
  - Include examples to illustrate points.
- **Ordered Lists** for step-by-step processes:
  1. Research your audience to understand their needs.
  2. Outline your post to maintain focus.
  3. Write a draft, then edit ruthlessly.
- **Tables** for comparisons:

| Tool               | Best For                     | Free Tier? |
|--------------------|-----------------------------|------------|
| Grammarly          | Grammar and style           | Yes        |
| Hemingway Editor   | Readability                 | No         |
| Canva              | Visual content creation     | Yes        |

### Conclusion
Summarize key points and include a call to action, like inviting readers to comment or share the post.

## Enhancing with Markdown Features

Markdown offers powerful ways to format content. Here are examples to showcase in your demo:

### Code Blocks
For technical posts, include code snippets:

\`\`\`javascript
// A simple function to greet readers
function greetReader(name) {
  return \`Hello, \${name}! Thanks for reading this post.\`;
}
console.log(greetReader("Alex"));
\`\`\`

### Blockquotes
Highlight quotes or insights:

> The best content doesn't just inform—it inspires action. Write with purpose and clarity to move your audience.

### Links and Images
Link to resources and add images for visual interest:

- Learn more about SEO at [Moz's Beginner's Guide](https://moz.com/beginners-guide-to-seo).
- Example image syntax (render as needed in your app):

\`\`\`markdown
![A laptop with code on screen](https://via.placeholder.com/600x400)
\`\`\`

### Emphasis
Use **bold** for strong points, *italics* for subtle emphasis, and \`inline code\` for technical terms.

## Engaging Your Audience

To keep readers invested, incorporate these techniques:

- **Ask Questions**: What challenges do you face when writing content? Share in the comments!
- **Tell Stories**: Share a personal anecdote, like the time a poorly formatted post lost half its readers.
- **Use Data**: Studies show posts with images get [94% more views](https://contentmarketinginstitute.com/) than text-only content.
- **Be Conversational**: Write as if you're chatting with a friend, not lecturing.

## Tools for Content Creation

Here’s a curated list of tools to streamline your workflow:

| Tool            | Purpose                          | Price        |
|-----------------|----------------------------------|--------------|
| Notion          | Organizing ideas and drafts      | Free/Paid    |
| Obsidian        | Note-taking with Markdown        | Free         |
| Figma           | Designing custom visuals         | Free/Paid    |

### Example Workflow
1. Brainstorm topics in Notion.
2. Draft in Obsidian using Markdown.
3. Polish with Grammarly.
4. Design visuals in Figma or Canva.
5. Publish using your Next.js app with Tailwind's \`prose\` styling.

## Conclusion

Crafting engaging blog content is both an art and a science. By combining a clear structure, rich Markdown formatting, and audience-focused techniques, you can create posts that inform and inspire. The \`prose\` class from Tailwind CSS enhances this by providing elegant typography that makes your content a joy to read.

**Call to Action**: Try these tips in your next post and let us know how they work! Share your favorite content creation tool in the comments, or tweet your thoughts at [@YourAppHandle](https://x.com).

`;