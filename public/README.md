# Ezedin Ebrahim - Personal Website

A modern, responsive personal website built with Next.js 14, TypeScript, and Tailwind CSS. Features a professional portfolio showcase, blog functionality, and dark mode support.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Portfolio Showcase**: Filterable project gallery with live demos
- **Blog System**: Built-in blog with markdown support
- **Contact Form**: Interactive contact form with validation
- **Performance Optimized**: Built with Next.js 14 for optimal performance
- **TypeScript**: Full type safety throughout the application
- **SEO Friendly**: Optimized meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Next Themes
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ezedin/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Projects.tsx
│   └── ThemeProvider.tsx
├── public/
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `components/Hero.tsx` - Name, title, and social links
- `components/About.tsx` - Skills, experience, and bio
- `components/Projects.tsx` - Your projects and portfolio items
- `components/Contact.tsx` - Contact information
- `app/layout.tsx` - Meta tags and SEO information

### Styling
- Colors: Modify `tailwind.config.js` to change the color scheme
- Fonts: Update font imports in `app/layout.tsx`
- Animations: Customize animations in `tailwind.config.js` and components

### Blog Content
- Add blog posts in `app/blog/[slug]/page.tsx`
- For markdown support, consider integrating with a CMS like Contentful or using MDX

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📱 Performance

This website is optimized for performance with:
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimal bundle size
- Fast page transitions
- SEO optimization

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you find any bugs or have suggestions for improvements, please open an issue.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: ezedin@example.com
- **LinkedIn**: [linkedin.com/in/ezedin-ebrahim](https://linkedin.com/in/ezedin-ebrahim)
- **GitHub**: [github.com/ezedin](https://github.com/ezedin)

---

Built with ❤️ by Ezedin Ebrahim
