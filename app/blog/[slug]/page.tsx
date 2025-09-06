import { notFound } from 'next/navigation'
import BlogPostClient from '../../../components/BlogPostClient'
import type { BlogPost } from '../../../components/BlogPostClient'

// Note: BlogPost type is imported from the client component

// Enhanced blog post data
const posts: Record<string, BlogPost> = {
    'building-scalable-react-applications': {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for building large-scale React applications that can grow with your team and requirements.',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      slug: 'building-scalable-react-applications',
      author: 'Ezedin',
      tags: ['React', 'Architecture', 'Best Practices', 'Scalability'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      likes: 42,
      comments: 8,
      content: `
# Building Scalable React Applications

Building scalable React applications is crucial for long-term success. Here are the key principles I follow:

## Component Architecture

When building large React applications, component architecture is fundamental. I recommend:

- **Single Responsibility Principle**: Each component should have one clear purpose
- **Composition over Inheritance**: Use composition to build complex UIs
- **Container vs Presentational Components**: Separate logic from presentation

## State Management

For state management in scalable applications:

- Use React Context for global state that doesn't change frequently
- Consider Redux Toolkit for complex state logic
- Keep local state when possible to avoid unnecessary complexity

## Code Organization

Structure your project for maintainability:

\`\`\`
src/
  components/
    common/
    features/
  hooks/
  utils/
  types/
\`\`\`

## Performance Optimization

Key performance strategies:

- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize bundle size with tree shaking
- Use useMemo and useCallback judiciously

## Testing Strategy

A robust testing strategy includes:

- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for user workflows
- E2E tests for critical paths

## Conclusion

Building scalable React applications requires thoughtful architecture, proper state management, and a focus on performance. These principles have served me well in building maintainable applications.
      `
    },
    'future-of-web-development': {
      id: 2,
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies that are shaping the future of web development in 2024 and beyond.',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Web Development',
      slug: 'future-of-web-development',
      author: 'Ezedin',
      tags: ['Trends', 'Future', 'Technology', 'Innovation'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      likes: 35,
      comments: 12,
      content: `
# The Future of Web Development

The web development landscape is evolving rapidly. Here are the trends I'm watching:

## Edge Computing

Edge computing is revolutionizing how we think about web applications:

- Reduced latency by processing closer to users
- Better performance for global applications
- New deployment strategies and architectures

## WebAssembly (WASM)

WebAssembly is opening new possibilities:

- Near-native performance in the browser
- Language diversity beyond JavaScript
- Complex applications running in browsers

## AI Integration

AI is becoming integral to web development:

- AI-powered code completion and generation
- Intelligent user interfaces
- Automated testing and optimization

## Conclusion

The future of web development is exciting, with new technologies enabling better user experiences and developer productivity.
      `
    },
    'typescript-best-practices': {
      id: 3,
      title: 'TypeScript Best Practices',
      excerpt: 'A comprehensive guide to writing better TypeScript code with practical examples and real-world scenarios.',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'TypeScript',
      slug: 'typescript-best-practices',
      author: 'Ezedin',
      tags: ['TypeScript', 'Best Practices', 'JavaScript', 'Types'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      likes: 28,
      comments: 6,
      content: `
# TypeScript Best Practices

A comprehensive guide to writing better TypeScript code with practical examples and real-world scenarios.

## Type Definitions

Always prefer explicit type definitions:

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}
\`\`\`

## Utility Types

Leverage TypeScript's utility types:

- \`Partial<T>\` for optional properties
- \`Pick<T, K>\` for selecting specific properties
- \`Omit<T, K>\` for excluding properties

## Conclusion

These practices will help you write more maintainable TypeScript code.
      `
    },
    'optimizing-nextjs-performance': {
      id: 4,
      title: 'Optimizing Next.js Performance',
      excerpt: 'Tips and techniques for improving the performance of your Next.js applications for better user experience.',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'Next.js',
      slug: 'optimizing-nextjs-performance',
      author: 'Ezedin',
      tags: ['Next.js', 'Performance', 'Optimization', 'React'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      likes: 31,
      comments: 9,
      content: `
# Optimizing Next.js Performance

Tips and techniques for improving the performance of your Next.js applications.

## Image Optimization

Use Next.js Image component for automatic optimization:

\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority
/>
\`\`\`

## Code Splitting

Implement dynamic imports for better bundle splitting:

\`\`\`jsx
const DynamicComponent = dynamic(() => import('./Component'))
\`\`\`

## Conclusion

These optimizations will significantly improve your Next.js app performance.
      `
    }
}

const getBlogPost = (slug: string): BlogPost | null => {
  return posts[slug] || null
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
